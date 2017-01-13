function click_search(t) {
    $("#input-search").keyup(function (e) {
        if (e.keyCode == 13) {
            var i = $(this).val();
            window.open("/search?t=" + t + "&kw=" + i, "_blank")
        }
    })
}
function build_source_article_item(t) {
    return build_source_article_item_with_title(t)
}
function build_source_article_item_with_title(t) {
    var e = t.abs;
    return t.feed_title != null && t.feed_title != "" && (e = t.feed_title + " 》 " + t.abs), "<div class='single_fake_simple'>                  <a href='/articles/" + t.id + "' target='_blank'>                  <div class='time'>" + t.show_time + "</div>                  <div class='title'>                     <span class='title'>" + t.title + "</span>                     <span class='abs'>" + e + "</span>                  </div> </a>             </div>"
}
function build_follow_item(t, e, i, n) {
    var r = "sites";
    1 == i && (r = "topics");
    var o = "";
    n && (o = t.followed ? "<a href='javascript:;' data-id='" + t.id + "' followed=true class='follow followed'><i></i></a>" : "<a href='javascript:;' data-id='" + t.id + "' followed=false class='follow unfollowed'><i></i></a>");
    var s = "", a = "";
    return n || (s = " follow_index_item", a = "title_small "), "<div class='topic_hot_list span5 lang-" + e + s + "'>             <a target='_blank' href='/" + r + "/" + t.id + "' class='icon pull-left'>                 <img src='" + t.image + "!middle'>             </a>             <a target='_blank' class='" + a + "title' href='/" + r + "/" + t.id + "'>               " + htmlEncode(t.name) + "             </a>             " + o + "           </div>"
}
function click_follow_source(t) {
    var e = "/sites/do_follow";
    1 == source_type && (e = "/topics/do_follow"), id = t.attr("data-id");
    var i = t.attr("followed");
    $.ajax({
        url: e, type: "POST", beforeSend: function (t) {
            t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"))
        }, data: {id: id}, success: function (e) {
            e.success ? "true" == i ? (t.removeClass("followed"), t.addClass("unfollowed"), t.attr("followed", !1)) : (t.removeClass("unfollowed"), t.addClass("followed"), t.attr("followed", !0)) : show_load_fail_error(e.error)
        }, error: function () {
            show_load_fail_tip()
        }
    })
}
function build_folder_source_item(t) {
    var e = "";
    return t.cnt > 0 && (e = t.cnt + ""), "<li class='file-item dropdown' id='" + t.id + "'>            <a class='title' href='javascript:load_topic(\"" + t.id + "\",0,-1,0);'>              <img src='" + t.image + "' /><span class='name' id='name-" + t.id + "'>" + t.name + '</span>            <span class="unread" id=\'cnt-' + t.id + "'>" + e + "</span> </a>            <a href='#' class='ccaret dropdown-toggle' data-toggle='dropdown'>                <b class='caret'></b>            </a>            <ul class='dropdown-menu'>              <li><a href='javascript:unfollow_source(\"" + t.id + '","' + t.name + "\");'>取消订阅</a></li>              <li><a href='javascript:new_dir(\"" + t.id + "\");'>新建到分组</a></li>              <li><a href='javascript:show_move_dir(\"" + t.id + "\");'>迁移到分组</a></li>            </ul>          </li>"
}
function init_source_infos() {
    $(".submit-move-source").click(function () {
        var t = $(".active-li").attr("data-id"), e = $("#move-source-id").val();
        move_to_dir(e, t), $("#edit-source-modal").modal("hide")
    }), $(document).on("click", "#add-kan-list > li", function () {
        $("#add-kan-list > li").removeClass("active-li"), $(this).addClass("active-li")
    })
}
function build_folder_item(t, e, i, n) {
    var r = '<li id="' + i + '" class="file-item dropdown">' + n + "</li>";
    return build_folder_item0(t, e, r)
}
function build_new_folder_item(t, e, i, n) {
    var r = '<li id="' + i + '" class="file-item dropdown">' + n + "</li>";
    return build_folder_item00(t, e, r, "icon-angle-down", "block")
}
function build_default_folder_item(t, e) {
    return '<li class="folder folder1 dropdown" id="f-0">             <span class="title cut">              <i class="icon-angle-down"></i>              <span class="name" dir-id="0" id="fn-0">' + t + '</span>             </span>             <a href="#" class="ccaret dropdown-toggle" data-toggle="dropdown">              <b class="caret"></b>             </a>            <ul class="dropdown-menu">              <li><a href="javascript:markread_dir(\'0\');">全部已读</a></li>            </ul>            </li>            <ul class="folder-item ui-sortable" id="fns-0" style="display:block;">' + e + "</ul>"
}
function build_folder_item00(t, e, i, n, r) {
    return '<li class="folder folder1 dropdown" id="f-' + t + '" data-id="' + t + '" data-name="' + e + '">            <span class="title cut">              <i class="' + n + '"></i>              <span class="name" dir-id="' + t + '" id="fn-' + t + '">' + e + '</span>            </span>            <a href="#" class="ccaret dropdown-toggle" data-toggle="dropdown">              <b class="caret"></b>            </a>            <ul class="dropdown-menu">              <li><a href="javascript:del_dir(\'' + t + "','" + e + "');\">删除分组</a></li>              <li><a href=\"javascript:rename_dir('" + t + "','" + e + "');\">修改名称</a></li>              <li><a href=\"javascript:markread_dir('" + t + '\');">全部已读</a></li>            </ul>          </li>          <ul class="folder-item ui-sortable" style="display:' + r + ';">' + i + "</ul>"
}
function build_folder_item0(t, e, i) {
    return build_folder_item00(t, e, i, "icon-angle-right", "none")
}
function move_to_dir(t, e) {
    var i = "/user_site_dirs/move";
    1 == source_type && (i = "/user_topic_dirs/move"), $.ajax({
        url: i, type: "POST", beforeSend: function (t) {
            t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"))
        }, data: {sid: t, did: e}, success: function (i) {
            i.success ? (tmp = $("#" + t), $("#" + t).remove(), $("#f-" + e).next().prepend(tmp)) : show_load_fail_error(i.error)
        }, error: function () {
            show_load_fail_tip()
        }
    })
}
function show_move_dir(t) {
    window.sub_menu = "";
    var e = 0;
    $("li.folder1").each(function () {
        var t = $(this).attr("data-id"), i = $(this).attr("data-name");
        t && i && "0" != t && (window.sub_menu += 0 == e ? "<li class='active-li' data-id='" + t + "'>" + i + "</li>" : "<li data-id='" + t + "'>" + i + "</li>", e += 1)
    }), window.sub_menu == "" ? show_error_tip("没有可用的分组,请创建分组先") : ($("#move-source-id").val(t), $("#edit-source-modal").modal("show"), $("#add-kan-list").empty(), $("#add-kan-list").append(window.sub_menu))
}
function click_juhe_read() {
}
function del_dir(t, e) {
    $("#del-group-id").val(t), $("#del-group-name").text(e), $("#check-del-source").removeAttr("checked"), $("#delete-group-modal").modal("show")
}
function markread_dir(t) {
    var e = $("#f-" + t).next(), i = e.children();
    if (i.size() < 1)return show_toast("该分组没有订阅项", 1500), void 0;
    var n = "/sites/mark_juhe_readed/";
    1 == source_type && (n = "/topics/mark_juhe_readed/"), $.ajax({
        url: n, type: "POST", beforeSend: function (t) {
            t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"))
        }, data: {did: t}, success: function (t) {
            t.success ? (i.each(function (t, e) {
                $("#cnt-" + e.getAttribute("id")).text("")
            }), show_toast("已标记全部已读", 1500)) : show_load_fail_error(t.error)
        }, error: function () {
            show_load_fail_tip()
        }
    })
}
function do_del_dir() {
    stopRequest();
    var t = $("#del-group-id").val();
    $("#del-group-name").val();
    var e = $("#check-del-source").attr("checked"), i = "0";
    "checked" == e && (i = "1"), $("#delete-group-modal").modal("hide");
    var n = "/user_site_dirs/";
    1 == source_type && (n = "/user_topic_dirs/"), $.ajax({
        url: n + t, type: "POST", beforeSend: function (t) {
            t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"))
        }, data: {_method: "delete", del_source: i}, success: function (e) {
            e.success ? (window.dir_cnt = e.dir_cnt, "0" == i && $("#f-0").next().prepend($("#f-" + t).next().children()), $("#f-" + t).next().remove(), $("#f-" + t).remove(), window.sub_menu = "") : show_load_fail_error(e.error)
        }, error: function () {
            show_load_fail_tip()
        }
    })
}
function do_new_dir() {
    stopRequest();
    var t = $("#new-item-id").val(), e = $("#new-group-name").val();
    if (e.length < 2 || "默认分组" == e || "null" == e)return show_error_tip("分组名称无效"), void 0;
    if (e.length > 10)return show_error_tip("分组名称最多10个字符"), void 0;
    $("#new-group-name-modal").modal("hide");
    var i = "/user_site_dirs/";
    1 == source_type && (i = "/user_topic_dirs/"), $.ajax({
        url: i, type: "POST", beforeSend: function (t) {
            t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"))
        }, data: {tid: t, name: e}, success: function (e) {
            if (e.success) {
                he = $("#" + t), $("#" + t).remove();
                var i = build_new_folder_item(e.did, e.name, t, he.html());
                $("li.folder1").first().before(i), window.dir_cnt = e.dir_cnt, window.sub_menu = ""
            } else show_load_fail_error(e.error)
        }, error: function () {
            show_load_fail_tip()
        }
    })
}
function new_dir(t) {
    $("#new-item-id").val(t), $("#new-group-name").val(""), $("#new-group-name-modal").modal("show")
}
function rename_dir(t, e) {
    $("#edit-group-id").val(t), $("#edit-group-name").val(e), $("#edit-group-name-modal").modal("show")
}
function do_rename_dir() {
    stopRequest();
    var t = $("#edit-group-id").val(), e = $("#edit-group-name").val();
    if (e.length < 2 || "默认分组" == e || "null" == e)return show_error_tip("分组名称无效"), void 0;
    if (e.length > 10)return show_error_tip("分组名称最多10个字符"), void 0;
    $("#edit-group-name-modal").modal("hide");
    var i = "/user_site_dirs/";
    1 == source_type && (i = "/user_topic_dirs/"), $.ajax({
        url: i + t, type: "POST", beforeSend: function (t) {
            t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"))
        }, data: {_method: "PUT", name: e}, success: function (e) {
            e.success ? ($("#f-" + t).find(".title span").text(e.name), window.sub_menu = "") : show_load_fail_error(e.error)
        }, error: function () {
            show_load_fail_tip()
        }
    })
}
function unfollow_source(t, e) {
    $("#del-item-id").val(t), $("#del-item-name").text(e), $("#delete-source-modal").modal("show")
}
function do_unfollow_source() {
    stopRequest();
    var t = $("#del-item-id").val();
    $("#delete-source-modal").modal("hide");
    var e = "/sites/do_follow";
    1 == source_type && (e = "/topics/do_follow"), $.ajax({
        url: e, type: "POST", beforeSend: function (t) {
            t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"))
        }, data: {id: t}, success: function (e) {
            e.success && e.can_del ? e.data == 1 && $("#" + t).remove() : e.success ? e.can_del || show_load_fail_error("需要最少订阅5个主题~~") : show_load_fail_error(e.error)
        }, error: function () {
            show_load_fail_tip()
        }
    })
}
function build_folder_item_order() {
    var t = "/user_site_dirs/order";
    1 == source_type && (t = "/user_topic_dirs/order"), $(".folder-item").sortable({
        placeholder: "state-highlight",
        update: function (e) {
            for (reg = /f-(\d+)/, current_dir = $(e.target), prev_node = current_dir.prev(), did = reg.exec(prev_node.attr("id"))[1], folder_items = current_dir.children(), new_order = new Array, i = 0; i < folder_items.length; i++)new_order.push(folder_items[i].id);
            $.ajax({
                url: t, type: "POST", beforeSend: function (t) {
                    t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"))
                }, data: {did: did, new_order: new_order}, success: function (t) {
                    t.success || show_load_fail_error(t.error)
                }, error: function () {
                    show_load_fail_tip()
                }
            })
        }
    }).disableSelection()
}
function show_load_fail_tip() {
    showLoadFlashTip("")
}
function show_load_fail_error(t) {
    showLoadFlashTip(t)
}
function showLoadFlashTip(t) {
    stop_spinner(), "" != t ? showFlashTip(t) : showFlashTip("加载失败，请刷新页面重试")
}
function hide_right_container() {
    $("#topic-list-container").hide()
}
function show_right_container() {
    $("#topic-list-container").show()
}
function init_window_vars() {
    window.req = "", window.sort_type = 0, window.sub_menu = "", window.source_pn = 0, $(".topic-left li").live({
        mouseenter: function () {
            $(this).find(".ccaret").show()
        }, mouseleave: function () {
            $(this).find(".ccaret").hide()
        }, click: function () {
            $(".topic-left li").css("background", "none"), $(this).css("background", "#eee")
        }
    }), String.prototype.hashCode = function () {
        var t, e, i = 0;
        if (this.length == 0)return i;
        for (t = 0; t < this.length; t++)e = this.charCodeAt(t), i = (i << 5) - i + e, i &= i;
        return i
    }, $(".follow").live("click", function () {
        click_follow_source($(this))
    }), $(".folder1 i").live("click", function () {
        $(this).parent().parent().next().toggle(), $(this).toggleClass("icon-angle-down icon-angle-right")
    }), $(".folder1 .name").live("click", function () {
        dir = $(this).attr("dir-id"), click_juhe_read(dir)
    }), $(".topic_hot_list .single").live("mouseover", function () {
        $(this).find(".follow").show(), $(this).find("img").css("opacity", ".5")
    }).live("mouseout", function () {
        $(this).find(".follow").hide(), $(this).find("img").css("opacity", "1")
    })
}
function show_load_more_articles_state() {
    $("#loadmorearticles").show(), $("#show-load-more").show(), $("#show-loading-more").hide()
}
function show_loading_more_articles_state() {
    $("#loadmorearticles").show(), $("#show-load-more").hide(), $("#show-loading-more").show()
}
function hide_load_more_articles_state() {
    $("#loadmorearticles").hide()
}
function show_error_tip(t) {
    show_error_tip0(t, 3e3)
}
function show_error_tip_long(t) {
    show_error_tip0(t, 4e7)
}
function show_error_tip0(t, e) {
    var i = {
        appendTo: "#topic-right",
        customClass: !1,
        type: "danger",
        offset: {from: "top", amount: 250},
        align: "center",
        minWidth: 160,
        maxWidth: 450,
        delay: e,
        allowDismiss: !0,
        spacing: 5
    };
    window.toast && $.simplyToast.remove(window.toast), window.toast = $.simplyToast(t, "danger", i)
}
function show_toast(t, e) {
    show_tip_with_time(t, e)
}
function show_toast0(t, e) {
    var i = {
        appendTo: "#topic-right",
        customClass: !1,
        type: "info",
        offset: {from: "top", amount: 250},
        align: "center",
        minWidth: 160,
        maxWidth: 450,
        delay: e,
        allowDismiss: !0,
        spacing: 5
    };
    window.toast && $.simplyToast.remove(window.toast), window.toast = $.simplyToast(t, "info", i)
}
function showFlashTip(t) {
    show_error_tip_long(t)
}
function stopRequest() {
    try {
        req && req.abort(), window.toast && $.simplyToast.remove(window.toast), stop_spinner()
    } catch (t) {
    }
}
function click_juhe_read(t) {
    var e = $(this).parent().parent().next().children().size();
    return e > 50 ? (showFlashTip("聚合阅读最多支持50个站点，请迁移多余站点后开启聚合阅读。"), void 0) : (load_site_articles(t, 0, 0, 0, !0), void 0)
}
function loadsites(t, e, i) {
    stopRequest(), $(".topic-left").find(".active").removeClass("active"), $("#s-" + t).addClass("active"), $(".lang li").removeClass("active"), $("#l-0").addClass("active"), $(".topic-list .topic_hot_list").remove(), $(".tpc-show").hide(), $(".topic-list").hide(), hide_right_container(), show_spinner(), $.getJSON("/sites/hotsites?id=" + t + "&lang=" + i, function (t) {
        t.success ? (stop_spinner(), $.each(t.ch_data, function (t, e) {
            $(".topic-list").append(build_follow_item(e, "1", 0, !0))
        }), $.each(t.en_data, function (t, e) {
            $(".topic-list").append(build_follow_item(e, "2", 0, !0))
        }), $("#l-" + t.lang).addClass("active"), $(".topic-list .lang").show(), $(".topic-list").show(), $("#hot-site-body").show(), show_right_container()) : show_load_fail_error(t.error)
    }).error(function () {
        show_load_fail_tip()
    })
}
function load_index() {
    $(".topic-left").hide(), hide_right_container(), $.getJSON("/sites/index_async", function (t) {
        t.success ? (stop_spinner(), $.each(t.dir_items, function (t, e) {
            var i = "";
            $.each(e[2], function (t, e) {
                i += build_folder_source_item(e)
            }), t = trim(e[0]), 0 == t ? $(".my-topics").append(build_default_folder_item(e[1], i)) : $(".my-topics").append(build_folder_item0(t, e[1], i))
        }), $(".sort_list").find("i").removeClass("icon-ok"), $("#st-" + t.st).find("i").addClass("icon icon-ok"), window.dir_cnt = t.dir_cnt, window.sort_type = t.st, $(".my-topics").css("margin-bottom", "140px"), t.sites.length == 0 ? $(".topic-list").append("<div class='topic_hot_list alert alert-success'>你还没有订阅站点,去订阅发现频道看看吧</div>") : $.each(t.sites, function (t, e) {
            $(".topic-list").append(build_follow_item(e, "0", 0, !1))
        }), $(".topic-list .lang").hide(), build_folder_item_order(), $(".topic-list").show(), $(".topic-left").show(), show_right_container()) : show_load_fail_error(t.error)
    }).error(function () {
        show_load_fail_tip()
    })
}
function check_site_article_counts(t, e) {
    var i = "/sites/check_juhe_counts?did=" + t + "&time=" + e;
    $.getJSON(i, function (t) {
        t.success && $.each(t.data, function (t, e) {
            if (e.count == 0) {
                var i = e.id;
                $("#cnt-" + i).text("")
            }
        })
    }).error(function () {
    })
}
function load_site_articles(t, e, i, n, r) {
    stopRequest(), source_pn = n, source_pn > 0 ? show_loading_more_articles_state() : ($(".topic-list .topic_hot_list").remove(), $(".list_article").empty(), $(".tpc-show").hide(), $("#hot-site-body").hide(), hide_right_container(), show_spinner());
    var o = 0;
    if (n > 0) {
        var s = $(".list_article").attr("data-time");
        o = s
    } else window.code = "";
    var a = "";
    r ? (a = "/sites/juhe_reading?did=" + t + "&pn=" + source_pn + "&m=" + s_mode + "&lt=" + o + "&code=" + window.code, $("#site_head").hide(), $("#juhe_head").show()) : (a = "/sites/show_site?id=" + t + "&pn=" + source_pn + "&m=" + s_mode + "&lt=" + o, $("#juhe_head").hide(), $("#site_head").show()), $.getJSON(a, function (e) {
        if ($(".list_article").attr("data-time", "0"), e.success) {
            if (stop_spinner(), r) {
                window.site_id = "", window.group_id = t, window.code = e.code;
                var i = $("#fn-" + t).text();
                $("#juhe_head .ori").text(i), e.time > 0 && check_site_article_counts(t, e.time)
            } else window.site_id = e.data.id, window.group_id = "", $("#topic_head .ori").attr("href", e.data.url), $("#topic_head .ori").text(e.data.name);
            var n = e.articles;
            $.each(n, function (t, e) {
                $(".list_article").attr("data-time", e.time), $(".list_article").append(build_source_article_item(e))
            }), $(".tpc-show").show(), 0 == source_pn && ($("#cnt-" + t).text(""), r && e.tip != "" && show_toast(e.tip, 2e3)), source_pn += 1, e.has_more ? show_load_more_articles_state() : (hide_load_more_articles_state(), e.tip && showFlashTip(e.tip)), show_right_container()
        } else show_load_fail_error(e.error)
    }).error(function () {
        show_load_fail_tip()
    })
}
function load_topic(t, e, i, n) {
    load_site_articles(t, e, i, n, !1)
}
function click_more() {
    "" != group_id ? load_site_articles(group_id, 0, 0, source_pn, !0) : "" != site_id && load_site_articles(site_id, 0, 0, source_pn, !1)
}
function langfilter(t) {
    switch ($(".lang li").removeClass("active"), t) {
        case 1:
            $(".lang-0").hide(), $(".lang-2").hide(), $(".lang-1").show(), $("ul li#l-1").addClass("active");
            break;
        case 2:
            $(".lang-0").hide(), $(".lang-2").show(), $(".lang-1").hide(), $("ul li#l-2").addClass("active");
            break;
        case 0:
            $(".lang-1").show(), $(".lang-2").show(), $("ul li#l-0").addClass("active")
    }
}
(function (t, e) {
    function i(e, i) {
        var r, o, s, a = e.nodeName.toLowerCase();
        return "area" === a ? (r = e.parentNode, o = r.name, e.href && o && "map" === r.nodeName.toLowerCase() ? (s = t("img[usemap=#" + o + "]")[0], !!s && n(s)) : !1) : (/input|select|textarea|button|object/.test(a) ? !e.disabled : "a" === a ? e.href || i : i) && n(e)
    }

    function n(e) {
        return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function () {
                return "hidden" === t.css(this, "visibility")
            }).length
    }

    var r = 0, o = /^ui-id-\d+$/;
    t.ui = t.ui || {}, t.extend(t.ui, {
        version: "1.10.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), t.fn.extend({
        focus: function (e) {
            return function (i, n) {
                return "number" == typeof i ? this.each(function () {
                    var e = this;
                    setTimeout(function () {
                        t(e).focus(), n && n.call(e)
                    }, i)
                }) : e.apply(this, arguments)
            }
        }(t.fn.focus), scrollParent: function () {
            var e;
            return e = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                return /(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function () {
                return /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !e.length ? t(document) : e
        }, zIndex: function (i) {
            if (i !== e)return this.css("zIndex", i);
            if (this.length)for (var n, r, o = t(this[0]); o.length && o[0] !== document;) {
                if (n = o.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (r = parseInt(o.css("zIndex"), 10), !isNaN(r) && 0 !== r))return r;
                o = o.parent()
            }
            return 0
        }, uniqueId: function () {
            return this.each(function () {
                this.id || (this.id = "ui-id-" + ++r)
            })
        }, removeUniqueId: function () {
            return this.each(function () {
                o.test(this.id) && t(this).removeAttr("id")
            })
        }
    }), t.extend(t.expr[":"], {
        data: t.expr.createPseudo ? t.expr.createPseudo(function (e) {
            return function (i) {
                return !!t.data(i, e)
            }
        }) : function (e, i, n) {
            return !!t.data(e, n[3])
        }, focusable: function (e) {
            return i(e, !isNaN(t.attr(e, "tabindex")))
        }, tabbable: function (e) {
            var n = t.attr(e, "tabindex"), r = isNaN(n);
            return (r || n >= 0) && i(e, !r)
        }
    }), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function (i, n) {
        function r(e, i, n, r) {
            return t.each(o, function () {
                i -= parseFloat(t.css(e, "padding" + this)) || 0, n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), r && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
            }), i
        }

        var o = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"], s = n.toLowerCase(), a = {
            innerWidth: t.fn.innerWidth,
            innerHeight: t.fn.innerHeight,
            outerWidth: t.fn.outerWidth,
            outerHeight: t.fn.outerHeight
        };
        t.fn["inner" + n] = function (i) {
            return i === e ? a["inner" + n].call(this) : this.each(function () {
                t(this).css(s, r(this, i) + "px")
            })
        }, t.fn["outer" + n] = function (e, i) {
            return "number" != typeof e ? a["outer" + n].call(this, e) : this.each(function () {
                t(this).css(s, r(this, e, !0, i) + "px")
            })
        }
    }), t.fn.addBack || (t.fn.addBack = function (t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function (e) {
        return function (i) {
            return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
        }
    }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.support.selectstart = "onselectstart" in document.createElement("div"), t.fn.extend({
        disableSelection: function () {
            return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (t) {
                t.preventDefault()
            })
        }, enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }
    }), t.extend(t.ui, {
        plugin: {
            add: function (e, i, n) {
                var r, o = t.ui[e].prototype;
                for (r in n)o.plugins[r] = o.plugins[r] || [], o.plugins[r].push([i, n[r]])
            }, call: function (t, e, i) {
                var n, r = t.plugins[e];
                if (r && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)for (n = 0; r.length > n; n++)t.options[r[n][0]] && r[n][1].apply(t.element, i)
            }
        }, hasScroll: function (e, i) {
            if ("hidden" === t(e).css("overflow"))return !1;
            var n = i && "left" === i ? "scrollLeft" : "scrollTop", r = !1;
            return e[n] > 0 ? !0 : (e[n] = 1, r = e[n] > 0, e[n] = 0, r)
        }
    })
})(jQuery), function (t, e) {
    var i = 0, n = Array.prototype.slice, r = t.cleanData;
    t.cleanData = function (e) {
        for (var i, n = 0; null != (i = e[n]); n++)try {
            t(i).triggerHandler("remove")
        } catch (o) {
        }
        r(e)
    }, t.widget = function (i, n, r) {
        var o, s, a, l, c = {}, u = i.split(".")[0];
        i = i.split(".")[1], o = u + "-" + i, r || (r = n, n = t.Widget), t.expr[":"][o.toLowerCase()] = function (e) {
            return !!t.data(e, o)
        }, t[u] = t[u] || {}, s = t[u][i], a = t[u][i] = function (t, i) {
            return this._createWidget ? (arguments.length && this._createWidget(t, i), e) : new a(t, i)
        }, t.extend(a, s, {
            version: r.version,
            _proto: t.extend({}, r),
            _childConstructors: []
        }), l = new n, l.options = t.widget.extend({}, l.options), t.each(r, function (i, r) {
            return t.isFunction(r) ? (c[i] = function () {
                var t = function () {
                    return n.prototype[i].apply(this, arguments)
                }, e = function (t) {
                    return n.prototype[i].apply(this, t)
                };
                return function () {
                    var i, n = this._super, o = this._superApply;
                    return this._super = t, this._superApply = e, i = r.apply(this, arguments), this._super = n, this._superApply = o, i
                }
            }(), e) : (c[i] = r, e)
        }), a.prototype = t.widget.extend(l, {widgetEventPrefix: s ? l.widgetEventPrefix : i}, c, {
            constructor: a,
            namespace: u,
            widgetName: i,
            widgetFullName: o
        }), s ? (t.each(s._childConstructors, function (e, i) {
            var n = i.prototype;
            t.widget(n.namespace + "." + n.widgetName, a, i._proto)
        }), delete s._childConstructors) : n._childConstructors.push(a), t.widget.bridge(i, a)
    }, t.widget.extend = function (i) {
        for (var r, o, s = n.call(arguments, 1), a = 0, l = s.length; l > a; a++)for (r in s[a])o = s[a][r], s[a].hasOwnProperty(r) && o !== e && (i[r] = t.isPlainObject(o) ? t.isPlainObject(i[r]) ? t.widget.extend({}, i[r], o) : t.widget.extend({}, o) : o);
        return i
    }, t.widget.bridge = function (i, r) {
        var o = r.prototype.widgetFullName || i;
        t.fn[i] = function (s) {
            var a = "string" == typeof s, l = n.call(arguments, 1), c = this;
            return s = !a && l.length ? t.widget.extend.apply(null, [s].concat(l)) : s, a ? this.each(function () {
                var n, r = t.data(this, o);
                return r ? t.isFunction(r[s]) && "_" !== s.charAt(0) ? (n = r[s].apply(r, l), n !== r && n !== e ? (c = n && n.jquery ? c.pushStack(n.get()) : n, !1) : e) : t.error("no such method '" + s + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + s + "'")
            }) : this.each(function () {
                var e = t.data(this, o);
                e ? e.option(s || {})._init() : t.data(this, o, new r(s, this))
            }), c
        }
    }, t.Widget = function () {
    }, t.Widget._childConstructors = [], t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {disabled: !1, create: null},
        _createWidget: function (e, n) {
            n = t(n || this.defaultElement || this)[0], this.element = t(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), n !== this && (t.data(n, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (t) {
                    t.target === n && this.destroy()
                }
            }), this.document = t(n.style ? n.ownerDocument : n.document || n), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: t.noop,
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: t.noop,
        widget: function () {
            return this.element
        },
        option: function (i, n) {
            var r, o, s, a = i;
            if (0 === arguments.length)return t.widget.extend({}, this.options);
            if ("string" == typeof i)if (a = {}, r = i.split("."), i = r.shift(), r.length) {
                for (o = a[i] = t.widget.extend({}, this.options[i]), s = 0; r.length - 1 > s; s++)o[r[s]] = o[r[s]] || {}, o = o[r[s]];
                if (i = r.pop(), n === e)return o[i] === e ? null : o[i];
                o[i] = n
            } else {
                if (n === e)return this.options[i] === e ? null : this.options[i];
                a[i] = n
            }
            return this._setOptions(a), this
        },
        _setOptions: function (t) {
            var e;
            for (e in t)this._setOption(e, t[e]);
            return this
        },
        _setOption: function (t, e) {
            return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function () {
            return this._setOption("disabled", !1)
        },
        disable: function () {
            return this._setOption("disabled", !0)
        },
        _on: function (i, n, r) {
            var o, s = this;
            "boolean" != typeof i && (r = n, n = i, i = !1), r ? (n = o = t(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, o = this.widget()), t.each(r, function (r, a) {
                function l() {
                    return i || s.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? s[a] : a).apply(s, arguments) : e
                }

                "string" != typeof a && (l.guid = a.guid = a.guid || l.guid || t.guid++);
                var c = r.match(/^(\w+)\s*(.*)$/), u = c[1] + s.eventNamespace, h = c[2];
                h ? o.delegate(h, u, l) : n.bind(u, l)
            })
        },
        _off: function (t, e) {
            e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
        },
        _delay: function (t, e) {
            function i() {
                return ("string" == typeof t ? n[t] : t).apply(n, arguments)
            }

            var n = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function (e) {
            this.hoverable = this.hoverable.add(e), this._on(e, {
                mouseenter: function (e) {
                    t(e.currentTarget).addClass("ui-state-hover")
                }, mouseleave: function (e) {
                    t(e.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (e) {
            this.focusable = this.focusable.add(e), this._on(e, {
                focusin: function (e) {
                    t(e.currentTarget).addClass("ui-state-focus")
                }, focusout: function (e) {
                    t(e.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (e, i, n) {
            var r, o, s = this.options[e];
            if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)for (r in o)r in i || (i[r] = o[r]);
            return this.element.trigger(i, n), !(t.isFunction(s) && s.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
        }
    }, t.each({show: "fadeIn", hide: "fadeOut"}, function (e, i) {
        t.Widget.prototype["_" + e] = function (n, r, o) {
            "string" == typeof r && (r = {effect: r});
            var s, a = r ? r === !0 || "number" == typeof r ? i : r.effect || i : e;
            r = r || {}, "number" == typeof r && (r = {duration: r}), s = !t.isEmptyObject(r), r.complete = o, r.delay && n.delay(r.delay), s && t.effects && t.effects.effect[a] ? n[e](r) : a !== e && n[a] ? n[a](r.duration, r.easing, o) : n.queue(function (i) {
                t(this)[e](), o && o.call(n[0]), i()
            })
        }
    })
}(jQuery), function (t) {
    var e = !1;
    t(document).mouseup(function () {
        e = !1
    }), t.widget("ui.mouse", {
        version: "1.10.2",
        options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0},
        _mouseInit: function () {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function (t) {
                return e._mouseDown(t)
            }).bind("click." + this.widgetName, function (i) {
                return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function (i) {
            if (!e) {
                this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                var n = this, r = 1 === i.which, o = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
                return r && !o && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    n.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) {
                    return n._mouseMove(t)
                }, this._mouseUpDelegate = function (t) {
                    return n._mouseUp(t)
                }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = !0, !0)) : !0
            }
        },
        _mouseMove: function (e) {
            return t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
        },
        _mouseUp: function (e) {
            return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
        },
        _mouseDistanceMet: function (t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {
        },
        _mouseDrag: function () {
        },
        _mouseStop: function () {
        },
        _mouseCapture: function () {
            return !0
        }
    })
}(jQuery), function (t, e) {
    function i(t, e, i) {
        return [parseFloat(t[0]) * (f.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (f.test(t[1]) ? i / 100 : 1)]
    }

    function n(e, i) {
        return parseInt(t.css(e, i), 10) || 0
    }

    function r(e) {
        var i = e[0];
        return 9 === i.nodeType ? {
            width: e.width(),
            height: e.height(),
            offset: {top: 0, left: 0}
        } : t.isWindow(i) ? {
            width: e.width(),
            height: e.height(),
            offset: {top: e.scrollTop(), left: e.scrollLeft()}
        } : i.preventDefault ? {width: 0, height: 0, offset: {top: i.pageY, left: i.pageX}} : {
            width: e.outerWidth(),
            height: e.outerHeight(),
            offset: e.offset()
        }
    }

    t.ui = t.ui || {};
    var o, s = Math.max, a = Math.abs, l = Math.round, c = /left|center|right/, u = /top|center|bottom/, h = /[\+\-]\d+(\.[\d]+)?%?/, d = /^\w+/, f = /%$/, p = t.fn.position;
    t.position = {
        scrollbarWidth: function () {
            if (o !== e)return o;
            var i, n, r = t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), s = r.children()[0];
            return t("body").append(r), i = s.offsetWidth, r.css("overflow", "scroll"), n = s.offsetWidth, i === n && (n = r[0].clientWidth), r.remove(), o = i - n
        }, getScrollInfo: function (e) {
            var i = e.isWindow ? "" : e.element.css("overflow-x"), n = e.isWindow ? "" : e.element.css("overflow-y"), r = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth, o = "scroll" === n || "auto" === n && e.height < e.element[0].scrollHeight;
            return {width: o ? t.position.scrollbarWidth() : 0, height: r ? t.position.scrollbarWidth() : 0}
        }, getWithinInfo: function (e) {
            var i = t(e || window), n = t.isWindow(i[0]);
            return {
                element: i,
                isWindow: n,
                offset: i.offset() || {left: 0, top: 0},
                scrollLeft: i.scrollLeft(),
                scrollTop: i.scrollTop(),
                width: n ? i.width() : i.outerWidth(),
                height: n ? i.height() : i.outerHeight()
            }
        }
    }, t.fn.position = function (e) {
        if (!e || !e.of)return p.apply(this, arguments);
        e = t.extend({}, e);
        var o, f, m, g, v, y, _ = t(e.of), b = t.position.getWithinInfo(e.within), w = t.position.getScrollInfo(b), x = (e.collision || "flip").split(" "), T = {};
        return y = r(_), _[0].preventDefault && (e.at = "left top"), f = y.width, m = y.height, g = y.offset, v = t.extend({}, g), t.each(["my", "at"], function () {
            var t, i, n = (e[this] || "").split(" ");
            1 === n.length && (n = c.test(n[0]) ? n.concat(["center"]) : u.test(n[0]) ? ["center"].concat(n) : ["center", "center"]), n[0] = c.test(n[0]) ? n[0] : "center", n[1] = u.test(n[1]) ? n[1] : "center", t = h.exec(n[0]), i = h.exec(n[1]), T[this] = [t ? t[0] : 0, i ? i[0] : 0], e[this] = [d.exec(n[0])[0], d.exec(n[1])[0]]
        }), 1 === x.length && (x[1] = x[0]), "right" === e.at[0] ? v.left += f : "center" === e.at[0] && (v.left += f / 2), "bottom" === e.at[1] ? v.top += m : "center" === e.at[1] && (v.top += m / 2), o = i(T.at, f, m), v.left += o[0], v.top += o[1], this.each(function () {
            var r, c, u = t(this), h = u.outerWidth(), d = u.outerHeight(), p = n(this, "marginLeft"), y = n(this, "marginTop"), C = h + p + n(this, "marginRight") + w.width, N = d + y + n(this, "marginBottom") + w.height, k = t.extend({}, v), S = i(T.my, u.outerWidth(), u.outerHeight());
            "right" === e.my[0] ? k.left -= h : "center" === e.my[0] && (k.left -= h / 2), "bottom" === e.my[1] ? k.top -= d : "center" === e.my[1] && (k.top -= d / 2), k.left += S[0], k.top += S[1], t.support.offsetFractions || (k.left = l(k.left), k.top = l(k.top)), r = {
                marginLeft: p,
                marginTop: y
            }, t.each(["left", "top"], function (i, n) {
                t.ui.position[x[i]] && t.ui.position[x[i]][n](k, {
                    targetWidth: f,
                    targetHeight: m,
                    elemWidth: h,
                    elemHeight: d,
                    collisionPosition: r,
                    collisionWidth: C,
                    collisionHeight: N,
                    offset: [o[0] + S[0], o[1] + S[1]],
                    my: e.my,
                    at: e.at,
                    within: b,
                    elem: u
                })
            }), e.using && (c = function (t) {
                var i = g.left - k.left, n = i + f - h, r = g.top - k.top, o = r + m - d, l = {
                    target: {
                        element: _,
                        left: g.left,
                        top: g.top,
                        width: f,
                        height: m
                    },
                    element: {element: u, left: k.left, top: k.top, width: h, height: d},
                    horizontal: 0 > n ? "left" : i > 0 ? "right" : "center",
                    vertical: 0 > o ? "top" : r > 0 ? "bottom" : "middle"
                };
                h > f && f > a(i + n) && (l.horizontal = "center"), d > m && m > a(r + o) && (l.vertical = "middle"), l.important = s(a(i), a(n)) > s(a(r), a(o)) ? "horizontal" : "vertical", e.using.call(this, t, l)
            }), u.offset(t.extend(k, {using: c}))
        })
    }, t.ui.position = {
        fit: {
            left: function (t, e) {
                var i, n = e.within, r = n.isWindow ? n.scrollLeft : n.offset.left, o = n.width, a = t.left - e.collisionPosition.marginLeft, l = r - a, c = a + e.collisionWidth - o - r;
                e.collisionWidth > o ? l > 0 && 0 >= c ? (i = t.left + l + e.collisionWidth - o - r, t.left += l - i) : t.left = c > 0 && 0 >= l ? r : l > c ? r + o - e.collisionWidth : r : l > 0 ? t.left += l : c > 0 ? t.left -= c : t.left = s(t.left - a, t.left)
            }, top: function (t, e) {
                var i, n = e.within, r = n.isWindow ? n.scrollTop : n.offset.top, o = e.within.height, a = t.top - e.collisionPosition.marginTop, l = r - a, c = a + e.collisionHeight - o - r;
                e.collisionHeight > o ? l > 0 && 0 >= c ? (i = t.top + l + e.collisionHeight - o - r, t.top += l - i) : t.top = c > 0 && 0 >= l ? r : l > c ? r + o - e.collisionHeight : r : l > 0 ? t.top += l : c > 0 ? t.top -= c : t.top = s(t.top - a, t.top)
            }
        }, flip: {
            left: function (t, e) {
                var i, n, r = e.within, o = r.offset.left + r.scrollLeft, s = r.width, l = r.isWindow ? r.scrollLeft : r.offset.left, c = t.left - e.collisionPosition.marginLeft, u = c - l, h = c + e.collisionWidth - s - l, d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0, f = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0, p = -2 * e.offset[0];
                0 > u ? (i = t.left + d + f + p + e.collisionWidth - s - o, (0 > i || a(u) > i) && (t.left += d + f + p)) : h > 0 && (n = t.left - e.collisionPosition.marginLeft + d + f + p - l, (n > 0 || h > a(n)) && (t.left += d + f + p))
            }, top: function (t, e) {
                var i, n, r = e.within, o = r.offset.top + r.scrollTop, s = r.height, l = r.isWindow ? r.scrollTop : r.offset.top, c = t.top - e.collisionPosition.marginTop, u = c - l, h = c + e.collisionHeight - s - l, d = "top" === e.my[1], f = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0, p = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0, m = -2 * e.offset[1];
                0 > u ? (n = t.top + f + p + m + e.collisionHeight - s - o, t.top + f + p + m > u && (0 > n || a(u) > n) && (t.top += f + p + m)) : h > 0 && (i = t.top - e.collisionPosition.marginTop + f + p + m - l, t.top + f + p + m > h && (i > 0 || h > a(i)) && (t.top += f + p + m))
            }
        }, flipfit: {
            left: function () {
                t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
            }, top: function () {
                t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
            }
        }
    }, function () {
        var e, i, n, r, o, s = document.getElementsByTagName("body")[0], a = document.createElement("div");
        e = document.createElement(s ? "div" : "body"), n = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, s && t.extend(n, {position: "absolute", left: "-1000px", top: "-1000px"});
        for (o in n)e.style[o] = n[o];
        e.appendChild(a), i = s || document.documentElement, i.insertBefore(e, i.firstChild), a.style.cssText = "position: absolute; left: 10.7432222px;", r = t(a).offset().left, t.support.offsetFractions = r > 10 && 11 > r, e.innerHTML = "", i.removeChild(e)
    }()
}(jQuery), function (t) {
    function e(t, e, i) {
        return t > e && e + i > t
    }

    function i(t) {
        return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
    }

    t.widget("ui.sortable", t.ui.mouse, {
        version: "1.10.2",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function () {
            var t = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === t.axis || i(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
        },
        _destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var t = this.items.length - 1; t >= 0; t--)this.items[t].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function (e, i) {
            "disabled" === e ? (this.options[e] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : t.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function (e, i) {
            var n = null, r = !1, o = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function () {
                return t.data(this, o.widgetName + "-item") === o ? (n = t(this), !1) : void 0
            }), t.data(e.target, o.widgetName + "-item") === o && (n = t(e.target)), n ? !this.options.handle || i || (t(this.options.handle, n).find("*").addBack().each(function () {
                this === e.target && (r = !0)
            }), r) ? (this.currentItem = n, this._removeCurrentsFromItems(), !0) : !1 : !1)
        },
        _mouseStart: function (e, i, n) {
            var r, o, s = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, t.extend(this.offset, {
                    click: {left: e.pageX - this.offset.left, top: e.pageY - this.offset.top},
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, s.cursorAt && this._adjustOffsetFromHelper(s.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), s.containment && this._setContainment(), s.cursor && "auto" !== s.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", s.cursor), this.storedStylesheet = t("<style>*{ cursor: " + s.cursor + " !important; }</style>").appendTo(o)), s.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", s.opacity)), s.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", s.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !n)for (r = this.containers.length - 1; r >= 0; r--)this.containers[r]._trigger("activate", e, this._uiHash(this));
            return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
        },
        _mouseDrag: function (e) {
            var i, n, r, o, s = this.options, a = !1;
            for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < s.scrollSensitivity ? this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop + s.scrollSpeed : e.pageY - this.overflowOffset.top < s.scrollSensitivity && (this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop - s.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < s.scrollSensitivity ? this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft + s.scrollSpeed : e.pageX - this.overflowOffset.left < s.scrollSensitivity && (this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft - s.scrollSpeed)) : (e.pageY - t(document).scrollTop() < s.scrollSensitivity ? a = t(document).scrollTop(t(document).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < s.scrollSensitivity && (a = t(document).scrollTop(t(document).scrollTop() + s.scrollSpeed)), e.pageX - t(document).scrollLeft() < s.scrollSensitivity ? a = t(document).scrollLeft(t(document).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < s.scrollSensitivity && (a = t(document).scrollLeft(t(document).scrollLeft() + s.scrollSpeed))), a !== !1 && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)if (n = this.items[i], r = n.item[0], o = this._intersectsWithPointer(n), o && n.instance === this.currentContainer && r !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== r && !t.contains(this.placeholder[0], r) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], r) : !0)) {
                if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(n))break;
                this._rearrange(e, n), this._trigger("change", e, this._uiHash());
                break
            }
            return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function (e, i) {
            if (e) {
                if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                    var n = this, r = this.placeholder.offset(), o = this.options.axis, s = {};
                    o && "x" !== o || (s.left = r.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (s.top = r.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(s, parseInt(this.options.revert, 10) || 500, function () {
                        n._clear(e)
                    })
                } else this._clear(e, i);
                return !1
            }
        },
        cancel: function () {
            if (this.dragging) {
                this._mouseUp({target: null}), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var e = this.containers.length - 1; e >= 0; e--)this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function (e) {
            var i = this._getItemsAsjQuery(e && e.connected), n = [];
            return e = e || {}, t(i).each(function () {
                var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                i && n.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
            }), !n.length && e.key && n.push(e.key + "="), n.join("&")
        },
        toArray: function (e) {
            var i = this._getItemsAsjQuery(e && e.connected), n = [];
            return e = e || {}, i.each(function () {
                n.push(t(e.item || this).attr(e.attribute || "id") || "")
            }), n
        },
        _intersectsWith: function (t) {
            var e = this.positionAbs.left, i = e + this.helperProportions.width, n = this.positionAbs.top, r = n + this.helperProportions.height, o = t.left, s = o + t.width, a = t.top, l = a + t.height, c = this.offset.click.top, u = this.offset.click.left, h = n + c > a && l > n + c && e + u > o && s > e + u;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? h : e + this.helperProportions.width / 2 > o && s > i - this.helperProportions.width / 2 && n + this.helperProportions.height / 2 > a && l > r - this.helperProportions.height / 2
        },
        _intersectsWithPointer: function (t) {
            var i = "x" === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t.top, t.height), n = "y" === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t.left, t.width), r = i && n, o = this._getDragVerticalDirection(), s = this._getDragHorizontalDirection();
            return r ? this.floating ? s && "right" === s || "down" === o ? 2 : 1 : o && ("down" === o ? 2 : 1) : !1
        },
        _intersectsWithSides: function (t) {
            var i = e(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height), n = e(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width), r = this._getDragVerticalDirection(), o = this._getDragHorizontalDirection();
            return this.floating && o ? "right" === o && n || "left" === o && !n : r && ("down" === r && i || "up" === r && !i)
        },
        _getDragVerticalDirection: function () {
            var t = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== t && (t > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var t = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== t && (t > 0 ? "right" : "left")
        },
        refresh: function (t) {
            return this._refreshItems(t), this.refreshPositions(), this
        },
        _connectWith: function () {
            var t = this.options;
            return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
        },
        _getItemsAsjQuery: function (e) {
            var i, n, r, o, s = [], a = [], l = this._connectWith();
            if (l && e)for (i = l.length - 1; i >= 0; i--)for (r = t(l[i]), n = r.length - 1; n >= 0; n--)o = t.data(r[n], this.widgetFullName), o && o !== this && !o.options.disabled && a.push([t.isFunction(o.options.items) ? o.options.items.call(o.element) : t(o.options.items, o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), o]);
            for (a.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), i = a.length - 1; i >= 0; i--)a[i][0].each(function () {
                s.push(this)
            });
            return t(s)
        },
        _removeCurrentsFromItems: function () {
            var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = t.grep(this.items, function (t) {
                for (var i = 0; e.length > i; i++)if (e[i] === t.item[0])return !1;
                return !0
            })
        },
        _refreshItems: function (e) {
            this.items = [], this.containers = [this];
            var i, n, r, o, s, a, l, c, u = this.items, h = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {item: this.currentItem}) : t(this.options.items, this.element), this]], d = this._connectWith();
            if (d && this.ready)for (i = d.length - 1; i >= 0; i--)for (r = t(d[i]), n = r.length - 1; n >= 0; n--)o = t.data(r[n], this.widgetFullName), o && o !== this && !o.options.disabled && (h.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {item: this.currentItem}) : t(o.options.items, o.element), o]), this.containers.push(o));
            for (i = h.length - 1; i >= 0; i--)for (s = h[i][1], a = h[i][0], n = 0, c = a.length; c > n; n++)l = t(a[n]), l.data(this.widgetName + "-item", s), u.push({
                item: l,
                instance: s,
                width: 0,
                height: 0,
                left: 0,
                top: 0
            })
        },
        refreshPositions: function (e) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var i, n, r, o;
            for (i = this.items.length - 1; i >= 0; i--)n = this.items[i], n.instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0] || (r = this.options.toleranceElement ? t(this.options.toleranceElement, n.item) : n.item, e || (n.width = r.outerWidth(), n.height = r.outerHeight()), o = r.offset(), n.left = o.left, n.top = o.top);
            if (this.options.custom && this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this); else for (i = this.containers.length - 1; i >= 0; i--)o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function (e) {
            e = e || this;
            var i, n = e.options;
            n.placeholder && n.placeholder.constructor !== String || (i = n.placeholder, n.placeholder = {
                element: function () {
                    var n = e.currentItem[0].nodeName.toLowerCase(), r = t(e.document[0].createElement(n)).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tr" === n ? r.append("<td colspan='99'>&#160;</td>") : "img" === n && r.attr("src", e.currentItem.attr("src")), i || r.css("visibility", "hidden"), r
                }, update: function (t, r) {
                    (!i || n.forcePlaceholderSize) && (r.height() || r.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), r.width() || r.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                }
            }), e.placeholder = t(n.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), n.placeholder.update(e, e.placeholder)
        },
        _contactContainers: function (n) {
            var r, o, s, a, l, c, u, h, d, f, p = null, m = null;
            for (r = this.containers.length - 1; r >= 0; r--)if (!t.contains(this.currentItem[0], this.containers[r].element[0]))if (this._intersectsWith(this.containers[r].containerCache)) {
                if (p && t.contains(this.containers[r].element[0], p.element[0]))continue;
                p = this.containers[r], m = r
            } else this.containers[r].containerCache.over && (this.containers[r]._trigger("out", n, this._uiHash(this)), this.containers[r].containerCache.over = 0);
            if (p)if (1 === this.containers.length)this.containers[m].containerCache.over || (this.containers[m]._trigger("over", n, this._uiHash(this)), this.containers[m].containerCache.over = 1); else {
                for (s = 1e4, a = null, f = p.floating || i(this.currentItem), l = f ? "left" : "top", c = f ? "width" : "height", u = this.positionAbs[l] + this.offset.click[l], o = this.items.length - 1; o >= 0; o--)t.contains(this.containers[m].element[0], this.items[o].item[0]) && this.items[o].item[0] !== this.currentItem[0] && (!f || e(this.positionAbs.top + this.offset.click.top, this.items[o].top, this.items[o].height)) && (h = this.items[o].item.offset()[l], d = !1, Math.abs(h - u) > Math.abs(h + this.items[o][c] - u) && (d = !0, h += this.items[o][c]), s > Math.abs(h - u) && (s = Math.abs(h - u), a = this.items[o], this.direction = d ? "up" : "down"));
                if (!a && !this.options.dropOnEmpty)return;
                if (this.currentContainer === this.containers[m])return;
                a ? this._rearrange(n, a, null, !0) : this._rearrange(n, null, this.containers[m].element, !0), this._trigger("change", n, this._uiHash()), this.containers[m]._trigger("change", n, this._uiHash(this)), this.currentContainer = this.containers[m], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[m]._trigger("over", n, this._uiHash(this)), this.containers[m].containerCache.over = 1
            }
        },
        _createHelper: function (e) {
            var i = this.options, n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
            return n.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(n[0]), n[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (!n[0].style.width || i.forceHelperSize) && n.width(this.currentItem.width()), (!n[0].style.height || i.forceHelperSize) && n.height(this.currentItem.height()), n
        },
        _adjustOffsetFromHelper: function (e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" === this.cssPosition) {
                var t = this.currentItem.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {top: 0, left: 0}
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var e, i, n, r = this.options;
            "parent" === r.containment && (r.containment = this.helper[0].parentNode), ("document" === r.containment || "window" === r.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === r.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === r.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(r.containment) || (e = t(r.containment)[0], i = t(r.containment).offset(), n = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (n ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function (e, i) {
            i || (i = this.position);
            var n = "absolute" === e ? 1 : -1, r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, o = /(html|body)/i.test(r[0].tagName);
            return {
                top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : r.scrollTop()) * n,
                left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : r.scrollLeft()) * n
            }
        },
        _generatePosition: function (e) {
            var i, n, r = this.options, o = e.pageX, s = e.pageY, a = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = /(html|body)/i.test(a[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (s = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (s = this.containment[3] + this.offset.click.top)), r.grid && (i = this.originalPageY + Math.round((s - this.originalPageY) / r.grid[1]) * r.grid[1], s = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - r.grid[1] : i + r.grid[1] : i, n = this.originalPageX + Math.round((o - this.originalPageX) / r.grid[0]) * r.grid[0], o = this.containment ? n - this.offset.click.left >= this.containment[0] && n - this.offset.click.left <= this.containment[2] ? n : n - this.offset.click.left >= this.containment[0] ? n - r.grid[0] : n + r.grid[0] : n)), {
                top: s - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : a.scrollTop()),
                left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : a.scrollLeft())
            }
        },
        _rearrange: function (t, e, i, n) {
            i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var r = this.counter;
            this._delay(function () {
                r === this.counter && this.refreshPositions(!n)
            })
        },
        _clear: function (t, e) {
            this.reverting = !1;
            var i, n = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (i in this._storedCSS)("auto" === this._storedCSS[i] || "static" === this._storedCSS[i]) && (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            for (this.fromOutside && !e && n.push(function (t) {
                this._trigger("receive", t, this._uiHash(this.fromOutside))
            }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || n.push(function (t) {
                this._trigger("update", t, this._uiHash())
            }), this !== this.currentContainer && (e || (n.push(function (t) {
                this._trigger("remove", t, this._uiHash())
            }), n.push(function (t) {
                return function (e) {
                    t._trigger("receive", e, this._uiHash(this))
                }
            }.call(this, this.currentContainer)), n.push(function (t) {
                return function (e) {
                    t._trigger("update", e, this._uiHash(this))
                }
            }.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--)e || n.push(function (t) {
                return function (e) {
                    t._trigger("deactivate", e, this._uiHash(this))
                }
            }.call(this, this.containers[i])), this.containers[i].containerCache.over && (n.push(function (t) {
                return function (e) {
                    t._trigger("out", e, this._uiHash(this))
                }
            }.call(this, this.containers[i])), this.containers[i].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                if (!e) {
                    for (this._trigger("beforeStop", t, this._uiHash()), i = 0; n.length > i; i++)n[i].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return this.fromOutside = !1, !1
            }
            if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e) {
                for (i = 0; n.length > i; i++)n[i].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1, !0
        },
        _trigger: function () {
            t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function (e) {
            var i = e || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || t([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: e ? e.element : null
            }
        }
    })
}(jQuery), $(document).ready(function () {
    init_window_vars(), window.source_type = 0, window.r_mode = -1, window.t_mode = -1, window.s_mode = -1, window.group_id = "", window.site_id = "", window.code = "", window.opts = {
        lines: 13,
        length: 7,
        width: 3,
        radius: 10,
        corners: 1,
        rotate: 0,
        color: "#000",
        speed: 1,
        trail: 60,
        shadow: !1,
        hwaccel: !1,
        zIndex: 2e9,
        top: "auto",
        left: "auto"
    }, show_spinner(), window.target = document.getElementById("topic-right"), load_index(), $("li.hot").click(function () {
        $(this).next().toggle()
    }), $(".site-part .folder").click(function () {
        $(this).next().toggle()
    }), init_source_infos(), click_search(3)
});