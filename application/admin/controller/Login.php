<?php

namespace app\admin\controller;

use app\admin\common\Base;
use think\Request;
use app\admin\model\Admin;
use think\Session;
use app\admin\model\LoginLon;

class Login extends Base
{
    //渲染登录页面
    public function index()
    {
        $this -> alreadyLogin();
        return $this -> view -> fetch('login');
    }

    //验证用户登录
    public function check(Request $request)
    {
		$data = $request -> param();
		$username = $data['username'];
		$password = md5(md5($data['password']));
		$admin = Admin::get(['UserName' => $username,'password' => $password]);
		if (is_null($admin)) {
		    $status = -1;
			$message = '用户名不存在，账号密码错误！';
		} else {
		    if (strtotime($admin -> time)<time()&&$admin->type==0) {
		        $status = -4;
		        $message = '已过期';
		    } else {
    			$status = 1;
    			$message = '验证通过, 正在进入后台';
    			Session::set('user_id', $username);
    			Session::set('user_info', $data);
    			Session::set('user_uid', $admin->id);
                db('admin')->where('UserName',$username)->update(['online' => 1,'logtime'=>time()]);
			}
		}
		addLog($username,$username . $message,'','');
		return ['status' => $status, 'message' => $message];
    }

    //退出登录
    public function  logout(Request $request)
    {
        db('admin')->where('UserName',session('user_id'))->update(['online' => 0]);
        Session::delete('user_id');
		Session::delete('user_info');
		Session::delete('user_uid');
		$this -> redirect('login/index');
    }
    
}
