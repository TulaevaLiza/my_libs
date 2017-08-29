document.getElementById("createPollButton").addEventListener("click",createPollForm);

function createPollForm() {
  if(document.querySelector('#createPoll .form')) return "";
  
  var div=this.parentNode;
  var d=document.createElement('div');
  d.className='form';
  d.innerHTML='<div class="form-header"><div class="form-title">Тема опроса</div><div class="form-close">X</div></div><div class="form-title-input"><input type="text" name="title"></div><div class="form-header">Варианты ответов</div><div class="form-answers"><div><input type="text" name="answer1"><span class="close">Х</span></div><div><input type="text" name="answer2"><span class="close">Х</span></div><input name="addAnswer" placeholder="Добавить вариант"></div><button id="addPollButton">Отправить</button>';
  div.appendChild(d);
  var inputColl=div.querySelectorAll('[type="text"]');
  for(let i=0;i<inputColl.length;i++)
    inputColl[i].addEventListener("click",initInput);
  var closeColl=div.querySelectorAll('.close');
  for(let i=0;i<closeColl.length;i++)
    closeColl[i].addEventListener("click",closeInput);
  div.querySelector('[name="addAnswer"]').addEventListener("click",addAnswer);
  div.querySelector('#addPollButton').addEventListener("click",addPoll);
  div.querySelector('.form-header .form-close').addEventListener("click",closeForm);
}
function initInput() {
  this.style.border="1px silver solid";
}
function closeInput() {
  this.parentNode.remove();
}

function closeForm() {
  this.parentNode.parentNode.remove();
}

function addAnswer() {
  var d=document.createElement('div');
  d.innerHTML='<div><input type="text" name="answer1"><span class="close">Х</span></div>';
 d.querySelector('.close').addEventListener("click",closeInput);
 d.querySelector('[type="text"]').addEventListener("click",initInput);
 
 this.parentNode.insertBefore(d,this);
 this.blur();
 this.previousSibling.querySelector('[type="text"]').focus();
}

function addPoll() {
  var title=this.parentNode.querySelector('[name="title"]');
  var answers=this.parentNode.querySelectorAll('[name^="answer"]');
  
  //валидация
  if(!title.value)
  {
    title.style.border="1px red solid";
    return "";
  }
  if(!answers[0].value)
  {
    answers[0].style.border="1px red solid";
    return "";
  }
  
  //добавление
  var div=document.createElement('div');
  div.className='poll';
  var tit=document.createElement('div');
  tit.className='poll-title'; 
  tit.innerHTML=title.value;
  div.appendChild(tit);
  for(let i=0;i<answers.length;i++)
    {
      if(!answers[i].value) continue;
      var inputDiv=document.createElement('div');
      inputDiv.className='poll-input'; 
      inputDiv.innerHTML='<input type="radio" name="pull_answer" value='+i+'> '+answers[i].value;
      div.appendChild(inputDiv);
    }
    var button=document.createElement('button');
  button.className='poll-button'; 
  button.innerHTML='Ответить';
  div.appendChild(button);
  
  var p=this.parentNode.parentNode;
  p.insertBefore(div,this.parentNode);
  
  //удаляем форму добавления опроса
  this.parentNode.remove();
}


