define("list:widget/filter/category/category.js",function(t,e,i){i.exports={getPClassList:function(){var t=[];return $('.filter-section[mon="area=filterCatg"] .w-filter-item.filter-active').each(function(e,i){var r=$(i.firstChild).text();"全部"!==r&&t.push(r)}),t}}});