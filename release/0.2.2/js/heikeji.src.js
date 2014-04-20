/*!
 * bilibili_hkj v0.2.2 (http://keyfunc.github.io/bilibili_hkj)
 * Copyright 2012-2014 Key Dai
 * Licensed under MIT (http://github.com/keyfunc/bilibili_hkj/blob/master/LICENSE)
 */
(function() {
  var __slice = [].slice;

  (function(d, w) {
    var blhkj_main, current_version, head, i, jQueryVersion, loadjQuery, normalModel, params, style, tip_panel, tpModel, v, version, _$, _i, _len, _v;
    params = /http:\/\/(www\.bilibili\.tv|bilibili\.kankanews\.com)\/video\/av([0-9]+)\/(?:index_([0-9]+)\.html)?/.exec(d.URL);
    tpModel = !params && !!(/http:\/\/(www\.bilibili\.tv|bilibili\.kankanews\.com)?/.exec(d.URL));
    head = d.getElementsByTagName("head")[0];
    style = d.createElement("style");
    style.type = "text/css";
    style.appendChild(d.createTextNode('#_tip_panel{position:fixed;right:16px;bottom:32px;z-index:100}#_tip_panel p{position:relative;background:rgba(0,0,0,.9);box-shadow:0 1px 2px rgba(0,0,0,.5);border-radius:2px;margin:10px 0px;padding:7px 10px 7px 5px;z-index:100}#_tip_panel p span{color:#FFF;display:block;padding-left:5px;border-left:5px solid #C00;font-family:"Segoe UI","Helvetica Neue",Helvetica,Arial,"Microsoft YaHei","STHeiti","SimSun",Sans-serif;font-size:12px;font-weight:bold;text-align:left;line-height:20px;z-index:100}'));
    head.appendChild(style);
    tip_panel = d.createElement("div");
    tip_panel.id = "_tip_panel";
    d.body.appendChild(tip_panel);
    if (!params && !tpModel) {
      w.bilibili_hkj = (function() {
        return __tips(tip_panel, 5000, "痴萝莉, 爱腐女", "控锁骨, 恋百合");
      })();
      return;
    }
    jQueryVersion = "1.11.0";
    this.Loader = {
      importJS: function(url, head, func) {
        var script;
        script = d.createElement("script");
        script.type = "text/javascript";
        script.onload = function() {
          console.log("onLoad: " + url);
          if (func !== void 0) {
            return func();
          }
        };
        script.src = url;
        return head.appendChild(script);
      }
    };
    loadjQuery = true;
    if (w.jQuery !== void 0) {
      version = jQueryVersion.split(".");
      current_version = $.fn.jquery.split(".");
      for (i = _i = 0, _len = current_version.length; _i < _len; i = ++_i) {
        v = current_version[i];
        v = parseInt(v);
        _v = parseInt(version[i]);
        if (v < _v) {
          _$ = jQuery.noConflict();
          console.log("jQuery version: " + _$.fn.jquery + " --> " + jQueryVersion);
          loadjQuery = true;
          break;
        } else if (v > _v) {
          loadjQuery = false;
          break;
        } else {
          loadjQuery = false;
        }
      }
    }
    this.__tips = function() {
      var elem, pElem, sleep, span, tip, tips, _j, _len1;
      elem = arguments[0], sleep = arguments[1], tips = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      pElem = d.createElement("p");
      for (_j = 0, _len1 = tips.length; _j < _len1; _j++) {
        tip = tips[_j];
        span = d.createElement("span");
        if (typeof span.textContent !== void 0) {
          span.textContent = tip;
        } else {
          span.innerText = tip;
        }
        pElem.appendChild(span);
      }
      elem.appendChild(pElem);
      return __hidden(pElem, sleep);
    };
    this.__hidden = function(elem, sleep) {
      return setTimeout(function() {
        var opacity, pid;
        opacity = 1;
        return pid = setInterval(function() {
          opacity -= 0.01;
          elem.style.opacity = opacity;
          if (opacity < 0) {
            w.clearInterval(pid);
            return elem.parentNode.removeChild(elem);
          }
        }, 20);
      }, sleep);
    };
    normalModel = function(params) {
      var api, bofqi, jsonp, url;
      api = "http://api.bilibili.tv/view?type=json&appkey=12737ff7776f1ade&id=" + params[2] + (params[3] !== void 0 ? "&page=" + params[3] : "");
      url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url=%22" + encodeURIComponent(api) + "%22&format=json&callback=cbfunc";
      bofqi = d.getElementById("bofqi");
      bofqi.innerHTML = "";
      __tips(tip_panel, 5000, "成功干掉原先的播放器");
      jsonp = d.createElement("script");
      jsonp.setAttribute("src", url);
      jsonp.onload = function() {
        this.parentNode.removeChild(this);
        return jsonp = null;
      };
      head.appendChild(jsonp);
      w.bilibili_hkj = (function() {
        return __tips(tip_panel, 5000, "正在获取神秘代码");
      })();
    };
    blhkj_main = function() {
      if (tpModel) {
        $("a[href*='/video/av']").click(function(event) {
          var $z;
          event.preventDefault();
          params = /(\/video|video)\/av([0-9]+)?/.exec($(this).attr("href"));
          $z = $(".z").first();
          return $z.load("http://www.bilibili.tv/video/av877489/ .z:first", function() {
            $(".cover_image", $z).hide();
            $(".tminfo span[typeof='v:Breadcrumb']", $z).remove();
            $(".tminfo time", $z).remove();
            $(".info h2").text("").attr("title", "");
            $(".common .comm img").attr("onclick", $(".common .comm img").attr("onclick").replace("877489", params[2]));
            Loader.importJS('http://interface.bilibili.cn/count?aid=' + params[2], head);
            return normalModel(params);
          });
        });
        w.bilibili_hkj = (function() {
          return __tips(tip_panel, 5000, "2P模式初始化完成", "＼(・ω・＼)丧尸！(／・ω・)／bishi");
        })();
      } else {
        if (!!d.getElementById("bofqi_embed") || (function() {
          var iframePlay, iframes, key;
          iframes = d.getElementsByTagName("iframe");
          iframePlay = /https:\/\/secure\.bilibili\.tv\/secure,cid=([0-9]+)(?:&aid=([0-9]+))?/;
          for (key in iframes) {
            if (!!iframePlay.exec(iframes[key].src)) {
              return true;
            }
          }
          return false;
        })()) {
          w.bilibili_hkj = (function() {
            return __tips(tip_panel, 5000, "bilibili满状态中", "＼(・ω・＼)丧尸！(／・ω・)／bishi");
          })();
          return;
        }
        return normalModel(params);
      }
    };
    this.cbfunc = function() {
      var iframe, info, onMessage;
      info = arguments[0].query.results.json;
      if (info.cid !== void 0) {
        __tips(tip_panel, 5000, "获取神秘代码成功", "神秘代码ID: " + info.cid);
        $(".info h2").text(info.title).attr("title", info.title);
        iframe = d.createElement("iframe");
        iframe.height = 482;
        iframe.width = 950;
        iframe.src = "https://secure.bilibili.tv/secure,cid=" + info.cid + "&amp;aid=" + params[2];
        iframe.setAttribute("class", "player");
        iframe.setAttribute("border", 0);
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("frameborder", "no");
        iframe.setAttribute("framespacing", 0);
        bofqi.appendChild(iframe);
        if (w.postMessage) {
          onMessage = function(e) {
            if (e.origin === "https://secure.bilibili.tv" && e.data.substr(0, 6) === "secJS:") {
              return eval(e.data.substr(6));
            }
          };
          if (w.addEventListener) {
            w.addEventListener("message", onMessage, false);
          } else if (w.attachEvent) {
            w.attachEvent("onmessage", onMessage);
          }
        } else {
          setInterval(function() {
            var evalCode;
            if (evalCode = __GetCookie('__secureJS')) {
              __SetCookie('__secureJS', '');
              return eval(evalCode);
            }
          }, 1000);
        }
        return w.bilibili_hkj = (function() {
          return __tips(tip_panel, 5000, "Mission Completed", "嗶哩嗶哩 - ( ゜- ゜)つロ  乾杯~");
        })();
      } else {
        __tips(tip_panel, 5000, "非常抱歉, bishi姥爷不肯给神秘代码", "要不你吼一声\"兵库北\"后再试试?");
        return w.bilibili_hkj = null;
      }
    };
    if (loadjQuery) {
      return Loader.importJS('http://keyfunc.github.io/bilibili_hkj/assets/js/jquery-' + jQueryVersion + '.min.js', head, blhkj_main);
    } else {
      return blhkj_main();
    }
  })(document, window);

}).call(this);
