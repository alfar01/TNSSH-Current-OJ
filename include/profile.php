<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Cache-Control: no-cache");
header("Pragma: no-cache");
	require_once("./db_info.inc.php");
	require_once("../lang/$OJ_LANG.php");
    function checkmail(){
		
		$sql="SELECT count(1) FROM `mail` WHERE 
				new_mail=1 AND `to_user`='".$_SESSION['user_id']."'";
		$result=mysql_query($sql);
		if(!$result) return false;
		$row=mysql_fetch_row($result);
		$retmsg="<span id=red>(".$row[0].")</span>";
		mysql_free_result($result);
		return $retmsg;
	}
	$profile="";
		if (isset($_SESSION['user_id'])){
				$sid=$_SESSION['user_id'];
				$profile.= "<li><a href='./userinfo.php?user=$sid'><span id=red>$sid</span></a></li><li><a href=./modifypage.php>$MSG_USERINFO</a></li>";
				$mail=checkmail();
				if ($mail)
					$profile.= "<li><a href=./mail.php>$MSG_EMAIL$mail</a></li>";
				$profile.= "<li><a class='bda_ignore' href=./logout.php>$MSG_LOGOUT</a></li>";
			}else{
				$profile.= "<li><a class='bda_ignore' href=./loginpage.php>$MSG_LOGIN</a></li>";
				$profile.= "<li><a class='bda_ignore' href=./registerpage.php>$MSG_REGISTER</a></li>";
			}
			if (isset($_SESSION['administrator'])||isset($_SESSION['contest_creator'])||isset($_SESSION['problem_editor'])){
				$profile.= "<li><a class='bda_ignore' href=./admin>$MSG_ADMIN</a></li>";
			
			}
		?>
document.write("<?php echo ( $profile);?>");
