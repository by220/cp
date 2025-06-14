<?php

namespace app\rbt\controller;

use think\Request;
use think\Controller;
use app\rbt\common\Base;
use think\Session;
use think\Cache;
use think\Db;
use Flyers\K28;
use think\Response;
use FdPlatforms\FdPlatform4;
use FdPlatforms\FdPlatform5;

class Index extends Base
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
        $this->assign('type', session('rbInfo')['type']);
        $this->assign('robot_ls', session('rbInfo')['ls']);
        return $this->view->fetch('admin_list');
    }

    /**
     * 显示登录二维码.
     *allow_url_fopen
     * @return \think\Response
     */
    public function qrcode()
    {
        return json(['img' => '']);
    }

    public function qrcode4()
    {
        $param = $this->request->param();
        $robot = session('rbInfo');
        quit_wx($robot['cli']);
        Cache::set('wxdata' . $robot['cli'], null);
        return json(['img' => 'ok']);
    }

    /**
     * 保存新建的资源
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function UpdateHeadImage()
    {
        $data = $this->request->param();
        $img = '/static/xz/admin/u__chat_img' . rand(1, 100) . '.jpg';
        userUpdate($data, ['imgName' => $img]);
        return $img;
    }

    public function changeHeadImage()
    {
        $data = $this->request->param();
        // 获取表单上传文件
        $files = request()->file('image');
        $file_path = ROOT_PATH . 'public' . DS . 'uploads';
        !file_exists($file_path) && mkdir($file_path, 0755, true);
        //move后面加个''，代表使用图片原文件名，不用则生成随即文件名可
        $info = $files->validate(['size' => 1155678, 'ext' => 'jpg,png,gif'])->move($file_path, '');
        if (!$info) return $files->getError();
        $img = DS . 'uploads' . DS . $info->getSaveName();
        userUpdate($data, ['imgName' => $img]);
        return $img;
    }

    public function UpdateNickName()
    {
        $data = $this->request->param();
        userUpdate($data, ['NickName' => $data['newNickName']]);
        return 0;
    }

    public function UpdateUserName()
    {
        $data = $this->request->param();
        userUpdate($data, ['UserName' => $data['newNickName']]);
        return 0;
    }

    public function UpdateUserPwd()
    {
        $data = $this->request->param();
        userUpdate($data, ['password' => $data['newPwd']]);
        return 0;
    }

    public function UpdateLoginPwd()
    {
        $data = $this->request->param();
        $code = mt_rand(1000, 9999);
        userUpdate($data, ['logincode' => $code]);
        return ['status' => 0, 'message' => $code];
    }

    public function SetAuto()
    {
        $data = $this->request->param();
        userUpdate($data, ['isauto' => $data['type']]);
        return 0;
    }

    public function setType()
    {
        $data = $this->request->param();
        rbUpdate($data);
        return 0;
    }

    public function setzhui()
    {
        $data = $this->request->param();
        $robot = session('rbInfo');
        if ($robot['zhui'] == 0) {
            return -1;
        } else {
            userUpdate($data, ['zhui' => $data['type']]);
            return 0;
        }
    }

    public function SetManual2()
    {
        $data = $this->request->param();
        userUpdate($data, ['chi' => $data['type']]);
        return 0;
    }

    public function SetBlack()
    {
        $data = $this->request->param();
        userUpdate($data, ['isBlack' => $data['type']]);
        return 0;
    }

    public function SetFeidan()
    {
        $data = $this->request->param();
        userUpdate($data, ['isFeidan' => $data['type']]);
        return 0;
    }

    public function UpdatePeiLv()
    {
        $data = $this->request->param();
        // if ($data['newPeiLv']<95) {
        // return 1;
        // } else {
        rbUpdate([$data['tar'] => $data['newPeiLv']]);
        // }
        return 0;
    }

    public function UpdatePeiLv2()
    {
        $data = $this->request->param();
        // if ($data['newPeiLv']>19) {
        //     return 1;
        // } else {
        rbUpdate(['tePeilv' => $data['newPeiLv']]);
        // }
        return 0;
    }

    public function UpdateFanShui()
    {
        $data = $this->request->param();
        if ($data['FanShui'] > 5) {
            return 1;
        } else {
            userUpdate($data, ['FanShui' => $data['FanShui']]);
        }
        return 0;
    }

    public function UpdateFanShui2()
    {
        $data = $this->request->param();
        if ($data['fanshui'] > 1) {
            return 1;
        } else {
            rbUpdate(['teFanshui' => $data['fanshui']]);
        }
        return 0;
    }

    public function UpdateFengpan()
    {
        $data = $this->request->param();
        rbUpdate(['fengpan' => $data['fanshui']]);
        return 0;
    }

    public function UpdateCancel()
    {
        $data = $this->request->param();
        rbUpdate(['cancel' => $data['fanshui']]);
        return 0;
    }

    public function DelMember()
    {
        $data = $this->request->param();
        $user = db('rbuser')->where('wxid', $data['wxid'])->where('uid', USER_ID)->find();
        db('robot')->where('UserName', $user['uid'])->setInc('score', $user['score']);
        db('rbuser')->where('wxid', $data['wxid'])->where('uid', USER_ID)->delete();
        setCount(USER_ID);
        return 0;
    }

    public function UpdateHideMsg()
    {
        $data = $this->request->param();
        rbUpdate(['hideMsg' => $data['HideMsg']]);
        return 0;
    }

    public function GetUpDownScoreReq(Request $request)
    {
        $res = db('folder')->where('rid', USER_ID)->where('status', 0)->where('isTuo', 0)->select();
        return ['total' => count($res), 'list' => $res];
    }

    public function AcceptUpDownScoreReq(Request $request)
    {
        $data = $request->param();
        if ($data['robot'] == USER_ID) {
            $res = db('folder')->where('id', $data['ReqID'])->where('status', 0)->find();
            $wan = db('rbuser')->where('wxid', $res['wxid'])->where('uid', USER_ID)->find();
            $admin = db('admin')->where('UserName', $res['uid'])->find();
            $open = cache('nowQi' . session('rbInfo')['type']);
            $wan['gameType'] = $res['gameType'];
            if ($res['status'] == 0) {
                if ($res['type'] == 0) {
                    $robot = db('robot')->where('UserName', $res['rid'])->find();
                    if ($robot['score'] < $res['score'] && $res['isTuo'] == 0) {
                        return ['Data' => -2];
                    } else {
                        db('rbuser')->where('wxid', $res['wxid'])->where('uid', USER_ID)->setInc('score', $res['score']);
                        if ($res['isTuo'] == 0) {
                            db('robot')->where('UserName', $res['rid'])->setDec('score', $res['score']);
                        }
                        db('record')->where('oid', $data['ReqID'])->update(['afterScore' => ($wan['score'] + $res['score']), 'time' => date("Y-m-d H:i:s", time())]);
                        addMsg($wan, $admin, '@' . $res['nickName'] . ', 成功上分' . $res['score'] . ', 剩' . sprintf('%.1f', ($wan['score'] + $res['score'])), $open['QiHao']);
                    }
                } else {
                    if ($res['isTuo'] == 0) {
                        db('robot')->where('UserName', $res['rid'])->setInc('score', $res['score']);
                    }
                    db('record')->where('oid', $data['ReqID'])->update(['afterScore' => ($wan['score']), 'time' => date("Y-m-d H:i:s", time())]);
                    addMsg($wan, $admin, '@' . $res['nickName'] . ', 成功下分' . $res['score'], $open['QiHao']);
                }
                db('folder')->where('id', $data['ReqID'])->update(['status' => 1]);
                db('record')->where('oid', $data['ReqID'])->update(['isTy' => 1]);
                return ['Data' => 0];
            } else {
                return ['Data' => 1];
            }
        } else {
            return ['Data' => 1];
        }
    }

    public function DenyUpDownScoreReq(Request $request)
    {
        $data = $request->param();
        if ($data['robot'] == USER_ID) {
            $res = db('folder')->where('id', $data['ReqID'])->find();
            $wan = db('rbuser')->where('wxid', $res['wxid'])->where('uid', USER_ID)->find();
            $admin = db('admin')->where('UserName', $res['uid'])->find();
            $open = cache('nowQi' . session('rbInfo')['type']);
            $wan['gameType'] = $res['gameType'];
            if ($res['status'] == 0) {
                db('folder')->where('id', $data['ReqID'])->update(['status' => 3]);
                db('record')->where('oid', $data['ReqID'])->update(['isTy' => 0]);
                db('record')->where('oid', $data['ReqID'])->update(['afterScore' => ($wan['score'])]);
                addMsg($wan, $admin, '@' . $res['nickName'] . ', 您的' . ($res['type'] == 0 ? '上分' : '下分') . '请求被拒绝！', $open['QiHao']);
                if ($res['type'] == 1) {
                    db('rbuser')->where('wxid', $res['wxid'])->where('uid', USER_ID)->setInc('score', $res['score']);
                }
                return ['Data' => 0];
            } else {
                return ['Data' => 1];
            }
        } else {
            return ['Data' => 1];
        }
    }

    /**
     * 显示指定的资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function ShowDetails()
    {
        $this->assign('type', session('rbInfo')['type']);
        $this->assign('robot_ls', session('robot_ls'));
        return $this->view->fetch('detail');
    }

    public function ShowUnCalculated()
    {
        return $this->view->fetch('calculated');
    }

    public function GetCmdList()
    {
        $data = $this->request->param();
        $expect = $data['qihao'];
        $result = [];
        $totalPu = 0;
        $totalChi = 0;
        $totalTuo = 0;
        $totalPu1 = 0;
        $totalPu2 = 0;
        $totalTuo1 = 0;
        $games = cache('gameList');
        foreach ($games as $val) {
            $arr = cache('nowQi' . $val['gameType']);
            $record = db('record')->where('rid', USER_ID)->where('qihao', $arr['QiHao'])->where('gameType', $val['gameType'])->where('type', 3)->select();
            foreach ($record as $value) {
                if ($value['isTuo'] == 0 && $value['chi'] == 0) {
                    $totalPu++;
                    $totalPu1 += $value['score'];
                }
                if ($value['isTuo'] == 0 && $value['chi'] == 1) {
                    $totalChi++;
                    $totalPu2 += $value['score'];
                }
                if ($value['isTuo'] == 1) {
                    $totalTuo++;
                    $totalTuo1 += $value['score'];
                }
                $value['text'] = getQiuWf($value['gameType'], $value['qiuNum']) . $value['text'];
                $value['gameName'] = $val['name'];
                // array_push($result, $value);
                if ($data['type']==2) {
                    if ($value['isTuo']==0&&$value['chi']==1) {
                        array_push($result,$value);
                    }
                } else {
                    if ($value['isTuo']==$data['type']&&$value['chi']==0) {
                        array_push($result,$value);
                    }
                }
            }
        }
        return json(['qihao' => $expect, 'detail' => $result, 'totalPu' => $totalPu, 'totalTuo' => $totalTuo, 'total' => 12330, 'total1' => $totalPu1, 'total2' => $totalTuo1, 'totalChi' => $totalChi, 'total3' => $totalPu2]);
    }

    public function GetScoreHis()
    {
        $data = $this->request->param();
        $res = get_score_his($data);
        return json($res);
    }

    public function GetScoreHisDetail()
    {
        $data = $this->request->param();
        $res = get_score_his_detail($data);
        return json($res);
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

    public function AllowDel()
    {
        $data = $this->request->param();
        $rb = session('rbInfo');
        $open = db('history')->where('type', $rb['type'])->order('id desc')->find();
        $endTime = $open['dtOpen'];
        $t = time();
        if (((0 < (strtotime($endTime) - $t)) && ((strtotime($endTime) - $t) < $rb['fengpan'])) || cache('feng' . $rb['type'])) {
            return json(['Data' => -2]);
        } else {
            $order = db('record')->where('id', $data['id'])->find();
            $user = db('rbuser')->where('wxid', $order['name'])->where('uid', $order['rid'])->find();
            $admin = db('admin')->where('UserName', $order['uid'])->find();
            $user['gameType'] = $order['gameType'];
            db('rbuser')->where('wxid', $order['name'])->where('uid', $order['rid'])->setInc('score', $order['score']);
            addMsg($user, $admin, '@' . $user['NickName'] . ' "' . $order['text'] . '" 注单取消', $order['qihao']);
            db('record')->where('id', $data['id'])->delete();
            return json(['Data' => 0]);
        }
    }

    public function reFeidan()
    {
        $data = $this->request->param();
        $open = db('history')->order('id desc')->find();
        $endTime = $open['dtOpen'];
        $result = db('robot')->where('UserName', USER_ID)->find();
        $t = time();
        if (((0 < (strtotime($endTime) - $t)) && ((strtotime($endTime) - $t) < $result['fengpan'])) || cache('jie')) {
            return json(['Data' => -2]);
        } else {
            $order = db('record')->where('id', $data['id'])->find();
            if ($order['flyers_status'] == 0 || $order['flyers_status'] == 3) {
                $user = db('rbuser')->where('wxid', $order['name'])->where('uid', $order['rid'])->find();
                $user['gameType'] = $order['gameType'];
                if ($order['gameType'] === 75) {
                    $xiaLists = [['m' => $order['score'], 'cmd' => $order['text'], 'd' => $order['score'], 'xiaId' => $order['id']]];
                    $res = feidan($user, $order['text'], $data['id'], $xiaLists);
                } else {
                    $res = feidan($user, $order['text'], $data['id'], []);
                }
                return json(['Data' => 0, 'res' => $res]);
            } else {
                return json(['Data' => 1]);
            }
        }
    }

    /**
     * 显示编辑资源表单页.
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function GetMembers()
    {
        $data = $this->request->param();
        if ($data['uid']) {
            $map['NickName'] = array('like', array('%' . $data['uid'] . '%'), 'OR');
            $result = db('rbuser')->where('uid', USER_ID)->where('isrobot', $data['type'])->where($map)->order('score desc')->select();
        } else {
            $result = db('rbuser')->where('uid', USER_ID)->where('isrobot', $data['type'])->order('score desc')->select();
        }
        $heji = 0;
        list($count1, $count2) = setCount(USER_ID);
        foreach ($result as $k => $value) {
            $heji += $value['score'];
            $result[$k]['link'] = getUserurl('index?cd', $value['code']);
            $result[$k]['qr'] = session('rbDomain') . DS . 'qr' . DS . $value['code'] . '.png';
            $result[$k]['tuoMinMax'] = $result[$k]['tuoMin'] . '-' . $result[$k]['tuoMax'];
            // $result[$k]['score'] = (floor($result[$k]['score']/10000)>0?floor($result[$k]['score']/10000) . 'w' :''). sprintf('%.2f',($result[$k]['score']-floor($result[$k]['score']/10000)*10000));
        }
        return json(['code' => 1, 'data' => $result, 'count1' => $count1, 'count2' => $count2, 'heji' => sprintf('%.2f', $heji)]);
    }

    public function needhandle()
    {
        $data = $this->request->param();
        $result = session('rbInfo');
        //   if (!$result['token']||($result['token']!==Session::get('rb_token'))||$result['online']==0||((time()-$result['logtime']>30*60)&&$data['tar']==1) || (strtotime($result['time'])<time())) {
        if (!$result['UserName'] || ($result['UserName'] !== Session::get('user_id2')) || $result['online'] == 0 || ((time() - $result['logtime'] > 5 * 60 * 60) && $data['tar'] == 1) || (strtotime($result['time']) < time())) {
            rbUpdate(['online' => 0]);
            return json(['IsNeedLogin' => true]);
        }
        if ($data['tar'] == 0) {
            rbUpdate(['logtime' => time()]);
        }
        $dataimg = [];
        // Cache::set('lalink',session('rbDomain'));
        // session('rbInfo',$result);
        // if ($result['cli']) {
        //     $dataimg = Cache::get('wxdata'.$result['cli']);
        // }
        $open = cache('nowQi' . $result['type']);
        $res = db('folder')->where('rid', USER_ID)->where('status', 0)->where('isTuo', 0)->select();
        $rbfly = db('rbfly')->where('uid', USER_ID)->find();
        session('rbWpinfo', $rbfly);
        $flys = session('rbWpinfo');
        if (isset($rbfly['fly_id'])) {
            $wp = Db::name('rbwp')->where('id', $rbfly['fly_id'])->find();
            $flys['wpname'] = $wp['name'];
        }

        $config = cache('rbConfig');
        $config['yuming'] = explode(",", $config['yuming']);
        $domain = $config ? (isset($config['yuming'][$result['url']]) ? $config['yuming'][$result['url']] : $this->request->domain()) : $this->request->domain();
        session('rbDomain', $domain);
        $result['link'] = getUserurl('login?code', $result['code'] . '&cn=' . $result['UserName']);
        $result['wxlink'] = getUserurl('index?cn', $result['UserName']);
        $expect = $open['QiHao'];
        $resultCmd = [];
        $totalPu = 0;
        $totalChi = 0;
        $totalTuo = 0;
        $totalPu1 = 0;
        $totalPu2 = 0;
        $totalTuo1 = 0;
        $games = cache('gameList');

        foreach ($games as $val) {
            $arr = cache('nowQi' . $val['gameType']);
            $record = db('record')->where('rid', USER_ID)->where('qihao', $arr['QiHao'])->where('gameType', $val['gameType'])->where('type', 3)->select();
            foreach ($record as $value) {
                if ($value['isTuo'] == 0 && $value['chi'] == 0) {
                    $totalPu++;
                    $totalPu1 += $value['score'];
                }
                if ($value['isTuo'] == 0 && $value['chi'] == 1) {
                    $totalChi++;
                    $totalPu2 += $value['score'];
                }
                if ($value['isTuo'] == 1) {
                    $totalTuo++;
                    $totalTuo1 += $value['score'];
                }
                $value['text'] = getQiuWf($value['gameType'], $value['qiuNum']) . $value['text'];
                $value['gameName'] = $val['name'];
               // array_push($resultCmd, $value);
                if ($data['type']==2) {
                    if ($value['isTuo']==0&&$value['chi']==1) {
                        array_push($resultCmd,$value);
                    }
                } else {
                    if ($value['isTuo']==$data['type']&&$value['chi']==0) {
                        array_push($resultCmd,$value);
                    }
                }
            }
        }
        if ($data['uid']) {
            $map['NickName'] = array('like', array('%' . $data['uid'] . '%'), 'OR');
            $users = db('rbuser')->where('uid', USER_ID)->where('isrobot', $data['rtype'])->where($map)->order('score desc')->select();
        } else {
            $users = db('rbuser')->where('uid', USER_ID)->where('isrobot', $data['rtype'])->order('score desc')->select();
        }
        $heji = 0;
        $count1 = session('rbuserCount' . $result['UserName']);
        $count2 = session('rbusertuoCount' . $result['UserName']);
        if (!$count1) {
            list($count1, $count2) = setCount($result['UserName']);
        }
        foreach ($users as $k => $value) {
            $heji += $value['score'];
            // 地址生成
            $users[$k]['link'] = getUserurl('index?cd', $value['code'] . '&cn=' . $value['uid']);
            $users[$k]['qr'] = session('rbDomain') . DS . 'qr' . DS . $value['code'] . '.png';
            $users[$k]['tuoMinMax'] = $users[$k]['tuoMin'] . '-' . $users[$k]['tuoMax'];
            //$users[$k]['score'] = (floor($users[$k]['score']/10000)>0?floor($users[$k]['score']/10000) . 'w' :''). sprintf('%.2f',($users[$k]['score']-floor($users[$k]['score']/10000)*10000));
        }
        return json(['CancelInSecs' => $result['cancel'], 'FanShui' => $result['FanShui'], 'HideMsg' => $result['hideMsg'], 'Hold5TimeSeconds' => $result['fengpan'], 'IsKaiPan' => $result['isOpen'], 'lType' => $result['ltype'], 'IsNeedLogin' => false, 'OverdueTime' => strtotime($result['time']) * 1000, 'PeiLv' => $result['PeiLv'], 'ServerTime' => $result['time'], 'Success' => true, 'score' => sprintf('%.0f', $result['score']), 'users' => [], 'weihu' => 0, 'wxpwd' => '', 'wxuser' => '', 'img' => $dataimg, 'qh' => $open['QiHao'], 'rob' => $result, 'tePeilv' => $result['tePeilv'], 'teFanshui' => $result['teFanshui'], 'list' => $res, 'Data' => $flys, 'iswp' => $flys ? 1 : 0, 'qihao' => $expect, 'detail' => $resultCmd, 'totalPu' => $totalPu, 'totalTuo' => $totalTuo, 'total' => 12330, 'total1' => $totalPu1, 'total2' => $totalTuo1, 'totalChi' => $totalChi, 'total3' => $totalPu2, 'config' => $config, 'data' => $users, 'count1' => $count1, 'count2' => $count2, 'heji' => sprintf('%.2f', $heji)]);
    }

    public function GetUncalculated(Request $request)
    {
        $data = $request->param();
        $res = db('record')->where('rid', USER_ID)->where('isTuo', 0)->where('type', 3)->where('status', 0)->order('id desc')->select();
        return ['status' => 1, 'data' => $res];
    }

    public function UpDownScore()
    {
        $data = $this->request->param();
        if ($data['type'] == 1) {
            $user = session('rbInfo');
            $admin = db('admin')->where('UserName', $user['uid'])->find();
            $isTuo = db('rbuser')->where('wxid', $data['wxid'])->where('uid', USER_ID)->find();
            $isTuo['gameType'] = $isTuo['gid'] ? $isTuo['gid'] : 8;
            if ($user['score'] < $data['count']) {
                $code = 1;
                $msg = '您的账号剩余积分不足以完成本次上分！';
            } elseif ($user['score'] >= $data['count']) {
                if ($isTuo['isrobot'] == 0) {
                    db('robot')->where('UserName', USER_ID)->setDec('score', ($isTuo['isrobot'] == 1 ? 0 : $data['count']));
                }
                db('rbuser')->where('wxid', $data['wxid'])->where('uid', USER_ID)->setInc('score', $data['count']);
                $oid = addJifen($isTuo, $admin, $data['count'], 0, '', 1);
                db('folder')->where('id', $oid)->update(['status' => 1]);
                addMsg3($isTuo, $admin, $data['count'], '@' . $isTuo['NickName'] . ', 上分' . $data['count'] . ',待审批!', $data['qh'], 'shang', $oid, 0);
                db('record')->where('oid', $oid)->update(['isTy' => 1, 'afterScore' => ($isTuo['score'] + $data['count']), 'time' => date("Y-m-d H:i:s", time())]);
                addMsg($isTuo, $admin, '@' . $isTuo['NickName'] . ', 成功上分' . $data['count'] . ', 剩' . sprintf('%.1f', ($isTuo['score'] + $data['count'])), $data['qh']);
                $code = 0;
                $msg = '上分成功！';
            } else {
                $code = 1;
                $msg = '上分失败！';
            }
            if ($isTuo['isrobot'] == 1 && $user['score'] < $data['count']) {
                db('rbuser')->where('wxid', $data['wxid'])->where('uid', USER_ID)->setInc('score', $data['count']);
                $code = 0;
                $msg = '上分成功！';
            }
        } else {
            $rb = session('rbInfo');
            $admin = db('admin')->where('UserName', $rb['uid'])->find();
            $user = db('rbuser')->where('wxid', $data['wxid'])->where('uid', USER_ID)->find();
            $user['gameType'] = $user['gid'] ? $user['gid'] : 8;
            if ($user['score'] < $data['count']) {
                $code = 1;
                $msg = '该玩家剩余积分不足以完成本次下分！';
            } elseif ($user['score'] >= $data['count']) {
                if ($user['isrobot'] == 0) {
                    db('robot')->where('UserName', USER_ID)->setInc('score', $data['count']);
                }
                db('rbuser')->where('wxid', $data['wxid'])->where('uid', USER_ID)->setDec('score', $data['count']);
                $oid = addJifen($user, $admin, $data['count'], 1, '', 1);
                db('folder')->where('id', $oid)->update(['status' => 1]);
                addMsg3($user, $admin, $data['count'], '@' . $user['NickName'] . ', 下分' . $data['count'] . ',待审批!, 剩' . sprintf('%.1f', ($user['score'] - $data['count'])), $data['qh'], 'xia', $oid, 0);
                db('record')->where('oid', $oid)->update(['isTy' => 1, 'afterScore' => ($user['score'] - $data['count']), 'time' => date("Y-m-d H:i:s", time())]);
                addMsg($user, $admin, '@' . $user['NickName'] . ', 成功下分' . $data['count'], $data['qh']);
                $code = 0;
                $msg = '下分成功！';
            } else {
                $code = 1;
                $msg = '下分失败！';
            }
        }
        return json(['bOK' => $code, 'Message' => $msg]);
    }

    public function resetPwd()
    {
        $data = $this->request->param();
        db('rbuser')->where('id', $data['user'])->update(['password' => '123456']);
        return json(['bOK' => 0, 'Message' => '重置成功！密码为123456']);
    }

    public function AddMember()
    {
        $data = $this->request->param();
        if ($data['type'] == '0') {
            $arr = addReal($data['type'], $data['type']);
        } else {
            $arr = user_inf($data['type'], $data['type']);
            $tuoCount = db('rbuser')->where('uid', USER_ID)->where('isrobot', 1)->count();
            $user = session('rbInfo');
            if ($user['tuoNum'] > $tuoCount) {
                $res = db('rbuser')->insert($arr);
            } else {
                return json(['bOK' => 0, 'bMsg' => '托数量已达到最大值! 创建失败！']);
            }
        }
        setCount(USER_ID);
        return json(['bOK' => 1, 'NickName' => $arr['NickName']]);
    }

    public function ModifyPwd(Request $request)
    {
        $data = $request->param();
        $message = '0';
        $result = db('robot')->where('UserName', USER_ID)->where('password', $data['oldPwd'])->find();
        if ($result) {
            $srt = rbUpdate(['password' => $data['newPwd']]);
            if ($srt) {
                $message = '1';
            }
        } else {
            $message = '-1';
        }
        return ['status' => $message, 'message' => $message];
    }

    public function ChangeLimit(Request $request)
    {
        $data = $request->param();
        rbUpdate($data);
        return ['status' => 1];
    }


    /**
     * 保存飞单登录信息
     * @param Request $request
     * @return \think\response\Json
     * @throws \think\Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     * @throws \think\exception\PDOException
     */
    public function flyersSave(Request $request)
    {
        $value = $request->param();
        $user = session('rbInfo');
        if (!$user) {
            return json(['bOK' => 1, 'Message' => '用户不存在', 'Data' => []]);
        }
        $has = db('rbfly')->where('uid', USER_ID)->find();
        $arr = ['fly_code' => $value['search'], 'flyers_username' => $value['un'], 'flyers_password' => $value['pw'], 'flyers_type' => $value['pk'], 'fly_id' => $value['id'], 'fly_fs' => $value['fs'], 'flyers_auto' => $value['at'], 'flyers_withdraw' => $value['wd'], 'flyers_online' => 0, 'flyers_online' => 0, 'money' => 0, 'betting' => 0, 'uid' => USER_ID];
        if ($has) {
            $res = db('rbfly')->where('uid', USER_ID)->update($arr);
        } else {
            $res = db('rbfly')->insert($arr);
        }
        $flyinfo = db('rbwp')->where('id', $value['id'])->find();
        db('robot')->where(['UserName' => USER_ID])->update(['flyers_type' => $flyinfo['code']]);
        $info = db('rbfly')->where('uid', USER_ID)->find();
        session('rbWpinfo', $info);
        return json(['bOK' => 0, 'Message' => '保存成功,请登录', 'Data' => []]);
    }


    /**
     * 盘口登录
     * @param Request $request
     * @return \think\response\Json
     * @throws \think\Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     * @throws \think\exception\PDOException
     */
    public function flyersLogin(Request $request)
    {
        $user = session('rbInfo');
        $admin = db('admin')->where('UserName', $user['uid'])->find();
        if ($admin['feidan'] == 1) {
            return json(['bOK' => 1, 'Message' => '未开放登录权限', 'Data' => []]);
        }
        if (!$user) {
            return json(['bOK' => 1, 'Message' => '用户不存在', 'Data' => []]);
        }


        $fly = Db::name('rbfly')->where('uid', USER_ID)->find();

        if ($fly) {
            $info = Db::name('rbwp')->where('id', $fly['fly_id'])->find();
            switch ($info['code']) {
                case 'ls8899':
                    $flyers = new FdPlatform4(array(
                        'uid'  => $fly['uid'],
                        'host' => $info['websiteUrl']
                    ));
                    break;
                case 'wns':
                    $flyers = new FdPlatform5(array(
                        'uid'  => $fly['uid'],
                        'host' => $info['websiteUrl']
                    ));
                    break;
                default:
                    $flyers = new K28(array(
                        'host' => $info['websiteUrl']
                    ));
            }
        } else {
            return json(['bOK' => 1, 'Message' => "请先设置网盘信息！", 'Data' => []]);
        }
        $logNum = 0;
        $login['bOK'] = '0';
        $login['Message'] = '没有离线账号需要登录';
        $login['Data'] = '失败';
        if ($fly['flyers_username'] && $fly['flyers_password']) {
            $code = $request->param('code');
            $uniqid = $request->param('uniqid');
            $params = [
                'username' => $fly['flyers_username'],
                'password' => $fly['flyers_password']
            ];

            if (!empty($code)) {
                $params['code'] = $code;
                $params['uniqid'] = $uniqid;
            }

            $login = $flyers->login($fly['id'], $params, $user, $info);

            if ($login['bOK'] == '0') {
                $data['flyers_online'] = "1";
                $logNum++;
                db('rbfly')->where('id', $fly['id'])->update($data);
                $rbfly = db('rbfly')->where('id', $fly['id'])->find();
                session('rbWpinfo', $rbfly);
            }
        }
        if ($login['bOK'] == '0') {
            $data['flyers_online'] = "1";
            rbUpdate($data);
            return json(['bOK' => $login['bOK'], 'Message' => $login['Message'], 'Data' => $login]);
        } else {
            if ($logNum > 0) {
                $data['flyers_online'] = "1";
            } else {
                $data['flyers_online'] = "1";
            }
            rbUpdate($data);
            return json(['bOK' => $login['bOK'], 'Message' => $login['Message'], 'Data' => $login['Data']]);
        }
    }

    /**
     * 获取盘口信息
     * @param Request $request
     * @return \think\response\Json
     * @throws \think\Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     * @throws \think\exception\PDOException
     */
    public function flyersInfo(Request $request)
    {
        $user = session('rbInfo');
        if (!$user) {
            return json(['bOK' => 1, 'Message' => '用户不存在', 'Data' => []]);
        }
        $userName = $user['UserName'];
        $flys = db('rbfly')->where('uid', USER_ID)->select();
        $type = false;
        $info = null;
        $resultData = [];
        foreach ($flys as $value) {
            $info = Cache::get("{$userName}_{$value['id']}");
            if ($info) {
                $type = true;
            } else {
                $type = false;
            }
            $resultData[] = [
                'flyers_username' => $value['flyers_username'],
                'flyers_password' => "******",
                'flyers_url' => $value['flyers_url'],
                'flyers_online' => $value['flyers_online'],
                'flyers_m' => $value['money'],
                'flyers_b' => $value['betting'],
                'flyers_auto' => $user['flyers_auto'],
                'flyers_withdraw' => $user['flyers_withdraw'],
                'flyers_type' => $user['flyers_type'],
                'pkData' => $info
            ];
        }
        $arr = array(
            'flyers_username' => $user['flyers_username'],
            'flyers_password' => "******",
            'flyers_url' => $user['flyers_url'],
            'flyers_auto' => $user['flyers_auto'],
            'flyers_withdraw' => $user['flyers_withdraw'],
            'flyers_type' => $user['flyers_type']
        );
        if ($type) {
            return json(['bOK' => 0, 'Message' => "success", 'Data' => $resultData, 'arr' => $arr]);
        } else {
            return json(['bOK' => 1, 'Message' => "网盘掉线，等待系统重新登录", 'Data' => $resultData, 'arr' => $arr]);
        }
    }

    /**
     * 获取盘口列表
     * @param Request $request
     * @return \think\response\Json
     * @throws \think\Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     * @throws \think\exception\PDOException
     */
    public function flyersList(Request $request)
    {
        $flys = session('rbWpinfo');
        return json(['bOK' => 0, 'Message' => "success", 'Data' => $flys, 'arr' => $flys ? 1 : 0]);
    }

    /**
     * 飞单自动上报
     * @param Request $request
     * @return \think\response\Json
     * @throws \think\Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     * @throws \think\exception\PDOException
     */
    public function flyersAuto(Request $request)
    {
        $data = $request->only('flyers_auto');
        return $this->changewp($data);
    }

    public function flyersDraw(Request $request)
    {
        $data = $request->only('flyers_withdraw');
        return $this->changewp($data);
    }

    protected function changewp($data)
    {
        $user = session('rbInfo');
        if (!$user) {
            return json(['bOK' => 1, 'Message' => '用户不存在', 'Data' => []]);
        }
        if (flyUpdate($data)) {
            rbUpdate($data);
            $info = db('rbfly')->where('uid', USER_ID)->find();
            session('rbWpinfo', $info);
            return json(['bOK' => 0, 'Message' => '保存成功', 'Data' => []]);
        } else {
            return json(['bOK' => 1, 'Message' => '保存失败', 'Data' => []]);
        }
    }

    public function tuoMinMax(Request $request)
    {
        $data = $request->param();
        $user = db('rbuser')->where('wxid', $data['uid'])->find();
        if (!$user) {
            return json(['bOK' => 1, 'Message' => '用户不存在', 'Data' => []]);
        }
        $arr = explode('-', $data['num']);
        if (db('rbuser')->where('wxid', $data['uid'])->update(['tuoMin' => $arr[0], 'tuoMax' => $arr[1]])) {
            return json(['bOK' => 0, 'Message' => '保存成功', 'Data' => []]);
        } else {
            return json(['bOK' => 1, 'Message' => '保存失败', 'Data' => []]);
        }
    }

    /**
     * 生成玩家链接
     * @param Request $request
     * @return \think\response\Json
     * @throws \think\Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     * @throws \think\exception\PDOException
     */
    //地址生成刷新
    public function getUserLink(Request $request)
    {
        $data = $request->only('uid');
        $user = db('rbuser')->where('id', $data['uid'])->find();
        if (!$user) {
            return json(['bOK' => 1, 'Message' => '玩家不存在', 'Data' => []]);
        }
        $code = rand_str(32);
        if (db('rbuser')->where('id', $data['uid'])->update(['code' => $code, 'codeTime' => time()])) {
            share($data['uid'], $code);
            $qr = session('rbDomain') . DS . 'qr' . DS . $code . '.png';
            return json(['bOK' => 0, 'Message' => '获取成功,请用新链接登录', 'Data' => getUserurl('index?cd', $code), 'qr' => $qr]);
        } else {
            return json(['bOK' => 1, 'Message' => '获取失败', 'Data' => []]);
        }
    }

    public function UpdatePanStatus()
    {
        $data = $this->request->param();
        rbUpdate(['isOpen' => $data['st']]);
        return 0;
    }

    public function getwplist()
    {
        $res = db('rbwp')->where('status', 1)->select();
        return $res;
    }

    public function getImgcode()
    {
        $fly = Db::name('rbfly')->where('uid', USER_ID)->find();
        if ($fly) {
            $info = Db::name('rbwp')->where('id', $fly['fly_id'])->find();
            switch ($info['code']) {
                case 'ls8899':
                    $flyers = new FdPlatform4(array(
                        'uid'  => $fly['uid'],
                        'host' => $info['websiteUrl']
                    ));
                    break;
                case 'wns':
                    $fly['fly_id'] = $fly['id'];
                    $flyers = new FdPlatform5(array(
                        'uid'  => $fly['uid'],
                        'host' => $info['websiteUrl']
                    ));
                    break;
                default:
                    $flyers = new K28(array(
                        'host' => $info['websiteUrl']
                    ));
            }
            $req = $flyers->getCaptchaImage($fly['fly_id']);
            return json(['bOK' => 0, 'Message' => '获取成功', 'Data' => $req['Data']]);
        }
        return json(['bOK' => 1, 'Message' => '获取失败']);
    }

    public function Getalltongji()
    {
        $data = $this->request->param();
        $user =  Db::name('rbuser')->where('id',$data['uid'])->find();
        $rb = Db::name('robot')->where('UserName',$user['uid'])->find();
        list($type, $liu, $liu2, $ying, $kui, $allQi, $weijie, $yijie, $txt) = get_Yingkui($user, $rb,1);
        $userdata = [];
        $datas['day'] = getTimeList();
        $datas['timeType'] = 1;
        $res = get_score_his($datas);

        $lius = '@v'. $user['id'] .'(' . $user['NickName'] . ') ';

        if ($rb['ls'] == 1) {
            $res['totalLs'] =  $res['totalYouXiaoLiuShui'];
            $lius = $lius.'' . ($type == 75 ? '' : '') . ',流水:' . sprintf('%.2f', $liu).',总盈利:'. $ying. ',盈亏:' . sprintf('%.2f', ($ying - $kui)) . ',期数:' . count($allQi);
        } else {
            $res['totalLs'] = $res['totalLiuShui'];
            if ($type == 75) {
               $lius = $lius.',流水:' . sprintf('%.2f', $liu) .',总盈利:'. $ying. ',盈亏:' . sprintf('%.2f', ($ying - $kui)) . ',下注期数:' . count($allQi);
            } else {
                //  $liu 单边，$liu2 双边
                $lius = $lius.',流水:' . sprintf('%.2f', $liu2) .',总盈利:'. $ying. ',盈亏:' . sprintf('%.2f', ($ying - $kui)) . ',下注期数:' . count($allQi);
            }
        }
        $lius = $lius.',积分:'.$user['score'];
        $userdata['user'] = $lius;
        $jf = Db::name('rbuser')
        ->where(['uid' => USER_ID, 'isrobot' => 0])
        ->sum('score');
        $alldata = '真流水: '.$res['totalLs'].', 盈利：'.$res['totalYing'].',盈亏：'.$res['totalYingKui'].', 积分：'.$jf;
        $userdata['zong'] = $alldata;
        return json(['bOK' => 0, 'Message' => '获取成功', 'Data' => $userdata]);
    }
}
