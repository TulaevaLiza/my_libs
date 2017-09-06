var editor=document.querySelector(".specEditor textarea");
var result=document.querySelector(".specEditor .result");

editor.addEventListener("keyup",createAutoTag);

function createAutoTag() {
//  var text=this.innerHTML;
  var text=this.value;
  var out='';
  text.replace(/<br[^<>]+>/g,'\n').replace(/<[^<>]+>/g,'').replace(/&nbsp;/g,' ').replace(/(^|[\s\.,]+)([^\s\.,]+)/g, function(str,p1,p2) {
   if(p2.match(/^#/)) {
      out+=p1+'<span class="hash-autotag">'+p2+'</span>';
   }
    else if(p2.match(/^@/)) {
      out+=p1+'<span class="at-autotag">'+p2+'</span>';
   }
    else if(p2)
      out+=p1+'<a>'+p2+'</a>';
  });
  
  result.innerHTML=out.replace(/\n/g,'<br>');
  
}