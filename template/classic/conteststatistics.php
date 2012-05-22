<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv='refresh' content='60'>
	<title><?php echo $view_title?></title>
	<link rel=stylesheet href='./template/<?php echo $OJ_TEMPLATE?>/<?php echo isset($OJ_CSS)?$OJ_CSS:"hoj.css" ?>' type='text/css'>
</head>
<body>
	<?php require_once("contest-header.php");?>
<center><h3>Contest Statistics</h3>
<table width=90%>
<tr align=center class=toprow><td><td>AC<td>PE<td>WA<td>TLE<td>MLE<td>OLE<td>RE<td>CE<td>Total<td><td>C<td>C++<td>Pascal<td>Java<td>Ruby<td>Bash<td>Python<td>PHP<td>Perl<td>C#</td></tr>
<?php
for ($i=0;$i<$pid_cnt;$i++){
	if(!isset($PID[$i])) $PID[$i]="";
	
	if ($i&1) 
		echo "<tr align=center class=oddrow><td>";
	else 
		echo "<tr align=center class=evenrow><td>";
	echo "<a href='problem.php?cid=$cid&pid=$i'>$PID[$i]</a>";
	for ($j=0;$j<20;$j++) {
		if(!isset($R[$i][$j])) $R[$i][$j]="";
		echo "<td>".$R[$i][$j];
	}
	echo "</tr>";
}
echo "<tr align=center class=evenrow><td>Total";	
for ($j=0;$j<15;$j++) {
	if(!isset($R[$i][$j])) $R[$i][$j]="";
	echo "<td>".$R[$i][$j];
}
echo "</tr>";
?>
<table></center>;
	<?php require_once("oj-footer.php");?>
</body>
</html>
