<?php

foreach ($_POST as $k=>$v)
{
	${$k}=iconv("UTF-8","Windows-1251",$v);
	$out.="$k - > $v \n";
}

return $out;
?>