#!/bin/bash

PROJECT_DIR="/www/wwwroot/x.hy1965.cn"
LOG_FILE="websocket.log"
PID_FILE="$PROJECT_DIR/pid.file"

case "$1" in
    start)
        cd "$PROJECT_DIR" || exit 1

         if lsof -t -i :9504 > /dev/null 2>&1; then
            echo "正在关闭旧服务..."
            kill -9 $(lsof -t -i :9504) 2>/dev/null
            sleep 2  # 等待端口释放
        fi

        # 确保端口已被释放
        if lsof -t -i :9504 > /dev/null 2>&1; then
            echo "端口 9504 仍然被占用，无法启动新服务"
            exit 1
        fi
        nohup php think websocket:start > "$LOG_FILE" 2>&1 &
        echo $! > "$PID_FILE"
        echo "服务已启动 | PID: $(cat $PID_FILE) | 日志: $PROJECT_DIR/$LOG_FILE"
        ;;
    stop)
        if [ -f "$PID_FILE" ]; then
            PID=$(cat "$PID_FILE")
            if ps -p $PID > /dev/null 2>&1; then
                kill -9 "$PID"
                rm -f "$PID_FILE"
                echo "服务已终止 (PID: $PID)"
            else
                echo "服务未运行"
            fi
        else
            echo "未找到 PID 文件，尝试搜索进程..."
            pkill -f "php think websocket:start" && echo "服务已终止" || echo "服务未运行"
        fi
        ;;
    status)
        if [ -f "$PID_FILE" ]; then
            PID=$(cat "$PID_FILE")
            if ps -p $PID > /dev/null 2>&1; then
                echo "服务运行中 (PID: $PID)"
            else
                echo "服务未运行"
            fi
        else
            PID=$(pgrep -f "php think websocket:start")
            if [ -n "$PID" ]; then
                echo "服务运行中 (PID: $PID)"
            else
                echo "服务未运行"
            fi
        fi
        ;;
    *)
        echo "用法: $0 {start|stop|status}"
        exit 1
        ;;
esac
