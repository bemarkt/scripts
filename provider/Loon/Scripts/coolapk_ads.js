/*
整合优化版本
更新日期: 2024-10-27
版本: V1.1.0
*/

const url = $request.url;
if (!$response.body) $done({});
const obj = JSON.parse($response.body);

const URL_PATTERNS = {
  detail: /\/(feed\/detail|detail)/,
  replyList: /\/(feed\/replyList|replyList)/,
  dataList: /\/(main\/dataList|page\/dataList|dataList)/,
  indexV8: /\/main\/indexV8/,
  init: /\/main\/init/,
};

const BLOCKED_CONFIGS = {
  templates: [
    "sponsorCard",
    "iconButtonGridCard",
    "iconLargeScrollCard",
    "imageScaleCard",
  ],
  titles: ["精选配件", "酷安热搜", "流量"],
  entityIds: [8639, 29349, 33006, 32557, 944, 945, 6390],
  keywords: ["值得买", "红包"],
};

const filterArray = (arr, condition) => arr?.filter(condition) || arr;

if (URL_PATTERNS.detail.test(url)) {
  // 处理评论
  obj.data.hotReplyRows = filterArray(
    obj.data?.hotReplyRows,
    (item) => item?.id
  );
  obj.data.topReplyRows = filterArray(
    obj.data?.topReplyRows,
    (item) => item?.id
  );

  // 清理广告数据
  ["detailSponsorCard", "include_goods", "include_goods_ids"].forEach((key) => {
    obj.data[key] = [];
  });
} else if (URL_PATTERNS.replyList.test(url)) {
  obj.data = filterArray(obj.data, (item) => item?.id);
} else if (URL_PATTERNS.dataList.test(url)) {
  obj.data = filterArray(
    obj.data,
    (item) =>
      !(
        BLOCKED_CONFIGS.templates.includes(item?.entityTemplate) ||
        BLOCKED_CONFIGS.titles.some((title) => item?.title?.includes(title))
      )
  );
} else if (URL_PATTERNS.indexV8.test(url)) {
  obj.data = filterArray(
    obj.data,
    (item) =>
      !(
        item?.entityTemplate === "sponsorCard" ||
        BLOCKED_CONFIGS.entityIds.includes(item?.entityId) ||
        BLOCKED_CONFIGS.keywords.some((keyword) =>
          item?.title?.includes(keyword)
        )
      )
  );
} else if (URL_PATTERNS.init.test(url)) {
  if (obj.data?.length) {
    obj.data = obj.data
      .filter((item) => !BLOCKED_CONFIGS.entityIds.includes(item?.entityId))
      .map((item) => {
        if (item?.entityId === 20131 && item?.entities?.length) {
          item.entities = item.entities.filter((i) => i?.title !== "酷品");
        }
        return item;
      });
  }
}

$done({ body: JSON.stringify(obj) });
