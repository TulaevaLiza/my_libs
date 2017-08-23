	$("#form3 button[type='submit']").click(function() {
		var formObj=new MyForm("form3");
		formObj.getForm();
		formObj.submit();	
	});
