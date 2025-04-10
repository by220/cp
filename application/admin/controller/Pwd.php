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
        return $this->view->fetch('setting_list');
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function ModifyPwd(Request $request)
    {
        if ($request->isAjax(true)) {
            $data = $request->param();
            $result = false;
            $arr = []; // 要更新的数据
            $currentUser = session('user_id');

            if (empty($currentUser)) {
                return ['message' => '请先登录'];
            }

            // 获取当前用户信息
            $admin = db('admin')->where('UserName', $currentUser)->find();
            if (!$admin) {
                return ['message' => '用户不存在'];
            }

            // ✅ 修改用户名（仅管理员 ID = 1 可修改）
            if (isset($data['name']) && !empty($data['name']) && $currentUser == '1') {
                $arr['UserName'] = $data['name'];
                $result = true;
            }

            // ✅ 修改密码逻辑
            if (!empty($data['oldPwd'])) {
                if (!empty($data['newPwd']) && $data['newPwd'] === $data['rePwd']) {
                    if (password_verify($data['oldPwd'], $admin['password'])) {
                        $arr['password'] = password_hash($data['newPwd'], PASSWORD_DEFAULT);
                        $result = true;
                    } else {
                        return ['message' => '旧密码错误'];
                    }
                } else {
                    return ['message' => '新密码与确认密码不一致'];
                }
            }

            if ($result) {
                db('admin')->where('UserName', $currentUser)->update($arr);
                return ['message' => 1]; // 成功
            } else {
                return ['message' => '未做任何更改'];
            }
        }
    }
}
