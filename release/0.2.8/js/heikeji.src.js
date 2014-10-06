/*!
 * bilibili_hkj v0.2.8 (http://keyfunc.github.io/bilibili_hkj)
 * Copyright 2012-2014 Key Dai
 * Licensed under MIT (http://github.com/keyfunc/bilibili_hkj/blob/master/LICENSE)
 */
(function() {
  var __slice = [].slice;

  (function(d, w) {
    var blhkj_main, callouts, current_version, head, i, jQueryVersion, loadjQuery, messageExpires, normalModel, style, tpModel, v, version, _$, _b_url_r, _bilibili_url, _i, _len, _params, _v;
    this._c_tip = function() {
      var callout, elem, tip, tips, _i, _len, _p;
      elem = arguments[0], tips = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      callout = d.createElement("div");
      callout.className = "tip";
      for (_i = 0, _len = tips.length; _i < _len; _i++) {
        tip = tips[_i];
        _p = d.createElement("p");
        _p.innerHTML = tip;
        callout.appendChild(_p);
      }
      elem.appendChild(callout);
      return __hidden(callout, 5000);
    };
    this._c_message = function() {
      var callout, elem, message, messages, title, url, _a, _h4, _i, _len, _p;
      elem = arguments[0], title = arguments[1], url = arguments[2], messages = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
      callout = d.createElement("div");
      callout.className = "message";
      _h4 = d.createElement("h4");
      _a = d.createElement("a");
      _a.innerHTML = title;
      _a.href = url;
      _a.target = "_blank";
      _h4.appendChild(_a);
      callout.appendChild(_h4);
      for (_i = 0, _len = messages.length; _i < _len; _i++) {
        message = messages[_i];
        _p = d.createElement("p");
        _p.innerHTML = message;
        callout.appendChild(_p);
      }
      elem.appendChild(callout);
      return __hidden(callout, 20000);
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
    _params = /http:\/\/(www\.bilibili\.com|www\.bilibili\.tv|bilibili\.kankanews\.com)?\/video\/av([0-9]+)\/(?:index_([0-9]+)\.html)?/.exec(d.URL);
    _b_url_r = /http:\/\/(www\.bilibili\.com|www\.bilibili\.tv|bilibili\.kankanews\.com)/.exec(d.URL);
    tpModel = !_params && !!_b_url_r;
    _bilibili_url = !_b_url_r ? null : _b_url_r[0];
    head = d.getElementsByTagName("head")[0];
    style = d.createElement("style");
    style.type = "text/css";
    style.appendChild(d.createTextNode("#_callouts {\n  position: fixed;\n  right: 16px;\n  bottom: 32px;\n  z-index: 999;\n}\n#_callouts div {\n  position: relative;\n  margin: 10px 0;\n  padding: 7px 15px 7px 12px;\n  text-align:left;\n  border-left:5px solid #eee;\n  font: 13px/1.65 \"Segoe UI\", \"Helvetica Neue\", Helvetica, Arial, \"Hiragino Kaku Gothic Pro\", \"Meiryo\", \"Hiragino Sans GB\", \"Microsoft YaHei\", \"STHeiti\", \"SimSun\", Sans-serif;\n  z-index: 999;\n}\n#_callouts div p,\n#_callouts div h4 {\n  margin: 0;\n}\n#_callouts div.message {\n  background-color: #fdf7f7;\n  border-color: #d9534f;\n}\n#_callouts div.message h4,\n#_callouts div.message h4 * {\n  color: #d9534f;\n  text-decoration: none;\n}\n#_callouts div.tip {\n  background-color: #f4f8fa;\n  border-color: #5bc0de;\n}"));
    head.appendChild(style);
    callouts = d.createElement("div");
    callouts.id = "_callouts";
    d.body.appendChild(callouts);
    if (!_params && !tpModel) {
      (w.bilibili_hkj = function() {
        return _c_tip(callouts, "痴萝莉, 爱腐女", "控锁骨, 恋百合");
      })();
      return;
    }
    messageExpires = (new Date("2014/10/6")).getTime() + 15 * 1000 * 3600 * 24;
    if (new Date().getTime() - messageExpires < 0) {
      _c_message(callouts, "修复新版bilibili下2P模式失效问题", "http://keyfunc.github.io/bilibili_hkj/", "重构部分代码，增加异常处理");
    }
    jQueryVersion = "1.11.1";
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
      },
      importCSS: function(url, head, func) {
        var css;
        css = d.createElement("link");
        css.type = "text/css";
        css.rel = "stylesheet";
        css.onload = function() {
          console.log("onLoad: " + url);
          if (func !== void 0) {
            return func();
          }
        };
        css.href = url;
        return head.appendChild(css);
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
    normalModel = function(_params) {
      var api, jsonp, url;
      api = "http://api.bilibili.com/view?type=json&appkey=12737ff7776f1ade&id=" + _params[2] + (_params[3] !== void 0 ? "&page=" + _params[3] : "");
      url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url=%22" + encodeURIComponent(api) + "%22&format=json&callback=cbfunc";
      $("#bofqi").empty();
      $("#bofqi").append("<div id='player_placeholder' class='player'></div>");
      _c_tip(callouts, "成功干掉原先的播放器");
      jsonp = d.createElement("script");
      jsonp.setAttribute("src", url);
      jsonp.onload = function() {
        this.parentNode.removeChild(this);
        return jsonp = null;
      };
      head.appendChild(jsonp);
      (w.bilibili_hkj = function() {
        return _c_tip(callouts, "正在获取神秘代码");
      })();
    };
    blhkj_main = function() {
      if (tpModel) {
        $("a[href*='/video/av']").click(function(event) {
          var $z, _title;
          event.preventDefault();
          _params = /(\/video|video)\/av([0-9]+)?/.exec($(this).attr("href"));
          _title = $(this).text();
          $(".z").remove();
          $z = $("<div class=\"z\"></div>");
          $(".header").after($z);
          return $z.load(_bilibili_url + "/video/av877489/ .z:first", function() {
            var error;
            try {
              $(".cover_image", $z).hide();
              $(".tminfo span[typeof='v:Breadcrumb']", $z).remove();
              $(".tminfo time", $z).remove();
              $(".info .fav_btn_top", $z).attr("onclick", $(".info .fav_btn_top", $z).attr("onclick").replace("877489", _params[2]));
              $(".arc-tool-bar .fav a", $z).attr("href", $(".arc-tool-bar .fav a", $z).attr("href").replace("877489", _params[2]));
              $(".arc-tool-bar .fav a", $z).attr("onclick", $(".arc-tool-bar .fav a", $z).attr("onclick").replace("877489", _params[2]));
              $(".ad-f", $z).remove();
              $(".ad-e1", $z).remove();
              $(".ad-e2", $z).remove();
              $(".info h2", $z).text("").attr("title", "");
              $(".intro", $z).text("");
              $(".common .comm img", $z).attr("onclick", $(".common .comm img", $z).attr("onclick").replace("877489", _params[2]));
              $("#newtag a", $z).attr("onclick", $("#newtag a", $z).attr("onclick").replace("877489", _params[2]));
              $("#rate_frm", $z).attr("aid", _params[2]);
            } catch (_error) {
              error = _error;
              console.log(error);
            }
            if (w.history.pushState !== void 0) {
              w.history.pushState(null, _title, _bilibili_url + "/video/av" + _params[2]);
            }
            Loader.importJS('http://static.hdslb.com/js/page.arc.js', head);
            Loader.importJS('http://static.hdslb.com/js/jquery.qrcode.min.js', head);
            Loader.importJS('http://interface.bilibili.cn/count?aid=' + _params[2], head);
            Loader.importJS('http://static.hdslb.com/js/swfobject.js', head);
            Loader.importJS('http://static.hdslb.com/js/video.min.js', head);
            Loader.importCSS('http://static.hdslb.com/css/bpoint/bpoints.css', head);
            Loader.importJS('http://static.hdslb.com/js/bpoint/bpoints.js', head);
            return normalModel(_params);
          });
        });
        $(w).on("popstate", function(event) {
          return w.location.replace(d.location);
        });
        (w.bilibili_hkj = function() {
          return _c_tip(callouts, "2P模式初始化完成", "＼(・ω・＼)丧尸！(／・ω・)／bishi");
        })();
      } else {
        if (!!d.getElementById("player_placeholder") || !!d.getElementById("bofqi_embed") || (function() {
          var iframePlay, iframes, key;
          iframes = d.getElementsByTagName("iframe");
          iframePlay = /https:\/\/secure\.bilibili\.com\/secure,cid=([0-9]+)(?:&aid=([0-9]+))?/;
          for (key in iframes) {
            if (!!iframePlay.exec(iframes[key].src)) {
              return true;
            }
          }
          return false;
        })()) {
          (w.bilibili_hkj = function() {
            return _c_tip(callouts, "bilibili满状态中", "＼(・ω・＼)丧尸！(／・ω・)／bishi");
          })();
          return;
        }
        return normalModel(_params);
      }
    };
    this.cbfunc = function() {
      var info;
      info = arguments[0].query.results.json;
      if (info.cid !== void 0) {
        _c_tip(callouts, "获取神秘代码成功", "神秘代码ID: " + info.cid);
        if (tpModel) {
          $(".info h2").text(info.title).attr("title", info.title);
          $(".intro").text(info.description);
          this.mid = info.mid;
          kwtags(info.tag.split(","), "");
          $("title").text(info.title);
        }
        EmbedPlayer('player', "http://static.hdslb.com/play.swf", "cid=" + info.cid + "&aid=" + _params[2]);
        return (w.bilibili_hkj = function() {
          return _c_tip(callouts, "Mission Completed", "嗶哩嗶哩 - ( ゜- ゜)つロ  乾杯~");
        })();
      } else {
        _c_tip(callouts, "非常抱歉, bishi姥爷不肯给神秘代码", "要不你吼一声\"兵库北\"后再试试?");
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
