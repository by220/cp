<?php

namespace app\admin\controller;

use app\admin\common\Base;
use app\admin\model\Admin as AdminModel;
use think\Request;
use think\Cache;

class Users extends Base
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
    public function online()
    {
        //渲染页面
        return $this->view->fetch('list');
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function add(Request $request)
    {
        $data = $request->param();
        $status = 0;
        $message = '失败';
        if ($data['id']) {
            $data['feidan'] = isset($data['feidan']) ? 1 : 0;
            $data['online'] = isset($data['online']) ? 1 : 0;
            if ($data['password']) {
                $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
            } else {
                unset($data['password']);
            }
            $admin = db('admin')->where('id', $data['id'])->find();
            if ($data['up']) {
                db('admin')->where('id', $data['id'])->setInc('score', $data['up']);
            }
            if ($data['down']) {
                if ($admin['score'] < $data['down']) {
                    $message = '该子帐号积分不足以下分！';
                    return ['status' => $status, 'message' => $message];
                } else {
                    db('admin')->where('id', $data['id'])->setDec('score', $data['down']);
                }
            }
            if ($data['feidan'] == 1) {
                $res = db('robot')->where('uid', $admin['UserName'])->select();
                foreach ($res as $value) {
                    db('rbfly')->where('uid', $value['UserName'])->update(['flyers_online' => 0]);
                }
            }
            unset($data['score'], $data['down'], $data['up']);
            db('admin')->update($data);
            $status = 1;
            $message = '成功';
        } else {
            $user = db('admin')->where('UserName', $data['UserName'])->find();
            if ($user) {
                $message = '用户名已存在！';
            } else {
                $arr = explode(',', $data['UserName']);
                // $pid = $data['subP'];
                $level = 0;
                // if ($pid) {
                //     $pAdmin = db('admin')->where('id',$pid)->find();
                //     $level = $pAdmin['level'] + 1;
                //     if ($pAdmin['subxiugai']==0) {
                //         $message = '所选子帐号暂未开通权限！';
                //         return ['status' => $status, 'message' => $message];
                //     }
                // }
                $data['password'] = isset($data['password']) ? password_hash($data['password'], PASSWORD_DEFAULT) : password_hash('123456', PASSWORD_DEFAULT);
                $data['level'] = $level;
                foreach ($arr as $value) {
                    $data['UserName'] = $value;
                    $result = AdminModel::create($data);
                }
                if ($result) {
                    $status = 1;
                    $message = '成功';
                }
            }
        }
        // $sub = db('admin')->where('UserName',$data['UserName'])->find();
        // if ($sub['feidanurl'] && $sub['feidanname'] && $sub['feidanpwd'] && $sub['feidan']=='1') {
        //     $flyers = NEW K28(array(
        //         'host' => $sub['feidanurl']
        //     ));
        //     $login = $flyers->subLogin($sub['UserName'],array(
        //         'username' => $sub['feidanname'],
        //         'password' => $sub['feidanpwd']
        //     ),$sub);
        //     if ($login['bOK'] == '0'){
        //         db('admin')->where('id',$sub['id'])->update(['feidanonline'=>1]);
        //     }
        // }
        return ['status' => $status, 'message' => $message];
    }

    public function GetUserList(Request $request)
    {
        $data = $this->request->param();
        if (session('user_uid') == '1') {
            $res = db('admin')->where('type', 0)->limit($data['limit'])->page($data['page'])->select();
            $count = db('admin')->where('type', 0)->count();
        } else {
            $res = db('admin')->where('UserName', USER_ID)->where('type', 0)->limit($data['limit'])->page($data['page'])->select();
            $count = db('admin')->where('UserName', USER_ID)->where('type', 0)->count();
        }
        foreach ($res as $k => $value) {
            if (isset($value['pid']) && isset($value['feidanid'])) {
                $pid = db('admin')->where('id', $value['pid'])->find();
                $wp = db('rbwp')->where('id', $value['feidanid'])->find();

                $res[$k]['pidName'] = $pid['UserName'];
                $res[$k]['wpName'] = $wp['name'];
            }
            $res[$k]['wpType'] = getWpType($value, 'feidantype');

            if (!$value['feidanname'] || !$value['feidanpwd'] || !$value['feidanid'] || !$value['feidan']) {
                db('admin')->where('id', $value['id'])->update(['feidanonline' => 0]);
            }

            if (strtotime($value['time']) < time()) {
                $res[$k]['status'] = 1;
                $res[$k]['online'] = 0;
                db('admin')->where('id', $value['id'])->update(['online' => 0, 'status' => 1]);
            } else {
                $res[$k]['status'] = 0;
                db('admin')->where('id', $value['id'])->update(['status' => 0]);
            }
            $res[$k]['txtOnline'] = $res[$k]['online'] == 1 ? "<span style='color:blue;'>在线</span>" : "<span>离线</span>";
            $res[$k]['txtStatus'] = $res[$k]['status'] == 0 ? "<span style='color:green;'>正常</span>" : "<span style='color:red;'>已过期</span>";
            $res[$k]['txtFeidan'] = $res[$k]['feidan'] == 0 ? "<span style='color:green;'>开通</span>" : "<span style='color:red;'>关闭</span>";
            $res[$k]['txtFeidanonline'] = $res[$k]['feidanonline'] == 1 ? "<span style='color:green;'>在线</span>" : "<span style='color:red;'>离线</span>";
        }
        return ["code" => 0, "msg" => "", "count" => $count, 'data' => $res];
    }

    public function GetUserList3(Request $request)
    {
        $data = $this->request->param();

        $currentTimestamp = time();
        $threeMinutes = 30;
        $res = db('rbuser') ->where('logtime', '>=', $currentTimestamp - $threeMinutes)->select();
        foreach ($res as $k => $value) {
            if($value['isrobot'] == 1){
                $res[$k]['usertype'] = '托';
            }else{
                $res[$k]['usertype'] = '玩家';
            }
            $sub = db('robot')->where('UserName', $value['uid'])->find();

                // ✅ 判断 robot 是否在线（open 且 time 有效）
                $robotOnline = $sub && $sub['isOpen'] == 1 && strtotime($sub['time']) >= time();

                // ✅ 判断 rbuser 是否超时
                $rbuserTimeout = (time() - $value['logtime']) > (15 * 60);

                // ❌ 如果机器人不在线 或者 用户超时，则剔除
                if (!$robotOnline || $rbuserTimeout) {
                    db('rbuser')->where('id', $value['id'])->update(['online' => 0]);
                    unset($res[$k]);
                    continue;
                }

                // ✅ 整合信息
                $res[$k]['rbuser']     = $value['NickName'];
                $res[$k]['logtime']    = date('Y-m-d H:i:s', $value['logtime']);
                $res[$k]['robot']      = $sub['UserName'];
                $res[$k]['sub']        = $sub['uid'];
                $res[$k]['txtOnline']  = "<span style='color:blue;'>在线</span>";
                $res[$k]['imgName']    = '<img src="' . $value['imgName'] . '" style="width: 35px;height: 35px;">';
                
        }
        $resadmin = db('admin')->where('logtime', '>=', $currentTimestamp - $threeMinutes)->where('online',1)->select();
        foreach ($resadmin as &$admin) {
            $admin['NickName'] = $admin['UserName'];
            $admin['usertype'] = '子账号';
            $admin['logtime']    = date('Y-m-d H:i:s', $admin['logtime']);
            $admin['txtOnline']  = "<span style='color:blue;'>在线</span>";
            $admin['uid'] = '';
        }
        $resrobot = db('robot')->where('logtime', '>=', $currentTimestamp - $threeMinutes)->where('online',1)->select();

        foreach ($resrobot as &$robot) {
            $robot['NickName'] = $robot['UserName'];
            $robot['uid'] = '';
            $robot['usertype'] = '机器人';
            $robot['txtOnline']  = "<span style='color:blue;'>在线</span>";
            $robot['logtime']    = date('Y-m-d H:i:s', $robot['logtime']);
        }
        $res = array_merge($res, $resadmin, $resrobot);
        return [
            "code"  => 0,
            "msg"   => "",
            "count" => count($res),
            "data"  => $res,
        ];
    }

    public function userDel()
    {
        if ($this->request->isAjax()) {
            $data = $this->request->param();
            db('admin')->where('UserName', $data['dlUserName'])->delete();
            $res = db('robot')->where('uid', $data['dlUserName'])->select();
            db('robot')->where('uid', $data['dlUserName'])->delete();
            foreach ($res as $value) {
                db('record')->where('rid', $value['UserName'])->delete();
                db('folder')->where('rid', $value['UserName'])->delete();
                db('rbuser')->where('uid', $value['UserName'])->delete();
                db('rbfly')->where('uid', $value['UserName'])->delete();
            }
            return 'ok';
        }
    }

    public function userClose()
    {
        if ($this->request->isAjax()) {
            $data = $this->request->param();
            $ret = db('admin')->where('UserName', $data['dlUserName'])->update(['online' => 0]);
            return 'ok';
        }
    }

    public function userClose2()
    {
        if ($this->request->isAjax()) {
            $data = $this->request->param();
            if ($data['dlUserName'] == "888") {
                $ret = db('rbuser')->where('online', 1)->update(['online' => 0]);
            } else {
                $ret = db('rbuser')->where('UserName', $data['dlUserName'])->update(['online' => 0]);
            }

            return 'ok';
        }
    }

    // 发送消息接口
    public function sendMessage()
    {
        // 获取请求数据
        $data = input('post.');
        
        // 验证数据
        if(empty($data['userid']) || empty($data['title']) || empty($data['content'])){
            return json(['code'=>0, 'msg'=>'参数不完整']);
        }
        
        // 获取当前登录管理员ID作为发送者
        $adminId = 99999999; // 假设管理员ID保存在session中
        
        // 准备插入数据
        $noticeData = [
            'userid' => $data['userid'],
            'sendid' => $adminId,
            'title' => $data['title'],
            'content' => $data['content'],
            'du' => 0, // 0表示未读
            'time' => date('Y-m-d H:i:s')
        ];
        
        try {
            // 插入数据库
            $result =db('notices')->insert($noticeData);
            
            if($result){
                $redis = Cache::store('redis')->handler();
                $redis->lPush('ws:push:queue', json_encode([
                   // 'broadcast' => true,
                    'uid' => $data['userid'],
                    'data' => [
                        'type' => 5,
                        'id' => $data['userid'],
                        'message' => $data['content'],
                        'time' => date('Y-m-d H:i:s'),
                    ]
                ]));

                return json(['code'=>1, 'msg'=>'消息发送成功']);
            }else{
                return json(['code'=>0, 'msg'=>'消息发送失败']);
            }
        } catch (\Exception $e) {
            return json(['code'=>0, 'msg'=>'系统错误:'.$e->getMessage()]);
        }
    }
}
