<?php

$messages=array(
"1"=>array("subject"=>"������ �� ����� �����������",
	   "text"=>"<p><b>��������� ����� �����������</b></p><table><tr><td>���: </td><td>#name</td></tr><tr><td>�������: </td><td>#phone</td></tr></table>",
	    "success"=>"���� ������ �� ����� ����������� ������� ����������. �������� ������ �� ��������� ��������."
	),
"2"=>array("subject"=>"������ ��������� ������",
	   "text"=>"<p><b>������ ������ �����������</b></p><table><tr><td>���: </td><td>#name</td></tr><tr><td>�������: </td><td>#phone</td></tr></table>",
	    "success"=>"�������� ������ �� ���������."
	),
"3"=>array("subject"=>"������ �� ����� � ����������� �����",
	   "text"=>"<p><b>��������� ����� � ����������� �����</b></p><table><tr><td>���: </td><td>#name</td></tr><tr><td>�������: </td><td>#phone</td></tr><tr><td>�����: </td><td>#address</td></tr><tr><td>�����������: </td><td>#comment</td></tr></table>",
	    "success"=>"���� ������ �� ����� � ����������� ����� ������� ����������. �������� ������ �� ��������� ��������."
	),
"7"=>array("subject"=>"������ �� �������",
	   "text"=>"<p><b>������ ����� ������</b></p><table><tr><td>���: </td><td>#name</td></tr><tr><td>�������: </td><td>#phone</td></tr><tr><td>������: </td><td>#comment</td></tr></table>",
	    "success"=>"��� ������ ��������� ���������� ��������. �������� ��������� ������."
	)

);


foreach ($_POST as $k=>$v)
	${$k}=iconv("UTF-8","Windows-1251",$v);

if(!$type) $type=3;

$data=array();


$to="test@yandex.ru";


$subject=$messages[$type]['subject'];
$message=$messages[$type]['text'];

$message=preg_replace("/#name/",$name,$message);
$message=preg_replace("/#phone/",$phone,$message);
$message=preg_replace("/#address/",$address,$message);
$message=preg_replace("/#comment/",$comment,$message);



$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset:cp-1251\r\n";
$headers .= "From: SiteName <noreply@sitenname.com>\r\n";



if(mail($to,$subject,$message,$headers))
{
	$data[response]=$messages[$type][success];
	$data[status]='success';
}
else
{
	$data[response]="��������� ������ �������� ������ ������. ���������� ��������� ����� ��� ��������� �� ��������� �� ����� ��������.";
	$data[status]='error';
}


echo iconv("Windows-1251","UTF-8","{\"status\":\"$data[status]\",\"response\":\"$data[response]\"}");
?>