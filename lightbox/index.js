var galeryObjs =[];
function init() {
 	var g = document.querySelectorAll('#gallery img'); 	
 	for(let i=0; i<g.length; i++) {
    let galeryObj={'img':g[i],'src':g[i].src,'fullImg':g[i].dataset.fullImg};
    galeryObjs.push(galeryObj);
    
    onEvent(g[i],"click",showImage); 		
 	}
 }

function showImage() {
	
  //фон
	var dark=document.createElement("div");
	dark.id="darkbox";
  
  //контейнер для большого изображения
  var divImg=document.createElement("div");
  divImg.id="img";
  
  //обертка для изображения
  var imgWrap=document.createElement("div");
  imgWrap.className="wrap";
  
  //изображение
 	var img=document.createElement("img");
 	img.src=this.dataset.fullImg;   
 	img.style.opacity = 0;   
 	imgWrap.appendChild(img);
  
  //контейнер для навигации
  var divNav=document.createElement("div");
  divNav.className="navigation";
  
  //ссылка на след изображение
  if(isNextImg(this)) {
    var aNext=document.createElement("a");
 	  aNext.className="next";   
    onEvent(aNext,"click",showNextImg);
    divNav.appendChild(aNext);    
  }
  
  //ссылка на пред изображение
  if(isPrevImg(this)) {
    var aPrev=document.createElement("a");
   	aPrev.className="prev";    
    divNav.appendChild(aPrev);
    onEvent(aPrev,"click",showPrevImg);
  }
  
  onEvent(divNav,"click",stopEvent);
  imgWrap.appendChild(divNav);  
  divImg.appendChild(imgWrap);
  
  onEvent(divImg,"click",hideBox);
    
 	document.body.appendChild(dark);
 	document.body.appendChild(divImg);
 
  //установка размеров блока с навигацией
  setDivSize(img,divNav);
  
 	//добавляем анимацию
 	var i=0,step=10,tick=20;
 	(function() {
 		if(i<=step) {
 			i++;
 			img.style.opacity = i/step;
 			setTimeout(arguments.callee, tick);
 		}
 	})();  
 setDivSize(img,divNav);
}

//отмена срабатывания /всплытия события
function stopEvent(ev) {
	ev=ev || event;
	if(ev.stopPropagation())
		ev.stopPropagation()
	else
		ev.returnValue = false; 
}

//скрыть контейнер
function hideBox() {
	var d=document.getElementById("darkbox");	
	var self=this;
	var i=0,step=10,tick=20;
 	(function() {
 		if(i<=step) {
 			i++;
 			self.style.opacity = 1-i/step;
 			setTimeout(arguments.callee, tick);
 		}
 		else
 		{
 				d.parentNode.removeChild(d);
 				self.parentNode.removeChild(self);
 		}
 	})();

}

function isNextImg(img) {  
  return !(img.parentNode.children[img.parentNode.children.length-1]===img);
}
function isPrevImg(img) {
  return !(img.parentNode.children[0]===img);
}

function getSibling(fullImg,step) {
  for(let i=0; i<galeryObjs.length;i++)
    if(galeryObjs[i].fullImg===fullImg.src) return galeryObjs[i+step].img;
}

function setDivSize(el1,el2) {
  if(el1.clientHeight && el1.clientWidth) {
   el2.style.height=el1.clientHeight+'px';
    el2.style.width=el1.clientWidth+'px';
  }
  else
    {
      //костыль...      
      var s=el1.src;
      var res=s.match(/\/(\d+)x?(\d+)?/i);
      el2.style.width=res[1]+'px';
      el2.style.height=(res[2]?res[2]:res[1])+'px';
  
    }
}


function showNextImg() {
  var img=this.parentNode.parentNode.children[0];
  var imgDiv=document.querySelector('#img');
  var siblingImg=getSibling(img,1);
  hideBox.call(imgDiv);
  showImage.call(siblingImg);
}

function showPrevImg() {
  var img=this.parentNode.parentNode.children[0];
  var imgDiv=document.querySelector('#img');
  var siblingImg=getSibling(img,-1);
  hideBox.call(imgDiv);
  showImage.call(siblingImg);
}

function onEvent(el,ev,func) {
  	if(el.addEventListener)
 		el.addEventListener(ev,func);
 	else
 		el.attachEvent(ev,func);
}
init();


