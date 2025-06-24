var WidgetMetadata = {
  id: "ti.bemarkt.podcast",
  title: "Podcast",
  version: "2.1.0",
  requiredVersion: "0.0.1",
  description: "获取 RSS 播客数据",
  author: "Ti",
  site: "https://github.com/bemarkt/scripts/tree/master/provider/Forward",
  modules: [
    {
      title: "播客订阅",
      description: "从JSON格式的订阅地址加载播客列表",
      functionName: "getPodcastsFromJson",
      params: [
        {
          name: "jsonUrl",
          title: "JSON订阅地址",
          type: "input",
          description: "包含播客RSS列表的JSON订阅URL",
          value: "",
          placeholders: [
            {
              title: "Ti's Podcast List",
              value:
                "https://gist.githubusercontent.com/bemarkt/30c24fbd840284220773d7a36f2fce4a/raw/podcast.json",
            },
          ],
        },
        {
          name: "genre",
          title: "分类",
          type: "enumeration",
          description: "选择要查看的播客分类",
          value: "all", // 默认显示全部
          enumOptions: [
            { title: "全部", value: "all" },
            { title: "播客", value: "播客" },
            { title: "新闻热点", value: "新闻热点" },
            { title: "有声书", value: "有声书" },
            { title: "音乐", value: "音乐" },
            { title: "情感", value: "情感" },
            { title: "人文", value: "人文" },
            { title: "影视与读书", value: "影视与读书" },
            { title: "教育", value: "教育" },
            { title: "历史", value: "历史" },
          ],
        },
        {
          name: "page",
          title: "页码",
          type: "page",
        },
      ],
    },
  ],
};

const PAGE_SIZE = 20;

/**
 * 从JSON加载播客列表，支持分类和分页。
 */
async function getPodcastsFromJson(params = {}) {
  const { jsonUrl, genre = "all", page = 1 } = params;

  if (!jsonUrl || !jsonUrl.toLowerCase().startsWith("http")) {
    return console.error(
      "无效的JSON地址，请提供一个有效的、可公开访问的JSON文件URL。"
    );
  }

  try {
    const response = await Widget.http.get(jsonUrl);
    if (!response || !response.data) {
      throw new Error("无法获取JSON文件，或文件内容为空。");
    }
    const allPodcasts = response.data;
    if (!Array.isArray(allPodcasts)) {
      throw new Error("JSON文件格式不正确，期望得到一个对象数组。");
    }

    const filteredPodcasts =
      !genre || genre === "all"
        ? allPodcasts
        : allPodcasts.filter((p) => p.genre === genre);

    const startIndex = (page - 1) * PAGE_SIZE;
    const paginatedPodcasts = filteredPodcasts.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );

    return paginatedPodcasts.map((podcast) => ({
      id: podcast.rssUrl,
      type: "url",
      title: podcast.title,
      posterPath: podcast.cover,
      backdropPath: podcast.cover,
      description: podcast.description,
      mediaType: "audio",
      genreTitle: podcast.genre,
      link: podcast.rssUrl,
    }));
  } catch (error) {
    console.error(`加载或处理预生成的JSON时出错: ${error.message}`);
    return [];
  }
}

/**
 * 清理可能包含在CDATA块中的文本
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
 * 加载播客详情，包括剧集列表
 */
async function loadDetail(channelRssUrl) {
  try {
    const episodes = await fetchPodcastEpisodes(channelRssUrl);

    let firstEpisodeUrl = null;
    if (episodes && episodes.length > 0 && episodes[0].videoUrl) {
      firstEpisodeUrl = episodes[0].videoUrl;
    }

    return {
      id: channelRssUrl,
      type: "url",
      episodeItems: episodes,
      videoUrl: firstEpisodeUrl,
    };
  } catch (error) {
    console.error(
      `loadDetail: 为播客频道 (RSS: ${channelRssUrl}) 加载剧集失败: ${error.message}`
    );
    throw error;
  }
}

/**
 * 从指定的RSS Feed获取并解析播客单集
 */
async function fetchPodcastEpisodes(rssUrl) {
  try {
    const response = await Widget.http.get(rssUrl);
    if (!response || !response.data) {
      throw new Error(`获取RSS Feed失败，无响应数据: ${rssUrl}`);
    }

    const xmlString = response.data;
    const $ = Widget.html.load(xmlString, {
      xmlMode: true,
      decodeEntities: true,
    });

    const episodes = [];
    const allItems = $("item");
    const totalEpisodes = allItems.length;
    const channelAuthor =
      cleanCData($("channel > itunes\\:author").first().text()) ||
      cleanCData($("channel > dc\\:creator").first().text()) ||
      cleanCData($("channel > author").first().text()) ||
      "";

    let channelGlobalCover = "";
    const itunesCover = $("channel > itunes\\:image").attr("href");
    if (itunesCover) {
      channelGlobalCover = itunesCover;
    } else {
      const flattenedUrl = $("channel > url").first().text();
      if (flattenedUrl) {
        channelGlobalCover = flattenedUrl;
      }
    }

    allItems.each((index, element) => {
      const itemXml = $(element);
      const rawItemTitle = itemXml.find("title").first().text();
      const title = cleanCData(rawItemTitle) || "未知剧集标题";
      const enclosureNode = itemXml.find("enclosure");
      const videoUrl = enclosureNode.attr("url");

      if (
        !videoUrl ||
        typeof videoUrl !== "string" ||
        !videoUrl.toLowerCase().startsWith("http")
      ) {
        return;
      }

      let pubDateStr = itemXml.find("pubDate").first().text().trim();
      let releaseDate = "";
      if (pubDateStr) {
        try {
          const date = new Date(pubDateStr);
          releaseDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        } catch (e) {
          /* 忽略无效日期 */
        }
      }

      let rawDescription =
        itemXml.find("description").first().text() ||
        itemXml.find("content\\:encoded").first().text() ||
        itemXml.find("itunes\\:summary").first().text();
      let descriptionText = cleanCData(rawDescription) || "";
      descriptionText = descriptionText
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&[a-zA-Z0-9#]+;/g, " ")
        .replace(/\s\s+/g, " ")
        .trim();
      if (descriptionText.length > 250) {
        descriptionText = descriptionText.substring(0, 247) + "...";
      }

      let durationText = itemXml
        .find("itunes\\:duration")
        .first()
        .text()
        .trim();
      if (durationText) {
        if (durationText.match(/^\d+$/)) {
          const seconds = parseInt(durationText, 10);
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = seconds % 60;
          durationText = `${minutes
            .toString()
            .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
        } else if (!durationText.includes(":")) {
          durationText = "";
        }
      }

      const episodeImage =
        itemXml.find("itunes\\:image").attr("href") || channelGlobalCover;
      const episodeAuthor =
        cleanCData(itemXml.find("itunes\\:author").first().text()) ||
        channelAuthor ||
        "";

      episodes.push({
        id: (totalEpisodes - index).toString(),
        type: "url",
        title: title,
        posterPath:
          episodeImage ||
          "https://placehold.co/200x300/A8D19E/F6F7F1?text=Made%5Cnby%5CnLove&font=source-sans-pro",
        backdropPath:
          episodeImage ||
          "https://placehold.co/200x300/A8D19E/F6F7F1?text=Made%5Cnby%5CnLove&font=source-sans-pro",
        releaseDate: releaseDate,
        mediaType: "audio",
        durationText: durationText,
        videoUrl: videoUrl,
        description: descriptionText,
        author: episodeAuthor,
      });
    });

    return episodes.reverse();
  } catch (error) {
    console.error(
      `fetchPodcastEpisodes: 解析播客单集失败 (${rssUrl}): ${error.message}`
    );
    throw error;
  }
}
