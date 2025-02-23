<?php

namespace app\admin\model;

use think\Model;

class LoginLon extends Model
{
    protected $table = 'x_admin_log';
    protected $loginTime = true;
//将用户的登陆的信息入库
    public static function log($data)
    {
        return self::create($data, true);
    }
}
