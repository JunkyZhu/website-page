$(function() {
	let obj = getUrlQuery()
	getCategories('PRODUCT').done(val => {
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
			setMethods('PRODUCT','sub-product-list','product-detail',$(this).data('id'))
		});
		setMethods('PRODUCT','sub-product-list','product-detail',val[idx].id,obj.id)
	})
})
function setMethods(category,id,detailId,categoryId,productId) {
	getArticleList({
		articleClass: category,
		categoryId:categoryId
	}).done(val => {
		let html = ``
		let idx = 0
		if (productId) {
			val.content.forEach((item,index) => {
				if (item.id == productId) {
					idx = index
				}
			})
		}
		
		val.content.forEach((item,index) => {
			if (index == idx) {
				html += `<div class="pro-item active"  data-id="${item.id}">${item.title}</div>`
			} else {
				html += `<div class="pro-item" data-id="${item.id}">${item.title}</div>`
			}
			
		})
		$(`#${id}`).html(html)
		$(`#${detailId}`).html(val.content[idx].content)
		$(`#${id} .pro-item`).click(function(event) {
			/* Act on the event */	
			$(`#${id} .pro-item`).removeClass('active')
			$(this).addClass('active')
			getArticle($(this).data('id')).done(val => {
				$(`#${detailId}`).html(val.content)
			})
		});
	})
}