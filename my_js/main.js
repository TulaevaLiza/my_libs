$(document).ready(function () {


//��� ����������� ���� - ���������� ���� �� ������� �� ������
	$('.navbar-toggle').click(function() {
		var menu=$(this).attr("data-target");
		var cl=$(this).attr("data-toggle");
		$(menu).toggleClass(cl);		
	});

})
