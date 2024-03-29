<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title><?php echo $view_title?></title>
	<link rel=stylesheet href='./template/<?php echo $OJ_TEMPLATE?>/<?php echo isset($OJ_CSS)?$OJ_CSS:"hoj.css" ?>' type='text/css'>
</head>
<body>
	<?php require_once("contest-header.php");?>
<script src="include/sortTable.js"></script>


<center>
    <div>
	<h3>Contest<?php echo $view_cid?> - <?php echo $view_title ?></h3>
					
						<p><?php echo $view_description?></p>
						<br>Start Time: <font color=#993399><?php echo $view_start_time?></font>
			End Time: <font color=#993399><?php echo $view_end_time?></font><br>
			Current Time: <font color=#993399><span id=nowdate > <?php echo date("Y-m-d H:i:s")?></span></font>
			Status:<?php
				if ($now>$view_end_time) 
					echo "<span class=red>Ended</span>";
				else if ($now<$view_start_time) 
					echo "<span class=red>Not Started</span>";
				else 
					echo "<span class=red>Running</span>";
			?>&nbsp;&nbsp;
			<?php
				if ($view_private=='0') 
					echo "<span class=blue>Public</font>";
				else 
					echo "&nbsp;&nbsp;<span class=red>Private</font>"; 
			?>
				<br>
				[<a href='status.php?cid=<?php echo $view_cid?>'>Status</a>]
				[<a href='contestrank.php?cid=<?php echo $view_cid?>'>Standing</a>]
				[<a href='conteststatistics.php?cid=<?php echo $view_cid?>'>Statistics</a>]
	
	
	
	</div>
	<table id='problemset' width='90%'>
		<thead>
			
			<tr align=center class='toprow'>
				<td width='5'>
				<td style="cursor:hand" onclick="sortTable('problemset', 1, 'int');" width=10%><A><?php echo $MSG_PROBLEM_ID?></A>
				<td width='60%'><?php echo $MSG_TITLE?></td>
				<td width='10%'><?php echo $MSG_SOURCE?></td>
				<td style="cursor:hand" onclick="sortTable('problemset', 4, 'int');" width='5%'><A><?php echo $MSG_AC?></A></td>
				<td style="cursor:hand" onclick="sortTable('problemset', 5, 'int');" width='5%'><A><?php echo $MSG_SUBMIT?></A></td>
			</tr>
			</thead>
			<tbody>
			<?php 
			$cnt=0;
			foreach($view_problemset as $row){
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
			</table></center>
	<?php require_once("oj-footer.php");?>
</body>
</html>
