<?php

namespace app\admin\controller;

use app\admin\common\Base;
use think\Request;

class Uncul extends Base
{
    protected function _initialize()
	{
		parent::_initialize();
		$this->isLogin();
	}
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        //渲染页面
        return $this -> view -> fetch('article_list');
    }
    
    public function del()
    {
        if ($this -> request -> isAjax()) {
            $data = $this -> request -> param();
            db('record')->where('id',$data['id'])->delete();
            return 'ok';
        }
    }
}
