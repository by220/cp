<?php
/*
*author:hdj
*/
namespace app\Console;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;
use think\Cache;
use think\console\Command;
use think\console\Input;
use think\console\Output;
use think\Db;
use Flyers\K28;
use think\exception\ErrorException;

class Websocket extends Command{
    protected $server;
    protected function configure()
    {
        $this->setName('websocket:start')->setDescription('Start Web Socket Server!');
    }
    protected function execute(Input $input, Output $output)
    {
        $serv = new \swoole_server('127.0.0.1',9504);

        $serv->set(array(
            "worker_num" => 20,
            'task_worker_num' => 20,
            "task_ipc_mode" => 1,
            "task_enable_coroutine" => true,
            'open_eof_split'=>true,
            'package_eof'=>"\r\n\r\n"
        ));

        $serv->on('start', function ($serv){
            echo "服务启动成功".PHP_EOL;
        });
        $serv->on('receive', function($serv, $fd, $from_id, $data) {
            $task_id = $serv->task($data);
        });
        $serv->on('Task', function ($serv, \Swoole\Server\Task $task) {
        });

        /**
         * 138开奖采集
         */
        // \Swoole\Timer::tick(2000, function(){
        //     $config = Db::name('config')->find();
        //     $kjip = $config['kjip'];//开奖网址
        //     $game = Db::name('game')->where('ifopen',1)->order('kjtime desc')->select();
        //     $cg = count($game);
            
        //     /***********开奖*********/
        //     for ($k = 0; $k < $cg; $k++) {
        //         $gid = $game[$k]['gid'];
        //         $time = time();
        //         $mnum = $game[$k]['mnum'];
        //         $bml = $game[$k]['thisbml'];
        //         $cs = json_decode($game[$k]['cs'] , true);
        //         if ($gid == 132) {
        //             $gm = Db::name('game')->where('gid',$gid)->find();
        //             $cs = json_decode($gm['cs'], true);
        //             $arr = cjkj($gid,0);
        //             $arr = json_decode($arr, true);
        //             $arr = $arr['m'];
        //             $sq=$arr['preDrawIssue'];
        //             if ($sq) {
        //                 $qh=$arr['drawIssue'];
        //                 $time=$arr['drawTime'];
        //                 $code=$arr['preDrawCode'];
        //                 $dates = date('Y-m-d');
        //                 $opentime = $arr['preDrawTime'];
        //                 $closetime = date('Y-m-d H:i:s',strtotime($time) - $cs['closetime']);
        //                 // Db::name('kj')->where('gid',$gid)->where('m1','=','')->where('qishu','<',$qh)->delete();
        //                 $has = Db::name('kj')->where('gid',$gid)->where('qishu',$qh)->find();
        //                 if (!$has) {
        //                     echo "{$sq}开奖结果【{$code}】".PHP_EOL;
        //                     Db::name('kj')->insert(['gid'=>$gid,'qishu'=>$qh,'closetime'=>$closetime,'kjtime'=>$time,'bml'=>$bml,'dates'=>$dates,'baostatus'=>1,'opentime'=>$opentime]);
        //                     Db::name('game')->where('gid',$gid)->where('ifopen',1)->update(['thisqishu'=>$qh]);
        //     				$codeArr = explode(',', $code);
        //                     for ($i = 1; $i <= count($codeArr); $i++) {
        //                         Db::name('kj')->where('gid',$gid)->where('qishu',$sq)->update(['m' . $i=>$codeArr[$i - 1]]);
        // 					}
        //                 }
        //             }
        //         }elseif ($gid == 109||$gid == 131) {
        //             $gm = Db::name('game')->where('gid',$gid)->find();
        //             $cs = json_decode($gm['cs'], true);
        //             $arr = cjkj($gid,0);
        //             $arr = json_decode($arr, true);
        //             if (is_array($arr['m'])&&count($arr['m'])>0){
        //                 $arr = $arr['m'][0];
        //                 $sq=$arr['preDrawIssue'];
        //                 if ($sq) {
        //                     $qh=(int)$sq+1;
        //                     $time=date('Y-m-d H:i:s',strtotime($arr['preDrawTime'])+5*60);
        //                     $code=$arr['preDrawCode'];
        //                     $dates = date('Y-m-d');
        //                     $opentime = $arr['preDrawTime'];
        //                     $closetime = date('Y-m-d H:i:s',strtotime($time) - $cs['closetime']);
        //                     $has = Db::name('kj')->where('gid',$gid)->where('qishu',$qh)->find();
        //                     if (!$has) {
        //                         echo "{$sq}开奖结果【{$code}】".PHP_EOL;
        //                         Db::name('kj')->insert(['gid'=>$gid,'qishu'=>$qh,'closetime'=>$closetime,'kjtime'=>$time,'bml'=>$bml,'dates'=>$dates,'baostatus'=>1,'opentime'=>$opentime]);
        //                         Db::name('game')->where('gid',$gid)->where('ifopen',1)->update(['thisqishu'=>$qh]);
        //         				$codeArr = explode(',', $code);
        //                         for ($i = 1; $i <= count($codeArr); $i++) {
        //                             Db::name('kj')->where('gid',$gid)->where('qishu',$sq)->update(['m' . $i=>$codeArr[$i - 1]]);
        //     					}
        //                     }
        //                 }
        //             }
        //         }
                    
        //     }

        //     /***********开奖*********/
        //     $js = 0;
        //     $jarr = [];
            
        //     // foreach ($game as $key => $v) {
        //     //     if ($v['ifopen'] == 0) {
        //     //         continue;
        //     //     }
        //     //     $gid = $v['gid'];
        //     //     $timekj = date("Y-m-d H:i:s");
        //     //     $mnum = $v['mnum'];
        //     //     $rs1 = $psql->arr("select qishu from `{$tb_kj}` where gid='{$gid}' and dates='{$dates}' and kjtime<='{$timekj}' and js=0 and m" . $mnum . "!='' order by qishu desc limit 3", 1);
        //     //     if (count($rs1) > 0) {
        //     //         $tsql->query("select cs,fenlei,mtype,ztype from `{$tb_game}` where gid='" . $v['gid'] . "'");
        //     //         $tsql->next_record();
        //     //         $cs = json_decode($tsql->f('cs'), true);
        //     //         $mtype = json_decode($tsql->f('mtype'), true);
        //     //         $ztype = json_decode($tsql->f('ztype'), true);
        //     //         foreach ($rs1 as $v1) {
        //     //             $ms = calc($v['fenlei'], $v['gid'], $cs, $v1['qishu'], $v['mnum'], $ztype, $mtype);
        //     //             $js = 1;
        //     //             $jarr['g' . $v['gid']] = 1;
        //     //         }
        //     //     }
        //     // }
        //     // if ($js == 1 && date("H")!=6) {
        //     //     jiaozhengedu();
        //     // }
        //     // echo 'ok';
        // });
        
        // 网盘实时检测
        \Swoole\Timer::tick(2300, function(){
            $flys = db('rbfly')->where('flyers_username','<>', '')->where('flyers_password','<>', '')->where('flyers_online',1)->select();
            if (count($flys) > 0){
                foreach ($flys as $item){
                    $robot = Db::name('robot')->where('UserName',$item['uid'])->find();
                    if ($robot) {
                        $user = $item['uid'];
                        $flyers_type = $item['id'];
                        if (!isset($robot['flyers_type']) ||  $robot['flyers_type'] == '' || !isset($item['flyers_username']) || $item['flyers_username'] == '' || !isset($item['flyers_password']) || $item['flyers_password'] == ''){
                            echo "====      [{$user}]飞单盘口信息不完整[跳过]".PHP_EOL;
                            return false;
                        }
                        if ($robot['flyers_type'] == 'K28'){
                            try {
                                $wp = Db::name('rbwp')->where('id',$item['fly_id'])->find();
                                $flyers = NEW K28(array(
                                    'host' => $wp['websiteUrl']
                                ));
                                $info = $flyers->getInfo($item['id'],$robot,$wp);
                                if ($info['bOK'] == 0){
                                    if ($wp['code']=='k28'||$wp['code']=='gy') {
                                        Cache::set("{$user}_{$flyers_type}",$info['Data'],20);
                                        Db::name('rbfly')->where('id',$item['id'])->update(array(
                                            "flyers_online" => ($info['Data'][4]>=0?1:0),
                                            "money" => $info['Data'][4],
                                            "betting" => $info['Data'][5]
                                        ));
                                    } elseif ($wp['code']=='hh'||$wp['code']=='yyz') {
                                        Cache::set("{$user}_{$flyers_type}",$info['Data'],20);
                                        Db::name('rbfly')->where('id',$item['id'])->update(array(
                                            // "flyers_online" => ($info['Data']['walletinfos'][0]['amount']>=0?1:0),
                                            "flyers_online" => 1,
                                            "money" => ($info['Data']['walletinfos'][0]['amount']>0?$info['Data']['walletinfos'][0]['amount']:$info['Data']['walletinfos'][5]['amount']),
                                            "betting" => $info['Data']['unsettleamount']
                                        ));
                                    } else {
                                        Cache::set("{$user}_{$flyers_type}",$info['Data'][0],20);
                                        Db::name('rbfly')->where('id',$item['id'])->update(array(
                                            "flyers_online" => ($info['Data'][0]['balance']>=0?1:0),
                                            "money" => $info['Data'][0]['balance'],
                                            "betting" => (isset($info['Data'][0]['betting'])?$info['Data'][0]['betting']:0.00)
                                        ));
                                    }
                                }else{
                                    $login = $flyers->login($item['id'],array(
                                        'username' => $item['flyers_username'],
                                        'password' => $item['flyers_password']
                                    ),$robot,$wp);
                                    if ($login['bOK'] == 0){
                                        echo "====      [{$user}]飞单盘口掉线，重新登录成功".PHP_EOL;
                                    // }else{
                                    //     Db::name('rbfly')->where('id',$item['id'])->update(array(
                                    //         "flyers_online" => 0
                                    //     ));
                                    //     echo "====      [{$user}]飞单盘口掉线，重新登录失败，自动关闭自动飞单".PHP_EOL;
                                    }
                                    return false;
                                }
                            }catch (ErrorException $errorException){
                                return false;
                            }
                        }else{
                            echo "====      [{$user}]飞单盘口暂不支持".PHP_EOL;
                            return false;
                        }
                    }
                }
            }
            
            $day = date('Y-m-d H:i:s',time()-60*60*24*5);
            db('record')->where('dtGenerate','<',$day)->delete();
            db('folder')->where('time','<',$day)->delete();
            db('history')->where('dtOpen','<',$day)->delete();
            db('admin_log')->where('loginTime','<',$day)->delete();
        });
        
        // 子帐号网盘实时检测
        \Swoole\Timer::tick(2300, function(){
            $flys = db('admin')->where('feidanname','<>', '')->where('feidanpwd','<>', '')->where('feidanid','<>', '')->where('feidan',1)->select();
            foreach ($flys as $item){
                $wp = Db::name('rbwp')->where('id',$item['feidanid'])->find();
                $flyers = NEW K28(array(
                    'host' => $wp['websiteUrl']
                ));
                $info = $flyers->getSubInfo($item['UserName'],$item);
                if ($info['bOK'] == 0){
                    if ($item['feidanid']=='12'||$item['feidanid']=='13') {
                        Db::name('admin')->where('id',$item['id'])->update(array(
                            // "feidanonline" => ($info['Data']['walletinfos'][0]['amount']>=0?1:0),
                            "feidanonline" => 1,
                            "feidanmoney" => ($info['Data']['walletinfos'][0]['amount']>0?$info['Data']['walletinfos'][0]['amount']:$info['Data']['walletinfos'][5]['amount']),
                            "feidanbetting" => $info['Data']['unsettleamount']
                        ));
                    } else {
                        Db::name('admin')->where('id',$item['id'])->update(array(
                            "feidanonline" => ($info['Data'][0]['balance']>=0?1:0),
                            "feidanmoney" => $info['Data'][0]['balance'],
                            "feidanbetting" => (isset($info['Data'][0]['betting'])?$info['Data'][0]['betting']:0.00)
                        ));
                    }
                }else{
                    $login = $flyers->subLogin($item['UserName'],array(
                        'username' => $item['feidanname'],
                        'password' => $item['feidanpwd']
                    ),$item);
                    if ($login['bOK'] == 0){
                        echo "====      子帐号{$item['UserName']}飞单盘口掉线，重新登录成功".PHP_EOL;
                    }else{
                        Db::name('admin')->where('id',$item['id'])->update(array(
                            "feidanonline" => 0
                        ));
                        echo "====      子帐号{$item['UserName']}飞单盘口掉线，重新登录失败，自动关闭自动飞单".PHP_EOL;
                    }
                    return false;
                }
            }
        });
        
        // 飞单赔率获取
        // \Swoole\Timer::tick(2000, function(){
        //     $flys = db('rbfly')->where('flyers_username','<>', '')->where('flyers_password','<>', '')->where('flyers_online',1)->select();
        //     if (count($flys) > 0){
        //         foreach ($flys as $item){
        //             $robot = Db::name('robot')->where('UserName',$item['uid'])->find();
        //             if ($robot) {
        //                 $flyers_type = $item['id'];
        //                 if (!cache('make'.$robot['type'].$robot['jstype'].$item['flyers_type'])){
        //                     try {
        //                         $wp = Db::name('rbwp')->where('id',$item['fly_id'])->find();
        //                         $cookie_path = ROOT_PATH . "flyers/cookie/{$flyers_type}.txt";
        //                         $abcd = $item['flyers_type'] == '2' ? 'B' : ($item['flyers_type'] == '3' ? 'C' : ($item['flyers_type'] == '4' ? 'D' : 'A'));
        //                         if ($robot['type']==8&&$robot['jstype']==1) {
        //                             $gids = '801';
        //                         } elseif ($robot['type']==8&&$robot['jstype']==6) {
        //                             $gids = '131';
        //                         } elseif ($robot['type']==5&&$robot['jstype']==4) {
        //                             $gids = '109';
        //                         } else {
        //                             $gids = '';
        //                         }
        //                         $filed = [
        //                             'xtype' => "lib",
        //                             'stype' => "a",
        //                             "abcd" => $abcd,
        //                             "ab" => "A",
        //                             "bid" => 26000000,
        //                             "sc" => "undefined",
        //                             "sid" => "undefined",
        //                             'gids' => $gids
        //                         ];
        //                         $Sch = curl_init();
        //                 		curl_setopt($Sch, CURLOPT_POST, 1);
        //                 		curl_setopt($Sch, CURLOPT_URL, $wp['websiteUrl']."uxj/make.php");
        //                 		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        //                 		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        //                 		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
        //                         curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
        //                 		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query($filed));
        //                 		curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
    		  //                  curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path); 
        //                 		$file_content = curl_exec($Sch);
        //                 		curl_close($Sch);
        //                         $body = json_decode($file_content,true);
        //                         cache('make'.$robot['type'].$robot['jstype'].$item['flyers_type'],$body);
        //                     }catch (ErrorException $errorException){
        //                         return false;
        //                     }
        //                 }else{
        //                     return false;
        //                 }
        //             }
        //         }
        //     }
        // });

        /**
         * 网盘实时检测
         */
        // \Swoole\Timer::tick(60000, function(){
        //     $fly = db('rbfly')->where('flyers_username','<>', '')->where('flyers_url','<>', '')->where('flyers_password','<>', '')->where('flyers_online',1)->find();
        //     if ($fly){
        //         $cookie_path = ROOT_PATH . "flyers/cookie/{$fly['id']}.txt";
        //         try {
        //             $Sch = curl_init();
        //     		curl_setopt($Sch, CURLOPT_POST, 1) ;
        //     		curl_setopt($Sch, CURLOPT_URL, $fly['flyers_url'].'mxj/make.php');
        //     		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        //     		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        //     		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
        //     		curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
        //     		curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path); 
        //     		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query(['xtype'=>'lib','stype'=>'a','bid'=>'23378780','abcd'=>'A','ab'=>'A','pid'=>'999']));
        //     		$file_content = curl_exec($Sch);
        //     		curl_close($Sch);
        //         } catch (Exception $e) {
        //             // 其他类型的异常
        //             echo '发生异常：' . $e->getMessage();
        //         }
        //         $file_content = json_decode($file_content,true);
        //         if ($file_content && count($file_content)>0){
        //             cache('k28json',$file_content);
        //         }
        //     }
        // });

        /**
         * 机器人下注
         */
        \Swoole\Timer::tick(4500, function (){
            $rb = db('robot')->where('isOpen',1)->where('time','>',date('Y-m-d'))->select();
            foreach ($rb as $item) {
                $rid = $item['id'];
                $uname = $item['UserName'];
                $games = cache('gameList');
                $gameArr = explode(',',$item['game']);
                foreach ($games as $val) {
                    $type = $val['gameType'];
                    if (!in_array($type,$gameArr)) {
                        continue;
                    }
                    $xiaArr = cache('xiazhulist'.$rid.$type)?cache('xiazhulist'.$rid.$type):[];
                    $tuoCount = db('rbuser')->where('uid',$uname)->where('isauto',1)->where('isrobot',1)->where('isBlack',0)->count();
                    $user = db('rbuser')->where('uid',$uname)->where('id','not in',$xiaArr)->where('isauto',1)->where('isrobot',1)->where('isBlack',0)->orderRaw('rand()')->limit(1)->find();
                    if ($user&&count($xiaArr)<$tuoCount*0.9) {
                        $inarr = in_array($user['id'],$xiaArr);
                        if (!$inarr) {
                            $user['gameType'] = $type;
                            array_push($xiaArr,$user['id']);
                            cache('xiazhulist'.$rid.$type,$xiaArr);
                            $admin = ['UserName'=>$item['uid']];
                            if (!$val['hasKey']) {
                                $fristArr = ['1大','1小','1单','1双','1尾大','1尾小','龙','虎','2大','2小','2单','2双','2尾大','2尾小','3大','3小','3单','3双','3尾大','3尾小','4大','4小','4单','4双','4尾大','4尾小','5大','5小','5单','5双','5尾大','5尾小','大','小','单','双','尾大','尾小'];
                            } else if (!$val['hasTe']) {
                                $fristArr = ['特','特','特','特','特','特','单','双','大','小','12角','23角','14角','34角','1番','2番','3番','4番','1正','4正','3正','2正','12无3','12无4','13无2','13无4','14无2','14无3','23无1','23无4','24无1','24无3','34无1','34无2','1无2','1无3','1无4','2无1','2无3','123','234','134','124','2无4','3无1','3无2','3无4','4无1','4无2','4无3','1严2','2严1','2严3','3严2','3严4','4严3','4严1','1严4','特','特','特','特','特','特','特','特','特','特','特','特','特','特','特','特','特','特','123','234','134','124'];
                            } else {
                                $fristArr = ['特','特','特','特','特','特','单','双','大','小','12角','23角','14角','34角','1番','2番','3番','4番','1正','4正','3正','2正','12无3','12无4','13无2','13无4','14无2','14无3','23无1','23无4','24无1','24无3','34无1','34无2','1无2','1无3','1无4','2无1','2无3','123','234','134','124','2无4','3无1','3无2','3无4','4无1','4无2','4无3','1严2','2严1','2严3','3严2','3严4','4严3','4严1','1严4','特','特','特','特','特','特','特','特','特','特','特','特','特','特','特','特','特','特','123','234','134','124','1通23','1通24','1通34','1通32','1通42','1通43','2通13','2通14','2通34','2通31','2通41','2通43','3通12','3通14','3通24','3通12','3通41','3通42','4通12','4通13','4通23','4通21','4通31','4通32','1加34','1加43','1加23','1加32','2加34','2加43','2加41','2加14','3加14','3加41','3加12','3加21','4加12','4加21','4加23','4加32'];
                            }
                            $rand = rand(0,count($fristArr)-1);
                            $frist = $fristArr[$rand];
                            $last = rand($user['tuoMin'],$user['tuoMax']);
                            if ($last>0) {
                                $arr = cache('nowQi'.$type);
                                $qh = $arr['QiHao'];
                                if (cache('shangqi'.$type)==cache('dangqi'.$type)) {
                                    if ($user['score']>$last&&(strtotime($arr['dtOpen'])-time())>$item['fengpan']&&(strtotime($arr['dtOpen'])-time())<255&&!cache('feng'.$type)&&!cache('kaijiang'.$type)) {
                                        $user['fans'] = $item['FanShui'];
                                        $user['peil'] = $item['PeiLv'];
                                        $user['tepeil'] = $item['tePeilv'];
                                        $user['tefans'] = $item['teFanshui'];
                                        $qiuNum = rand(1,7);
                                        $qiu = ($val['hasSelect']?'第'.$qiuNum.'球/':($val['wf']?$val['wf'].'/':''));
                                        $user['qiuNum'] = ($val['hasSelect']?$qiuNum:8);
                                        if (!$val['hasKey']) {
                                            addCmd($user,$admin,$frist.$last,$qh);
                                            addDan($user,$admin,$last,$frist.$last,$qh);
                                            db('rbuser')->where('wxid',$user['wxid'])->where('uid',$user['uid'])->setDec('score',$last);
                                        } else {
                                            if ($frist=='特') {
                                                if ($val['hasTe']) {
                                                    $num = rand(1,20);
                                                    $num = $num>9?$num:'0'.$num;
                                                    addCmd($user,$admin,$qiu.$num.$frist.$last,$qh);
                                                    addDan($user,$admin,$last,$num.$frist.$last,$qh);
                                                }
                                            } elseif ($rand>21) {
                                                addCmd($user,$admin,$qiu.$frist.'/'.$last,$qh);
                                                addDan($user,$admin,$last,$frist.'/'.$last,$qh);
                                            } else {
                                                addCmd($user,$admin,$qiu.$frist.$last,$qh);
                                                addDan($user,$admin,$last,$frist.$last,$qh);
                                            }
                                            db('rbuser')->where('wxid',$user['wxid'])->where('uid',$user['uid'])->setDec('score',$last);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        /**
         * 机器人上下分
         */
        \Swoole\Timer::tick(15000, function (){
            $games = cache('gameList');
            foreach ($games as $val) {
                $type = $val['gameType'];
                $has = db('rbuser')->where('isauto',1)->where('isBlack',0)->where('isrobot',1)->orderRaw('rand()')->limit(6)->select();
                foreach ($has as $value) {
                    $value['gameType'] = $type;
                   // $typeArr = ['shang','tou','xia','tou','shang','liushui','tou','cha','xia','tou','lishi','liushui','tou','shang'];
                    $typeArr = ['shang','tou','xia','tou','shang','tou','xia','tou','tou','shang'];
                    $rd = rand(0,count($typeArr)-1);
                    $usre = db('robot')->where('UserName',$value['uid'])->find();
                    $admin = ['UserName'=>$usre['uid']];
                    $arr = cache('nowQi'.$type);
                    $qh = $arr['QiHao'];
                    $cmd = $typeArr[$rd];
                    if ($usre['isOpen']==1&&(strtotime($usre['time'])>time())) {
                        if (cache('shangqi'.$type)==cache('dangqi'.$type)) {
                            $str = ($cmd=='cha'?'查':($cmd=='lishi'?'历史':'流水'));
                            $count = db('record')->where('name',$value['wxid'])->where('rid',$value['uid'])->where('gameType',$type)->where('qihao',$qh)->where('cmd',$str)->count();
                            $liCount = db('record')->where('rid',$value['uid'])->where('gameType',$type)->where('qihao',$qh)->where('cmd',$str)->count();
                            if ($cmd=='shang') {
                                $frist = '上';
                                if ((strtotime($arr['dtOpen'])-time())>10&&!cache('kaijiang'.$type)) {
                                    $hasShang = db('folder')->where('wxid',$value['wxid'])->where('qh',$qh)->where('gameType',$type)->where('type',0)->find();
                                    if ($value['score']<$value['tuoMin']&&!$hasShang) {
                                        $arrNum = [500,7000,1800,800,3000,1500,8000,1000,10000,5000,2500,6000,2000];
                                        $last = $arrNum[rand(0,count($arrNum)-1)];
                                        addCmd($value,$admin,$frist.$last,$qh);
                                        addJifen($value,$admin,$last,0,$qh);
                                        addMsg3($value,$admin,$last,'@'.$value['NickName'].', 上分'.$last.',待审批!',$qh,$cmd);
                                        db('rbuser')->where('id',$value['id'])->setInc('score',$last);
                                         addMsg($value,$admin,'@'.$value['NickName'].', 成功上分'.$last.', 剩'.((int)$value['score']+(int)$last),$qh);
                                    }
                                }
                            }
                            if ($cmd=='xia') {
                                $frist = '下';
                                if ((strtotime($arr['dtOpen'])-time())>10&&!cache('kaijiang'.$type)) {
                                    $hasXia = db('folder')->where('wxid',$value['wxid'])->where('qh',$qh)->where('gameType',$type)->where('type',1)->find();
                                    $xia = db('folder')->where('wxid',$value['wxid'])->order('id desc')->find();
                                    $time = $xia?strtotime($xia['time']):0;
                                    $last = ($value['score']>2000)?round($value['score']*0.5,-3):0;
                                    if (($value['score']>$last)&&!$hasXia&&(time() - $time> 30*60)&&$last!=0) {
                                        addCmd($value,$admin,$frist.$last,$qh);
                                        addJifen($value,$admin,$last,1,$qh,1);
                                        addMsg3($value,$admin,$last,'@'.$value['NickName'].', 下分'.$last.',待审批!, 剩'.($value['score']-$last),$qh,$cmd);
                                        db('rbuser')->where('id',$value['id'])->setDec('score',$last);
                                         addMsg($value,$admin,'@'.$value['NickName'].', 成功下分'.$last,$qh);
                                    }
                                }
                            }
                            if ($cmd=='cha'&&$count<1) {
                                cha($value,$admin,$str,$qh);
                            }
                            if ($cmd=='lishi'&&$liCount<1&&$val['hasKey']) {
                                $value['iskj'] = true;
                                lishi($value,$admin,$str,$qh,$usre);
                            }
                            if ($cmd=='liushui'&&$liCount<1) {
                                liushui($value,$admin,$str,$qh,$usre);
                            }
                        }
                    }
                }
            }
        });

        /**
         * 开奖
         */
        \Swoole\Timer::tick(1700, function (){
            $games = cache('gameList');
            foreach ($games as $val) {
                openKj($val['gameType']);
            }
        });

        /**
         * 更新开奖信息
         */
        \Swoole\Timer::tick(1000, function(){
            $games = cache('gameList');
            foreach ($games as $val) {
                getKj($val);
            }
        });

        /**
         * 自动开收盘
         */
        // \Swoole\Timer::tick(3000, function(){
        //      $currentDate = date('Y-m-d');
        //      $date = time();
        //      $all = db('robot')->select();
        //      foreach ($all as $value) {
        //         $start = strtotime($currentDate . ' ' . $value['datestart']);
        //         $end = strtotime($currentDate . ' ' . $value['dateend']);
                
        //         // 处理跨天情况：如果 dateend 小于 datestart，则说明跨天了
        //         if ($end < $start) {
        //             // 假设 datestart 为17:00, dateend 为02:00 (第二天)，加一天到 end 上
        //             $end = strtotime('+1 day', $end);
        //         }

        //         // 如果当前时间在 start 和 end 之间，更新数据
              
        //         if ($date > $start && $date < $end && $value['isOpen'] == 1) {
        //             db('robot')->where('id', $value['id'])->update(['isOpen' => 0]);
        //         }else {

        //         }

        //         // 如果当前时间大于等于 end，并且小于 start (跨天)，且 isOpen 为 0，则更新
        //         if (($date >= $end || $date < $start) && $value['isOpen'] == 0) {
        //             db('robot')->where('id', $value['id'])->update(['isOpen' => 1]);
        //         }
        //      }
            
        // });
        
        
        // 飞单轮询
        \Swoole\Timer::tick(2400, function(){
            $all = db('record')->where('type',3)->where('status',0)->where('isTuo',0)->where('flyers_status',3)->select();
            foreach ($all as $value) {
                $wan = db('rbuser')->where('wxid',$value['name'])->find();
                $wan['gameType'] = $wan['gid'];
                $wan['qiuNum'] = $value['qiuNum'];
                $wan['iskj'] = true;
                if ($value['gameType'] == 75) {
                    $xiaLists = [['m'=>$value['score'],'cmd'=>$value['text'],'d'=>$value['score'],'xiaId'=>$value['id']]];
                    feidan($wan,$value['text'],$value['id'],$xiaLists);
                } else {
                    feidan($wan,$value['text'],$value['id'],[]);
                }
            }
        });
        
        $serv->start();
    }

}
