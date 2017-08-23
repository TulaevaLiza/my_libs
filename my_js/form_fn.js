
function MyForm(form_id) {
	this.name=$("#"+form_id+" .name");
	this.phone=$("#"+form_id+" .phone");
	this.address=$("#"+form_id+" .address");
	this.comment=$("#"+form_id+" .message");
}

MyForm.prototype.clearErrorClass = function() {

	let fields=['name','phone','address','comment'];
	for(let i in fields) 
		this[fields[i]].removeClass('error');
	
}

MyForm.prototype.clearErrorStatus = function() {

	let fields=['name','phone','address','comment'];

	for(let i in fields) {
		if(this[fields[i]].next().hasClass('error-status')) 
			this[fields[i]].next().remove();		
	}
}

MyForm.prototype.setErrorStatus = function(obj) {

	let fields=['name','phone','address','comment'];
	let errorStatus = {
		name:"Корректно заполните имя.<br>Внимание: не допускается размещение ссылок на интернет-ресурсы",
		phone:"Введите номер телефона в заданном формате",
		address:"Не допускается размещение ссылок на интернет-ресурсы",
		comment:"Не допускается размещение ссылок на интернет-ресурсы"
	};

	for(let i in obj.errorFields) {
		this[obj.errorFields[i]].addClass("error");
//		if(obj.errorFields[i] in errorStatus)
		console.log(obj.errorFields[i],errorStatus[obj.errorFields[i]]);
			this[obj.errorFields[i]].after("<div class='error-status bg-warning'>"+errorStatus[obj.errorFields[i]]+"</div>");
	}

}


MyForm.prototype.validate = function () {

	let emailtmpl = /[a-zA-Z0-9_\-\.]+@[a-z0-9]+\.(ru|ua|by|kz|com|[a-z]{2,3}|рф)/;
	let phonetmpl = /^\+7\s*\(\d{3}\)\s*\d{3}[\-\s]\d\d[\-\s]\d\d$/;
	let urltmpl = /(http[s]?:\/\/)?(www\.)?[a-z0-9а-я_\-]+\.(ru|ua|by|kz|com|[a-z]{2,3}|рф)/;
	
	let obj = {'isValid': true, 'errorFields':[]};

	let x=this.name.val().trim();
	if(x.length==0 || x.length>30 || urltmpl.test(x)) {
		obj.isValid=false;	
		obj.errorFields.push('name');
	}			

	if(!phonetmpl.test(this.phone.val().trim())) {
		obj.isValid=false;	
		obj.errorFields.push('phone');
	}

	if(urltmpl.test(this.address.val().trim())) {
		obj.isValid=false;	
		obj.errorFields.push('address');
	}

	if(urltmpl.test(this.comment.val().trim())) {
		obj.isValid=false;	
		obj.errorFields.push('comment');
	}

	return obj;
}
MyForm.prototype.setData = function(f) {
	this.name.val(f.name);
	this.phone.val(f.phone);
	this.address.val(f.address);
	this.comment.val(f.comment);
}
MyForm.prototype.submit = function() {
	let validRes=this.validate();			
	console.log(validRes);
	this.clearErrorClass();
	this.clearErrorStatus();

	if(!validRes.isValid) {
		this.setErrorStatus(validRes);
	}
	else {
		console.log("Success "+JSON.stringify(this,["name"]));
//		this.sendStat();
		$.ajax({		
			url: "/form_ajax.php",
			type:"POST", //Тип запроса
			dataType: "json", //Тип данных
			data: "", 
			success: function(data) {
				console.log("Успех!");
			},
			error:  function(xhr, str){
				console.log("Возникла ошибка!");
				console.log(xhr);	
			}
		});   
	}
}
MyForm.prototype.sendStat = function() {
	ga('send', 'event', 'Form', 'Send', 'SendForm');		
}

