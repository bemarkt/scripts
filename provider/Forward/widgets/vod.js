var WidgetMetadata = {
  id: "ti.bemarkt.vod.maccms",
  title: "VOD",
  description: "获取 VOD 影视数据",
  author: "Ti",
  site: "https://github.com/bemarkt/scripts/tree/master/provider/Forward",
  version: "1.1.0",
  requiredVersion: "0.0.1",
  modules: [
    {
      title: "获取视频列表",
      description: "根据API地址、分类、页码等参数获取视频列表。",
      requiresWebView: false,
      functionName: "getVodList",
      params: [
        {
          name: "apiUrl",
          title: "视频源地址",
          type: "input",
          description:
            "当前仅支持苹果CMS的JSON API地址 (例如: https://example.com/api.php/provide/vod/)",
          value: "https://api.wwzy.tv/api.php/provide/vod/",
          placeholders: [
            {
              title: "极速资源",
              value: "https://jszyapi.com/api.php/provide/vod/",
            },
            {
              title: "木耳资源",
              value: "https://json02.heimuer.xyz/api.php/provide/vod/",
            },
            {
              title: "虾米资源",
              value: "https://gctf.tfdh.top/api.php/provide/vod/",
            },
            {
              title: "魔抓资源",
              value: "https://mozhuazy.com/api.php/provide/vod/",
            },
            {
              title: "无尽资源",
              value: "https://api.wujinapi.me/api.php/provide/vod/",
            },
            {
              title: "金鹰资源",
              value: "https://jyzyapi.com/provide/vod/from/jinyingm3u8/at/json",
            },
            {
              title: "旺旺短剧",
              value: "https://api.wwzy.tv/api.php/provide/vod/",
            },
            {
              title: "量子资源",
              value: "https://cj.lziapi.com/api.php/provide/vod/at/json/",
            },
            {
              title: "猫咪资源",
              value: "http://zy.xiaomaomi.cc/api.php/provide/vod/",
            },
            {
              title: "卧龙资源",
              value: "https://collect.wolongzy.cc/api.php/provide/vod/",
            },
            {
              title: "无忧资源",
              value: "https://www.wyvod.com/api.php/provide/vod/",
            },
            {
              title: "如意资源",
              value: "https://cj.rycjapi.com/api.php/provide/vod/at/json/",
            },
            {
              title: "九零资源",
              value: "https://oknnews.com/api.php/provide/vod/",
            },
            {
              title: "含羞资源",
              value: "https://api.souavzy.vip/api.php/provide/vod/",
            },
            {
              title: "玉兔资源",
              value: "https://apiyutu.com/api.php/provide/vod/",
            },
            {
              title: "魔抓资源",
              value: "https://mozhuazy.com/api.php/provide/vod/",
            },
            {
              title: "豆瓣资源",
              value: "https://caiji.dbzy.tv/api.php/provide/vod/at/josn/",
            },
            {
              title: "搜诶微",
              value: "https://api.souavzy.vip/api.php/provide/vod/",
            },
            {
              title: "阿里资源",
              value: "https://alivod.com/api.php/provide/vod/",
            },
            {
              title: "LSP",
              value: "https://apilsbzy1.com/api.php/provide/vod",
            },
            {
              title: "先锋资源",
              value: "http://60.204.225.89:1122/api.php/provide/vod/",
            },
          ],
        },
        {
          name: "t",
          title: "类别ID",
          type: "input",
          description: "视频分类ID (可留空)",
          value: "",
        },
        {
          name: "pg",
          title: "页码",
          type: "page",
          value: "1",
        },
        {
          name: "h",
          title: "最近几小时内",
          type: "input",
          description: "获取最近几小时内更新的内容 (例如: 24，可留空)",
          value: "",
        },
      ],
    },
  ],
  search: {
    title: "搜索视频",
    functionName: "searchVod",
    params: [
      {
        name: "apiUrl",
        title: "视频源地址",
        type: "input",
        description:
          "当前仅支持苹果CMS的JSON API地址 (例如: https://example.com/api.php/provide/vod/)",
        value: "https://api.wwzy.tv/api.php/provide/vod/",
        placeholders: [
          {
            title: "扶风资源",
            value: "http://60.204.225.89:1122/api.php/provide/vod/",
          },
          {
            title: "极速资源",
            value: "https://jszyapi.com/api.php/provide/vod/",
          },
          {
            title: "虾米资源",
            value: "https://zy.hls.one/api.php/provide/vod/",
          },
          {
            title: "魔抓资源",
            value: "https://mozhuazy.com/api.php/provide/vod/",
          },
          {
            title: "旺旺短剧",
            value: "https://api.wwzy.tv/api.php/provide/vod/",
          },
          {
            title: "量子资源",
            value: "https://cj.lziapi.com/api.php/provide/vod/at/json/",
          },
          {
            title: "如意资源",
            value: "https://cj.rycjapi.com/api.php/provide/vod/at/json/",
          },
          {
            title: "九零资源",
            value: "https://oknnews.com/api.php/provide/vod/",
          },
          {
            title: "猫咪资源",
            value: "http://zy.xiaomaomi.cc/api.php/provide/vod/",
          },
          {
            title: "豆瓣资源",
            value: "https://caiji.dbzy.tv/api.php/provide/vod/at/josn/",
          },
          {
            title: "含羞资源",
            value: "https://api.souavzy.vip/api.php/provide/vod/",
          },
          {
            title: "阿里资源",
            value: "https://alivod.com/api.php/provide/vod/",
          },
          {
            title: "卧龙资源",
            value: "https://collect.wolongzy.cc/api.php/provide/vod/",
          },
          {
            title: "无忧资源",
            value: "https://www.wyvod.com/api.php/provide/vod/",
          },
          {
            title: "玉兔资源",
            value: "https://apiyutu.com/api.php/provide/vod/",
          },
          {
            title: "先锋资源",
            value: "http://60.204.225.89:1122/api.php/provide/vod/",
          },
          {
            title: "搜诶微",
            value: "https://api.souavzy.vip/api.php/provide/vod/",
          },
          {
            title: "LSP",
            value: "https://apilsbzy1.com/api.php/provide/vod",
          },
        ],
      },
      {
        name: "wd",
        title: "关键词",
        type: "input",
        description: "搜索的关键词",
        value: "",
      },
      {
        name: "pg",
        title: "页码",
        type: "page",
        value: "1",
      },
    ],
  },
};

// API基础URL
var apiBaseUrl = "";

/**
 * 构建请求URL
 */
function buildRequestUrl(baseUrl, queryParams = {}) {
  let finalUrl = baseUrl;
  let firstParam = true;

  if (!finalUrl.endsWith("/") && !finalUrl.includes("?")) {
    const schemeIndex = finalUrl.indexOf("://");
    const pathPart =
      schemeIndex !== -1 ? finalUrl.substring(schemeIndex + 3) : finalUrl;
    if (
      !pathPart.includes(".") ||
      pathPart.substring(pathPart.lastIndexOf(".")).length > 5
    ) {
      finalUrl += "/";
    }
  }

  if (finalUrl.includes("?")) {
    firstParam = false;
  }

  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      const value = queryParams[key];
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        if (firstParam) {
          finalUrl += "?";
          firstParam = false;
        } else {
          finalUrl += "&";
        }
        finalUrl += `${encodeURIComponent(key)}=${encodeURIComponent(
          String(value)
        )}`;
      }
    }
  }
  return finalUrl;
}

/**
 * 从 vod_play_url 中解析剧集和播放链接 (供 loadDetail 使用)
 * @param {string} vodPlayUrl
 * @param {string} mainTitle - 视频主标题，用于生成剧集标题
 * @returns {{bestVideoUrl: string|null, episodeItems: Array<object>}}
 */
function parsePlayUrlData(vodPlayUrl, mainTitle = "播放") {
  const episodeItems = [];
  let bestVideoUrl = null;

  if (!vodPlayUrl || typeof vodPlayUrl !== "string") {
    console.warn(
      `parsePlayUrlData: vod_play_url is invalid. Received:`,
      vodPlayUrl
    );
    return { bestVideoUrl, episodeItems };
  }

  const playSources = vodPlayUrl.split("$$$");

  const m3u8Sources = playSources.filter((s) =>
    s.toLowerCase().includes(".m3u8")
  );
  const otherSources = playSources.filter(
    (s) => !s.toLowerCase().includes(".m3u8")
  );
  const sortedSources = [...m3u8Sources, ...otherSources];

  for (const sourceString of sortedSources) {
    if (!sourceString || typeof sourceString !== "string") continue;

    if (
      sourceString.toLowerCase().startsWith("http") &&
      !sourceString.includes("#") &&
      !sourceString.includes("$")
    ) {
      const directUrl = sourceString.trim();
      if (
        !bestVideoUrl ||
        (directUrl.toLowerCase().includes(".m3u8") &&
          (!bestVideoUrl || !bestVideoUrl.toLowerCase().includes(".m3u8")))
      ) {
        bestVideoUrl = directUrl;
      }
      episodeItems.push({
        id: (episodeItems.length + 1).toString(), // 自增ID
        type: "url",
        title: mainTitle,
        videoUrl: directUrl,
        mediaType: "tv",
      });
      if (
        bestVideoUrl &&
        bestVideoUrl.toLowerCase().includes(".m3u8") &&
        episodeItems.length > 0
      ) {
        break;
      }
      continue;
    }

    if (sourceString.includes("$")) {
      const episodes = sourceString.split("#");
      for (const episodeString of episodes) {
        if (!episodeString || typeof episodeString !== "string") continue;

        const parts = episodeString.split("$");
        let episodeName = "";
        let potentialUrl = "";

        if (parts.length >= 2) {
          episodeName = parts[0].trim() || `第 ${episodeItems.length + 1} 集`;
          potentialUrl = parts[1].trim();
        } else if (
          parts.length === 1 &&
          parts[0].trim().toLowerCase().startsWith("http")
        ) {
          potentialUrl = parts[0].trim();
          episodeName = `播放 ${episodeItems.length + 1}`;
        }

        if (potentialUrl && potentialUrl.toLowerCase().startsWith("http")) {
          if (
            !bestVideoUrl ||
            (potentialUrl.toLowerCase().includes(".m3u8") &&
              (!bestVideoUrl || !bestVideoUrl.toLowerCase().includes(".m3u8")))
          ) {
            bestVideoUrl = potentialUrl;
          }
          episodeItems.push({
            id: (episodeItems.length + 1).toString(),
            type: "url",
            title: episodeName,
            videoUrl: potentialUrl,
            mediaType: "episode",
          });
        }
      }
      if (
        episodeItems.length > 0 &&
        bestVideoUrl &&
        bestVideoUrl.toLowerCase().includes(".m3u8")
      ) {
        break;
      }
    }
  }
  return { bestVideoUrl, episodeItems };
}

/**
 * 解析接口视频数据
 * @param {object} apiVideoData - 从API获取的单个视频对象
 * @returns {object} Forward VideoItem格式的对象
 */
function parseItemFromListApi(apiVideoData) {
  const numericalVodId = String(apiVideoData.vod_id);
  const detailPageApiUrl = buildRequestUrl(apiBaseUrl, {
    ac: "detail",
    ids: numericalVodId,
  });

  let mediaType = "movie";
  if (apiVideoData.type_name) {
    const typeName = String(apiVideoData.type_name).toLowerCase();
    if (
      typeName.includes("剧") ||
      typeName.includes("电视") ||
      typeName.includes("连续") ||
      typeName.includes("系列") ||
      typeName.includes("动漫")
    ) {
      mediaType = "tv";
    }
  }

  if (
    apiVideoData.vod_remarks &&
    String(apiVideoData.vod_remarks).match(/第(\d+|全)集/) &&
    mediaType === "movie"
  ) {
    mediaType = "tv";
  }

  return {
    id: detailPageApiUrl,
    type: "url",
    title: apiVideoData.vod_name || "未知标题",
    posterPath: apiVideoData.vod_pic,
    backdropPath: apiVideoData.vod_pic_slide || apiVideoData.vod_pic,
    releaseDate: apiVideoData.vod_time,
    mediaType: mediaType,
    genreTitle: apiVideoData.type_name,
    description:
      apiVideoData.vod_blurb ||
      apiVideoData.vod_remarks ||
      apiVideoData.vod_content,
    link: detailPageApiUrl,
  };
}

/**
 * 获取视频列表
 */
async function getVodList(params = {}) {
  const apiUrl = params.apiUrl;
  if (!apiUrl || String(apiUrl).trim() === "") {
    throw new Error("API源地址 (apiUrl) 不能为空");
  }
  apiBaseUrl = apiUrl.trim();

  const queryParams = {
    ac: "videolist",
    t: params.t,
    pg: params.pg,
    h: params.h,
  };

  const requestUrl = buildRequestUrl(apiBaseUrl, queryParams);
  console.log(`getVodList: 请求VOD列表API: ${requestUrl}`);

  try {
    const response = await Widget.http.get(requestUrl);
    const data = response.data;

    if (!data) {
      console.error(
        "getVodList: API请求失败，未收到任何数据。URL:",
        requestUrl
      );
      throw new Error("API请求失败: 未收到任何数据。");
    }
    if (data.code !== 1) {
      const errorMsg = data.msg || "未知API错误";
      console.error(
        "getVodList: API请求返回错误:",
        errorMsg,
        "响应代码:",
        data.code
      );
      throw new Error(`API请求失败: ${errorMsg} (code: ${data.code})`);
    }

    if (data.list && Array.isArray(data.list)) {
      const resultList = data.list.map((apiItem) =>
        parseItemFromListApi(apiItem)
      );
      console.log(`getVodList: 成功解析 ${resultList.length} 个视频项目。`);
      return resultList;
    } else {
      console.warn(
        "getVodList: API返回的视频列表 'list' 为空或格式不正确。",
        data
      );
      return [];
    }
  } catch (error) {
    console.error(
      `getVodList: 获取视频列表时发生错误 (${requestUrl}):`,
      error.message,
      error.stack
    );
    throw new Error(`获取视频列表失败: ${error.message}.`);
  }
}

/**
 * 搜索视频
 */
async function searchVod(params = {}) {
  const apiUrl = params.apiUrl;
  if (!apiUrl || String(apiUrl).trim() === "") {
    throw new Error("API源地址 (apiUrl) 不能为空");
  }
  apiBaseUrl = apiUrl.trim();

  const keyword = params.wd;

  const queryParams = {
    ac: "videolist",
    wd: keyword,
    pg: params.pg,
  };

  const requestUrl = buildRequestUrl(apiBaseUrl, queryParams);
  console.log(`searchVod: 请求VOD搜索API: ${requestUrl}`);

  try {
    const response = await Widget.http.get(requestUrl);
    const data = response.data;

    if (!data) {
      console.error("searchVod: API搜索失败，未收到任何数据。URL:", requestUrl);
      throw new Error("API搜索失败: 未收到任何数据。");
    }
    if (data.code !== 1) {
      const errorMsg = data.msg || "未知API错误";
      console.error(
        "searchVod: API搜索返回错误:",
        errorMsg,
        "响应代码:",
        data.code
      );
      throw new Error(`API搜索失败: ${errorMsg} (code: ${data.code})`);
    }

    if (data.list && Array.isArray(data.list)) {
      const resultList = data.list.map((apiItem) =>
        parseItemFromListApi(apiItem)
      );
      console.log(`searchVod: 成功解析 ${resultList.length} 个搜索结果。`);
      return resultList;
    } else {
      console.warn(
        "searchVod: API搜索返回的视频列表 'list' 为空或格式不正确。",
        data
      );
      return [];
    }
  } catch (error) {
    console.error(
      `searchVod: 搜索视频时发生错误 (${requestUrl}):`,
      error.message,
      error.stack
    );
    throw new Error(`搜索视频失败: ${error.message}.`);
  }
}

/**
 * 爽看
 */
async function loadDetail(detailPageApiUrl) {
  if (!detailPageApiUrl || typeof detailPageApiUrl !== "string") {
    console.error(
      "loadDetail: 无效的 detailPageApiUrl 参数:",
      detailPageApiUrl
    );
    throw new Error("无效的参数：detailPageApiUrl 不能为空。");
  }

  let numericalVodId = "";
  try {
    const idsMatch = detailPageApiUrl.match(/[?&]ids=(\d+)/);
    if (idsMatch && idsMatch[1]) {
      numericalVodId = idsMatch[1];
    } else {
      console.error(
        "loadDetail: 无法从 detailPageApiUrl 中提取 'ids' 参数:",
        detailPageApiUrl
      );
      throw new Error("无法解析视频ID从详情URL。");
    }
  } catch (e) {
    console.error(
      "loadDetail: 解析 detailPageApiUrl 时出错:",
      detailPageApiUrl,
      e
    );
    throw new Error("详情URL格式无效。");
  }

  console.log(`loadDetail: 请求VOD详情API: ${detailPageApiUrl}`);

  try {
    const response = await Widget.http.get(detailPageApiUrl);
    const data = response.data;

    if (
      !data ||
      data.code !== 1 ||
      !Array.isArray(data.list) ||
      data.list.length === 0
    ) {
      const errorMsg = data ? data.msg || "未知API错误" : "未收到任何数据";
      console.error(
        "loadDetail: 详情API请求失败或返回数据无效:",
        errorMsg,
        "响应代码:",
        data ? data.code : "N/A"
      );
      throw new Error(`详情API请求失败: ${errorMsg}`);
    }

    const videoInfo = data.list[0];
    const parsedPlayData = parsePlayUrlData(
      videoInfo.vod_play_url,
      videoInfo.vod_name
    );
    const parsedEpisodeCount = parsedPlayData.episodeItems.length;

    let returnObject = {
      id: detailPageApiUrl,
      type: "url",
      title: videoInfo.vod_name || "未知标题",
      description:
        videoInfo.vod_blurb ||
        videoInfo.vod_remarks ||
        videoInfo.vod_content ||
        "",
      posterPath: videoInfo.vod_pic,
      backdropPath: videoInfo.vod_pic_slide || videoInfo.vod_pic,
      releaseDate: videoInfo.vod_time,
      genreTitle: videoInfo.type_name,
      videoUrl: parsedPlayData.bestVideoUrl,
      link: detailPageApiUrl,
    };

    // 解析集数
    if (parsedEpisodeCount > 1) {
      returnObject.mediaType = "tv";
      returnObject.episodeItems = parsedPlayData.episodeItems;

      let totalEpisodes = parsedEpisodeCount;
      if (videoInfo.vod_remarks) {
        const remarks = String(videoInfo.vod_remarks);
        const match = remarks.match(/(?:全|至|更新至|第)\s*(\d+)\s*集/);
        if (match && match[1]) {
          totalEpisodes = parseInt(match[1], 10);
        }
      }
      returnObject.episode = totalEpisodes;
    } else {
      // 单集或电影
      let finalMediaType = "movie";
      if (videoInfo.type_name) {
        const typeName = String(videoInfo.type_name).toLowerCase();
        if (
          typeName.includes("剧") ||
          typeName.includes("电视") ||
          typeName.includes("动漫") ||
          typeName.includes("连续") ||
          typeName.includes("系列")
        ) {
          finalMediaType = "tv";
        }
      }
      if (
        videoInfo.vod_remarks &&
        String(videoInfo.vod_remarks).includes("集")
      ) {
        finalMediaType = "tv";
      }
      returnObject.mediaType = finalMediaType;
    }

    console.log("loadDetail returning object:", returnObject);
    return returnObject;
  } catch (error) {
    console.error(
      `loadDetail: 加载视频详情时发生错误 (ID: ${numericalVodId}, URL: ${detailPageApiUrl}):`,
      error.message,
      error.stack
    );
    throw new Error(`加载视频详情失败: ${error.message}.`);
  }
}
