<?php
////////////////////////////Common head
	$cache_time=10;
	$OJ_CACHE_SHARE=false;
	require_once('./include/cache_start.php');
    require_once('./include/db_info.inc.php');
	require_once('./include/setlang.php');
	$view_title= "Welcome To Online Judge";
	
///////////////////////////MAIN	
	
	$view_news="";
	$sql=	"SELECT * "
			."FROM `news` "
			."WHERE `defunct`!='Y'"
			."ORDER BY `importance` ASC,`time` DESC "
			."LIMIT 5";
	$result=mysql_query($sql);//mysql_escape_string($sql));
	if (!$result){
		$view_news= "<h3>No News Now!</h3>";
		$view_news.= mysql_error();
	}else{
		$view_news.= "<table width=96%>";
		
		while ($row=mysql_fetch_object($result)){
			$view_news.= "<tr><td><td><big><b>".$row->title."</b></big>-<small>[".$row->user_id."]</small></tr>";
			$view_news.= "<tr><td><td>".$row->content."</tr>";
		}
		mysql_free_result($result);
		$view_news.= "</table>";
	}
/////////////////////////Template
require("template/".$OJ_TEMPLATE."/index.php");
/////////////////////////Common foot
if(file_exists('./include/cache_end.php'))
	require_once('./include/cache_end.php');
?>
