<?php

namespace app\admin\controller;

use app\admin\common\Base;
use think\Request;
use think\Session;

class Index extends Base
{
    protected function _initialize()
    {
        parent::_initialize();
        $this->isLogin();
    }

    public function index()
    {
        $game = cache('gameList');
        $config = cache('rbConfig');
        if (!$game) {
            $game = db('rbgame')->where('status', 1)->order('sort')->select();
            cache('gameList', $game);
        }
        if (!$config) {
            $domain = $this->request->domain();
            db('admin')->where('UserName', USER_ID)->update(['yuming' => $domain]);
            $arr = db('admin')->where('UserName', USER_ID)->field('password', true)->find();
            cache('rbConfig', $arr);
        }
        $this->view->assign('game', $game);
        $this->view->assign('gameType', $game[0]['gameType']);
        return $this->view->fetch();
    }

    public function wplist()
    {
        $this->isAdmin();
        return $this->view->fetch('list');
    }

    public function addEdit(Request $request)
    {
        $this->isAdmin();
        $data = $request->param();
        $info = db('rbwp')->where('id', $data['id'])->find();
        $this->view->assign('info', $info);
        return $this->view->fetch('form');
    }

    public function GetWpList(Request $request)
    {
        $this->isAdmin();
        $res = db('rbwp')->select();
        foreach ($res as $k => $value) {
            $res[$k]['txtStatus'] = $res[$k]['status'] == 1 ? "<span style='color:green;'>正常</span>" : "<span style='color:red;'>关闭</span>";
        }
        return ["code" => 0, "msg" => "", "count" => count($res), 'data' => $res];
    }

    public function Setwp()
    {
        $this->isAdmin();
        $data = $this->request->param();
        if ($data['id']) {
            if (isset($data['status'])) {
                $data['status'] = (int)$data['status'];
            }
            db('rbwp')->update($data);
            $status = 1;
            $message = '成功';
        } else {
            $rb = db('rbwp')->where(['name' => $data['name'], 'code' => $data['code'], 'websiteUrl' => $data['websiteUrl']])->find();
            if ($rb) {
                return ['status' => 0, 'message' => "网盘已存在"];
            }
            $data['updateTime'] = date('Y-m-d H:i:s');
            $data['status'] = 1;
            db('rbwp')->insert($data);
        }
        return ['status' => 1, 'message' => "成功"];
    }

    public function wpDel()
    {
        if ($this->request->isAjax()) {
            $data = $this->request->param();
            db('rbwp')->where('id', $data['id'])->delete();
            return ['status' => 1];
        }
    }

    public function GetOpenHis()
    {
        $data = $this->request->param();
        $open = db('history')->where('Code', '<>', '')->where('type', $data['type'])->order('id desc')->limit(48)->select();
        // for ($a=0; $a<10;$a++) {
        // array_push($open,['Code'=>'']);
        // }
        $game = [];
        $gameList = cache('gameList');
        if (!$gameList) {
            $game = db('rbgame')->where('status', 1)->where('gameType', '=', $data['type'])->order('sort')->find();
        } else {
            foreach ($gameList as $item) {
                if ($item["gameType"] == $data['type']) {
                    $game = $item;
                    break;
                }
            }
        }
        $jsType = [];
        if (!empty($game)) {
            $jsType = explode(',', $game["jsType2"]);
        }

        foreach ($open as &$item) {
            $codeArr = explode(',', $item['Code']);
            $total = 0;
            $fan = "";
            foreach ($jsType as $key) {
                if ($data['type'] == "28") {
                    $total .= $codeArr[intval($key) - 1];
                } else {
                    $total += intval($codeArr[intval($key) - 1]);
                }
            }
            $total = intval($total);
            $item["total"] = $total;
            $item["fan"] = $total % 4 == 0 ? 4 : $total % 4;
            $item["ds"] = $total % 2 == 0 ? "双" : "单";
            $item["dx"] = $total >= 10 ? '大' : '小';
        }

        $open[0]['codelist'] = explode(',', $open[0]['Code']);
        return ['message' => $open, "game" => $jsType];
    }

    public function getOnlie()
    {
        $data = $this->request->param();
        $online = Session::has('user_online') ? Session::get('user_online') : null;
        if ($online != 1) {
            $ret = db('admin')->where('UserName', USER_ID)->find();
            if ($ret['online'] == 0 || ((time() - $ret['logtime'] > 60 * 5) && $data['tar'] == 1)) {
                return ['status' => 0];
            }
            if ($data['tar'] == 0) {
                db('admin')->where('UserName', USER_ID)->update(['logtime' => time()]);
            }
        }
        $open3 = db('history')->where('type', 8)->order('id desc')->find();
        $open5 = db('history')->where('type', 5)->order('id desc')->find();
        return ['status' => 1, 'data1' => $open3, 'data2' => $open5];
    }

    public function cleardata(Request $request)
    {
        $this->isAdmin();
        $data = $request->param();
        $res = 0;
        $res += db('record')->where('dtGenerate', '<', $data['time'])->delete();
        $res += db('folder')->where('time', '<', $data['time'])->delete();
        $res += db('history')->where('dtOpen', '<', $data['time'])->delete();
        $res += db('admin_log')->where('loginTime', '<', $data['time'])->delete();
        return ['status' => 1, 'data' => $res];
    }
}
