define("list:widget/related_query/related_query.js",function(e,t,n){var i=e("common:widget/ui/usertrack/usertrack.js"),r=function(){function e(){$(document.body).on("mousedown",".query-list li",function(e){var t=$(this);if(!t.is("a[mon], input[mon], span[mon]")){var n=$(e.target),r=[];do{var o=n.attr("mon");o&&r.push(o),n=n.parent()}while(!n.is("html"));r=r.join("&").split("&");for(var a={},s=0,p=r.length;p>s;s++){var d=r[s].split("=");a[d[0]]=d[1]}var u={da_src:encodeURIComponent($.stringify({page:a.page,area:a.area,element:a.element,position:a.position,src_type:a.src_type,weight:a.weight,exp_id:a.exp_id,rid:a.rid}))};a.element_type&&(u.element_type=a.element_type),i.send(u)}})}return{init:function(){e()}}}();n.exports={init:r.init}});