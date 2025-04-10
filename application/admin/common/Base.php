<?php
namespace app\admin\common;
use app\admin\model\Setting;
use think\Controller;
use think\Request;
use think\Session;

class Base extends Controller
{
	protected $user_id;
    protected $user_info;
	protected function _initialize()
	{
		parent::_initialize();
		define('USER_ID', Session::get('user_id'));
		define('USERINFO', Session::get('user_find'));
		$this->user_id = Session::get('user_id');
        $this->user_info = Session::get('user_info');
	}
	
	protected function isLogin()
	{
		if (empty($this->user_id)) {
            $this->redirect(url('login/index'));
        }
	}
	
	protected function isAdmin()
	{
	    if (empty($this->user_info) || empty($this->user_info['type']) || $this->user_info['type'] != 1) {
            $this->redirect(url('login/index'));
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
		if (!is_null($this->user_id)) {
			$this -> redirect(url('index/index'));
		}
	}
}
