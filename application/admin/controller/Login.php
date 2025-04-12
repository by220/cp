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
		$this->alreadyLogin();
		return $this->view->fetch('login');
	}

	//验证用户登录
	public function check(Request $request)
	{
		$data = $request->param();
		$username = $data['username'];
		$password = $data['password'];

		// 查询用户信息
		$admin = Admin::where('UserName', $username)->find();

		if (!$admin || !password_verify($password, $admin['password'])) {
			addLog($username, "$username 登录失败：账号或密码错误", '', '');
			return ['status' => -1, 'message' => '账号密码错误！'];
		}

		if (strtotime($admin->time) < time() && $admin->type == 0) {
			return ['status' => -4, 'message' => '已过期'];
		}

		Session::clear();
		session_regenerate_id(true);
		// 登录成功
		Session::set('user_id', $admin->UserName);
		Session::set('user_info', [
			'username' => $admin->UserName,
			'type'     => $admin->type,
			'login_token' => hash('sha256', $admin->UserName . $admin->password . 'SALT'),
		]);
		Session::set('user_uid', $admin->id);

		db('admin')->where('UserName', $username)->update([
			'online' => 1,
			'logtime' => time()
		]);

		addLog($username, "$username 登录成功", '', '');
		return ['status' => 1, 'message' => '验证通过, 正在进入后台'];
	}
	


	//退出登录
	public function  logout(Request $request)
	{
		db('admin')->where('UserName', session('user_id'))->update(['online' => 0]);
		Session::delete('user_id');
		Session::delete('user_info');
		Session::delete('user_uid');
		$this->redirect('login/index');
	}
}
