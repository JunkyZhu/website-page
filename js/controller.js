const setBanner = (list) => {
	let dotHtml = '',html = ''
	list.forEach((item,index) => {
		if(index == 0) {
			html += `<div class="item active">
                <img src="${item.imageUrl}" alt="...">
                <div class="carousel-caption">
                </div>
            </div>`
            dotHtml += `<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>`
		} else {
			html += `<div class="item">
                <img src="${item.imageUrl}" alt="...">
                <div class="carousel-caption">
                </div>
            </div>`
            dotHtml += `<li data-target="#carousel-example-generic" data-slide-to="${index}"></li>` 
		}
		
	})
	$('.carousel-indicators').html(dotHtml)
	$('.carousel-inner').html(html)
}