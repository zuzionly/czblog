$.fn.autogrow = function(options) {

    this.filter('textarea').each(function() {

        var $this       = $(this),
                minHeight   = $this.height(),
                lineHeight  = $this.css('lineHeight');

        var shadow = $('<div></div>').css({
            position:   'absolute',
            top:        -10000,
            left:       -10000,
            width:      $(this).width(),
            fontSize:   $this.css('fontSize'),
            fontFamily: $this.css('fontFamily'),
            lineHeight: $this.css('lineHeight'),
            resize:     'none'
        }).appendTo(document.body);

        var update = function() {

            var val = this.value.replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/&/g, '&amp;')
                    .replace(/\n/g, '<br/>');

            shadow.html(val);
            $(this).css('height', Math.max(shadow.height() + 20, minHeight));
        }

        $(this).change(update).keyup(update).keydown(update);

        update.apply(this);

    });

    return this;
};

function issueSaveAjax(id, redirect){
    var ptitle   = $("#post_title").val();
    var pcontent = $("#post_content").val();
    var req = $.ajax({
        type: "POST",
        url:"/admin/save/"+id,
        data: {title: ptitle,
               content: pcontent}
    });
    req.done(function(message)
    {
        if (redirect)
        {
            var win = window.open("/preview/"+id, '_blank');
        }
    })
};

function uploadFile(){

    var data = new FormData();
    data.append('file', $('#fileName')[0].files[0]);

    $.ajax({
        url: '/file/save',
        data: data,
        processData: false,
        type: 'POST',
        contentType: false,
        // Now you should be able to do this:
        mimeType: 'multipart/form-data',    //Property added in 1.5.1

        success: function (data) {
            alert(data);
        }
    });
}

function save_settings(redirect){
    var sPOSTS_PER_PAGE = $("#POSTS_PER_PAGE").val();
    var sPOST_CONTENT_ON_HOMEPAGE = $("input[name='POST_CONTENT_ON_HOMEPAGE']:checked").val();
    var sSHOW_VIEWS_ON_HOMEPAGE = $("input[name='SHOW_VIEWS_ON_HOMEPAGE']:checked").val();
    var sANALYTICS_ID = $("#ANALYTICS_ID").val();
    var sGITHUB_USERNAME = $("#GITHUB_USERNAME").val();
    var sGOOGLE_PLUS_PROFILE = $("#GOOGLE_PLUS_PROFILE").val();
    var sTWITTER_HANDLE = $("#TWITTER_HANDLE").val();
    var sCONTACT_EMAIL = $("#CONTACT_EMAIL").val();
    var sBLOG_TITLE = $("#BLOG_TITLE").val();
    var sBLOG_TAGLINE = $("#BLOG_TAGLINE").val();
    var sFONT_NAME = $("#FONT_NAME").val();
    var req = $.ajax({
        type: "POST",
        url:"/settings/save",
        data: {
        POSTS_PER_PAGE: sPOSTS_PER_PAGE,
        POST_CONTENT_ON_HOMEPAGE : sPOST_CONTENT_ON_HOMEPAGE,
        SHOW_VIEWS_ON_HOMEPAGE : sSHOW_VIEWS_ON_HOMEPAGE,
        ANALYTICS_ID : sANALYTICS_ID,
        GITHUB_USERNAME : sGITHUB_USERNAME,
        GOOGLE_PLUS_PROFILE : sGOOGLE_PLUS_PROFILE,
        TWITTER_HANDLE : sTWITTER_HANDLE,
        CONTACT_EMAIL : sCONTACT_EMAIL,
        BLOG_TITLE : sBLOG_TITLE,
        BLOG_TAGLINE : sBLOG_TAGLINE,
        FONT_NAME : sFONT_NAME
        }
    });
    req.done(function(message)
    {
        if (redirect)
        {
            //todo
        }
    })
};


// run on load
$(function(){
    preRender();
    render();
    bindTabs();
    jQuery.ias({
    	container : '.listing',
    	item: '.post',
    	pagination: '.pager',
    	next: '.next a',
    	loader: '<img src="/static/img/loader.gif"/>',
        noneleft:true
    });
});



function render(){
    $('pre').addClass('prettyprint').addClass("linenums").addClass('pre-scrollable');
    prettyPrint();


    $('#modal-from-delete').live('show', function() {
        var id = $(this).data('id'),
            removeBtn = $(this).find('.danger'),
            href = removeBtn.attr('href');

        removeBtn.attr('href', 'delete/'+id);
    });

    $('.confirm-delete').live('click',function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        $('#modal-from-delete').data('id', id).modal('show');
    });

    $('#fileName').live('change',function() {
       $('#attach').val($(this).val());
    });
}

function preRender(){
    var $loading;
    var _loading = {};

    $loading = $('#loading');
    _loading.points = new Array();
    _loading.point = 0;
    for (var i = 0, j = 0; j >= -4495; j-=155) {
      _loading.points[i++] = j;
    };

    _loading.next = function() {
        if(this.point == this.points.length) this.point = 0;
        return this.points[this.point++];
    }

    _loading.animate = function() {
        $loading.css("background-position", this.next() + "px 0");
        if(!this.terminated) setTimeout(function() {_loading.animate()}, 30);
    }

    _loading.stop = function() {
        this.terminated = true;
        this.point = 0;
    }

    var showLoading = function() {
        var margin_top = ($(window).height() - $loading.outerHeight()) / 2;
        $loading.css("margin-top", margin_top + "px");
        $("#lock").fadeIn();
        _loading.terminated = false;
        _loading.animate();
      }

    var hideLoading = function() {
        $("#lock").fadeOut();
        _loading.stop();
    }

    $(document)
      .on('pjax:start', showLoading)
      .on('pjax:end',   function() {$("#lock").fadeOut();_loading.stop();bindTabs();})
}

function bindTabs(){

    //get current uri
    var url = window.location.href
    //get path
    var path = url.split('/')[3];
    if(''== path || 'post' == path){
        $('#home').addClass('active');
        $("#nav_tab > li[id!=home]").removeClass('active');
    }else if('admin'== path || 'edit' == path){
        $('#admin').addClass('active');
        $("#nav_tab > li[id!=admin]").removeClass('active');
    }else if('settings'==path){
        $('#settings').addClass('active');
        $("#nav_tab > li[id!=settings]").removeClass('active');
    }else if('guestbook'==path){
        $('#guestbook').addClass('active');
        $("#nav_tab > li[id!=guestbook]").removeClass('active');
    }else if('about'==path){
        $('#about').addClass('active');
        $("#nav_tab > li[id!=about]").removeClass('active');
    }else{
        $('#home').addClass('active');
        $("#nav_tab > li[id!=home]").removeClass('active');
    }
    //end bind tab

}

$('#wrap').delegate('a[data-pjax]', 'click', function(e) {
    e.preventDefault();
    var targetUrl = $(this).data('pjax');
    //get current uri
    var url = window.location.href
    //get path
    var path = url.split('/')[3];
    if(targetUrl != ("/"+path)){
        $(".slider").animate({"left":"-=1500px"}, "slow",function(){
            $.pjax({
              url: targetUrl,
              container: '#main-content'
            });
         });
     }
});
