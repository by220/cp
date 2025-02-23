<?php
namespace app\Console;

use think\console\Command;
use think\console\Input;
use think\console\Output;

class Autokj extends Command
{
    protected function configure()
    {
        $this->setName('autokj')->setDescription('Here is the remark ');
    }

    protected function execute(Input $input, Output $output)
    {
        $game = db('game')->where('ifopen',1)->select();
        $cg = count($game);
        $js = 0;
        foreach ($game as $key => $v) {
            // if ($v['ifopen'] == 0&&$v['gid'] != '132'&&$v['gid'] != '109'&&$v['gid'] != '131') {
            if ($v['ifopen'] == 0||$v['gid'] != '132'){
                continue;
            }
            echo "{$v['gid']}".PHP_EOL;
            $gid = $v['gid'];
            $mnum = $v['mnum'];
            // $rs1 = db('kj')->where('gid',$gid)->where('m' . $mnum ,'<>','')->where('js',1)->order('qishu desc')->limit(3)->select();
            // // print_r($rs1);
            // if (count($rs1) > 0) {
            //     $games = db('game')->where('gid',$v['gid'])->find();
            //     $cs = json_decode($games['cs'], true);
            //     $mtype = json_decode($games['mtype'], true);
            //     $ztype = json_decode($games['ztype'], true);
            //     foreach ($rs1 as $v1) {
            //         $ms = calc($v['fenlei'], $v['gid'], $cs, $v1['qishu'], $v['mnum'], $ztype, $mtype);
            // print_r($ms);
            //         $js = 1;
            //     }
            // }
            
            $rs1 = db('kj')->where('gid',$gid)->where('qishu','31145512')->select();
            if (count($rs1) > 0) {
                $games = db('game')->where('gid',$v['gid'])->find();
                $cs = json_decode($games['cs'], true);
                $mtype = json_decode($games['mtype'], true);
                $ztype = json_decode($games['ztype'], true);
                foreach ($rs1 as $v1) {
                    $ms = calc($v['fenlei'], $v['gid'], $cs, $v1['qishu'], $v['mnum'], $ztype, $mtype);
            print_r($ms);
                    $js = 1;
                }
            }
        }
        if ($js == 1 && date("H")!=6) {
            // jiaozhengedu();
        }
    }
}