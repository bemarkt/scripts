var WidgetMetadata = {
  id: "ti.bemarkt.podcast",
  title: "Podcast",
  version: "2.0.0",
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
          description: "包含播客RSS列表的JSON文件URL",
          value: "",
          placeholders: [
            {
              title: "Ti's Podcast List",
              value:
                "https://gist.githubusercontent.com/bemarkt/30c24fbd840284220773d7a36f2fce4a/raw/podcast.json",
            },
          ],
        },
      ],
    },
  ],
};

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
 * 从JSON格式的订阅地址加载播客列表
 */
async function getPodcastsFromJson(params = {}) {
  const { jsonUrl } = params;
  if (!jsonUrl || !jsonUrl.toLowerCase().startsWith("http")) {
    return [
      {
        id: "invalid_json_url_" + Date.now(),
        type: "url",
        title: "错误：无效的JSON地址",
        description: "请提供一个有效的、可公开访问的JSON文件URL。",
        posterPath:
          "https://placehold.co/200x300/A8D19E/F6F7F1?text=Made%5Cnby%5CnLove&font=source-sans-pro",
      },
    ];
  }
  try {
    const response = await Widget.http.get(jsonUrl);
    if (!response || !response.data) {
      throw new Error("无法获取JSON文件，或文件内容为空。");
    }
    const podcasts = response.data;
    if (!Array.isArray(podcasts)) {
      throw new Error("JSON文件格式不正确，期望得到一个对象数组。");
    }
    const podcastItemsPromises = podcasts.map(async (podcast) => {
      if (!podcast.rssUrl) return null;
      const channelInfo = await getPodcastChannelInfo(podcast.rssUrl);
      if (!channelInfo) {
        return {
          id: podcast.rssUrl,
          type: "url",
          title: podcast.title || "播客加载失败",
          description: "无法从此RSS源获取信息，但仍可尝试点击加载。",
          posterPath:
            "https://placehold.co/200x300/A8D19E/F6F7F1?text=Made%5Cnby%5CnLove&font=source-sans-pro",
          backdropPath:
            "https://placehold.co/200x300/A8D19E/F6F7F1?text=Made%5Cnby%5CnLove&font=source-sans-pro",
          mediaType: "audio",
          genreTitle: "播客",
          link: podcast.rssUrl,
        };
      }
      return {
        id: podcast.rssUrl,
        type: "url",
        title: channelInfo.title || podcast.title || "未知播客",
        posterPath:
          channelInfo.cover ||
          "https://placehold.co/200x300/A8D19E/F6F7F1?text=Made%5Cnby%5CnLove&font=source-sans-pro",
        backdropPath:
          channelInfo.cover ||
          "https://placehold.co/200x300/A8D19E/F6F7F1?text=Made%5Cnby%5CnLove&font=source-sans-pro",
        description: channelInfo.description,
        mediaType: "audio",
        genreTitle: "播客",
        link: podcast.rssUrl,
      };
    });
    return (await Promise.all(podcastItemsPromises)).filter(Boolean);
  } catch (error) {
    console.error(`处理JSON播客列表失败 (${jsonUrl}): ${error.message}`);
    return [
      {
        id: "json_error_" + Date.now(),
        type: "url",
        title: "JSON处理异常",
        description: `处理此JSON文件时发生错误: ${error.message}`,
        posterPath:
          "https://placehold.co/200x300/A8D19E/F6F7F1?text=Made%5Cnby%5CnLove&font=source-sans-pro",
      },
    ];
  }
}

/**
 * 获取播客频道基本信息 (标题、封面、描述)
 */
async function getPodcastChannelInfo(rssUrl) {
  try {
    const response = await Widget.http.get(rssUrl);
    if (!response || !response.data) {
      console.warn(`获取RSS Feed失败，无响应数据: ${rssUrl}`);
      return null;
    }

    const xmlString = response.data;
    const $ = Widget.html.load(xmlString, {
      xml: { decodeEntities: false },
    });

    const rawChannelTitle = $("channel > title").first().text();
    const channelTitle = cleanCData(rawChannelTitle) || "未知播客频道";

    let channelCover = "";
    const itunesCover = $("channel > itunes\\:image").attr("href");
    if (itunesCover) {
      channelCover = itunesCover;
    } else {
      // FW的cheerio存在bug，<image>直接被解析拆分成<img>, <url>, <title>, <link>
      // 直接查找<channel>下的<url>标签
      const flattenedUrl = $("channel > url").first().text();
      if (flattenedUrl) {
        channelCover = flattenedUrl;
      }
    }

    let rawChannelDescription = $("channel > description").first().text();
    let channelDescription = cleanCData(rawChannelDescription);
    channelDescription = channelDescription
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&[a-zA-Z0-9#]+;/g, " ")
      .replace(/\s\s+/g, " ")
      .trim();

    if (channelDescription.length > 200) {
      channelDescription = channelDescription.substring(0, 197) + "...";
    }
    if (!channelDescription) {
      channelDescription = "暂无描述信息。";
    }

    return {
      title: channelTitle,
      cover: channelCover,
      description: channelDescription,
    };
  } catch (error) {
    console.error(`获取播客频道信息失败 (${rssUrl}): ${error.message}`);
    return null;
  }
}

/**
 * 加载播客详情，包括剧集列表
 */
async function loadDetail(channelRssUrl) {
  if (
    !channelRssUrl ||
    typeof channelRssUrl !== "string" ||
    !channelRssUrl.toLowerCase().includes("http")
  ) {
    return {
      id: channelRssUrl || "unknown_id_on_error_in_loadDetail_" + Date.now(),
      type: "url",
      title: "错误：无效的播客链接",
      description: "传递给loadDetail的链接不是一个有效的播客频道RSS URL。",
      posterPath:
        "https://placehold.co/200x300/A8D19E/F6F7F1?text=Made%5Cnby%5CnLove&font=source-sans-pro",
      episodeItems: [],
      videoUrl: null,
    };
  }

  try {
    const episodes = await fetchPodcastEpisodes(channelRssUrl);
    const channelInfo = await getPodcastChannelInfo(channelRssUrl);

    let firstEpisodeUrl = null;
    if (episodes && episodes.length > 0 && episodes[0].videoUrl) {
      firstEpisodeUrl = episodes[0].videoUrl;
    }

    if (!channelInfo) {
      return {
        id: channelRssUrl,
        type: "url",
        title: "播客频道 (信息加载不全)",
        description: "无法完全加载此播客频道的详细信息，但剧集列表可能可用。",
        posterPath:
          "https://placehold.co/200x300/A8D19E/F6F7F1?text=Made%5Cnby%5CnLove&font=source-sans-pro",
        episodeItems: episodes,
        videoUrl: firstEpisodeUrl,
      };
    }

    return {
      id: channelRssUrl,
      type: "url",
      title: channelInfo.title,
      posterPath:
        channelInfo.cover ||
        "https://placehold.co/200x300/A8D19E/F6F7F1?text=Made%5Cnby%5CnLove&font=source-sans-pro",
      backdropPath:
        channelInfo.cover ||
        "https://placehold.co/200x300/A8D19E/F6F7F1?text=Made%5Cnby%5CnLove&font=source-sans-pro",
      description: channelInfo.description,
      episodeItems: episodes,
      videoUrl: firstEpisodeUrl,
    };
  } catch (error) {
    console.error(
      `loadDetail: 为播客频道 (RSS: ${channelRssUrl}) 加载剧集失败: ${error.message}`
    );
    return {
      id: channelRssUrl,
      type: "url",
      title: "播客剧集加载失败",
      description: `无法加载此播客频道的剧集列表 (源: ${channelRssUrl})。错误: ${error.message}`,
      posterPath:
        "https://placehold.co/200x300/A8D19E/F6F7F1?text=Made%5Cnby%5CnLove&font=source-sans-pro",
      videoUrl: null,
    };
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

      const episodeId = (totalEpisodes - index).toString();
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
        id: episodeId,
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
