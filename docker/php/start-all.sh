#!/bin/sh
# 启动 PHP-FPM
php-fpm &

# 启动 ThinkPHP WebSocket 服务器
php think web:start &  # 运行在 9998 端口
php think websocket:start &  # 运行在 9504 端口

# 监听进程，防止容器退出
wait
