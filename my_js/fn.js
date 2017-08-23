
//переключение между полным и кратким видом

function toggleBlock(short_block_id,full_block_id)
{
	var short_block=document.getElementById(short_block_id);
	var full_block=document.getElementById(full_block_id);
	if(short_block.style.display=="none") {
		short_block.style.display="block";				
		full_block.style.display="none";
	}
	else
	{
		short_block.style.display="none";				
		full_block.style.display="block";
	}
}

//переключение высоты блока показать/скрыть

function toggleHeightBlock(block_id,h)
{
	var block=document.getElementById(block_id);
	var div=block.getElementsByTagName("div")[0];
	var link=block.getElementsByClassName("more-link")[0];
	if(div.style.height==h) {
		div.style.height="auto";				
		link.innerHTML="Скрыть текст";
	}
	else
	{
		div.style.height=h;
		link.innerHTML="Показать полностью";
	}
}
