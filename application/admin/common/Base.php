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
	    if (empty($this->user_info)) {
			Session::clear();
			$this->redirect(url('login/index'));
			exit;
		}

		$user = db('admin')->where('UserName', $this->user_info['username'])->find();
		if (!$user) {
			Session::clear();
			$this->redirect(url('login/index'));
			exit;
		}
		$check_token = hash('sha256', $user['UserName'] . $user['password'] . 'SALT');

		if ($check_token !== $this->user_info['login_token']|| $user['type'] !==1) {
			Session::clear();
			$this->redirect(url('login/index'));
			exit;
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
