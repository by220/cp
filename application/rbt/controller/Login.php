<?php

namespace app\rbt\controller;

use app\rbt\common\Base;
use think\Request;
use app\admin\model\Admin;
use think\Session;

class Login extends Base
{

    /**
     * 显示指定的资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function  logout2(Request $request)
    {
		//db('robot')->where('UserName',USER_ID)->update(['online' => 0,'logtime'=>time()]);
		Session::delete('rbInfo');
        Session::delete('user_id2');
		$this -> redirect('login2');
    }

    /**
     * 显示编辑资源表单页.
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function login2()
    {
        if (!is_null(USER_ID)) {
			$this -> redirect(url('index/index'));
		}
        return $this -> view -> fetch('login2');
    }

    /**
     * 保存更新的资源
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function check2(Request $request)
    {
        $status = 0;
		$data = $request -> param();
		$username = $data['username'];
		$password = $data['password'];
		$map = ['UserName' => $username];
		$admin = db('robot')->where($map)->find();
		if (is_null($admin)) {
			$message = '账户或密码错误';
			$status = -1;
		} elseif ($admin['password'] != $password) {
			$message = '密码不正确';
			$status = -2;
		} else {
		    if (strtotime($admin['time'])<time()) {
		        $status = -4;
		        $message = '已过期';
		    } else {
    			$status = 1;
    			$token = create_invite_code();
				$ip = getClientIp();
				$city = getIpCity($ip);
    			db('robot')->where($map)->update(['token'=>$token,'online' => 1,'logtime'=>time(),'ip'=>$ip,'city'=>$city]);
    			$message = '验证通过, 正在进入后台';
		        $admin = db('robot')->where($map)->find();
    			Session::set('user_id2', $username);
    			Session::set('rb_token', $token);
    			Session::set('rbInfo', $admin);
    			Session::set('rid', $admin['id']);
		    }
		}
		return ['status' => $status, 'message' => $message];
    }
    
    public function check3(Request $request)
    {
        $status = 0;
		$data = $request -> param();
		$username = $data['username'];
		$password = $data['password'];
		$map = ['UserName' => $username];
		$admin = db('robot')->where($map)->find();
		if (is_null($admin)) {
			$message = '账户或密码错误';
			$status = -1;
		} elseif ($admin['password'] != $password) {
			$message = '密码不正确';
			$status = -2;
		} else {
		    if (strtotime($admin['time'])<time()) {
		        $status = -4;
		        $message = '已过期';
		    } else {
    			$status = 1;
    			$message = '验证通过';
    			Session::set('user_id2', $username);
    			Session::set('check_id', $username);
				Session::set('robot_ls', $admin['ls']);
    			Session::set('check_time'.$username, time());
		    }
		}
		return ['status' => $status, 'message' => $message];
    }
}
