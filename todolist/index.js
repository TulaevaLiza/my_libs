function ToDoList(options) {
  this.elem=options.elem;
  this.data=options.data;
  var that=this;
  this.init=function () {
   // ���������� ������ ��� �� ������ ���������� ������
    this.showAllLists();
   //���������� ������ �� ����� ��� ���������� ������ ���
    this.showLink2Add();
  }
  // ������ �� ����� ��� ���������� ������ ���
  this.showLink2Add = function () {
    var div=document.createElement('div');
    div.className='wrap add-link-div';
    div.innerHTML='<span class="plus">+</span> �������� ������';
    div.addEventListener('click',this.showForm2Add);
    this.elem.appendChild(div);
  }
  // ����� ���������� ������ ���
  this.showForm2Add = function () {
    if(that.elem.querySelector('.add-form-div')) return "";
    var div=document.createElement('div');
    div.className='wrap add-form-div';
    div.innerHTML='<h3>����� ������</h3><form id="add"><input type="text" name="title" placeholder="��������"><textarea name="description" placeholder="��������"></textarea><button>��������</button></form>';
    div.querySelector('button').addEventListener('click',that.addList);
    that.elem.insertBefore(div,that.elem.querySelector('.add-link-div'));    
  }
  // ���������� ������ ���
  this.addList = function() {
    var form=this.parentNode;
    if(form.elements.title.value!='') 
    {
    // ���������� ������ ��� � ������ ������
    var ind=that.data.length;
    var list={};
    list.id=ind;
    list.title=form.elements.title.value+'';
    list.description=form.elements.description.value;
    list.cases=[];
    that.data.push(list);
    // ����������� ������ ��� �����
    form.parentNode.remove();
    that.showAllLists();
    // ��������� ��������� ������ ��� � ���� �����
    that.setActive(list);       
    // ��������� ������ ����� ��� list � ������� ������ 
    that.showCaseList(list);
    }
    else
      alert('������ ��������');
  }
  //��������� ��������� ������ ��� � ���� �����
  this.setActive =function(list) {
    var elColl=this.elem.querySelectorAll('.active');
    for(let i=0;i<elColl.length;i++)
      elColl[i].classList.remove('active');
    this.elem.querySelector('#menu'+list.id).classList.add('active'); 
  }
  // �������� ��� ������ ��� � ���� �����
  this.showAllLists= function() {
    var lists=this.elem.querySelectorAll('.list');
    for(let i=0;i<lists.length;i++) {
      lists[i].remove();
    }
    for(let i=0;i<this.data.length;i++) {
      this.elem.insertBefore(this.showList(this.data[i]),this.elem.querySelector('.add-link-div'));
    }
  }
  // �������� ��������� ������ ��� list � ���� �����
  this.showList = function(list) {
    var div=document.createElement('div');
    div.id='menu'+list.id;
    div.className='wrap list';
    div.innerHTML='<h3>'+list.title+'</h3><span id="deleteList" class="close">x</span><p class="description">'+list.description+'</p><p>'+list.cases.length+' ���</p>';
    div.querySelector('#deleteList').addEventListener('click',that.deleteList);
    div.querySelector('h3').addEventListener('click',that.toogleCaseList);           
    return div;
  }
  // �������� ������ ����� ��� ������ list  � ������� ������
  this.showCaseList = function (list) {
    var div = that.elem.querySelector('.case-list');
    var needInsert=false;
    if(!div) {
      div = document.createElement('div');
      div.className='wrap case-list';
      needInsert=true;
    }
    div.id='content'+list.id;
    div.innerHTML='<h1>'+list.title+'</h1><p>'+list.description+'</p>';
    if(!list.cases.length)
      div.innerHTML+='<div class="cases">� ������ ��� ��� �� ����� ������</div>';
    div.innerHTML+='<div class="add-case-form"><form id="addCaseForm"><input type="text" name="title" placeholder="����� ������"><button>��������</button></form></div>';
    div.querySelector('button').addEventListener('click',that.addCase);
    if(needInsert)
      that.elem.insertBefore(div, that.elem.children[0]);
  }
  //����������� ������ ��� � ������� ������
  this.toogleCaseList=function () {
    var id=this.parentNode.id.match(/\d+/)[0];
    console.log('id '+id);
    var list=that.data[id];
    that.setActive(list);
    that.showCaseList(list);
  }
  this.addCase = function () {
    var form=this.parentNode;
    var id=this.closest('.case-list').id.match(/\d+/)[0];
 //   if(!form.elements.title.value) return '';
    // ���������� ������ � ������ ������
    var ind=that.data[id].cases.length;
    var c={};
    c.id=ind;
    c.title=form.elements.title.value;
    c.status=0;
    that.data[id].cases.push(c);
    console.log(that.data);
 //   form.elements.title.value='';
    // �������� ��� ������ ����� ������
    that.showAllCases(that.data[id]);
    console.log(that);
}
  this.showAllCases = function(list) {
    console.log(list);
    var divWrap=this.elem.querySelector('.cases');
    divWrap.innerHTML='';
    for(let i=0;i<list.cases.length;i++) {
      var div=document.createElement('div');
      div.className='case';
      div.innerHTML='<span>'+list.cases[i].title+'</span>'+(list.cases[i].status==0?'<b>�� �������</b>':'<a id="setStatus" data-status=0 class="status-button">�� �������</a>')+(list.cases[i].status==1?'<b>�������</b>':'<a id="setStatus" data-status=1 class="status-button">�������</a>')+'<span id="deleteCase" class="close">X</span>';
      divWrap.appendChild(div);
    }
  }
  // ������� ������ ���
  this.deleteList = function () {
    delete that.data[this.parentNode.id];
    this.parentNode.remove();
  }
}

var todo=new ToDoList({'elem':document.querySelector('.todolist'),'data':[]});
todo.init();