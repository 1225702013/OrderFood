define("list:widget/around_tuan/around_tuan_map.js",function(e,t,n){function a(e){this.options={id:"sround-tuan-map",name:"北京",size:6},this.options=$.extend(this.options,e),this.initMap(),this.initSearch(),this.listenEnter(),this.createPage(1,1)}function i(e){var t=this;if("marker"===m)return m=null,void this.marker.openInfoWindow(this.infoWindow);if("marker"===u)return void(u=null);var n=e.point;r.call(t,n);var a=new d.Geocoder;this.infoWindow=new d.InfoWindow,a.getLocation(n,function(e){var a=e.addressComponents,i=[a.city,a.district,a.street,a.streetNumber].join(""),r=o("info-window-tpl",{tip:"位置：",address:i,title:i,operate:"查看附近团购",lat:n.lat,lng:n.lng});t.infoWindow.setContent(r),t.marker.openInfoWindow(t.infoWindow)})}function r(e){if(this.marker)this.marker.setPosition(e);else{var t=new d.Icon(h,new d.Size(25,37),{offset:new d.Size(12,37),imageOffset:new d.Size(0,-156)});this.marker=new d.Marker(e,{enableDragging:!0,icon:t,offset:new d.Size(0,-16)}),this.addOverlay(this.marker),this.marker.addEventListener("dragend",i),this.marker.addEventListener("click",function(){m="marker"})}}var s,o=e("common:widget/ui/template/template.js").template,c=e("common:widget/dep/moye/Pager.js"),l=e("common:widget/ui/cookie/cookie.js"),d=d||window.BMap,p=p||window.BMapLib,h="markers_new.png"/*tpa=http://maps.baidu.com/image/markers_new.png*/,m=null,u=null;a.prototype={constructor:a,initMap:function(){var e=l.get("areaCode"),t=this;$.ajax({type:"get",url:"/pcindex/main/getcityajax",dataType:"json",data:{areaCode:e},success:function(e){var n=e.data.city_name,a=t.options,i=new d.Map(a.id,{enableMapClick:!1});i.centerAndZoom(n,a.size),i.enableScrollWheelZoom(),i.setDefaultCursor("crosshair"),i.addControl(new d.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_LEFT,type:window.BMAP_NAVIGATION_CONTROL_BIG})),t.map=i,t.initMapClickEvent()}})},initSearch:function(){function e(e){e&&e.preventDefault(),n.value&&t.search(n.value)}var t=this,n=$('input[name="around-form-text"]')[0],a=new d.Autocomplete({input:n,location:this.map});a.addEventListener("onconfirm",function(){e()}),$('form[name="around-form"]').on("submit",e),n.focus()},listenEnter:function(){var e=this,t=$('input[name="around-form-text"]');t.on("keydown",function(t){if(13===t.keyCode){t.preventDefault();var n=this.value;e.search(n)}})},search:function(e){this.localSearch||this.createLocalSearch(),this.localSearch.search(e)},createLocalSearch:function(){var e=this,t=$(this.options.resultPanel);this.localSearch=new d.LocalSearch(this.map,{pageCapacity:e.options.pageSize,onSearchComplete:function(n){if(e.localSearch.getStatus()!==BMAP_STATUS_SUCCESS)return t.html('<li class="noresult">没有找到您想要的结果，请换个关键词试试。</li>'),void(s&&s.setTotal(0));e.resetPanel();var a=n.getPageIndex()+1,i=n.getNumPages(),r=[];r.push('<li class="search-num">共有'+n.getNumPois()+"条结果</li>");for(var c=0;c<n.getCurrentNumPois();c++){var l=n.getPoi(c),p=$.stringify({lng:l.point.lng,lat:l.point.lat,title:l.title,content:l.address,type:l.type,index:c}),h=l.address?e.getMapType(l.type,!0)+l.address:e.getMapType(l.type,!0)+l.title,m=o("result-item-tpl",{index:c,poiString:p,title:l.title+e.getMapType(l.type),desc:h,address:l.address,lat:l.point.lat,lng:l.point.lng});r.push(m),e.addMarker(p,!1)}if(c===n.getCurrentNumPois()){var u=n.getPoi(0).point;e.map.centerAndZoom(new d.Point(u.lng,u.lat),12)}if(t.html(r.join("")),e.initPanelEvent(),s){s.getPage()===a||s.setPage(a),s.getTotal()===i||s.setTotal(i);var f=n.getCurrentNumPois();e.marker[f]&&(e.marker[f].hide(),f+=1)}}})},createPage:function(e,t){var n=this;s=new c({main:$("#searchResultPager"),page:e,first:1,total:t,showCount:4,showAlways:!1}),s.on("change",function(e){var t=parseInt(e.page,10);if(t!==this.getPage()){n.localSearch.gotoPage(t-1),this.setPage(t);var a=e.page;s.total>s.showCount&&(a>s.showCount/2+1?$(".n-pager-prev").next().addClass("n-pager-disabled"):$(".n-pager-prev").next().removeClass("n-pager-disabled"))}}),s.render()},initPanelEvent:function(){function e(){var e=parseInt(this.getAttribute("data-i"),10);e!==a.selectIndex&&($(this).addClass("selected"),a.addMarker(this.getAttribute("data-params")),a.marker[e].setIcon(a.createMapIcon(e,!0)),a.marker[e].setTop(!0))}function t(){var e=parseInt(this.getAttribute("data-i"),10);e!==a.selectIndex&&($(this).removeClass("selected"),a.marker[e].setIcon(a.createMapIcon(e)),a.marker[e].setTop(!1))}function n(){a.selectPanel(this)}var a=this;$(this.options.resultPanel).find(".result-item").on({click:n,mouseenter:e,mouseleave:t})},resetPanel:function(){this.selectItem&&($(this.selectItem).removeClass("selected"),this.marker&&(this.marker[this.selectIndex].setIcon(this.createMapIcon(this.selectIndex)),this.marker[this.selectIndex].closeInfoWindow()),this.selectItem=this.selectIndex="")},selectPanel:function(e){var t=this,n=parseInt(e.getAttribute("data-i"),10),a=t.addMarker(e.getAttribute("data-params"),!0);t.selectIndex!==n&&(t.selectItem||(t.selectItem=$(e.parentNode).children()[1],t.selectIndex=t.selectItem.getAttribute("data-i")),$(t.selectItem).removeClass("selected"),$(e).addClass("selected"),t.selectItem=e,t.marker[t.selectIndex].setIcon(t.createMapIcon(t.selectIndex)),t.selectIndex=n,a&&t.marker[t.selectIndex].setIcon(t.createMapIcon(t.selectIndex,!0)))},addMarker:function(e,t){e=$.parseJSON(e);var n=this,a=parseInt(e.index,10),i=parseFloat(e.lng),r=parseFloat(e.lat),s=new d.Point(i,r);if(this.marker||(this.marker=[],this.infoWindow=new d.InfoWindow("",{maxWidth:350})),this.marker[a]){if(this.marker[a].setPosition(s),t){var c='<div class="search-marker-title">'+e.title+this.getMapType(e.type)+"</div>",l=e.content?this.getMapType(e.type,!0):"",p=e.content?e.content:"",h=o("info-window-tpl",{tip:l,address:p,title:e.title+this.getMapType(e.type),operate:"查看附近团购",lat:s.lat,lng:s.lng});this.infoWindow.setTitle(c),this.infoWindow.setContent(h),this.marker[a].openInfoWindow(this.infoWindow),this.marker[a].setIcon(this.createMapIcon(a,t))}}else this.marker[a]=new d.Marker(s),this.marker[a].setIcon(this.createMapIcon(a,t)),this.map.addOverlay(this.marker[a]);this.marker[a].show(),this.marker[a].addEventListener("click",function(){var e=$("li[data-i]");e.each(function(t){parseInt(e[t].getAttribute("data-i"),10)===a&&n.selectPanel(e[t])}),u="marker"})},createMapIcon:function(e,t){var n=t?34:24,a=t?26:19,i=t?13:9,r=t?36:27,s=t?-73:-199;return new d.Icon(h,new d.Size(a,r),{offset:new d.Size(i,r),imageOffset:new d.Size(0-e*n,s)})},getMapType:function(e,t){e=parseInt(e,10);var n=t?"：":"站";switch(e){case window.BMAP_POI_TYPE_NORMAL:return t?"地址：":"";case window.BMAP_POI_TYPE_BUSSTOP:return"公交"+n;case window.BMAP_POI_TYPE_SUBSTOP:return"地铁"+n;default:return""}},initMapClickEvent:function(){this.map.addEventListener("click",i)}},n.exports=a});