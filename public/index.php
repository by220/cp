<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// [ 前台应用入口文件 ]

ini_set('session.cookie_httponly', 1);
//ini_set('session.cookie_secure', 1); // 如果是 HTTPS，保留；HTTP 可注释掉
ini_set('session.use_only_cookies', 1);

$logPath = __DIR__ . '/../runtime/log/access_' . date('Ymd_H') . '.log';

$uri     = $_SERVER['REQUEST_URI'] ?? '';
$method  = $_SERVER['REQUEST_METHOD'] ?? '';
$ip      = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$time    = date('Y-m-d H:i:s');
$params  = json_encode($_REQUEST, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$logStr = "[$time] $ip $method $uri $params" . PHP_EOL;
file_put_contents($logPath, $logStr, FILE_APPEND);

// 定义应用目录
define('APP_PATH', __DIR__ . '/../application/');
// 加载框架引导文件
require __DIR__ . '/../thinkphp/start.php';
