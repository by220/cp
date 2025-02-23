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

class Test extends Command{
    protected $server;
    protected function configure()
    {
        $this->setName('test:start')->setDescription('Start Web Socket Server!');
    }
    protected function execute(Input $input, Output $output)
    {
        $serv = new \swoole_server('127.0.0.1',9549);

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
        $serv->on('connect', function ($serv, $fd){
        });
        $serv->on('close', function ($serv, $fd){
        });
        $serv->on('receive', function($serv, $fd, $from_id, $data) {
            $task_id = $serv->task($data);
            echo "开始投递飞单任务 id=[$task_id]".PHP_EOL;
        });
        $serv->on('Task', function ($serv, \Swoole\Server\Task $task) {
        });
        $serv->on('finish', function ($serv, $task_id, $data) {
        });

        // 网盘实时检测
        \Swoole\Timer::tick(1050, function(){
            $type = 17;
            $game = db('rbgame')->where('gameType',$type)->where('status',1)->find();
            $open2 = db('history')->where('type',$type)->where('Code','<>','')->order('id desc')->limit(20)->select();
                cache('qiList'.$type,$open2);
                $lishi = '<div class="card2"><div class="tbhead"><span>期数</span><span>时间</span><span>结果</span>'.($type!=75 ? '<span>番</span>': '').'</div><div class="list">';
                foreach ($open2 as $k=>$value) {
                    if ($k<15) {
                        $time = explode(' ',$value['dtOpen']);
                        $bor = ($k==0?'border:1px solid #ec5d5d;': '');
                        $lishi .= '<div style="display: flex;justify-content:space-around;background:#fff;align-items: center;width:100%;line-height:26px;box-sizing:border-box;'.$bor.'"><span class="qihao">'.substr($value['QiHao'],-3).'</span><span class="shijian">'.date('H:i',strtotime($value['dtOpen'])).'</span><span class="haoma">';
                        $list2 = explode(',',$value['Code']);
                        foreach ($list2 as $y=>$val) {
                            $hong = qiuHong($val,$game,$y);
                            if (!$game['hasKey']) {
                                $lishi .= '<span class="hong '.$hong.'">'.$val.'</span>';
                                if ($y==3) {
                                    $lishi .= '<span class="hong nohong">+</span>';
                                }
                            } else {
                                $lishi .= '<span class="'.$hong.'">'.$val.'</span>';
                            }
                        }
                        if (!$game['hasTe']) {
                            $lishi .= '<span style="border:none;width: auto;">=</span>';
                            $lishi .= '<span class="hong">'.getCum($value).'</span>';
                        }
                        if (!$game['hasKey']) {
                            $lishi .= '<span class="hong yellow75">'.getCum($value).'</span>';
                            $lishi .= '<span class="hong yellow75">'.getLongHu($value).'</span>';
                        }
                        $lifan = getFan($value);
                        $lidan = getKjDs($value);
                        $lida = getKjDx($value);
                        if (!$game['hasKey']) {
                            $lishi .= bgKj($value);
                        }
                        $lishi .= '</span><span class="three" '.(!$game['hasKey'] ? 'style="display:none;"': '').'><span class="colorfan color'.$lifan.'">'.$lifan.'</span><span class="da">'.$lida.'</span><span class="dan">'.$lidan.'</span></span></div>';
                    }
                }
                echo($lishi);
        });
        
        $serv->start();
    }

}
