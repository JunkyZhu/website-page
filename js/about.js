$(function() {
	getArticleList({
		articleClass: 'ABOUTUS'
	}).done(val => {
		let html = ``
		val.content.forEach((item,index) => {
			if (index == 0) {
				html += `<div class="pro-item active"  data-id="${item.id}">${item.title}</div>`
			} else {
				html += `<div class="pro-item" data-id="${item.id}">${item.title}</div>`
			}
			
		})
		$('#about-list').html(html)
		$('#about-content').html(val.content[0].content)
		$('#about-list .pro-item').click(function(event) {
			/* Act on the event */	
			$('#about-list .pro-item').removeClass('active')
			$(this).addClass('active')
			getArticle($(this).data('id')).done(val => {
				$('#about-content').html(val.content)
			})
		});
	})
})