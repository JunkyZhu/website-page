$(function() {
	let obj = getUrlQuery()
	getCategories('SOLUTION').done(val => {
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
			setMethods('SOLUTION','sub-product-list','product-detail',$(this).data('id'))
		});
		setMethods('SOLUTION','sub-product-list','product-detail',val[idx].id,obj.id)
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
				html += `<div class="pro-item active"  data-toggle="tooltip" data-placement="top" title="${item.title}" data-id="${item.id}">${item.title}</div>`
			} else {
				html += `<div class="pro-item" data-id="${item.id}" data-toggle="tooltip" data-placement="top" title="${item.title}" >${item.title}</div>`
			}
			
		})
		$(`#${id}`).html(html)
		$(`#${detailId}`).html(val.content[idx] && val.content[idx].content || '')
		$(`#${id} .pro-item`).click(function(event) {
			/* Act on the event */	
			$(`#${id} .pro-item`).removeClass('active')
			$(this).addClass('active')
			getArticle($(this).data('id')).done(val => {
				$(`#${detailId}`).html(val.content)
			})
		});

		$('[data-toggle="tooltip"]').tooltip()
	})
}
$('#sub-product-list').hover(function() {
	/* Stuff to do when the mouse enters the element */
	$('#toggle span').removeClass('glyphicon-chevron-down');
	$('#toggle span').addClass('glyphicon-chevron-up');
	$('#sub-product-list').addClass('min-product-height');
}, function() {
	/* Stuff to do when the mouse leaves the element */
	$('#toggle span').removeClass('glyphicon-chevron-up');
	$('#toggle span').addClass('glyphicon-chevron-down');
	$(this).removeClass('min-product-height')
});
// $('#sub-product-list').hover(function(event) {
// 	$(this).addClass('active')
	
// 	$(this).children('#toggle span').toggleClass('glyphicon-chevron-down');
// 	$('#sub-product-list').toggleClass('min-product-height');
// },function() {
// 	$(this).removeClass('active')
// });