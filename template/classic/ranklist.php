<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title><?php echo $view_title?></title>
	<link rel=stylesheet href='./template/<?php echo $OJ_TEMPLATE?>/<?php echo isset($OJ_CSS)?$OJ_CSS:"hoj.css" ?>' type='text/css'>
</head>
<body>
	<?php require_once("oj-header.php");?>
		<div id="content" class="clearfix shadow">
	<h2>Ranklist</h2>
</div>
	<div id="extended" class="clearfix shadow">
	<table align=center width=100%>
		<thead>
		<tr><td colspan=3 align=left>
			<form action=userinfo.php>
				<?php echo $MSG_USER?><input name=user>
				<input type=submit value=Go>
			</form></td><td colspan=3 align=right>
			<a href=ranklist.php?scope=d>Day</a>
			<a href=ranklist.php?scope=w>Week</a>
			<a href=ranklist.php?scope=m>Month</a>
			<a href=ranklist.php?scope=y>Year</a>
			</td></tr>
		<tr class='toprow'>
				<th width=8% align=center><b><?php echo $MSG_Number?></b>
				<th width=10% align=center><b><?php echo $MSG_USER?></b>
				<th width=55% align=center><b><?php echo $MSG_NICK?></b>
				<th width=10% align=center><b><?php echo $MSG_AC?></b>
				<th width=10% align=center><b><?php echo $MSG_SUBMIT?></b>
				<th width=10% align=center><b><?php echo $MSG_RATIO?></b>
		</tr>
		</thead>
		<tbody>
			<?php 
			$cnt=0;
			foreach($view_rank as $row){
				if ($cnt) 
					echo "<tr class='oddrow'>";
				else
					echo "<tr class='evenrow'>";
				foreach($row as $table_cell){
					echo "<td>";
					echo "\t".$table_cell;
					echo "</td>";
				}
				
				echo "</tr>";
				
				$cnt=1-$cnt;
			}
			?>
			</tbody>		
	</table>
	<?php 
	   echo "<center>";
		for($i = 0; $i <$view_total ; $i += $page_size) {
			echo "<a href='./ranklist.php?start=" . strval ( $i ).($scope?"&scope=$scope":"") . "'>";
			echo strval ( $i + 1 );
			echo "-";
			echo strval ( $i + $page_size );
			echo "</a>&nbsp;";
			if ($i % 250 == 200)
				echo "<br>";
		}
		echo "</center>";
	
	?>
	</div>
	<?php require_once("oj-footer.php");?>
</body>
</html>
