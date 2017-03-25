<?php
$setting['no_sidebar'] = false;
$setting['title'] = "โปรแกรมออกบัตร";
include("views/header.php");
$u = getLoginUser();
global $db;

$sections = [];
$positions = [];

$res = $db->query("Select id,name,parent from sections WHERE 1;");
while($ap = $res->fetch_assoc()) {
	$sections[$ap['id']] = [$ap['name'],$ap['parent']];
}

$res = $db->query("Select id,card,section from positions WHERE 1;");
while($ap = $res->fetch_assoc()) {
	$positions[$ap['id']] = [$ap['card'],$ap['section']];
}


$gculty = array(
	'01' =>'สถาบันภาษาไทยสิรินธร',
	'02' =>'ศูนย์การศึกษาทั่วไป',
	'20' =>'บัณฑิตวิทยาลัย',
	'21' =>'คณะวิศวกรรมศาสตร์',
	'22' =>'คณะอักษรศาสตร์',
	'23' =>'คณะวิทยาศาสตร์',
	'24' =>'คณะรัฐศาสตร์',
	'25' =>'คณะสถาปัตยกรรมศาสตร์',
	'26' =>'คณะพาณิชยศาสตร์และการบัญชี',
	'27' =>'คณะครุศาสตร์',
	'28' =>'คณะนิเทศศาสตร์',
	'29' =>'คณะเศรษฐศาสตร์',
	'30' =>'คณะแพทยศาสตร์',
	'31' =>'คณะสัตวแพทยศาสตร์',
	'32' =>'คณะทันตแพทยศาสตร์',
	'33' =>'คณะเภสัชศาสตร์',
	'34' =>'คณะนิติศาสตร์',
	'35' =>'คณะศิลปกรรมศาสตร์',
	'36' =>'คณะพยาบาลศาสตร์',
	'37' =>'คณะสหเวชศาสตร์',
	'38' =>'คณะจิตวิทยา',
	'39' =>'คณะวิทยาศาสตร์การกีฬา'
);

?>
<div class="content container">
	<style> body { max-width: 100%; } </style>
    <h2 class="page-title">โปรแกรมออกบัตร</h2>

    <div class="row">
        <div class="col-md-6">
            <table id="registertable" class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ฝ่าย</th>
                        <th>ฝ่ายย่อย</th>
                        <th>ตำแหน่ง</th>
                        <th>รหัสนิสิต</th>
                        <th>ชื่อเล่น</th>
                        <th>ชั้นปี</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $res = $db->query("Select * from users WHERE 1;");
                    while($ap = $res->fetch_assoc()) {
							if($ap['position'] == '0' || $ap['fname'] == '') continue;
							$p = (int)$ap['position'];
							$sec1 = (int)$positions[$p][1];
							$sec2 = ($sec1 > 0) ?  (int)$sections[$sec1][1] : 0;
                    ?>
                    <tr class="dbl">
                        <td class="sec"><?=($sec2 == 0) ? $sections[$sec1][0] : $sections[$sec2][0] ?></td>
                        <td class="sec2"><?=($sec2 == 0) ? '' : $sections[$sec1][0] ?></td>
						<td class="pos"><?=$positions[$p][0];?></td>
                        <td class="id"><?=$ap['studentid'];?></td>
                        <td class="nick"><?=$ap['nick'];?></td>
						<td class="y"><?=$gculty[$ap['faculty']];?> #<?=$ap['acdyear'];?></td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
		<div class="col-md-6">
			<canvas id=""></canvas>
		</div>
    </div>
</div>

<?php
    $setting['footer'] = '
		<!-- page libs -->
        <script src="lib/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
        <script src="lib/datatables/media/js/jquery.dataTables.min.js"></script>
        <!-- page application js -->
        <script src="js/custom-table.js?confirm-round5"></script>
';
    include("views/footer.php");
?>