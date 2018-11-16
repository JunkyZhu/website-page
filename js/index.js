/*网站滚动*/
	$(window).scroll(function() {
		// if($(window).width()>768){	
			if($(window).scrollTop()>100)
			{
				$("#nav-bg").removeClass("curr");
			}
			else{
				$("#nav-bg").addClass("curr");	
			}
		// }
	});
	$(function () {
	    getBanner().done(val => {
	    	console.log(val)
	    })
	});