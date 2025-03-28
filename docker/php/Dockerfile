FROM php:7.2-fpm

# 安装 PHP 扩展
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    libonig-dev \
    autoconf \
    && docker-php-ext-install pdo pdo_mysql mysqli mbstring exif pcntl bcmath gd

# 安装 Redis（指定兼容版本）
RUN pecl install redis-5.3.7 && docker-php-ext-enable redis

# 启用 fileinfo 扩展
RUN docker-php-ext-install fileinfo

# 复制启动脚本
COPY start-all.sh /usr/local/bin/start-all.sh
RUN chmod +x /usr/local/bin/start-all.sh

WORKDIR /var/www/html

EXPOSE 9000 9998 9504
