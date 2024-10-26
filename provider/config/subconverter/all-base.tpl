{% if request.target == "clash" or request.target == "clashr" %}

mixed-port: {{ default(request.clash.mixed_port,"8888") }}
redir-port: {{ default(request.clash.redir_port,"8890") }}
# authentication:
#  - "username:password"
allow-lan: {{ default(request.clash.allow_lan,"true") }}
mode: {{ default(request.clash.mode,"rule") }}
log-level: {{ default(request.clash.log_level,"silent") }}
ipv6: {{ default(request.clash.ipv6,"true")}}
external-controller: {{ default(request.clash.api_port,"0.0.0.0:9090")}}

profile:
  store-selected: true
  store-fake-ip: true
  tracing: false

{% if exists("request.clash.dns") %}
{% if request.clash.dns == "tap" %}
dns:
  enable: true
  listen: 0.0.0.0:53
{% endif %}
{% if request.clash.dns == "tun" %}
tun:
  enable: true
  stack: system # or gvisor
  dns-hijack:
    - 198.18.0.2:53 # when `fake-ip-range` is 198.18.0.1/16, should hijack 198.18.0.2:53
  auto-route: true
  auto-detect-interface: true
dns:
  enable: true
#  listen: 0.0.0.0:53
{% endif %}
{% if request.clash.dns == "cfa" %}
dns:
  enable: true
  listen: 0.0.0.0:1053
{% endif %}
{% else %}
dns:
  enable: true
  listen: 0.0.0.0:1053
{% endif %}
{% if exists("request.clash.ipv6") %}
  ipv6: {{ request.clash.ipv6 }}
{% else %}
  ipv6: false
{% endif %}
  enhanced-mode: fake-ip
#  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    # === LAN ===
    - '*.example'
    - '*.home.arpa'
    - '*.invalid'
    - '*.lan'
    - '*.local'
    - '*.localdomain'
    - '*.localhost'
    - '*.test'
    # === Apple Software Update Service ===
    - 'mesu.apple.com'
    - 'swscan.apple.com'
    # === ASUS Router ===
    - '*.router.asus.com'
    # === Google ===
    - 'lens.l.google.com'
    - 'stun.l.google.com'
    ## Golang
    - 'proxy.golang.org'
    # === Linksys Wireless Router ===
    - '*.linksys.com'
    - '*.linksyssmartwifi.com'
    # === Windows Connnect Detection ===
    - '+.ipv6.microsoft.com'
    - '+.msftconnecttest.com'
    - '+.msftncsi.com'
    # === NTP Service ===
    - 'ntp.*.com'
    - 'ntp1.*.com'
    - 'ntp2.*.com'
    - 'ntp3.*.com'
    - 'ntp4.*.com'
    - 'ntp5.*.com'
    - 'ntp6.*.com'
    - 'ntp7.*.com'
    - 'time.*.apple.com'
    - 'time.*.com'
    - 'time.*.gov'
    - 'time1.*.com'
    - 'time2.*.com'
    - 'time3.*.com'
    - 'time4.*.com'
    - 'time5.*.com'
    - 'time6.*.com'
    - 'time7.*.com'
    - 'time.*.edu.cn'
    - '*.time.edu.cn'
    - '*.ntp.org.cn'
    - '+.pool.ntp.org'
    - 'time1.cloud.tencent.com'
    # === Game Service ===
    ## Microsoft Xbox
    - 'speedtest.cros.wr.pvp.net'
    - '*.*.xboxlive.com'
    - 'xbox.*.*.microsoft.com'
    - 'xbox.*.microsoft.com'
    - 'xnotify.xboxlive.com'
    ## Nintendo Switch
    - '*.*.*.srv.nintendo.net'
    - '+.srv.nintendo.net'
    ## Sony PlayStation
    - '*.*.stun.playstation.net'
    - '+.stun.playstation.net'
    ## STUN Server
    - '+.stun.*.*.*.*'
    - '+.stun.*.*.*'
    - '+.stun.*.*'
    - 'stun.*.*.*'
    - 'stun.*.*'
    # === Music Service ===
    ## 咪咕音乐
    - '*.music.migu.cn'
    - 'music.migu.cn'
    ## 太和音乐
    - 'music.taihe.com'
    - 'musicapi.taihe.com'
    ## 腾讯音乐
    - 'songsearch.kugou.com'
    - 'trackercdn.kugou.com'
    - '*.kuwo.cn'
    - 'api-jooxtt.sanook.com'
    - 'api.joox.com'
    - 'joox.com'
    - 'y.qq.com'
    - '*.y.qq.com'
    - 'amobile.music.tc.qq.com'
    - 'aqqmusic.tc.qq.com'
    - 'mobileoc.music.tc.qq.com'
    - 'streamoc.music.tc.qq.com'
    - 'dl.stream.qqmusic.qq.com'
    - 'isure.stream.qqmusic.qq.com'
    ## 网易云音乐
    - 'music.163.com'
    - '*.music.163.com'
    - '*.126.net'
    ## 虾米音乐
    - '*.xiami.com'
    # === Other ===
    ## QQ Quick Login
    - 'localhost.ptlogin2.qq.com'
    - 'localhost.sec.qq.com'
    ## BiliBili P2P
    - '*.mcdn.bilivideo.cn'
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  nameserver:
    - 119.29.29.29
    - 185.222.222.222
    - 208.67.222.222:5353
    - https://doh.pub/dns-query
    - https://dns.alidns.com/dns-query
    - https://dns.rubyfish.cn/dns-query
  fallback:
    - https://doh.dns.sb/dns-query
    - https://i.233py.com/dns-query
    - https://dns.google/dns-query
    - https://cloudflare-dns.com/dns-query
    - https://doh.opendns.com/dns-query
    - https://dns.twnic.tw/dns-query
    - https://dns.adguard.com/dns-query
  fallback-filter:
    geoip: true # default
    geoip-code: CN
    ipcidr: # ips in these subnets will be considered polluted
      - 0.0.0.0/32
      - 100.64.0.0/10
      - 127.0.0.0/8
      - 240.0.0.0/4
      - 255.255.255.255/32

proxy-providers:
  HK:
    type: http
    path: ./proxy-providers/mdss-hk.yaml
    url: {{ "https://converter-theta.vercel.app/sub?target=clash&list=true&include=香港&udp=true&config=https%3A%2F%2Fgit.io%2FJyCWK&url=" + request.suburl }}
    interval: 86400
    health-check:
      enable: true
      url: http://www.gstatic.com/generate_204
      interval: 300
  TW:
    type: http
    path: ./proxy-providers/mdss-tw.yaml
    url: {{ "https://converter-theta.vercel.app/sub?target=clash&list=true&include=台湾&udp=true&config=https%3A%2F%2Fgit.io%2FJyCWK&url=" + request.suburl }}
    interval: 86400
    health-check:
      enable: true
      url: http://www.gstatic.com/generate_204
      interval: 300
  JP:
    type: http
    path: ./proxy-providers/mdss-jp.yaml
    url: {{ "https://converter-theta.vercel.app/sub?target=clash&list=true&include=日本&udp=true&config=https%3A%2F%2Fgit.io%2FJyCWK&url=" + request.suburl }}
    interval: 86400
    health-check:
      enable: true
      url: http://www.gstatic.com/generate_204
      interval: 300
  KR:
    type: http
    path: ./proxy-providers/mdss-kr.yaml
    url: {{ "https://converter-theta.vercel.app/sub?target=clash&list=true&include=韩国&udp=true&config=https%3A%2F%2Fgit.io%2FJyCWK&url=" + request.suburl }}
    interval: 86400
    health-check:
      enable: true
      url: http://www.gstatic.com/generate_204
      interval: 300
  SG:
    type: http
    path: ./proxy-providers/mdss-sg.yaml
    url: {{ "https://converter-theta.vercel.app/sub?target=clash&list=true&include=新加坡&udp=true&config=https%3A%2F%2Fgit.io%2FJyCWK&url=" + request.suburl }}
    interval: 86400
    health-check:
      enable: true
      url: http://www.gstatic.com/generate_204
      interval: 300
  US:
    type: http
    path: ./proxy-providers/mdss-us.yaml
    url: {{ "https://converter-theta.vercel.app/sub?target=clash&list=true&include=美国&udp=true&config=https%3A%2F%2Fgit.io%2FJyCWK&url=" + request.suburl }}
    interval: 86400
    health-check:
      enable: true
      url: http://www.gstatic.com/generate_204
      interval: 300
  Other:
    type: http
    path: ./proxy-providers/mdss-other.yaml
    url: {{ "https://converter-theta.vercel.app/sub?target=clash&list=true&exclude=美国|新加坡|日本|台湾|香港&udp=true&config=https%3A%2F%2Fgit.io%2FJyCWK&url=" + request.suburl }}
    interval: 86400
    health-check:
      enable: true
      url: http://www.gstatic.com/generate_204
      interval: 300
  cordcloud-kr:
    type: http
    path: ./proxy-providers/cordcloud-kr.yaml
    url: {{ "https://converter-theta.vercel.app/sub?target=clash&list=true&include=韩国&config=https%3A%2F%2Fgit.io%2FJyCWK&url=" + request.suburl }}
    interval: 86400
    health-check:
      enable: true
      url: http://www.gstatic.com/generate_204
      interval: 180
rule-providers:
  AdditionalDirect:
    type: http
    behavior: classical
    path: ./rule-providers/AdditionalDirect.yaml
    url: https://cdn.jsdelivr.net/gh/bemarkt/scripts@master/provider/ruleset/AdditionalDirect.yaml
    interval: 43200
  AdditionalProxy:
    type: http
    behavior: classical
    path: ./rule-providers/AdditionalProxy.yaml
    url: https://cdn.jsdelivr.net/gh/bemarkt/scripts@master/provider/ruleset/AdditionalProxy.yaml
    interval: 43200
  Adult:
    type: http
    behavior: domain
    path: ./rule-providers/Adult.yaml
    url: https://cdn.jsdelivr.net/gh/Kr328/V2rayDomains2Clash@generated/category-porn.yaml
    interval: 43200
  Apple:
    type: http
    behavior: classical
    path: ./rule-providers/Apple.yaml
    url: https://cdn.jsdelivr.net/gh/lhie1/Rules/Clash/Provider/Apple.yaml
    interval: 43200
  BanEasyList:
    type: http
    behavior: classical
    path: ./rule-providers/BanEasyListChina.yaml
    url: https://raw.githubusercontents.com/ACL4SSR/ACL4SSR/master/Clash/Providers/BanEasyListChina.yaml
    interval: 43200
  BanEasyPrivacy:
    type: http
    behavior: classical
    path: ./rule-providers/BanEasyPrivacy.yaml
    url: https://raw.githubusercontents.com/ACL4SSR/ACL4SSR/master/Clash/Providers/BanEasyPrivacy.yaml
    interval: 43200
  BanProgramAD:
    type: http
    behavior: classical
    path: ./rule-providers/BanProgramAD.yaml
    url: https://raw.githubusercontents.com/ACL4SSR/ACL4SSR/master/Clash/Providers/BanProgramAD.yaml
    interval: 43200
  ChinaDomain:
    type: http
    behavior: classical
    path: ./rule-providers/ChinaDomain.yaml
    url: https://raw.githubusercontents.com/ACL4SSR/ACL4SSR/master/Clash/Providers/ChinaDomain.yaml
    interval: 43200
  Developer:
    type: http
    behavior: classical
    path: ./rule-providers/Developer.yaml
    url: https://raw.githubusercontents.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/Developer.yaml
    interval: 43200
  GlobalMedia:
    type: http
    behavior: classical
    path: ./rule-providers/GlobalMedia.yaml
    url: https://cdn.jsdelivr.net/gh/DivineEngine/Profiles@master/Clash/RuleSet/StreamingMedia/Streaming.yaml
    interval: 43200
  HBO:
    type: http
    behavior: classical
    path: ./rule-providers/HBO.yaml
    url: https://cdn.jsdelivr.net/gh/DivineEngine/Profiles@master/Clash/RuleSet/StreamingMedia/Video/HBO.yaml
    interval: 43200
  Hijacking:
    type: http
    behavior: classical
    path: ./rule-providers/Hijacking.yaml
    url: https://cdn.jsdelivr.net/gh/DivineEngine/Profiles@master/Clash/RuleSet/Guard/Hijacking.yaml
    interval: 43200
  Microsoft:
    type: http
    behavior: classical
    path: ./rule-providers/Microsoft.yaml
    url: https://raw.githubusercontents.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/Microsoft.yaml
    interval: 43200
  NetEaseMusic:
    type: http
    behavior: classical
    path: ./rule-providers/NetEaseMusic.yaml
    url: https://raw.githubusercontents.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/NetEaseMusic.yaml
    interval: 43200
  Netflix:
    type: http
    behavior: classical
    path: ./rule-providers/Netflix.yaml
    url: https://cdn.jsdelivr.net/gh/lhie1/Rules@master/Clash/Provider/Media/Netflix.yaml
    interval: 43200
  PrivateNetwork:
    type: http
    behavior: classical
    path: ./rule-providers/PrivateNetwork.yaml
    url: https://raw.githubusercontents.com/ACL4SSR/ACL4SSR/master/Clash/Providers/LocalAreaNetwork.yaml
    interval: 43200
  ProxyGFWlist:
    type: http
    behavior: classical
    path: ./rule-providers/ProxyGFWlist.yaml
    url: https://raw.githubusercontents.com/ACL4SSR/ACL4SSR/master/Clash/Providers/ProxyGFWlist.yaml
    interval: 43200
  Samsung:
    type: http
    behavior: classical
    path: ./rule-providers/Samsung.yaml
    url: https://cdn.jsdelivr.net/gh/bemarkt/scripts/master/provider/ruleset/Samsung.yaml
    interval: 43200
  Scholar:
    type: http
    behavior: classical
    path: ./rule-providers/Scholar.yaml
    url: https://raw.githubusercontents.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/Scholar.yaml
    interval: 43200
  Speedtest:
    type: http
    behavior: classical
    path: ./rule-providers/Speedtest.yaml
    url: https://cdn.jsdelivr.net/gh/lhie1/Rules@master/Clash/Provider/Speedtest.yaml
    interval: 43200
  Spotify:
    type: http
    behavior: classical
    path: ./rule-providers/Spotify.yaml
    url: https://cdn.jsdelivr.net/gh/lhie1/Rules@master/Clash/Provider/Media/Spotify.yaml
    interval: 43200
  KKBOX:
    type: http
    behavior: classical
    path: ./rule-providers/KKBOX.yaml
    url: https://cdn.jsdelivr.net/gh/DivineEngine/Profiles@master/Clash/RuleSet/StreamingMedia/Music/KKBOX.yaml
    interval: 43200
  YouTubeMusic:
    type: http
    behavior: classical
    path: ./rule-providers/YouTubeMusic.yaml
    url: https://cdn.jsdelivr.net/gh/DivineEngine/Profiles@master/Clash/RuleSet/StreamingMedia/Music/YouTubeMusic.yaml
    interval: 43200
  StreamingSE:
    type: http
    behavior: classical
    path: ./rule-providers/StreamingSE.yaml
    url: https://cdn.jsdelivr.net/gh/DivineEngine/Profiles/Clash/RuleSet/StreamingMedia/StreamingSE.yaml
    interval: 43200
  Telegram:
    type: http
    behavior: classical
    path: ./rule-providers/Telegram.yaml
    url: https://raw.githubusercontents.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/Telegram.yaml
    interval: 43200
  TikTok:
    type: http
    behavior: classical
    path: ./rule-providers/TikTok.yaml
    url: https://cdn.jsdelivr.net/gh/DivineEngine/Profiles@master/Clash/RuleSet/StreamingMedia/Video/TikTok.yaml
    interval: 43200
  YouTube:
    type: http
    behavior: classical
    path: ./rule-providers/YouTube.yaml
    url: https://cdn.jsdelivr.net/gh/lhie1/Rules@master/Clash/Provider/Media/YouTube.yaml
    interval: 43200

rules:
  # LocalAreaNetwork 本地网络
  - RULE-SET,PrivateNetwork,🏠 锦城虽云乐，不如早还家

  # Advertising 广告（以及隐私追踪）&& Hijacking 劫持（运营商及臭名昭著的网站和应用）
  - RULE-SET,Hijacking,🚧 通用拦截
  - RULE-SET,BanEasyPrivacy,🚧 通用拦截
  - RULE-SET,BanEasyList,🚧 通用拦截
  - RULE-SET,BanProgramAD,🍃 应用净化
  
  # Additonal 后续规则修正
  - RULE-SET,AdditionalProxy,⛵ 直挂云帆济沧海
  - RULE-SET,AdditionalDirect,🚣 长风破浪会有时

  # 流媒体服务中心
  # > 大陆流媒体面向港澳台限定服务（愛奇藝台灣站、bilibili 港澳台限定）
  - RULE-SET,StreamingSE,🌏 国内媒体
  # > 未成年禁止入内
  - RULE-SET,Adult,💪 青壮年模式
  # > 国际流媒体服务
  # 影视：Youtube、Netflix、Amazon Prime Video、Fox、HBO、Hulu、PBS、BBC iPlayer、All4、myTV_SUPER、encoreTVB、ViuTV、AbemaTV、Bahamut、KKTV、Line TV、LiTV、Pornhub
  # 音乐：Spotify、JOOX、Pandora、KKBOX
  # 自定义多区域媒体应用
  # (更多自定义请查阅 https://github.com/ConnersHua/Profiles/tree/master/Surge/Ruleset/Media)
  - RULE-SET,TikTok,💃 TikTok
  - RULE-SET,Spotify,🎵 高雅音乐
  - RULE-SET,KKBOX,🎵 高雅音乐
  - RULE-SET,YouTubeMusic,🎵 高雅音乐
  - RULE-SET,Netflix,🎞️ 流媒体
  - RULE-SET,HBO,🎞️ 流媒体
  - RULE-SET,YouTube,🌎 国际媒体
  - RULE-SET,GlobalMedia,🌎 国际媒体

  # GlobalCompany 国外常用服务
  # > Developer 开发者服务
  - RULE-SET,Developer,👨‍💻 开发者服务
  # > Scholar 学术服务
  - RULE-SET,Scholar,👨‍🔬 学术服务
  # > Samsung 三星
  - RULE-SET,Samsung,✨ 三星服务
  # > Apple 苹果
  - RULE-SET,Apple,🍎 苹果服务
  # > Microsoft 微软
  - RULE-SET,Microsoft,Ⓜ️ 微软服务
  # > SpeedTest
  - RULE-SET,Speedtest,⏱️ 测速服务
  # > Telegram 电报
  - RULE-SET,Telegram,⛵ 直挂云帆济沧海

  # Global 全球加速
  - RULE-SET,ProxyGFWlist,⛵ 直挂云帆济沧海

  # China 中国直连
  # > 国内常见域名、直连CDN、IPIP的国内地址段
  - RULE-SET,ChinaDomain,🚣 长风破浪会有时
  - GEOIP,CN,🚣 长风破浪会有时

  - MATCH,🕸️ 漏网之鱼

script:
  code: |
    def main(ctx, metadata):
      ruleset_action = {"PrivateNetwork": "🏠 锦城虽云乐，不如早还家",
                        "BanEasyPrivacy": "🚧 通用拦截",
                        "BanEasyList": "🚧 通用拦截",
                        "Hijacking": "🚧 通用拦截",
                        "BanProgramAD": "🍃 应用净化",
                        "AdditionalProxy": "⛵ 直挂云帆济沧海",
                        "AdditionalDirect": "🚣 长风破浪会有时",
                        "Developer": "👨‍💻 开发者服务",
                        "Scholar": "👨‍🔬 学术服务",
                        "TikTok": "💃 TikTok",
                        "Spotify": "🎵 高雅音乐", "KKBOX": "🎵 高雅音乐", "YouTubeMusic": "🎵 高雅音乐",
                        "StreamingSE": "🌏 国内媒体",
                        "Adult": "💪 青壮年模式",
                        "Netflix": "🎞️ 流媒体", "HBO": "🎞️ 流媒体",
                        "YouTube": "🌎 国际媒体", "GlobalMedia": "🌎 国际媒体",
                        "Samsung": "✨ 三星服务", "Apple": "🍎 苹果服务", "Microsoft": "Ⓜ️ 微软服务", "Speedtest": "⏱️ 测速服务", "Telegram": "⛵ 直挂云帆济沧海",
                        "ProxyGFWlist": "⛵ 直挂云帆济沧海", "ChinaDomain": "🚣 长风破浪会有时"}
      host = metadata["host"]

      if metadata["network"] == "udp":
        if ("bilibili" in host or "mcdn" in host or "douyu" in host or metadata["dst_port"] == "443"):
          ctx.log("[Script] matched QUIC or PCDN traffic use reject")
          return "REJECT"

      if metadata["dst_ip"] == "":
        metadata["dst_ip"] = ctx.resolve_ip(metadata["host"])

      for ruleset in ruleset_action:
        if ctx.rule_providers[ruleset].match(metadata):
          return ruleset_action[ruleset]

      # Router Reject && DNS Error
      ip = metadata["dst_ip"]
      if ip == "":
        return "🚣 长风破浪会有时"
      code = ctx.geoip(ip)
      if code == "CN":
        ctx.log('[Script] GEOIP: CN')
        return "🚣 长风破浪会有时"
      elif metadata["network"] == "udp":
        return "🎮 游戏模式"
      ctx.log('[Script] FINAL')
      return "🕸️ 漏网之鱼"

{% endif %}
{% if request.target == "surge" %}

[General]
ipv6 = true
loglevel = notify
http-listen = 8829
socks5-listen = 8828
allow-wifi-access = true
wifi-access-http-port = 8838
wifi-access-socks5-port = 8839
external-controller-access = 6170@0.0.0.0:6155
dns-server = system, 119.29.29.29, 223.5.5.5
doh-server = https://9.9.9.9/dns-query, https://dns.alidns.com/dns-query, https://i.233py.com/dns-query, https://doh.pub/dns-query, https://dns.pub/dns-query, https://dns.cfiec.net/dns-query, https://dns.rubyfish.cn/dns-query, https://doh.mullvad.net/dns-query, https://doh.dns.sb/dns-query, https://dns.twnic.tw/dns-query, https://doh.opendns.com/dns-query, https://dns.233py.com/dns-query, https://public.dns.iij.jp/dns-query, https://doh.mullvad.net/dns-query
hijack-dns = 8.8.8.8:53
always-real-ip = *.lan, *.localdomain, *.example, *.invalid, *.localhost, *.test, *.local, *.home.arpa, *.linksys.com, *.linksyssmartwifi.com, *.router.asus.com, swscan.apple.com, mesu.apple.com, *.msftconnecttest.com, *.msftncsi.com, msftconnecttest.com, msftncsi.com, lens.l.google.com, stun.l.google.com, proxy.golang.org, time.*.com, time.*.gov, time.*.edu.cn, time.*.apple.com, time1.*.com, time2.*.com, time3.*.com, time4.*.com, time5.*.com, time6.*.com, time7.*.com, ntp.*.com, ntp1.*.com, ntp2.*.com, ntp3.*.com, ntp4.*.com, ntp5.*.com, ntp6.*.com, ntp7.*.com, *.time.edu.cn, *.ntp.org.cn, *.pool.ntp.org, time1.cloud.tencent.com, *.srv.nintendo.net, *.stun.playstation.net, xbox.*.microsoft.com, xnotify.xboxlive.com, localhost.ptlogin2.qq.com, localhost.sec.qq.com, stun.*.*, stun.*.*.*, *.stun.*.*, *.stun.*.*.*, *.stun.*.*.*.*
tun-excluded-routes = 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12
tun-included-routes = 192.168.1.12/32
tls-provider = openssl
exclude-simple-hostnames = true
skip-proxy = 127.0.0.1, 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, 100.64.0.0/10, localhost, *.local
force-http-engine-hosts = 122.14.246.33, 175.102.178.52, mobile-api2011.elong.com
internet-test-url = https://connectivitycheck.gstatic.com/generate_204
proxy-test-url = https://connectivitycheck.gstatic.com/generate_204
test-timeout = 3

[Replica]
hide-apple-request=1
hide-crashlytics-request=1
hide-udp=0
keyword-filter-type=(null)
keyword-filter=(null)

[Proxy]

[Proxy Group]

[Rule]

[URL Rewrite]
# Redirect Google Search Service
^http:\/\/www\.google\.cn https://www.google.com 302

[Header Rewrite]
# 百度贴吧
^https?+:\/\/(?:c\.)?+tieba\.baidu\.com\/(?>f|p) header-replace User-Agent "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15"
^https?+:\/\/jump2\.bdimg\.com\/(?>f|p) header-replace User-Agent "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15"
# 百度知道
^https?+:\/\/zhidao\.baidu\.com header-replace User-Agent "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15"
# 知乎
^https?+:\/\/www\.zhihu\.com\/question header-replace User-Agent "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15"

[MITM]

[Script]
http-request https?:\/\/.*\.iqiyi\.com\/.*authcookie= script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/iQIYI-DailyBonus/iQIYI_GetCookie.js

{% endif %}
{% if request.target == "loon" %}

[General]
allow-udp-proxy = true
bypass-tun = 10.0.0.0/8,100.64.0.0/10,127.0.0.0/8,169.254.0.0/16,172.16.0.0/12,192.0.0.0/24,192.0.2.0/24,192.88.99.0/24,192.168.0.0/16,198.18.0.0/15,198.51.100.0/24,203.0.113.0/24,224.0.0.0/4,255.255.255.255/32
dns-server = system,119.29.29.29,223.5.5.5
host = 127.0.0.1
skip-proxy = 192.168.0.0/16,10.0.0.0/8,172.16.0.0/12,localhost,*.local,e.crashlynatics.com

[Proxy]

[Remote Proxy]

[Proxy Group]

[Rule]

[Remote Rule]

[URL Rewrite]
enable = true
^https?:\/\/(www.)?(g|google)\.cn https://www.google.com 302

[Remote Rewrite]

[MITM]
hostname =
enable = true
skip-server-cert-verify = true
#ca-p12 =
#ca-passphrase =

{% endif %}
{% if request.target == "quan" %}

[SERVER]

[SOURCE]

[BACKUP-SERVER]

[SUSPEND-SSID]

[POLICY]

[DNS]
1.1.1.1

[REWRITE]

[URL-REJECTION]

[TCP]

[GLOBAL]

[HOST]

[STATE]
STATE,AUTO

[MITM]

{% endif %}
{% if request.target == "quanx" %}

[general]
dns_exclusion_list = *.cmbchina.com, *.cmpassport.com, *.jegotrip.com.cn, *.icitymobile.mobi, *.pingan.com.cn, id6.me
excluded_routes=10.0.0.0/8, 127.0.0.0/8, 169.254.0.0/16, 192.0.2.0/24, 192.168.0.0/16, 198.51.100.0/24, 224.0.0.0/4
geo_location_checker=http://ip-api.com/json/?lang=zh-CN, https://github.com/KOP-XIAO/QuantumultX/raw/master/Scripts/IP_API.js
network_check_url=https://connectivitycheck.gstatic.com/generate_204
server_check_url=https://connectivitycheck.gstatic.com/generate_204

[dns]
server=119.29.29.29
server=223.5.5.5
server=1.0.0.1
server=8.8.8.8

[policy]
static=♻️ 自动选择, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Auto.png
static=🔰 节点选择, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Proxy.png
static=🌍 国外媒体, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/GlobalMedia.png
static=🌏 国内媒体, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/DomesticMedia.png
static=Ⓜ️ 微软服务, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Microsoft.png
static=📲 电报信息, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Telegram.png
static=🍎 苹果服务, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Apple.png
static=🎯 全球直连, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Direct.png
static=🛑 全球拦截, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Advertising.png
static=🐟 漏网之鱼, direct, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Final.png

[server_remote]

[filter_remote]

[rewrite_remote]

[server_local]

[filter_local]

[rewrite_local]

[task_local]

[mitm]

{% endif %}
{% if request.target == "mellow" %}

[Endpoint]
DIRECT, builtin, freedom, domainStrategy=UseIP
REJECT, builtin, blackhole
Dns-Out, builtin, dns

[Routing]
domainStrategy = IPIfNonMatch

[Dns]
hijack = Dns-Out
clientIp = 114.114.114.114

[DnsServer]
localhost
223.5.5.5
8.8.8.8, 53, Remote
8.8.4.4

[DnsRule]
DOMAIN-KEYWORD, geosite:geolocation-!cn, Remote
DOMAIN-SUFFIX, google.com, Remote

[DnsHost]
doubleclick.net = 127.0.0.1

[Log]
loglevel = warning

{% endif %}
{% if request.target == "surfboard" %}

[General]
allow-wifi-access = true
collapse-policy-group-items = true
dns-server = system, 119.29.29.29, 223.5.5.5, 1.1.1.1, 1.0.0.1, 8.8.8.8
enhanced-mode-by-rule = true
exclude-simple-hostnames = true
external-controller-access = surfboard@127.0.0.1:6170
hide-crashlytics-request = false
ipv6 = true
loglevel = notify
port = 8828
socks-port = 8829
wifi-access-http-port=8838
wifi-access-socks5-port=8839
interface = 0.0.0.0
socks-interface = 0.0.0.0
internet-test-url = https://connectivitycheck.gstatic.com/generate_204
proxy-test-url = http://connectivitycheck.gstatic.com/generate_204
test-timeout = 5

{% endif %}
{% if request.target == "sssub" %}
{
  "route": "bypass-lan-china",
  "remote_dns": "dns.google",
  "ipv6": true,
  "metered": false,
  "proxy_apps": {
    "enabled": false,
    "bypass": true,
    "android_list": [
      "com.eg.android.AlipayGphone",
      "com.wudaokou.hippo",
      "com.zhihu.android"
    ]
  },
  "udpdns": false
}

{% endif %}