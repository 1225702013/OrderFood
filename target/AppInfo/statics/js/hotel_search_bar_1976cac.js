define("list:widget/hotel_search_bar/hotel_search_bar.js",function(i,n,t){function o(){a.on("click",function(){s||(s=!0,r.show())}),$("body").on("click",function(i){var n=i.target;n.id!=d&&s&&(s=!1,r.hide())}),$("#j-hotel-pop-district").on("click",function(i){var n=i.target;-1!==n.className.indexOf("position-item")&&a.val(n.innerHTML)})}function c(i){e=i,r=$("#"+i.popId),a=$("#"+i.inputId),d=i.inputId,o()}var e,a,r,d,s=!1;t.exports={init:c}});