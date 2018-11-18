function exeData(num, type) {
    // loadData(num);
    loadpage();
}
function loadpage() {
    var myPageCount = 55
    var myPageSize = 10
    var countindex = myPageCount % myPageSize > 0 ? (myPageCount / myPageSize) + 1 : (myPageCount / myPageSize);
    $("#countindex").val(countindex);

    $.jqPaginator('#pagination', {
        totalPages: 5,
        visiblePages: 3,
        currentPage: 1,
        first: '<li class="first"><a href="javascript:;">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:;"><i class="arrow arrow2"></i>上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页<i class="arrow arrow3"></i></a></li>',
        last: '<li class="last"><a href="javascript:;">末页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        onPageChange: function (num, type) {
            if (type == "change") {
                exeData(num, type);
            }
        }
    });
}
// $(function () {
//     // loadData(1);
//     loadpage();
// });
$(function() {
    let obj = getUrlQuery()
    getCategories('NEWS').done(val => {
        let html = ``
        let idx = 0
        if (obj.id) {
            val.forEach((item,index) => {
                if (item.id == obj.categoryId) {
                    idx = index
                }
            })
        }
        val.forEach((item,index) => {
            if (index == idx) {
                html += `<div class="pro-item active"  data-id="${item.id}">${item.name}</div>`
            } else {
                html += `<div class="pro-item" data-id="${item.id}">${item.name}</div>`
            }
            
        })
        $('#product-list').html(html)
        $('#product-list .pro-item').click(function(event) {
            $('#product-list .pro-item').removeClass('active')
            $(this).addClass('active')
            setMethods('NEWS','sub-product-list','product-detail',$(this).data('id'))
        });
        setMethods('NEWS','sub-product-list','product-detail',val[idx].id,obj.id)
    })
})
function setMethods(category,id,detailId,categoryId,productId) {
    if (productId) {
        getArticle(productId).done(val => {
            $('#pagination').hide();
            $(`#${id}`).html(val.content)
        })
        return
    }
    getArticleList({
        articleClass: category,
        categoryId:categoryId,
    }).done(val => {
        val.totalPages && val.totalElements > val.size && $('#pagination').show();
        let html = ``
        let idx = 0
        if (productId) {
            val.content.forEach((item,index) => {
                if (item.id == productId) {
                    idx = index
                }
            })
        }
        if (val.totalPages ) {
            $.jqPaginator('#pagination', {
                totalPages: val.totalPages,
                visiblePages: 3,
                currentPage: 1,
                first: '<li class="first"><a href="javascript:;">首页</a></li>',
                prev: '<li class="prev"><a href="javascript:;"><i class="arrow arrow2"></i>上一页</a></li>',
                next: '<li class="next"><a href="javascript:;">下一页<i class="arrow arrow3"></i></a></li>',
                last: '<li class="last"><a href="javascript:;">末页</a></li>',
                page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                onPageChange: function (num, type) {
                    if (type === 'change') {
                        getArticleList({
                            articleClass: category,
                            categoryId:categoryId,
                            page: num
                        }).done(val => {
                            let html = ``
                            val.content.forEach((item,index) => {
                                html += `<div class="news-item">
                                            <div class="news-title" data-id="${item.id}">${item.title}</div>
                                            <div class="date">${item.modifiedTime}</div>
                                        </div>`
                                
                            })
                            $(`#${id}`).html(html)
                            $(`#${detailId}`).html(val.content[idx].content)
                            $(`#${id} .news-item .news-title`).click(function(event) {
                                /* Act on the event */  
                                getArticle($(this).data('id')).done(val => {
                                    $(`#${id}`).html(val.content)
                                })
                            });
                        })
                    }
                }
            });
        }
        
        val.content.forEach((item,index) => {
            html += `<div class="news-item">
                        <div class="news-title" data-id="${item.id}">${item.title}</div>
                        <div class="date">${item.modifiedTime}</div>
                    </div>`
            
        })
        $(`#${id}`).html(html)
        $(`#${detailId}`).html(val.content[idx].content)
        $(`#${id} .news-item .news-title`).click(function(event) {
            /* Act on the event */  
            getArticle($(this).data('id')).done(val => {
                $('#pagination').hide();
                $(`#${id}`).html(val.content)
            })
        });
    })
}