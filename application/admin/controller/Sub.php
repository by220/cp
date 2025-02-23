<?php

namespace app\admin\controller;

use app\admin\common\Base;
use think\Request;
use Flyers\K28;

class Sub extends Base
{
    protected function _initialize()
	{
		parent::_initialize();
		$this->isLogin();
// 		$this->isAdmin();
	}
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        return $this -> view -> fetch('list');
    }
    
    public function addEdit(Request $request)
    {
        $data = $request -> param();
        $res = db('rbwp') -> where('status',1) -> select();
        $info = db('admin')->where('id',$data['id']) -> find();
        $this -> view -> assign('wp_list', $res);
        $this -> view -> assign('info', $info);
        return $this -> view -> fetch('form');
    }
    
    public function flyer()
    {
        //渲染页面
        if (session('user_uid')=='1') {
            $cate_list = db('admin') -> where('type',0) -> where('level','<',6) -> select();
        } else {
            $cate_list = db('admin') ->where('UserName',USER_ID) -> where('type',0) -> where('level','<',6) -> select();
        }
        $this -> view -> assign('cate_list', $cate_list);
        return $this -> view -> fetch('flyer');
    }
}
