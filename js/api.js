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
    
    let obj = Object.assign({}, param, {size: param.size||1000})
    return $.ajax({
        url: domain + '/articles',
        data: obj,
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
const getHistory = function() {
    return $.ajax({
        url: domain + '/histories',
    })
}
if($(window).width()>768){
    $("#productNav").hover(function () {
        $(".nav-product-list.nav-product").show();
    }, function () {
        $(".nav-product-list.nav-product").hide();
    });
    $(".nav-product-list.nav-product").hover(function () {
        $(".nav-product-list.nav-product").show();
    }, function () {
        $(".nav-product-list.nav-product").hide();
    });
    $("#serviceNav").hover(function () {
        $(".nav-product-list.service").show();
    }, function () {
        $(".nav-product-list.service").hide();
    });
    $(".nav-product-list.service").hover(function () {
        $(".nav-product-list.service").show();
    }, function () {
        $(".nav-product-list.service").hide();
    });
    $("#solutionNav").hover(function () {
        $(".nav-product-list.solution").show();
    }, function () {
        $(".nav-product-list.solution").hide();
    });
    $(".nav-product-list.solution").hover(function () {
        $(".nav-product-list.solution").show();
    }, function () {
        $(".nav-product-list.solution").hide();
    });
}

