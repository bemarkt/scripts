if (typeof $response === "undefined" || !$response.body) $done({});

const url = $request.url;
let body = $response.body;

if (url.indexOf("startup") === -1 && url.indexOf("ads") === -1) {
  $done({});
}

try {
  let obj = JSON.parse(body);

  // 处理开屏广告 /startup/
  if (url.indexOf("startup") !== -1 && obj?.data) {
    obj.data.splash_ad = { enabled: false, overtime: 0, ad: null };

    obj.data.settings = {
      ...(obj.data.settings || {}),
      UPDATE_DESCRIPTION: "",
      NOTICE: "",
    };
    obj.data.feedback = { ...(obj.data.feedback || {}), placeholder: "" };
  }

  // 处理横幅广告 /ads/
  if (url.indexOf("ads") !== -1 && obj?.data) {
    obj.data.enabled = false;
    obj.data.ads = {};
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  console.log("JSON Parse Error: " + e);
  $done({});
}
