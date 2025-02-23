<?php

namespace app\Console;

use think\console\Command;
use think\console\Input;
use think\console\Output;
use app\admin\model\Record;
use think\Db;

class Web extends Command
{
    // Server 实例
    protected $server;
    protected function configure(){
        $this->setName('web:start')->setDescription('Start Web Test Socket Server!');
    }
    protected function execute(Input $input, Output $output){
        // 监听所有地址，监听 10000 端口
        $this->server = new \swoole_websocket_server('0.0.0.0', 9998);
        $this->server->set([
            'max_conn' => 1024,
            'max_request' => 1024,
            'daemonize' => 0,
            'heartbeat_check_interval' => 30,
            'heartbeat_idle_time' => 65
        ]);
        // 设置 server 运行前各项参数
        // 调试的时候把守护进程关闭，部署到生产环境时再把注释取消
        $this->server->set([
            'daemonize' => false,
        ]);
        
        // 设置回调函数
        $this->server->on('Open', [$this, 'onOpen']);
        $this->server->on('Message', [$this, 'onMessage']);
        $this->server->on('Close', [$this, 'onClose']); 
        
        // $this->server->tick(5000, function () {
        //     $server = $this->server;
        //     $clients = $server->getClientList();
        //     if ($clients) {
        //         foreach ($clients as $fd) {
        //             $info = $server->getClientInfo($fd);
        //             $count = cache('usercount'.$info['uid'])?cache('usercount'.$info['uid']):0;
        //             // $msg = db('record')->where('isSHow',1)->where('id','>',$count)->limit(30)->select();
        //             $msg = [];
        //             $user = db('rbuser')->where('id',$info['uid'])->find();
        //             $rb = db('robot')->where('UserName',$user['uid'])->find();
        //             $gid = $user['gid'];
        //             $game = db('rbgame')->where('gameType',$gid)->find();
        //             if($count==0) {
        //                 $res = db('record')->where('rid=:id OR uid=:name ',['id'=>$rb['UserName'], 'name'=>$game['name']])->where('gameType',$gid)->where('isSHow',1)->order('id desc')->limit(30)->select();
        //                 $res = array_reverse($res);
        //             }else {
        //                 $res = db('record')->where('rid=:id OR uid=:name ',['id'=>$rb['UserName'], 'name'=>$game['name']])->where('gameType',$gid)->where('isSHow',1)->where('id','>',$count)->limit(30)->select();
        //             }
        //             print_r($res);
        //             // foreach ($res as $value) {
        //             //     array_push($msg,["type"=>$value['wxid']==0?1:2,"name"=>$value['NickName'],"content"=>$value['cmd'],"rank"=>$user['wxid']==$value['wxid']?1:2,"ids"=>$value['id'],"headimg"=>$value['headimg'],"wxid"=>$value['wxid'],'atUser'=>$value['sys'],'wid'=>$value['wid']]);
        //             // }
        //             // $server->push($fd, json_encode($msg));
        //             cache('usercount'.$info['uid'],$count+30);
        //         }
        //     }
        // });
        
        $this->server->start();
        $output->writeln("WebSocket: Start.\n");
    }
    
    // 建立连接时回调函数
    public function onOpen(\swoole_websocket_server $server, \swoole_http_request $request){
        echo "用户{$request->fd}加入。\n";
        $uid = $request->get['uid'];
        $gt = $request->get['gt'];
        cache('usercount'.$uid,0);
        $server->bind($request->fd, $uid);
        $server->bind($request->fd, $gt);
    }
    
    // 收到数据时回调函数
    public function onMessage(\swoole_websocket_server $server, \swoole_websocket_frame $frame){   
        //接受的json数据转化成数据
        $data = json_decode($frame->data,true);
        $istId = sendMsg($data);
        if ($istId) {
            $wan = db('rbuser')->where('wxid',$data['wxid'])->find();
            $usre = db('robot')->where('UserName',$wan['uid'])->find();
            $value = db('record')->where('id',$istId)->find();
            $msg = ["type"=>$value['wxid']==0?1:2,"name"=>$value['NickName'],"content"=>$value['cmd'],"rank"=>$wan['wxid']==$value['wxid']?1:2,"ids"=>$value['id'],"headimg"=>$value['headimg'],"wxid"=>$value['wxid'],'atUser'=>$value['sys'],'wid'=>$value['wid'],"isVip"=>$usre['vip']];
            $server->push($frame->fd, json_encode($msg));
        }
        echo($istId);
        echo "receive from {$frame->fd}:{$frame->data},opcode:{$frame->opcode},fin:{$frame->finish}" ."test \n";
       
    }
    
    // 连接关闭时回调函数
    public function onClose($server, $fd){
        echo "client {$fd} closed \n";
    }


}