<?php

namespace app\admin\controller;

use app\admin\common\Base;
use app\admin\model\Admin as AdminModel;
use think\Request;

class Rb extends Base
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
        return $this -> view -> fetch('list');
    }
    
    public function user()
    {
        return $this -> view -> fetch();
    }
    
    public function addEdit(Request $request)
    {
        $data = $request -> param();
        if (session('user_uid')=='1') {
            $cate_list = db('admin') -> where('type',0)->where('status',0) -> where('level','<',6) -> select();
        } else {
            $cate_list = db('admin') ->where('UserName',USER_ID) -> where('type',0)->where('status',0) -> where('level','<',6) -> select();
        }
        $info = db('robot')->where('id',$data['id']) -> find();
        if ($info) {
            $info['gameArr'] = explode(',',$info['game']);
        }
        $this -> view -> assign('cate_list', $cate_list);
        $this -> view -> assign('game', cache('gameList'));
        $this -> view -> assign('info', $info);
        return $this -> view -> fetch('form');
    }
    
    public function addRobot(Request $request)
    {
        $this->isAdmin();
        $data = $request -> param();
        $status = 0;
        $message = '失败';
        $game = cache('gameList');
        if ($data['id']) {
            $arr = [];
            foreach ($game as $val) {
                if (isset($data['game'.$val['gameType']])) {
                    array_push($arr,$val['gameType']);
                    unset($data['game'.$val['gameType']]);
                }
            }
            $data['game'] = implode(',',$arr);
            $data['zhui'] = isset($data['zhui'])?1:0;
            $data['xiugai'] = isset($data['xiugai'])?1:0;
            $rb = db('robot')->where('id',$data['id'])->find();
            $user = db('admin')->where('UserName',$rb['uid'])->find();
            if ($data['up']) {
                if ($user['score'] < $data['up']) {
                    $message = '子帐号积分不够给机器人上分！';
                    return ['status' => $status, 'message' => $message];
                } else {
                    $data['rb'] = $rb['UserName'];
                    rbUpdown($data,$rb,true);
                }
            }
            if ($data['down']) {
                if ($rb['score'] < $data['down']) {
                    $message = '该机器人积分不足以下分！';
                    return ['status' => $status, 'message' => $message];
                } else {
                    $data['rb'] = $rb['UserName'];
                    rbUpdown($data,$rb,false);
                }
            }
            if (!$data['password']) {
                unset($data['password']);
            }
            unset($data['score'],$data['down'],$data['up'],$data['rb']);
            db('robot')->update($data);
            $status = 1;
            $message = '成功';
        } else {
            $sub = db('admin')->where('UserName',$data['uid'])->find();
            if ($sub['rbxiugai']==0) {
                $message = '所选子帐号暂未开通权限！';
                return ['status' => $status, 'message' => $message];
            }
            $arr = explode(',',$data['UserName']);
            foreach ($arr as $value) {
                $user = db('robot')->where('UserName',$value)->find();
                if ($user) {
                    $message = '失败，' . $value . '已存在';
                    break;
                } else {
                    $arr = [];
                    foreach ($game as $val) {
                        if (isset($data['game'.$val['gameType']])) {
                            array_push($arr,$val['gameType']);
                            unset($data['game'.$val['gameType']]);
                        }
                    }
                    $data['password'] = isset($data['password'])?$data['password']:'123456';
                    $data['UserName'] = $value;
                    $data['game'] = implode(',',$arr);
                    $data['addTime'] = date("Y-m-d", time());
                    $data['code'] = create_invite_code(8);
                    $result = db('robot')->insert($data);
                    db('admin')->where('UserName',$sub['UserName'])->setDec('score',$data['score']);
                    $status = 1;
                    $message = '成功';
                }
            }
        }
        return ['status' => $status, 'message' => $message];
    }

    /**
     * 保存更新的资源
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function GetUserList(Request $request)
    {
        $data = $this -> request -> param();
        $user = db('robot')->where('UserName','cs111')->find();
        if (session('user_uid')=='1') {
            $res = db('robot')->limit($data['limit'])->page($data['page']) -> select();
            $count = db('robot')->count();
        } else {
            $res = db('robot')->where('uid',USER_ID)->limit($data['limit'])->page($data['page']) -> select();
            $count = db('robot')->where('uid',USER_ID)->count();
        }
        $count = count($res);
        foreach ($res as $k=>$value) {
            if (strtotime($value['time'])<time()) {
                $res[$k]['status'] = 1;
                $res[$k]['isOpen'] = 0;
                $res[$k]['online'] = 0;
                rbUpdate(['isOpen'=>0,'status'=>1,'online'=>0],$value['UserName']);
            } else {
                $res[$k]['status'] = 0;
                 rbUpdate(['status'=>0]);
            }
            if (time()-$value['logtime']>30) {
                $res[$k]['online'] = 0;
                rbUpdate(['online'=>0],$value['UserName']);
            }
            $fly = db('rbfly')->where('uid',$value['UserName'])->find();
            if($fly){
                $res[$k]['fly'] = $fly['flyers_online'] == 1 ? "<span style='color:blue;'>在线</span>" : "<span>离线</span>";
                $res[$k]['flyName'] = $fly['flyers_username'];
                $res[$k]['flyPwd'] = $fly['flyers_password'];
            }
            $res[$k]['txtOnline'] = $res[$k]['online'] == 1 ? "<span style='color:blue;'>在线</span>" : "<span>离线</span>";
            $res[$k]['txtStatus'] = $res[$k]['status'] == 0 ? "<span style='color:green;'>正常</span>" : "<span style='color:red;'>过期</span>";
            $res[$k]['txtZhui'] = $res[$k]['zhui'] == 1 ? "<span style='color:green;'>开通</span>" : "<span style='color:red;'>关闭</span>";
            $res[$k]['txtXiugai'] = $res[$k]['xiugai'] == 1 ? "<span style='color:green;'>开通</span>" : "<span style='color:red;'>关闭</span>";
            $res[$k]['txtOpen'] = $res[$k]['isOpen'] == 1 ? "<span style='color:green;'>开盘</span>" : "<span style='color:red;'>闭盘</span>";
        }
        return ["code"=>0,"msg"=>"","count"=>$count,'data'=>$res];
    }

    public function GetRbUserList(Request $request)
    {
        $data = $this -> request -> param();
        $res = db('rbuser') -> where('uid',$data['id']) -> where('isrobot',0) ->limit($data['limit'])->page($data['page']) -> select();
        $count = db('rbuser') -> where('uid',$data['id']) -> where('isrobot',0)->count();
        if ($res) {
            foreach ($res as $k=>$value) {
                $sub = db('robot') -> where('UserName',$value['uid']) -> find();
                $res[$k]['rbuser'] = $value['NickName'];
                $res[$k]['logtime'] = date('Y-m-d H:i:s', $value['logtime']);
                $res[$k]['robot'] = $sub['UserName'];
                $res[$k]['sub'] = $sub['uid'];
                $res[$k]['txtOnline'] = $res[$k]['online'] == 1 ? "<span style='color:blue;'>在线</span>" : "<span>离线</span>";
                $res[$k]['imgName'] = '<img src="'.$res[$k]['imgName'].'" style="width: 35px;height: 35px;">';
            }
        }
        return ["code"=>0,"msg"=>"","count"=>$count,'data'=>$res];
    }
    
    public function UpdatePanStatus()
    {
        $data = $this -> request -> param();
        if ($data['type'] == 'open') {
            rbUpdate(['isOpen'=>$data['st']],$data['dlUserName']);
        } elseif ($data['type'] == 'del') {
            db('robot')->where('UserName',$data['dlUserName'])->delete();
            db('record')->where('rid',$data['dlUserName'])->delete();
            db('folder')->where('rid',$data['dlUserName'])->delete();
            db('rbuser')->where('uid',$data['dlUserName'])->delete();
            db('rbfly')->where('uid',$data['dlUserName'])->delete();
        } elseif ($data['type'] == 'close') {
            rbUpdate(['online' => 0],$data['dlUserName']);
        }
        return 0;
    }
}
