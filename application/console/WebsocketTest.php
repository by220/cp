<?php
namespace app\Console;
use think\Db;
use Flyers\K28;
use think\console\Command;
use think\console\Input;
use think\console\Output;
use think\Cache;
use think\Log;

class WebsocketTest extends Command {
    protected $running = true;
    
    protected function configure() {
        $this->setName('websocket:test')
             ->addOption('daemon', 'd', null, '是否以守护进程方式运行');
    }
    
    protected function execute(Input $input, Output $output) {
        $this->output = $output;
        
        // 注册信号处理器（在 Windows 下不起作用，但在 Linux 下可用）
        if (function_exists('pcntl_signal')) {
            pcntl_signal(SIGTERM, [$this, 'signalHandler']);
            pcntl_signal(SIGINT, [$this, 'signalHandler']);
        }
        
        $this->output->writeln("服务启动成功...");
        
        // 主循环
        while ($this->running) {
            // 开奖采集 (每1.7秒)
            if ($this->shouldRun('kaijiang', 1700)) {
                $games = cache('gameList');
                foreach ($games as $val) {
                    openKj($val['gameType']);
                }
            }
            
            // 更新开奖信息 (每1秒)
            if ($this->shouldRun('update_kj', 1000)) {
                $games = cache('gameList');
                foreach ($games as $val) {
                    getKj($val);
                }
            }
            
            // 网盘实时检测 (每2.3秒)
            if ($this->shouldRun('pankou_check', 2300)) {
                $this->checkPankou();
            }
            
            // 子账号网盘实时检测 (每2.3秒)
            if ($this->shouldRun('subpankou_check', 2300)) {
                $this->checkSubPankou();
            }
            
            // 机器人下注 (每4.5秒)
            if ($this->shouldRun('betting', 4500)) {
                $this->robotBetting();
            }
            
            // 机器人上下分 (每15秒)
            if ($this->shouldRun('points', 15000)) {
                $this->robotPoints();
            }
            
            // 飞单轮询 (每2.4秒)
            if ($this->shouldRun('feidan', 2400)) {
                $this->checkFeidan();
            }
            
            // 自动开收盘 (每3秒)
            if ($this->shouldRun('auto_open_close', 3000)) {
                $this->autoOpenClose();
            }
            
            // 清理过期数据 (每天)
            if ($this->shouldRun('clean_data', 86400000)) {
                $this->cleanExpiredData();
            }
            
            // 休眠100毫秒，避免CPU占用过高
            usleep(100000);
        }
    }
    
    private function shouldRun($key, $interval) {
        $lastRun = Cache::get('last_run_'.$key, 0);
        $now = microtime(true) * 1000;
        
        if ($now - $lastRun >= $interval) {
            Cache::set('last_run_'.$key, $now);
            return true;
        }
        return false;
    }
    
    public function signalHandler($signal) {
        $this->running = false;
        $this->output->writeln("收到终止信号，正在停止服务...");
    }
    
    // 自动开收盘
    private function autoOpenClose() {
        $current_hour = date('H'); 
        $date = time();
        $start = strtotime('05:59:15');
        $end = strtotime('06:59:15');
        
        if ($date > $start && $date < $end) {
            db('robot')->where('isOpen',1)->update(['isOpen'=>0]);
        }
        if ($date >= $end && $date < strtotime('07:02:15')) {
            db('robot')->where('isOpen',0)->update(['isOpen'=>1]);
        }
    }
    
    // 清理过期数据
    private function cleanExpiredData() {
        $day = date('Y-m-d H:i:s',time()-60*60*24*5);
        db('record')->where('dtGenerate','<',$day)->delete();
        db('folder')->where('time','<',$day)->delete();
        db('history')->where('dtOpen','<',$day)->delete();
        db('admin_log')->where('loginTime','<',$day)->delete();
    }
    
    // 测试网盘检测
    private function checkPankou() {
        $flys = db('rbfly')->where('flyers_username','<>', '')
                          ->where('flyers_password','<>', '')
                          ->where('flyers_online',1)
                          ->select();
                          
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
    }

    // 测试子账号盘口检测
    private function checkSubPankou() {
        
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
    }
    
    // 机器人下注
    private function robotBetting() {
        $rb = db('robot')->where('isOpen',1)->where('time','>',date('Y-m-d'))->select();
        foreach ($rb as $item) {
            $rid = $item['id'];
            $uname = $item['UserName'];
            $games = cache('gameList');
            foreach ($games as $val) {
                $type = $val['gameType'];
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
                                if ($user['score']>$last&&(strtotime($arr['dtOpen'])-time())>$item['fengpan']&&(strtotime($arr['dtOpen'])-time())<270&&!cache('feng'.$type)&&!cache('kaijiang'.$type)) {
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
    }
    
    // 机器人上下分
    private function robotPoints() {
        $games = cache('gameList');
            foreach ($games as $val) {
                $type = $val['gameType'];
                $has = db('rbuser')->where('isauto',1)->where('isBlack',0)->where('isrobot',1)->orderRaw('rand()')->limit(6)->select();
                foreach ($has as $value) {
                    $value['gameType'] = $type;
                    $typeArr = ['shang','tou','xia','tou','shang','tou','cha','xia','tou','lishi','tou','shang'];
                    $typeArr = ['shang','tou','xia','tou','shang','liushui','tou','cha','xia','tou','lishi','liushui','tou','shang'];
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
                                        // addMsg($value,$admin,'@'.$value['NickName'].', 成功上分'.$last.', 剩'.((int)$value['score']+(int)$last),$qh);
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
                                        // addMsg($value,$admin,'@'.$value['NickName'].', 成功下分'.$last,$qh);
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
    }

    // 检查飞单
    private function checkFeidan() {
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
    }
} 