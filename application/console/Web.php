<?php

namespace app\Console;

use think\console\Command;
use think\console\Input;
use think\console\Output;
use think\Cache; // 注意：不是 facade，是普通类

class Web extends Command
{
    protected $server;

    protected function configure()
    {
        $this->setName('web:start')->setDescription('Start WebSocket Server');
    }

    protected function execute(Input $input, Output $output)
    {
        $this->server = new \swoole_websocket_server('0.0.0.0', 9998);

        $this->server->set([
            'max_conn' => 1024,
            'max_request' => 1024,
            'daemonize' => false,
            'heartbeat_check_interval' => 30,
            'heartbeat_idle_time' => 65
        ]);

        global $ws_server;
        $ws_server = $this->server;

        $this->server->on('Open', [$this, 'onOpen']);
        $this->server->on('Message', [$this, 'onMessage']);
        $this->server->on('Close', [$this, 'onClose']);
        $this->server->tick(1000, function () {
            $redis = \think\Cache::store('redis')->handler();
        
            while (true) {
                $item = $redis->rPop('ws:push:queue');
                if (!$item) break;
        
                $job = json_decode($item, true);
                if (!isset($job['data'])) continue;
        
                // 🌐 全员广播
                if (!empty($job['broadcast'])) {
                    $uids = $redis->sMembers('ws:online_users');
                    foreach ($uids as $uid) {
                        ws_push_to_uid($uid, $job['data']);
                    }
                }
                // 🏠 房间广播（按 gt 字段分组）
                elseif (!empty($job['group'])) {
                    $fds = $redis->keys("ws:fd:*:info");
                    foreach ($fds as $fdKey) {
                        $info = json_decode($redis->get($fdKey), true);
                        if (!$info) continue;
        
                        if ($info['gt'] === $job['group']) {
                            ws_push_to_uid($info['uid'], $job['data']);
                        }
                    }
                }
                // 🎯 单个用户推送
                elseif (!empty($job['uid'])) {
                    ws_push_to_uid($job['uid'], $job['data']);
                }
            }
        });
        
        
        $this->server->start();
        $output->writeln("✅ WebSocket 服务已启动，监听 9998 端口");
    }

    public function onOpen(\swoole_websocket_server $server, \swoole_http_request $request)
    {
        $fd  = $request->fd;
        $uid = $request->get['uid'] ?? 0;
        $gt  = $request->get['gt'] ?? '';

        if (!$uid) {
            $server->close($fd);
            return;
        }
        cache('usercount'.$uid,0);
        $server->bind($fd, $uid);

        $redis = Cache::store('redis')->handler();

        $redis->set("ws:uid:{$uid}", $fd);
        $redis->set("ws:fd:{$fd}:gt", $gt);
        $redis->set("ws:fd:{$fd}:info", json_encode([
            'uid'     => $uid,
            'gt'      => $gt,
            'join_at' => time(),
        ]));

        $redis->sAdd('ws:online_users', $uid);

        echo "🟢 用户 {$uid} (fd: {$fd}) 加入房间 {$gt}\n";
    }

    public function onMessage(\swoole_websocket_server $server, \swoole_websocket_frame $frame)
    {
        $data = json_decode($frame->data, true);

        if (isset($data['type']) && $data['type'] === 'ping') {
            $server->push($frame->fd, json_encode(['type' => 'pong']));
            return;
        }

        $istId = sendMsg($data);
        if ($istId) {
            $wan = db('rbuser')->where('wxid',$data['wxid'])->field('uid,imgName,NickName,wxid,score')->find();
            $usre = db('robot')->where('UserName',$wan['uid'])->find();
            $value = db('record')->where('id',$istId)->find();
            $msg = ["type"=>3,"ids"=>$value['istId'],"name"=>$wan['NickName'],"content"=>$data['cmd'],"headimg"=>$wan['imgName']];
            $server->push($frame->fd, json_encode($msg));
            $msg = ["type"=>$value['wxid']==0?1:2,"name"=>$value['NickName'],"content"=>$value['cmd'],"rank"=>$wan['wxid']==$value['wxid']?1:2,"ids"=>$value['id'],"headimg"=>$value['headimg'],"wxid"=>$value['wxid'],'atUser'=>$value['sys'],'wid'=>$value['wid'],"isVip"=>$usre['vip']];
            $server->push($frame->fd, json_encode($msg));
        }
        echo($istId);
        echo "receive from {$frame->fd}:{$frame->data},opcode:{$frame->opcode},fin:{$frame->finish}" ."test \n";
    }

    public function onClose($server, $fd)
    {
        $redis = Cache::store('redis')->handler();

        $info = $redis->get("ws:fd:{$fd}:info");
        $info = $info ? json_decode($info, true) : null;

        if ($info && isset($info['uid'])) {
            $uid = $info['uid'];

            $redis->del("ws:uid:{$uid}");
            $redis->del("ws:fd:{$fd}:gt");
            $redis->del("ws:fd:{$fd}:info");
            $redis->sRem("ws:online_users", $uid);

            echo "🔴 用户 {$uid} (fd: {$fd}) 离线，清理完成\n";
        } else {
            echo "🔴 fd {$fd} 离线（无用户信息）\n";
        }
    }
}