var WidgetMetadata = {
  id: "ti.bemarkt.podcast",
  title: "Podcast",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "获取 RSS 播客数据",
  author: "Ti",
  site: "https://github.com/bemarkt/scripts/tree/master/provider/Forward",
  modules: [
    {
      title: "浏览播客分类",
      functionName: "listPodcastsByCategory",
      params: [
        {
          name: "selectedCategoryAnchorId",
          title: "选择分类",
          type: "enumeration",
          value: "播客",
          enumOptions: [
            { title: "推荐播客", value: "播客" },
            { title: "人文", value: "人文" },
            { title: "新闻热点", value: "新闻热点" },
            { title: "影视与读书", value: "影视与读书" },
            { title: "教育", value: "教育" },
            { title: "历史", value: "历史" },
            { title: "音乐", value: "音乐" },
            { title: "情感", value: "情感" },
            { title: "有声书", value: "有声书" },
          ],
        },
        { name: "page", title: "页码", type: "page" },
        {
          name: "count",
          title: "每页数量",
          type: "input",
          description: "每页返回多少条数据",
          value: "20",
          placeholders: [{ title: "例如: 20", value: "20" }],
        },
      ],
    },
  ],
};

const MAX_EPISODES_PER_PODCAST = 15;

/**
 * 清理可能包含在CDATA块中的文本
 * @param {string} text
 * @returns {string}
 */
function cleanCData(text) {
  if (typeof text === "string") {
    const cdataMatch = text.match(/^<!\[CDATA\[(.*)\]\]>$/s);
    if (cdataMatch && cdataMatch[1]) {
      return cdataMatch[1].trim();
    }
    return text.trim();
  }
  return "";
}

/**
 * 获取指定分类下的播客列表
 */
async function listPodcastsByCategory(params = {}) {
  const page = parseInt(params.page, 10) || 1;
  const count = parseInt(params.count, 10) || 20;
  const { selectedCategoryAnchorId } = params;

  if (!selectedCategoryAnchorId) {
    console.error("错误：选择的分类 anchorId 参数无效。");
    throw new Error("选择的分类无效。");
  }

  let categoryDisplayName = selectedCategoryAnchorId;
  const categoryEnumParam = WidgetMetadata.modules[0].params.find(
    (p) => p.name === "selectedCategoryAnchorId"
  );
  if (categoryEnumParam && categoryEnumParam.enumOptions) {
    const selectedOption = categoryEnumParam.enumOptions.find(
      (opt) => opt.value === selectedCategoryAnchorId
    );
    if (selectedOption && selectedOption.title) {
      categoryDisplayName = selectedOption.title;
    }
  }

  return await listPodcastsInGrid({
    categoryAnchorId: selectedCategoryAnchorId,
    categoryDisplayName: categoryDisplayName,
    page: page,
    count: count,
  });
}

/**
 * 从 getpodcast.xyz 抓取指定分类下的播客列表
 */
async function listPodcastsInGrid(params = {}) {
  const {
    categoryAnchorId,
    categoryDisplayName,
    page = 1,
    count = 20,
  } = params;
  const siteUrl = "https://getpodcast.xyz/";
  console.log(
    `抓取网页 "${siteUrl}" 分类 "${categoryDisplayName}" (ID: ${categoryAnchorId}) 的播客列表`
  );

  try {
    const response = await Widget.http.get(siteUrl);
    if (!response || !response.data)
      throw new Error(`获取网页内容失败: ${siteUrl}`);
    const htmlString = response.data;
    const $ = Widget.html.load(htmlString);

    const anchorDiv = $(`div.anchor_gap#${categoryAnchorId}`);
    if (anchorDiv.length === 0) return [];
    const picListUl = anchorDiv.next("h2.classify_title").next("ul.pic_list");
    if (picListUl.length === 0) return [];

    const podcasts = [];
    picListUl.find("li > a").each((index, linkTagElement) => {
      const linkTag = $(linkTagElement);
      const podcastRssUrl = linkTag.attr("href");
      const podcastTitle = linkTag.find("strong.title").text().trim();
      const podcastCover = linkTag.find("img.logo").attr("src");

      if (podcastRssUrl && podcastTitle) {
        podcasts.push({
          id: podcastRssUrl,
          type: "url",
          title: podcastTitle,
          posterPath: podcastCover || "",
          backdropPath: podcastCover || "",
          description: `分类: ${categoryDisplayName}`,
          link: podcastRssUrl,
        });
      }
    });

    const numericPage = parseInt(page, 10) || 1;
    const numericCount = parseInt(count, 10) || 20;
    const startIndex = (numericPage - 1) * numericCount;
    const endIndex = startIndex + numericCount;
    return podcasts.slice(startIndex, endIndex);
  } catch (error) {
    console.error(
      `处理网页抓取或HTML解析时出错 (分类: ${categoryDisplayName}): ${error.message}`
    );
    throw new Error(`无法加载分类 "${categoryDisplayName}" 的播客列表。`);
  }
}

/**
 * 爽听
 * @param {string} channelRssUrl
 * @returns {Promise<object>}
 */
async function loadDetail(channelRssUrl) {
  if (
    !channelRssUrl ||
    typeof channelRssUrl !== "string" ||
    !channelRssUrl.toLowerCase().includes("http")
  ) {
    console.error(
      "loadDetail: 接收到的 linkValue 不是一个有效的频道 RSS URL:",
      channelRssUrl
    );
    return {
      id: channelRssUrl || "unknown_id_on_error_in_loadDetail",
      type: "url",
      title: "错误",
      description: "无效的播客频道链接。",
      videoUrl: null,
      childItems: [],
      link: channelRssUrl,
    };
  }

  console.log(
    `loadDetail: 开始加载频道详情和单集列表，RSS URL: ${channelRssUrl}`
  );

  let channelTitleInRss = "播客频道";
  let channelCoverInRss = "";
  let channelDescriptionInRss = "";
  let firstEpisodeUrl = null;

  try {
    const episodes = await fetchEpisodesForPodcast(
      channelRssUrl,
      (parsedChannelInfo) => {
        if (parsedChannelInfo) {
          channelTitleInRss = parsedChannelInfo.title || channelTitleInRss;
          channelCoverInRss = parsedChannelInfo.cover || channelCoverInRss;
          channelDescriptionInRss =
            parsedChannelInfo.description || channelDescriptionInRss;
        }
      }
    );

    if (episodes && episodes.length > 0 && episodes[0].videoUrl) {
      firstEpisodeUrl = episodes[0].videoUrl;
    }

    return {
      id: channelRssUrl,
      type: "url",
      title: channelTitleInRss,
      posterPath: channelCoverInRss,
      description: channelDescriptionInRss,
      childItems: episodes,
      videoUrl: firstEpisodeUrl,
      link: channelRssUrl,
    };
  } catch (error) {
    console.error(
      `为播客频道 (RSS: ${channelRssUrl}) 加载单集失败: ${error.message}`
    );
    return {
      id: channelRssUrl,
      type: "url",
      title: "播客频道加载失败",
      description: `无法加载此播客频道的单集列表 (源: ${channelRssUrl})。错误: ${error.message}`,
      childItems: [],
      videoUrl: null,
      link: channelRssUrl,
    };
  }
}

/**
 * 从指定的RSS Feed获取并解析播客单集，并尝试获取频道信息。
 * @param {string} rssUrl
 * @param {function} channelInfoCallback
 * @returns {Promise<Array<object>>} VideoItem对象数组
 */
async function fetchEpisodesForPodcast(rssUrl, channelInfoCallback) {
  console.log(
    `获取播客单集列表，RSS: ${rssUrl}, 最多 ${MAX_EPISODES_PER_PODCAST} 集`
  );
  try {
    const response = await Widget.http.get(rssUrl);
    if (!response || !response.data)
      throw new Error(`获取RSS Feed失败: ${rssUrl}`);
    const xmlString = response.data;
    const $ = Widget.html.load(xmlString, {
      xmlMode: true,
      decodeEntities: false,
    });

    const rawChannelTitle = $("channel > title").first().text();
    const channelTitle = cleanCData(rawChannelTitle) || "未知频道";
    const channelCover =
      $("channel > itunes\\:image").attr("href") ||
      $("channel > image > url").first().text() ||
      "";
    let rawChannelDescription = $("channel > description").first().text();
    let channelDescription = cleanCData(rawChannelDescription);
    channelDescription = channelDescription
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&[a-zA-Z0-9#]+;/g, " ")
      .replace(/\s\s+/g, " ")
      .trim();
    if (channelDescription.length > 200)
      channelDescription = channelDescription.substring(0, 197) + "...";

    if (typeof channelInfoCallback === "function") {
      channelInfoCallback({
        title: channelTitle,
        cover: channelCover,
        description: channelDescription,
      });
    }

    const episodes = [];
    $("item").each((index, element) => {
      if (episodes.length >= MAX_EPISODES_PER_PODCAST) return false;

      const itemXml = $(element);
      const rawItemTitle = itemXml.find("title").first().text();
      const title = cleanCData(rawItemTitle) || "未知标题";
      let guid = itemXml.find("guid").first().text().trim();
      const enclosureNode = itemXml.find("enclosure");
      const videoUrl = enclosureNode.attr("url");

      if (!guid && videoUrl) guid = videoUrl;
      if (!guid) guid = rssUrl + "#episode#" + index + "#" + Date.now();

      const pubDate = itemXml.find("pubDate").first().text().trim();
      const rawItemDescription = itemXml.find("description").first().text();
      let descriptionText = cleanCData(rawItemDescription);
      descriptionText = descriptionText
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&[a-zA-Z0-9#]+;/g, " ")
        .replace(/\s\s+/g, " ")
        .trim();
      if (descriptionText.length > 150)
        descriptionText = descriptionText.substring(0, 147) + "...";

      let durationText = itemXml
        .find("itunes\\:duration")
        .first()
        .text()
        .trim();
      if (durationText && /^\d+$/.test(durationText)) {
        const totalSeconds = parseInt(durationText, 10);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        if (hours > 0) {
          durationText = `${String(hours).padStart(2, "0")}:${String(
            minutes
          ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        } else {
          durationText = `${String(minutes).padStart(2, "0")}:${String(
            seconds
          ).padStart(2, "0")}`;
        }
      } else if (
        !durationText ||
        durationText.toLowerCase() === "unknown" ||
        durationText.includes(":")
      ) {
        if (!durationText || durationText.toLowerCase() === "unknown")
          durationText = "未知";
      } else {
        durationText = "未知";
      }

      const episodeImage = itemXml.find("itunes\\:image").attr("href");
      const author =
        cleanCData(itemXml.find("itunes\\:author").first().text()) ||
        cleanCData($("channel > itunes\\:author").first().text()) ||
        channelTitle;

      if (videoUrl) {
        episodes.push({
          id: guid,
          type: "url",
          title: title,
          posterPath: episodeImage || channelCover,
          backdropPath: episodeImage || channelCover,
          releaseDate: pubDate,
          mediaType: "audio",
          genreTitle: channelTitle,
          durationText: durationText,
          videoUrl: videoUrl,
          description: descriptionText,
          author: author,
        });
      }
    });
    return episodes;
  } catch (error) {
    console.error(`处理播客RSS "${rssUrl}" 的单集时出错: ${error.message}`);
    throw new Error(`无法加载播客 "${rssUrl}" 的单集列表。`);
  }
}
