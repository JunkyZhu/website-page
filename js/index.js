/*网站滚动*/
$(window).scroll(function () {
    // if($(window).width()>768){
    if ($(window).scrollTop() > 100) {
        $("#nav-bg").removeClass("curr");
    }
    else {
        $("#nav-bg").addClass("curr");
    }
    // }
});
$(function () {
    getBanner().done(val => {
        setBanner(val)
    })
    getBanner('CLASS2').done(val => {
    	let html = '<div class="clearfix content">'
        val.forEach((item,index) => {
        	if (index %3 == 0) {
        		html += `</div>
        <div class="clearfix content">`
				
        	}
			html += `<div class="col-md-4 col-sm-12 col-xs-12 flex flex-align">
	            
        		<img src="${item.imageUrl}" height="60" alt="">
	            <div class="title">${item.title}</div>
	            <div class="content">
	            ${item.summary}
	            </div>
	            </div>`
        })
        html += '</div>'
        $('#service-content').append(html)
    })
    setBannerNews()
    getHire().done(val => {
    	let html = ''
    	val.content.forEach((item,index) => {
    		if(index <= 2) {
    			html += `<div ><a href="./hire.html#${item.id}">${item.name}</a></div>`
    		}
    	})
    	$('#hireDesc').html(html)
    })
    getArticleList({
    	articleClass:'PRODUCT',
    	showIndex: 1
    }).done(val=> {
    	let html = ``
    	let html1 = ``
    	val.content.forEach((item,index) => {
    		if (index <= 2) {
    			html += `<div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"><a href="./product.html?categoryId=${item.categoryId}&id=${item.id}">${item.title}</a></div>`
    			html1 += `<div class="product-title">
                    <img src="${item.icoUrl}" height="38" alt="">
                    <div class="title" data-id="${item.id}">${item.title}</div>
                </div>`


    		}

    	})
       
    	$('#product-sub-list').html(html1)
    	$('#product-sub-list').find('.product-title:first-child').find('.title').addClass('active')
    	$('#product-list-desc').html(html)
    	setProductDetail(val.content[0] || [])
    	
    	$('#product-sub-list .product-title .title').click(function(event) {
    		$('#product-sub-list .product-title .title').removeClass('active')
    		$(this).addClass('active')
    		getArticle($(this).data('id')).done(val => {
    			setProductDetail(val)
    		})
    	});
    })
});
function setProductDetail(val) {
    // <div class="product-title">
    //             ${val.summary}
    //         </div>
	$('.product-detail').html(`
            <div class="product-content ql-editor">
                ${val.summary}
            </div>
            <div class="read-more">
                <a style="color: #395dad" href="./product.html?categoryId=${val.categoryId}&id=${val.id}">READ MORE →</a>
            </div>`)
}
function setBannerNews() {
	getArticleList({
		articleClass: 'NEWS'
	}).done(val => {
		let list = val.content
		let html = ``
		if (list.length >= 2) {
            if (list[0]) {
                html += `<div class="left col-md-6 col-xs-12" onclick="location.href='./news.html?categoryId=${list[0].categoryId}&id=${list[0].id}'">
                <img style="width: 100%;object-fit: cover;height: 300px;"
                     src="${list[0] && list[0].imageUrl}"
                     alt="">
                <div class="date-content">
                    <div class="day" >${formatDay(list[0] && list[0].modifiedTime)}</div>
                    <div class="date">${formatMonth(list[0] && list[0].modifiedTime)}</div>
                </div>
                <div style="position:relative; width: 100%">
                    <div class="news-main-title">${list[0] && list[0].title}</div>
                </div>
            </div>`
            }
			html += `<div class="col-md-6 col-xs-12">`
            if (list[1]) {
                html += `<div class="line flex">
                    <div class="date-content">
                        <div class="day">${formatDay(list[1] && list[1].modifiedTime)}</div>
                        <div class="date">${formatMonth(list[1] && list[1].modifiedTime)}</div>
                    </div>
                    <div class="right">
                        <div class="news-title" onclick="location.href='./news.html?categoryId=${list[1].categoryId}&id=${list[1].id}'">
                            ${list[1] && list[1].title}
                        </div>
                        <div class="content">
                            ${list[1] && list[1].summary}
                        </div>
                    </div>
                </div>`
            }
            if (list[2]) {
                html += `<div class="line flex">
                    <div class="date-content">
                        <div class="day">${formatDay(list[2] && list[2].modifiedTime)}</div>
                        <div class="date">${formatMonth(list[2] && list[2].modifiedTime)}</div>
                    </div>
                    <div class="right">
                        <div class="news-title" onclick="location.href='./news.html?categoryId=${list[2].categoryId}&id=${list[2].id}'">
                            ${list[2] && list[2].title}
                        </div>
                        <div class="content">
                            ${list[2] && list[2].summary}
                        </div>
                    </div>
                </div>`
            }    
                
            html+= `</div>`
		}
		$('#news-list').html(html)
	})
}
function formatDay(val) {
	return dayjs(val).format('DD')
}
function formatMonth(val) {
	return dayjs(val).format('YYYY.MM')
}