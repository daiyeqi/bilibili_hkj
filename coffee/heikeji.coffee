return window.bilibili_hkj = ((d,w) ->

  @__tips = (elem, tips...) ->
    pElem = d.createElement("p")
    for tip in tips
      span = d.createElement("span")
      if typeof span.textContent isnt 'undefined'
        span.textContent = tip
      else
        span.innerText = tip
      pElem.appendChild span
    elem.appendChild pElem
    __hidden pElem, 5000

  @__hidden = (elem, sleep) ->
    setTimeout(->
      opacity = 1;
      pid = setInterval(->
        opacity -= 0.01;
        elem.style.opacity = opacity
        if opacity < 0
          w.clearInterval pid
          elem.parentNode.removeChild elem
      , 20)
    , sleep)

  @cbfunc =->
    info = arguments[0].query.results.json;
    if info.cid != undefined
      __tips tip_panel, "获取神秘代码成功", "神秘代码ID: " + info.cid
      iframe = d.createElement("iframe");
      iframe.height = 482
      iframe.width = 950
      iframe.src = "https://secure.bilibili.tv/secure,cid=" + info.cid + "&amp;aid="+ params[2]
      iframe.setAttribute "class", "player"
      iframe.setAttribute "border", 0
      iframe.setAttribute "scrolling", "no"
      iframe.setAttribute "frameborder", "no"
      iframe.setAttribute "framespacing", 0
      bofqi.appendChild iframe

      #增加iframe通讯功能
      if w.postMessage
        onMessage = (e) ->
          if e.origin is "https://secure.bilibili.tv" and e.data.substr(0, 6) is "secJS:"
            eval e.data.substr(6)
        if w.addEventListener
          w.addEventListener "message", onMessage, false
        else if w.attachEvent
          w.attachEvent "onmessage", onMessage

      else
        setInterval(->
          if evalCode = __GetCookie '__secureJS'
            __SetCookie '__secureJS', ''
            eval evalCode
        , 1000)

      w.bilibili_hkj = (->
        __tips tip_panel, "Mission Completed", "嗶哩嗶哩 - ( ゜- ゜)つロ  乾杯~"
      )()

    else
      __tips tip_panel, "非常抱歉, bishi姥爷不肯给神秘代码", "要不你吼一声\"兵库北\"后再试试?"
      w.bilibili_hkj = null;

  head = d.getElementsByTagName("head")[0]

  style = d.createElement("style")
  style.type = "text/css";
  style.appendChild d.createTextNode('#_tip_panel{position:fixed;right:16px;bottom:32px;z-index:100}#_tip_panel p{position:relative;background:rgba(0,0,0,.9);box-shadow:0 1px 2px rgba(0,0,0,.5);border-radius:2px;margin:10px 0px;padding:7px 10px 7px 5px;z-index:100}#_tip_panel p span{color:#FFF;display:block;padding-left:5px;border-left:5px solid #C00;font-family:"Segoe UI","Helvetica Neue",Helvetica,Arial,"Microsoft YaHei","STHeiti","SimSun",Sans-serif;font-size:12px;font-weight:bold;text-align:left;line-height:20px;z-index:100}')
  head.appendChild style

  tip_panel = d.createElement "div"
  tip_panel.id = "_tip_panel"
  d.body.appendChild tip_panel

  @params = /http:\/\/(www\.bilibili\.tv|bilibili\.kankanews\.com)\/video\/av([0-9]+)\/(?:index_([0-9]+)\.html)?/.exec(d.URL);
  iframePlay = /https:\/\/secure\.bilibili\.tv\/secure,cid=([0-9]+)(?:&aid=([0-9]+))?/;

  if (!params)
    return -> __tips tip_panel, "扬帆远洋扫广场", "民主自由不可挡"

  api = "http://api.bilibili.tv/view?type=json&appkey=12737ff7776f1ade&id=" + params[2] + if params[3] isnt undefined then "&page=" + params[3] else ""
  url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url=%22" + encodeURIComponent(api) + "%22&format=json&callback=cbfunc"

  if !!d.getElementById("bofqi_embed") or (->
    iframes = d.getElementsByTagName "iframe"
    for key of iframes
      if !!iframePlay.exec(iframes[key].src)
        return yes
    return no
  )()
    return ->
      __tips tip_panel, "bilibili满状态中", "＼(・ω・＼)丧尸！(／・ω・)／bishi"

  bofqi = d.getElementById "bofqi"
  bofqi.innerHTML = ""
  __tips tip_panel, "成功干掉原先的播放器"

  jsonp = d.createElement "script"
  jsonp.setAttribute "src", url
  jsonp.onload =->
    this.parentNode.removeChild this
    jsonp = null
  head.appendChild jsonp

  return ->
    __tips tip_panel, "正在获取神秘代码"

)(document, window)()
