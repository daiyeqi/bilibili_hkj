((d,w) ->

  @_c_tip = (elem, tips...) ->
    callout = d.createElement("div")
    callout.className = "tip"
    for tip in tips
      _p = d.createElement("p")
      _p.innerHTML = tip
      callout.appendChild _p
    elem.appendChild callout
    __hidden callout, 5000

  @_c_message = (elem, title, url, messages...) ->
    callout = d.createElement("div")
    callout.className = "message"
    _h4 = d.createElement("h4")
    _a = d.createElement("a")
    _a.innerHTML = title
    _a.href = url
    _a.target = "_blank"
    _h4.appendChild _a
    callout.appendChild _h4
    for message in messages
      _p = d.createElement("p")
      _p.innerHTML = message
      callout.appendChild _p
    elem.appendChild callout
    __hidden callout, 20000

  @__hidden = (elem, sleep) ->
    setTimeout(->
      opacity = 1
      pid = setInterval(->
        opacity -= 0.01
        elem.style.opacity = opacity
        if opacity < 0
          w.clearInterval pid
          elem.parentNode.removeChild elem
      , 20)
    , sleep)

  # 判断是否是b站, 非b站连接不执行

  _params = /http:\/\/(www\.bilibili\.com|www\.bilibili\.tv|bilibili\.kankanews\.com)?\/video\/av([0-9]+)\/(?:index_([0-9]+)\.html)?/.exec(d.URL)
  _b_url_r = (/http:\/\/(www\.bilibili\.com|www\.bilibili\.tv|bilibili\.kankanews\.com)/.exec(d.URL))
  tpModel = !_params && !!_b_url_r
  _bilibili_url = if !_b_url_r then null else _b_url_r[0]

  head = d.getElementsByTagName("head")[0]
  style = d.createElement "style"
  style.type = "text/css"
  style.appendChild d.createTextNode("""
    #_callouts {
      position: fixed;
      right: 16px;
      bottom: 32px;
      z-index: 999;
    }
    #_callouts div {
      position: relative;
      margin: 10px 0;
      padding: 7px 15px 7px 12px;
      text-align:left;
      border-left:5px solid #eee;
      font: 13px/1.65 "Segoe UI", "Helvetica Neue", Helvetica, Arial, "Hiragino Kaku Gothic Pro", "Meiryo", "Hiragino Sans GB", "Microsoft YaHei", "STHeiti", "SimSun", Sans-serif;
      z-index: 999;
    }
    #_callouts div p,
    #_callouts div h4 {
      margin: 0;
    }
    #_callouts div.message {
      background-color: #fdf7f7;
      border-color: #d9534f;
    }
    #_callouts div.message h4,
    #_callouts div.message h4 * {
      color: #d9534f;
      text-decoration: none;
    }
    #_callouts div.tip {
      background-color: #f4f8fa;
      border-color: #5bc0de;
    }
  """)
  head.appendChild style

  callouts = d.createElement "div"
  callouts.id = "_callouts"
  d.body.appendChild callouts

  if !_params && !tpModel
    (w.bilibili_hkj =->
      _c_tip callouts, "痴萝莉, 爱腐女", "控锁骨, 恋百合"
    )()
    return

  # 显示公告
  messageExpires = (new Date("2014/10/6")).getTime() + 15 * 1000 * 3600 * 24

  if new Date().getTime() - messageExpires < 0
    _c_message callouts, "修复新版bilibili下2P模式失效问题", "http://keyfunc.github.io/bilibili_hkj/", "重构部分代码，增加异常处理"

  # 初始化相关方法与组件

  jQueryVersion = "1.11.1"

  @Loader =
    importJS: (url, head, func) ->
      script = d.createElement "script"
      script.type = "text/javascript"
      script.onload =->
        console.log "onLoad: " + url
        if func isnt undefined
          func()
      script.src = url
      head.appendChild script

    importCSS: (url, head, func) ->
      css = d.createElement "link"
      css.type = "text/css"
      css.rel = "stylesheet"
      css.onload =->
        console.log "onLoad: " + url
        if func isnt undefined
          func()
      css.href = url
      head.appendChild css

  # 判断是否需要重新加载jQuery
  loadjQuery = yes

  if w.jQuery isnt undefined
    version = jQueryVersion.split "."
    current_version = $.fn.jquery.split "."
    for v, i in current_version
      v = parseInt v
      _v = parseInt version[i]
      if v < _v
        _$ = jQuery.noConflict()
        console.log "jQuery version: " + _$.fn.jquery + " --> " + jQueryVersion
        loadjQuery = yes
        break
      else if v > _v
        loadjQuery = no
        break
      else
        loadjQuery = no

  # 正常体位
  normalModel = (_params) ->

    api = "http://api.bilibili.com/view?type=json&appkey=12737ff7776f1ade&id=" + _params[2] + if _params[3] isnt undefined then "&page=" + _params[3] else ""
    url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url=%22" + encodeURIComponent(api) + "%22&format=json&callback=cbfunc"

    # bofqi = d.getElementById "bofqi"
    # bofqi.innerHTML = ""
    $("#bofqi").empty()
    $("#bofqi").append("<div id='player_placeholder' class='player'></div>")
    _c_tip callouts, "成功干掉原先的播放器"

    jsonp = d.createElement "script"
    jsonp.setAttribute "src", url
    jsonp.onload =->
      this.parentNode.removeChild this
      jsonp = null
    head.appendChild jsonp

    (w.bilibili_hkj =->
      _c_tip callouts, "正在获取神秘代码"
    )()
    return

  # 主要执行逻辑函数
  blhkj_main =->

    # 2P模式
    if tpModel
      $("a[href*='/video/av']").click (event) ->
        event.preventDefault()
        _params = /(\/video|video)\/av([0-9]+)?/.exec($(this).attr("href"))
        _title = $(this).text()
        $(".z").remove()
        $z = $("<div class=\"z\"></div>")
        $(".header").after($z)
        $z.load _bilibili_url + "/video/av877489/ .z:first", ->
          try
            $(".cover_image", $z).hide()
            $(".tminfo span[typeof='v:Breadcrumb']", $z).remove()
            $(".tminfo time", $z).remove()
            #$("#assdown", $z).attr("href", $("#assdown", $z).attr("href").replace("877489", _params[2]))
            $(".info .fav_btn_top", $z).attr("onclick", $(".info .fav_btn_top", $z).attr("onclick").replace("877489", _params[2]))
            $(".arc-tool-bar .fav a", $z).attr("href", $(".arc-tool-bar .fav a", $z).attr("href").replace("877489", _params[2]))
            $(".arc-tool-bar .fav a", $z).attr("onclick", $(".arc-tool-bar .fav a", $z).attr("onclick").replace("877489", _params[2]))
            $(".ad-f", $z).remove()
            $(".ad-e1", $z).remove()
            $(".ad-e2", $z).remove()
            #$(".ad-e3", $z).remove()
            #$(".ad-e4", $z).remove()
            $(".info h2", $z).text("").attr("title", "")
            $(".intro", $z).text("")
            $(".common .comm img", $z).attr("onclick", $(".common .comm img", $z).attr("onclick").replace("877489", _params[2]))
            $("#newtag a", $z).attr("onclick", $("#newtag a", $z).attr("onclick").replace("877489", _params[2]))
            $("#rate_frm", $z).attr("aid", _params[2])
          catch error
            console.log error
          if w.history.pushState isnt undefined
            w.history.pushState(null, _title, _bilibili_url + "/video/av" + _params[2])
          Loader.importJS 'http://static.hdslb.com/js/page.arc.js', head
          Loader.importJS 'http://static.hdslb.com/js/jquery.qrcode.min.js', head
          Loader.importJS 'http://interface.bilibili.cn/count?aid=' + _params[2], head
          Loader.importJS 'http://static.hdslb.com/js/swfobject.js', head
          Loader.importJS 'http://static.hdslb.com/js/video.min.js', head
          Loader.importCSS 'http://static.hdslb.com/css/bpoint/bpoints.css', head
          Loader.importJS 'http://static.hdslb.com/js/bpoint/bpoints.js', head
          normalModel _params

      $(w).on("popstate", (event) ->
        w.location.replace d.location
      )

      (w.bilibili_hkj =->
        _c_tip callouts, "2P模式初始化完成", "＼(・ω・＼)丧尸！(／・ω・)／bishi"
      )()
      return

    else

      if !!d.getElementById("player_placeholder") or !!d.getElementById("bofqi_embed") or (->
        iframes = d.getElementsByTagName "iframe"
        iframePlay = /https:\/\/secure\.bilibili\.com\/secure,cid=([0-9]+)(?:&aid=([0-9]+))?/
        for key of iframes
          if !!iframePlay.exec(iframes[key].src)
            return yes
        return no
      )()
        (w.bilibili_hkj =->
          _c_tip callouts, "bilibili满状态中", "＼(・ω・＼)丧尸！(／・ω・)／bishi"
        )()
        return

      normalModel(_params)

  # 回调函数
  @cbfunc =->
    info = arguments[0].query.results.json
    if info.cid isnt undefined
      _c_tip callouts, "获取神秘代码成功", "神秘代码ID: " + info.cid

      if tpModel
        $(".info h2").text(info.title).attr("title", info.title)
        $(".intro").text(info.description)
        @mid = info.mid
        kwtags(info.tag.split(","), "")
        $("title").text(info.title)

      EmbedPlayer('player', "http://static.hdslb.com/play.swf", "cid=" + info.cid + "&aid=" +  _params[2])

      # iframe = d.createElement("iframe")
      # iframe.height = 482
      # iframe.width = 950
      # iframe.src = "https://secure.bilibili.com/secure,cid=" + info.cid + "&amp;aid="+ _params[2]
      # iframe.setAttribute "class", "player"
      # iframe.setAttribute "border", 0
      # iframe.setAttribute "scrolling", "no"
      # iframe.setAttribute "frameborder", "no"
      # iframe.setAttribute "framespacing", 0
      # bofqi.appendChild iframe
      #
      # #增加iframe通讯功能
      # if w.postMessage
      #   onMessage = (e) ->
      #     if e.origin is "https://secure.bilibili.com" and e.data.substr(0, 6) is "secJS:"
      #       eval e.data.substr(6)
      #   if w.addEventListener
      #     w.addEventListener "message", onMessage, false
      #   else if w.attachEvent
      #     w.attachEvent "onmessage", onMessage
      #
      # else
      #   setInterval(->
      #     if evalCode = __GetCookie '__secureJS'
      #       __SetCookie '__secureJS', ''
      #       eval evalCode
      #   , 1000)

      (w.bilibili_hkj =->
        _c_tip callouts, "Mission Completed", "嗶哩嗶哩 - ( ゜- ゜)つロ  乾杯~"
      )()

    else
      _c_tip callouts, "非常抱歉, bishi姥爷不肯给神秘代码", "要不你吼一声\"兵库北\"后再试试?"
      w.bilibili_hkj = null

  # 同步加载jQuery
  if loadjQuery
    Loader.importJS 'http://keyfunc.github.io/bilibili_hkj/assets/js/jquery-' + jQueryVersion + '.min.js', head, blhkj_main
  else
    blhkj_main()

)(document, window)
