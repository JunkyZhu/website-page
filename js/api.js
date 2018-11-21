const getBanner = function (className = 'CLASS1') {
    return $.ajax({
        url: domain + '/banners',
        data: {bannerClass: className}
    })
}
const getCategories = function (className) {
    return $.ajax({
        url: domain + '/categories',
        data: {articleClass: className},
    })
}
const getArticleList = function (param,isAsync =false) {
    return $.ajax({
        url: domain + '/articles',
        data: param,
        async: isAsync,
    })
}
const getHire = function () {
    return $.ajax({
        url: domain + '/jobs',
    })
    
}
const getArticle = function (id) {
    return $.ajax({
        url: domain + '/articles/' + id,
    })

}
const getCompany = function () {
    return $.ajax({
        url: domain + '/companies/1',
    })
}
if($(window).width()>768){
    $("#productNav").hover(function () {
        $(".nav-product-list").show();
    }, function () {
        $(".nav-product-list").hide();
    });
    $(".nav-product-list").hover(function () {
        $(".nav-product-list").show();
    }, function () {
        $(".nav-product-list").hide();
    });
}

