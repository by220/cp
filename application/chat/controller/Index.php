<?php

namespace app\chat\controller;

use app\admin\common\Base;
use think\Controller;
use think\Request;
use think\Session;
use Flyers\K28;

class Index extends Base
{
    public function index(Request $request)
    {
        $w = $request->param('cd');
        $gid = $request->param('gid');
        //$code = session('user_code');
        $code = $w;
        if (empty($code)) {
            $this->redirect('/html/');
            //$this -> redirect('ShowPortal');
        }
        $hasUser = db('rbuser')->where('code', $w)->find();
        session('cd', $hasUser['code']);
        session('user_code', $w);
        if ($hasUser && $w == $code) {
            $token = create_invite_code();
            $rb = db('robot')->where('UserName', $hasUser['uid'])->find();
            if (!$rb['game']) {
                exit('没有开放彩种！');
            }
            $game = db('rbgame')->where('status', 1)->where('gameType', 'in', $rb['game'])->order('sort')->select();
            $name = $game[0]['name'];
            if (!$gid) {
                if (!$hasUser['gid']) {
                    $gid = $game[0]['gameType'];
                } else {
                    $gid = $hasUser['gid'];
                }
            }
            $thisgame = $game[0];
            $gameArr = explode(',', $rb['game']);
            $playMethod = [];
            foreach ($game as $i => $value) {
                if ($value['gameType'] == $gid) {
                    $name = $value['name'];
                    $thisgame = $value;
                    $gid = $value['gameType'];
                }
                $gameType = $value['gameType'];
                $jsType = $value['jsType'];
                // 处理 jsType 字段：
                if ($jsType === "") {
                    $playMethod[$gameType] = []; // 为空字符串时，存储为空数组
                } else {
                    // 拆分逗号分隔的字符串并转换为数字数组
                    $playMethod[$gameType] = array_map('intval', explode(',', $jsType));
                }
                if (!in_array($value['gameType'], $gameArr)) {
                    unset($game[$i]);
                }
            }
            db('rbuser')->where('id', $hasUser['id'])->update(['gid' => $gid, 'token' => $token]);
            cache('usercount' . $hasUser['id'], 0);
            $check = checkUser($w, 0, true);
            if ($check['code']) {
                $kj = getDaoji();
                $rb = $check['rb'];
                $this->view->assign('rbgame', $game);
                $this->view->assign('gname', $name);
                $this->view->assign('game', $thisgame);
                $this->view->assign('playmethod', json_encode($playMethod));
                $this->view->assign('kj', $kj);
                $this->view->assign('rbuser', $check['user']);
                $this->view->assign('rb', $rb);
                $this->view->assign('config', cache('rbConfig'));
                $this->view->assign('gtime', getTimeList());
                return $this->view->fetch();
            } else {
                exit($check['msg']);
            }
        } else {
            // exit('无效地址！');
            $this->redirect('/html/');
            //$this -> redirect('ShowPortal');
        }
    }

    public function indexnew(Request $request)
    {
        $w = $request->param('cd');
        $gid = $request->param('gid');
        $code = session('user_code');
        $hasUser = db('rbuser')->where('code', $w)->find();
        session('cd', $hasUser['code']);
        if (!$code) {
            $this->redirect('ShowPortal');
        }
        if ($hasUser && $w == $code) {
            $token = create_invite_code();
            $rb = db('robot')->where('UserName', $hasUser['uid'])->find();
            if (!$rb['game']) {
                exit('没有开放彩种！');
            }
            $game = db('rbgame')->where('status', 1)->where('gameType', 'in', $rb['game'])->order('sort')->select();
            $name = $game[0]['name'];
            if (!$gid) {
                if (!$hasUser['gid']) {
                    $gid = $game[0]['gameType'];
                } else {
                    $gid = $hasUser['gid'];
                }
            }
            $thisgame = $game[0];
            $gameArr = explode(',', $rb['game']);
            foreach ($game as $i => $value) {
                if ($value['gameType'] == $gid) {
                    $name = $value['name'];
                    $thisgame = $value;
                    $gid = $value['gameType'];
                }
                if (!in_array($value['gameType'], $gameArr)) {
                    unset($game[$i]);
                }
            }
            db('rbuser')->where('id', $hasUser['id'])->update(['gid' => $gid, 'token' => $token]);
            cache('usercount' . $hasUser['id'], 0);
            $check = checkUser($w, 0, true);
            if ($check['code']) {
                $kj = getDaoji();
                $rb = $check['rb'];
                $this->view->assign('rbgame', $game);
                $this->view->assign('gname', $name);
                $this->view->assign('game', $thisgame);
                $this->view->assign('rbuser', $check['user']);
                $this->view->assign('rb', $rb);
                $this->view->assign('config', cache('rbConfig'));
                return $this->view->fetch();
            } else {
                exit($check['msg']);
            }
        } else {
            // exit('无效地址！');
            $this->redirect('ShowPortal');
        }
    }

    public function web(Request $request)
    {
        return $this->view->fetch();
    }

    public function ShowPortal(Request $request)
    {
        return $this->view->fetch('captch');
    }

    public function home(Request $request)
    {
        $w = session('user_code');
        if ($w) {
            $hasUser = db('rbuser')->where('code', $w)->find();
            if ($hasUser) {
                $token = create_invite_code();
                db('rbuser')->where('code', $w)->update(['token' => $token]);
            }
            $check = checkUser($w, 0, true);
            if ($check['code']) {
                $kj = getDaoji();
                $this->view->assign('rbuser', $hasUser);
                $this->view->assign('rb', $check['rb']);
                $this->view->assign('kj', $kj['kj']);
                $this->view->assign('config', cache('rbConfig'));
                return $this->view->fetch('index');
            } else {
                exit($check['msg']);
            }
        } else {
            exit('无效地址！');
        }
    }

    public function send(Request $request)
    {
        $this->userLogin();
        $data = $request->param();
        $usre = session('robot_find');
        $admin = db('admin')->where('UserName', $usre['uid'])->find();
        $wan = db('rbuser')->where('wxid', $data['wxid'])->find();
        $open = cache('nowQi' . $wan['gid']);
        $istId = 0;
        if ($wan['isBlack'] == 0 && $wan && $admin && $usre && $data['qh'] == $open['QiHao']) {
            $wan['fans'] = $usre['FanShui'];
            $wan['peil'] = $usre['PeiLv'];
            $wan['tepeil'] = $usre['tePeilv'];
            $wan['tefans'] = $usre['teFanshui'];
            $wan['gameType'] = $wan['gid'];
            $str = $data['cmd'];
            $huan = explode("\n", $str);
            $kong = explode(",", $str);
            if (($wan['gameType'] == 17 || $wan['gameType'] == 5) && strstr($str, '/') && count($huan) == 1 && count($kong) == 1) {
                $wfArr = explode('/', $str);
                unset($wfArr[0]);
                $str = implode('/', $wfArr);
            }
            $wan['qiuNum'] = $data['qiuIndex'];
            $wan['iskj'] = true;
            $frist = mb_substr($str, 0, 1, "UTF-8");
            $last = mb_substr($str, 1, strlen($str), "UTF-8");
            $arr = explode('/', $str);
            $daxiao = ['单', '双', '13', '24', '42', '31', '大', '小'];
            $teArr = ['01特', '02特', '03特', '04特', '05特', '06特', '07特', '08特', '09特', '10特', '11特', '12特', '13特', '14特', '15特', '16特', '17特', '18特', '19特', '20特', '1特', '2特', '3特', '4特', '5特', '6特', '7特', '8特', '9特'];
            $chetui = ['123', '132', '231', '213', '321', '312', '124', '142', '421', '412', '214', '241', '234', '243', '324', '342', '432', '423', '134', '143', '341', '314', '413', '431'];
            $jiao = ['12角', '23角', '34角', '14角', '13角', '24角', '12', '23', '34', '14', '21角', '32角', '43角', '41角', '21', '32', '43', '41'];
            $wanfaArr = ['1番', '2番', '3番', '4番', '1正', '2正', '3正', '4正', '1堂', '2堂', '3堂', '4堂', '1无3', '2无4', '3无1', '4无2', '1车', '2车', '3车', '4车', '1推', '2推', '3推', '4推', '12无3', '21无3', '12无4', '21无4', '13无2', '31无2', '13无4', '31无4', '14无2', '41无2', '14无3', '41无3', '23无1', '32无1', '23无4', '32无4', '24无1', '42无1', '24无3', '42无3', '34无1', '43无1', '34无2', '43无2', '1通23', '1通24', '1通34', '1通32', '1通42', '1通43', '2通13', '2通14', '2通34', '2通31', '2通41', '2通43', '3通12', '3通14', '3通24', '3通12', '3通41', '3通42', '4通12', '4通13', '4通23', '4通21', '4通31', '4通32', '1无2', '1无4', '2无1', '2无3', '3无2', '3无4', '4无1', '4无3', '1加34', '1加43', '1加23', '1加32', '2加34', '2加43', '2加41', '2加14', '3加14', '3加41', '3加12', '3加21', '4加12', '4加21', '4加23', '4加32', '1严2', '2严1', '2严3', '3严2', '3严4', '4严3', '4严1', '1严4', '1严3', '2严4', '3严1', '4严2', '1念2', '2念1', '2念3', '3念2', '3念4', '4念3', '4念1', '1念4', '1念3', '2念4', '3念1', '4念2', '42严', '24严', '31严', '13严', '12严', '14严', '21严', '23严', '32严', '43严', '41严', '34严', '42念', '24念', '31念', '13念', '12念', '14念', '21念', '23念', '32念', '43念', '41念', '34念'];
            $yanlian = ['42严', '24严', '31严', '13严', '12严', '14严', '21严', '23严', '32严', '43严', '41严', '34严', '42念', '24念', '31念', '13念', '12念', '14念', '21念', '23念', '32念', '43念', '41念', '34念'];
            // $isSys = db('record')->where('qihao',($data['qh']-1))->where('sys','kai3')->find();
            if (trim($str) == '查') {
                $istId = cha($wan, $admin, $str, $data['qh']);
            } elseif (trim($str) == '玩法') {
                $istId = addCmd($wan, $admin, $str, $data['qh']);
                addMsg2($wan, $admin, '/static/xz/vs.zz.zhuguangbq.xyz_files/wanfa.jpg', $data['qh'], 'wf', 0);
            } elseif (trim($str) == '历史') {
                $istId = lishi($wan, $admin, $str, $data['qh'], $usre);
            } elseif (trim($str) == '走势') {
                $istId = zoushi($wan, $admin, $str, $data['qh']);
            } elseif (trim($str) == '流水') {
                $istId = liushui($wan, $admin, $str, $data['qh'], $usre);
            } elseif (trim($str) == '取消') {
                $istId = addCmd($wan, $admin, $str, $data['qh']);
                if ((strtotime($open['dtOpen']) - time()) < $usre['fengpan']) {
                    if ($open['QiHao'] == $data['qh']) {
                        addMsg($wan, $admin, '@' . $data['dluser'] . ', 本期已停止，禁止取消!', $data['qh']);
                    }
                } elseif ($usre['cancel'] == 0) {
                    if ($open['QiHao'] == $data['qh']) {
                        addMsg($wan, $admin, '@' . $data['dluser'] . ', 禁止取消!', $data['qh']);
                    }
                } else {
                    $order = db('record')->where('gameType', $wan['gameType'])->where('name', $data['wxid'])->where('rid', session('user_id3'))->where('qihao', $data['qh'])->where('type', 3)->select();
                    if (count($order) > 0) {
                        $hasOrder = false;
                        $m = 0;
                        $allStr = '@' . $data['dluser'] . '
';
                        foreach ($order as $val) {
                            if ($val['type'] == 3) {
                                if (time() - strtotime($val['dtGenerate']) < $usre['cancel']) {
                                    db('rbuser')->where('wxid', $val['name'])->where('uid', $val['rid'])->setInc('score', $val['score']);
                                    $hasOrder = true;
                                    db('record')->where('id', $val['id'])->delete();
                                    $m = $m + $val['score'];
                                    $allStr .= '取消 ' . $val['text'] . '，返回' . floatval($val['score']) . '
';
                                }
                            }
                        }
                        $allStr .= '剩余粮草 ' . sprintf('%.1f', $wan['score'] + $m);
                        if ($hasOrder) {
                            addMsg($wan, $admin, $allStr, $data['qh']);
                            addMsg($wan, $admin, '@' . $data['dluser'] . ', ' . $usre['cancel'] . '秒内有效指令已全部取消!', $data['qh']);
                        } else {
                            addMsg($wan, $admin, '@' . $data['dluser'] . ', ' . $usre['cancel'] . '秒内无有效指令!', $data['qh']);
                        }
                    } else {
                        addMsg($wan, $admin, '@' . $data['dluser'] . ', ' . $usre['cancel'] . '秒内无有效指令!', $data['qh']);
                    }
                }
            } elseif (trim($frist) == '上' && is_numeric($last)) {
                $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                $hasShang = db('folder')->where(['wxid' => $wan['wxid'], 'nickName' => $wan['NickName'], 'uid' => $admin['UserName'], 'rid' => $wan['uid'], 'status' => 0, 'type' => 0])->find();
                if ($hasShang) {
                    addMsg($wan, $admin, '@' . $data['dluser'] . ', 上分无效!', $data['qh']);
                } else {
                    $oid = addJifen($wan, $admin, $last, 0);
                    addMsg3($wan, $admin, $last, '@' . $data['dluser'] . ', 上分' . $last . ',待审批!', $data['qh'], 'shang', $oid);
                }
            } elseif (trim($frist) == '下' && is_numeric($last)) {
                $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                if ($wan['score'] < $last) {
                    addMsg($wan, $admin, '@' . $data['dluser'] . ', 您当前积分不足' . $last . '!', $data['qh']);
                } else {
                    $hasShang = db('folder')->where(['wxid' => $wan['wxid'], 'nickName' => $wan['NickName'], 'uid' => $admin['UserName'], 'rid' => $wan['uid'], 'status' => 0, 'type' => 1])->find();
                    if ($hasShang) {
                        addMsg($wan, $admin, '@' . $data['dluser'] . ', 下分无效!', $data['qh']);
                    } else {
                        $oid = addJifen($wan, $admin, $last, 1);
                        addMsg3($wan, $admin, $last, '@' . $data['dluser'] . ', 下分' . $last . ',待审批!, 剩' . sprintf('%.0f', ($wan['score'] - $last)), $data['qh'], 'xia', $oid);
                    }
                }
            } elseif ((strtotime($open['dtOpen']) - time()) < $usre['fengpan'] || cache('feng' . $usre['id'] . $wan['gameType']) || (0 > (strtotime($open['dtOpen']) - time())) || ((strtotime($open['dtOpen']) - time()) > 600)) {
                $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                addMsg($wan, $admin, '@' . $data['dluser'] . ', 已停止!', $data['qh']);
            } elseif (strstr($arr[0], '.') || strstr($arr[0], '=') || strstr($arr[0], '+') || strstr($arr[0], ' ')) {
                $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                addMsg($wan, $admin, '@' . $data['dluser'] . ', 指令格式不正确!', $data['qh']);
            } elseif (count($huan) > 1 || count($kong) > 1) {
                $duo = false;
                $zongxiaList = db('record')->where('gameType', $wan['gameType'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', $wan['uid'])->where('qihao', $data['qh'])->where('isTuo', 0)->sum('score');
                $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                $xiaList = [];
                $totalM = 0;
                $duoArr = count($huan) > 1 ? $huan : $kong;
                if ($wan['gameType'] === 75) {
                    foreach ($duoArr as $value) {
                        $str = $value;
                        $map['text'] = array('like', array('%' . str_replace($data['je'], "", $value) . '%'), 'OR');
                        $money = $data['je'];
                        $xian = 20000;
                        $duo = xiazhu2($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                        if (!$duo) {
                            return ['id' => $istId];
                        } else {
                            array_push($xiaList, ['m' => $money, 'cmd' => $str, 'd' => $money]);
                            $totalM += $money;
                        }
                    }
                } else {
                    foreach ($duoArr as $value) {
                        $str = $value;
                        if (($wan['gameType'] == 17 || $wan['gameType'] == 5) && strstr($str, '/')) {
                            $wfArr = explode('/', $str);
                            unset($wfArr[0]);
                            $str = implode('/', $wfArr);
                        }
                        $frist = mb_substr($str, 0, 1, "UTF-8");
                        $last = mb_substr($str, 1, strlen($str), "UTF-8");
                        $arr = explode('/', $str);
                        if ((in_array($frist, $daxiao) && is_numeric($last)) || (in_array($arr[0], $daxiao) && count($arr) == 2 && is_numeric($arr[1]))) {
                            if ($frist == '大' || $frist == '小') {
                                $map['text'] = array('like', array('%' . $frist . '%'), 'OR');
                                $money = $last;
                                $xian = $usre['daxiao'];
                            } else {
                                if ($frist == '单' || $arr[0] == '13' || $arr[0] == '31') {
                                    $map['text'] = array('like', array('%单%', '13/%', '31/%'), 'OR');
                                    if ($frist == '单') {
                                        $money = $last;
                                    } else {
                                        $money = $arr[1];
                                    }
                                } else {
                                    $map['text'] = array('like', array('%双%', '24/%', '42/%'), 'OR');
                                    if ($frist == '双') {
                                        $money = $last;
                                    } else {
                                        $money = $arr[1];
                                    }
                                }
                                $xian = $usre['danshuang'];
                            }
                            $duo = xiazhu2($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                            if (!$duo) {
                                return ['id' => $istId];
                            } else {
                                array_push($xiaList, ['m' => $money, 'cmd' => $str, 'd' => $money]);
                                $totalM += $money;
                            }
                        } elseif (strstr($str, '特') && $frist != '特' && $wan['gameType'] != '5') {
                            $arr3 = explode('特', $str);
                            $isTrue = 0;
                            $isTe = true;
                            $xian = $usre['te'];
                            if (is_numeric($arr3[0])) {
                                if (in_array($arr3[0] . '特', $teArr) && is_numeric($arr3[1])) {
                                    $money = $arr3[1];
                                    $map['text'] = array('like', array('%特%'), 'OR');
                                    $xiaList2 = db('record')->where('gameType', $wan['gameType'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', session('user_id3'))->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->select();
                                    $xiaListNum = 0;
                                    foreach ($xiaList2 as $value) {
                                        $te = explode('特', $value['text']);
                                        if (strstr($te[0], '/')) {
                                            $te2 = explode('/', $te[0]);
                                            foreach ($te2 as $val) {
                                                if ((string)$val == (string)$arr3[0]) {
                                                    $xiaListNum += $te[1];
                                                    break;
                                                }
                                            }
                                        } else {
                                            if ((string)$te[0] == (string)$arr3[0]) {
                                                $xiaListNum += $te[1];
                                            }
                                        }
                                    }
                                    if ($xian < ($money + $xiaListNum)) {
                                        addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $arr3[0] . '特" 超出此玩法最大投注限额，最多可下' . ($xian - $xiaListNum), $data['qh']);
                                        return ['id' => $istId];
                                        $isTrue = 2;
                                    } else {
                                        $isTrue = 1;
                                    }
                                }
                            } elseif (strstr($arr3[0], '/')) {
                                $arr4 = explode('/', $arr3[0]);
                                if (count($arr4) != count(array_unique($arr4))) {
                                    addMsg($wan, $admin, '@' . $data['dluser'] . ', 不能下注相同号码!', $data['qh']);
                                    return ['id' => $istId];
                                } else {
                                    foreach ($arr4 as $k => $val) {
                                        if (in_array($val . '特', $teArr)) {
                                            $map['text'] = array('like', array('%特%'), 'OR');
                                            $xiaList2 = db('record')->where('gameType', $wan['gameType'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', session('user_id3'))->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->select();
                                            $xiaListNum = 0;
                                            foreach ($xiaList2 as $value) {
                                                $te = explode('特', $value['text']);
                                                if (strstr($te[0], '/')) {
                                                    $te2 = explode('/', $te[0]);
                                                    foreach ($te2 as $v) {
                                                        if ((string)$v == (string)$val) {
                                                            $xiaListNum += $te[1];
                                                        }
                                                    }
                                                } else {
                                                    if ((string)$te[0] == (string)$val) {
                                                        $xiaListNum += $te[1];
                                                    }
                                                }
                                            }
                                            if ($xian < ($arr3[1] + $xiaListNum)) {
                                                addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $val . '特" 超出此玩法最大投注限额，最多可下' . ($xian - $xiaListNum), $data['qh']);
                                                return ['id' => $istId];
                                                $isTrue = 2;
                                                break;
                                            } else {
                                                $isTrue = 1;
                                            }
                                        } else {
                                            $isTrue = 0;
                                            break;
                                        }
                                    }
                                    $money = $arr3[1] * count($arr4);
                                    $map['text'] = [];
                                }
                            } elseif (strstr($arr3[0], '-')) {
                                $arr4 = explode('-', $arr3[0]);
                                if (count($arr4) != count(array_unique($arr4))) {
                                    addMsg($wan, $admin, '@' . $data['dluser'] . ', 不能下注相同号码!', $data['qh']);
                                    return ['id' => $istId];
                                } else {
                                    foreach ($arr4 as $k => $val) {
                                        if (in_array($val . '特', $teArr)) {
                                            $map['text'] = array('like', array('%特%'), 'OR');
                                            $xiaList2 = db('record')->where('gameType', $wan['gameType'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', session('user_id3'))->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->select();
                                            $xiaListNum = 0;
                                            foreach ($xiaList2 as $value) {
                                                $te = explode('特', $value['text']);
                                                if (strstr($te[0], '-')) {
                                                    $te2 = explode('-', $te[0]);
                                                    foreach ($te2 as $v) {
                                                        if ((string)$v == (string)$val) {
                                                            $xiaListNum += $te[1];
                                                        }
                                                    }
                                                } else {
                                                    if ((string)$te[0] == (string)$val) {
                                                        $xiaListNum += $te[1];
                                                    }
                                                }
                                            }
                                            if ($xian < ($arr3[1] + $xiaListNum)) {
                                                addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $val . '特" 超出此玩法最大投注限额，最多可下' . ($xian - $xiaListNum), $data['qh']);
                                                return ['id' => $istId];
                                                $isTrue = 2;
                                                break;
                                            } else {
                                                $isTrue = 1;
                                            }
                                        } else {
                                            $isTrue = 0;
                                            break;
                                        }
                                    }
                                    $money = $arr3[1] * count($arr4);
                                    $map['text'] = [];
                                }
                            }
                            if ($isTrue == 0) {
                                addMsg($wan, $admin, '@' . $data['dluser'] . ', "' . $str . '" 指令格式不正确!', $data['qh']);
                                return ['id' => $istId];
                            } elseif ($isTrue == 1) {
                                $duo = xiazhu2($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre, $isTe, $arr3[1]);
                                if (!$duo) {
                                    return ['id' => $istId];
                                } else {
                                    array_push($xiaList, ['m' => $money, 'cmd' => $str, 'd' => $arr3[1]]);
                                    $totalM += $money;
                                }
                            }
                        } elseif (strstr($str, '番') || strstr($str, '车') || strstr($str, '推') || strstr($str, '正') || strstr($str, '堂')) {
                            $tar = mb_substr($str, 1, 1, "UTF-8");
                            $arr3 = explode($tar, $str);
                            if (in_array($arr3[0] . $tar, $wanfaArr) && is_numeric($arr3[1])) {
                                $money = $arr3[1];
                                if ($tar == '车' || $tar == '推') {
                                    if ($arr3[0] == '1') {
                                        $kuai = '124';
                                        $kuai2 = '241';
                                        $kuai3 = '412';
                                        $kuai4 = '421';
                                        $kuai5 = '214';
                                        $kuai6 = '142';
                                    } elseif ($arr3[0] == '2') {
                                        $kuai = '123';
                                        $kuai2 = '231';
                                        $kuai3 = '321';
                                        $kuai4 = '132';
                                        $kuai5 = '213';
                                        $kuai6 = '312';
                                    } elseif ($arr3[0] == '3') {
                                        $kuai = '234';
                                        $kuai2 = '243';
                                        $kuai3 = '324';
                                        $kuai4 = '342';
                                        $kuai5 = '423';
                                        $kuai6 = '432';
                                    } else {
                                        $kuai = '134';
                                        $kuai2 = '143';
                                        $kuai3 = '431';
                                        $kuai4 = '341';
                                        $kuai5 = '314';
                                        $kuai6 = '413';
                                    }
                                    $xian = $usre['che'];
                                    $map['text'] = array('like', array('%' . $arr3[0] . '车%', '%' . $arr3[0] . '推%', '%' . $kuai . '/%', '%' . $kuai2 . '/%', '%' . $kuai3 . '/%', '%' . $kuai4 . '/%', '%' . $kuai5 . '/%', '%' . $kuai6 . '/%'), 'OR');
                                } elseif ($tar == '正' || $tar == '堂') {
                                    if ($arr3[0] == '1') {
                                        $kuai = '1无3';
                                    } elseif ($arr3[0] == '2') {
                                        $kuai = '2无4';
                                    } elseif ($arr3[0] == '3') {
                                        $kuai = '3无1';
                                    } else {
                                        $kuai = '4无2';
                                    }
                                    $xian = $usre['zheng'];
                                    $map['text'] = array('like', array('%' . $arr3[0] . '正%', '%' . $arr3[0] . '堂%', $kuai . '/%'), 'OR');
                                } else {
                                    $map['text'] = array('like', array('%' . $arr3[0] . $tar . '%'), 'OR');
                                    $xian = $usre['fan'];
                                }
                                $duo = xiazhu2($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                                if (!$duo) {
                                    return ['id' => $istId];
                                } else {
                                    array_push($xiaList, ['m' => $money, 'cmd' => $str, 'd' => $money]);
                                    $totalM += $money;
                                }
                            } else {
                                addMsg($wan, $admin, '@' . $data['dluser'] . ', "' . $str . '" 指令格式不正确!', $data['qh']);
                                return ['id' => $istId];
                            }
                        } elseif (in_array($arr[0], $chetui) && is_numeric($arr[1]) && count($arr) == 2) {
                            $money = $arr[1];
                            if ($arr[0] == '124' || $arr[0] == '241' || $arr[0] == '142' || $arr[0] == '412' || $arr[0] == '421' || $arr[0] == '214') {
                                $kuai = '1';
                                $kuai1 = '124';
                                $kuai2 = '241';
                                $kuai3 = '412';
                                $kuai4 = '421';
                                $kuai5 = '214';
                                $kuai6 = '142';
                            } elseif ($arr[0] == '123' || $arr[0] == '231' || $arr[0] == '321' || $arr[0] == '132' || $arr[0] == '213' || $arr[0] == '312') {
                                $kuai = '2';
                                $kuai1 = '123';
                                $kuai2 = '231';
                                $kuai3 = '321';
                                $kuai4 = '132';
                                $kuai5 = '213';
                                $kuai6 = '312';
                            } elseif ($arr[0] == '234' || $arr[0] == '243' || $arr[0] == '324' || $arr[0] == '342' || $arr[0] == '423' || $arr[0] == '432') {
                                $kuai = '3';
                                $kuai1 = '234';
                                $kuai2 = '243';
                                $kuai3 = '324';
                                $kuai4 = '342';
                                $kuai5 = '423';
                                $kuai6 = '432';
                            } else {
                                $kuai = '4';
                                $kuai1 = '134';
                                $kuai2 = '143';
                                $kuai3 = '431';
                                $kuai4 = '341';
                                $kuai5 = '314';
                                $kuai6 = '413';
                            }
                            $map['text'] = array('like', array('%' . $kuai . '车%', '%' . $kuai . '推%', '%' . $kuai1 . '/%', '%' . $kuai2 . '/%', '%' . $kuai3 . '/%', '%' . $kuai4 . '/%', '%' . $kuai5 . '/%', '%' . $kuai6 . '/%'), 'OR');
                            $xian = $usre['che'];
                            $duo = xiazhu2($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                            if (!$duo) {
                                return ['id' => $istId];
                            } else {
                                array_push($xiaList, ['m' => $money, 'cmd' => $str, 'd' => $money]);
                                $totalM += $money;
                            }
                        } elseif (strstr($str, '角') || in_array($arr[0], $jiao)) {
                            $arr3 = explode('角', $str);
                            if ((strstr($str, '角') && in_array($arr3[0], $jiao)) || (in_array($arr[0], $jiao) && is_numeric($arr[1]) && count($arr) == 2)) {
                                if (strstr($str, '/')) {
                                    $kuai = $arr[0];
                                    $money = $arr[1];
                                } else {
                                    $kuai = $arr3[0];
                                    $money = $arr3[1];
                                }
                                $map['text'] = array('like', array('%' . $kuai . '角%', $kuai . '/%', '%' . strrev($kuai) . '角%', strrev($kuai) . '/%'), 'OR');
                                $xian = $usre['che'];
                                $duo = xiazhu2($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                                if (!$duo) {
                                    return ['id' => $istId];
                                } else {
                                    array_push($xiaList, ['m' => $money, 'cmd' => $str, 'd' => $money]);
                                    $totalM += $money;
                                }
                            } else {
                                addMsg($wan, $admin, '@' . $data['dluser'] . ', "' . $str . '" 指令格式不正确!', $data['qh']);
                                return ['id' => $istId];
                            }
                        } elseif (in_array($arr[0], $wanfaArr) && is_numeric($arr[1]) && count($arr) == 2) {
                            if (strstr($str, '加')) {
                                $xian = $usre['jia'];
                                if ($arr[0] == '1加34' || $arr[0] == '1加43') {
                                    $kuai = '1无2';
                                    $one = '1加34';
                                    $two = '1加43';
                                } elseif ($arr[0] == '1加23' || $arr[0] == '1加32') {
                                    $kuai = '1无4';
                                    $one = '1加23';
                                    $two = '1加32';
                                } elseif ($arr[0] == '2加34' || $arr[0] == '2加43') {
                                    $kuai = '2无1';
                                    $one = '2加34';
                                    $two = '2加43';
                                } elseif ($arr[0] == '2加14' || $arr[0] == '2加41') {
                                    $kuai = '2无3';
                                    $one = '2加14';
                                    $two = '2加41';
                                } elseif ($arr[0] == '3加14' || $arr[0] == '3加41') {
                                    $kuai = '3无2';
                                    $one = '3加14';
                                    $two = '3加41';
                                } elseif ($arr[0] == '3加12' || $arr[0] == '3加21') {
                                    $kuai = '3无4';
                                    $one = '3加12';
                                    $two = '3加21';
                                } elseif ($arr[0] == '4加12' || $arr[0] == '4加21') {
                                    $kuai = '4无3';
                                    $one = '4加12';
                                    $two = '4加21';
                                } else {
                                    $kuai = '4无1';
                                    $one = '4加23';
                                    $two = '4加32';
                                }
                                $map['text'] = array('like', array('%' . $one . '%', '%' . $two . '%', '%' . $kuai . '%'), 'OR');
                            } elseif (strstr($str, '通') || strstr($str, '无')) {
                                if (strstr($str, '通')) {
                                    $arr3 = explode('通', $arr[0]);
                                    $xian = $usre['tong'];
                                    $map['text'] = array('like', array('%' . $arr3[0] . '通' . $arr3[1] . '%', '%' . $arr3[1] . '无' . $arr3[0] . '%'), 'OR');
                                } else {
                                    $arr3 = explode('无', $arr[0]);
                                    if (strlen($arr3[0]) == 2) {
                                        $xian = $usre['tong'];
                                        $map['text'] = array('like', array('%' . $arr3[1] . '通' . $arr3[0] . '%', '%' . $arr3[0] . '无' . $arr3[1] . '%'), 'OR');
                                    } else {
                                        if ($arr[0] == '1无3' || $arr[0] == '2无4' || $arr[0] == '3无1' || $arr[0] == '4无2') {
                                            if ($arr[0] == '1无3') {
                                                $kuai = '1';
                                            } elseif ($arr[0] == '2无4') {
                                                $kuai = '2';
                                            } elseif ($arr[0] == '3无1') {
                                                $kuai = '3';
                                            } else {
                                                $kuai = '4';
                                            }
                                            $xian = $usre['zheng'];
                                            $map['text'] = array('like', array('%' . $kuai . '正%', '%' . $kuai . '堂%', $arr[0] . '/%'), 'OR');
                                        } else {
                                            $xian = $usre['jia'];
                                            if ($arr[0] == '1无2') {
                                                $kuai = '1无2';
                                                $one = '1加34';
                                                $two = '1加43';
                                            } elseif ($arr[0] == '1无4') {
                                                $kuai = '1无4';
                                                $one = '1加23';
                                                $two = '1加32';
                                            } elseif ($arr[0] == '2无1') {
                                                $kuai = '2无1';
                                                $one = '2加34';
                                                $two = '2加43';
                                            } elseif ($arr[0] == '2无3') {
                                                $kuai = '2无3';
                                                $one = '2加14';
                                                $two = '2加41';
                                            } elseif ($arr[0] == '3无2') {
                                                $kuai = '3无2';
                                                $one = '3加14';
                                                $two = '3加41';
                                            } elseif ($arr[0] == '3无4') {
                                                $kuai = '3无4';
                                                $one = '3加12';
                                                $two = '3加21';
                                            } elseif ($arr[0] == '4无3') {
                                                $kuai = '4无3';
                                                $one = '4加12';
                                                $two = '4加21';
                                            } else {
                                                $kuai = '4无1';
                                                $one = '4加23';
                                                $two = '4加32';
                                            }
                                            $map['text'] = array('like', array('%' . $one . '%', '%' . $two . '%', '%' . $kuai . '%'), 'OR');
                                        }
                                    }
                                }
                            } else {
                                if (in_array($arr[0], $yanlian)) {
                                    addMsg($wan, $admin, '@' . $data['dluser'] . ', "' . $str . '" 指令格式不正确!', $data['qh']);
                                    return ['id' => $istId];
                                } else {
                                    if (strstr($str, '严')) {
                                        $arr3 = explode('严', $arr[0]);
                                    } else {
                                        $arr3 = explode('念', $arr[0]);
                                    }
                                    $map['text'] = array('like', array('%' . $arr3[0] . '严' . $arr3[1] . '%', '%' . $arr3[0] . '念' . $arr3[1] . '%', '%' . $arr3[0] . $arr3[1] . '严%', '%' . $arr3[0] . $arr3[1] . '念%'), 'OR');
                                    $xian = $usre['nian'];
                                }
                            }
                            $money = $arr[1];
                            $duo = xiazhu2($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                            if (!$duo) {
                                return ['id' => $istId];
                            } else {
                                array_push($xiaList, ['m' => $money, 'cmd' => $str, 'd' => $money]);
                                $totalM += $money;
                            }
                        } elseif (strstr($str, '严') || strstr($str, '念')) {
                            if (strstr($str, '严')) {
                                $arr3 = explode('严', $str);
                            } else {
                                $arr3 = explode('念', $str);
                            }
                            if (in_array($arr3[0] . '严', $wanfaArr) || in_array($arr3[0] . '念', $wanfaArr)) {
                                $one = substr($arr3[0], 0, 1);
                                $two = substr($arr3[0], 1, 1);
                                $map['text'] = array('like', array('%' . $one . '严' . $two . '%', '%' . $one . '念' . $two . '%', '%' . $arr3[0] . '严%', '%' . $arr3[0] . '念%'), 'OR');
                                $xian = $usre['nian'];
                                $money = $arr3[1];
                                $duo = xiazhu2($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                                if (!$duo) {
                                    return ['id' => $istId];
                                } else {
                                    array_push($xiaList, ['m' => $money, 'cmd' => $str, 'd' => $money]);
                                    $totalM += $money;
                                }
                            } else {
                                addMsg($wan, $admin, '@' . $data['dluser'] . ', "' . $str . '" 指令格式不正确!', $data['qh']);
                                return ['id' => $istId];
                            }
                        } else {
                            addMsg($wan, $admin, '@' . $data['dluser'] . ', "' . $str . '" 指令格式不正确!', $data['qh']);
                            return ['id' => $istId];
                        }
                    }
                }
                if ($duo) {
                    if ($wan['score'] < $totalM) {
                        addMsg($wan, $admin, '@' . $data['dluser'] . ', 您当前积分不足' . $totalM . '!', $data['qh']);
                    } else {
                        $xiaM = 0;
                        $oldM = $wan['score'];
                        foreach ($xiaList as $k => $value) {
                            $user = db('rbuser')->where('wxid', $data['wxid'])->find();
                            $sdec = db('rbuser')->where('wxid', $data['wxid'])->where('uid', $wan['uid'])->setDec('score', $value['m']);
                            if ($sdec > 0) {
                                $wan['score'] = $user['score'];
                                $addId = addDan3($wan, $admin, $value['m'], $value['cmd'], $data['qh'], $value['d'], 0, 0);
                                if ($addId == 2 || $addId > 3 || $addId == '') {
                                    $xiaM += intval($value['m']);
                                }
                                $xiaList[$k]['xiaId'] = $addId;
                            }
                        }
                        $wan['score'] = $oldM;
                        $xiaId = addDan2($wan, $admin, $xiaM, $str, $data['qh']);
                        if ($wan['gameType'] === 75) {
                            // feidan($wan,'1大10',$xiaId,$xiaList);
                        }
                    }
                }
            } else {
                $zongxiaList = db('record')->where('gameType', $wan['gameType'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', session('user_id3'))->where('qihao', $data['qh'])->where('isTuo', 0)->sum('score');
                if ($wan['gameType'] === 75) {
                    $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                    $map['text'] = array('like', array('%' . str_replace($data['je'], "", $str) . '%'), 'OR');
                    $money = $data['je'];
                    $xian = 20000;
                    xiazhu($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                } else {
                    if ((in_array($frist, $daxiao) && is_numeric($last)) || (in_array($arr[0], $daxiao) && count($arr) == 2 && is_numeric($arr[1]))) {
                        $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                        if ($frist == '大' || $frist == '小') {
                            $map['text'] = array('like', array('%' . $frist . '%'), 'OR');
                            $money = $last;
                            $xian = $usre['daxiao'];
                        } else {
                            if ($frist == '单' || $arr[0] == '13' || $arr[0] == '31') {
                                $map['text'] = array('like', array('%单%', '13/%', '31/%'), 'OR');
                                if ($frist == '单') {
                                    $money = $last;
                                } else {
                                    $money = $arr[1];
                                }
                            } else {
                                $map['text'] = array('like', array('%双%', '24/%', '42/%'), 'OR');
                                if ($frist == '双') {
                                    $money = $last;
                                } else {
                                    $money = $arr[1];
                                }
                            }
                            $xian = $usre['danshuang'];
                        }
                        xiazhu($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                    } elseif (strstr($str, '特') && $frist != '特' && $wan['gameType'] != '5') {
                        $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                        $arr3 = explode('特', $str);
                        $isTrue = 0;
                        $isTe = true;
                        $xian = $usre['te'];
                        if (is_numeric($arr3[0])) {
                            if (in_array($arr3[0] . '特', $teArr) && is_numeric($arr3[1])) {
                                $money = $arr3[1];
                                $map['text'] = array('like', array('%特%'), 'OR');
                                $xiaList = db('record')->where('gameType', $wan['gameType'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', session('user_id3'))->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->select();
                                $xiaListNum = 0;
                                foreach ($xiaList as $value) {
                                    $te = explode('特', $value['text']);
                                    if (strstr($te[0], '/')) {
                                        $te2 = explode('/', $te[0]);
                                        foreach ($te2 as $val) {
                                            if ((string)$val == (string)$arr3[0]) {
                                                $xiaListNum += $te[1];
                                                break;
                                            }
                                        }
                                    } else {
                                        if ((string)$te[0] == (string)$arr3[0]) {
                                            $xiaListNum += $te[1];
                                        }
                                    }
                                }
                                if ($xian < ($money + $xiaListNum)) {
                                    addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $arr3[0] . '特" 超出此玩法最大投注限额，最多可下' . ($xian - $xiaListNum), $data['qh']);
                                    $isTrue = 2;
                                } else {
                                    $isTrue = 1;
                                }
                            }
                        } elseif (strstr($arr3[0], '/')) {
                            $arr4 = explode('/', $arr3[0]);
                            if (count($arr4) != count(array_unique($arr4))) {
                                addMsg($wan, $admin, '@' . $data['dluser'] . ', 不能下注相同号码!', $data['qh']);
                                return ['id' => $istId];
                            } else {
                                foreach ($arr4 as $k => $val) {
                                    if (in_array($val . '特', $teArr)) {
                                        $map['text'] = array('like', array('%特%'), 'OR');
                                        $xiaList = db('record')->where('gameType', $wan['gameType'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', session('user_id3'))->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->select();
                                        $xiaListNum = 0;
                                        foreach ($xiaList as $value) {
                                            $te = explode('特', $value['text']);
                                            if (strstr($te[0], '/')) {
                                                $te2 = explode('/', $te[0]);
                                                foreach ($te2 as $v) {
                                                    if ((string)$v == (string)$val) {
                                                        $xiaListNum += $te[1];
                                                    }
                                                }
                                            } else {
                                                if ((string)$te[0] == (string)$val) {
                                                    $xiaListNum += $te[1];
                                                }
                                            }
                                        }
                                        if ($xian < ($arr3[1] + $xiaListNum)) {
                                            addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $val . '特" 超出此玩法最大投注限额，最多可下' . ($xian - $xiaListNum), $data['qh']);
                                            $isTrue = 2;
                                            break;
                                        } else {
                                            $isTrue = 1;
                                        }
                                    } else {
                                        $isTrue = 0;
                                        break;
                                    }
                                }
                                $money = $arr3[1] * count($arr4);
                                $map['text'] = [];
                            }
                        } elseif (strstr($arr3[0], '-')) {
                            $arr4 = explode('-', $arr3[0]);
                            if (count($arr4) != count(array_unique($arr4))) {
                                addMsg($wan, $admin, '@' . $data['dluser'] . ', 不能下注相同号码!', $data['qh']);
                                return ['id' => $istId];
                            } else {
                                foreach ($arr4 as $k => $val) {
                                    if (in_array($val . '特', $teArr)) {
                                        $map['text'] = array('like', array('%特%'), 'OR');
                                        $xiaList = db('record')->where('gameType', $wan['gameType'])->where('type', 3)->where('wid', $wan['NickName'])->where('rid', session('user_id3'))->where('qihao', $data['qh'])->where('isTuo', 0)->where($map)->select();
                                        $xiaListNum = 0;
                                        foreach ($xiaList as $value) {
                                            $te = explode('特', $value['text']);
                                            if (strstr($te[0], '-')) {
                                                $te2 = explode('-', $te[0]);
                                                foreach ($te2 as $v) {
                                                    if ((string)$v == (string)$val) {
                                                        $xiaListNum += $te[1];
                                                    }
                                                }
                                            } else {
                                                if ((string)$te[0] == (string)$val) {
                                                    $xiaListNum += $te[1];
                                                }
                                            }
                                        }
                                        if ($xian < ($arr3[1] + $xiaListNum)) {
                                            addMsg($wan, $admin, '@' . $data['dluser'] . ' "' . $val . '特" 超出此玩法最大投注限额，最多可下' . ($xian - $xiaListNum), $data['qh']);
                                            $isTrue = 2;
                                            break;
                                        } else {
                                            $isTrue = 1;
                                        }
                                    } else {
                                        $isTrue = 0;
                                        break;
                                    }
                                }
                                $money = $arr3[1] * count($arr4);
                                $map['text'] = [];
                            }
                        }
                        if ($isTrue == 0) {
                            addMsg($wan, $admin, '@' . $data['dluser'] . ', 指令格式不正确!', $data['qh']);
                        } elseif ($isTrue == 1) {
                            xiazhu($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre, $isTe, $arr3[1]);
                        }
                    } elseif (strstr($str, '番') || strstr($str, '车') || strstr($str, '推') || strstr($str, '正') || strstr($str, '堂')) {
                        $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                        $tar = mb_substr($str, 1, 1, "UTF-8");
                        $arr3 = explode($tar, $str);
                        if (in_array($arr3[0] . $tar, $wanfaArr) && is_numeric($arr3[1])) {
                            $money = $arr3[1];
                            if ($tar == '车' || $tar == '推') {
                                if ($arr3[0] == '1') {
                                    $kuai = '124';
                                    $kuai2 = '241';
                                    $kuai3 = '412';
                                    $kuai4 = '421';
                                    $kuai5 = '214';
                                    $kuai6 = '142';
                                } elseif ($arr3[0] == '2') {
                                    $kuai = '123';
                                    $kuai2 = '231';
                                    $kuai3 = '321';
                                    $kuai4 = '132';
                                    $kuai5 = '213';
                                    $kuai6 = '312';
                                } elseif ($arr3[0] == '3') {
                                    $kuai = '234';
                                    $kuai2 = '243';
                                    $kuai3 = '324';
                                    $kuai4 = '342';
                                    $kuai5 = '423';
                                    $kuai6 = '432';
                                } else {
                                    $kuai = '134';
                                    $kuai2 = '143';
                                    $kuai3 = '431';
                                    $kuai4 = '341';
                                    $kuai5 = '314';
                                    $kuai6 = '413';
                                }
                                $xian = $usre['che'];
                                $map['text'] = array('like', array('%' . $arr3[0] . '车%', '%' . $arr3[0] . '推%', '%' . $kuai . '/%', '%' . $kuai2 . '/%', '%' . $kuai3 . '/%', '%' . $kuai4 . '/%', '%' . $kuai5 . '/%', '%' . $kuai6 . '/%'), 'OR');
                            } elseif ($tar == '正' || $tar == '堂') {
                                if ($arr3[0] == '1') {
                                    $kuai = '1无3';
                                } elseif ($arr3[0] == '2') {
                                    $kuai = '2无4';
                                } elseif ($arr3[0] == '3') {
                                    $kuai = '3无1';
                                } else {
                                    $kuai = '4无2';
                                }
                                $xian = $usre['zheng'];
                                $map['text'] = array('like', array('%' . $arr3[0] . '正%', '%' . $arr3[0] . '堂%', $kuai . '/%'), 'OR');
                            } else {
                                $map['text'] = array('like', array('%' . $arr3[0] . $tar . '%'), 'OR');
                                $xian = $usre['fan'];
                            }
                            xiazhu($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                        } else {
                            addMsg($wan, $admin, '@' . $data['dluser'] . ', 指令格式不正确!', $data['qh']);
                        }
                    } elseif (in_array($arr[0], $chetui) && is_numeric($arr[1]) && count($arr) == 2) {
                        $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                        $money = $arr[1];
                        if ($arr[0] == '124' || $arr[0] == '241' || $arr[0] == '142' || $arr[0] == '412' || $arr[0] == '421' || $arr[0] == '214') {
                            $kuai = '1';
                            $kuai1 = '124';
                            $kuai2 = '241';
                            $kuai3 = '412';
                            $kuai4 = '421';
                            $kuai5 = '214';
                            $kuai6 = '142';
                        } elseif ($arr[0] == '123' || $arr[0] == '231' || $arr[0] == '321' || $arr[0] == '132' || $arr[0] == '213' || $arr[0] == '312') {
                            $kuai = '2';
                            $kuai1 = '123';
                            $kuai2 = '231';
                            $kuai3 = '321';
                            $kuai4 = '132';
                            $kuai5 = '213';
                            $kuai6 = '312';
                        } elseif ($arr[0] == '234' || $arr[0] == '243' || $arr[0] == '324' || $arr[0] == '342' || $arr[0] == '423' || $arr[0] == '432') {
                            $kuai = '3';
                            $kuai1 = '234';
                            $kuai2 = '243';
                            $kuai3 = '324';
                            $kuai4 = '342';
                            $kuai5 = '423';
                            $kuai6 = '432';
                        } else {
                            $kuai = '4';
                            $kuai1 = '134';
                            $kuai2 = '143';
                            $kuai3 = '431';
                            $kuai4 = '341';
                            $kuai5 = '314';
                            $kuai6 = '413';
                        }
                        $map['text'] = array('like', array('%' . $kuai . '车%', '%' . $kuai . '推%', '%' . $kuai1 . '/%', '%' . $kuai2 . '/%', '%' . $kuai3 . '/%', '%' . $kuai4 . '/%', '%' . $kuai5 . '/%', '%' . $kuai6 . '/%'), 'OR');
                        $xian = $usre['che'];
                        xiazhu($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                    } elseif (strstr($str, '角') || in_array($arr[0], $jiao)) {
                        $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                        $arr3 = explode('角', $str);
                        if ((strstr($str, '角') && in_array($arr3[0], $jiao)) || (in_array($arr[0], $jiao) && is_numeric($arr[1]) && count($arr) == 2)) {
                            if (strstr($str, '/')) {
                                $kuai = $arr[0];
                                $money = $arr[1];
                            } else {
                                $kuai = $arr3[0];
                                $money = $arr3[1];
                            }
                            $map['text'] = array('like', array('%' . $kuai . '角%', $kuai . '/%', '%' . strrev($kuai) . '角%', strrev($kuai) . '/%'), 'OR');
                            $xian = $usre['che'];
                            xiazhu($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                        } else {
                            addMsg($wan, $admin, '@' . $data['dluser'] . ', 指令格式不正确!', $data['qh']);
                        }
                    } elseif (in_array($arr[0], $wanfaArr) && is_numeric($arr[1]) && count($arr) == 2) {
                        $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                        if (strstr($str, '加')) {
                            $xian = $usre['jia'];
                            if ($arr[0] == '1加34' || $arr[0] == '1加43') {
                                $kuai = '1无2';
                                $one = '1加34';
                                $two = '1加43';
                            } elseif ($arr[0] == '1加23' || $arr[0] == '1加32') {
                                $kuai = '1无4';
                                $one = '1加23';
                                $two = '1加32';
                            } elseif ($arr[0] == '2加34' || $arr[0] == '2加43') {
                                $kuai = '2无1';
                                $one = '2加34';
                                $two = '2加43';
                            } elseif ($arr[0] == '2加14' || $arr[0] == '2加41') {
                                $kuai = '2无3';
                                $one = '2加14';
                                $two = '2加41';
                            } elseif ($arr[0] == '3加14' || $arr[0] == '3加41') {
                                $kuai = '3无2';
                                $one = '3加14';
                                $two = '3加41';
                            } elseif ($arr[0] == '3加12' || $arr[0] == '3加21') {
                                $kuai = '3无4';
                                $one = '3加12';
                                $two = '3加21';
                            } elseif ($arr[0] == '4加12' || $arr[0] == '4加21') {
                                $kuai = '4无3';
                                $one = '4加12';
                                $two = '4加21';
                            } else {
                                $kuai = '4无1';
                                $one = '4加23';
                                $two = '4加32';
                            }
                            $map['text'] = array('like', array('%' . $one . '%', '%' . $two . '%', '%' . $kuai . '%'), 'OR');
                        } elseif (strstr($str, '通') || strstr($str, '无')) {
                            if (strstr($str, '通')) {
                                $arr3 = explode('通', $arr[0]);
                                $xian = $usre['tong'];
                                $map['text'] = array('like', array('%' . $arr3[0] . '通' . $arr3[1] . '%', '%' . $arr3[1] . '无' . $arr3[0] . '%'), 'OR');
                            } else {
                                $arr3 = explode('无', $arr[0]);
                                if (strlen($arr3[0]) == 2) {
                                    $xian = $usre['tong'];
                                    $map['text'] = array('like', array('%' . $arr3[1] . '通' . $arr3[0] . '%', '%' . $arr3[0] . '无' . $arr3[1] . '%'), 'OR');
                                } else {
                                    if ($arr[0] == '1无3' || $arr[0] == '2无4' || $arr[0] == '3无1' || $arr[0] == '4无2') {
                                        if ($arr[0] == '1无3') {
                                            $kuai = '1';
                                        } elseif ($arr[0] == '2无4') {
                                            $kuai = '2';
                                        } elseif ($arr[0] == '3无1') {
                                            $kuai = '3';
                                        } else {
                                            $kuai = '4';
                                        }
                                        $xian = $usre['zheng'];
                                        $map['text'] = array('like', array('%' . $kuai . '正%', '%' . $kuai . '堂%', $arr[0] . '/%'), 'OR');
                                    } else {
                                        $xian = $usre['jia'];
                                        if ($arr[0] == '1无2') {
                                            $kuai = '1无2';
                                            $one = '1加34';
                                            $two = '1加43';
                                        } elseif ($arr[0] == '1无4') {
                                            $kuai = '1无4';
                                            $one = '1加23';
                                            $two = '1加32';
                                        } elseif ($arr[0] == '2无1') {
                                            $kuai = '2无1';
                                            $one = '2加34';
                                            $two = '2加43';
                                        } elseif ($arr[0] == '2无3') {
                                            $kuai = '2无3';
                                            $one = '2加14';
                                            $two = '2加41';
                                        } elseif ($arr[0] == '3无2') {
                                            $kuai = '3无2';
                                            $one = '3加14';
                                            $two = '3加41';
                                        } elseif ($arr[0] == '3无4') {
                                            $kuai = '3无4';
                                            $one = '3加12';
                                            $two = '3加21';
                                        } elseif ($arr[0] == '4无3') {
                                            $kuai = '4无3';
                                            $one = '4加12';
                                            $two = '4加21';
                                        } else {
                                            $kuai = '4无1';
                                            $one = '4加23';
                                            $two = '4加32';
                                        }
                                        $map['text'] = array('like', array('%' . $one . '%', '%' . $two . '%', '%' . $kuai . '%'), 'OR');
                                    }
                                }
                            }
                        } else {
                            if (in_array($arr[0], $yanlian)) {
                                addMsg($wan, $admin, '@' . $data['dluser'] . ', 指令格式不正确!', $data['qh']);
                            } else {
                                if (strstr($str, '严')) {
                                    $arr3 = explode('严', $arr[0]);
                                } else {
                                    $arr3 = explode('念', $arr[0]);
                                }
                                $map['text'] = array('like', array('%' . $arr3[0] . '严' . $arr3[1] . '%', '%' . $arr3[0] . '念' . $arr3[1] . '%', '%' . $arr3[0] . $arr3[1] . '严%', '%' . $arr3[0] . $arr3[1] . '念%'), 'OR');
                                $xian = $usre['nian'];
                            }
                        }
                        $money = $arr[1];
                        xiazhu($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                    } elseif (strstr($str, '严') || strstr($str, '念')) {
                        $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                        if (strstr($str, '严')) {
                            $arr3 = explode('严', $str);
                        } else {
                            $arr3 = explode('念', $str);
                        }
                        if (in_array($arr3[0] . '严', $wanfaArr) || in_array($arr3[0] . '念', $wanfaArr)) {
                            $one = substr($arr3[0], 0, 1);
                            $two = substr($arr3[0], 1, 1);
                            $map['text'] = array('like', array('%' . $one . '严' . $two . '%', '%' . $one . '念' . $two . '%', '%' . $arr3[0] . '严%', '%' . $arr3[0] . '念%'), 'OR');
                            $xian = $usre['nian'];
                            $money = $arr3[1];
                            xiazhu($wan, $admin, $data, $money, $zongxiaList, $xian, $map, $str, $usre);
                        } else {
                            addMsg($wan, $admin, '@' . $data['dluser'] . ', 指令格式不正确!', $data['qh']);
                        }
                    } else {
                        // $istId = 0;
                        $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
                        addMsg($wan, $admin, '@' . $data['dluser'] . ', 指令格式不正确!', $data['qh']);
                    }
                }
            }
        } else {
            $istId = addCmd($wan, $admin, $data['cmd'], $data['qh']);
            addMsg($wan, $admin, '@' . $data['dluser'] . ', 下注无效!', $data['qh']);
        }
        return ['id' => $istId];
    }

    public function get(Request $request)
    {
        $this->userLogin();
        $data = $request->param();
        $msg = [];
        $arr = [];
        $check = checkUser(session('user_cd'), $data['tar'], false);
        $user = session('user_find');
        if ($check['code']) {
            $list = cache('changeList') ? cache('changeList') : [];
            foreach ($list as $key => $val) {
                $record = db('record')->where('id', $val)->find();
                if (time() - (strtotime($record['dtGenerate'])) < 420) {
                    array_push($arr, $record);
                }
            }
            $msg = getRecord($data, true);
        }
        $open = getDaoji();
        $timer = get_time_arr(['day' => getTimeList(), 'timeType' => 1]);
        $dayList = $timer['d'];
        $recordList = db('record')->where('gameType', $user['gid'])->where('name', $user['wxid'])->where('type', 3)->where('dtGenerate', 'between', $dayList)->select();
        if ($user['gid'] == 75) {
            $open['kj']['da'] = getZongDx($open['kj']);
            $open['kj']['dan'] = getZongDs($open['kj']);
            $open['kj']['lh'] = getLongHu($open['kj']);
            $open['kj']['qs'] = substr($open['kj']['QiHao'], -3);
        }
        $user['gameType'] = $user['gid'];
        $online = db('rbuser')->where('online', 1)->where('uid', $open['rb']['UserName'])->count();
        list($type, $liu, $liu2, $ying, $kui, $allQi, $weijie, $yijie, $txt) = get_Yingkui($user, $check['rb']);
        return json(['Message' => $msg, 'list' => $arr, 'qh' => $open['qh'], 'kj' => $open['kj'], 'rbuser' => $user, 'msg' => $check['msg'], 'islogin' => $check['code'], 'isVip' => $open['rb']['vip'], 'daoji' => $open['rb']['dj'], 'txt' => $txt, 'jstype' => $open['rb']['jstype'], 'record' => $recordList, 'online' => $online, 'yingkui' => sprintf('%.2f', $ying - $kui), 'liushui' => sprintf('%.2f', ($open['rb']['ls'] == 1 ? $liu : $liu2)), 'weijie' => $weijie, 'yijie' => $yijie]);
    }

    public function autoInfo(Request $request)
    {
        $this->userLogin();
        $data = $request->param();
        $msg = [];
        $arr = [];
        $check = checkUser(session('user_cd'), $data['tar'], false);
        $user = session('user_find');
        $rb = session('robot_find');
        if ($check['code']) {
            $list = cache('changeList') ? cache('changeList') : [];
            foreach ($list as $key => $val) {
                $record = db('record')->where('id', $val)->find();
                if (time() - (strtotime($record['dtGenerate'])) < 420) {
                    array_push($arr, $record);
                }
            }
            $msg = getRecord($data, true);
        }
        $kj = cache('nowQi' . $rb['type']);
        $qh = $kj['QiHao'];
        // $online = db('rbuser') -> where('online',1) -> where('uid',$user['uid']) -> count();
        list($type, $liu, $liu2, $ying, $kui, $allQi, $weijie, $yijie, $txt) = get_Yingkui($user, $rb);
        return json(['Message' => $msg, 'list' => $arr, 'rbuser' => $user, 'msg' => $check['msg'], 'islogin' => $check['code'], 'isVip' => $rb['vip'], 'daoji' => $rb['dj'], 'txt' => $txt, 'jstype' => $rb['jstype'], 'online' => 0, 'yingkui' => sprintf('%.2f', $ying - $kui), 'liushui' => sprintf('%.2f', ($rb['ls'] == 1 ? $liu : $liu2)), 'weijie' => $weijie, 'yijie' => $yijie, 'qh' => $qh]);
    }

    public function timer(Request $request)
    {
        $user = session('user_find');
        $open = getDaoji();
        if ($user['gid'] == 75) {
            $open['kj']['da'] = getZongDx($open['kj']);
            $open['kj']['dan'] = getZongDs($open['kj']);
            $open['kj']['lh'] = getLongHu($open['kj']);
            $open['kj']['qs'] = substr($open['kj']['QiHao'], -3);
        }
        return json(['kj' => $open['kj'], 'qh' => $open['qh']]);
    }

    public function msgRecord(Request $request)
    {
        $data = $request->param();
        $msg = getRecord($data, true);
        $rb = session('robot_find');
        return json(['Message' => $msg, 'isVip' => $rb['vip']]);
    }

    public function getHis(Request $request)
    {
        $this->userLogin();
        $data = $request->param();
        $msg = getRecord($data, false);
        return json(['Message' => $msg]);
    }

    public function getRecord(Request $request)
    {
        $timer = get_time_arr(['day' => getTimeList(), 'timeType' => 1]);
        $dayList = $timer['d'];
        $user = session('user_find');
        $recordList = db('record')->where('gameType', $user['gid'])->where('name', $user['wxid'])->where('type', 3)->where('dtGenerate', 'between', $dayList)->select();
        $recordList = array_reverse($recordList);
        foreach ($recordList as $k => $value) {
            $recordList[$k]['gname'] = db('rbgame')->where('gameType', $value['gameType'])->value('name');
        }
        return $recordList;
    }

    public function getHistory(Request $request)
    {
        $user = session('user_find');
        $history = db('history')->where('Code', '<>', '')->where('type', $user['gid'])->order('id desc')->limit(10)->select();
        $userVal = ['jstype' => 6, 'jsj' => 0, 'type' => $user['gid']];
        foreach ($history as $k => $value) {
            $history[$k]['fan'] = getFan($value);
            $history[$k]['dan'] = getKjDs($value);
            $history[$k]['da']  = getKjDx($value);
        }
        return $history;
    }

    public function zoushi(Request $request)
    {
        $zs = db('history')->where('Code', '<>', '')->where('type', 75)->order('id desc')->limit(20)->select();
        $zs = array_reverse($zs);
        foreach ($zs as $k => $value) {
            list($da1, $dan1, $da2, $dan2, $da3, $dan3, $da4, $dan4, $da5, $dan5, $da, $dan, $lh) = wfResult($value);
            $zs[$k]['1da'] = $da1;
            $zs[$k]['1dan'] = $dan1;
            $zs[$k]['2da'] = $da2;
            $zs[$k]['2dan'] = $dan2;
            $zs[$k]['3da'] = $da3;
            $zs[$k]['3dan'] = $dan3;
            $zs[$k]['4da'] = $da4;
            $zs[$k]['4dan'] = $dan4;
            $zs[$k]['5da'] = $da5;
            $zs[$k]['5dan'] = $dan5;
            $zs[$k]['da'] = $da;
            $zs[$k]['dan'] = $dan;
            $zs[$k]['lh'] = $lh;
            $zs[$k]['qs'] = substr($value['QiHao'], -3);
            $zs[$k]['sj'] = substr($value['dtOpen'], -5);
        }
        $this->view->assign('zs', $zs);
        return $this->view->fetch();
    }

    public function login(Request $request)
    {
        $data = $request->param();
        if ($request->isAjax(true)) {
            $user = db('rbuser')->where('UserName', $data['username'])->where('password', $data['password'])->find();
            if (is_null($user)) {
                $message = '用户不存在';
                $status = -1;
            } else {
                $status = 1;
                $message = getUserurl('index?cd', $user['code']);
                session('user_code', $user['code']);
            }
            return ['status' => $status, 'message' => $message];
        }
        $w = session('user_code');
        if ($w) {
            // $this -> redirect('login');
            $this->redirect(url('login/login2'));
        } else {
            $rb = db('robot')->where('code', $data['code'])->find();
            if ($rb) {
                session('rb_code', $data['code']);
            }
            $this->assign('rb', $rb);
            return $this->view->fetch();
        }
    }

    public function codelogin(Request $request)
    {
        $data = $request->param();
        $status = -1;
        $message = '';
        if ($request->isAjax(true)) {
            if (!$data['password']) {
                $status = -3;
                $message = '失败';
            } else {
                $user = db('rbuser')->where('code', session('cd'))->where('logincode', $data['password'])->find();
                if (is_null($user)) {
                    $status = -2;
                } else {
                    $status = 0;
                    $message = getUserurl('index?cd', $user['code']);
                    session('user_code', $user['code']);
                }
            }
        }
        return ['status' => $status, 'message' => $message];
    }

    public function setNum(Request $request)
    {
        $data = $request->param();
        if ($request->isAjax(true)) {
            $user = session('user_find');
            $user = db('rbuser')->where('id', $user['id'])->update(['numStr' => $data['str']]);
        }
        return ['status' => 1];
    }

    public function register(Request $request)
    {
        if ($request->isAjax(true)) {
            $data = $request->param();
            $rb = db('robot')->where('code', session('rb_code'))->find();
            if (is_null($rb)) {
                $message = '机器人不存在!';
                $status = -1;
            } else {
                $user = db('rbuser')->where('UserName', $data['username'])->find();
                if ($user) {
                    $message = '用户名已存在!';
                    $status = -1;
                } else {
                    $arr = user_inf(0, 0, $data['username'], $data['nickname'], $data['password'], $data['img']);
                    if ($arr['uid'] == null) {
                        $arr['uid'] = $rb['UserName'];
                    }
                    db('rbuser')->insert($arr);
                    $status = 1;
                    $message = getUserurl('index?cd', $arr['code']);
                }
            }
            return ['status' => $status, 'message' => $message];
        }
        return $this->view->fetch();
    }

    public function UpdateHeadImage()
    {
        $img = request()->domain() . '/static/xz/admin/u__chat_img' . rand(1, 40) . '.jpg';
        return $img;
    }

    public function getscorehis()
    {
        $data = $this->request->param();
        $timer = get_time_arr($data);
        $dayList = $timer['d'];
        $user = session('user_find');
        $recordList = db('record')->where('gameType', $user['gid'])->where('name', $user['wxid'])->where('chi', 0)->where('type', 'exp', ' IN (3) ')->where('dtGenerate', 'between', $dayList)->order('dtGenerate desc')->select();

        list($arr, $allQi, $yijie, $weijie) = resetOrder($recordList, true);
        return json(['list' => $arr['list']]);
    }
}
