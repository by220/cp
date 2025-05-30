<?php

namespace app\admin\controller;

use app\admin\common\Base;
use think\Request;

class History extends Base
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
        $game = cache('gameList');
        $this->view->assign('game', $game);
        $this->view->assign('gameType', $game[0]['gameType']);
        return $this->view->fetch('banner_list');
    }
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function record()
    {
        $game = cache('gameList');
        $this->view->assign('game', $game);
        $this->view->assign('gameType', $game[0]['gameType']);
        return $this->view->fetch();
    }
    /**
     * 保存新建的资源
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function GetSpecifyQiResult()
    {
        //判断一下提交类型
        if ($this->request->isPost()) {
            // 1. 获取提交的数据, 包括上次文件
            $data = $this->request->param(true);
            $info = db('history')->where('QiHao', $data['qihao'])->where('Code', '<>', '')->find();
            $game = db('rbgame')->where('gameType', $info['type'])->find();
            if ($info) {
                $str = $game['name'] . '&nbsp;&nbsp;&nbsp;' . $info['QiHao'] . '期&nbsp;&nbsp;&nbsp;' . $info['dtOpen'] . '&nbsp;&nbsp;&nbsp;' . $info['Code'];
                $s = 1;
            } else {
                $str = '';
                $s = 0;
            }
            return json(['status' => $s, 'message' => 'ok', 'data' => $str, 'info' => $info]);
        }
    }

    /**
     * 保存更新的资源
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function GetOpenHistoryList()
    {
        $data = $this->request->param(true);
        $arr = db('history')->order('id desc')->where('Code', '<>', '')->where('type', $data['type'])->limit($data['limit'])->page($data['page'])->select();
        $count = db('history')->order('id desc')->where('Code', '<>', '')->where('type', $data['type'])->count();
        foreach ($arr as $k => $value) {
            $game = db('rbgame')->where('gameType', $value['type'])->find();
            $arr[$k]['txtStatus'] = $arr[$k]['js'] == 1 ? "<span style='color:green;'>已结算</span>" : "<span style='color:red;'>未结算</span>";
            $arr[$k]['gameName'] = $game['name'];
            $arr[$k]['count'] = db('record')->where('qihao', $value['QiHao'])->where('gameType', $value['type'])->where('type', 3)->where('chi', 0)->where('isTuo', 0)->count();
        }
        return ["code" => 0, "msg" => "", "count" => $count, 'data' => $arr];
    }

    public function getJiesuan()
    {
        $data = $this->request->param(true);
        $kj = db('history')->where('id', $data['id'])->order('id desc')->find();
        if ($kj['js'] == 0) {
            $sq = $kj['QiHao'];
            $all = db('record')->where('qihao', $sq)->where('type', 3)->select();
            foreach ($all as $value) {
                jiesuan($value, $kj);
            }
            db('history')->where('id', $data['id'])->update(['js' => 1]);
        }
        return json(['data' => 1]);
    }

    public function getKj()
    {
        $data = $this->request->param(true);
        $sq = $data['QiHao'];
        $kj = db('history')->where('QiHao', $sq)->where('type',$data['type'])->find();
        if($kj){
            if($kj["Code"]=='') return json(['data' => 0,'msg'=>'此期数未获取到开奖号码']);
            $sq = $kj['QiHao'];
            $all = db('record')->where('qihao', $sq)->where('type', 3)->where('status', 0)->where('gameType',$data['type'])->select();
            foreach ($all as $value) {
                jiesuan($value, $kj);
            }
            db('history')->where('id', $kj['id'])->update(['js' => 1]);
            return json(['data' => 1]);
        }else{
            return json(['data' => 0,'msg'=>'未找到对应的开奖期数']);
        }
       
    }

    public function getBq()
    {
        if (session('user_uid')!='1') return;
        $data = $this->request->param(true);
        $sq = $data['QiHao'];
        $kj = db('history')->where('QiHao', $sq)->where('type',$data['type'])->find();
        if($kj){
            if($kj["Code"]!='') return json(['data' => 0,'msg'=>'此期数已经有开奖号码']);
            db('history')->where('id', $kj['id'])->update(['code'=>$data['Code']]);     
        }else{
            $adddata['QiHao'] = $data['QiHao'];
            $adddata['type'] = $data['type'];
            $adddata['Code'] = $data['code'];
            $adddata['dtOpen'] = $data['dtOpen'];
            $adddata['js'] = 0;
            db('history')->insert($adddata);
        }
        $sq = $data['QiHao'];
        $kj = db('history')->where('QiHao', $sq)->where('type',$data['type'])->find();
        $all = db('record')->where('qihao', $sq)->where('type', 3)->where('status', 0)->where('gameType',$data['type'])->select();
        foreach ($all as $value) {
            jiesuan($value, $kj);
        }
        db('history')->where('id', $kj['id'])->update(['js' => 1]);
        return json(['data' => 1]);
    }


    public function GetScoreHis2()
    {
        $data = $this->request->param();
        if ($data['type'] == 'fd') {
            $timer = get_time_arr($data);
            $dayList = $timer['d'];
            $recordList = db('record')->where('flyers_status', $data['tid'])->where('type', 3)->where('chi', 0)->where('isTuo', 0)->where('dtGenerate', 'between', $dayList)->select();
        } else {
            $kj = db('history')->where('id', $data['id'])->order('id desc')->find();
            $recordList = db('record')->where('qihao', $kj['QiHao'])->where('gameType', $kj['type'])->where('type', 3)->where('chi', 0)->where('isTuo', 0)->select();
        }
        list($arr, $allQi, $yijie, $weijie) = resetOrder($recordList);
        return json($arr);
    }

    public function GetScoreHisDetail()
    {
        $data = $this->request->param();
        $timer = get_time_arr($data);
        $dayList = $timer['d'];
        if ($data['type'] == 'fd') {
            $recordList = db('record')->where('name', $data['wxid'])->where('flyers_status', $data['tid'])->where('type', 3)->where('chi', 0)->where('dtGenerate', 'between', $dayList)->where('isTuo', 0)->select();
        } else {
            $kj = db('history')->where('id', $data['id'])->order('id desc')->find();
            $recordList = db('record')->where('name', $data['wxid'])->where('qihao', $kj['QiHao'])->where('gameType', $kj['type'])->where('type', 3)->where('chi', 0)->where('dtGenerate', 'between', $dayList)->order('dtGenerate asc')->select();
        }
        list($arr, $allQi, $yijie, $weijie) = resetOrder($recordList, true);
        return json($arr['list']);
    }

    public function GetWay2Data()
    {
        $data = $this->request->param();
        $res = get_way_data($data);
        return json($res);
    }

    public function GetWay3Data()
    {
        $data = $this->request->param();
        $res = get_way3_data($data);
        return json($res);
    }

    public function GetWay4Data()
    {
        $data = $this->request->param();
        $res = get_way2_data($data);
        return json($res);
    }

    public function GetWay5Data()
    {
        $data = $this->request->param();
        $res = get_way2_data($data);
        return json($res);
    }
}
