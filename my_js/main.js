$(document).ready(function () {


//для адаптивного меню - показывать меню по нажатию на кнопку
	$('.navbar-toggle').click(function() {
		var menu=$(this).attr("data-target");
		var cl=$(this).attr("data-toggle");
		$(menu).toggleClass(cl);		
	});

})
