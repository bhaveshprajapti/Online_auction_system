/*==================================== 
All JS Plugin :


1. jQuery Nice Select
2. imageupload
3. LineControl
4. DataTables

======================================*/


/*  jQuery Nice Select - v1.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by Hernán Sartorio  */
! function(e) {
    e.fn.niceSelect = function(t) {
        function s(t) {
            t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>'));
            var s = t.next(),
                n = t.find("option"),
                i = t.find("option:selected");
            s.find(".current").html(i.data("display") || i.text()), n.each(function(t) {
                var n = e(this),
                    i = n.data("display");
                s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text()))
            })
        }
        if ("string" == typeof t) return "update" == t ? this.each(function() {
            var t = e(this),
                n = e(this).next(".nice-select"),
                i = n.hasClass("open");
            n.length && (n.remove(), s(t), i && t.next().trigger("click"))
        }) : "destroy" == t ? (this.each(function() {
            var t = e(this),
                s = e(this).next(".nice-select");
            s.length && (s.remove(), t.css("display", ""))
        }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this;
        this.hide(), this.each(function() {
            var t = e(this);
            t.next().hasClass("nice-select") || s(t)
        }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function(t) {
            var s = e(this);
            e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus()
        }), e(document).on("click.nice_select", function(t) {
            0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option")
        }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function(t) {
            var s = e(this),
                n = s.closest(".nice-select");
            n.find(".selected").removeClass("selected"), s.addClass("selected");
            var i = s.data("display") || s.text();
            n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change")
        }), e(document).on("keydown.nice_select", ".nice-select", function(t) {
            var s = e(this),
                n = e(s.find(".focus") || s.find(".list .option.selected"));
            if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1;
            if (40 == t.keyCode) {
                if (s.hasClass("open")) {
                    var i = n.nextAll(".option:not(.disabled)").first();
                    i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (38 == t.keyCode) {
                if (s.hasClass("open")) {
                    var l = n.prevAll(".option:not(.disabled)").first();
                    l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
            else if (9 == t.keyCode && s.hasClass("open")) return !1
        });
        var n = document.createElement("a").style;
        return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this
    }
}(jQuery);


// imageupload
! function(e) {
    e.extend({
        uploadPreview: function(l) {
            var i = e.extend({
                input_field: ".image-input",
                preview_box: ".image-preview",
                label_field: ".image-label",
                label_default: "Choose File",
                label_selected: "Change File",
                no_label: !1,
                success_callback: null
            }, l);
            return window.File && window.FileList && window.FileReader ? void(void 0 !== e(i.input_field) && null !== e(i.input_field) && e(i.input_field).change(function() {
                var l = this.files;
                if (l.length > 0) {
                    var a = l[0],
                        o = new FileReader;
                    o.addEventListener("load", function(l) {
                        var o = l.target;
                        a.type.match("image") ? (e(i.preview_box).css("background-image", "url(" + o.result + ")"), e(i.preview_box).css("background-size", "cover"), e(i.preview_box).css("background-position", "center center")) : a.type.match("audio") ? e(i.preview_box).html("<audio controls><source src='" + o.result + "' type='" + a.type + "' />Your browser does not support the audio element.</audio>") : alert("This file type is not supported yet.")
                    }), 0 == i.no_label && e(i.label_field).html(i.label_selected), o.readAsDataURL(a), i.success_callback && i.success_callback()
                } else 0 == i.no_label && e(i.label_field).html(i.label_default), e(i.preview_box).css("background-image", "none"), e(i.preview_box + " audio").remove()
            })) : (alert("You need a browser with file reader support, to use this form properly."), !1)
        }
    })
}(jQuery);



/*!
 * http://suyati.github.io/line-control
 * LineControl 1.1.0
 * Copyright (C) 2014, Suyati Technologies
 *
 */

! function(e) {
    var t, a = {
        saveSelection: function() {
            e(this).data("editor").focus(), window.getSelection ? (sel = window.getSelection(), sel.getRangeAt && sel.rangeCount && e(this).data("currentRange", sel.getRangeAt(0))) : document.selection && document.selection.createRange ? e(this).data("currentRange", document.selection.createRange()) : e(this).data("currentRange", null)
        },
        restoreSelection: function(t, a) {
            var n = e(this).data("currentRange");
            if (n)
                if (window.getSelection) {
                    if (t)
                        if (n.deleteContents(), "html" == a) {
                            var i = document.createElement("div");
                            i.innerHTML = t;
                            for (var l, o = document.createDocumentFragment(); l = i.firstChild;) o.appendChild(l);
                            n.insertNode(o)
                        } else n.insertNode(document.createTextNode(t));
                    sel = window.getSelection(), sel.removeAllRanges(), sel.addRange(n)
                } else document.selection && n.select && (n.select(), t && ("html" == a ? n.pasteHTML(t) : n.text = t))
        },
        restoreIESelection: function() {
            var t = e(this).data("currentRange");
            t && (window.getSelection ? (sel = window.getSelection(), sel.removeAllRanges(), sel.addRange(t)) : document.selection && t.select && t.select())
        },
        insertTextAtSelection: function(e, t) {
            var a, n;
            if (window.getSelection) {
                if ((a = window.getSelection()).getRangeAt && a.rangeCount) {
                    (n = a.getRangeAt(0)).deleteContents();
                    var i = document.createTextNode(e);
                    if ("html" == t) {
                        var l = document.createElement("div");
                        l.innerHTML = e;
                        for (var o, r = document.createDocumentFragment(); o = l.firstChild;) r.appendChild(o);
                        n.insertNode(r)
                    } else n.insertNode(i), n.selectNode(i);
                    a.removeAllRanges(), (n = n.cloneRange()).collapse(!1), a.addRange(n)
                }
            } else document.selection && document.selection.createRange && ((n = document.selection.createRange()).pasteHTML(e), n.select())
        },
        imageWidget: function() {
            var t = this.attr("id"),
                n = e("<div/>", {
                    class: "row"
                }).append(e("<div/>", {
                    id: "imgErrMsg_" + t
                })),
                i = e("<div/>", {
                    class: "tabbable tabs-left"
                }),
                l = e("<ul/>", {
                    class: "nav nav-tabs"
                }).append(e("<li/>", {
                    class: "active"
                }).append(e("<a/>", {
                    href: "#uploadImageBar_" + t,
                    "data-toggle": "tab"
                }).html("From Computer"))).append(e("<li/>").append(e("<a/>", {
                    href: "#imageFromLinkBar_" + t,
                    "data-toggle": "tab"
                }).html("From URL"))),
                o = e("<div/>", {
                    class: "tab-content"
                }),
                r = e("<div/>", {
                    id: "uploadImageBar_" + t,
                    class: "tab-pane active"
                });
            handleFileSelect = function(n) {
                for (var i, l = n.target.files, o = 0; i = l[o]; o++)
                    if (i.type.match("image.*") && i.name.match(/(?:gif|jpg|png|jpeg)$/)) {
                        var r = new FileReader;
                        r.onload = function(a) {
                            return function(n) {
                                var i = e("<li/>", {
                                        class: "col-xs-12 col-sm-6 col-md-3 col-lg-3"
                                    }),
                                    l = e("<a/>", {
                                        href: "javascript:void(0)",
                                        class: "thumbnail"
                                    });
                                e("<img/>", {
                                    src: n.target.result,
                                    title: escape(a.name)
                                }).appendTo(l).click(function() {
                                    e("#imageList_" + t).data("current", e(this).attr("src"))
                                });
                                i.append(l).appendTo(e("#imageList_" + t))
                            }
                        }(i), r.readAsDataURL(i)
                    } else a.showMessage.apply(this, ["imgErrMsg_" + t, "Invalid file type"])
            };
            var s = e("<input/>", {
                type: "file",
                class: "inline-form-control",
                multiple: "multiple"
            });
            s.on("change", handleFileSelect), r.append(s);
            var d = e("<div/>", {
                    id: "imageFromLinkBar_" + t,
                    class: "tab-pane"
                }),
                c = e("<div/>", {
                    class: "input-group"
                });
            e("<input/>", {
                type: "url",
                class: "form-control",
                id: "imageURL_" + t,
                placeholder: "Enter URL"
            }).appendTo(c), e("<button/>", {
                class: "btn btn-success",
                type: "button"
            }).html("Go!").click(function() {
                var n = e("#imageURL_" + t).val();
                if ("" == n) return a.showMessage.apply(this, ["imgErrMsg_" + t, "Please enter image url"]), !1;
                var i = e("<li/>", {
                        class: "span6 col-xs-12 col-sm-6 col-md-3 col-lg-3"
                    }),
                    l = e("<a/>", {
                        href: "javascript:void(0)",
                        class: "thumbnail"
                    });
                e("<img/>", {
                    src: n
                }).error(function() {
                    return a.showMessage.apply(this, ["imgErrMsg_" + t, "Invalid image url"]), !1
                }).load(function() {
                    e(this).appendTo(l).click(function() {
                        e("#imageList_" + t).data("current", e(this).attr("src"))
                    }), i.append(l).appendTo(e("#imageList_" + t))
                })
            }).appendTo(e("<span/>", {
                class: "input-group-btn form-control-button-right"
            }).appendTo(c));
            d.append(c), o.append(r).append(d), i.append(l).append(o);
            var p = e("<div/>", {
                class: "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            });
            e("<ul/>", {
                class: "thumbnails padding-top list-unstyled",
                id: "imageList_" + t
            }).appendTo(p);
            return n.append(i).append(p), n
        },
        tableWidget: function(a) {
            var n = "_" + e(this).attr("id");
            return void 0 !== a && (n = "_" + t.attr("id") + "_Edt"), e("<div/>", {
                class: "row-fluid"
            }).append(e("<div/>", {
                id: "tblErrMsg" + n
            })).append(e("<form/>", {
                id: "tblForm" + n
            }).append(e("<div/>", {
                class: "row"
            }).append(e("<div/>", {
                id: "tblInputsLeft" + n,
                class: "col-xs-12 col-sm-6 col-md-6 col-lg-6"
            }).append(e("<label/>", {
                for: "tblRows" + n,
                text: "Rows"
            })).append(e("<input/>", {
                id: "tblRows" + n,
                type: "text",
                class: "form-control form-control-width",
                value: 2
            })).append(e("<label/>", {
                for: "tblColumns" + n,
                text: "Columns"
            })).append(e("<input/>", {
                id: "tblColumns" + n,
                type: "text",
                class: "form-control form-control-width",
                value: 2
            })).append(e("<label/>", {
                for: "tblWidth" + n,
                text: "Width"
            })).append(e("<input/>", {
                id: "tblWidth" + n,
                type: "text",
                class: "form-control form-control-width",
                value: 400
            })).append(e("<label/>", {
                for: "tblHeight" + n,
                text: "Height"
            })).append(e("<input/>", {
                id: "tblHeight" + n,
                type: "text",
                class: "form-control form-control-width"
            }))).append(e("<div/>", {
                id: "tblInputsRight" + n,
                class: "col-xs-12 col-sm-6 col-md-6 col-lg-6"
            }).append(e("<label/>", {
                for: "tblAlign" + n,
                text: "Alignment"
            })).append(e("<select   />", {
                id: "tblAlign" + n,
                class: "form-control form-control-width"
            }).append(e("<option/>", {
                text: "Choose",
                value: ""
            })).append(e("<option/>", {
                text: "Left",
                value: "left"
            })).append(e("<option/>", {
                text: "Center",
                value: "center"
            })).append(e("<option/>", {
                text: "Right",
                value: "right"
            }))).append(e("<label/>", {
                for: "tblBorder" + n,
                text: "Border size"
            })).append(e("<input/>", {
                id: "tblBorder" + n,
                type: "text",
                class: "form-control form-control-width",
                value: 1
            })).append(e("<label/>", {
                for: "tblCellspacing" + n,
                text: "Cell spacing"
            })).append(e("<input/>", {
                id: "tblCellspacing" + n,
                type: "text",
                class: "form-control form-control-width",
                value: 1
            })).append(e("<label/>", {
                for: "tblCellpadding" + n,
                text: "Cell padding"
            })).append(e("<input/>", {
                id: "tblCellpadding" + n,
                type: "text",
                class: "form-control form-control-width",
                value: 1
            })))))
        },
        imageAttributeWidget: function() {
            return e("<div/>", {
                class: "row-fluid"
            }).append(e("<div/>", {
                id: "imageErrMsg"
            })).append(e("<input/>", {
                id: "imgAlt",
                type: "text",
                class: "form-control form-control-link ",
                placeholder: "Alt Text"
            })).append(e("<input/>", {
                id: "imgTarget",
                class: "form-control form-control-link ",
                type: "text",
                placeholder: "Link Target"
            })).append(e("<input/>", {
                id: "imgHidden",
                type: "hidden"
            }))
        },
        getHTMLTable: function(t, a, n) {
            for (var i = e("<table/>", {
                    class: "table"
                }), l = 0; l < n.length; l++) "" != n[l].value && ("width" == n[l].attribute || "height" == n[l].attribute ? i.css(n[l].attribute, n[l].value) : i.attr(n[l].attribute, n[l].value));
            for (l = 1; l <= t; l++) {
                for (var o = e("<tr/>"), r = 1; r <= a; r++) {
                    e("<td/>").html("&nbsp;").appendTo(o)
                }
                o.appendTo(i)
            }
            return i
        },
        init: function(n) {
            void 0 !== e(this).attr("id") && "" !== e(this).attr("id") || e(this).attr("id", Date.now());
            var i = [{
                    name: "Black",
                    hex: "#000000"
                }, {
                    name: "MediumBlack",
                    hex: "#444444"
                }, {
                    name: "LightBlack",
                    hex: "#666666"
                }, {
                    name: "DimBlack",
                    hex: "#999999"
                }, {
                    name: "Gray",
                    hex: "#CCCCCC"
                }, {
                    name: "DimGray",
                    hex: "#EEEEEE"
                }, {
                    name: "LightGray",
                    hex: "#F3F3F3"
                }, {
                    name: "White",
                    hex: "#FFFFFF"
                }, {
                    name: "libreak",
                    hex: null
                }, {
                    name: "Red",
                    hex: "#FF0000"
                }, {
                    name: "Orange",
                    hex: "#FF9900"
                }, {
                    name: "Yellow",
                    hex: "#FFFF00"
                }, {
                    name: "Lime",
                    hex: "#00FF00"
                }, {
                    name: "Cyan",
                    hex: "#00FFFF"
                }, {
                    name: "Blue",
                    hex: "#0000FF"
                }, {
                    name: "BlueViolet",
                    hex: "#8A2BE2"
                }, {
                    name: "Magenta",
                    hex: "#FF00FF"
                }, {
                    name: "libreak",
                    hex: null
                }, {
                    name: "LightPink",
                    hex: "#FFB6C1"
                }, {
                    name: "Bisque",
                    hex: "#FCE5CD"
                }, {
                    name: "BlanchedAlmond",
                    hex: "#FFF2CC"
                }, {
                    name: "LightLime",
                    hex: "#D9EAD3"
                }, {
                    name: "LightCyan",
                    hex: "#D0E0E3"
                }, {
                    name: "AliceBlue",
                    hex: "#CFE2F3"
                }, {
                    name: "Lavender",
                    hex: "#D9D2E9"
                }, {
                    name: "Thistle",
                    hex: "#EAD1DC"
                }, {
                    name: "LightCoral",
                    hex: "#EA9999"
                }, {
                    name: "Wheat",
                    hex: "#F9CB9C"
                }, {
                    name: "NavajoWhite",
                    hex: "#FFE599"
                }, {
                    name: "DarkSeaGreen",
                    hex: "#B6D7A8"
                }, {
                    name: "LightBlue",
                    hex: "#A2C4C9"
                }, {
                    name: "SkyBlue",
                    hex: "#9FC5E8"
                }, {
                    name: "LightPurple",
                    hex: "#B4A7D6"
                }, {
                    name: "PaleVioletRed",
                    hex: "#D5A6BD"
                }, {
                    name: "IndianRed",
                    hex: "#E06666"
                }, {
                    name: "LightSandyBrown",
                    hex: "#F6B26B"
                }, {
                    name: "Khaki",
                    hex: "#FFD966"
                }, {
                    name: "YellowGreen",
                    hex: "#93C47D"
                }, {
                    name: "CadetBlue",
                    hex: "#76A5AF"
                }, {
                    name: "DeepSkyBlue",
                    hex: "#6FA8DC"
                }, {
                    name: "MediumPurple",
                    hex: "#8E7CC3"
                }, {
                    name: "MediumVioletRed",
                    hex: "#C27BA0"
                }, {
                    name: "Crimson",
                    hex: "#CC0000"
                }, {
                    name: "SandyBrown",
                    hex: "#E69138"
                }, {
                    name: "Gold",
                    hex: "#F1C232"
                }, {
                    name: "MediumSeaGreen",
                    hex: "#6AA84F"
                }, {
                    name: "Teal",
                    hex: "#45818E"
                }, {
                    name: "SteelBlue",
                    hex: "#3D85C6"
                }, {
                    name: "SlateBlue",
                    hex: "#674EA7"
                }, {
                    name: "VioletRed",
                    hex: "#A64D79"
                }, {
                    name: "Brown",
                    hex: "#990000"
                }, {
                    name: "Chocolate",
                    hex: "#B45F06"
                }, {
                    name: "GoldenRod",
                    hex: "#BF9000"
                }, {
                    name: "Green",
                    hex: "#38761D"
                }, {
                    name: "SlateGray",
                    hex: "#134F5C"
                }, {
                    name: "RoyalBlue",
                    hex: "#0B5394"
                }, {
                    name: "Indigo",
                    hex: "#351C75"
                }, {
                    name: "Maroon",
                    hex: "#741B47"
                }, {
                    name: "DarkRed",
                    hex: "#660000"
                }, {
                    name: "SaddleBrown",
                    hex: "#783F04"
                }, {
                    name: "DarkGoldenRod",
                    hex: "#7F6000"
                }, {
                    name: "DarkGreen",
                    hex: "#274E13"
                }, {
                    name: "DarkSlateGray",
                    hex: "#0C343D"
                }, {
                    name: "Navy",
                    hex: "#073763"
                }, {
                    name: "MidnightBlue",
                    hex: "#20124D"
                }, {
                    name: "DarkMaroon",
                    hex: "#4C1130"
                }],
                l = [{
                    name: "Exclamation ",
                    text: "!"
                }, {
                    name: "At",
                    text: "@"
                }, {
                    name: "Hash",
                    text: "#"
                }, {
                    name: "Percentage",
                    text: "%"
                }, {
                    name: "Uppercase",
                    text: "^"
                }, {
                    name: "Ampersand",
                    text: "&"
                }, {
                    name: "Asterisk",
                    text: "*"
                }, {
                    name: "OpenBracket",
                    text: "("
                }, {
                    name: "CloseBracket",
                    text: ")"
                }, {
                    name: "Underscore",
                    text: "_"
                }, {
                    name: "Hiphen",
                    text: "-"
                }, {
                    name: "Plus",
                    text: "+"
                }, {
                    name: "Equalto",
                    text: "="
                }, {
                    name: "OpenSquareBracket",
                    text: "["
                }, {
                    name: "CloseSquareBracket",
                    text: "]"
                }, {
                    name: "OpenCurly",
                    text: "{"
                }, {
                    name: "CloseCurly",
                    text: "}"
                }, {
                    name: "Pipe",
                    text: "|"
                }, {
                    name: "Colon",
                    text: ":"
                }, {
                    name: "Semicolon",
                    text: ";"
                }, {
                    name: "Single quote",
                    text: "&#39;"
                }, {
                    name: "Double quote",
                    text: "&#34;"
                }, {
                    name: "Left single curly quote",
                    text: "&lsquo;"
                }, {
                    name: "right single curly quote",
                    text: "&rsquo;"
                }, {
                    name: "Forward-slash",
                    text: "&#47;"
                }, {
                    name: "Back-slash",
                    text: "&#92;"
                }, {
                    name: "LessThan",
                    text: "<"
                }, {
                    name: "GreaterThan",
                    text: ">"
                }, {
                    name: "QuestionMark",
                    text: "?"
                }, {
                    name: "Tilda",
                    text: "~"
                }, {
                    name: "Grave accent",
                    text: "`"
                }, {
                    name: "Micron",
                    text: "&micro;"
                }, {
                    name: "Paragraph sign",
                    text: "&para;"
                }, {
                    name: "Plus/minus",
                    text: "&plusmn;"
                }, {
                    name: "Trademark",
                    text: "&trade;"
                }, {
                    name: "Copyright",
                    text: "&copy;"
                }, {
                    name: "Registered",
                    text: "&reg;"
                }, {
                    name: "Section",
                    text: "&sect;"
                }, {
                    name: "right double angle quotes",
                    text: "&#187;"
                }, {
                    name: "fraction one quarter",
                    text: "&#188;"
                }, {
                    name: "fraction one half",
                    text: "&#189;"
                }, {
                    name: "fraction three quarters",
                    text: "&#190;"
                }, {
                    name: "Dollar",
                    text: "$"
                }, {
                    name: "Euro",
                    text: "&euro;"
                }, {
                    name: "Pound",
                    text: "&pound;"
                }, {
                    name: "Yen",
                    text: "&yen;"
                }, {
                    name: "Cent",
                    text: "&#162;"
                }, {
                    name: "IndianRupee",
                    text: "&#8377;"
                }],
                o = {
                    fonteffects: !0,
                    texteffects: !0,
                    aligneffects: !0,
                    textformats: !0,
                    actions: !0,
                    insertoptions: !0,
                    extraeffects: !0,
                    advancedoptions: !0,
                    screeneffects: !0,
                    fonts: {
                        select: !0,
                        default: "Font",
                        tooltip: "Fonts",
                        commandname: "fontName",
                        custom: null
                    },
                    styles: {
                        select: !0,
                        default: "Formatting",
                        tooltip: "Paragraph Format",
                        commandname: "formatBlock",
                        custom: null
                    },
                    font_size: {
                        select: !0,
                        default: "Font size",
                        tooltip: "Font Size",
                        commandname: "fontSize",
                        custom: null
                    },
                    color: {
                        text: "A",
                        icon: "fa fa-font",
                        tooltip: "Text/Background Color",
                        commandname: null,
                        custom: function(t) {
                            var n = e(this),
                                l = 0,
                                o = e("<div/>", {
                                    id: "paletteCntr",
                                    class: "activeColour",
                                    css: {
                                        display: "none",
                                        width: "335px"
                                    }
                                }).click(function(e) {
                                    e.stopPropagation()
                                }),
                                r = e("<div/>", {
                                    id: "colorpellete"
                                }),
                                s = e("<ul />", {
                                    id: "color_ui"
                                }).append(e("<li />").css({
                                    width: "145px",
                                    display: "Block",
                                    height: "25px"
                                }).html("<div>Text Color</div>")),
                                d = e("<div/>", {
                                    id: "bg_colorpellete"
                                }),
                                c = e("<ul />", {
                                    id: "bgcolor_ui"
                                }).append(e("<li />").css({
                                    width: "145px",
                                    display: "Block",
                                    height: "25px"
                                }).html("<div>Background Color</div>"));
                            if (n.data("colorBtn") ? (l = 1, n.data("colorBtn", null)) : n.data("colorBtn", 1), 0 == l) {
                                for (var p = 0; p < i.length; p++) null != i[p].hex ? (s.append(e("<li />").css("background-color", i[p].hex).mousedown(function(e) {
                                    e.preventDefault()
                                }).click(function() {
                                    var t = a.rgbToHex.apply(this, [e(this).css("background-color")]);
                                    a.restoreSelection.apply(this), a.setStyleWithCSS.apply(this), document.execCommand("forecolor", !1, t), e("#paletteCntr").remove(), n.data("colorBtn", null)
                                })), c.append(e("<li />").css("background-color", i[p].hex).mousedown(function(e) {
                                    e.preventDefault()
                                }).click(function() {
                                    var t = a.rgbToHex.apply(this, [e(this).css("background-color")]);
                                    a.restoreSelection.apply(this), a.setStyleWithCSS.apply(this), document.execCommand("backColor", !1, t), e("#paletteCntr").remove(), n.data("colorBtn", null)
                                }))) : (s.append(e("<li />").css({
                                    width: "145px",
                                    display: "Block",
                                    height: "5px"
                                })), c.append(e("<li />").css({
                                    width: "145px",
                                    display: "Block",
                                    height: "5px"
                                })));
                                s.appendTo(r), c.appendTo(d), r.appendTo(o), d.appendTo(o), o.insertAfter(t), e("#paletteCntr").slideDown("slow")
                            } else e("#paletteCntr").remove()
                        }
                    },
                    bold: {
                        text: "B",
                        icon: "fa fa-bold",
                        tooltip: "Bold",
                        commandname: "bold",
                        custom: null
                    },
                    italics: {
                        text: "I",
                        icon: "fa fa-italic",
                        tooltip: "Italics",
                        commandname: "italic",
                        custom: null
                    },
                    underline: {
                        text: "U",
                        icon: "fa fa-underline",
                        tooltip: "Underline",
                        commandname: "underline",
                        custom: null
                    },
                    strikeout: {
                        text: "Strikeout",
                        icon: "fa fa-strikethrough",
                        tooltip: "Strike Through",
                        commandname: "strikeThrough",
                        custom: null
                    },
                    ol: {
                        text: "N",
                        icon: "fa fa-list-ol",
                        tooltip: "Insert/Remove Numbered List",
                        commandname: "insertorderedlist",
                        custom: null
                    },
                    ul: {
                        text: "Bullet",
                        icon: "fa fa-list-ul",
                        tooltip: "Insert/Remove Bulleted List",
                        commandname: "insertunorderedlist",
                        custom: null
                    },
                    undo: {
                        text: "undo",
                        icon: "fa fa-undo",
                        tooltip: "Undo",
                        commandname: "undo",
                        custom: null
                    },
                    redo: {
                        text: "redo",
                        icon: "fa fa-repeat",
                        tooltip: "Redo",
                        commandname: "redo",
                        custom: null
                    },
                    l_align: {
                        text: "leftalign",
                        icon: "fa fa-align-left",
                        tooltip: "Align Left",
                        commandname: "justifyleft",
                        custom: null
                    },
                    r_align: {
                        text: "rightalign",
                        icon: "fa fa-align-right",
                        tooltip: "Align Right",
                        commandname: "justifyright",
                        custom: null
                    },
                    c_align: {
                        text: "centeralign",
                        icon: "fa fa-align-center",
                        tooltip: "Align Center",
                        commandname: "justifycenter",
                        custom: null
                    },
                    justify: {
                        text: "justify",
                        icon: "fa fa-align-justify",
                        tooltip: "Justify",
                        commandname: "justifyfull",
                        custom: null
                    },
                    unlink: {
                        text: "Unlink",
                        icon: "fa fa-unlink",
                        tooltip: "Unlink",
                        commandname: "unlink",
                        custom: null
                    },
                    insert_link: {
                        modal: !0,
                        modalId: "InsertLink_" + e(this).attr("id"),
                        icon: "fa fa-link",
                        tooltip: "Insert Link",
                        modalHeader: "Insert Hyperlink",
                        modalBody: e("<div/>", {
                            class: "form-group"
                        }).append(e("<div/>", {
                            id: "errMsg_" + e(this).attr("id")
                        })).append(e("<input/>", {
                            type: "text",
                            id: "inputText_" + e(this).attr("id"),
                            class: "form-control form-control-link ",
                            placeholder: "Text to Display"
                        })).append(e("<input/>", {
                            type: "text",
                            id: "inputUrl_" + e(this).attr("id"),
                            required: !0,
                            class: "form-control form-control-link",
                            placeholder: "Enter URL"
                        })),
                        beforeLoad: function() {
                            t = this;
                            var a = "_" + this.attr("id");
                            e("#inputText" + a), e("#inputUrl" + a), e(".alert").alert("close"), "" != e(t).data("currentRange") && e("#inputText_" + a).val(e(t).data("currentRange"))
                        },
                        onSave: function() {
                            var n = "_" + t.attr("id"),
                                i = e("#inputText" + n).val(),
                                l = e("#inputUrl" + n).val(),
                                o = e(t).data("currentRange");
                            if ("" == l) return a.showMessage.apply(t, ["errMsg", "Please enter url"]), !1;
                            if (!l.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/)) return a.showMessage.apply(t, ["errMsg", "Enter valid url"]), !1;
                            if ("" == o && "" == i && (i = l), navigator.userAgent.match(/MSIE/i) || navigator.userAgent.match(/Windows NT.*Trident\//)) {
                                var r = '<a href="' + l + '" target="_blank">' + i + "</a>";
                                a.restoreSelection.apply(t, [r, "html"])
                            } else a.restoreSelection.apply(t, [i]), document.execCommand("createLink", !1, l);
                            return e(t).data("editor").find('a[href="' + l + '"]').each(function() {
                                e(this).attr("target", "_blank")
                            }), e(".alert").alert("close"), e("#InsertLink" + n).modal("hide"), e(t).data("editor").focus(), !1
                        }
                    },
                    insert_img: {
                        modal: !0,
                        modalId: "InsertImage_" + e(this).attr("id"),
                        icon: "fa fa-picture-o",
                        tooltip: "Insert Image",
                        modalHeader: "Insert Image",
                        modalBody: a.imageWidget.apply(this),
                        beforeLoad: function() {
                            var a = (t = this).attr("id");
                            e("#imageURL_" + a).val(""), e("#uploadImageBar_" + a + " :input").val(""), e("#imageList_" + a).data("current", "")
                        },
                        onSave: function() {
                            var n = "_" + t.attr("id");
                            if (a.restoreSelection.apply(this), !e("#imageList" + n).data("current")) return a.showMessage.apply(this, ["imgErrMsg" + n, "Please select an image"]), !1;
                            if (navigator.userAgent.match(/MSIE/i) || navigator.userAgent.match(/Windows NT.*Trident\//)) {
                                var i = '<img src="' + e("#imageList" + n).data("current") + '"/>';
                                a.restoreSelection.apply(this, [i, "html"])
                            } else document.execCommand("insertimage", !1, e("#imageList" + n).data("current"));
                            e("#InsertImage" + n).modal("hide"), e(this).data("editor").focus()
                        }
                    },
                    insert_table: {
                        modal: !0,
                        modalId: "InsertTable_" + e(this).attr("id"),
                        icon: "fa fa-table",
                        tooltip: "Insert Table",
                        modalHeader: "Insert Table",
                        modalBody: a.tableWidget.apply(this),
                        beforeLoad: function() {
                            e("#tblForm_" + (t = this).attr("id")).each(function() {
                                this.reset()
                            })
                        },
                        onSave: function() {
                            _idSuffix = "_" + t.attr("id"), a.restoreSelection.apply(this);
                            var n = e("#tblRows" + _idSuffix).val(),
                                i = e("#tblColumns" + _idSuffix).val(),
                                l = e("#tblWidth" + _idSuffix).val(),
                                o = e("#tblHeight" + _idSuffix).val(),
                                r = e("#tblAlign" + _idSuffix).val(),
                                s = e("#tblBorder" + _idSuffix).val(),
                                d = e("#tblCellspacing" + _idSuffix).val(),
                                c = e("#tblCellpadding" + _idSuffix).val(),
                                p = /^[0-9]+$/,
                                m = /^auto$|^[+-]?[0-9]+\.?([0-9]+)?(px|em|ex|%|in|cm|mm|pt|pc)?$/gi,
                                u = /^[0-9]+\.?([0-9])?$/;
                            if (!n.match(p)) return a.showMessage.apply(this, ["tblErrMsg", "Rows must be a positive number"]), !1;
                            if (!i.match(p)) return a.showMessage.apply(this, ["tblErrMsg", "Columns must be a positive number"]), !1;
                            if ("" != l && !l.match(m)) return a.showMessage.apply(this, ["tblErrMsg", "Please enter positive number with or without a valid CSS measurement unit (px,em,ex,%,in,cm,mm,pt,pc)"]), !1;
                            if ("" != o && !o.match(m)) return a.showMessage.apply(this, ["tblErrMsg", "Please enter positive number with or without a valid CSS measurement unit (px,em,ex,%,in,cm,mm,pt,pc)"]), !1;
                            if ("" != s && !s.match(u)) return a.showMessage.apply(this, ["tblErrMsg", "Border size must be a positive number"]), !1;
                            if ("" != d && !d.match(u)) return a.showMessage.apply(this, ["tblErrMsg", "Cell spacing must be a positive number"]), !1;
                            if ("" != c && !c.match(u)) return a.showMessage.apply(this, ["tblErrMsg", "Cell padding must be a positive number"]), !1;
                            var h = e("<div/>"),
                                g = [{
                                    attribute: "align",
                                    value: r
                                }, {
                                    attribute: "border",
                                    value: s
                                }, {
                                    attribute: "cellspacing",
                                    value: d
                                }, {
                                    attribute: "cellpadding",
                                    value: c
                                }, {
                                    attribute: "width",
                                    value: l
                                }, {
                                    attribute: "height",
                                    value: o
                                }];
                            a.getHTMLTable.apply(this, [n, i, g]).appendTo(h), navigator.userAgent.match(/MSIE/i) || navigator.userAgent.match(/Windows NT.*Trident\//) ? a.restoreSelection.apply(this, [h.html(), "html"]) : document.execCommand("insertHTML", !1, h.html()), e("#InsertTable" + _idSuffix).modal("hide"), e(this).data("editor").focus()
                        }
                    },
                    hr_line: {
                        text: "HR",
                        icon: "fa fa-minus",
                        tooltip: "Horizontal Rule",
                        commandname: "insertHorizontalRule",
                        custom: null
                    },
                    block_quote: {
                        text: "Block Quote",
                        icon: "fa fa-quote-right",
                        tooltip: "Block Quote",
                        commandname: null,
                        custom: function() {
                            a.setStyleWithCSS.apply(this), navigator.userAgent.match(/MSIE/i) || navigator.userAgent.match(/Windows NT.*Trident\//) ? document.execCommand("indent", !1, null) : document.execCommand("formatBlock", !1, "<blockquote>")
                        }
                    },
                    indent: {
                        text: "Indent",
                        icon: "fa fa-indent",
                        tooltip: "Increase Indent",
                        commandname: "indent",
                        custom: null
                    },
                    outdent: {
                        text: "Outdent",
                        icon: "fa fa-outdent",
                        tooltip: "Decrease Indent",
                        commandname: "outdent",
                        custom: null
                    },
                    print: {
                        text: "Print",
                        icon: "fa fa-print",
                        tooltip: "Print",
                        commandname: null,
                        custom: function() {
                            oDoc = e(this).data("editor");
                            var t = window.open("", "_blank", "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
                            t.document.open(), t.document.write('<!doctype html><html><head><title>Print</title></head><body onload="print();">' + oDoc.html() + "</body></html>"), t.document.close()
                        }
                    },
                    rm_format: {
                        text: "Remove format",
                        icon: "fa fa-eraser",
                        tooltip: "Remove Formatting",
                        commandname: "removeformat",
                        custom: null
                    },
                    select_all: {
                        text: "Select all",
                        icon: "fa fa-file-text",
                        tooltip: "Select All",
                        commandname: null,
                        custom: function() {
                            document.execCommand("selectall", null, null)
                        }
                    },
                    togglescreen: {
                        text: "Toggle Screen",
                        icon: "fa fa-arrows-alt",
                        tooltip: "Toggle Screen",
                        commandname: null,
                        custom: function(t, a) {
                            e(this).data("editor").parent().toggleClass("fullscreen");
                            var n = 0;
                            e(this).data("statusBar").length && (n = e(this).data("statusBar").height()), e(this).data("editor").parent().hasClass("fullscreen") ? e(this).data("editor").css({
                                height: e(this).data("editor").parent().height() - (e(this).data("menuBar").height() + n) - 13
                            }) : e(this).data("editor").css({
                                height: ""
                            })
                        }
                    },
                    splchars: {
                        text: "S",
                        icon: "fa fa-asterisk",
                        tooltip: "Insert Special Character",
                        commandname: null,
                        custom: function(t) {
                            a.restoreIESelection.apply(this);
                            var n = 0,
                                i = e("<div/>", {
                                    id: "specialchar",
                                    class: "specialCntr",
                                    css: {
                                        display: "none"
                                    }
                                }).click(function(e) {
                                    e.stopPropagation()
                                }),
                                o = e("<ul />", {
                                    id: "special_ui"
                                }),
                                r = this;
                            if (e(this).data("editor").data("splcharsBtn") ? (n = 1, e(this).data("editor").data("splcharsBtn", null)) : e(this).data("editor").data("splcharsBtn", 1), 0 == n) {
                                for (var s = 0; s < l.length; s++) o.append(e("<li />").html(l[s].text).attr("title", l[s].name).mousedown(function(e) {
                                    e.preventDefault()
                                }).click(function(t) {
                                    if (navigator.userAgent.match(/MSIE/i) || navigator.userAgent.match(/Windows NT.*Trident\//)) {
                                        var n = e(this).html();
                                        a.insertTextAtSelection.apply(this, [n, "html"])
                                    } else document.execCommand("insertHTML", !1, e(this).html());
                                    e("#specialchar").remove(), e(r).data("editor").data("splcharsBtn", null)
                                }));
                                o.prependTo(i), i.insertAfter(t), e("#specialchar").slideDown("slow")
                            } else e("#specialchar").remove()
                        }
                    },
                    source: {
                        text: "Source",
                        icon: "fa fa-code",
                        tooltip: "Source",
                        commandname: null,
                        custom: function(e, t) {
                            a.getSource.apply(this, [e, t])
                        }
                    },
                    params: {
                        obj: null
                    }
                },
                r = {
                    texteffects: ["bold", "italics", "underline", "color"],
                    aligneffects: ["l_align", "c_align", "r_align", "justify"],
                    textformats: ["indent", "outdent", "block_quote", "ol", "ul"],
                    fonteffects: ["fonts", "styles", "font_size"],
                    actions: ["undo", "redo"],
                    insertoptions: ["insert_link", "unlink", "insert_img", "insert_table"],
                    extraeffects: ["strikeout", "hr_line", "splchars"],
                    advancedoptions: ["print", "rm_format", "select_all", "source"],
                    screeneffects: ["togglescreen"]
                },
                s = e.extend({
                    texteffects: !0,
                    aligneffects: !0,
                    textformats: !0,
                    fonteffects: !0,
                    actions: !0,
                    insertoptions: !0,
                    extraeffects: !0,
                    advancedoptions: !0,
                    screeneffects: !0,
                    bold: !0,
                    italics: !0,
                    underline: !0,
                    ol: !0,
                    ul: !0,
                    undo: !0,
                    redo: !0,
                    l_align: !0,
                    r_align: !0,
                    c_align: !0,
                    justify: !0,
                    insert_link: !0,
                    unlink: !0,
                    insert_img: !0,
                    hr_line: !0,
                    block_quote: !0,
                    source: !0,
                    strikeout: !0,
                    indent: !0,
                    outdent: !0,
                    fonts: {
                        "Sans serif": "arial,helvetica,sans-serif",
                        Serif: "times new roman,serif",
                        Wide: "arial black,sans-serif",
                        Narrow: "arial narrow,sans-serif",
                        "Comic Sans MS": "comic sans ms,sans-serif",
                        "Courier New": "courier new,monospace",
                        Garamond: "garamond,serif",
                        Georgia: "georgia,serif",
                        Tahoma: "tahoma,sans-serif",
                        "Trebuchet MS": "trebuchet ms,sans-serif",
                        Verdana: "verdana,sans-serif"
                    },
                    styles: {
                        "Heading 1": "<h1>",
                        "Heading 2": "<h2>",
                        "Heading 3": "<h3>",
                        "Heading 4": "<h4>",
                        "Heading 5": "<h5>",
                        "Heading 6": "<h6>",
                        Paragraph: "<p>"
                    },
                    print: !0,
                    rm_format: !0,
                    status_bar: !0,
                    font_size: {
                        Small: "2",
                        Normal: "3",
                        Medium: "4",
                        Large: "5",
                        Huge: "6"
                    },
                    color: i,
                    splchars: l,
                    insert_table: !0,
                    select_all: !0,
                    togglescreen: !0
                }, n),
                d = e("<div/>", {
                    class: "row-fluid Editor-container"
                });
            e(this).hide().after(d);
            var c = e("<div/>", {
                    id: "menuBarDiv_" + e(this).attr("id"),
                    class: "row-fluid line-control-menu-bar"
                }).prependTo(d),
                p = e("<div/>", {
                    class: "Editor-editor",
                    css: {
                        overflow: "auto"
                    },
                    contenteditable: "true"
                }).appendTo(d),
                m = e("<div/>", {
                    id: "statusbar_" + e(this).attr("id"),
                    class: "row-fluid line-control-status-bar",
                    unselectable: "on"
                }).appendTo(d);
            e(this).data("menuBar", c), e(this).data("editor", p), e(this).data("statusBar", m);
            var u = this;
            s.status_bar && p.keyup(function(t) {
                var n = a.getWordCount.apply(u),
                    i = a.getCharCount.apply(u);
                e(u).data("statusBar").html('<div class="label">Words : ' + n + "</div>"), e(u).data("statusBar").append('<div class="label">Characters : ' + i + "</div>")
            });
            for (var h in o)
                if (s[h])
                    if (h in r) {
                        for (var g = e("<div/>", {
                                class: "btn-group"
                            }), f = 0; f < r[h].length; f++) {
                            var v = r[h][f];
                            if (s[v]) {
                                var x = a.createMenuItem.apply(this, [o[v], s[v], !0]);
                                g.append(x)
                            }
                            s[v] = !1
                        }
                        c.append(g)
                    } else {
                        x = a.createMenuItem.apply(this, [o[h], s[h], !0]);
                        c.append(x)
                    }
            else if (s[h] in r)
                for (var b in r[h]) s[b] = !1;
            e(document.body).mousedown(function(t) {
                var a = e(t.target);
                a.parents().andSelf().is("#context-menu") || e("#context-menu").remove(), a.parents().andSelf().is("#specialchar") || '<i class="fa fa-asterisk"></i>' == a.closest("a").html() || e("#specialchar").is(":visible") && (e(u).data("editor").data("splcharsBtn", null), e("#specialchar").remove()), a.parents().andSelf().is("#paletteCntr") || '<i class="fa fa-font"></i>' == a.closest("a").html() || e("#paletteCntr").is(":visible") && (e(u).data("editor").data("colorBtn", null), e("#paletteCntr").remove())
            }), p.bind("contextmenu", function(t) {
                e("#context-menu").length && e("#context-menu").remove();
                var n = e("<div/>", {
                        id: "context-menu"
                    }).css({
                        position: "absolute",
                        top: t.pageY,
                        left: t.pageX,
                        "z-index": 9999
                    }).click(function(e) {
                        e.stopPropagation()
                    }),
                    i = e("<ul/>", {
                        class: "dropdown-menu on",
                        role: "menu"
                    });
                t.preventDefault(), e(t.target).is("a") ? (a.createLinkContext.apply(this, [t, i]), i.appendTo(n), n.appendTo("body")) : e(t.target).is("td") || e(t.target).is("th") ? (a.createTableContext.apply(this, [t, i]), i.appendTo(n), n.appendTo("body")) : e(t.target).is("img") && (a.createImageContext.apply(this, [t, i]), i.appendTo(n), n.appendTo("body"))
            })
        },
        createLinkContext: function(t, a) {
            var n;
            e("<li/>").append(e("<a/>", {
                id: "rem_link",
                href: "javascript:void(0)",
                text: "RemoveLink"
            }).click((n = t, function() {
                e(n.target).contents().unwrap(), e("#context-menu").remove()
            }))).appendTo(a)
        },
        createImageContext: function(n, i) {
            var l = "imgAttribute",
                o = a.imageAttributeWidget.apply(this, ["edit"]);
            a.createModal.apply(this, [l, "Image Attributes", o, function() {
                var n = e("#imgAlt").val(),
                    i = e("#imgTarget").val();
                if ("" == n) return a.showMessage.apply(this, ["imageErrMsg", "Please enter image alternative text"]), !1;
                if ("" != i && !i.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/)) return a.showMessage.apply(this, ["imageErrMsg", "Please enter valid url"]), !1;
                if ("" != e("#imgHidden").val()) {
                    var l = e("#imgHidden").val();
                    e("#" + l).attr("alt", n), "" != i ? e("#wrap_" + l).length ? e("#wrap_" + l).attr("href", i) : e("#" + l).wrap(e("<a/>", {
                        id: "wrap_" + l,
                        href: i,
                        target: "_blank"
                    })) : e("#wrap_" + l).length && e("#" + l).unwrap()
                }
                e("#imgAttribute").modal("hide"), t.data("editor").focus()
            }]);
            var r, s, d = e("<a/>", {
                href: "#" + l,
                text: "Image Attributes",
                "data-toggle": "modal"
            }).click((r = n, function() {
                e("#context-menu").remove();
                var t = (new Date).getTime();
                if (e("#imgAlt").val(e(r.target).closest("img").attr("alt")), e("#imgTarget").val(""), void 0 !== e(r.target).closest("img").attr("id")) {
                    var a = e(r.target).closest("img").attr("id");
                    e("#imgHidden").val(a), e("#wrap_" + a).length ? e("#imgTarget").val(e("#wrap_" + a).attr("href")) : e("#imgTarget").val("")
                } else e(r.target).closest("img").attr("id", "img_" + t), e("#imgHidden").val("img_" + t)
            }));
            i.append(e("<li/>").append(d)).append(e("<li/>").append(e("<a/>", {
                text: "Remove Image"
            }).click((s = n, function() {
                e("#context-menu").remove(), e(s.target).closest("img").remove()
            }))))
        },
        createTableContext: function(n, i) {
            var l = "_" + t.attr("id") + "_Edt",
                o = "editProperties_" + t.attr("id");
            e("#" + o).remove();
            var r = a.tableWidget.apply(this, ["edit"]);
            a.createModal.apply(this, [o, "Table Properties", r, function() {
                var i = e("#tblWidth" + l).val(),
                    r = e("#tblHeight" + l).val(),
                    s = e("#tblBorder" + l).val(),
                    d = e("#tblAlign" + l).val(),
                    c = e("#tblCellspacing" + l).val(),
                    p = e("#tblCellpadding" + l).val(),
                    m = /^auto$|^[+-]?[0-9]+\.?([0-9]+)?(px|em|ex|%|in|cm|mm|pt|pc)?$/gi,
                    u = /^[0-9]+\.?([0-9])?$/;
                return "" != i && !i.match(m) || "" != r && !r.match(m) ? (a.showMessage.apply(this, ["tblErrMsgEdt", "Please enter positive number with or without a valid CSS measurement unit (px,em,ex,%,in,cm,mm,pt,pc)"]), !1) : "" == s || s.match(u) ? "" == c || c.match(u) ? "" == p || p.match(u) ? (e(n.target).closest("table").css("width", i), "" != r && e(n.target).closest("table").css("height", r), e(n.target).closest("table").attr("align", d), e(n.target).closest("table").attr("border", s), e(n.target).closest("table").attr("cellspacing", c), e(n.target).closest("table").attr("cellpadding", p), e("#" + o).modal("hide"), void t.data("editor").focus()) : (a.showMessage.apply(this, ["tblErrMsgEdt", "Cell padding must be a positive number"]), !1) : (a.showMessage.apply(this, ["tblErrMsgEdt", "Cell spacing must be a positive number"]), !1) : (a.showMessage.apply(this, ["tblErrMsgEdt", "Border size must be a positive number"]), !1)
            }]);
            var s, d, c, p, m, u, h = e("<a/>", {
                href: "#" + o,
                text: "Table Properties",
                "data-toggle": "modal"
            }).click((s = n, function() {
                var a = "_" + t.attr("id") + "_Edt";
                e("#context-menu").remove(), e("#tblRows" + a).val(e(s.target).closest("table").prop("rows").length), e("#tblColumns" + a).val(e(s.target).closest("table").find("tr")[0].cells.length), e("#tblRows" + a).attr("disabled", "disabled"), e("#tblColumns" + a).attr("disabled", "disabled"), e("#tblWidth" + a).val(e(s.target).closest("table").get(0).style.width), e("#tblHeight" + a).val(e(s.target).closest("table").get(0).style.height), e("#tblAlign" + a).val(e(s.target).closest("table").attr("align")), e("#tblBorder" + a).val(e(s.target).closest("table").attr("border")), e("#tblCellspacing" + a).val(e(s.target).closest("table").attr("cellspacing")), e("#tblCellpadding" + a).val(e(s.target).closest("table").attr("cellpadding"))
            }));
            i.append(e("<li/>", {
                class: "dropdown-submenu",
                css: {
                    display: "block"
                }
            }).append(e("<a/>", {
                tabindex: "-1",
                href: "javascript:void(0)",
                text: "Row"
            })).append(e("<ul/>", {
                class: "dropdown-menu"
            }).append(e("<li/>").append(e("<a/>", {
                id: "tbl_addrow",
                href: "javascript:void(0)",
                text: "Add Row"
            }).click((m = n, function() {
                e("#context-menu").remove();
                var t = e(m.target).closest("tr"),
                    a = e("<tr/>");
                t.children().each(function() {
                    var t = e("<" + e(this).prop("nodeName") + "/>").html("&nbsp;");
                    a.append(t)
                }), t.after(a)
            })))).append(e("<li/>").append(e("<a/>", {
                text: "Remove Row"
            }).click((p = n, function() {
                e("#context-menu").remove(), e(p.target).closest("tr").remove()
            })))))).append(e("<li/>", {
                class: "dropdown-submenu",
                css: {
                    display: "block"
                }
            }).append(e("<a/>", {
                tabindex: "-1",
                href: "javascript:void(0)",
                text: "Column"
            })).append(e("<ul/>", {
                class: "dropdown-menu"
            }).append(e("<li/>").append(e("<a/>", {
                id: "tbl_addcolumn",
                href: "javascript:void(0)",
                text: "Add Column"
            }).click((c = n, function() {
                e("#context-menu").remove();
                var t = e(c.target),
                    a = t.siblings().addBack().index(t);
                t.closest("table").find("tr").each(function() {
                    var t = e(this).children(":eq(" + a + ")"),
                        n = e("<" + t.prop("nodeName") + "/>").html("&nbsp;");
                    t.after(n)
                })
            })))).append(e("<li/>").append(e("<a/>", {
                text: "Remove Column"
            }).click((d = n, function() {
                e("#context-menu").remove();
                var t = e(d.target),
                    a = t.siblings().addBack().index(t);
                t.closest("table").find("tr").each(function() {
                    e(this).children(":eq(" + a + ")").remove()
                })
            })))))), i.append(e("<li/>").append(h)).append(e("<li/>", {
                class: "divider"
            })).append(e("<li/>").append(e("<a/>", {
                text: "Remove Table"
            }).click((u = n, function() {
                e("#context-menu").remove(), e(u.target).closest("table").remove()
            }))))
        },
        createModal: function(t, a, n, i) {
            var l, o = e("<a/>", {
                href: "#" + t,
                role: "button",
                class: "btn btn-default",
                "data-toggle": "modal"
            });
            return e("<div/>", {
                id: t,
                class: "modal fade",
                tabindex: "-1",
                role: "dialog",
                "aria-labelledby": "h3_" + t,
                "aria-hidden": "true"
            }).append(e("<div>", {
                class: "modal-dialog"
            }).append(e("<div>", {
                class: "modal-content"
            }).append(e("<div>", {
                class: "modal-header"
            }).append(e("<button/>", {
                type: "button",
                class: "close",
                "data-dismiss": "modal",
                "aria-hidden": "true"
            }).html("x")).append(e("<h3/>", {
                id: "h3_" + t
            }).html(a))).append(e("<div>", {
                class: "modal-body"
            }).append(n)).append(e("<div>", {
                class: "modal-footer"
            }).append(e("<button/>", {
                type: "button",
                class: "btn btn-default",
                "data-dismiss": "modal",
                "aria-hidden": "true"
            }).html("Cancel")).append(e("<button/>", {
                type: "button",
                class: "btn btn-success"
            }).html("Done").mousedown(function(e) {
                e.preventDefault()
            }).click((l = this, function() {
                i.apply(l)
            })))))).appendTo("body"), o
        },
        createMenuItem: function(t, n, i) {
            if (t.select) {
                var l = e("<div/>", {
                        class: "btn-group"
                    }),
                    o = e("<ul/>", {
                        class: "dropdown-menu"
                    });
                l.append(e("<a/>", {
                    class: "btn btn-default dropdown-toggle",
                    "data-toggle": "dropdown",
                    href: "javascript:void(0)",
                    title: t.tooltip
                }).html(t.default).append(e("<span/>", {
                    class: "caret"
                })).mousedown(function(e) {
                    e.preventDefault()
                })), e.each(n, function(t, a) {
                    var n = e("<li/>");
                    e("<a/>", {
                        tabindex: "-1",
                        href: "javascript:void(0)"
                    }).html(t).appendTo(n), n.click(function() {
                        e(this).parent().parent().data("value", a), e(this).parent().parent().trigger("change")
                    }), o.append(n)
                });
                var r = "change"
            } else {
                if (t.modal) {
                    l = a.createModal.apply(this, [t.modalId, t.modalHeader, t.modalBody, t.onSave]), o = e("<i/>");
                    return t.icon ? o.addClass(t.icon) : o.html(t.text), l.append(o), l.mousedown((s = this, d = a, c = t.beforeLoad, function(e) {
                        e.preventDefault(), d.saveSelection.apply(s), c && c.apply(s)
                    })), l.attr("title", t.tooltip), l
                }
                l = e("<a/>", {
                    href: "javascript:void(0)",
                    class: "btn btn-default"
                }), o = e("<i/>");
                t.icon ? o.addClass(t.icon) : o.html(t.text);
                r = "click"
            }
            var s, d, c, p, m;
            if (t.custom ? l.bind(r, (p = this, m = t.params, function() {
                    a.saveSelection.apply(p), t.custom.apply(p, [e(this), m])
                })) : (l.data("commandName", t.commandname), l.data("editor", e(this).data("editor")), l.bind(r, function() {
                    a.setTextFormat.apply(this)
                })), l.attr("title", t.tooltip), l.css("cursor", "pointer"), l.append(o), i) return l;
            e(this).data("menuBar").append(l)
        },
        setTextFormat: function() {
            return a.setStyleWithCSS.apply(this), document.execCommand(e(this).data("commandName"), !1, e(this).data("value") || null), e(this).data("editor").focus(), !1
        },
        getSource: function(t, a) {
            var n = 0;
            t.data("state") ? (n = 1, t.data("state", null)) : t.data("state", 1), e(this).data("source-mode", !n);
            var i, l = e(this).data("editor");
            if (0 == n) i = document.createTextNode(l.html()), l.empty(), l.attr("contenteditable", !1), preElement = e("<pre/>", {
                contenteditable: !0
            }), preElement.append(i), l.append(preElement), t.parent().siblings().hide(), t.siblings().hide();
            else {
                var o = l.children().first().text();
                l.html(o), l.attr("contenteditable", !0), t.parent().siblings().show(), t.siblings().show()
            }
        },
        countWords: function(t) {
            for (var n = 0, i = t.contents().filter(function() {
                    return 3 == this.nodeType
                }), l = 0; l < i.length; l++) text = i[l].textContent, text = text.replace(/[^-\w\s]/gi, " "), text = e.trim(text), n += text.split(/\s+/).length;
            t.children().each(function() {
                n += a.countWords.apply(this, [e(this)])
            });
            return n
        },
        countChars: function(t) {
            for (var n = 0, i = t.contents().filter(function() {
                    return 3 == this.nodeType
                }), l = 0; l < i.length; l++) text = i[l].textContent, n += text.length;
            t.children().each(function() {
                n += a.countChars.apply(this, [e(this)])
            });
            return n
        },
        getWordCount: function() {
            return a.countWords.apply(this, [e(this).data("editor")])
        },
        getCharCount: function() {
            return a.countChars.apply(this, [e(this).data("editor")])
        },
        rgbToHex: function(e) {
            return e = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/), "#" + ("0" + parseInt(e[1], 10).toString(16)).slice(-2) + ("0" + parseInt(e[2], 10).toString(16)).slice(-2) + ("0" + parseInt(e[3], 10).toString(16)).slice(-2)
        },
        showMessage: function(t, a) {
            e("<div/>", {
                class: "alert alert-danger"
            }).append(e("<button/>", {
                type: "button",
                class: "close",
                "data-dismiss": "alert",
                html: "x"
            })).append(e("<span/>").html(a)).appendTo(e("#" + t)), setTimeout(function() {
                e(".alert").alert("close")
            }, 3e3)
        },
        getText: function() {
            return e(this).data("source-mode") ? e(this).data("editor").children().first().text() : e(this).data("editor").html()
        },
        setText: function(t) {
            e(this).data("source-mode") ? e(this).data("editor").children().first().text(t) : e(this).data("editor").html(t)
        },
        setStyleWithCSS: function() {
            if (navigator.userAgent.match(/MSIE/i)) try {
                Editor.execCommand("styleWithCSS", 0, !1)
            } catch (e) {
                try {
                    Editor.execCommand("useCSS", 0, !0)
                } catch (e) {
                    try {
                        Editor.execCommand("styleWithCSS", !1, !1)
                    } catch (e) {}
                }
            } else document.execCommand("styleWithCSS", null, !0)
        }
    };
    e.fn.Editor = function(t) {
        return a[t] ? a[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist on jQuery.Editor") : a.init.apply(this, arguments)
    }
}(jQuery);







/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#bs4/dt-1.10.18/r-2.2.2
 *
 * Included libraries:
 *   DataTables 1.10.18, Responsive 2.2.2
 */

/*!
 DataTables 1.10.18
 ©2008-2018 SpryMedia Ltd - datatables.net/license
*/
(function(h) {
    "function" === typeof define && define.amd ? define(["jquery"], function(E) {
        return h(E, window, document)
    }) : "object" === typeof exports ? module.exports = function(E, H) {
        E || (E = window);
        H || (H = "undefined" !== typeof window ? require("jquery") : require("jquery")(E));
        return h(H, E, E.document)
    } : h(jQuery, window, document)
})(function(h, E, H, k) {
    function Z(a) {
        var b, c, d = {};
        h.each(a, function(e) {
            if ((b = e.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(b[1] + " ")) c = e.replace(b[0], b[2].toLowerCase()),
                d[c] = e, "o" === b[1] && Z(a[e])
        });
        a._hungarianMap = d
    }

    function J(a, b, c) {
        a._hungarianMap || Z(a);
        var d;
        h.each(b, function(e) {
            d = a._hungarianMap[e];
            if (d !== k && (c || b[d] === k)) "o" === d.charAt(0) ? (b[d] || (b[d] = {}), h.extend(!0, b[d], b[e]), J(a[d], b[d], c)) : b[d] = b[e]
        })
    }

    function Ca(a) {
        var b = n.defaults.oLanguage,
            c = b.sDecimal;
        c && Da(c);
        if (a) {
            var d = a.sZeroRecords;
            !a.sEmptyTable && (d && "No data available in table" === b.sEmptyTable) && F(a, a, "sZeroRecords", "sEmptyTable");
            !a.sLoadingRecords && (d && "Loading..." === b.sLoadingRecords) && F(a,
                a, "sZeroRecords", "sLoadingRecords");
            a.sInfoThousands && (a.sThousands = a.sInfoThousands);
            (a = a.sDecimal) && c !== a && Da(a)
        }
    }

    function eb(a) {
        A(a, "ordering", "bSort");
        A(a, "orderMulti", "bSortMulti");
        A(a, "orderClasses", "bSortClasses");
        A(a, "orderCellsTop", "bSortCellsTop");
        A(a, "order", "aaSorting");
        A(a, "orderFixed", "aaSortingFixed");
        A(a, "paging", "bPaginate");
        A(a, "pagingType", "sPaginationType");
        A(a, "pageLength", "iDisplayLength");
        A(a, "searching", "bFilter");
        "boolean" === typeof a.sScrollX && (a.sScrollX = a.sScrollX ? "100%" :
            "");
        "boolean" === typeof a.scrollX && (a.scrollX = a.scrollX ? "100%" : "");
        if (a = a.aoSearchCols)
            for (var b = 0, c = a.length; b < c; b++) a[b] && J(n.models.oSearch, a[b])
    }

    function fb(a) {
        A(a, "orderable", "bSortable");
        A(a, "orderData", "aDataSort");
        A(a, "orderSequence", "asSorting");
        A(a, "orderDataType", "sortDataType");
        var b = a.aDataSort;
        "number" === typeof b && !h.isArray(b) && (a.aDataSort = [b])
    }

    function gb(a) {
        if (!n.__browser) {
            var b = {};
            n.__browser = b;
            var c = h("<div/>").css({
                    position: "fixed",
                    top: 0,
                    left: -1 * h(E).scrollLeft(),
                    height: 1,
                    width: 1,
                    overflow: "hidden"
                }).append(h("<div/>").css({
                    position: "absolute",
                    top: 1,
                    left: 1,
                    width: 100,
                    overflow: "scroll"
                }).append(h("<div/>").css({
                    width: "100%",
                    height: 10
                }))).appendTo("body"),
                d = c.children(),
                e = d.children();
            b.barWidth = d[0].offsetWidth - d[0].clientWidth;
            b.bScrollOversize = 100 === e[0].offsetWidth && 100 !== d[0].clientWidth;
            b.bScrollbarLeft = 1 !== Math.round(e.offset().left);
            b.bBounding = c[0].getBoundingClientRect().width ? !0 : !1;
            c.remove()
        }
        h.extend(a.oBrowser, n.__browser);
        a.oScroll.iBarWidth = n.__browser.barWidth
    }

    function hb(a, b, c, d, e, f) {
        var g, j = !1;
        c !== k && (g = c, j = !0);
        for (; d !== e;) a.hasOwnProperty(d) && (g = j ? b(g, a[d], d, a) : a[d], j = !0, d += f);
        return g
    }

    function Ea(a, b) {
        var c = n.defaults.column,
            d = a.aoColumns.length,
            c = h.extend({}, n.models.oColumn, c, {
                nTh: b ? b : H.createElement("th"),
                sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "",
                aDataSort: c.aDataSort ? c.aDataSort : [d],
                mData: c.mData ? c.mData : d,
                idx: d
            });
        a.aoColumns.push(c);
        c = a.aoPreSearchCols;
        c[d] = h.extend({}, n.models.oSearch, c[d]);
        ka(a, d, h(b).data())
    }

    function ka(a, b, c) {
        var b = a.aoColumns[b],
            d = a.oClasses,
            e = h(b.nTh);
        if (!b.sWidthOrig) {
            b.sWidthOrig = e.attr("width") || null;
            var f = (e.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
            f && (b.sWidthOrig = f[1])
        }
        c !== k && null !== c && (fb(c), J(n.defaults.column, c), c.mDataProp !== k && !c.mData && (c.mData = c.mDataProp), c.sType && (b._sManualType = c.sType), c.className && !c.sClass && (c.sClass = c.className), c.sClass && e.addClass(c.sClass), h.extend(b, c), F(b, c, "sWidth", "sWidthOrig"), c.iDataSort !== k && (b.aDataSort = [c.iDataSort]), F(b, c, "aDataSort"));
        var g = b.mData,
            j = S(g),
            i = b.mRender ?
            S(b.mRender) : null,
            c = function(a) {
                return "string" === typeof a && -1 !== a.indexOf("@")
            };
        b._bAttrSrc = h.isPlainObject(g) && (c(g.sort) || c(g.type) || c(g.filter));
        b._setter = null;
        b.fnGetData = function(a, b, c) {
            var d = j(a, b, k, c);
            return i && b ? i(d, b, a, c) : d
        };
        b.fnSetData = function(a, b, c) {
            return N(g)(a, b, c)
        };
        "number" !== typeof g && (a._rowReadObject = !0);
        a.oFeatures.bSort || (b.bSortable = !1, e.addClass(d.sSortableNone));
        a = -1 !== h.inArray("asc", b.asSorting);
        c = -1 !== h.inArray("desc", b.asSorting);
        !b.bSortable || !a && !c ? (b.sSortingClass = d.sSortableNone,
            b.sSortingClassJUI = "") : a && !c ? (b.sSortingClass = d.sSortableAsc, b.sSortingClassJUI = d.sSortJUIAscAllowed) : !a && c ? (b.sSortingClass = d.sSortableDesc, b.sSortingClassJUI = d.sSortJUIDescAllowed) : (b.sSortingClass = d.sSortable, b.sSortingClassJUI = d.sSortJUI)
    }

    function $(a) {
        if (!1 !== a.oFeatures.bAutoWidth) {
            var b = a.aoColumns;
            Fa(a);
            for (var c = 0, d = b.length; c < d; c++) b[c].nTh.style.width = b[c].sWidth
        }
        b = a.oScroll;
        ("" !== b.sY || "" !== b.sX) && la(a);
        r(a, null, "column-sizing", [a])
    }

    function aa(a, b) {
        var c = ma(a, "bVisible");
        return "number" ===
            typeof c[b] ? c[b] : null
    }

    function ba(a, b) {
        var c = ma(a, "bVisible"),
            c = h.inArray(b, c);
        return -1 !== c ? c : null
    }

    function V(a) {
        var b = 0;
        h.each(a.aoColumns, function(a, d) {
            d.bVisible && "none" !== h(d.nTh).css("display") && b++
        });
        return b
    }

    function ma(a, b) {
        var c = [];
        h.map(a.aoColumns, function(a, e) {
            a[b] && c.push(e)
        });
        return c
    }

    function Ga(a) {
        var b = a.aoColumns,
            c = a.aoData,
            d = n.ext.type.detect,
            e, f, g, j, i, h, l, q, t;
        e = 0;
        for (f = b.length; e < f; e++)
            if (l = b[e], t = [], !l.sType && l._sManualType) l.sType = l._sManualType;
            else if (!l.sType) {
            g = 0;
            for (j = d.length; g <
                j; g++) {
                i = 0;
                for (h = c.length; i < h; i++) {
                    t[i] === k && (t[i] = B(a, i, e, "type"));
                    q = d[g](t[i], a);
                    if (!q && g !== d.length - 1) break;
                    if ("html" === q) break
                }
                if (q) {
                    l.sType = q;
                    break
                }
            }
            l.sType || (l.sType = "string")
        }
    }

    function ib(a, b, c, d) {
        var e, f, g, j, i, m, l = a.aoColumns;
        if (b)
            for (e = b.length - 1; 0 <= e; e--) {
                m = b[e];
                var q = m.targets !== k ? m.targets : m.aTargets;
                h.isArray(q) || (q = [q]);
                f = 0;
                for (g = q.length; f < g; f++)
                    if ("number" === typeof q[f] && 0 <= q[f]) {
                        for (; l.length <= q[f];) Ea(a);
                        d(q[f], m)
                    } else if ("number" === typeof q[f] && 0 > q[f]) d(l.length + q[f], m);
                else if ("string" ===
                    typeof q[f]) {
                    j = 0;
                    for (i = l.length; j < i; j++)("_all" == q[f] || h(l[j].nTh).hasClass(q[f])) && d(j, m)
                }
            }
        if (c) {
            e = 0;
            for (a = c.length; e < a; e++) d(e, c[e])
        }
    }

    function O(a, b, c, d) {
        var e = a.aoData.length,
            f = h.extend(!0, {}, n.models.oRow, {
                src: c ? "dom" : "data",
                idx: e
            });
        f._aData = b;
        a.aoData.push(f);
        for (var g = a.aoColumns, j = 0, i = g.length; j < i; j++) g[j].sType = null;
        a.aiDisplayMaster.push(e);
        b = a.rowIdFn(b);
        b !== k && (a.aIds[b] = f);
        (c || !a.oFeatures.bDeferRender) && Ha(a, e, c, d);
        return e
    }

    function na(a, b) {
        var c;
        b instanceof h || (b = h(b));
        return b.map(function(b,
            e) {
            c = Ia(a, e);
            return O(a, c.data, e, c.cells)
        })
    }

    function B(a, b, c, d) {
        var e = a.iDraw,
            f = a.aoColumns[c],
            g = a.aoData[b]._aData,
            j = f.sDefaultContent,
            i = f.fnGetData(g, d, {
                settings: a,
                row: b,
                col: c
            });
        if (i === k) return a.iDrawError != e && null === j && (K(a, 0, "Requested unknown parameter " + ("function" == typeof f.mData ? "{function}" : "'" + f.mData + "'") + " for row " + b + ", column " + c, 4), a.iDrawError = e), j;
        if ((i === g || null === i) && null !== j && d !== k) i = j;
        else if ("function" === typeof i) return i.call(g);
        return null === i && "display" == d ? "" : i
    }

    function jb(a,
        b, c, d) {
        a.aoColumns[c].fnSetData(a.aoData[b]._aData, d, {
            settings: a,
            row: b,
            col: c
        })
    }

    function Ja(a) {
        return h.map(a.match(/(\\.|[^\.])+/g) || [""], function(a) {
            return a.replace(/\\\./g, ".")
        })
    }

    function S(a) {
        if (h.isPlainObject(a)) {
            var b = {};
            h.each(a, function(a, c) {
                c && (b[a] = S(c))
            });
            return function(a, c, f, g) {
                var j = b[c] || b._;
                return j !== k ? j(a, c, f, g) : a
            }
        }
        if (null === a) return function(a) {
            return a
        };
        if ("function" === typeof a) return function(b, c, f, g) {
            return a(b, c, f, g)
        };
        if ("string" === typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") ||
                -1 !== a.indexOf("("))) {
            var c = function(a, b, f) {
                var g, j;
                if ("" !== f) {
                    j = Ja(f);
                    for (var i = 0, m = j.length; i < m; i++) {
                        f = j[i].match(ca);
                        g = j[i].match(W);
                        if (f) {
                            j[i] = j[i].replace(ca, "");
                            "" !== j[i] && (a = a[j[i]]);
                            g = [];
                            j.splice(0, i + 1);
                            j = j.join(".");
                            if (h.isArray(a)) {
                                i = 0;
                                for (m = a.length; i < m; i++) g.push(c(a[i], b, j))
                            }
                            a = f[0].substring(1, f[0].length - 1);
                            a = "" === a ? g : g.join(a);
                            break
                        } else if (g) {
                            j[i] = j[i].replace(W, "");
                            a = a[j[i]]();
                            continue
                        }
                        if (null === a || a[j[i]] === k) return k;
                        a = a[j[i]]
                    }
                }
                return a
            };
            return function(b, e) {
                return c(b, e, a)
            }
        }
        return function(b) {
            return b[a]
        }
    }

    function N(a) {
        if (h.isPlainObject(a)) return N(a._);
        if (null === a) return function() {};
        if ("function" === typeof a) return function(b, d, e) {
            a(b, "set", d, e)
        };
        if ("string" === typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
            var b = function(a, d, e) {
                var e = Ja(e),
                    f;
                f = e[e.length - 1];
                for (var g, j, i = 0, m = e.length - 1; i < m; i++) {
                    g = e[i].match(ca);
                    j = e[i].match(W);
                    if (g) {
                        e[i] = e[i].replace(ca, "");
                        a[e[i]] = [];
                        f = e.slice();
                        f.splice(0, i + 1);
                        g = f.join(".");
                        if (h.isArray(d)) {
                            j = 0;
                            for (m = d.length; j < m; j++) f = {}, b(f, d[j], g),
                                a[e[i]].push(f)
                        } else a[e[i]] = d;
                        return
                    }
                    j && (e[i] = e[i].replace(W, ""), a = a[e[i]](d));
                    if (null === a[e[i]] || a[e[i]] === k) a[e[i]] = {};
                    a = a[e[i]]
                }
                if (f.match(W)) a[f.replace(W, "")](d);
                else a[f.replace(ca, "")] = d
            };
            return function(c, d) {
                return b(c, d, a)
            }
        }
        return function(b, d) {
            b[a] = d
        }
    }

    function Ka(a) {
        return D(a.aoData, "_aData")
    }

    function oa(a) {
        a.aoData.length = 0;
        a.aiDisplayMaster.length = 0;
        a.aiDisplay.length = 0;
        a.aIds = {}
    }

    function pa(a, b, c) {
        for (var d = -1, e = 0, f = a.length; e < f; e++) a[e] == b ? d = e : a[e] > b && a[e]--; - 1 != d && c === k && a.splice(d,
            1)
    }

    function da(a, b, c, d) {
        var e = a.aoData[b],
            f, g = function(c, d) {
                for (; c.childNodes.length;) c.removeChild(c.firstChild);
                c.innerHTML = B(a, b, d, "display")
            };
        if ("dom" === c || (!c || "auto" === c) && "dom" === e.src) e._aData = Ia(a, e, d, d === k ? k : e._aData).data;
        else {
            var j = e.anCells;
            if (j)
                if (d !== k) g(j[d], d);
                else {
                    c = 0;
                    for (f = j.length; c < f; c++) g(j[c], c)
                }
        }
        e._aSortData = null;
        e._aFilterData = null;
        g = a.aoColumns;
        if (d !== k) g[d].sType = null;
        else {
            c = 0;
            for (f = g.length; c < f; c++) g[c].sType = null;
            La(a, e)
        }
    }

    function Ia(a, b, c, d) {
        var e = [],
            f = b.firstChild,
            g,
            j, i = 0,
            m, l = a.aoColumns,
            q = a._rowReadObject,
            d = d !== k ? d : q ? {} : [],
            t = function(a, b) {
                if ("string" === typeof a) {
                    var c = a.indexOf("@"); - 1 !== c && (c = a.substring(c + 1), N(a)(d, b.getAttribute(c)))
                }
            },
            G = function(a) {
                if (c === k || c === i) j = l[i], m = h.trim(a.innerHTML), j && j._bAttrSrc ? (N(j.mData._)(d, m), t(j.mData.sort, a), t(j.mData.type, a), t(j.mData.filter, a)) : q ? (j._setter || (j._setter = N(j.mData)), j._setter(d, m)) : d[i] = m;
                i++
            };
        if (f)
            for (; f;) {
                g = f.nodeName.toUpperCase();
                if ("TD" == g || "TH" == g) G(f), e.push(f);
                f = f.nextSibling
            } else {
                e = b.anCells;
                f = 0;
                for (g = e.length; f < g; f++) G(e[f])
            }
        if (b = b.firstChild ? b : b.nTr)(b = b.getAttribute("id")) && N(a.rowId)(d, b);
        return {
            data: d,
            cells: e
        }
    }

    function Ha(a, b, c, d) {
        var e = a.aoData[b],
            f = e._aData,
            g = [],
            j, i, m, l, q;
        if (null === e.nTr) {
            j = c || H.createElement("tr");
            e.nTr = j;
            e.anCells = g;
            j._DT_RowIndex = b;
            La(a, e);
            l = 0;
            for (q = a.aoColumns.length; l < q; l++) {
                m = a.aoColumns[l];
                i = c ? d[l] : H.createElement(m.sCellType);
                i._DT_CellIndex = {
                    row: b,
                    column: l
                };
                g.push(i);
                if ((!c || m.mRender || m.mData !== l) && (!h.isPlainObject(m.mData) || m.mData._ !== l + ".display")) i.innerHTML =
                    B(a, b, l, "display");
                m.sClass && (i.className += " " + m.sClass);
                m.bVisible && !c ? j.appendChild(i) : !m.bVisible && c && i.parentNode.removeChild(i);
                m.fnCreatedCell && m.fnCreatedCell.call(a.oInstance, i, B(a, b, l), f, b, l)
            }
            r(a, "aoRowCreatedCallback", null, [j, f, b, g])
        }
        e.nTr.setAttribute("role", "row")
    }

    function La(a, b) {
        var c = b.nTr,
            d = b._aData;
        if (c) {
            var e = a.rowIdFn(d);
            e && (c.id = e);
            d.DT_RowClass && (e = d.DT_RowClass.split(" "), b.__rowc = b.__rowc ? qa(b.__rowc.concat(e)) : e, h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));
            d.DT_RowAttr && h(c).attr(d.DT_RowAttr);
            d.DT_RowData && h(c).data(d.DT_RowData)
        }
    }

    function kb(a) {
        var b, c, d, e, f, g = a.nTHead,
            j = a.nTFoot,
            i = 0 === h("th, td", g).length,
            m = a.oClasses,
            l = a.aoColumns;
        i && (e = h("<tr/>").appendTo(g));
        b = 0;
        for (c = l.length; b < c; b++) f = l[b], d = h(f.nTh).addClass(f.sClass), i && d.appendTo(e), a.oFeatures.bSort && (d.addClass(f.sSortingClass), !1 !== f.bSortable && (d.attr("tabindex", a.iTabIndex).attr("aria-controls", a.sTableId), Ma(a, f.nTh, b))), f.sTitle != d[0].innerHTML && d.html(f.sTitle), Na(a, "header")(a, d,
            f, m);
        i && ea(a.aoHeader, g);
        h(g).find(">tr").attr("role", "row");
        h(g).find(">tr>th, >tr>td").addClass(m.sHeaderTH);
        h(j).find(">tr>th, >tr>td").addClass(m.sFooterTH);
        if (null !== j) {
            a = a.aoFooter[0];
            b = 0;
            for (c = a.length; b < c; b++) f = l[b], f.nTf = a[b].cell, f.sClass && h(f.nTf).addClass(f.sClass)
        }
    }

    function fa(a, b, c) {
        var d, e, f, g = [],
            j = [],
            i = a.aoColumns.length,
            m;
        if (b) {
            c === k && (c = !1);
            d = 0;
            for (e = b.length; d < e; d++) {
                g[d] = b[d].slice();
                g[d].nTr = b[d].nTr;
                for (f = i - 1; 0 <= f; f--) !a.aoColumns[f].bVisible && !c && g[d].splice(f, 1);
                j.push([])
            }
            d =
                0;
            for (e = g.length; d < e; d++) {
                if (a = g[d].nTr)
                    for (; f = a.firstChild;) a.removeChild(f);
                f = 0;
                for (b = g[d].length; f < b; f++)
                    if (m = i = 1, j[d][f] === k) {
                        a.appendChild(g[d][f].cell);
                        for (j[d][f] = 1; g[d + i] !== k && g[d][f].cell == g[d + i][f].cell;) j[d + i][f] = 1, i++;
                        for (; g[d][f + m] !== k && g[d][f].cell == g[d][f + m].cell;) {
                            for (c = 0; c < i; c++) j[d + c][f + m] = 1;
                            m++
                        }
                        h(g[d][f].cell).attr("rowspan", i).attr("colspan", m)
                    }
            }
        }
    }

    function P(a) {
        var b = r(a, "aoPreDrawCallback", "preDraw", [a]);
        if (-1 !== h.inArray(!1, b)) C(a, !1);
        else {
            var b = [],
                c = 0,
                d = a.asStripeClasses,
                e =
                d.length,
                f = a.oLanguage,
                g = a.iInitDisplayStart,
                j = "ssp" == y(a),
                i = a.aiDisplay;
            a.bDrawing = !0;
            g !== k && -1 !== g && (a._iDisplayStart = j ? g : g >= a.fnRecordsDisplay() ? 0 : g, a.iInitDisplayStart = -1);
            var g = a._iDisplayStart,
                m = a.fnDisplayEnd();
            if (a.bDeferLoading) a.bDeferLoading = !1, a.iDraw++, C(a, !1);
            else if (j) {
                if (!a.bDestroying && !lb(a)) return
            } else a.iDraw++;
            if (0 !== i.length) {
                f = j ? a.aoData.length : m;
                for (j = j ? 0 : g; j < f; j++) {
                    var l = i[j],
                        q = a.aoData[l];
                    null === q.nTr && Ha(a, l);
                    var t = q.nTr;
                    if (0 !== e) {
                        var G = d[c % e];
                        q._sRowStripe != G && (h(t).removeClass(q._sRowStripe).addClass(G),
                            q._sRowStripe = G)
                    }
                    r(a, "aoRowCallback", null, [t, q._aData, c, j, l]);
                    b.push(t);
                    c++
                }
            } else c = f.sZeroRecords, 1 == a.iDraw && "ajax" == y(a) ? c = f.sLoadingRecords : f.sEmptyTable && 0 === a.fnRecordsTotal() && (c = f.sEmptyTable), b[0] = h("<tr/>", {
                "class": e ? d[0] : ""
            }).append(h("<td />", {
                valign: "top",
                colSpan: V(a),
                "class": a.oClasses.sRowEmpty
            }).html(c))[0];
            r(a, "aoHeaderCallback", "header", [h(a.nTHead).children("tr")[0], Ka(a), g, m, i]);
            r(a, "aoFooterCallback", "footer", [h(a.nTFoot).children("tr")[0], Ka(a), g, m, i]);
            d = h(a.nTBody);
            d.children().detach();
            d.append(h(b));
            r(a, "aoDrawCallback", "draw", [a]);
            a.bSorted = !1;
            a.bFiltered = !1;
            a.bDrawing = !1
        }
    }

    function T(a, b) {
        var c = a.oFeatures,
            d = c.bFilter;
        c.bSort && mb(a);
        d ? ga(a, a.oPreviousSearch) : a.aiDisplay = a.aiDisplayMaster.slice();
        !0 !== b && (a._iDisplayStart = 0);
        a._drawHold = b;
        P(a);
        a._drawHold = !1
    }

    function nb(a) {
        var b = a.oClasses,
            c = h(a.nTable),
            c = h("<div/>").insertBefore(c),
            d = a.oFeatures,
            e = h("<div/>", {
                id: a.sTableId + "_wrapper",
                "class": b.sWrapper + (a.nTFoot ? "" : " " + b.sNoFooter)
            });
        a.nHolding = c[0];
        a.nTableWrapper = e[0];
        a.nTableReinsertBefore =
            a.nTable.nextSibling;
        for (var f = a.sDom.split(""), g, j, i, m, l, q, k = 0; k < f.length; k++) {
            g = null;
            j = f[k];
            if ("<" == j) {
                i = h("<div/>")[0];
                m = f[k + 1];
                if ("'" == m || '"' == m) {
                    l = "";
                    for (q = 2; f[k + q] != m;) l += f[k + q], q++;
                    "H" == l ? l = b.sJUIHeader : "F" == l && (l = b.sJUIFooter); - 1 != l.indexOf(".") ? (m = l.split("."), i.id = m[0].substr(1, m[0].length - 1), i.className = m[1]) : "#" == l.charAt(0) ? i.id = l.substr(1, l.length - 1) : i.className = l;
                    k += q
                }
                e.append(i);
                e = h(i)
            } else if (">" == j) e = e.parent();
            else if ("l" == j && d.bPaginate && d.bLengthChange) g = ob(a);
            else if ("f" == j &&
                d.bFilter) g = pb(a);
            else if ("r" == j && d.bProcessing) g = qb(a);
            else if ("t" == j) g = rb(a);
            else if ("i" == j && d.bInfo) g = sb(a);
            else if ("p" == j && d.bPaginate) g = tb(a);
            else if (0 !== n.ext.feature.length) {
                i = n.ext.feature;
                q = 0;
                for (m = i.length; q < m; q++)
                    if (j == i[q].cFeature) {
                        g = i[q].fnInit(a);
                        break
                    }
            }
            g && (i = a.aanFeatures, i[j] || (i[j] = []), i[j].push(g), e.append(g))
        }
        c.replaceWith(e);
        a.nHolding = null
    }

    function ea(a, b) {
        var c = h(b).children("tr"),
            d, e, f, g, j, i, m, l, q, k;
        a.splice(0, a.length);
        f = 0;
        for (i = c.length; f < i; f++) a.push([]);
        f = 0;
        for (i = c.length; f <
            i; f++) {
            d = c[f];
            for (e = d.firstChild; e;) {
                if ("TD" == e.nodeName.toUpperCase() || "TH" == e.nodeName.toUpperCase()) {
                    l = 1 * e.getAttribute("colspan");
                    q = 1 * e.getAttribute("rowspan");
                    l = !l || 0 === l || 1 === l ? 1 : l;
                    q = !q || 0 === q || 1 === q ? 1 : q;
                    g = 0;
                    for (j = a[f]; j[g];) g++;
                    m = g;
                    k = 1 === l ? !0 : !1;
                    for (j = 0; j < l; j++)
                        for (g = 0; g < q; g++) a[f + g][m + j] = {
                            cell: e,
                            unique: k
                        }, a[f + g].nTr = d
                }
                e = e.nextSibling
            }
        }
    }

    function ra(a, b, c) {
        var d = [];
        c || (c = a.aoHeader, b && (c = [], ea(c, b)));
        for (var b = 0, e = c.length; b < e; b++)
            for (var f = 0, g = c[b].length; f < g; f++)
                if (c[b][f].unique && (!d[f] ||
                        !a.bSortCellsTop)) d[f] = c[b][f].cell;
        return d
    }

    function sa(a, b, c) {
        r(a, "aoServerParams", "serverParams", [b]);
        if (b && h.isArray(b)) {
            var d = {},
                e = /(.*?)\[\]$/;
            h.each(b, function(a, b) {
                var c = b.name.match(e);
                c ? (c = c[0], d[c] || (d[c] = []), d[c].push(b.value)) : d[b.name] = b.value
            });
            b = d
        }
        var f, g = a.ajax,
            j = a.oInstance,
            i = function(b) {
                r(a, null, "xhr", [a, b, a.jqXHR]);
                c(b)
            };
        if (h.isPlainObject(g) && g.data) {
            f = g.data;
            var m = "function" === typeof f ? f(b, a) : f,
                b = "function" === typeof f && m ? m : h.extend(!0, b, m);
            delete g.data
        }
        m = {
            data: b,
            success: function(b) {
                var c =
                    b.error || b.sError;
                c && K(a, 0, c);
                a.json = b;
                i(b)
            },
            dataType: "json",
            cache: !1,
            type: a.sServerMethod,
            error: function(b, c) {
                var d = r(a, null, "xhr", [a, null, a.jqXHR]); - 1 === h.inArray(!0, d) && ("parsererror" == c ? K(a, 0, "Invalid JSON response", 1) : 4 === b.readyState && K(a, 0, "Ajax error", 7));
                C(a, !1)
            }
        };
        a.oAjaxData = b;
        r(a, null, "preXhr", [a, b]);
        a.fnServerData ? a.fnServerData.call(j, a.sAjaxSource, h.map(b, function(a, b) {
                return {
                    name: b,
                    value: a
                }
            }), i, a) : a.sAjaxSource || "string" === typeof g ? a.jqXHR = h.ajax(h.extend(m, {
                url: g || a.sAjaxSource
            })) :
            "function" === typeof g ? a.jqXHR = g.call(j, b, i, a) : (a.jqXHR = h.ajax(h.extend(m, g)), g.data = f)
    }

    function lb(a) {
        return a.bAjaxDataGet ? (a.iDraw++, C(a, !0), sa(a, ub(a), function(b) {
            vb(a, b)
        }), !1) : !0
    }

    function ub(a) {
        var b = a.aoColumns,
            c = b.length,
            d = a.oFeatures,
            e = a.oPreviousSearch,
            f = a.aoPreSearchCols,
            g, j = [],
            i, m, l, k = X(a);
        g = a._iDisplayStart;
        i = !1 !== d.bPaginate ? a._iDisplayLength : -1;
        var t = function(a, b) {
            j.push({
                name: a,
                value: b
            })
        };
        t("sEcho", a.iDraw);
        t("iColumns", c);
        t("sColumns", D(b, "sName").join(","));
        t("iDisplayStart", g);
        t("iDisplayLength",
            i);
        var G = {
            draw: a.iDraw,
            columns: [],
            order: [],
            start: g,
            length: i,
            search: {
                value: e.sSearch,
                regex: e.bRegex
            }
        };
        for (g = 0; g < c; g++) m = b[g], l = f[g], i = "function" == typeof m.mData ? "function" : m.mData, G.columns.push({
            data: i,
            name: m.sName,
            searchable: m.bSearchable,
            orderable: m.bSortable,
            search: {
                value: l.sSearch,
                regex: l.bRegex
            }
        }), t("mDataProp_" + g, i), d.bFilter && (t("sSearch_" + g, l.sSearch), t("bRegex_" + g, l.bRegex), t("bSearchable_" + g, m.bSearchable)), d.bSort && t("bSortable_" + g, m.bSortable);
        d.bFilter && (t("sSearch", e.sSearch), t("bRegex",
            e.bRegex));
        d.bSort && (h.each(k, function(a, b) {
            G.order.push({
                column: b.col,
                dir: b.dir
            });
            t("iSortCol_" + a, b.col);
            t("sSortDir_" + a, b.dir)
        }), t("iSortingCols", k.length));
        b = n.ext.legacy.ajax;
        return null === b ? a.sAjaxSource ? j : G : b ? j : G
    }

    function vb(a, b) {
        var c = ta(a, b),
            d = b.sEcho !== k ? b.sEcho : b.draw,
            e = b.iTotalRecords !== k ? b.iTotalRecords : b.recordsTotal,
            f = b.iTotalDisplayRecords !== k ? b.iTotalDisplayRecords : b.recordsFiltered;
        if (d) {
            if (1 * d < a.iDraw) return;
            a.iDraw = 1 * d
        }
        oa(a);
        a._iRecordsTotal = parseInt(e, 10);
        a._iRecordsDisplay = parseInt(f,
            10);
        d = 0;
        for (e = c.length; d < e; d++) O(a, c[d]);
        a.aiDisplay = a.aiDisplayMaster.slice();
        a.bAjaxDataGet = !1;
        P(a);
        a._bInitComplete || ua(a, b);
        a.bAjaxDataGet = !0;
        C(a, !1)
    }

    function ta(a, b) {
        var c = h.isPlainObject(a.ajax) && a.ajax.dataSrc !== k ? a.ajax.dataSrc : a.sAjaxDataProp;
        return "data" === c ? b.aaData || b[c] : "" !== c ? S(c)(b) : b
    }

    function pb(a) {
        var b = a.oClasses,
            c = a.sTableId,
            d = a.oLanguage,
            e = a.oPreviousSearch,
            f = a.aanFeatures,
            g = '<input type="search" class="' + b.sFilterInput + '"/>',
            j = d.sSearch,
            j = j.match(/_INPUT_/) ? j.replace("_INPUT_",
                g) : j + g,
            b = h("<div/>", {
                id: !f.f ? c + "_filter" : null,
                "class": b.sFilter
            }).append(h("<label/>").append(j)),
            f = function() {
                var b = !this.value ? "" : this.value;
                b != e.sSearch && (ga(a, {
                    sSearch: b,
                    bRegex: e.bRegex,
                    bSmart: e.bSmart,
                    bCaseInsensitive: e.bCaseInsensitive
                }), a._iDisplayStart = 0, P(a))
            },
            g = null !== a.searchDelay ? a.searchDelay : "ssp" === y(a) ? 400 : 0,
            i = h("input", b).val(e.sSearch).attr("placeholder", d.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT", g ? Oa(f, g) : f).on("keypress.DT", function(a) {
                if (13 == a.keyCode) return !1
            }).attr("aria-controls",
                c);
        h(a.nTable).on("search.dt.DT", function(b, c) {
            if (a === c) try {
                i[0] !== H.activeElement && i.val(e.sSearch)
            } catch (d) {}
        });
        return b[0]
    }

    function ga(a, b, c) {
        var d = a.oPreviousSearch,
            e = a.aoPreSearchCols,
            f = function(a) {
                d.sSearch = a.sSearch;
                d.bRegex = a.bRegex;
                d.bSmart = a.bSmart;
                d.bCaseInsensitive = a.bCaseInsensitive
            };
        Ga(a);
        if ("ssp" != y(a)) {
            wb(a, b.sSearch, c, b.bEscapeRegex !== k ? !b.bEscapeRegex : b.bRegex, b.bSmart, b.bCaseInsensitive);
            f(b);
            for (b = 0; b < e.length; b++) xb(a, e[b].sSearch, b, e[b].bEscapeRegex !== k ? !e[b].bEscapeRegex : e[b].bRegex,
                e[b].bSmart, e[b].bCaseInsensitive);
            yb(a)
        } else f(b);
        a.bFiltered = !0;
        r(a, null, "search", [a])
    }

    function yb(a) {
        for (var b = n.ext.search, c = a.aiDisplay, d, e, f = 0, g = b.length; f < g; f++) {
            for (var j = [], i = 0, m = c.length; i < m; i++) e = c[i], d = a.aoData[e], b[f](a, d._aFilterData, e, d._aData, i) && j.push(e);
            c.length = 0;
            h.merge(c, j)
        }
    }

    function xb(a, b, c, d, e, f) {
        if ("" !== b) {
            for (var g = [], j = a.aiDisplay, d = Pa(b, d, e, f), e = 0; e < j.length; e++) b = a.aoData[j[e]]._aFilterData[c], d.test(b) && g.push(j[e]);
            a.aiDisplay = g
        }
    }

    function wb(a, b, c, d, e, f) {
        var d = Pa(b,
                d, e, f),
            f = a.oPreviousSearch.sSearch,
            g = a.aiDisplayMaster,
            j, e = [];
        0 !== n.ext.search.length && (c = !0);
        j = zb(a);
        if (0 >= b.length) a.aiDisplay = g.slice();
        else {
            if (j || c || f.length > b.length || 0 !== b.indexOf(f) || a.bSorted) a.aiDisplay = g.slice();
            b = a.aiDisplay;
            for (c = 0; c < b.length; c++) d.test(a.aoData[b[c]]._sFilterRow) && e.push(b[c]);
            a.aiDisplay = e
        }
    }

    function Pa(a, b, c, d) {
        a = b ? a : Qa(a);
        c && (a = "^(?=.*?" + h.map(a.match(/"[^"]+"|[^ ]+/g) || [""], function(a) {
            if ('"' === a.charAt(0)) var b = a.match(/^"(.*)"$/),
                a = b ? b[1] : a;
            return a.replace('"',
                "")
        }).join(")(?=.*?") + ").*$");
        return RegExp(a, d ? "i" : "")
    }

    function zb(a) {
        var b = a.aoColumns,
            c, d, e, f, g, j, i, h, l = n.ext.type.search;
        c = !1;
        d = 0;
        for (f = a.aoData.length; d < f; d++)
            if (h = a.aoData[d], !h._aFilterData) {
                j = [];
                e = 0;
                for (g = b.length; e < g; e++) c = b[e], c.bSearchable ? (i = B(a, d, e, "filter"), l[c.sType] && (i = l[c.sType](i)), null === i && (i = ""), "string" !== typeof i && i.toString && (i = i.toString())) : i = "", i.indexOf && -1 !== i.indexOf("&") && (va.innerHTML = i, i = Wb ? va.textContent : va.innerText), i.replace && (i = i.replace(/[\r\n]/g, "")), j.push(i);
                h._aFilterData = j;
                h._sFilterRow = j.join("  ");
                c = !0
            }
        return c
    }

    function Ab(a) {
        return {
            search: a.sSearch,
            smart: a.bSmart,
            regex: a.bRegex,
            caseInsensitive: a.bCaseInsensitive
        }
    }

    function Bb(a) {
        return {
            sSearch: a.search,
            bSmart: a.smart,
            bRegex: a.regex,
            bCaseInsensitive: a.caseInsensitive
        }
    }

    function sb(a) {
        var b = a.sTableId,
            c = a.aanFeatures.i,
            d = h("<div/>", {
                "class": a.oClasses.sInfo,
                id: !c ? b + "_info" : null
            });
        c || (a.aoDrawCallback.push({
            fn: Cb,
            sName: "information"
        }), d.attr("role", "status").attr("aria-live", "polite"), h(a.nTable).attr("aria-describedby",
            b + "_info"));
        return d[0]
    }

    function Cb(a) {
        var b = a.aanFeatures.i;
        if (0 !== b.length) {
            var c = a.oLanguage,
                d = a._iDisplayStart + 1,
                e = a.fnDisplayEnd(),
                f = a.fnRecordsTotal(),
                g = a.fnRecordsDisplay(),
                j = g ? c.sInfo : c.sInfoEmpty;
            g !== f && (j += " " + c.sInfoFiltered);
            j += c.sInfoPostFix;
            j = Db(a, j);
            c = c.fnInfoCallback;
            null !== c && (j = c.call(a.oInstance, a, d, e, f, g, j));
            h(b).html(j)
        }
    }

    function Db(a, b) {
        var c = a.fnFormatNumber,
            d = a._iDisplayStart + 1,
            e = a._iDisplayLength,
            f = a.fnRecordsDisplay(),
            g = -1 === e;
        return b.replace(/_START_/g, c.call(a, d)).replace(/_END_/g,
            c.call(a, a.fnDisplayEnd())).replace(/_MAX_/g, c.call(a, a.fnRecordsTotal())).replace(/_TOTAL_/g, c.call(a, f)).replace(/_PAGE_/g, c.call(a, g ? 1 : Math.ceil(d / e))).replace(/_PAGES_/g, c.call(a, g ? 1 : Math.ceil(f / e)))
    }

    function ha(a) {
        var b, c, d = a.iInitDisplayStart,
            e = a.aoColumns,
            f;
        c = a.oFeatures;
        var g = a.bDeferLoading;
        if (a.bInitialised) {
            nb(a);
            kb(a);
            fa(a, a.aoHeader);
            fa(a, a.aoFooter);
            C(a, !0);
            c.bAutoWidth && Fa(a);
            b = 0;
            for (c = e.length; b < c; b++) f = e[b], f.sWidth && (f.nTh.style.width = v(f.sWidth));
            r(a, null, "preInit", [a]);
            T(a);
            e =
                y(a);
            if ("ssp" != e || g) "ajax" == e ? sa(a, [], function(c) {
                var f = ta(a, c);
                for (b = 0; b < f.length; b++) O(a, f[b]);
                a.iInitDisplayStart = d;
                T(a);
                C(a, !1);
                ua(a, c)
            }, a) : (C(a, !1), ua(a))
        } else setTimeout(function() {
            ha(a)
        }, 200)
    }

    function ua(a, b) {
        a._bInitComplete = !0;
        (b || a.oInit.aaData) && $(a);
        r(a, null, "plugin-init", [a, b]);
        r(a, "aoInitComplete", "init", [a, b])
    }

    function Ra(a, b) {
        var c = parseInt(b, 10);
        a._iDisplayLength = c;
        Sa(a);
        r(a, null, "length", [a, c])
    }

    function ob(a) {
        for (var b = a.oClasses, c = a.sTableId, d = a.aLengthMenu, e = h.isArray(d[0]), f =
                e ? d[0] : d, d = e ? d[1] : d, e = h("<select   />", {
                    name: c + "_length",
                    "aria-controls": c,
                    "class": b.sLengthSelect
                }), g = 0, j = f.length; g < j; g++) e[0][g] = new Option("number" === typeof d[g] ? a.fnFormatNumber(d[g]) : d[g], f[g]);
        var i = h("<div><label/></div>").addClass(b.sLength);
        a.aanFeatures.l || (i[0].id = c + "_length");
        i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", e[0].outerHTML));
        h("select", i).val(a._iDisplayLength).on("change.DT", function() {
            Ra(a, h(this).val());
            P(a)
        });
        h(a.nTable).on("length.dt.DT", function(b, c, d) {
            a ===
                c && h("select", i).val(d)
        });
        return i[0]
    }

    function tb(a) {
        var b = a.sPaginationType,
            c = n.ext.pager[b],
            d = "function" === typeof c,
            e = function(a) {
                P(a)
            },
            b = h("<div/>").addClass(a.oClasses.sPaging + b)[0],
            f = a.aanFeatures;
        d || c.fnInit(a, b, e);
        f.p || (b.id = a.sTableId + "_paginate", a.aoDrawCallback.push({
            fn: function(a) {
                if (d) {
                    var b = a._iDisplayStart,
                        i = a._iDisplayLength,
                        h = a.fnRecordsDisplay(),
                        l = -1 === i,
                        b = l ? 0 : Math.ceil(b / i),
                        i = l ? 1 : Math.ceil(h / i),
                        h = c(b, i),
                        k, l = 0;
                    for (k = f.p.length; l < k; l++) Na(a, "pageButton")(a, f.p[l], l, h, b, i)
                } else c.fnUpdate(a,
                    e)
            },
            sName: "pagination"
        }));
        return b
    }

    function Ta(a, b, c) {
        var d = a._iDisplayStart,
            e = a._iDisplayLength,
            f = a.fnRecordsDisplay();
        0 === f || -1 === e ? d = 0 : "number" === typeof b ? (d = b * e, d > f && (d = 0)) : "first" == b ? d = 0 : "previous" == b ? (d = 0 <= e ? d - e : 0, 0 > d && (d = 0)) : "next" == b ? d + e < f && (d += e) : "last" == b ? d = Math.floor((f - 1) / e) * e : K(a, 0, "Unknown paging action: " + b, 5);
        b = a._iDisplayStart !== d;
        a._iDisplayStart = d;
        b && (r(a, null, "page", [a]), c && P(a));
        return b
    }

    function qb(a) {
        return h("<div/>", {
            id: !a.aanFeatures.r ? a.sTableId + "_processing" : null,
            "class": a.oClasses.sProcessing
        }).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]
    }

    function C(a, b) {
        a.oFeatures.bProcessing && h(a.aanFeatures.r).css("display", b ? "block" : "none");
        r(a, null, "processing", [a, b])
    }

    function rb(a) {
        var b = h(a.nTable);
        b.attr("role", "grid");
        var c = a.oScroll;
        if ("" === c.sX && "" === c.sY) return a.nTable;
        var d = c.sX,
            e = c.sY,
            f = a.oClasses,
            g = b.children("caption"),
            j = g.length ? g[0]._captionSide : null,
            i = h(b[0].cloneNode(!1)),
            m = h(b[0].cloneNode(!1)),
            l = b.children("tfoot");
        l.length || (l = null);
        i = h("<div/>", {
            "class": f.sScrollWrapper
        }).append(h("<div/>", {
            "class": f.sScrollHead
        }).css({
            overflow: "hidden",
            position: "relative",
            border: 0,
            width: d ? !d ? null : v(d) : "100%"
        }).append(h("<div/>", {
            "class": f.sScrollHeadInner
        }).css({
            "box-sizing": "content-box",
            width: c.sXInner || "100%"
        }).append(i.removeAttr("id").css("margin-left", 0).append("top" === j ? g : null).append(b.children("thead"))))).append(h("<div/>", {
            "class": f.sScrollBody
        }).css({
            position: "relative",
            overflow: "auto",
            width: !d ? null : v(d)
        }).append(b));
        l && i.append(h("<div/>", {
            "class": f.sScrollFoot
        }).css({
            overflow: "hidden",
            border: 0,
            width: d ? !d ? null : v(d) : "100%"
        }).append(h("<div/>", {
            "class": f.sScrollFootInner
        }).append(m.removeAttr("id").css("margin-left", 0).append("bottom" === j ? g : null).append(b.children("tfoot")))));
        var b = i.children(),
            k = b[0],
            f = b[1],
            t = l ? b[2] : null;
        if (d) h(f).on("scroll.DT", function() {
            var a = this.scrollLeft;
            k.scrollLeft = a;
            l && (t.scrollLeft = a)
        });
        h(f).css(e && c.bCollapse ? "max-height" : "height", e);
        a.nScrollHead = k;
        a.nScrollBody = f;
        a.nScrollFoot = t;
        a.aoDrawCallback.push({
            fn: la,
            sName: "scrolling"
        });
        return i[0]
    }

    function la(a) {
        var b = a.oScroll,
            c = b.sX,
            d = b.sXInner,
            e = b.sY,
            b = b.iBarWidth,
            f = h(a.nScrollHead),
            g = f[0].style,
            j = f.children("div"),
            i = j[0].style,
            m = j.children("table"),
            j = a.nScrollBody,
            l = h(j),
            q = j.style,
            t = h(a.nScrollFoot).children("div"),
            n = t.children("table"),
            o = h(a.nTHead),
            p = h(a.nTable),
            s = p[0],
            r = s.style,
            u = a.nTFoot ? h(a.nTFoot) : null,
            x = a.oBrowser,
            U = x.bScrollOversize,
            Xb = D(a.aoColumns, "nTh"),
            Q, L, R, w, Ua = [],
            y = [],
            z = [],
            A = [],
            B, C = function(a) {
                a = a.style;
                a.paddingTop = "0";
                a.paddingBottom = "0";
                a.borderTopWidth = "0";
                a.borderBottomWidth = "0";
                a.height = 0
            };
        L = j.scrollHeight > j.clientHeight;
        if (a.scrollBarVis !==
            L && a.scrollBarVis !== k) a.scrollBarVis = L, $(a);
        else {
            a.scrollBarVis = L;
            p.children("thead, tfoot").remove();
            u && (R = u.clone().prependTo(p), Q = u.find("tr"), R = R.find("tr"));
            w = o.clone().prependTo(p);
            o = o.find("tr");
            L = w.find("tr");
            w.find("th, td").removeAttr("tabindex");
            c || (q.width = "100%", f[0].style.width = "100%");
            h.each(ra(a, w), function(b, c) {
                B = aa(a, b);
                c.style.width = a.aoColumns[B].sWidth
            });
            u && I(function(a) {
                a.style.width = ""
            }, R);
            f = p.outerWidth();
            if ("" === c) {
                r.width = "100%";
                if (U && (p.find("tbody").height() > j.offsetHeight ||
                        "scroll" == l.css("overflow-y"))) r.width = v(p.outerWidth() - b);
                f = p.outerWidth()
            } else "" !== d && (r.width = v(d), f = p.outerWidth());
            I(C, L);
            I(function(a) {
                z.push(a.innerHTML);
                Ua.push(v(h(a).css("width")))
            }, L);
            I(function(a, b) {
                if (h.inArray(a, Xb) !== -1) a.style.width = Ua[b]
            }, o);
            h(L).height(0);
            u && (I(C, R), I(function(a) {
                A.push(a.innerHTML);
                y.push(v(h(a).css("width")))
            }, R), I(function(a, b) {
                a.style.width = y[b]
            }, Q), h(R).height(0));
            I(function(a, b) {
                a.innerHTML = '<div class="dataTables_sizing">' + z[b] + "</div>";
                a.childNodes[0].style.height =
                    "0";
                a.childNodes[0].style.overflow = "hidden";
                a.style.width = Ua[b]
            }, L);
            u && I(function(a, b) {
                a.innerHTML = '<div class="dataTables_sizing">' + A[b] + "</div>";
                a.childNodes[0].style.height = "0";
                a.childNodes[0].style.overflow = "hidden";
                a.style.width = y[b]
            }, R);
            if (p.outerWidth() < f) {
                Q = j.scrollHeight > j.offsetHeight || "scroll" == l.css("overflow-y") ? f + b : f;
                if (U && (j.scrollHeight > j.offsetHeight || "scroll" == l.css("overflow-y"))) r.width = v(Q - b);
                ("" === c || "" !== d) && K(a, 1, "Possible column misalignment", 6)
            } else Q = "100%";
            q.width = v(Q);
            g.width = v(Q);
            u && (a.nScrollFoot.style.width = v(Q));
            !e && U && (q.height = v(s.offsetHeight + b));
            c = p.outerWidth();
            m[0].style.width = v(c);
            i.width = v(c);
            d = p.height() > j.clientHeight || "scroll" == l.css("overflow-y");
            e = "padding" + (x.bScrollbarLeft ? "Left" : "Right");
            i[e] = d ? b + "px" : "0px";
            u && (n[0].style.width = v(c), t[0].style.width = v(c), t[0].style[e] = d ? b + "px" : "0px");
            p.children("colgroup").insertBefore(p.children("thead"));
            l.scroll();
            if ((a.bSorted || a.bFiltered) && !a._drawHold) j.scrollTop = 0
        }
    }

    function I(a, b, c) {
        for (var d = 0, e = 0,
                f = b.length, g, j; e < f;) {
            g = b[e].firstChild;
            for (j = c ? c[e].firstChild : null; g;) 1 === g.nodeType && (c ? a(g, j, d) : a(g, d), d++), g = g.nextSibling, j = c ? j.nextSibling : null;
            e++
        }
    }

    function Fa(a) {
        var b = a.nTable,
            c = a.aoColumns,
            d = a.oScroll,
            e = d.sY,
            f = d.sX,
            g = d.sXInner,
            j = c.length,
            i = ma(a, "bVisible"),
            m = h("th", a.nTHead),
            l = b.getAttribute("width"),
            k = b.parentNode,
            t = !1,
            n, o, p = a.oBrowser,
            d = p.bScrollOversize;
        (n = b.style.width) && -1 !== n.indexOf("%") && (l = n);
        for (n = 0; n < i.length; n++) o = c[i[n]], null !== o.sWidth && (o.sWidth = Eb(o.sWidthOrig, k), t = !0);
        if (d ||
            !t && !f && !e && j == V(a) && j == m.length)
            for (n = 0; n < j; n++) i = aa(a, n), null !== i && (c[i].sWidth = v(m.eq(n).width()));
        else {
            j = h(b).clone().css("visibility", "hidden").removeAttr("id");
            j.find("tbody tr").remove();
            var s = h("<tr/>").appendTo(j.find("tbody"));
            j.find("thead, tfoot").remove();
            j.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone());
            j.find("tfoot th, tfoot td").css("width", "");
            m = ra(a, j.find("thead")[0]);
            for (n = 0; n < i.length; n++) o = c[i[n]], m[n].style.width = null !== o.sWidthOrig && "" !== o.sWidthOrig ? v(o.sWidthOrig) :
                "", o.sWidthOrig && f && h(m[n]).append(h("<div/>").css({
                    width: o.sWidthOrig,
                    margin: 0,
                    padding: 0,
                    border: 0,
                    height: 1
                }));
            if (a.aoData.length)
                for (n = 0; n < i.length; n++) t = i[n], o = c[t], h(Fb(a, t)).clone(!1).append(o.sContentPadding).appendTo(s);
            h("[name]", j).removeAttr("name");
            o = h("<div/>").css(f || e ? {
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                right: 0,
                overflow: "hidden"
            } : {}).append(j).appendTo(k);
            f && g ? j.width(g) : f ? (j.css("width", "auto"), j.removeAttr("width"), j.width() < k.clientWidth && l && j.width(k.clientWidth)) : e ? j.width(k.clientWidth) :
                l && j.width(l);
            for (n = e = 0; n < i.length; n++) k = h(m[n]), g = k.outerWidth() - k.width(), k = p.bBounding ? Math.ceil(m[n].getBoundingClientRect().width) : k.outerWidth(), e += k, c[i[n]].sWidth = v(k - g);
            b.style.width = v(e);
            o.remove()
        }
        l && (b.style.width = v(l));
        if ((l || f) && !a._reszEvt) b = function() {
            h(E).on("resize.DT-" + a.sInstance, Oa(function() {
                $(a)
            }))
        }, d ? setTimeout(b, 1E3) : b(), a._reszEvt = !0
    }

    function Eb(a, b) {
        if (!a) return 0;
        var c = h("<div/>").css("width", v(a)).appendTo(b || H.body),
            d = c[0].offsetWidth;
        c.remove();
        return d
    }

    function Fb(a,
        b) {
        var c = Gb(a, b);
        if (0 > c) return null;
        var d = a.aoData[c];
        return !d.nTr ? h("<td/>").html(B(a, c, b, "display"))[0] : d.anCells[b]
    }

    function Gb(a, b) {
        for (var c, d = -1, e = -1, f = 0, g = a.aoData.length; f < g; f++) c = B(a, f, b, "display") + "", c = c.replace(Yb, ""), c = c.replace(/&nbsp;/g, " "), c.length > d && (d = c.length, e = f);
        return e
    }

    function v(a) {
        return null === a ? "0px" : "number" == typeof a ? 0 > a ? "0px" : a + "px" : a.match(/\d$/) ? a + "px" : a
    }

    function X(a) {
        var b, c, d = [],
            e = a.aoColumns,
            f, g, j, i;
        b = a.aaSortingFixed;
        c = h.isPlainObject(b);
        var m = [];
        f = function(a) {
            a.length &&
                !h.isArray(a[0]) ? m.push(a) : h.merge(m, a)
        };
        h.isArray(b) && f(b);
        c && b.pre && f(b.pre);
        f(a.aaSorting);
        c && b.post && f(b.post);
        for (a = 0; a < m.length; a++) {
            i = m[a][0];
            f = e[i].aDataSort;
            b = 0;
            for (c = f.length; b < c; b++) g = f[b], j = e[g].sType || "string", m[a]._idx === k && (m[a]._idx = h.inArray(m[a][1], e[g].asSorting)), d.push({
                src: i,
                col: g,
                dir: m[a][1],
                index: m[a]._idx,
                type: j,
                formatter: n.ext.type.order[j + "-pre"]
            })
        }
        return d
    }

    function mb(a) {
        var b, c, d = [],
            e = n.ext.type.order,
            f = a.aoData,
            g = 0,
            j, i = a.aiDisplayMaster,
            h;
        Ga(a);
        h = X(a);
        b = 0;
        for (c = h.length; b <
            c; b++) j = h[b], j.formatter && g++, Hb(a, j.col);
        if ("ssp" != y(a) && 0 !== h.length) {
            b = 0;
            for (c = i.length; b < c; b++) d[i[b]] = b;
            g === h.length ? i.sort(function(a, b) {
                var c, e, g, j, i = h.length,
                    k = f[a]._aSortData,
                    n = f[b]._aSortData;
                for (g = 0; g < i; g++)
                    if (j = h[g], c = k[j.col], e = n[j.col], c = c < e ? -1 : c > e ? 1 : 0, 0 !== c) return "asc" === j.dir ? c : -c;
                c = d[a];
                e = d[b];
                return c < e ? -1 : c > e ? 1 : 0
            }) : i.sort(function(a, b) {
                var c, g, j, i, k = h.length,
                    n = f[a]._aSortData,
                    o = f[b]._aSortData;
                for (j = 0; j < k; j++)
                    if (i = h[j], c = n[i.col], g = o[i.col], i = e[i.type + "-" + i.dir] || e["string-" + i.dir],
                        c = i(c, g), 0 !== c) return c;
                c = d[a];
                g = d[b];
                return c < g ? -1 : c > g ? 1 : 0
            })
        }
        a.bSorted = !0
    }

    function Ib(a) {
        for (var b, c, d = a.aoColumns, e = X(a), a = a.oLanguage.oAria, f = 0, g = d.length; f < g; f++) {
            c = d[f];
            var j = c.asSorting;
            b = c.sTitle.replace(/<.*?>/g, "");
            var i = c.nTh;
            i.removeAttribute("aria-sort");
            c.bSortable && (0 < e.length && e[0].col == f ? (i.setAttribute("aria-sort", "asc" == e[0].dir ? "ascending" : "descending"), c = j[e[0].index + 1] || j[0]) : c = j[0], b += "asc" === c ? a.sSortAscending : a.sSortDescending);
            i.setAttribute("aria-label", b)
        }
    }

    function Va(a,
        b, c, d) {
        var e = a.aaSorting,
            f = a.aoColumns[b].asSorting,
            g = function(a, b) {
                var c = a._idx;
                c === k && (c = h.inArray(a[1], f));
                return c + 1 < f.length ? c + 1 : b ? null : 0
            };
        "number" === typeof e[0] && (e = a.aaSorting = [e]);
        c && a.oFeatures.bSortMulti ? (c = h.inArray(b, D(e, "0")), -1 !== c ? (b = g(e[c], !0), null === b && 1 === e.length && (b = 0), null === b ? e.splice(c, 1) : (e[c][1] = f[b], e[c]._idx = b)) : (e.push([b, f[0], 0]), e[e.length - 1]._idx = 0)) : e.length && e[0][0] == b ? (b = g(e[0]), e.length = 1, e[0][1] = f[b], e[0]._idx = b) : (e.length = 0, e.push([b, f[0]]), e[0]._idx = 0);
        T(a);
        "function" ==
        typeof d && d(a)
    }

    function Ma(a, b, c, d) {
        var e = a.aoColumns[c];
        Wa(b, {}, function(b) {
            !1 !== e.bSortable && (a.oFeatures.bProcessing ? (C(a, !0), setTimeout(function() {
                Va(a, c, b.shiftKey, d);
                "ssp" !== y(a) && C(a, !1)
            }, 0)) : Va(a, c, b.shiftKey, d))
        })
    }

    function wa(a) {
        var b = a.aLastSort,
            c = a.oClasses.sSortColumn,
            d = X(a),
            e = a.oFeatures,
            f, g;
        if (e.bSort && e.bSortClasses) {
            e = 0;
            for (f = b.length; e < f; e++) g = b[e].src, h(D(a.aoData, "anCells", g)).removeClass(c + (2 > e ? e + 1 : 3));
            e = 0;
            for (f = d.length; e < f; e++) g = d[e].src, h(D(a.aoData, "anCells", g)).addClass(c +
                (2 > e ? e + 1 : 3))
        }
        a.aLastSort = d
    }

    function Hb(a, b) {
        var c = a.aoColumns[b],
            d = n.ext.order[c.sSortDataType],
            e;
        d && (e = d.call(a.oInstance, a, b, ba(a, b)));
        for (var f, g = n.ext.type.order[c.sType + "-pre"], j = 0, i = a.aoData.length; j < i; j++)
            if (c = a.aoData[j], c._aSortData || (c._aSortData = []), !c._aSortData[b] || d) f = d ? e[j] : B(a, j, b, "sort"), c._aSortData[b] = g ? g(f) : f
    }

    function xa(a) {
        if (a.oFeatures.bStateSave && !a.bDestroying) {
            var b = {
                time: +new Date,
                start: a._iDisplayStart,
                length: a._iDisplayLength,
                order: h.extend(!0, [], a.aaSorting),
                search: Ab(a.oPreviousSearch),
                columns: h.map(a.aoColumns, function(b, d) {
                    return {
                        visible: b.bVisible,
                        search: Ab(a.aoPreSearchCols[d])
                    }
                })
            };
            r(a, "aoStateSaveParams", "stateSaveParams", [a, b]);
            a.oSavedState = b;
            a.fnStateSaveCallback.call(a.oInstance, a, b)
        }
    }

    function Jb(a, b, c) {
        var d, e, f = a.aoColumns,
            b = function(b) {
                if (b && b.time) {
                    var g = r(a, "aoStateLoadParams", "stateLoadParams", [a, b]);
                    if (-1 === h.inArray(!1, g) && (g = a.iStateDuration, !(0 < g && b.time < +new Date - 1E3 * g) && !(b.columns && f.length !== b.columns.length))) {
                        a.oLoadedState = h.extend(!0, {}, b);
                        b.start !== k &&
                            (a._iDisplayStart = b.start, a.iInitDisplayStart = b.start);
                        b.length !== k && (a._iDisplayLength = b.length);
                        b.order !== k && (a.aaSorting = [], h.each(b.order, function(b, c) {
                            a.aaSorting.push(c[0] >= f.length ? [0, c[1]] : c)
                        }));
                        b.search !== k && h.extend(a.oPreviousSearch, Bb(b.search));
                        if (b.columns) {
                            d = 0;
                            for (e = b.columns.length; d < e; d++) g = b.columns[d], g.visible !== k && (f[d].bVisible = g.visible), g.search !== k && h.extend(a.aoPreSearchCols[d], Bb(g.search))
                        }
                        r(a, "aoStateLoaded", "stateLoaded", [a, b])
                    }
                }
                c()
            };
        if (a.oFeatures.bStateSave) {
            var g =
                a.fnStateLoadCallback.call(a.oInstance, a, b);
            g !== k && b(g)
        } else c()
    }

    function ya(a) {
        var b = n.settings,
            a = h.inArray(a, D(b, "nTable"));
        return -1 !== a ? b[a] : null
    }

    function K(a, b, c, d) {
        c = "DataTables warning: " + (a ? "table id=" + a.sTableId + " - " : "") + c;
        d && (c += ". For more information about this error, please see http://datatables.net/tn/" + d);
        if (b) E.console && console.log && console.log(c);
        else if (b = n.ext, b = b.sErrMode || b.errMode, a && r(a, null, "error", [a, d, c]), "alert" == b) alert(c);
        else {
            if ("throw" == b) throw Error(c);
            "function" ==
            typeof b && b(a, d, c)
        }
    }

    function F(a, b, c, d) {
        h.isArray(c) ? h.each(c, function(c, d) {
            h.isArray(d) ? F(a, b, d[0], d[1]) : F(a, b, d)
        }) : (d === k && (d = c), b[c] !== k && (a[d] = b[c]))
    }

    function Xa(a, b, c) {
        var d, e;
        for (e in b) b.hasOwnProperty(e) && (d = b[e], h.isPlainObject(d) ? (h.isPlainObject(a[e]) || (a[e] = {}), h.extend(!0, a[e], d)) : a[e] = c && "data" !== e && "aaData" !== e && h.isArray(d) ? d.slice() : d);
        return a
    }

    function Wa(a, b, c) {
        h(a).on("click.DT", b, function(b) {
            h(a).blur();
            c(b)
        }).on("keypress.DT", b, function(a) {
            13 === a.which && (a.preventDefault(), c(a))
        }).on("selectstart.DT",
            function() {
                return !1
            })
    }

    function z(a, b, c, d) {
        c && a[b].push({
            fn: c,
            sName: d
        })
    }

    function r(a, b, c, d) {
        var e = [];
        b && (e = h.map(a[b].slice().reverse(), function(b) {
            return b.fn.apply(a.oInstance, d)
        }));
        null !== c && (b = h.Event(c + ".dt"), h(a.nTable).trigger(b, d), e.push(b.result));
        return e
    }

    function Sa(a) {
        var b = a._iDisplayStart,
            c = a.fnDisplayEnd(),
            d = a._iDisplayLength;
        b >= c && (b = c - d);
        b -= b % d;
        if (-1 === d || 0 > b) b = 0;
        a._iDisplayStart = b
    }

    function Na(a, b) {
        var c = a.renderer,
            d = n.ext.renderer[b];
        return h.isPlainObject(c) && c[b] ? d[c[b]] || d._ : "string" ===
            typeof c ? d[c] || d._ : d._
    }

    function y(a) {
        return a.oFeatures.bServerSide ? "ssp" : a.ajax || a.sAjaxSource ? "ajax" : "dom"
    }

    function ia(a, b) {
        var c = [],
            c = Kb.numbers_length,
            d = Math.floor(c / 2);
        b <= c ? c = Y(0, b) : a <= d ? (c = Y(0, c - 2), c.push("ellipsis"), c.push(b - 1)) : (a >= b - 1 - d ? c = Y(b - (c - 2), b) : (c = Y(a - d + 2, a + d - 1), c.push("ellipsis"), c.push(b - 1)), c.splice(0, 0, "ellipsis"), c.splice(0, 0, 0));
        c.DT_el = "span";
        return c
    }

    function Da(a) {
        h.each({
            num: function(b) {
                return za(b, a)
            },
            "num-fmt": function(b) {
                return za(b, a, Ya)
            },
            "html-num": function(b) {
                return za(b,
                    a, Aa)
            },
            "html-num-fmt": function(b) {
                return za(b, a, Aa, Ya)
            }
        }, function(b, c) {
            x.type.order[b + a + "-pre"] = c;
            b.match(/^html\-/) && (x.type.search[b + a] = x.type.search.html)
        })
    }

    function Lb(a) {
        return function() {
            var b = [ya(this[n.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
            return n.ext.internal[a].apply(this, b)
        }
    }
    var n = function(a) {
            this.$ = function(a, b) {
                return this.api(!0).$(a, b)
            };
            this._ = function(a, b) {
                return this.api(!0).rows(a, b).data()
            };
            this.api = function(a) {
                return a ? new s(ya(this[x.iApiIndex])) : new s(this)
            };
            this.fnAddData = function(a, b) {
                var c = this.api(!0),
                    d = h.isArray(a) && (h.isArray(a[0]) || h.isPlainObject(a[0])) ? c.rows.add(a) : c.row.add(a);
                (b === k || b) && c.draw();
                return d.flatten().toArray()
            };
            this.fnAdjustColumnSizing = function(a) {
                var b = this.api(!0).columns.adjust(),
                    c = b.settings()[0],
                    d = c.oScroll;
                a === k || a ? b.draw(!1) : ("" !== d.sX || "" !== d.sY) && la(c)
            };
            this.fnClearTable = function(a) {
                var b = this.api(!0).clear();
                (a === k || a) && b.draw()
            };
            this.fnClose = function(a) {
                this.api(!0).row(a).child.hide()
            };
            this.fnDeleteRow = function(a,
                b, c) {
                var d = this.api(!0),
                    a = d.rows(a),
                    e = a.settings()[0],
                    h = e.aoData[a[0][0]];
                a.remove();
                b && b.call(this, e, h);
                (c === k || c) && d.draw();
                return h
            };
            this.fnDestroy = function(a) {
                this.api(!0).destroy(a)
            };
            this.fnDraw = function(a) {
                this.api(!0).draw(a)
            };
            this.fnFilter = function(a, b, c, d, e, h) {
                e = this.api(!0);
                null === b || b === k ? e.search(a, c, d, h) : e.column(b).search(a, c, d, h);
                e.draw()
            };
            this.fnGetData = function(a, b) {
                var c = this.api(!0);
                if (a !== k) {
                    var d = a.nodeName ? a.nodeName.toLowerCase() : "";
                    return b !== k || "td" == d || "th" == d ? c.cell(a, b).data() :
                        c.row(a).data() || null
                }
                return c.data().toArray()
            };
            this.fnGetNodes = function(a) {
                var b = this.api(!0);
                return a !== k ? b.row(a).node() : b.rows().nodes().flatten().toArray()
            };
            this.fnGetPosition = function(a) {
                var b = this.api(!0),
                    c = a.nodeName.toUpperCase();
                return "TR" == c ? b.row(a).index() : "TD" == c || "TH" == c ? (a = b.cell(a).index(), [a.row, a.columnVisible, a.column]) : null
            };
            this.fnIsOpen = function(a) {
                return this.api(!0).row(a).child.isShown()
            };
            this.fnOpen = function(a, b, c) {
                return this.api(!0).row(a).child(b, c).show().child()[0]
            };
            this.fnPageChange = function(a, b) {
                var c = this.api(!0).page(a);
                (b === k || b) && c.draw(!1)
            };
            this.fnSetColumnVis = function(a, b, c) {
                a = this.api(!0).column(a).visible(b);
                (c === k || c) && a.columns.adjust().draw()
            };
            this.fnSettings = function() {
                return ya(this[x.iApiIndex])
            };
            this.fnSort = function(a) {
                this.api(!0).order(a).draw()
            };
            this.fnSortListener = function(a, b, c) {
                this.api(!0).order.listener(a, b, c)
            };
            this.fnUpdate = function(a, b, c, d, e) {
                var h = this.api(!0);
                c === k || null === c ? h.row(b).data(a) : h.cell(b, c).data(a);
                (e === k || e) && h.columns.adjust();
                (d === k || d) && h.draw();
                return 0
            };
            this.fnVersionCheck = x.fnVersionCheck;
            var b = this,
                c = a === k,
                d = this.length;
            c && (a = {});
            this.oApi = this.internal = x.internal;
            for (var e in n.ext.internal) e && (this[e] = Lb(e));
            this.each(function() {
                var e = {},
                    g = 1 < d ? Xa(e, a, !0) : a,
                    j = 0,
                    i, e = this.getAttribute("id"),
                    m = !1,
                    l = n.defaults,
                    q = h(this);
                if ("table" != this.nodeName.toLowerCase()) K(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                else {
                    eb(l);
                    fb(l.column);
                    J(l, l, !0);
                    J(l.column, l.column, !0);
                    J(l, h.extend(g, q.data()));
                    var t = n.settings,
                        j = 0;
                    for (i = t.length; j < i; j++) {
                        var o = t[j];
                        if (o.nTable == this || o.nTHead && o.nTHead.parentNode == this || o.nTFoot && o.nTFoot.parentNode == this) {
                            var s = g.bRetrieve !== k ? g.bRetrieve : l.bRetrieve;
                            if (c || s) return o.oInstance;
                            if (g.bDestroy !== k ? g.bDestroy : l.bDestroy) {
                                o.oInstance.fnDestroy();
                                break
                            } else {
                                K(o, 0, "Cannot reinitialise DataTable", 3);
                                return
                            }
                        }
                        if (o.sTableId == this.id) {
                            t.splice(j, 1);
                            break
                        }
                    }
                    if (null === e || "" === e) this.id = e = "DataTables_Table_" + n.ext._unique++;
                    var p = h.extend(!0, {}, n.models.oSettings, {
                        sDestroyWidth: q[0].style.width,
                        sInstance: e,
                        sTableId: e
                    });
                    p.nTable = this;
                    p.oApi = b.internal;
                    p.oInit = g;
                    t.push(p);
                    p.oInstance = 1 === b.length ? b : q.dataTable();
                    eb(g);
                    Ca(g.oLanguage);
                    g.aLengthMenu && !g.iDisplayLength && (g.iDisplayLength = h.isArray(g.aLengthMenu[0]) ? g.aLengthMenu[0][0] : g.aLengthMenu[0]);
                    g = Xa(h.extend(!0, {}, l), g);
                    F(p.oFeatures, g, "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));
                    F(p, g, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod",
                        "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"],
                        ["oSearch", "oPreviousSearch"],
                        ["aoSearchCols", "aoPreSearchCols"],
                        ["iDisplayLength", "_iDisplayLength"]
                    ]);
                    F(p.oScroll, g, [
                        ["sScrollX", "sX"],
                        ["sScrollXInner", "sXInner"],
                        ["sScrollY", "sY"],
                        ["bScrollCollapse", "bCollapse"]
                    ]);
                    F(p.oLanguage, g, "fnInfoCallback");
                    z(p, "aoDrawCallback", g.fnDrawCallback, "user");
                    z(p, "aoServerParams", g.fnServerParams, "user");
                    z(p, "aoStateSaveParams", g.fnStateSaveParams, "user");
                    z(p, "aoStateLoadParams", g.fnStateLoadParams, "user");
                    z(p, "aoStateLoaded", g.fnStateLoaded, "user");
                    z(p, "aoRowCallback", g.fnRowCallback, "user");
                    z(p, "aoRowCreatedCallback", g.fnCreatedRow, "user");
                    z(p, "aoHeaderCallback", g.fnHeaderCallback, "user");
                    z(p, "aoFooterCallback", g.fnFooterCallback, "user");
                    z(p, "aoInitComplete", g.fnInitComplete, "user");
                    z(p, "aoPreDrawCallback",
                        g.fnPreDrawCallback, "user");
                    p.rowIdFn = S(g.rowId);
                    gb(p);
                    var u = p.oClasses;
                    h.extend(u, n.ext.classes, g.oClasses);
                    q.addClass(u.sTable);
                    p.iInitDisplayStart === k && (p.iInitDisplayStart = g.iDisplayStart, p._iDisplayStart = g.iDisplayStart);
                    null !== g.iDeferLoading && (p.bDeferLoading = !0, e = h.isArray(g.iDeferLoading), p._iRecordsDisplay = e ? g.iDeferLoading[0] : g.iDeferLoading, p._iRecordsTotal = e ? g.iDeferLoading[1] : g.iDeferLoading);
                    var v = p.oLanguage;
                    h.extend(!0, v, g.oLanguage);
                    v.sUrl && (h.ajax({
                        dataType: "json",
                        url: v.sUrl,
                        success: function(a) {
                            Ca(a);
                            J(l.oLanguage, a);
                            h.extend(true, v, a);
                            ha(p)
                        },
                        error: function() {
                            ha(p)
                        }
                    }), m = !0);
                    null === g.asStripeClasses && (p.asStripeClasses = [u.sStripeOdd, u.sStripeEven]);
                    var e = p.asStripeClasses,
                        x = q.children("tbody").find("tr").eq(0); - 1 !== h.inArray(!0, h.map(e, function(a) {
                        return x.hasClass(a)
                    })) && (h("tbody tr", this).removeClass(e.join(" ")), p.asDestroyStripes = e.slice());
                    e = [];
                    t = this.getElementsByTagName("thead");
                    0 !== t.length && (ea(p.aoHeader, t[0]), e = ra(p));
                    if (null === g.aoColumns) {
                        t = [];
                        j = 0;
                        for (i = e.length; j < i; j++) t.push(null)
                    } else t =
                        g.aoColumns;
                    j = 0;
                    for (i = t.length; j < i; j++) Ea(p, e ? e[j] : null);
                    ib(p, g.aoColumnDefs, t, function(a, b) {
                        ka(p, a, b)
                    });
                    if (x.length) {
                        var w = function(a, b) {
                            return a.getAttribute("data-" + b) !== null ? b : null
                        };
                        h(x[0]).children("th, td").each(function(a, b) {
                            var c = p.aoColumns[a];
                            if (c.mData === a) {
                                var d = w(b, "sort") || w(b, "order"),
                                    e = w(b, "filter") || w(b, "search");
                                if (d !== null || e !== null) {
                                    c.mData = {
                                        _: a + ".display",
                                        sort: d !== null ? a + ".@data-" + d : k,
                                        type: d !== null ? a + ".@data-" + d : k,
                                        filter: e !== null ? a + ".@data-" + e : k
                                    };
                                    ka(p, a)
                                }
                            }
                        })
                    }
                    var U = p.oFeatures,
                        e = function() {
                            if (g.aaSorting === k) {
                                var a = p.aaSorting;
                                j = 0;
                                for (i = a.length; j < i; j++) a[j][1] = p.aoColumns[j].asSorting[0]
                            }
                            wa(p);
                            U.bSort && z(p, "aoDrawCallback", function() {
                                if (p.bSorted) {
                                    var a = X(p),
                                        b = {};
                                    h.each(a, function(a, c) {
                                        b[c.src] = c.dir
                                    });
                                    r(p, null, "order", [p, a, b]);
                                    Ib(p)
                                }
                            });
                            z(p, "aoDrawCallback", function() {
                                (p.bSorted || y(p) === "ssp" || U.bDeferRender) && wa(p)
                            }, "sc");
                            var a = q.children("caption").each(function() {
                                    this._captionSide = h(this).css("caption-side")
                                }),
                                b = q.children("thead");
                            b.length === 0 && (b = h("<thead/>").appendTo(q));
                            p.nTHead = b[0];
                            b = q.children("tbody");
                            b.length === 0 && (b = h("<tbody/>").appendTo(q));
                            p.nTBody = b[0];
                            b = q.children("tfoot");
                            if (b.length === 0 && a.length > 0 && (p.oScroll.sX !== "" || p.oScroll.sY !== "")) b = h("<tfoot/>").appendTo(q);
                            if (b.length === 0 || b.children().length === 0) q.addClass(u.sNoFooter);
                            else if (b.length > 0) {
                                p.nTFoot = b[0];
                                ea(p.aoFooter, p.nTFoot)
                            }
                            if (g.aaData)
                                for (j = 0; j < g.aaData.length; j++) O(p, g.aaData[j]);
                            else(p.bDeferLoading || y(p) == "dom") && na(p, h(p.nTBody).children("tr"));
                            p.aiDisplay = p.aiDisplayMaster.slice();
                            p.bInitialised = true;
                            m === false && ha(p)
                        };
                    g.bStateSave ? (U.bStateSave = !0, z(p, "aoDrawCallback", xa, "state_save"), Jb(p, g, e)) : e()
                }
            });
            b = null;
            return this
        },
        x, s, o, u, Za = {},
        Mb = /[\r\n]/g,
        Aa = /<.*?>/g,
        Zb = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
        $b = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"),
        Ya = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,
        M = function(a) {
            return !a || !0 === a || "-" === a ? !0 : !1
        },
        Nb = function(a) {
            var b = parseInt(a, 10);
            return !isNaN(b) &&
                isFinite(a) ? b : null
        },
        Ob = function(a, b) {
            Za[b] || (Za[b] = RegExp(Qa(b), "g"));
            return "string" === typeof a && "." !== b ? a.replace(/\./g, "").replace(Za[b], ".") : a
        },
        $a = function(a, b, c) {
            var d = "string" === typeof a;
            if (M(a)) return !0;
            b && d && (a = Ob(a, b));
            c && d && (a = a.replace(Ya, ""));
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        Pb = function(a, b, c) {
            return M(a) ? !0 : !(M(a) || "string" === typeof a) ? null : $a(a.replace(Aa, ""), b, c) ? !0 : null
        },
        D = function(a, b, c) {
            var d = [],
                e = 0,
                f = a.length;
            if (c !== k)
                for (; e < f; e++) a[e] && a[e][b] && d.push(a[e][b][c]);
            else
                for (; e <
                    f; e++) a[e] && d.push(a[e][b]);
            return d
        },
        ja = function(a, b, c, d) {
            var e = [],
                f = 0,
                g = b.length;
            if (d !== k)
                for (; f < g; f++) a[b[f]][c] && e.push(a[b[f]][c][d]);
            else
                for (; f < g; f++) e.push(a[b[f]][c]);
            return e
        },
        Y = function(a, b) {
            var c = [],
                d;
            b === k ? (b = 0, d = a) : (d = b, b = a);
            for (var e = b; e < d; e++) c.push(e);
            return c
        },
        Qb = function(a) {
            for (var b = [], c = 0, d = a.length; c < d; c++) a[c] && b.push(a[c]);
            return b
        },
        qa = function(a) {
            var b;
            a: {
                if (!(2 > a.length)) {
                    b = a.slice().sort();
                    for (var c = b[0], d = 1, e = b.length; d < e; d++) {
                        if (b[d] === c) {
                            b = !1;
                            break a
                        }
                        c = b[d]
                    }
                }
                b = !0
            }
            if (b) return a.slice();
            b = [];
            var e = a.length,
                f, g = 0,
                d = 0;
            a: for (; d < e; d++) {
                c = a[d];
                for (f = 0; f < g; f++)
                    if (b[f] === c) continue a;
                b.push(c);
                g++
            }
            return b
        };
    n.util = {
        throttle: function(a, b) {
            var c = b !== k ? b : 200,
                d, e;
            return function() {
                var b = this,
                    g = +new Date,
                    j = arguments;
                d && g < d + c ? (clearTimeout(e), e = setTimeout(function() {
                    d = k;
                    a.apply(b, j)
                }, c)) : (d = g, a.apply(b, j))
            }
        },
        escapeRegex: function(a) {
            return a.replace($b, "\\$1")
        }
    };
    var A = function(a, b, c) {
            a[b] !== k && (a[c] = a[b])
        },
        ca = /\[.*?\]$/,
        W = /\(\)$/,
        Qa = n.util.escapeRegex,
        va = h("<div>")[0],
        Wb = va.textContent !== k,
        Yb =
        /<.*?>/g,
        Oa = n.util.throttle,
        Rb = [],
        w = Array.prototype,
        ac = function(a) {
            var b, c, d = n.settings,
                e = h.map(d, function(a) {
                    return a.nTable
                });
            if (a) {
                if (a.nTable && a.oApi) return [a];
                if (a.nodeName && "table" === a.nodeName.toLowerCase()) return b = h.inArray(a, e), -1 !== b ? [d[b]] : null;
                if (a && "function" === typeof a.settings) return a.settings().toArray();
                "string" === typeof a ? c = h(a) : a instanceof h && (c = a)
            } else return [];
            if (c) return c.map(function() {
                b = h.inArray(this, e);
                return -1 !== b ? d[b] : null
            }).toArray()
        };
    s = function(a, b) {
        if (!(this instanceof s)) return new s(a, b);
        var c = [],
            d = function(a) {
                (a = ac(a)) && (c = c.concat(a))
            };
        if (h.isArray(a))
            for (var e = 0, f = a.length; e < f; e++) d(a[e]);
        else d(a);
        this.context = qa(c);
        b && h.merge(this, b);
        this.selector = {
            rows: null,
            cols: null,
            opts: null
        };
        s.extend(this, this, Rb)
    };
    n.Api = s;
    h.extend(s.prototype, {
        any: function() {
            return 0 !== this.count()
        },
        concat: w.concat,
        context: [],
        count: function() {
            return this.flatten().length
        },
        each: function(a) {
            for (var b = 0, c = this.length; b < c; b++) a.call(this, this[b], b, this);
            return this
        },
        eq: function(a) {
            var b =
                this.context;
            return b.length > a ? new s(b[a], this[a]) : null
        },
        filter: function(a) {
            var b = [];
            if (w.filter) b = w.filter.call(this, a, this);
            else
                for (var c = 0, d = this.length; c < d; c++) a.call(this, this[c], c, this) && b.push(this[c]);
            return new s(this.context, b)
        },
        flatten: function() {
            var a = [];
            return new s(this.context, a.concat.apply(a, this.toArray()))
        },
        join: w.join,
        indexOf: w.indexOf || function(a, b) {
            for (var c = b || 0, d = this.length; c < d; c++)
                if (this[c] === a) return c;
            return -1
        },
        iterator: function(a, b, c, d) {
            var e = [],
                f, g, j, h, m, l = this.context,
                n, o, u = this.selector;
            "string" === typeof a && (d = c, c = b, b = a, a = !1);
            g = 0;
            for (j = l.length; g < j; g++) {
                var r = new s(l[g]);
                if ("table" === b) f = c.call(r, l[g], g), f !== k && e.push(f);
                else if ("columns" === b || "rows" === b) f = c.call(r, l[g], this[g], g), f !== k && e.push(f);
                else if ("column" === b || "column-rows" === b || "row" === b || "cell" === b) {
                    o = this[g];
                    "column-rows" === b && (n = Ba(l[g], u.opts));
                    h = 0;
                    for (m = o.length; h < m; h++) f = o[h], f = "cell" === b ? c.call(r, l[g], f.row, f.column, g, h) : c.call(r, l[g], f, g, h, n), f !== k && e.push(f)
                }
            }
            return e.length || d ? (a = new s(l, a ?
                e.concat.apply([], e) : e), b = a.selector, b.rows = u.rows, b.cols = u.cols, b.opts = u.opts, a) : this
        },
        lastIndexOf: w.lastIndexOf || function(a, b) {
            return this.indexOf.apply(this.toArray.reverse(), arguments)
        },
        length: 0,
        map: function(a) {
            var b = [];
            if (w.map) b = w.map.call(this, a, this);
            else
                for (var c = 0, d = this.length; c < d; c++) b.push(a.call(this, this[c], c));
            return new s(this.context, b)
        },
        pluck: function(a) {
            return this.map(function(b) {
                return b[a]
            })
        },
        pop: w.pop,
        push: w.push,
        reduce: w.reduce || function(a, b) {
            return hb(this, a, b, 0, this.length,
                1)
        },
        reduceRight: w.reduceRight || function(a, b) {
            return hb(this, a, b, this.length - 1, -1, -1)
        },
        reverse: w.reverse,
        selector: null,
        shift: w.shift,
        slice: function() {
            return new s(this.context, this)
        },
        sort: w.sort,
        splice: w.splice,
        toArray: function() {
            return w.slice.call(this)
        },
        to$: function() {
            return h(this)
        },
        toJQuery: function() {
            return h(this)
        },
        unique: function() {
            return new s(this.context, qa(this))
        },
        unshift: w.unshift
    });
    s.extend = function(a, b, c) {
        if (c.length && b && (b instanceof s || b.__dt_wrapper)) {
            var d, e, f, g = function(a, b, c) {
                return function() {
                    var d =
                        b.apply(a, arguments);
                    s.extend(d, d, c.methodExt);
                    return d
                }
            };
            d = 0;
            for (e = c.length; d < e; d++) f = c[d], b[f.name] = "function" === typeof f.val ? g(a, f.val, f) : h.isPlainObject(f.val) ? {} : f.val, b[f.name].__dt_wrapper = !0, s.extend(a, b[f.name], f.propExt)
        }
    };
    s.register = o = function(a, b) {
        if (h.isArray(a))
            for (var c = 0, d = a.length; c < d; c++) s.register(a[c], b);
        else
            for (var e = a.split("."), f = Rb, g, j, c = 0, d = e.length; c < d; c++) {
                g = (j = -1 !== e[c].indexOf("()")) ? e[c].replace("()", "") : e[c];
                var i;
                a: {
                    i = 0;
                    for (var m = f.length; i < m; i++)
                        if (f[i].name === g) {
                            i =
                                f[i];
                            break a
                        }
                    i = null
                }
                i || (i = {
                    name: g,
                    val: {},
                    methodExt: [],
                    propExt: []
                }, f.push(i));
                c === d - 1 ? i.val = b : f = j ? i.methodExt : i.propExt
            }
    };
    s.registerPlural = u = function(a, b, c) {
        s.register(a, c);
        s.register(b, function() {
            var a = c.apply(this, arguments);
            return a === this ? this : a instanceof s ? a.length ? h.isArray(a[0]) ? new s(a.context, a[0]) : a[0] : k : a
        })
    };
    o("tables()", function(a) {
        var b;
        if (a) {
            b = s;
            var c = this.context;
            if ("number" === typeof a) a = [c[a]];
            else var d = h.map(c, function(a) {
                    return a.nTable
                }),
                a = h(d).filter(a).map(function() {
                    var a = h.inArray(this,
                        d);
                    return c[a]
                }).toArray();
            b = new b(a)
        } else b = this;
        return b
    });
    o("table()", function(a) {
        var a = this.tables(a),
            b = a.context;
        return b.length ? new s(b[0]) : a
    });
    u("tables().nodes()", "table().node()", function() {
        return this.iterator("table", function(a) {
            return a.nTable
        }, 1)
    });
    u("tables().body()", "table().body()", function() {
        return this.iterator("table", function(a) {
            return a.nTBody
        }, 1)
    });
    u("tables().header()", "table().header()", function() {
        return this.iterator("table", function(a) {
            return a.nTHead
        }, 1)
    });
    u("tables().footer()",
        "table().footer()",
        function() {
            return this.iterator("table", function(a) {
                return a.nTFoot
            }, 1)
        });
    u("tables().containers()", "table().container()", function() {
        return this.iterator("table", function(a) {
            return a.nTableWrapper
        }, 1)
    });
    o("draw()", function(a) {
        return this.iterator("table", function(b) {
            "page" === a ? P(b) : ("string" === typeof a && (a = "full-hold" === a ? !1 : !0), T(b, !1 === a))
        })
    });
    o("page()", function(a) {
        return a === k ? this.page.info().page : this.iterator("table", function(b) {
            Ta(b, a)
        })
    });
    o("page.info()", function() {
        if (0 ===
            this.context.length) return k;
        var a = this.context[0],
            b = a._iDisplayStart,
            c = a.oFeatures.bPaginate ? a._iDisplayLength : -1,
            d = a.fnRecordsDisplay(),
            e = -1 === c;
        return {
            page: e ? 0 : Math.floor(b / c),
            pages: e ? 1 : Math.ceil(d / c),
            start: b,
            end: a.fnDisplayEnd(),
            length: c,
            recordsTotal: a.fnRecordsTotal(),
            recordsDisplay: d,
            serverSide: "ssp" === y(a)
        }
    });
    o("page.len()", function(a) {
        return a === k ? 0 !== this.context.length ? this.context[0]._iDisplayLength : k : this.iterator("table", function(b) {
            Ra(b, a)
        })
    });
    var Sb = function(a, b, c) {
        if (c) {
            var d = new s(a);
            d.one("draw", function() {
                c(d.ajax.json())
            })
        }
        if ("ssp" == y(a)) T(a, b);
        else {
            C(a, !0);
            var e = a.jqXHR;
            e && 4 !== e.readyState && e.abort();
            sa(a, [], function(c) {
                oa(a);
                for (var c = ta(a, c), d = 0, e = c.length; d < e; d++) O(a, c[d]);
                T(a, b);
                C(a, !1)
            })
        }
    };
    o("ajax.json()", function() {
        var a = this.context;
        if (0 < a.length) return a[0].json
    });
    o("ajax.params()", function() {
        var a = this.context;
        if (0 < a.length) return a[0].oAjaxData
    });
    o("ajax.reload()", function(a, b) {
        return this.iterator("table", function(c) {
            Sb(c, !1 === b, a)
        })
    });
    o("ajax.url()", function(a) {
        var b =
            this.context;
        if (a === k) {
            if (0 === b.length) return k;
            b = b[0];
            return b.ajax ? h.isPlainObject(b.ajax) ? b.ajax.url : b.ajax : b.sAjaxSource
        }
        return this.iterator("table", function(b) {
            h.isPlainObject(b.ajax) ? b.ajax.url = a : b.ajax = a
        })
    });
    o("ajax.url().load()", function(a, b) {
        return this.iterator("table", function(c) {
            Sb(c, !1 === b, a)
        })
    });
    var ab = function(a, b, c, d, e) {
            var f = [],
                g, j, i, m, l, n;
            i = typeof b;
            if (!b || "string" === i || "function" === i || b.length === k) b = [b];
            i = 0;
            for (m = b.length; i < m; i++) {
                j = b[i] && b[i].split && !b[i].match(/[\[\(:]/) ? b[i].split(",") : [b[i]];
                l = 0;
                for (n = j.length; l < n; l++)(g = c("string" === typeof j[l] ? h.trim(j[l]) : j[l])) && g.length && (f = f.concat(g))
            }
            a = x.selector[a];
            if (a.length) {
                i = 0;
                for (m = a.length; i < m; i++) f = a[i](d, e, f)
            }
            return qa(f)
        },
        bb = function(a) {
            a || (a = {});
            a.filter && a.search === k && (a.search = a.filter);
            return h.extend({
                search: "none",
                order: "current",
                page: "all"
            }, a)
        },
        cb = function(a) {
            for (var b = 0, c = a.length; b < c; b++)
                if (0 < a[b].length) return a[0] = a[b], a[0].length = 1, a.length = 1, a.context = [a.context[b]], a;
            a.length = 0;
            return a
        },
        Ba = function(a, b) {
            var c,
                d, e, f = [],
                g = a.aiDisplay;
            e = a.aiDisplayMaster;
            var j = b.search;
            c = b.order;
            d = b.page;
            if ("ssp" == y(a)) return "removed" === j ? [] : Y(0, e.length);
            if ("current" == d) {
                c = a._iDisplayStart;
                for (d = a.fnDisplayEnd(); c < d; c++) f.push(g[c])
            } else if ("current" == c || "applied" == c)
                if ("none" == j) f = e.slice();
                else if ("applied" == j) f = g.slice();
            else {
                if ("removed" == j) {
                    var i = {};
                    c = 0;
                    for (d = g.length; c < d; c++) i[g[c]] = null;
                    f = h.map(e, function(a) {
                        return !i.hasOwnProperty(a) ? a : null
                    })
                }
            } else if ("index" == c || "original" == c) {
                c = 0;
                for (d = a.aoData.length; c < d; c++) "none" ==
                    j ? f.push(c) : (e = h.inArray(c, g), (-1 === e && "removed" == j || 0 <= e && "applied" == j) && f.push(c))
            }
            return f
        };
    o("rows()", function(a, b) {
        a === k ? a = "" : h.isPlainObject(a) && (b = a, a = "");
        var b = bb(b),
            c = this.iterator("table", function(c) {
                var e = b,
                    f;
                return ab("row", a, function(a) {
                    var b = Nb(a),
                        i = c.aoData;
                    if (b !== null && !e) return [b];
                    f || (f = Ba(c, e));
                    if (b !== null && h.inArray(b, f) !== -1) return [b];
                    if (a === null || a === k || a === "") return f;
                    if (typeof a === "function") return h.map(f, function(b) {
                        var c = i[b];
                        return a(b, c._aData, c.nTr) ? b : null
                    });
                    if (a.nodeName) {
                        var b =
                            a._DT_RowIndex,
                            m = a._DT_CellIndex;
                        if (b !== k) return i[b] && i[b].nTr === a ? [b] : [];
                        if (m) return i[m.row] && i[m.row].nTr === a ? [m.row] : [];
                        b = h(a).closest("*[data-dt-row]");
                        return b.length ? [b.data("dt-row")] : []
                    }
                    if (typeof a === "string" && a.charAt(0) === "#") {
                        b = c.aIds[a.replace(/^#/, "")];
                        if (b !== k) return [b.idx]
                    }
                    b = Qb(ja(c.aoData, f, "nTr"));
                    return h(b).filter(a).map(function() {
                        return this._DT_RowIndex
                    }).toArray()
                }, c, e)
            }, 1);
        c.selector.rows = a;
        c.selector.opts = b;
        return c
    });
    o("rows().nodes()", function() {
        return this.iterator("row",
            function(a, b) {
                return a.aoData[b].nTr || k
            }, 1)
    });
    o("rows().data()", function() {
        return this.iterator(!0, "rows", function(a, b) {
            return ja(a.aoData, b, "_aData")
        }, 1)
    });
    u("rows().cache()", "row().cache()", function(a) {
        return this.iterator("row", function(b, c) {
            var d = b.aoData[c];
            return "search" === a ? d._aFilterData : d._aSortData
        }, 1)
    });
    u("rows().invalidate()", "row().invalidate()", function(a) {
        return this.iterator("row", function(b, c) {
            da(b, c, a)
        })
    });
    u("rows().indexes()", "row().index()", function() {
        return this.iterator("row",
            function(a, b) {
                return b
            }, 1)
    });
    u("rows().ids()", "row().id()", function(a) {
        for (var b = [], c = this.context, d = 0, e = c.length; d < e; d++)
            for (var f = 0, g = this[d].length; f < g; f++) {
                var h = c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);
                b.push((!0 === a ? "#" : "") + h)
            }
        return new s(c, b)
    });
    u("rows().remove()", "row().remove()", function() {
        var a = this;
        this.iterator("row", function(b, c, d) {
            var e = b.aoData,
                f = e[c],
                g, h, i, m, l;
            e.splice(c, 1);
            g = 0;
            for (h = e.length; g < h; g++)
                if (i = e[g], l = i.anCells, null !== i.nTr && (i.nTr._DT_RowIndex = g), null !== l) {
                    i = 0;
                    for (m =
                        l.length; i < m; i++) l[i]._DT_CellIndex.row = g
                }
            pa(b.aiDisplayMaster, c);
            pa(b.aiDisplay, c);
            pa(a[d], c, !1);
            0 < b._iRecordsDisplay && b._iRecordsDisplay--;
            Sa(b);
            c = b.rowIdFn(f._aData);
            c !== k && delete b.aIds[c]
        });
        this.iterator("table", function(a) {
            for (var c = 0, d = a.aoData.length; c < d; c++) a.aoData[c].idx = c
        });
        return this
    });
    o("rows.add()", function(a) {
        var b = this.iterator("table", function(b) {
                    var c, f, g, h = [];
                    f = 0;
                    for (g = a.length; f < g; f++) c = a[f], c.nodeName && "TR" === c.nodeName.toUpperCase() ? h.push(na(b, c)[0]) : h.push(O(b, c));
                    return h
                },
                1),
            c = this.rows(-1);
        c.pop();
        h.merge(c, b);
        return c
    });
    o("row()", function(a, b) {
        return cb(this.rows(a, b))
    });
    o("row().data()", function(a) {
        var b = this.context;
        if (a === k) return b.length && this.length ? b[0].aoData[this[0]]._aData : k;
        var c = b[0].aoData[this[0]];
        c._aData = a;
        h.isArray(a) && c.nTr.id && N(b[0].rowId)(a, c.nTr.id);
        da(b[0], this[0], "data");
        return this
    });
    o("row().node()", function() {
        var a = this.context;
        return a.length && this.length ? a[0].aoData[this[0]].nTr || null : null
    });
    o("row.add()", function(a) {
        a instanceof h &&
            a.length && (a = a[0]);
        var b = this.iterator("table", function(b) {
            return a.nodeName && "TR" === a.nodeName.toUpperCase() ? na(b, a)[0] : O(b, a)
        });
        return this.row(b[0])
    });
    var db = function(a, b) {
            var c = a.context;
            if (c.length && (c = c[0].aoData[b !== k ? b : a[0]]) && c._details) c._details.remove(), c._detailsShow = k, c._details = k
        },
        Tb = function(a, b) {
            var c = a.context;
            if (c.length && a.length) {
                var d = c[0].aoData[a[0]];
                if (d._details) {
                    (d._detailsShow = b) ? d._details.insertAfter(d.nTr): d._details.detach();
                    var e = c[0],
                        f = new s(e),
                        g = e.aoData;
                    f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");
                    0 < D(g, "_details").length && (f.on("draw.dt.DT_details", function(a, b) {
                        e === b && f.rows({
                            page: "current"
                        }).eq(0).each(function(a) {
                            a = g[a];
                            a._detailsShow && a._details.insertAfter(a.nTr)
                        })
                    }), f.on("column-visibility.dt.DT_details", function(a, b) {
                        if (e === b)
                            for (var c, d = V(b), f = 0, h = g.length; f < h; f++) c = g[f], c._details && c._details.children("td[colspan]").attr("colspan", d)
                    }), f.on("destroy.dt.DT_details", function(a, b) {
                        if (e === b)
                            for (var c = 0, d = g.length; c < d; c++) g[c]._details && db(f, c)
                    }))
                }
            }
        };
    o("row().child()", function(a, b) {
        var c =
            this.context;
        if (a === k) return c.length && this.length ? c[0].aoData[this[0]]._details : k;
        if (!0 === a) this.child.show();
        else if (!1 === a) db(this);
        else if (c.length && this.length) {
            var d = c[0],
                c = c[0].aoData[this[0]],
                e = [],
                f = function(a, b) {
                    if (h.isArray(a) || a instanceof h)
                        for (var c = 0, k = a.length; c < k; c++) f(a[c], b);
                    else a.nodeName && "tr" === a.nodeName.toLowerCase() ? e.push(a) : (c = h("<tr><td/></tr>").addClass(b), h("td", c).addClass(b).html(a)[0].colSpan = V(d), e.push(c[0]))
                };
            f(a, b);
            c._details && c._details.detach();
            c._details = h(e);
            c._detailsShow && c._details.insertAfter(c.nTr)
        }
        return this
    });
    o(["row().child.show()", "row().child().show()"], function() {
        Tb(this, !0);
        return this
    });
    o(["row().child.hide()", "row().child().hide()"], function() {
        Tb(this, !1);
        return this
    });
    o(["row().child.remove()", "row().child().remove()"], function() {
        db(this);
        return this
    });
    o("row().child.isShown()", function() {
        var a = this.context;
        return a.length && this.length ? a[0].aoData[this[0]]._detailsShow || !1 : !1
    });
    var bc = /^([^:]+):(name|visIdx|visible)$/,
        Ub = function(a, b,
            c, d, e) {
            for (var c = [], d = 0, f = e.length; d < f; d++) c.push(B(a, e[d], b));
            return c
        };
    o("columns()", function(a, b) {
        a === k ? a = "" : h.isPlainObject(a) && (b = a, a = "");
        var b = bb(b),
            c = this.iterator("table", function(c) {
                    var e = a,
                        f = b,
                        g = c.aoColumns,
                        j = D(g, "sName"),
                        i = D(g, "nTh");
                    return ab("column", e, function(a) {
                        var b = Nb(a);
                        if (a === "") return Y(g.length);
                        if (b !== null) return [b >= 0 ? b : g.length + b];
                        if (typeof a === "function") {
                            var e = Ba(c, f);
                            return h.map(g, function(b, f) {
                                return a(f, Ub(c, f, 0, 0, e), i[f]) ? f : null
                            })
                        }
                        var k = typeof a === "string" ? a.match(bc) :
                            "";
                        if (k) switch (k[2]) {
                            case "visIdx":
                            case "visible":
                                b = parseInt(k[1], 10);
                                if (b < 0) {
                                    var n = h.map(g, function(a, b) {
                                        return a.bVisible ? b : null
                                    });
                                    return [n[n.length + b]]
                                }
                                return [aa(c, b)];
                            case "name":
                                return h.map(j, function(a, b) {
                                    return a === k[1] ? b : null
                                });
                            default:
                                return []
                        }
                        if (a.nodeName && a._DT_CellIndex) return [a._DT_CellIndex.column];
                        b = h(i).filter(a).map(function() {
                            return h.inArray(this, i)
                        }).toArray();
                        if (b.length || !a.nodeName) return b;
                        b = h(a).closest("*[data-dt-column]");
                        return b.length ? [b.data("dt-column")] : []
                    }, c, f)
                },
                1);
        c.selector.cols = a;
        c.selector.opts = b;
        return c
    });
    u("columns().header()", "column().header()", function() {
        return this.iterator("column", function(a, b) {
            return a.aoColumns[b].nTh
        }, 1)
    });
    u("columns().footer()", "column().footer()", function() {
        return this.iterator("column", function(a, b) {
            return a.aoColumns[b].nTf
        }, 1)
    });
    u("columns().data()", "column().data()", function() {
        return this.iterator("column-rows", Ub, 1)
    });
    u("columns().dataSrc()", "column().dataSrc()", function() {
        return this.iterator("column", function(a, b) {
                return a.aoColumns[b].mData
            },
            1)
    });
    u("columns().cache()", "column().cache()", function(a) {
        return this.iterator("column-rows", function(b, c, d, e, f) {
            return ja(b.aoData, f, "search" === a ? "_aFilterData" : "_aSortData", c)
        }, 1)
    });
    u("columns().nodes()", "column().nodes()", function() {
        return this.iterator("column-rows", function(a, b, c, d, e) {
            return ja(a.aoData, e, "anCells", b)
        }, 1)
    });
    u("columns().visible()", "column().visible()", function(a, b) {
        var c = this.iterator("column", function(b, c) {
            if (a === k) return b.aoColumns[c].bVisible;
            var f = b.aoColumns,
                g = f[c],
                j = b.aoData,
                i, m, l;
            if (a !== k && g.bVisible !== a) {
                if (a) {
                    var n = h.inArray(!0, D(f, "bVisible"), c + 1);
                    i = 0;
                    for (m = j.length; i < m; i++) l = j[i].nTr, f = j[i].anCells, l && l.insertBefore(f[c], f[n] || null)
                } else h(D(b.aoData, "anCells", c)).detach();
                g.bVisible = a;
                fa(b, b.aoHeader);
                fa(b, b.aoFooter);
                b.aiDisplay.length || h(b.nTBody).find("td[colspan]").attr("colspan", V(b));
                xa(b)
            }
        });
        a !== k && (this.iterator("column", function(c, e) {
            r(c, null, "column-visibility", [c, e, a, b])
        }), (b === k || b) && this.columns.adjust());
        return c
    });
    u("columns().indexes()", "column().index()",
        function(a) {
            return this.iterator("column", function(b, c) {
                return "visible" === a ? ba(b, c) : c
            }, 1)
        });
    o("columns.adjust()", function() {
        return this.iterator("table", function(a) {
            $(a)
        }, 1)
    });
    o("column.index()", function(a, b) {
        if (0 !== this.context.length) {
            var c = this.context[0];
            if ("fromVisible" === a || "toData" === a) return aa(c, b);
            if ("fromData" === a || "toVisible" === a) return ba(c, b)
        }
    });
    o("column()", function(a, b) {
        return cb(this.columns(a, b))
    });
    o("cells()", function(a, b, c) {
        h.isPlainObject(a) && (a.row === k ? (c = a, a = null) : (c = b, b = null));
        h.isPlainObject(b) && (c = b, b = null);
        if (null === b || b === k) return this.iterator("table", function(b) {
            var d = a,
                e = bb(c),
                f = b.aoData,
                g = Ba(b, e),
                j = Qb(ja(f, g, "anCells")),
                i = h([].concat.apply([], j)),
                l, m = b.aoColumns.length,
                n, o, u, s, r, v;
            return ab("cell", d, function(a) {
                var c = typeof a === "function";
                if (a === null || a === k || c) {
                    n = [];
                    o = 0;
                    for (u = g.length; o < u; o++) {
                        l = g[o];
                        for (s = 0; s < m; s++) {
                            r = {
                                row: l,
                                column: s
                            };
                            if (c) {
                                v = f[l];
                                a(r, B(b, l, s), v.anCells ? v.anCells[s] : null) && n.push(r)
                            } else n.push(r)
                        }
                    }
                    return n
                }
                if (h.isPlainObject(a)) return a.column !==
                    k && a.row !== k && h.inArray(a.row, g) !== -1 ? [a] : [];
                c = i.filter(a).map(function(a, b) {
                    return {
                        row: b._DT_CellIndex.row,
                        column: b._DT_CellIndex.column
                    }
                }).toArray();
                if (c.length || !a.nodeName) return c;
                v = h(a).closest("*[data-dt-row]");
                return v.length ? [{
                    row: v.data("dt-row"),
                    column: v.data("dt-column")
                }] : []
            }, b, e)
        });
        var d = this.columns(b),
            e = this.rows(a),
            f, g, j, i, m;
        this.iterator("table", function(a, b) {
            f = [];
            g = 0;
            for (j = e[b].length; g < j; g++) {
                i = 0;
                for (m = d[b].length; i < m; i++) f.push({
                    row: e[b][g],
                    column: d[b][i]
                })
            }
        }, 1);
        var l = this.cells(f,
            c);
        h.extend(l.selector, {
            cols: b,
            rows: a,
            opts: c
        });
        return l
    });
    u("cells().nodes()", "cell().node()", function() {
        return this.iterator("cell", function(a, b, c) {
            return (a = a.aoData[b]) && a.anCells ? a.anCells[c] : k
        }, 1)
    });
    o("cells().data()", function() {
        return this.iterator("cell", function(a, b, c) {
            return B(a, b, c)
        }, 1)
    });
    u("cells().cache()", "cell().cache()", function(a) {
        a = "search" === a ? "_aFilterData" : "_aSortData";
        return this.iterator("cell", function(b, c, d) {
            return b.aoData[c][a][d]
        }, 1)
    });
    u("cells().render()", "cell().render()",
        function(a) {
            return this.iterator("cell", function(b, c, d) {
                return B(b, c, d, a)
            }, 1)
        });
    u("cells().indexes()", "cell().index()", function() {
        return this.iterator("cell", function(a, b, c) {
            return {
                row: b,
                column: c,
                columnVisible: ba(a, c)
            }
        }, 1)
    });
    u("cells().invalidate()", "cell().invalidate()", function(a) {
        return this.iterator("cell", function(b, c, d) {
            da(b, c, a, d)
        })
    });
    o("cell()", function(a, b, c) {
        return cb(this.cells(a, b, c))
    });
    o("cell().data()", function(a) {
        var b = this.context,
            c = this[0];
        if (a === k) return b.length && c.length ? B(b[0],
            c[0].row, c[0].column) : k;
        jb(b[0], c[0].row, c[0].column, a);
        da(b[0], c[0].row, "data", c[0].column);
        return this
    });
    o("order()", function(a, b) {
        var c = this.context;
        if (a === k) return 0 !== c.length ? c[0].aaSorting : k;
        "number" === typeof a ? a = [
            [a, b]
        ] : a.length && !h.isArray(a[0]) && (a = Array.prototype.slice.call(arguments));
        return this.iterator("table", function(b) {
            b.aaSorting = a.slice()
        })
    });
    o("order.listener()", function(a, b, c) {
        return this.iterator("table", function(d) {
            Ma(d, a, b, c)
        })
    });
    o("order.fixed()", function(a) {
        if (!a) {
            var b =
                this.context,
                b = b.length ? b[0].aaSortingFixed : k;
            return h.isArray(b) ? {
                pre: b
            } : b
        }
        return this.iterator("table", function(b) {
            b.aaSortingFixed = h.extend(!0, {}, a)
        })
    });
    o(["columns().order()", "column().order()"], function(a) {
        var b = this;
        return this.iterator("table", function(c, d) {
            var e = [];
            h.each(b[d], function(b, c) {
                e.push([c, a])
            });
            c.aaSorting = e
        })
    });
    o("search()", function(a, b, c, d) {
        var e = this.context;
        return a === k ? 0 !== e.length ? e[0].oPreviousSearch.sSearch : k : this.iterator("table", function(e) {
            e.oFeatures.bFilter && ga(e,
                h.extend({}, e.oPreviousSearch, {
                    sSearch: a + "",
                    bRegex: null === b ? !1 : b,
                    bSmart: null === c ? !0 : c,
                    bCaseInsensitive: null === d ? !0 : d
                }), 1)
        })
    });
    u("columns().search()", "column().search()", function(a, b, c, d) {
        return this.iterator("column", function(e, f) {
            var g = e.aoPreSearchCols;
            if (a === k) return g[f].sSearch;
            e.oFeatures.bFilter && (h.extend(g[f], {
                sSearch: a + "",
                bRegex: null === b ? !1 : b,
                bSmart: null === c ? !0 : c,
                bCaseInsensitive: null === d ? !0 : d
            }), ga(e, e.oPreviousSearch, 1))
        })
    });
    o("state()", function() {
        return this.context.length ? this.context[0].oSavedState :
            null
    });
    o("state.clear()", function() {
        return this.iterator("table", function(a) {
            a.fnStateSaveCallback.call(a.oInstance, a, {})
        })
    });
    o("state.loaded()", function() {
        return this.context.length ? this.context[0].oLoadedState : null
    });
    o("state.save()", function() {
        return this.iterator("table", function(a) {
            xa(a)
        })
    });
    n.versionCheck = n.fnVersionCheck = function(a) {
        for (var b = n.version.split("."), a = a.split("."), c, d, e = 0, f = a.length; e < f; e++)
            if (c = parseInt(b[e], 10) || 0, d = parseInt(a[e], 10) || 0, c !== d) return c > d;
        return !0
    };
    n.isDataTable =
        n.fnIsDataTable = function(a) {
            var b = h(a).get(0),
                c = !1;
            if (a instanceof n.Api) return !0;
            h.each(n.settings, function(a, e) {
                var f = e.nScrollHead ? h("table", e.nScrollHead)[0] : null,
                    g = e.nScrollFoot ? h("table", e.nScrollFoot)[0] : null;
                if (e.nTable === b || f === b || g === b) c = !0
            });
            return c
        };
    n.tables = n.fnTables = function(a) {
        var b = !1;
        h.isPlainObject(a) && (b = a.api, a = a.visible);
        var c = h.map(n.settings, function(b) {
            if (!a || a && h(b.nTable).is(":visible")) return b.nTable
        });
        return b ? new s(c) : c
    };
    n.camelToHungarian = J;
    o("$()", function(a, b) {
        var c =
            this.rows(b).nodes(),
            c = h(c);
        return h([].concat(c.filter(a).toArray(), c.find(a).toArray()))
    });
    h.each(["on", "one", "off"], function(a, b) {
        o(b + "()", function() {
            var a = Array.prototype.slice.call(arguments);
            a[0] = h.map(a[0].split(/\s/), function(a) {
                return !a.match(/\.dt\b/) ? a + ".dt" : a
            }).join(" ");
            var d = h(this.tables().nodes());
            d[b].apply(d, a);
            return this
        })
    });
    o("clear()", function() {
        return this.iterator("table", function(a) {
            oa(a)
        })
    });
    o("settings()", function() {
        return new s(this.context, this.context)
    });
    o("init()", function() {
        var a =
            this.context;
        return a.length ? a[0].oInit : null
    });
    o("data()", function() {
        return this.iterator("table", function(a) {
            return D(a.aoData, "_aData")
        }).flatten()
    });
    o("destroy()", function(a) {
        a = a || !1;
        return this.iterator("table", function(b) {
            var c = b.nTableWrapper.parentNode,
                d = b.oClasses,
                e = b.nTable,
                f = b.nTBody,
                g = b.nTHead,
                j = b.nTFoot,
                i = h(e),
                f = h(f),
                k = h(b.nTableWrapper),
                l = h.map(b.aoData, function(a) {
                    return a.nTr
                }),
                o;
            b.bDestroying = !0;
            r(b, "aoDestroyCallback", "destroy", [b]);
            a || (new s(b)).columns().visible(!0);
            k.off(".DT").find(":not(tbody *)").off(".DT");
            h(E).off(".DT-" + b.sInstance);
            e != g.parentNode && (i.children("thead").detach(), i.append(g));
            j && e != j.parentNode && (i.children("tfoot").detach(), i.append(j));
            b.aaSorting = [];
            b.aaSortingFixed = [];
            wa(b);
            h(l).removeClass(b.asStripeClasses.join(" "));
            h("th, td", g).removeClass(d.sSortable + " " + d.sSortableAsc + " " + d.sSortableDesc + " " + d.sSortableNone);
            f.children().detach();
            f.append(l);
            g = a ? "remove" : "detach";
            i[g]();
            k[g]();
            !a && c && (c.insertBefore(e, b.nTableReinsertBefore), i.css("width", b.sDestroyWidth).removeClass(d.sTable),
                (o = b.asDestroyStripes.length) && f.children().each(function(a) {
                    h(this).addClass(b.asDestroyStripes[a % o])
                }));
            c = h.inArray(b, n.settings); - 1 !== c && n.settings.splice(c, 1)
        })
    });
    h.each(["column", "row", "cell"], function(a, b) {
        o(b + "s().every()", function(a) {
            var d = this.selector.opts,
                e = this;
            return this.iterator(b, function(f, g, h, i, m) {
                a.call(e[b](g, "cell" === b ? h : d, "cell" === b ? d : k), g, h, i, m)
            })
        })
    });
    o("i18n()", function(a, b, c) {
        var d = this.context[0],
            a = S(a)(d.oLanguage);
        a === k && (a = b);
        c !== k && h.isPlainObject(a) && (a = a[c] !== k ? a[c] :
            a._);
        return a.replace("%d", c)
    });
    n.version = "1.10.18";
    n.settings = [];
    n.models = {};
    n.models.oSearch = {
        bCaseInsensitive: !0,
        sSearch: "",
        bRegex: !1,
        bSmart: !0
    };
    n.models.oRow = {
        nTr: null,
        anCells: null,
        _aData: [],
        _aSortData: null,
        _aFilterData: null,
        _sFilterRow: null,
        _sRowStripe: "",
        src: null,
        idx: -1
    };
    n.models.oColumn = {
        idx: null,
        aDataSort: null,
        asSorting: null,
        bSearchable: null,
        bSortable: null,
        bVisible: null,
        _sManualType: null,
        _bAttrSrc: !1,
        fnCreatedCell: null,
        fnGetData: null,
        fnSetData: null,
        mData: null,
        mRender: null,
        nTh: null,
        nTf: null,
        sClass: null,
        sContentPadding: null,
        sDefaultContent: null,
        sName: null,
        sSortDataType: "std",
        sSortingClass: null,
        sSortingClassJUI: null,
        sTitle: null,
        sType: null,
        sWidth: null,
        sWidthOrig: null
    };
    n.defaults = {
        aaData: null,
        aaSorting: [
            [0, "asc"]
        ],
        aaSortingFixed: [],
        ajax: null,
        aLengthMenu: [10, 25, 50, 100],
        aoColumns: null,
        aoColumnDefs: null,
        aoSearchCols: [],
        asStripeClasses: null,
        bAutoWidth: !0,
        bDeferRender: !1,
        bDestroy: !1,
        bFilter: !0,
        bInfo: !0,
        bLengthChange: !0,
        bPaginate: !0,
        bProcessing: !1,
        bRetrieve: !1,
        bScrollCollapse: !1,
        bServerSide: !1,
        bSort: !0,
        bSortMulti: !0,
        bSortCellsTop: !1,
        bSortClasses: !0,
        bStateSave: !1,
        fnCreatedRow: null,
        fnDrawCallback: null,
        fnFooterCallback: null,
        fnFormatNumber: function(a) {
            return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
        },
        fnHeaderCallback: null,
        fnInfoCallback: null,
        fnInitComplete: null,
        fnPreDrawCallback: null,
        fnRowCallback: null,
        fnServerData: null,
        fnServerParams: null,
        fnStateLoadCallback: function(a) {
            try {
                return JSON.parse((-1 === a.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" +
                    a.sInstance + "_" + location.pathname))
            } catch (b) {}
        },
        fnStateLoadParams: null,
        fnStateLoaded: null,
        fnStateSaveCallback: function(a, b) {
            try {
                (-1 === a.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + a.sInstance + "_" + location.pathname, JSON.stringify(b))
            } catch (c) {}
        },
        fnStateSaveParams: null,
        iStateDuration: 7200,
        iDeferLoading: null,
        iDisplayLength: 10,
        iDisplayStart: 0,
        iTabIndex: 0,
        oClasses: {},
        oLanguage: {
            oAria: {
                sSortAscending: ": activate to sort column ascending",
                sSortDescending: ": activate to sort column descending"
            },
            oPaginate: {
                sFirst: "First",
                sLast: "Last",
                sNext: "Next",
                sPrevious: "Previous"
            },
            sEmptyTable: "No data available in table",
            sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
            sInfoEmpty: "Showing 0 to 0 of 0 entries",
            sInfoFiltered: "(filtered from _MAX_ total entries)",
            sInfoPostFix: "",
            sDecimal: "",
            sThousands: ",",
            sLengthMenu: "Show _MENU_ entries",
            sLoadingRecords: "Loading...",
            sProcessing: "Processing...",
            sSearch: "Search:",
            sSearchPlaceholder: "",
            sUrl: "",
            sZeroRecords: "No matching records found"
        },
        oSearch: h.extend({},
            n.models.oSearch),
        sAjaxDataProp: "data",
        sAjaxSource: null,
        sDom: "lfrtip",
        searchDelay: null,
        sPaginationType: "simple_numbers",
        sScrollX: "",
        sScrollXInner: "",
        sScrollY: "",
        sServerMethod: "GET",
        renderer: null,
        rowId: "DT_RowId"
    };
    Z(n.defaults);
    n.defaults.column = {
        aDataSort: null,
        iDataSort: -1,
        asSorting: ["asc", "desc"],
        bSearchable: !0,
        bSortable: !0,
        bVisible: !0,
        fnCreatedCell: null,
        mData: null,
        mRender: null,
        sCellType: "td",
        sClass: "",
        sContentPadding: "",
        sDefaultContent: null,
        sName: "",
        sSortDataType: "std",
        sTitle: null,
        sType: null,
        sWidth: null
    };
    Z(n.defaults.column);
    n.models.oSettings = {
        oFeatures: {
            bAutoWidth: null,
            bDeferRender: null,
            bFilter: null,
            bInfo: null,
            bLengthChange: null,
            bPaginate: null,
            bProcessing: null,
            bServerSide: null,
            bSort: null,
            bSortMulti: null,
            bSortClasses: null,
            bStateSave: null
        },
        oScroll: {
            bCollapse: null,
            iBarWidth: 0,
            sX: null,
            sXInner: null,
            sY: null
        },
        oLanguage: {
            fnInfoCallback: null
        },
        oBrowser: {
            bScrollOversize: !1,
            bScrollbarLeft: !1,
            bBounding: !1,
            barWidth: 0
        },
        ajax: null,
        aanFeatures: [],
        aoData: [],
        aiDisplay: [],
        aiDisplayMaster: [],
        aIds: {},
        aoColumns: [],
        aoHeader: [],
        aoFooter: [],
        oPreviousSearch: {},
        aoPreSearchCols: [],
        aaSorting: null,
        aaSortingFixed: [],
        asStripeClasses: null,
        asDestroyStripes: [],
        sDestroyWidth: 0,
        aoRowCallback: [],
        aoHeaderCallback: [],
        aoFooterCallback: [],
        aoDrawCallback: [],
        aoRowCreatedCallback: [],
        aoPreDrawCallback: [],
        aoInitComplete: [],
        aoStateSaveParams: [],
        aoStateLoadParams: [],
        aoStateLoaded: [],
        sTableId: "",
        nTable: null,
        nTHead: null,
        nTFoot: null,
        nTBody: null,
        nTableWrapper: null,
        bDeferLoading: !1,
        bInitialised: !1,
        aoOpenRows: [],
        sDom: null,
        searchDelay: null,
        sPaginationType: "two_button",
        iStateDuration: 0,
        aoStateSave: [],
        aoStateLoad: [],
        oSavedState: null,
        oLoadedState: null,
        sAjaxSource: null,
        sAjaxDataProp: null,
        bAjaxDataGet: !0,
        jqXHR: null,
        json: k,
        oAjaxData: k,
        fnServerData: null,
        aoServerParams: [],
        sServerMethod: null,
        fnFormatNumber: null,
        aLengthMenu: null,
        iDraw: 0,
        bDrawing: !1,
        iDrawError: -1,
        _iDisplayLength: 10,
        _iDisplayStart: 0,
        _iRecordsTotal: 0,
        _iRecordsDisplay: 0,
        oClasses: {},
        bFiltered: !1,
        bSorted: !1,
        bSortCellsTop: null,
        oInit: null,
        aoDestroyCallback: [],
        fnRecordsTotal: function() {
            return "ssp" == y(this) ? 1 * this._iRecordsTotal :
                this.aiDisplayMaster.length
        },
        fnRecordsDisplay: function() {
            return "ssp" == y(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length
        },
        fnDisplayEnd: function() {
            var a = this._iDisplayLength,
                b = this._iDisplayStart,
                c = b + a,
                d = this.aiDisplay.length,
                e = this.oFeatures,
                f = e.bPaginate;
            return e.bServerSide ? !1 === f || -1 === a ? b + d : Math.min(b + a, this._iRecordsDisplay) : !f || c > d || -1 === a ? d : c
        },
        oInstance: null,
        sInstance: null,
        iTabIndex: 0,
        nScrollHead: null,
        nScrollFoot: null,
        aLastSort: [],
        oPlugins: {},
        rowIdFn: null,
        rowId: null
    };
    n.ext = x = {
        buttons: {},
        classes: {},
        build: "bs4/dt-1.10.18/r-2.2.2",
        errMode: "alert",
        feature: [],
        search: [],
        selector: {
            cell: [],
            column: [],
            row: []
        },
        internal: {},
        legacy: {
            ajax: null
        },
        pager: {},
        renderer: {
            pageButton: {},
            header: {}
        },
        order: {},
        type: {
            detect: [],
            search: {},
            order: {}
        },
        _unique: 0,
        fnVersionCheck: n.fnVersionCheck,
        iApiIndex: 0,
        oJUIClasses: {},
        sVersion: n.version
    };
    h.extend(x, {
        afnFiltering: x.search,
        aTypes: x.type.detect,
        ofnSearch: x.type.search,
        oSort: x.type.order,
        afnSortData: x.order,
        aoFeatures: x.feature,
        oApi: x.internal,
        oStdClasses: x.classes,
        oPagination: x.pager
    });
    h.extend(n.ext.classes, {
        sTable: "dataTable",
        sNoFooter: "no-footer",
        sPageButton: "paginate_button",
        sPageButtonActive: "current",
        sPageButtonDisabled: "disabled",
        sStripeOdd: "odd",
        sStripeEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_asc_disabled",
        sSortableDesc: "sorting_desc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sFilterInput: "",
        sLengthSelect: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sHeaderTH: "",
        sFooterTH: "",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sSortIcon: "",
        sJUIHeader: "",
        sJUIFooter: ""
    });
    var Kb = n.ext.pager;
    h.extend(Kb, {
        simple: function() {
            return ["previous", "next"]
        },
        full: function() {
            return ["first", "previous", "next", "last"]
        },
        numbers: function(a, b) {
            return [ia(a, b)]
        },
        simple_numbers: function(a, b) {
            return ["previous", ia(a, b), "next"]
        },
        full_numbers: function(a, b) {
            return ["first", "previous", ia(a, b), "next", "last"]
        },
        first_last_numbers: function(a, b) {
            return ["first", ia(a, b), "last"]
        },
        _numbers: ia,
        numbers_length: 7
    });
    h.extend(!0, n.ext.renderer, {
        pageButton: {
            _: function(a, b, c, d, e,
                f) {
                var g = a.oClasses,
                    j = a.oLanguage.oPaginate,
                    i = a.oLanguage.oAria.paginate || {},
                    m, l, n = 0,
                    o = function(b, d) {
                        var k, s, u, r, v = function(b) {
                            Ta(a, b.data.action, true)
                        };
                        k = 0;
                        for (s = d.length; k < s; k++) {
                            r = d[k];
                            if (h.isArray(r)) {
                                u = h("<" + (r.DT_el || "div") + "/>").appendTo(b);
                                o(u, r)
                            } else {
                                m = null;
                                l = "";
                                switch (r) {
                                    case "ellipsis":
                                        b.append('<span class="ellipsis">&#x2026;</span>');
                                        break;
                                    case "first":
                                        m = j.sFirst;
                                        l = r + (e > 0 ? "" : " " + g.sPageButtonDisabled);
                                        break;
                                    case "previous":
                                        m = j.sPrevious;
                                        l = r + (e > 0 ? "" : " " + g.sPageButtonDisabled);
                                        break;
                                    case "next":
                                        m =
                                            j.sNext;
                                        l = r + (e < f - 1 ? "" : " " + g.sPageButtonDisabled);
                                        break;
                                    case "last":
                                        m = j.sLast;
                                        l = r + (e < f - 1 ? "" : " " + g.sPageButtonDisabled);
                                        break;
                                    default:
                                        m = r + 1;
                                        l = e === r ? g.sPageButtonActive : ""
                                }
                                if (m !== null) {
                                    u = h("<a>", {
                                        "class": g.sPageButton + " " + l,
                                        "aria-controls": a.sTableId,
                                        "aria-label": i[r],
                                        "data-dt-idx": n,
                                        tabindex: a.iTabIndex,
                                        id: c === 0 && typeof r === "string" ? a.sTableId + "_" + r : null
                                    }).html(m).appendTo(b);
                                    Wa(u, {
                                        action: r
                                    }, v);
                                    n++
                                }
                            }
                        }
                    },
                    s;
                try {
                    s = h(b).find(H.activeElement).data("dt-idx")
                } catch (u) {}
                o(h(b).empty(), d);
                s !== k && h(b).find("[data-dt-idx=" +
                    s + "]").focus()
            }
        }
    });
    h.extend(n.ext.type.detect, [function(a, b) {
        var c = b.oLanguage.sDecimal;
        return $a(a, c) ? "num" + c : null
    }, function(a) {
        if (a && !(a instanceof Date) && !Zb.test(a)) return null;
        var b = Date.parse(a);
        return null !== b && !isNaN(b) || M(a) ? "date" : null
    }, function(a, b) {
        var c = b.oLanguage.sDecimal;
        return $a(a, c, !0) ? "num-fmt" + c : null
    }, function(a, b) {
        var c = b.oLanguage.sDecimal;
        return Pb(a, c) ? "html-num" + c : null
    }, function(a, b) {
        var c = b.oLanguage.sDecimal;
        return Pb(a, c, !0) ? "html-num-fmt" + c : null
    }, function(a) {
        return M(a) ||
            "string" === typeof a && -1 !== a.indexOf("<") ? "html" : null
    }]);
    h.extend(n.ext.type.search, {
        html: function(a) {
            return M(a) ? a : "string" === typeof a ? a.replace(Mb, " ").replace(Aa, "") : ""
        },
        string: function(a) {
            return M(a) ? a : "string" === typeof a ? a.replace(Mb, " ") : a
        }
    });
    var za = function(a, b, c, d) {
        if (0 !== a && (!a || "-" === a)) return -Infinity;
        b && (a = Ob(a, b));
        a.replace && (c && (a = a.replace(c, "")), d && (a = a.replace(d, "")));
        return 1 * a
    };
    h.extend(x.type.order, {
        "date-pre": function(a) {
            a = Date.parse(a);
            return isNaN(a) ? -Infinity : a
        },
        "html-pre": function(a) {
            return M(a) ?
                "" : a.replace ? a.replace(/<.*?>/g, "").toLowerCase() : a + ""
        },
        "string-pre": function(a) {
            return M(a) ? "" : "string" === typeof a ? a.toLowerCase() : !a.toString ? "" : a.toString()
        },
        "string-asc": function(a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        },
        "string-desc": function(a, b) {
            return a < b ? 1 : a > b ? -1 : 0
        }
    });
    Da("");
    h.extend(!0, n.ext.renderer, {
        header: {
            _: function(a, b, c, d) {
                h(a.nTable).on("order.dt.DT", function(e, f, g, h) {
                    if (a === f) {
                        e = c.idx;
                        b.removeClass(c.sSortingClass + " " + d.sSortAsc + " " + d.sSortDesc).addClass(h[e] == "asc" ? d.sSortAsc : h[e] == "desc" ? d.sSortDesc :
                            c.sSortingClass)
                    }
                })
            },
            jqueryui: function(a, b, c, d) {
                h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon + " " + c.sSortingClassJUI)).appendTo(b);
                h(a.nTable).on("order.dt.DT", function(e, f, g, h) {
                    if (a === f) {
                        e = c.idx;
                        b.removeClass(d.sSortAsc + " " + d.sSortDesc).addClass(h[e] == "asc" ? d.sSortAsc : h[e] == "desc" ? d.sSortDesc : c.sSortingClass);
                        b.find("span." + d.sSortIcon).removeClass(d.sSortJUIAsc + " " + d.sSortJUIDesc + " " + d.sSortJUI + " " + d.sSortJUIAscAllowed + " " + d.sSortJUIDescAllowed).addClass(h[e] ==
                            "asc" ? d.sSortJUIAsc : h[e] == "desc" ? d.sSortJUIDesc : c.sSortingClassJUI)
                    }
                })
            }
        }
    });
    var Vb = function(a) {
        return "string" === typeof a ? a.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : a
    };
    n.render = {
        number: function(a, b, c, d, e) {
            return {
                display: function(f) {
                    if ("number" !== typeof f && "string" !== typeof f) return f;
                    var g = 0 > f ? "-" : "",
                        h = parseFloat(f);
                    if (isNaN(h)) return Vb(f);
                    h = h.toFixed(c);
                    f = Math.abs(h);
                    h = parseInt(f, 10);
                    f = c ? b + (f - h).toFixed(c).substring(2) : "";
                    return g + (d || "") + h.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                        a) + f + (e || "")
                }
            }
        },
        text: function() {
            return {
                display: Vb
            }
        }
    };
    h.extend(n.ext.internal, {
        _fnExternApiFunc: Lb,
        _fnBuildAjax: sa,
        _fnAjaxUpdate: lb,
        _fnAjaxParameters: ub,
        _fnAjaxUpdateDraw: vb,
        _fnAjaxDataSrc: ta,
        _fnAddColumn: Ea,
        _fnColumnOptions: ka,
        _fnAdjustColumnSizing: $,
        _fnVisibleToColumnIndex: aa,
        _fnColumnIndexToVisible: ba,
        _fnVisbleColumns: V,
        _fnGetColumns: ma,
        _fnColumnTypes: Ga,
        _fnApplyColumnDefs: ib,
        _fnHungarianMap: Z,
        _fnCamelToHungarian: J,
        _fnLanguageCompat: Ca,
        _fnBrowserDetect: gb,
        _fnAddData: O,
        _fnAddTr: na,
        _fnNodeToDataIndex: function(a,
            b) {
            return b._DT_RowIndex !== k ? b._DT_RowIndex : null
        },
        _fnNodeToColumnIndex: function(a, b, c) {
            return h.inArray(c, a.aoData[b].anCells)
        },
        _fnGetCellData: B,
        _fnSetCellData: jb,
        _fnSplitObjNotation: Ja,
        _fnGetObjectDataFn: S,
        _fnSetObjectDataFn: N,
        _fnGetDataMaster: Ka,
        _fnClearTable: oa,
        _fnDeleteIndex: pa,
        _fnInvalidate: da,
        _fnGetRowElements: Ia,
        _fnCreateTr: Ha,
        _fnBuildHead: kb,
        _fnDrawHead: fa,
        _fnDraw: P,
        _fnReDraw: T,
        _fnAddOptionsHtml: nb,
        _fnDetectHeader: ea,
        _fnGetUniqueThs: ra,
        _fnFeatureHtmlFilter: pb,
        _fnFilterComplete: ga,
        _fnFilterCustom: yb,
        _fnFilterColumn: xb,
        _fnFilter: wb,
        _fnFilterCreateSearch: Pa,
        _fnEscapeRegex: Qa,
        _fnFilterData: zb,
        _fnFeatureHtmlInfo: sb,
        _fnUpdateInfo: Cb,
        _fnInfoMacros: Db,
        _fnInitialise: ha,
        _fnInitComplete: ua,
        _fnLengthChange: Ra,
        _fnFeatureHtmlLength: ob,
        _fnFeatureHtmlPaginate: tb,
        _fnPageChange: Ta,
        _fnFeatureHtmlProcessing: qb,
        _fnProcessingDisplay: C,
        _fnFeatureHtmlTable: rb,
        _fnScrollDraw: la,
        _fnApplyToChildren: I,
        _fnCalculateColumnWidths: Fa,
        _fnThrottle: Oa,
        _fnConvertToWidth: Eb,
        _fnGetWidestNode: Fb,
        _fnGetMaxLenString: Gb,
        _fnStringToCss: v,
        _fnSortFlatten: X,
        _fnSort: mb,
        _fnSortAria: Ib,
        _fnSortListener: Va,
        _fnSortAttachListener: Ma,
        _fnSortingClasses: wa,
        _fnSortData: Hb,
        _fnSaveState: xa,
        _fnLoadState: Jb,
        _fnSettingsFromNode: ya,
        _fnLog: K,
        _fnMap: F,
        _fnBindAction: Wa,
        _fnCallbackReg: z,
        _fnCallbackFire: r,
        _fnLengthOverflow: Sa,
        _fnRenderer: Na,
        _fnDataSource: y,
        _fnRowAttributes: La,
        _fnExtend: Xa,
        _fnCalculateEnd: function() {}
    });
    h.fn.dataTable = n;
    n.$ = h;
    h.fn.dataTableSettings = n.settings;
    h.fn.dataTableExt = n.ext;
    h.fn.DataTable = function(a) {
        return h(this).dataTable(a).api()
    };
    h.each(n, function(a, b) {
        h.fn.DataTable[a] = b
    });
    return h.fn.dataTable
});


/*!
 DataTables Bootstrap 4 integration
 ©2011-2017 SpryMedia Ltd - datatables.net/license
*/
(function(b) {
    "function" === typeof define && define.amd ? define(["jquery", "datatables.net"], function(a) {
        return b(a, window, document)
    }) : "object" === typeof exports ? module.exports = function(a, d) {
        a || (a = window);
        if (!d || !d.fn.dataTable) d = require("datatables.net")(a, d).$;
        return b(d, a, a.document)
    } : b(jQuery, window, document)
})(function(b, a, d, m) {
    var f = b.fn.dataTable;
    b.extend(!0, f.defaults, {
        dom: "<'row btn-area'<'col-sm-4'l><'col-sm-4'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        renderer: "bootstrap"
    });
    b.extend(f.ext.classes, {
        sWrapper: "dataTables_wrapper dt-bootstrap4",
        sFilterInput: "form-control form-control-sm",
        sLengthSelect: "custom-select custom-select-sm form-control form-control-sm",
        sProcessing: "dataTables_processing card",
        sPageButton: "paginate_button page-item"
    });
    f.ext.renderer.pageButton.bootstrap = function(a, h, r, s, j, n) {
        var o = new f.Api(a),
            t = a.oClasses,
            k = a.oLanguage.oPaginate,
            u = a.oLanguage.oAria.paginate || {},
            e, g, p = 0,
            q = function(d, f) {
                var l, h, i, c, m = function(a) {
                    a.preventDefault();
                    !b(a.currentTarget).hasClass("disabled") && o.page() != a.data.action && o.page(a.data.action).draw("page")
                };
                l = 0;
                for (h = f.length; l < h; l++)
                    if (c = f[l], b.isArray(c)) q(d, c);
                    else {
                        g = e = "";
                        switch (c) {
                            case "ellipsis":
                                e = "&#x2026;";
                                g = "disabled";
                                break;
                            case "first":
                                e = k.sFirst;
                                g = c + (0 < j ? "" : " disabled");
                                break;
                            case "previous":
                                e = k.sPrevious;
                                g = c + (0 < j ? "" : " disabled");
                                break;
                            case "next":
                                e = k.sNext;
                                g = c + (j < n - 1 ? "" : " disabled");
                                break;
                            case "last":
                                e = k.sLast;
                                g = c + (j < n - 1 ? "" : " disabled");
                                break;
                            default:
                                e = c + 1, g = j === c ? "active" : ""
                        }
                        e && (i = b("<li>", {
                            "class": t.sPageButton + " " + g,
                            id: 0 === r && "string" === typeof c ? a.sTableId + "_" + c : null
                        }).append(b("<a>", {
                            href: "#",
                            "aria-controls": a.sTableId,
                            "aria-label": u[c],
                            "data-dt-idx": p,
                            tabindex: a.iTabIndex,
                            "class": "page-link"
                        }).html(e)).appendTo(d), a.oApi._fnBindAction(i, {
                            action: c
                        }, m), p++)
                    }
            },
            i;
        try {
            i = b(h).find(d.activeElement).data("dt-idx")
        } catch (v) {}
        q(b(h).empty().html('<ul class="pagination"/>').children("ul"), s);
        i !== m && b(h).find("[data-dt-idx=" + i + "]").focus()
    };
    return f
});


/*!
 Responsive 2.2.2
 2014-2018 SpryMedia Ltd - datatables.net/license
*/
(function(d) {
    "function" === typeof define && define.amd ? define(["jquery", "datatables.net"], function(l) {
        return d(l, window, document)
    }) : "object" === typeof exports ? module.exports = function(l, j) {
        l || (l = window);
        if (!j || !j.fn.dataTable) j = require("datatables.net")(l, j).$;
        return d(j, l, l.document)
    } : d(jQuery, window, document)
})(function(d, l, j, q) {
    function t(a, b, c) {
        var e = b + "-" + c;
        if (n[e]) return n[e];
        for (var d = [], a = a.cell(b, c).node().childNodes, b = 0, c = a.length; b < c; b++) d.push(a[b]);
        return n[e] = d
    }

    function r(a, b, d) {
        var e = b +
            "-" + d;
        if (n[e]) {
            for (var a = a.cell(b, d).node(), d = n[e][0].parentNode.childNodes, b = [], f = 0, g = d.length; f < g; f++) b.push(d[f]);
            d = 0;
            for (f = b.length; d < f; d++) a.appendChild(b[d]);
            n[e] = q
        }
    }
    var o = d.fn.dataTable,
        i = function(a, b) {
            if (!o.versionCheck || !o.versionCheck("1.10.10")) throw "DataTables Responsive requires DataTables 1.10.10 or newer";
            this.s = {
                dt: new o.Api(a),
                columns: [],
                current: []
            };
            this.s.dt.settings()[0].responsive || (b && "string" === typeof b.details ? b.details = {
                    type: b.details
                } : b && !1 === b.details ? b.details = {
                    type: !1
                } :
                b && !0 === b.details && (b.details = {
                    type: "inline"
                }), this.c = d.extend(!0, {}, i.defaults, o.defaults.responsive, b), a.responsive = this, this._constructor())
        };
    d.extend(i.prototype, {
        _constructor: function() {
            var a = this,
                b = this.s.dt,
                c = b.settings()[0],
                e = d(l).width();
            b.settings()[0]._responsive = this;
            d(l).on("resize.dtr orientationchange.dtr", o.util.throttle(function() {
                var b = d(l).width();
                b !== e && (a._resize(), e = b)
            }));
            c.oApi._fnCallbackReg(c, "aoRowCreatedCallback", function(e) {
                -1 !== d.inArray(!1, a.s.current) && d(">td, >th",
                    e).each(function(e) {
                    e = b.column.index("toData", e);
                    !1 === a.s.current[e] && d(this).css("display", "none")
                })
            });
            b.on("destroy.dtr", function() {
                b.off(".dtr");
                d(b.table().body()).off(".dtr");
                d(l).off("resize.dtr orientationchange.dtr");
                d.each(a.s.current, function(b, e) {
                    !1 === e && a._setColumnVis(b, !0)
                })
            });
            this.c.breakpoints.sort(function(a, b) {
                return a.width < b.width ? 1 : a.width > b.width ? -1 : 0
            });
            this._classLogic();
            this._resizeAuto();
            c = this.c.details;
            !1 !== c.type && (a._detailsInit(), b.on("column-visibility.dtr", function() {
                a._timer &&
                    clearTimeout(a._timer);
                a._timer = setTimeout(function() {
                    a._timer = null;
                    a._classLogic();
                    a._resizeAuto();
                    a._resize();
                    a._redrawChildren()
                }, 100)
            }), b.on("draw.dtr", function() {
                a._redrawChildren()
            }), d(b.table().node()).addClass("dtr-" + c.type));
            b.on("column-reorder.dtr", function() {
                a._classLogic();
                a._resizeAuto();
                a._resize()
            });
            b.on("column-sizing.dtr", function() {
                a._resizeAuto();
                a._resize()
            });
            b.on("preXhr.dtr", function() {
                var e = [];
                b.rows().every(function() {
                    this.child.isShown() && e.push(this.id(true))
                });
                b.one("draw.dtr",
                    function() {
                        a._resizeAuto();
                        a._resize();
                        b.rows(e).every(function() {
                            a._detailsDisplay(this, false)
                        })
                    })
            });
            b.on("init.dtr", function() {
                a._resizeAuto();
                a._resize();
                d.inArray(false, a.s.current) && b.columns.adjust()
            });
            this._resize()
        },
        _columnsVisiblity: function(a) {
            var b = this.s.dt,
                c = this.s.columns,
                e, f, g = c.map(function(a, b) {
                    return {
                        columnIdx: b,
                        priority: a.priority
                    }
                }).sort(function(a, b) {
                    return a.priority !== b.priority ? a.priority - b.priority : a.columnIdx - b.columnIdx
                }),
                h = d.map(c, function(e, c) {
                    return !1 === b.column(c).visible() ?
                        "not-visible" : e.auto && null === e.minWidth ? !1 : !0 === e.auto ? "-" : -1 !== d.inArray(a, e.includeIn)
                }),
                m = 0;
            e = 0;
            for (f = h.length; e < f; e++) !0 === h[e] && (m += c[e].minWidth);
            e = b.settings()[0].oScroll;
            e = e.sY || e.sX ? e.iBarWidth : 0;
            m = b.table().container().offsetWidth - e - m;
            e = 0;
            for (f = h.length; e < f; e++) c[e].control && (m -= c[e].minWidth);
            var s = !1;
            e = 0;
            for (f = g.length; e < f; e++) {
                var k = g[e].columnIdx;
                "-" === h[k] && (!c[k].control && c[k].minWidth) && (s || 0 > m - c[k].minWidth ? (s = !0, h[k] = !1) : h[k] = !0, m -= c[k].minWidth)
            }
            g = !1;
            e = 0;
            for (f = c.length; e < f; e++)
                if (!c[e].control &&
                    !c[e].never && !1 === h[e]) {
                    g = !0;
                    break
                }
            e = 0;
            for (f = c.length; e < f; e++) c[e].control && (h[e] = g), "not-visible" === h[e] && (h[e] = !1); - 1 === d.inArray(!0, h) && (h[0] = !0);
            return h
        },
        _classLogic: function() {
            var a = this,
                b = this.c.breakpoints,
                c = this.s.dt,
                e = c.columns().eq(0).map(function(a) {
                    var b = this.column(a),
                        e = b.header().className,
                        a = c.settings()[0].aoColumns[a].responsivePriority;
                    a === q && (b = d(b.header()).data("priority"), a = b !== q ? 1 * b : 1E4);
                    return {
                        className: e,
                        includeIn: [],
                        auto: !1,
                        control: !1,
                        never: e.match(/\bnever\b/) ? !0 : !1,
                        priority: a
                    }
                }),
                f = function(a, b) {
                    var c = e[a].includeIn; - 1 === d.inArray(b, c) && c.push(b)
                },
                g = function(d, c, g, k) {
                    if (g)
                        if ("max-" === g) {
                            k = a._find(c).width;
                            c = 0;
                            for (g = b.length; c < g; c++) b[c].width <= k && f(d, b[c].name)
                        } else if ("min-" === g) {
                        k = a._find(c).width;
                        c = 0;
                        for (g = b.length; c < g; c++) b[c].width >= k && f(d, b[c].name)
                    } else {
                        if ("not-" === g) {
                            c = 0;
                            for (g = b.length; c < g; c++) - 1 === b[c].name.indexOf(k) && f(d, b[c].name)
                        }
                    } else e[d].includeIn.push(c)
                };
            e.each(function(a, e) {
                for (var c = a.className.split(" "), f = !1, i = 0, l = c.length; i < l; i++) {
                    var j = d.trim(c[i]);
                    if ("all" === j) {
                        f = !0;
                        a.includeIn = d.map(b, function(a) {
                            return a.name
                        });
                        return
                    }
                    if ("none" === j || a.never) {
                        f = !0;
                        return
                    }
                    if ("control" === j) {
                        f = !0;
                        a.control = !0;
                        return
                    }
                    d.each(b, function(a, b) {
                        var d = b.name.split("-"),
                            c = j.match(RegExp("(min\\-|max\\-|not\\-)?(" + d[0] + ")(\\-[_a-zA-Z0-9])?"));
                        c && (f = !0, c[2] === d[0] && c[3] === "-" + d[1] ? g(e, b.name, c[1], c[2] + c[3]) : c[2] === d[0] && !c[3] && g(e, b.name, c[1], c[2]))
                    })
                }
                f || (a.auto = !0)
            });
            this.s.columns = e
        },
        _detailsDisplay: function(a, b) {
            var c = this,
                e = this.s.dt,
                f = this.c.details;
            if (f && !1 !== f.type) {
                var g =
                    f.display(a, b, function() {
                        return f.renderer(e, a[0], c._detailsObj(a[0]))
                    });
                (!0 === g || !1 === g) && d(e.table().node()).triggerHandler("responsive-display.dt", [e, a, g, b])
            }
        },
        _detailsInit: function() {
            var a = this,
                b = this.s.dt,
                c = this.c.details;
            "inline" === c.type && (c.target = "td:first-child, th:first-child");
            b.on("draw.dtr", function() {
                a._tabIndexes()
            });
            a._tabIndexes();
            d(b.table().body()).on("keyup.dtr", "td, th", function(a) {
                a.keyCode === 13 && d(this).data("dtr-keyboard") && d(this).click()
            });
            var e = c.target;
            d(b.table().body()).on("click.dtr mousedown.dtr mouseup.dtr",
                "string" === typeof e ? e : "td, th",
                function(c) {
                    if (d(b.table().node()).hasClass("collapsed") && d.inArray(d(this).closest("tr").get(0), b.rows().nodes().toArray()) !== -1) {
                        if (typeof e === "number") {
                            var g = e < 0 ? b.columns().eq(0).length + e : e;
                            if (b.cell(this).index().column !== g) return
                        }
                        g = b.row(d(this).closest("tr"));
                        c.type === "click" ? a._detailsDisplay(g, false) : c.type === "mousedown" ? d(this).css("outline", "none") : c.type === "mouseup" && d(this).blur().css("outline", "")
                    }
                })
        },
        _detailsObj: function(a) {
            var b = this,
                c = this.s.dt;
            return d.map(this.s.columns,
                function(e, d) {
                    if (!e.never && !e.control) return {
                        title: c.settings()[0].aoColumns[d].sTitle,
                        data: c.cell(a, d).render(b.c.orthogonal),
                        hidden: c.column(d).visible() && !b.s.current[d],
                        columnIndex: d,
                        rowIndex: a
                    }
                })
        },
        _find: function(a) {
            for (var b = this.c.breakpoints, c = 0, e = b.length; c < e; c++)
                if (b[c].name === a) return b[c]
        },
        _redrawChildren: function() {
            var a = this,
                b = this.s.dt;
            b.rows({
                page: "current"
            }).iterator("row", function(c, e) {
                b.row(e);
                a._detailsDisplay(b.row(e), !0)
            })
        },
        _resize: function() {
            var a = this,
                b = this.s.dt,
                c = d(l).width(),
                e = this.c.breakpoints,
                f = e[0].name,
                g = this.s.columns,
                h, m = this.s.current.slice();
            for (h = e.length - 1; 0 <= h; h--)
                if (c <= e[h].width) {
                    f = e[h].name;
                    break
                }
            var i = this._columnsVisiblity(f);
            this.s.current = i;
            e = !1;
            h = 0;
            for (c = g.length; h < c; h++)
                if (!1 === i[h] && !g[h].never && !g[h].control && !1 === !b.column(h).visible()) {
                    e = !0;
                    break
                }
            d(b.table().node()).toggleClass("collapsed", e);
            var k = !1,
                j = 0;
            b.columns().eq(0).each(function(b, c) {
                !0 === i[c] && j++;
                i[c] !== m[c] && (k = !0, a._setColumnVis(b, i[c]))
            });
            k && (this._redrawChildren(), d(b.table().node()).trigger("responsive-resize.dt", [b, this.s.current]), 0 === b.page.info().recordsDisplay && d("td", b.table().body()).eq(0).attr("colspan", j))
        },
        _resizeAuto: function() {
            var a = this.s.dt,
                b = this.s.columns;
            if (this.c.auto && -1 !== d.inArray(!0, d.map(b, function(a) {
                    return a.auto
                }))) {
                d.isEmptyObject(n) || d.each(n, function(b) {
                    b = b.split("-");
                    r(a, 1 * b[0], 1 * b[1])
                });
                a.table().node();
                var c = a.table().node().cloneNode(!1),
                    e = d(a.table().header().cloneNode(!1)).appendTo(c),
                    f = d(a.table().body()).clone(!1, !1).empty().appendTo(c),
                    g = a.columns().header().filter(function(b) {
                        return a.column(b).visible()
                    }).to$().clone(!1).css("display",
                        "table-cell").css("min-width", 0);
                d(f).append(d(a.rows({
                    page: "current"
                }).nodes()).clone(!1)).find("th, td").css("display", "");
                if (f = a.table().footer()) {
                    var f = d(f.cloneNode(!1)).appendTo(c),
                        h = a.columns().footer().filter(function(b) {
                            return a.column(b).visible()
                        }).to$().clone(!1).css("display", "table-cell");
                    d("<tr/>").append(h).appendTo(f)
                }
                d("<tr/>").append(g).appendTo(e);
                "inline" === this.c.details.type && d(c).addClass("dtr-inline collapsed");
                d(c).find("[name]").removeAttr("name");
                d(c).css("position", "relative");
                c = d("<div/>").css({
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    clear: "both"
                }).append(c);
                c.insertBefore(a.table().node());
                g.each(function(c) {
                    c = a.column.index("fromVisible", c);
                    b[c].minWidth = this.offsetWidth || 0
                });
                c.remove()
            }
        },
        _setColumnVis: function(a, b) {
            var c = this.s.dt,
                e = b ? "" : "none";
            d(c.column(a).header()).css("display", e);
            d(c.column(a).footer()).css("display", e);
            c.column(a).nodes().to$().css("display", e);
            d.isEmptyObject(n) || c.cells(null, a).indexes().each(function(a) {
                r(c, a.row, a.column)
            })
        },
        _tabIndexes: function() {
            var a =
                this.s.dt,
                b = a.cells({
                    page: "current"
                }).nodes().to$(),
                c = a.settings()[0],
                e = this.c.details.target;
            b.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]");
            "number" === typeof e ? a.cells(null, e, {
                page: "current"
            }).nodes().to$().attr("tabIndex", c.iTabIndex).data("dtr-keyboard", 1) : ("td:first-child, th:first-child" === e && (e = ">td:first-child, >th:first-child"), d(e, a.rows({
                page: "current"
            }).nodes()).attr("tabIndex", c.iTabIndex).data("dtr-keyboard", 1))
        }
    });
    i.breakpoints = [{
        name: "desktop",
        width: Infinity
    }, {
        name: "tablet-l",
        width: 1024
    }, {
        name: "tablet-p",
        width: 768
    }, {
        name: "mobile-l",
        width: 480
    }, {
        name: "mobile-p",
        width: 320
    }];
    i.display = {
        childRow: function(a, b, c) {
            if (b) {
                if (d(a.node()).hasClass("parent")) return a.child(c(), "child").show(), !0
            } else {
                if (a.child.isShown()) return a.child(!1), d(a.node()).removeClass("parent"), !1;
                a.child(c(), "child").show();
                d(a.node()).addClass("parent");
                return !0
            }
        },
        childRowImmediate: function(a, b, c) {
            if (!b && a.child.isShown() || !a.responsive.hasHidden()) return a.child(!1), d(a.node()).removeClass("parent"), !1;
            a.child(c(), "child").show();
            d(a.node()).addClass("parent");
            return !0
        },
        modal: function(a) {
            return function(b, c, e) {
                if (c) d("div.dtr-modal-content").empty().append(e());
                else {
                    var f = function() {
                            g.remove();
                            d(j).off("keypress.dtr")
                        },
                        g = d('<div class="dtr-modal"/>').append(d('<div class="dtr-modal-display"/>').append(d('<div class="dtr-modal-content"/>').append(e())).append(d('<div class="dtr-modal-close">&times;</div>').click(function() {
                            f()
                        }))).append(d('<div class="dtr-modal-background"/>').click(function() {
                            f()
                        })).appendTo("body");
                    d(j).on("keyup.dtr", function(a) {
                        27 === a.keyCode && (a.stopPropagation(), f())
                    })
                }
                a && a.header && d("div.dtr-modal-content").prepend("<h2>" + a.header(b) + "</h2>")
            }
        }
    };
    var n = {};
    i.renderer = {
        listHiddenNodes: function() {
            return function(a, b, c) {
                var e = d('<ul data-dtr-index="' + b + '" class="dtr-details"/>'),
                    f = !1;
                d.each(c, function(b, c) {
                    c.hidden && (d('<li data-dtr-index="' + c.columnIndex + '" data-dt-row="' + c.rowIndex + '" data-dt-column="' + c.columnIndex + '"><span class="dtr-title">' + c.title + "</span> </li>").append(d('<span class="dtr-data"/>').append(t(a,
                        c.rowIndex, c.columnIndex))).appendTo(e), f = !0)
                });
                return f ? e : !1
            }
        },
        listHidden: function() {
            return function(a, b, c) {
                return (a = d.map(c, function(a) {
                    return a.hidden ? '<li data-dtr-index="' + a.columnIndex + '" data-dt-row="' + a.rowIndex + '" data-dt-column="' + a.columnIndex + '"><span class="dtr-title">' + a.title + '</span> <span class="dtr-data">' + a.data + "</span></li>" : ""
                }).join("")) ? d('<ul data-dtr-index="' + b + '" class="dtr-details"/>').append(a) : !1
            }
        },
        tableAll: function(a) {
            a = d.extend({
                tableClass: ""
            }, a);
            return function(b,
                c, e) {
                b = d.map(e, function(a) {
                    return '<tr data-dt-row="' + a.rowIndex + '" data-dt-column="' + a.columnIndex + '"><td>' + a.title + ":</td> <td>" + a.data + "</td></tr>"
                }).join("");
                return d('<table class="' + a.tableClass + ' dtr-details" width="100%"/>').append(b)
            }
        }
    };
    i.defaults = {
        breakpoints: i.breakpoints,
        auto: !0,
        details: {
            display: i.display.childRow,
            renderer: i.renderer.listHidden(),
            target: 0,
            type: "inline"
        },
        orthogonal: "display"
    };
    var p = d.fn.dataTable.Api;
    p.register("responsive()", function() {
        return this
    });
    p.register("responsive.index()",
        function(a) {
            a = d(a);
            return {
                column: a.data("dtr-index"),
                row: a.parent().data("dtr-index")
            }
        });
    p.register("responsive.rebuild()", function() {
        return this.iterator("table", function(a) {
            a._responsive && a._responsive._classLogic()
        })
    });
    p.register("responsive.recalc()", function() {
        return this.iterator("table", function(a) {
            a._responsive && (a._responsive._resizeAuto(), a._responsive._resize())
        })
    });
    p.register("responsive.hasHidden()", function() {
        var a = this.context[0];
        return a._responsive ? -1 !== d.inArray(!1, a._responsive.s.current) :
            !1
    });
    p.registerPlural("columns().responsiveHidden()", "column().responsiveHidden()", function() {
        return this.iterator("column", function(a, b) {
            return a._responsive ? a._responsive.s.current[b] : !1
        }, 1)
    });
    i.version = "2.2.2";
    d.fn.dataTable.Responsive = i;
    d.fn.DataTable.Responsive = i;
    d(j).on("preInit.dt.dtr", function(a, b) {
        if ("dt" === a.namespace && (d(b.nTable).hasClass("responsive") || d(b.nTable).hasClass("dt-responsive") || b.oInit.responsive || o.defaults.responsive)) {
            var c = b.oInit.responsive;
            !1 !== c && new i(b, d.isPlainObject(c) ?
                c : {})
        }
    });
    return i
});


/*!
 Bootstrap 4 integration for DataTables' Responsive
 ©2016 SpryMedia Ltd - datatables.net/license
*/
(function(c) {
    "function" === typeof define && define.amd ? define(["jquery", "datatables.net-bs4", "datatables.net-responsive"], function(a) {
        return c(a, window, document)
    }) : "object" === typeof exports ? module.exports = function(a, b) {
        a || (a = window);
        if (!b || !b.fn.dataTable) b = require("datatables.net-bs4")(a, b).$;
        b.fn.dataTable.Responsive || require("datatables.net-responsive")(a, b);
        return c(b, a, a.document)
    } : c(jQuery, window, document)
})(function(c) {
    var a = c.fn.dataTable,
        b = a.Responsive.display,
        g = b.modal,
        e = c('<div class="modal fade dtr-bs-modal" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"/></div></div></div>');
    b.modal = function(a) {
        return function(b, d, f) {
            if (c.fn.modal) {
                if (!d) {
                    if (a && a.header) {
                        var d = e.find("div.modal-header"),
                            h = d.find("button").detach();
                        d.empty().append('<h4 class="modal-title">' + a.header(b) + "</h4>").append(h)
                    }
                    e.find("div.modal-body").empty().append(f());
                    e.appendTo("body").modal()
                }
            } else g(b, d, f)
        }
    };
    return a.Responsive
});




// Color Picker
! function(i) {
    "function" == typeof define && define.amd ? define(["jquery"], i) : "object" == typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(i) {
    "use strict";

    function t(i) {
        var t = i.parent();
        i.removeData("minicolors-initialized").removeData("minicolors-settings").removeProp("size").removeClass("minicolors-input"), t.before(i).remove()
    }

    function o(i) {
        var t = i.parent(),
            o = t.find(".minicolors-panel"),
            a = i.data("minicolors-settings");
        !i.data("minicolors-initialized") || i.prop("disabled") || t.hasClass("minicolors-inline") || t.hasClass("minicolors-focus") || (s(), t.addClass("minicolors-focus"), o.stop(!0, !0).fadeIn(a.showSpeed, function() {
            a.show && a.show.call(i.get(0))
        }))
    }

    function s() {
        i(".minicolors-focus").each(function() {
            var t = i(this),
                o = t.find(".minicolors-input"),
                s = t.find(".minicolors-panel"),
                a = o.data("minicolors-settings");
            s.fadeOut(a.hideSpeed, function() {
                a.hide && a.hide.call(o.get(0)), t.removeClass("minicolors-focus")
            })
        })
    }

    function a(i, t, o) {
        var s, a, r, e, c = i.parents(".minicolors").find(".minicolors-input"),
            l = c.data("minicolors-settings"),
            h = i.find("[class$=-picker]"),
            d = i.offset().left,
            p = i.offset().top,
            u = Math.round(t.pageX - d),
            g = Math.round(t.pageY - p),
            m = o ? l.animationSpeed : 0;
        t.originalEvent.changedTouches && (u = t.originalEvent.changedTouches[0].pageX - d, g = t.originalEvent.changedTouches[0].pageY - p), u < 0 && (u = 0), g < 0 && (g = 0), u > i.width() && (u = i.width()), g > i.height() && (g = i.height()), i.parent().is(".minicolors-slider-wheel") && h.parent().is(".minicolors-grid") && (s = 75 - u, a = 75 - g, r = Math.sqrt(s * s + a * a), (e = Math.atan2(a, s)) < 0 && (e += 2 * Math.PI), r > 75 && (r = 75, u = 75 - 75 * Math.cos(e), g = 75 - 75 * Math.sin(e)), u = Math.round(u), g = Math.round(g)), i.is(".minicolors-grid") ? h.stop(!0).animate({
            top: g + "px",
            left: u + "px"
        }, m, l.animationEasing, function() {
            n(c, i)
        }) : h.stop(!0).animate({
            top: g + "px"
        }, m, l.animationEasing, function() {
            n(c, i)
        })
    }

    function n(i, t) {
        function o(i, t) {
            var o, s;
            return i.length && t ? (o = i.offset().left, s = i.offset().top, {
                x: o - t.offset().left + i.outerWidth() / 2,
                y: s - t.offset().top + i.outerHeight() / 2
            }) : null
        }
        var s, a, n, e, l, h, d, p = i.val(),
            g = i.attr("data-opacity"),
            m = i.parent(),
            f = i.data("minicolors-settings"),
            v = m.find(".minicolors-input-swatch"),
            w = m.find(".minicolors-grid"),
            y = m.find(".minicolors-slider"),
            C = m.find(".minicolors-opacity-slider"),
            k = w.find("[class$=-picker]"),
            M = y.find("[class$=-picker]"),
            x = C.find("[class$=-picker]"),
            I = o(k, w),
            S = o(M, y),
            z = o(x, C);
        if (t.is(".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider")) {
            switch (f.control) {
                case "wheel":
                    e = w.width() / 2 - I.x, l = w.height() / 2 - I.y, h = Math.sqrt(e * e + l * l), (d = Math.atan2(l, e)) < 0 && (d += 2 * Math.PI), h > 75 && (h = 75, I.x = 69 - 75 * Math.cos(d), I.y = 69 - 75 * Math.sin(d)), a = u(h / .75, 0, 100), p = b({
                        h: s = u(180 * d / Math.PI, 0, 360),
                        s: a,
                        b: n = u(100 - Math.floor(S.y * (100 / y.height())), 0, 100)
                    }), y.css("backgroundColor", b({
                        h: s,
                        s: a,
                        b: 100
                    }));
                    break;
                case "saturation":
                    p = b({
                        h: s = u(parseInt(I.x * (360 / w.width()), 10), 0, 360),
                        s: a = u(100 - Math.floor(S.y * (100 / y.height())), 0, 100),
                        b: n = u(100 - Math.floor(I.y * (100 / w.height())), 0, 100)
                    }), y.css("backgroundColor", b({
                        h: s,
                        s: 100,
                        b: n
                    })), m.find(".minicolors-grid-inner").css("opacity", a / 100);
                    break;
                case "brightness":
                    p = b({
                        h: s = u(parseInt(I.x * (360 / w.width()), 10), 0, 360),
                        s: a = u(100 - Math.floor(I.y * (100 / w.height())), 0, 100),
                        b: n = u(100 - Math.floor(S.y * (100 / y.height())), 0, 100)
                    }), y.css("backgroundColor", b({
                        h: s,
                        s: a,
                        b: 100
                    })), m.find(".minicolors-grid-inner").css("opacity", 1 - n / 100);
                    break;
                default:
                    p = b({
                        h: s = u(360 - parseInt(S.y * (360 / y.height()), 10), 0, 360),
                        s: a = u(Math.floor(I.x * (100 / w.width())), 0, 100),
                        b: n = u(100 - Math.floor(I.y * (100 / w.height())), 0, 100)
                    }), w.css("backgroundColor", b({
                        h: s,
                        s: 100,
                        b: 100
                    }))
            }
            r(i, p, g = f.opacity ? parseFloat(1 - z.y / C.height()).toFixed(2) : 1)
        } else v.find("span").css({
            backgroundColor: p,
            opacity: g
        }), c(i, p, g)
    }

    function r(i, t, o) {
        var s, a = i.parent(),
            n = i.data("minicolors-settings"),
            r = a.find(".minicolors-input-swatch");
        n.opacity && i.attr("data-opacity", o), "rgb" === n.format ? (s = g(t) ? d(t, !0) : w(h(t, !0)), o = "" === i.attr("data-opacity") ? 1 : u(parseFloat(i.attr("data-opacity")).toFixed(2), 0, 1), !isNaN(o) && n.opacity || (o = 1), t = i.minicolors("rgbObject").a <= 1 && s && n.opacity ? "rgba(" + s.r + ", " + s.g + ", " + s.b + ", " + parseFloat(o) + ")" : "rgb(" + s.r + ", " + s.g + ", " + s.b + ")") : (g(t) && (t = f(t)), t = l(t, n.letterCase)), i.val(t), r.find("span").css({
            backgroundColor: t,
            opacity: o
        }), c(i, t, o)
    }

    function e(t, o) {
        var s, a, n, r, e, v, y, C, k, M, x = t.parent(),
            I = t.data("minicolors-settings"),
            S = x.find(".minicolors-input-swatch"),
            z = x.find(".minicolors-grid"),
            F = x.find(".minicolors-slider"),
            T = x.find(".minicolors-opacity-slider"),
            D = z.find("[class$=-picker]"),
            j = F.find("[class$=-picker]"),
            q = T.find("[class$=-picker]");
        switch (g(t.val()) ? (s = f(t.val()), (e = u(parseFloat(m(t.val())).toFixed(2), 0, 1)) && t.attr("data-opacity", e)) : s = l(h(t.val(), !0), I.letterCase), s || (s = l(p(I.defaultValue, !0), I.letterCase)), a = function(i) {
            var t = function(i) {
                var t = {
                        h: 0,
                        s: 0,
                        b: 0
                    },
                    o = Math.min(i.r, i.g, i.b),
                    s = Math.max(i.r, i.g, i.b),
                    a = s - o;
                t.b = s, t.s = 0 !== s ? 255 * a / s : 0, 0 !== t.s ? i.r === s ? t.h = (i.g - i.b) / a : i.g === s ? t.h = 2 + (i.b - i.r) / a : t.h = 4 + (i.r - i.g) / a : t.h = -1;
                t.h *= 60, t.h < 0 && (t.h += 360);
                return t.s *= 100 / 255, t.b *= 100 / 255, t
            }(w(i));
            0 === t.s && (t.h = 360);
            return t
        }(s), r = I.keywords ? i.map(I.keywords.split(","), function(t) {
            return i.trim(t.toLowerCase())
        }) : [], v = "" !== t.val() && i.inArray(t.val().toLowerCase(), r) > -1 ? l(t.val()) : g(t.val()) ? d(t.val()) : s, o || t.val(v), I.opacity && (n = "" === t.attr("data-opacity") ? 1 : u(parseFloat(t.attr("data-opacity")).toFixed(2), 0, 1), isNaN(n) && (n = 1), t.attr("data-opacity", n), S.find("span").css("opacity", n), C = u(T.height() - T.height() * n, 0, T.height()), q.css("top", C + "px")), "transparent" === t.val().toLowerCase() && S.find("span").css("opacity", 0), S.find("span").css("backgroundColor", s), I.control) {
            case "wheel":
                k = u(Math.ceil(.75 * a.s), 0, z.height() / 2), M = a.h * Math.PI / 180, y = u(75 - Math.cos(M) * k, 0, z.width()), C = u(75 - Math.sin(M) * k, 0, z.height()), D.css({
                    top: C + "px",
                    left: y + "px"
                }), C = 150 - a.b / (100 / z.height()), "" === s && (C = 0), j.css("top", C + "px"), F.css("backgroundColor", b({
                    h: a.h,
                    s: a.s,
                    b: 100
                }));
                break;
            case "saturation":
                y = u(5 * a.h / 12, 0, 150), C = u(z.height() - Math.ceil(a.b / (100 / z.height())), 0, z.height()), D.css({
                    top: C + "px",
                    left: y + "px"
                }), C = u(F.height() - a.s * (F.height() / 100), 0, F.height()), j.css("top", C + "px"), F.css("backgroundColor", b({
                    h: a.h,
                    s: 100,
                    b: a.b
                })), x.find(".minicolors-grid-inner").css("opacity", a.s / 100);
                break;
            case "brightness":
                y = u(5 * a.h / 12, 0, 150), C = u(z.height() - Math.ceil(a.s / (100 / z.height())), 0, z.height()), D.css({
                    top: C + "px",
                    left: y + "px"
                }), C = u(F.height() - a.b * (F.height() / 100), 0, F.height()), j.css("top", C + "px"), F.css("backgroundColor", b({
                    h: a.h,
                    s: a.s,
                    b: 100
                })), x.find(".minicolors-grid-inner").css("opacity", 1 - a.b / 100);
                break;
            default:
                y = u(Math.ceil(a.s / (100 / z.width())), 0, z.width()), C = u(z.height() - Math.ceil(a.b / (100 / z.height())), 0, z.height()), D.css({
                    top: C + "px",
                    left: y + "px"
                }), C = u(F.height() - a.h / (360 / F.height()), 0, F.height()), j.css("top", C + "px"), z.css("backgroundColor", b({
                    h: a.h,
                    s: 100,
                    b: 100
                }))
        }
        t.data("minicolors-initialized") && c(t, v, n)
    }

    function c(i, t, o) {
        var s, a, n, r = i.data("minicolors-settings"),
            e = i.data("minicolors-lastChange");
        if (!e || e.value !== t || e.opacity !== o) {
            if (i.data("minicolors-lastChange", {
                    value: t,
                    opacity: o
                }), r.swatches && 0 !== r.swatches.length) {
                for (s = g(t) ? d(t, !0) : w(t), a = -1, n = 0; n < r.swatches.length; ++n)
                    if (s.r === r.swatches[n].r && s.g === r.swatches[n].g && s.b === r.swatches[n].b && s.a === r.swatches[n].a) {
                        a = n;
                        break
                    }
                i.parent().find(".minicolors-swatches .minicolors-swatch").removeClass("selected"), -1 !== a && i.parent().find(".minicolors-swatches .minicolors-swatch").eq(n).addClass("selected")
            }
            r.change && (r.changeDelay ? (clearTimeout(i.data("minicolors-changeTimeout")), i.data("minicolors-changeTimeout", setTimeout(function() {
                r.change.call(i.get(0), t, o)
            }, r.changeDelay))) : r.change.call(i.get(0), t, o)), i.trigger("change").trigger("input")
        }
    }

    function l(i, t) {
        return "uppercase" === t ? i.toUpperCase() : i.toLowerCase()
    }

    function h(i, t) {
        return (i = i.replace(/^#/g, "")).match(/^[A-F0-9]{3,6}/gi) ? 3 !== i.length && 6 !== i.length ? "" : (3 === i.length && t && (i = i[0] + i[0] + i[1] + i[1] + i[2] + i[2]), "#" + i) : ""
    }

    function d(i, t) {
        var o = i.replace(/[^\d,.]/g, "").split(",");
        return o[0] = u(parseInt(o[0], 10), 0, 255), o[1] = u(parseInt(o[1], 10), 0, 255), o[2] = u(parseInt(o[2], 10), 0, 255), o[3] && (o[3] = u(parseFloat(o[3], 10), 0, 1)), t ? o[3] ? {
            r: o[0],
            g: o[1],
            b: o[2],
            a: o[3]
        } : {
            r: o[0],
            g: o[1],
            b: o[2]
        } : void 0 !== o[3] && o[3] <= 1 ? "rgba(" + o[0] + ", " + o[1] + ", " + o[2] + ", " + o[3] + ")" : "rgb(" + o[0] + ", " + o[1] + ", " + o[2] + ")"
    }

    function p(i, t) {
        return g(i) ? d(i) : h(i, t)
    }

    function u(i, t, o) {
        return i < t && (i = t), i > o && (i = o), i
    }

    function g(i) {
        var t = i.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return !(!t || 4 !== t.length)
    }

    function m(i) {
        return (i = i.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+(\.\d{1,2})?|\.\d{1,2})[\s+]?/i)) && 6 === i.length ? i[4] : "1"
    }

    function f(i) {
        return (i = i.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === i.length ? "#" + ("0" + parseInt(i[1], 10).toString(16)).slice(-2) + ("0" + parseInt(i[2], 10).toString(16)).slice(-2) + ("0" + parseInt(i[3], 10).toString(16)).slice(-2) : ""
    }

    function v(t) {
        var o = [t.r.toString(16), t.g.toString(16), t.b.toString(16)];
        return i.each(o, function(i, t) {
            1 === t.length && (o[i] = "0" + t)
        }), "#" + o.join("")
    }

    function b(i) {
        return v(function(i) {
            var t = {},
                o = Math.round(i.h),
                s = Math.round(255 * i.s / 100),
                a = Math.round(255 * i.b / 100);
            if (0 === s) t.r = t.g = t.b = a;
            else {
                var n = a,
                    r = (255 - s) * a / 255,
                    e = o % 60 * (n - r) / 60;
                360 === o && (o = 0), o < 60 ? (t.r = n, t.b = r, t.g = r + e) : o < 120 ? (t.g = n, t.b = r, t.r = n - e) : o < 180 ? (t.g = n, t.r = r, t.b = r + e) : o < 240 ? (t.b = n, t.r = r, t.g = n - e) : o < 300 ? (t.b = n, t.g = r, t.r = r + e) : o < 360 ? (t.r = n, t.g = r, t.b = n - e) : (t.r = 0, t.g = 0, t.b = 0)
            }
            return {
                r: Math.round(t.r),
                g: Math.round(t.g),
                b: Math.round(t.b)
            }
        }(i))
    }

    function w(i) {
        return {
            r: (i = parseInt(i.indexOf("#") > -1 ? i.substring(1) : i, 16)) >> 16,
            g: (65280 & i) >> 8,
            b: 255 & i
        }
    }
    i.minicolors = {
        defaults: {
            animationSpeed: 50,
            animationEasing: "swing",
            change: null,
            changeDelay: 0,
            control: "hue",
            defaultValue: "",
            format: "hex",
            hide: null,
            hideSpeed: 100,
            inline: !1,
            keywords: "",
            letterCase: "lowercase",
            opacity: !1,
            position: "bottom left",
            show: null,
            showSpeed: 100,
            theme: "default",
            swatches: []
        }
    }, i.extend(i.fn, {
        minicolors: function(a, n) {
            switch (a) {
                case "destroy":
                    return i(this).each(function() {
                        t(i(this))
                    }), i(this);
                case "hide":
                    return s(), i(this);
                case "opacity":
                    return void 0 === n ? i(this).attr("data-opacity") : (i(this).each(function() {
                        e(i(this).attr("data-opacity", n))
                    }), i(this));
                case "rgbObject":
                    return function(t) {
                        var o, s = i(t).attr("data-opacity");
                        if (g(i(t).val())) o = d(i(t).val(), !0);
                        else {
                            var a = h(i(t).val(), !0);
                            o = w(a)
                        }
                        if (!o) return null;
                        void 0 !== s && i.extend(o, {
                            a: parseFloat(s)
                        });
                        return o
                    }(i(this));
                case "rgbString":
                case "rgbaString":
                    return function(t, o) {
                        var s, a = i(t).attr("data-opacity");
                        if (g(i(t).val())) s = d(i(t).val(), !0);
                        else {
                            var n = h(i(t).val(), !0);
                            s = w(n)
                        }
                        if (!s) return null;
                        void 0 === a && (a = 1);
                        return o ? "rgba(" + s.r + ", " + s.g + ", " + s.b + ", " + parseFloat(a) + ")" : "rgb(" + s.r + ", " + s.g + ", " + s.b + ")"
                    }(i(this), "rgbaString" === a);
                case "settings":
                    return void 0 === n ? i(this).data("minicolors-settings") : (i(this).each(function() {
                        var o = i(this).data("minicolors-settings") || {};
                        t(i(this)), i(this).minicolors(i.extend(!0, o, n))
                    }), i(this));
                case "show":
                    return o(i(this).eq(0)), i(this);
                case "value":
                    return void 0 === n ? i(this).val() : (i(this).each(function() {
                        "object" == typeof n && "null" !== n ? (n.opacity && i(this).attr("data-opacity", u(n.opacity, 0, 1)), n.color && i(this).val(n.color)) : i(this).val(n), e(i(this))
                    }), i(this));
                default:
                    return "create" !== a && (n = a), i(this).each(function() {
                        ! function(t, o) {
                            var s, a, n, r, c, l = i('<div class="minicolors" />'),
                                p = i.minicolors.defaults;
                            if (t.data("minicolors-initialized")) return;
                            o = i.extend(!0, {}, p, o), l.addClass("minicolors-theme-" + o.theme).toggleClass("minicolors-with-opacity", o.opacity), void 0 !== o.position && i.each(o.position.split(" "), function() {
                                l.addClass("minicolors-position-" + this)
                            });
                            s = "rgb" === o.format ? o.opacity ? "25" : "20" : o.keywords ? "11" : "7";
                            t.addClass("minicolors-input").data("minicolors-initialized", !1).data("minicolors-settings", o).prop("size", s).wrap(l).after('<div class="minicolors-panel minicolors-slider-' + o.control + '"><div class="minicolors-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-opacity-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-grid minicolors-sprite"><div class="minicolors-grid-inner"></div><div class="minicolors-picker"><div></div></div></div></div>'), o.inline || (t.after('<span class="minicolors-swatch minicolors-sprite minicolors-input-swatch"><span class="minicolors-swatch-color"></span></span>'), t.next(".minicolors-input-swatch").on("click", function(i) {
                                i.preventDefault(), t.focus()
                            }));
                            if ((r = t.parent().find(".minicolors-panel")).on("selectstart", function() {
                                    return !1
                                }).end(), o.swatches && 0 !== o.swatches.length)
                                for (r.addClass("minicolors-with-swatches"), a = i('<ul class="minicolors-swatches"></ul>').appendTo(r), c = 0; c < o.swatches.length; ++c) n = g(n = o.swatches[c]) ? d(n, !0) : w(h(n, !0)), i('<li class="minicolors-swatch minicolors-sprite"><span class="minicolors-swatch-color"></span></li>').appendTo(a).data("swatch-color", o.swatches[c]).find(".minicolors-swatch-color").css({
                                    backgroundColor: v(n),
                                    opacity: n.a
                                }), o.swatches[c] = n;
                            o.inline && t.parent().addClass("minicolors-inline");
                            e(t, !1), t.data("minicolors-initialized", !0)
                        }(i(this), n)
                    }), i(this)
            }
        }
    }), i([document]).on("mousedown.minicolors touchstart.minicolors", function(t) {
        i(t.target).parents().add(t.target).hasClass("minicolors") || s()
    }).on("mousedown.minicolors touchstart.minicolors", ".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider", function(t) {
        var o = i(this);
        t.preventDefault(), i(t.delegateTarget).data("minicolors-target", o), a(o, t, !0)
    }).on("mousemove.minicolors touchmove.minicolors", function(t) {
        var o = i(t.delegateTarget).data("minicolors-target");
        o && a(o, t)
    }).on("mouseup.minicolors touchend.minicolors", function() {
        i(this).removeData("minicolors-target")
    }).on("click.minicolors", ".minicolors-swatches li", function(t) {
        t.preventDefault();
        var o = i(this),
            s = o.parents(".minicolors").find(".minicolors-input"),
            a = o.data("swatch-color");
        r(s, a, m(a)), e(s)
    }).on("mousedown.minicolors touchstart.minicolors", ".minicolors-input-swatch", function(t) {
        var s = i(this).parent().find(".minicolors-input");
        t.preventDefault(), o(s)
    }).on("focus.minicolors", ".minicolors-input", function() {
        var t = i(this);
        t.data("minicolors-initialized") && o(t)
    }).on("blur.minicolors", ".minicolors-input", function() {
        var t, o, s, a, n, r = i(this),
            e = r.data("minicolors-settings");
        r.data("minicolors-initialized") && (t = e.keywords ? i.map(e.keywords.split(","), function(t) {
            return i.trim(t.toLowerCase())
        }) : [], n = "" !== r.val() && i.inArray(r.val().toLowerCase(), t) > -1 ? r.val() : null === (s = g(r.val()) ? d(r.val(), !0) : (o = h(r.val(), !0)) ? w(o) : null) ? e.defaultValue : "rgb" === e.format ? e.opacity ? d("rgba(" + s.r + "," + s.g + "," + s.b + "," + r.attr("data-opacity") + ")") : d("rgb(" + s.r + "," + s.g + "," + s.b + ")") : v(s), a = e.opacity ? r.attr("data-opacity") : 1, "transparent" === n.toLowerCase() && (a = 0), r.closest(".minicolors").find(".minicolors-input-swatch > span").css("opacity", a), r.val(n), "" === r.val() && r.val(p(e.defaultValue, !0)), r.val(l(r.val(), e.letterCase)))
    }).on("keydown.minicolors", ".minicolors-input", function(t) {
        var o = i(this);
        if (o.data("minicolors-initialized")) switch (t.keyCode) {
            case 9:
                s();
                break;
            case 13:
            case 27:
                s(), o.blur()
        }
    }).on("keyup.minicolors", ".minicolors-input", function() {
        var t = i(this);
        t.data("minicolors-initialized") && e(t, !0)
    }).on("paste.minicolors", ".minicolors-input", function() {
        var t = i(this);
        t.data("minicolors-initialized") && setTimeout(function() {
            e(t, !0)
        }, 1)
    })
});