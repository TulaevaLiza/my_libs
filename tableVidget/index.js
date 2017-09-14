function TableVidget(options) {
  var tbl=options.elem.querySelector('.tbl'); 
  var that=this;
  this.content=new Array();
  this.init = function() {
    this.createFilter();  
    this.createAddForm();
    this.getTableContent();
    this.createDeleteEvent();
  }
  
  this.createDeleteEvent = function()  {
   var rows=tbl.querySelectorAll("tr.content");
    for (var i = 0; i < rows.length; i++) 
      rows[i].addEventListener("click",this.deleteEvent);            
  }
  this.deleteEvent = function () {
    var index=this.rowIndex;
    that.content.splice(index-1,1);
    console.log(that.content);
    this.remove();
  }
  this.getTableContent= function() {
    var rows=tbl.querySelectorAll("tr.content");      
    for (var i = 0; i < rows.length; i++) {
          var cells=rows[i].querySelectorAll("td");
          var cellObj={};
          for (var j = 0; j < cells.length; j++) {
            cellObj['param'+j]=cells[j].innerHTML;
          }
          this.content.push(cellObj)
    }

  }
  this.addRowToContent = function(row){
    var cells=row.querySelectorAll("td");
    var cellObj={};
    for (var j = 0; j < cells.length; j++) {
        cellObj['param'+j]=cells[j].innerHTML;
    }
    this.content.push(cellObj);  
  }
 
   this.addRow=function() {
   var isValid=false;
   var addTbl=options.elem.querySelector('.tblAdd'); 
   var inputs=addTbl.querySelectorAll('input');
   var newRow=document.createElement('tr');
   newRow.className='content';
   for (var i = 0; i < inputs.length; i++) {
    var newCell=document.createElement('td');     
     newCell.innerHTML=inputs[i].value;
     newRow.appendChild(newCell);
     if(inputs[i].value) isValid=true;
   }
   if(isValid) {
      newRow.addEventListener("click",that.deleteEvent); 
      tbl.insertBefore(newRow,addTbl);
      that.addRowToContent(newRow);
      that.clearForm(addTbl);
   }
  }
  
  this.createAddForm=function() {
    var tdArray=tbl.querySelectorAll(".head td");
    var addTbl=document.createElement('tr');
    addTbl.className='tblAdd';
    for (var i = 0; i < tdArray.length; i++) {
      var td=document.createElement('td');
      var input=document.createElement('input');
      input.type='text';
      input.name='param'+i;
      td.appendChild(input);
      addTbl.appendChild(td);      
    }
    tbl.appendChild(addTbl);
    var trSubmit=document.createElement('tr');
    trSubmit.className='tblAdd';
    trSubmit.innerHTML="<td colspan="+tdArray.length+" class='submit'><button>Добавить</button></td>";
    tbl.appendChild(trSubmit);
    var submit=options.elem.querySelector('.tblAdd button');
    var table=this;
    submit.addEventListener("click",this.addRow);
  }
  this.createFilter = function() {
    var tdArray=tbl.querySelectorAll(".head td");
    for (var i = 0; i < tdArray.length; i++) {
      var input=document.createElement('input');
      input.type='text';
      input.name='param'+i;
      input.addEventListener("keyup",this.applyFilter);
      tdArray[i].appendChild(input);
    }
  }
  this.applyFilter = function() {

    var filters=that.getFilterValues();
    var arr=that.content;
    var rows=tbl.querySelectorAll('tr.content');
    var hiddenRows={};

    for(let i=0;i<arr.length;i++)
    {
        for(let j in arr[i]) {
          var reg=new RegExp(filters[j],'i');
          if(!arr[i][j].match(reg) && filters[j]) 
            hiddenRows[i]=1;
        }
    }
    for(let i=0;i<rows.length;i++)
      if(hiddenRows[i])
       that.hideRow(rows[i]);
      else
       that.showRow(rows[i]);

  }
  this.getFilterValues = function() {
      var inFilter=tbl.querySelectorAll(".head td input"),obj={};    
      for(let i=0; i<inFilter.length;i++) {
      obj[inFilter[i].name]=inFilter[i].value;
    }
    return obj;
  }

  this.hideRow = function(row) {
    var i=10,step=10,tick=20;
 	(function() {
 		if(i>0) {
 			i--;
 			row.style.opacity = i/step;
 			setTimeout(arguments.callee, tick);
 		}
    else
       row.style.display='none';
  })();  

  }
  this.showRow = function(row) {
   row.style.display='table-row';
    var i=0,step=10,tick=20;
 	  (function() {
 		  if(i<=step) {
 			  i++;
 			  row.style.opacity = i/step;
 			  setTimeout(arguments.callee, tick);
 		  }
    })();  
  }

  this.clearForm = function(form) {
    var inpArray=form.querySelectorAll("input");
    for (let i = 0; i < inpArray.length; i++) 
      inpArray[i].value='';
  }
}

var tblVidget=new TableVidget({elem:document.getElementById('myTable')});
tblVidget.init();
