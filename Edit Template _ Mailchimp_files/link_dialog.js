dojo.require("mojo.widgets.LinkPicker");

function showCKEditorLinkDialog(editor) {
    var link = CKEDITOR.plugins.link.getSelectedLink( editor );
    var params = { 'attrs': {} };

    if (link) {
        if(link.getAttribute('href')) params['href'] = link.getAttribute('href');
        if(link.getAttribute('title')) params['attrs']['title'] = link.getAttribute('title');
        if(link.getAttribute('name')) params['name'] = link.getAttribute('name');
        if(link.getAttribute('class')) params['attrs']['class'] = link.getAttribute('class');
        if(link.getAttribute('target')) {
            params['attrs']['target'] = link.getAttribute('target');
        }

        params['text'] = link.getText();
    }

    var anchorList = _getAnchorsInCKEditor(editor);
    if(window.getAllAnchors) {
        try {
            dojo.forEach(window.getAllAnchors(), function(anchor) {
                if(dojo.indexOf(anchorList, anchor) === -1) {
                    anchorList.push(anchor);
                }
            });
        } catch(err) {}
    }
    params['anchors'] = anchorList;
    params['createdFromCK'] = true;

    var picker = new mojo.widgets.LinkPicker(params);
    dojo.connect(picker, "onSave", function(data) {
        _saveLinkToCK(editor, data);
    });
    dojo.connect(picker, "onRemove", function() {
        (new CKEDITOR.unlinkCommand()).exec(editor);
        editor.focus();
        editor.fire('saveSnapshot');
    });
    picker.show();

    window.sel = window.editor.getSelection();
    window.sel.lock();
}

// copied essentially verbatim (and de-crapified) from the link.js file for the link dialog
function _getAnchorsInCKEditor(editor) {
    var elements = editor.document.getElementsByTag( 'img' );
    var realAnchors = new CKEDITOR.dom.nodeList( editor.document.$.anchors );
    var anchors = [];

    for (var i = 0; i < elements.count() ; i++ ) {
        var item = elements.getItem( i );
        if ( item.getAttribute( '_cke_realelement' ) && item.getAttribute( '_cke_real_element_type' ) == 'anchor' ) {
            anchors.push( editor.restoreRealElement( item ) );
        }
    }

    for (i = 0 ; i < realAnchors.count() ; i++ ) {
        anchors.push( realAnchors.getItem( i ) );
    }

    var retval = [];
    for (i = 0 ; i < anchors.length ; i++ ) {
        item = anchors[ i ];
        retval.push(item.getAttribute( 'name' ) ? item.getAttribute('name') : item.getAttribute('id'));
    }

    return retval;
}

// quick test to see if a link's content was placed there because of the HREF, likely without user input
function contentIsDefault(href, html) {
    if (href === html) return true;
    if (href.indexOf('mailto:'+html) === 0) return true;
    return false;
}

function _saveLinkToCK(editor, info) {
    editor.focus();

    this.isMobile = Boolean(window.app && window.app.nativeUtils && window.app.nativeUtils.getNativeObject());
    var element = CKEDITOR.plugins.link.getSelectedLink( editor );
    var existing = element;
    var href = info.href;

    if (!element) {
        var attributes = {
            'href' : 'javascript:void(0)/*' + CKEDITOR.tools.getNextNumber() + '*/',
            'data-cke-saved-href' : href
        };

        var style = new CKEDITOR.style( { element : 'a', attributes : attributes } );
        style.type = CKEDITOR.STYLE_INLINE;

        // we need to use the save global selection for mobile.
        if (isMobile) {
            var ranges = window.sel.getRanges();
            window.sel.selectRanges(ranges);
            style.apply( editor.document );
        } else { 
            var selection = editor.getSelection(),
            ranges = selection.getRanges();
            if ( ranges.length == 1 && ranges[0].collapsed ) {
                var text = new CKEDITOR.dom.text( info.text, editor.document);
                ranges[0].insertNode( text );
                ranges[0].selectNodeContents( text );
                selection.selectRanges( ranges );
            }
            style.apply( editor.document );
        }

        // Now find our newly created element and store it to muck with it in a minute
        var links = editor.document.find("a");
        for (i = 0, s = links.count(); i < s; i++) {
            var link = links.getItem(i);
            if (link.getAttribute("href") === attributes.href) {
                element = link;
                break;
            }
        }
    }

    element.setAttribute('href', info.href);
    element.setAttribute('data-cke-saved-href', info.href);

    if(info.attrs.title) {
        element.setAttribute('title', info.attrs.title);
    } else {
        element.removeAttribute('title');
    }

    if (info.attrs['class']) {
        element.setAttribute('class', info.attrs['class']);
    } else {
        element.removeAttribute('class');
    }
    if(info.attrs.target) {
        element.setAttribute('target', info.attrs.target);
    } else {
        element.removeAttribute('target');
    }

    if (info.linkType === "landingPageTrackingOptOut") {
        element.setText(info.text);
        element.data("tracking-opt-out", "");
        element.removeAttribute("target");
    } else {
        element.data("tracking-opt-out", false);
    }

    editor.fire('saveSnapshot');
    window.editor.getSelection().unlock();
}
