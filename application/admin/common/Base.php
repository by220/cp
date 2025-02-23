<?php
namespace app\admin\common;
use app\admin\model\Setting;
use think\Controller;
use think\Request;
use think\Session;

class Base extends Controller
{
	protected function _initialize()
	{
		parent::_initialize();
		define('USER_ID', Session::get('user_id'));
		define('USERINFO', Session::get('user_find'));
	}
	
	protected function isLogin()
	{
		if (is_null(USER_ID)) {
			$this -> redirect(url('login/index'));
		}
	}
	
	protected function isAdmin()
	{
	    $aid = session('user_uid');
		if ($aid != 1) {
			$this -> redirect(url('login/index'));
		}
	}
	
	protected function userLogin()
	{
		if (is_null(USERINFO)) {
            exit('无效地址！');
		}
	}
	
	protected function alreadyLogin()
	{
		if (!is_null(USER_ID)) {
			$this -> redirect(url('index/index'));
		}
	}
}
