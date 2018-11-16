const getBanner = function() {
	return $.ajax({
	  url: domain + '/banners',
	  data: {bannerClass: 'CLASS1'}
	})
}
const getCategories = function(className){
	return $.ajax({
		url: '/categories',
		data: {articleClass: className},
	})
}
const getArticleList = function(param) {
	return $.ajax({
		url: '/articles',
		data: param,
	})

}
const getArticle = function(id) {
	return $.ajax({
		url: '/articles/' + id,
	})

}
const getCompany = function() {
	return $.ajax({
		url: '/companies/1',
	})
}
$("#productNav").hover(function (){  
    $(".nav-product-list").show();  
},function (){  
    $(".nav-product-list").hide();  
});  
$(".nav-product-list").hover(function(){
    $(".nav-product-list").show();
},function(){
    $(".nav-product-list").hide();
});