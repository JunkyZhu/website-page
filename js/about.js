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
		html+= `<div class="pro-item history" data-id="123">公司大事记</div>`
		$('#about-list').html(html)
		$('#about-content').html(val.content[0].content)
		$('#about-list .pro-item').not('.history').click(function(event) {
			/* Act on the event */	
			$('#about-list .pro-item').removeClass('active')
			$(this).addClass('active')
			getArticle($(this).data('id')).done(val => {
				$('#about-content').html(val.content)
			})
		});
		$('#about-list .history').click(function(event) {
			/* Act on the event */	
			$('#about-list .pro-item').removeClass('active')
			$(this).addClass('active')
			getHistory().done(val => {
				let html1 = ``
				val.forEach(item => {
					html1 += `<div class="entry clearfix">
					    <div class="title">
					      <h3>${item.month}月</h3>
					      <p>${item.year}</p>
					    </div>
					    <div class="body">
					      <p>${item.summary}</p>
					     
					    </div>
					  </div>`
				})
				html1 += ``
				$('#about-content').html(`<div class="timeline">${html1}</div>`)
			})
		});
	})
})