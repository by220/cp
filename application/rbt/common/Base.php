<?php
namespace app\rbt\common;

use think\Controller;
use think\Session;

class Base extends Controller
{
	protected function _initialize()
	{
		parent::_initialize();
		define('USER_ID', Session::get('user_id2'));
	}
	
	public function isLogin()
	{
		if (is_null(USER_ID)) {
			$this -> redirect(url('login/login2'));
		}
	}
}
