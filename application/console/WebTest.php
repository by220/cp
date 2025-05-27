<?php
namespace app\Console;

use think\console\Command;
use think\console\Input;
use think\console\Output;
use think\Db;

class WebTest extends Command {
    protected $clients = [];
    protected $output;
    protected $master;
    protected $running = true;
    
    protected function configure() {
        $this->setName('web:test')
             ->setDescription('Start Web Test Socket Server (Windows compatible)!');
    }

    protected function execute(Input $input, Output $output) {
        $this->output = $output;
        
        // 创建WebSocket服务器
        $this->master = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        socket_set_option($this->master, SOL_SOCKET, SO_REUSEADDR, 1);
        socket_bind($this->master, '0.0.0.0', 9998);
        socket_listen($this->master);
        
        $this->output->writeln("WebSocket服务器启动，监听端口 9998...\n");
        
        // 非阻塞模式
        socket_set_nonblock($this->master);
        
        while ($this->running) {
            $read = $this->clients;
            $read[] = $this->master;
            $write = null;
            $except = null;
            
            // 检查socket状态
            if (socket_select($read, $write, $except, 0, 100000) > 0) {
                // 处理新连接
                if (in_array($this->master, $read)) {
                    $client = socket_accept($this->master);
                    if ($client) {
                        $this->clients[] = $client;
                        $this->handshake($client);
                        $this->output->writeln("新客户端连接\n");
                    }
                    
                    $key = array_search($this->master, $read);
                    unset($read[$key]);
                }
                
                // 处理客户端消息
                foreach ($read as $client) {
                    $data = $this->decode($client);
                    if ($data === false) {
                        $this->disconnect($client);
                        continue;
                    }
                    
                    if (!empty($data)) {
                        $this->handleMessage($client, $data);
                    }
                }
            }
            
            // 定时检查消息
            static $lastCheck = 0;
            $now = time();
            if ($now - $lastCheck >= 5) {
                $this->checkMessages();
                $lastCheck = $now;
            }
            
            // 避免CPU占用过高
            usleep(10000);
        }
    }
    
    protected function handshake($client) {
        $headers = '';
        do {
            $headers .= socket_read($client, 1024);
        } while (strpos($headers, "\r\n\r\n") === false);
        
        // 解析请求头
        preg_match('#Sec-WebSocket-Key: (.*)\r\n#', $headers, $matches);
        if (isset($matches[1])) {
            $key = base64_encode(sha1($matches[1] . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11', true));
            $headers = "HTTP/1.1 101 Switching Protocols\r\n";
            $headers .= "Upgrade: websocket\r\n";
            $headers .= "Connection: Upgrade\r\n";
            $headers .= "Sec-WebSocket-Accept: $key\r\n\r\n";
            socket_write($client, $headers, strlen($headers));
            
            // 解析查询参数
            preg_match('/GET .*?\?(.+?) HTTP/', $headers, $matches);
            if (isset($matches[1])) {
                parse_str($matches[1], $params);
                if (isset($params['uid']) && isset($params['gt'])) {
                    $this->clients[$client] = [
                        'uid' => $params['uid'],
                        'gt' => $params['gt']
                    ];
                    cache('usercount'.$params['uid'], 0);
                }
            }
            return true;
        }
        return false;
    }
    
    protected function decode($client) {
        $data = socket_read($client, 1024);
        if ($data === false || $data === '') {
            return false;
        }
        
        $decoded = '';
        $len = ord($data[1]) & 127;
        $masks = substr($data, 2, 4);
        $data = substr($data, 6);
        
        for ($i = 0; $i < strlen($data); $i++) {
            $decoded .= $data[$i] ^ $masks[$i % 4];
        }
        
        return $decoded;
    }
    
    protected function encode($data) {
        $b1 = 0x80 | (0x1 & 0x0f);
        $length = strlen($data);
        
        if ($length <= 125)
            $header = pack('CC', $b1, $length);
        elseif ($length > 125 && $length < 65536)
            $header = pack('CCn', $b1, 126, $length);
        else
            $header = pack('CCNN', $b1, 127, $length);
            
        return $header.$data;
    }
    
    protected function disconnect($client) {
        $index = array_search($client, $this->clients);
        if ($index !== false) {
            unset($this->clients[$index]);
        }
        socket_close($client);
    }
    
    protected function handleMessage($client, $data) {
        $data = json_decode($data, true);
        
        // 检查数据是否有效
        if (!$data || !isset($data['wxid'])) {
            return;
        }
        
        // 先检查用户状态
        $wan = db('rbuser')->where('wxid', $data['wxid'])->find();
        if (!$wan) {
            return;
        }
        
        // 检查机器人状态
        $usre = db('robot')->where('UserName', $wan['uid'])->find();
        if (!$usre) {
            return;
        }
        
        // 发送消息
        $istId = sendMsg($data);
        if ($istId) {
            $value = db('record')->where('id', $istId)->find();
            if ($value) {
                $msg = [
                    "type" => $value['wxid'] == 0 ? 1 : 2,
                    "name" => $value['NickName'],
                    "content" => $value['cmd'],
                    "rank" => $wan['wxid'] == $value['wxid'] ? 1 : 2,
                    "ids" => $value['id'],
                    "headimg" => $value['headimg'] ?? '',
                    "wxid" => $value['wxid'],
                    'atUser' => $value['sys'] ?? '',
                    'wid' => $value['wid'] ?? '',
                    "isVip" => $usre['vip'] ?? 0,
                    "isBlack" => $wan['isBlack'] ?? 0  // 添加黑名单状态
                ];
                
                try {
                    socket_write($client, $this->encode(json_encode($msg)));
                } catch (\Exception $e) {
                    $this->output->writeln("发送消息失败: " . $e->getMessage());
                }
            }
        }
    }
    
    protected function checkMessages() {
        foreach ($this->clients as $client => $info) {
            if (isset($info['uid'])) {
                $count = cache('usercount'.$info['uid']) ?: 0;
                $msg = [];
                
                $user = db('rbuser')->where('id', $info['uid'])->find();
                if ($user) {
                    $rb = db('robot')->where('UserName', $user['uid'])->find();
                    if (!$rb) continue;
                    
                    $gid = $user['gid'];
                    $game = db('rbgame')->where('gameType', $gid)->find();
                    if (!$game) continue;
                    
                    try {
                        if ($count == 0) {
                            $res = db('record')
                                ->where('rid=:id OR uid=:name', ['id'=>$rb['UserName'], 'name'=>$game['name']])
                                ->where('gameType', $gid)
                                ->where('isSHow', 1)
                                ->order('id desc')
                                ->limit(30)
                                ->select();
                            $res = array_reverse($res);
                        } else {
                            $res = db('record')
                                ->where('rid=:id OR uid=:name', ['id'=>$rb['UserName'], 'name'=>$game['name']])
                                ->where('gameType', $gid)
                                ->where('isSHow', 1)
                                ->where('id', '>', $count)
                                ->limit(30)
                                ->select();
                        }

                        foreach ($res as $value) {
                            $msg[] = [
                                "type" => $value['wxid'] == 0 ? 1 : 2,
                                "name" => $value['NickName'],
                                "content" => $value['cmd'],
                                "rank" => $user['wxid'] == $value['wxid'] ? 1 : 2,
                                "ids" => $value['id'],
                                "headimg" => $value['headimg'] ?? '',
                                "wxid" => $value['wxid'],
                                'atUser' => $value['sys'] ?? '',
                                'wid' => $value['wid'] ?? '',
                                "isBlack" => $user['isBlack'] ?? 0  // 添加黑名单状态
                            ];
                        }

                        if (!empty($msg)) {
                            socket_write($client, $this->encode(json_encode($msg)));
                        }
                        cache('usercount'.$info['uid'], $count + 30);
                    } catch (\Exception $e) {
                        $this->output->writeln("检查消息失败: " . $e->getMessage());
                        continue;
                    }
                }
            }
        }
    }
} 