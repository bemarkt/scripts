/*
整合优化版本
更新日期: 2024-10-27
版本: V1.0.0
*/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

// 通用方法：检查数组是否存在并过滤
const filterArray = (arr, condition) => {
  return arr?.length > 0 ? arr.filter(condition) : arr;
};

// 处理详情页
if (url.includes("/feed/detail") || url.includes("/detail")) {
  // 处理评论
  obj.data.hotReplyRows = filterArray(
    obj.data?.hotReplyRows,
    (item) => item?.id
  );
  obj.data.topReplyRows = filterArray(
    obj.data?.topReplyRows,
    (item) => item?.id
  );

  // 清理广告相关数据
  const itemsToClear = [
    "detailSponsorCard",
    "include_goods",
    "include_goods_ids",
  ];
  itemsToClear.forEach((key) => {
    if (obj.data?.[key]) {
      obj.data[key] = [];
    }
  });
}
// 处理评论列表
else if (url.includes("/feed/replyList") || url.includes("replyList")) {
  obj.data = filterArray(obj.data, (item) => item?.id);
}
// 处理数据列表
else if (
  url.includes("/main/dataList") ||
  url.includes("/page/dataList") ||
  url.includes("dataList")
) {
  obj.data = filterArray(obj.data, (item) => {
    const blockedTemplates = [
      "sponsorCard",
      "iconButtonGridCard",
      "iconLargeScrollCard",
      "imageScaleCard",
    ];
    const blockedTitles = ["精选配件", "酷安热搜", "流量"];

    return !(
      blockedTemplates.includes(item?.entityTemplate) ||
      blockedTitles.some((title) => item?.title?.includes(title))
    );
  });
}
// 处理首页V8
else if (url.includes("/main/indexV8")) {
  obj.data = filterArray(obj.data, (item) => {
    const blockedEntityIds = [8639, 29349, 33006, 32557];
    const blockedKeywords = ["值得买", "红包"];

    return !(
      item?.entityTemplate === "sponsorCard" ||
      blockedEntityIds.includes(item?.entityId) ||
      blockedKeywords.some((keyword) => item?.title?.includes(keyword))
    );
  });
}
// 处理主页初始化
else if (url.includes("/main/init")) {
  if (obj.data?.length > 0) {
    // 过滤主要数据
    let newData = obj.data.filter((item) => {
      const blockedIds = [944, 945, 6390]; // 944热门搜索 945开屏广告 6390首页Tab
      return !blockedIds.includes(item?.entityId);
    });

    // 处理发现页顶部项目
    newData = newData.map((item) => {
      if (item?.entityId === 20131 && item?.entities?.length > 0) {
        item.entities = item.entities.filter((i) => i?.title !== "酷品");
      }
      return item;
    });

    obj.data = newData;
  }
}

$done({ body: JSON.stringify(obj) });
