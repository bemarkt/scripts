/*
脚本引用 https://github.com/ddgksf2013/Scripts/raw/master/coolapk.js
更新时间 2024-10-25
*/

const version = "V1.0.11";

if (-1 != $request.url.indexOf("replyList")) {
  var t = JSON.parse($response.body);
  t.data.length && (t.data = t.data.filter((t) => t.id)),
    $done({ body: JSON.stringify(t) });
} else if (-1 != $request.url.indexOf("main/init")) {
  var t = JSON.parse($response.body);
  t.data.length &&
    (t.data = t.data.filter((t) => !(945 == t.entityId || 6390 == t.entityId))),
    $done({ body: JSON.stringify(t) });
} else if (-1 != $request.url.indexOf("indexV8")) {
  var t = JSON.parse($response.body);
  (t.data = t.data.filter(
    (t) =>
      !(
        "sponsorCard" == t.entityTemplate ||
        8639 == t.entityId ||
        29349 == t.entityId ||
        33006 == t.entityId ||
        32557 == t.entityId ||
        -1 != t.title.indexOf("值得买") ||
        -1 != t.title.indexOf("红包")
      )
  )),
    $done({ body: JSON.stringify(t) });
} else if (-1 != $request.url.indexOf("dataList")) {
  var t = JSON.parse($response.body);
  (t.data = t.data.filter(
    (t) =>
      !["sponsorCard", "iconButtonGridCard", "iconLargeScrollCard"].includes(
        t.entityTemplate
      ) && !/流量|精选配件/.test(t.title)
  )),
    $done({ body: JSON.stringify(t) });
} else if (-1 != $request.url.indexOf("detail")) {
  var t = JSON.parse($response.body);
  t.data?.hotReplyRows?.length &&
    (t.data.hotReplyRows = t.data.hotReplyRows.filter((t) => t.id)),
    t.data?.topReplyRows?.length &&
      (t.data.topReplyRows = t.data.topReplyRows.filter((t) => t.id)),
    t.data?.include_goods_ids && (t.data.include_goods_ids = []),
    t.data?.include_goods && (t.data.include_goods = []),
    t.data?.detailSponsorCard && (t.data.detailSponsorCard = []),
    $done({ body: JSON.stringify(t) });
} else $done({});