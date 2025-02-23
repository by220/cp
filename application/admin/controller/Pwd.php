<?php

namespace app\admin\controller;

use app\admin\common\Base;
use think\Request;

class Pwd extends Base
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
        return $this -> view -> fetch('setting_list');
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function ModifyPwd(Request $request)
    {
        if ($request -> isAjax(true)) {
            $data = $request -> param();
            $result = false;
            if ($data['name']) {
                $arr['UserName']=$data['name'];
                $result = true;
            }
            if ($data['oldPwd']) {
                if ($data['newPwd'] && ($data['rePwd']==$data['newPwd'])) {
                    $arr['password']=md5(md5($data['newPwd']));
                    $result = db('admin')->where('UserName',USER_ID)->where('password',md5(md5($data['oldPwd'])))->find();
                } else {
                    return ['message' => '密码不一致'];
                }
            }
            if ($result) {
                db('admin')->where('UserName',USER_ID)->update($arr);
                $message = 1;
            } else {
                $message = '旧密码错误';
            }
            return ['message' => $message];
        }
    }
}
