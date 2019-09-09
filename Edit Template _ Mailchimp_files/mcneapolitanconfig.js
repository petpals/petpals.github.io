CKEDITOR.editorConfig = function(config) {
    config.plugins =
        'basicstyles,' +
        'bidi,' +
        'blockquote,' +
        'clipboard,' +
        'colorbutton,' +
        'colordialog,' +
        'contextmenu,' +
        'dialogadvtab,' +
        'div,' +
        'enterkey,' +
        'entities,' +
        'find,' +
        'image,' +
        'floatingspace,' +
        'format,' +
        'horizontalrule,' +
        'htmlwriter,' +
        'indentlist,' +
        'indentblock,' +
        'justify,' +
        'link,' +
        'list,' +
        'liststyle,' +
        'newpage,' +
        'pagebreak,' +
        'pastefromword,' +
        'pastetext,' +
        'preview,' +
        'removeformat,' +
        'resize,' +
        'save,' +
        'selectall,' +
        'showblocks,' +
        'showborders,' +
        'sourcearea,' +
        'specialchar,' +
        'stylescombo,' +
        'tab,' +
        'table,' +
        'tabletools,' +
        'toolbar,' +
        'undo,' +
        'wysiwygarea';

    config.colorButton_enableMore = true;
    config.enterMode = CKEDITOR.ENTER_BR;

    config.autoGrow_onStartup = true;

    config.fontFormats = 'p;h1;h2;h3;h4;h5;h6;pre;address;div';
    config.fontSize_sizes =
        '12/12px;14/14px;18/18px;24/24px;32/32px;48/48px;64/64px;Default Size/;' +
        '10/10px;11/11px;12/12px;13/13px;14/14px;15/15px;16/16px;17/17px;18/18px;19/19px;20/20px;21/21px;22/22px;23/23px;24/24px;25/25px;26/26px;27/27px;28/28px;29/29px;30/30px;31/31px;32/32px;33/33px;34/34px;35/35px;36/36px;37/37px;38/38px;39/39px;40/40px;41/41px;42/42px;43/43px;44/44px;45/45px;46/46px;47/47px;48/48px;49/49px;50/50px;51/51px;52/52px;53/53px;54/54px;55/55px;56/56px;57/57px;58/58px;59/59px;60/60px;61/61px;62/62px;63/63px;64/64px;';

    config.extraAllowedContent =
        'a abbr acronym address area article aside b base basefont bdi bdo big blink blockquote ' +
        'br button caption center cite code col colgroup content data datalist dd del details dfn dir div dl dt ' +
        'element em fieldset figcaption figure font footer h1 h2 h3 h4 h5 h6 header hgroup hr i img ins label legend ' +
        'li link listing main map mark marquee menu menuitem meta meter nav nobr ol p pre progress q s samp section small ' +
        'spacer span strike strong style sub summary sup table tbody td textarea tfoot th thead tr tt u ul wbr xmp(*){*}[*]';

    config.removeFormatTags = 'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var,h1,h2,h3,h4,h5,h6';
    config.forceSimpleAmpersand = true;
    config.scayt_autoStartup = false;
    config.extraPlugins = 'aspell,mergetags,mcimage,autogrow,onchange,toolbarexpander';
    config.disableNativeSpellChecker = false;

    config.toolbar_Full = [
        ["Bold", "Italic", "Underline", "Link", "Unlink", "MCImage", "NumberedList", "BulletedList", "PasteText", "PasteFromWord", "RemoveFormat", "Source"],
        "/",
        ["Styles", "Font", "FontSize", "TextColor", "BGColor", "HorizontalRule", "Anchor", "Merges", "BidiLtr", "BidiRtl", "JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock", "SpellCheck", "Undo", "Redo"]
    ];
    config.toolbar_Mobile = [
        ["Bold", "Italic", "Underline", "Link", "Unlink", "JustifyLeft", "JustifyCenter", "JustifyRight"],
    ];
    // call out to the global app object to see if Native Mobile objects exist
    var hasNativeMobile = window.app && window.app.nativeUtils && window.app.nativeUtils.getNativeObject();
    // config mobile experience with alt settings: toolbar, startupFocus
    config.toolbar = hasNativeMobile ? "Mobile" : "Full";
    config.startupFocus = hasNativeMobile ? false : true;
    // add the height of the toolbar for mobile
    // when changing the height of the tool buttons, change this height as well
    config.autoGrow_bottomSpace = hasNativeMobile ? 87 : 0;
    config.skin = hasNativeMobile ? "mcMobile" : "mc";

    config.dialog_backgroundCoverColor = '#000000';
    config.resize_enabled = false;
    config.toolbarCanCollapse = true;
    config.useComputedState = false;
    config.bodyClass = 'neapolitan-ck-body';
    config.font_names =
        'Arial/Arial, Helvetica Neue, Helvetica, sans-serif;' +
        'Comic Sans MS/Comic Sans MS, Marker Felt-Thin, Arial, sans-serif;' +
        'Courier New/Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;' +
        'Georgia/Georgia, Times, Times New Roman, serif;' +
        "Helvetica/Helvetica Neue, Helvetica, Arial, Verdana, sans-serif;" +
        'Lucida/Lucida Sans Unicode, Lucida Grande, sans-serif;' +
        'Tahoma/Tahoma, Verdana, Segoe, sans-serif;' +
        'Times New Roman/Times New Roman, Times, Baskerville, Georgia, serif;' +
        'Trebuchet MS/Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;' +
        'Verdana/Verdana, Geneva, sans-serif;';

    var webFonts = [
        "Arvo/Arvo, Courier, Georgia, serif",
        "Lato/Lato, Helvetica Neue, Helvetica, Arial, sans-serif",
        "Lora/Lora, Georgia, Times New Roman, serif",
        "Merriweather/Merriweather, Georgia, Times New Roman, serif",
        "Merriweather Sans/Merriweather Sans, Helvetica Neue, Helvetica, Arial, sans-serif",
        "Noticia Text/Noticia Text, Georgia, Times New Roman, serif",
        "Open Sans/Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif",
        "Playfair Display/Playfair Display, Georgia, Times New Roman, serif",
        "Roboto/Roboto, Helvetica Neue, Helvetica, Arial, sans-serif",
        "Source Sans Pro/Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif"
    ];

    var extendedWebFonts = [
        "Archivo Narrow/Archivo Narrow, Helvetica Neue, Helvetica, Arial, sans-serif",
        "Caveat/Caveat, Arial, sans-serif",
        "Dancing Script/Dancing Script, Arial, sans-serif",
        "Josefin Slab/Josefin Slab, Georgia, Times New Roman, serif",
        "Karla/Karla, Helvetica Neue, Helvetica, Arial, sans-serif",
        "Montserrat/Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif",
        "Nunito/Nunito, Helvetica Neue, Helvetica, Arial, sans-serif",
        "PT Serif/PT Serif, Courier, Georgia, serif",
        "Raleway/Raleway, Helvetica Neue, Helvetica, Arial, sans-serif",
        "Space Mono/Space Mono, Courier, Georgia, serif"
    ];

    // Use extended web fonts for campaigns that support them
    if (window.app && window.app.campaignType === "page") {
        webFonts = webFonts.concat(extendedWebFonts);
        webFonts.sort();

        // We're not supporting merge tags for the initial release of landing pages so
        // we need to remove it from the toolbar for now.
        config.toolbar_Full = [
            ["Bold", "Italic", "Underline", "Link", "Unlink", "MCImage", "NumberedList", "BulletedList", "PasteText", "PasteFromWord", "RemoveFormat", "Source"],
            "/",
            ["Styles", "Font", "FontSize", "TextColor", "BGColor", "HorizontalRule", "Anchor", "BidiLtr", "BidiRtl", "JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock", "SpellCheck", "Undo", "Redo"]
        ];
    }

    config.webfont_names = webFonts.join(";");
};
