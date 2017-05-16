$(function () {
    // initial tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // fold sidebar
    $("#sidebar-fold").click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        // $('.collapse').collapse('toggle');
        if($(this).hasClass("icon-unfold")){
            // fold sidebar
            $(this).removeClass("icon-unfold").addClass("icon-fold").attr("title","展开导航").attr("data-original-title","展开导航");
            $(".viewFrameWork").removeClass("sidebar-full").addClass("sidebar-min");
            setCookie("fold_state","fold");
        }else if ($(this).hasClass("icon-fold")) {
            // unfold sidebar
            $(this).removeClass("icon-fold").addClass("icon-unfold").attr("title","收起导航").attr("data-original-title","收起导航");
            $(".viewFrameWork").removeClass("sidebar-min").addClass("sidebar-full");
            setCookie("fold_state","unfold");
        }
    });
});
// set cookie
function setCookie(c_name,value){
    document.cookie=c_name+ "=" +escape(value);
}
// get cookie
function getCookie(c_name){
    if(document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=")
        if(c_start!=-1){
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1){
                c_end=document.cookie.length
            }
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}
