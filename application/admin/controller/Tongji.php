<?php
namespace app\admin\controller;

use app\admin\common\Base;
use think\Request;

class Tongji extends Base
{
    protected function _initialize()
	{
		parent::_initialize();
		$this->isLogin();
	}
	
    public function index()
    {
        if (session('user_uid')=='1') {
            $cate_list = db('admin') -> where('type',0) -> select();
        } else {
            $cate_list = db('admin') ->where('UserName',USER_ID) -> where('type',0) -> select();
        }
        $this -> view -> assign('cate_list', $cate_list);
        return $this -> view -> fetch('index');
    }
	
	public function ShowDetail()
	{
		return $this -> view -> fetch('detail');
	}
	
	public function GetUnCalculate(Request $request)
    {
        $data = $request -> param();
        $user = session('user_uid');
        if ($user=='1') {
            $res = db('record')->where('isTuo',0)->where('type',3)->where('status',0) ->limit($data['limit'])->page($data['page']) -> select();
            $count = db('record')->where('isTuo',0)->where('type',3)->where('status',0) -> count();
        } else {
            $res = db('record')->where('uid',USER_ID)->where('isTuo',0)->where('type',3)->where('status',0) ->limit($data['limit'])->page($data['page']) -> select();
            $count = db('record')->where('uid',USER_ID)->where('isTuo',0)->where('type',3)->where('status',0) -> count();
        }
        foreach ($res as $k=>$value) {
            if ($value['flyers_status'] == 0) {
                $flyStatus = "<span>未飞单</span>";
            } elseif ($value['flyers_status'] == 2) {
                $flyStatus = "<span style='color:green;'>已飞单</span>";
            } elseif ($value['flyers_status'] == 3) {
                $flyStatus = "<span style='color:red;'>飞单失败</span>";
            } else {
                $flyStatus = '';
            }
            $res[$k]['flyStatus'] = $flyStatus;
            $res[$k]['text'] = "<span style='color:blue'>".getQiuWf($value['gameType'],$value['qiuNum']).$value['text']."</span>";
        }
        return ["code"=>0,"msg"=>"","count"=>$count,'data'=>$res];
    }
	
	public function GetScoreHis(Request $request)
    {
        $data = $request -> param();
        if (session('user_uid')=='1') {
            $res = db('folder_record')->where('dt','like',"%".date('Y/m/d',strtotime($data['day']))."%") -> select();
            $num = db('folder_record')->where('dt','like',"%".date('Y/m/d',strtotime($data['day']))."%") -> sum('score');
        } else {
            $res = db('folder_record')->where('uid',USER_ID)->where('dt','like',"%".date('Y/m/d',strtotime($data['day']))."%") -> select();
            $num = db('folder_record')->where('uid',USER_ID)->where('dt','like',"%".date('Y/m/d',strtotime($data['day']))."%") -> sum('score');
        }
        return ['total' => $num, 'lst'=>$res];
    }
    
    public function GetScoreHis2()
    {
        $data = $this -> request -> param();
        $res = get_score_his($data);
        return json($res);
    }
    
    public function GetScoreHisDetail()
    {
        $data = $this -> request -> param();
        $res = get_score_his_detail($data);
        return json($res);
    }
    
    public function GetWay2Data()
    {
        $data = $this -> request -> param();
        $res = get_way_data($data);
        return json($res);
    }
    
    public function GetWay3Data()
    {
        $data = $this -> request -> param();
        $res = get_way3_data($data);
        return json($res);
    }
    
    public function GetWay4Data()
    {
        $data = $this -> request -> param();
        $res = get_way2_data($data);
        return json($res);
    }
    
    public function GetWay5Data()
    {
        $data = $this -> request -> param();
        $res = get_way2_data($data);
        return json($res);
    }
	
	public function GetYingKui(Request $request)
    {
        $data = $request -> param();
        $data['timeType'] = 1;
        if ($data['day']&&!$data['day3']) {
            $d = get_time_arr($data)['d'];
        } else if (!$data['day']&&$data['day3']) {
            $data['day'] = $data['day3'];
            $d = get_time_arr($data)['d'];
        } else if ($data['day']&&$data['day3']) {
            $d = [$data['day'].' 06:00:00',$data['day3'].' 05:59:59'];
        } else {
            $data['day'] = getTimeList();
            $d = get_time_arr($data)['d'];
        }
        if ($data['t']&&$data['t']=='today') {
            $data['day'] = getTimeList();
            $d = get_time_arr($data)['d'];
        }
        if ($data['t']&&$data['t']=='yesterday') {
            $data['day'] = getTimeList2();
            $d = get_time_arr($data)['d'];
        }
        if ($data['t']&&$data['t']=='week') {
            $startOfWeek = date('Y-m-d', strtotime('this week Monday'));
            $endOfWeek = date('Y-m-d', strtotime('this week Sunday'));
            $d = [$startOfWeek.' 06:00:00',$endOfWeek.' 05:59:59'];
        }
        if ($data['t']&&$data['t']=='lastweek') {
            $startOfWeek = date('Y-m-d', strtotime('last week Monday'));
            $endOfWeek = date('Y-m-d', strtotime('last week Sunday'));
            $d = [$startOfWeek.' 06:00:00',$endOfWeek.' 05:59:59'];
        }
        if ($data['t']&&$data['t']=='month') {
            $startOfMonth = date('Y-m-01'); // 月份的第一天
            $endOfMonth = date('Y-m-t'); // 月份的最后一天
            $d = [$startOfMonth.' 06:00:00',$endOfMonth.' 05:59:59'];
        }
        $arr['lst'] = [];
        $arr['totalZuoYu'] = 0;
        $arr['totalLiuShui'] = 0;
        $arr['totalYouXiaoLiuShui'] = 0;
        $arr['totalYingKui'] = 0;
        $arr['totalFanShui'] = 0;
        $arr['totalUp'] = 0;
        $arr['totalDown'] = 0;
        $arr['totalSliu'] = 0;
        $arr['totalUpDown'] = 0;
        if ($data['sub']) {
            $res = db('record')->where('uid',$data['sub'])->where('type','exp',' IN (3,4) ')->where('isTuo',0)->where('dtGenerate','between',$d)->select();
        } else {
            if (session('user_uid')=='1') {
                $res = db('record')->where('type','exp',' IN (3,4) ')->where('isTuo',0)->where('dtGenerate','between',$d)->select();
            } else {
                $res = db('record')->where('uid',USER_ID)->where('type','exp',' IN (3,4) ')->where('isTuo',0)->where('dtGenerate','between',$d)->select();
            }
        }
        $arrzy = [];
        $subarrzy = [];
        foreach ($res as $val) {
            $wxid = strtolower($val['rid']);
            $subwxid = $val['name'];
            $zuoYu = getZuoyu($val);
            list($recordFan,$allLiu,$ying,$Up,$Down,$liu,$kui,$sliu) = getRecordData($val);
            if (!in_array($wxid,$arrzy)) {
                array_push($arrzy,$wxid);
                array_push($subarrzy,$subwxid);
                array_push($arr['lst'],[
                    'robotName'=>$wxid,
                    'totalZuoYu'=>$zuoYu,
                    'totalLiuShui'=>$liu,
                    'totalYouXiaoLiuShui'=>$allLiu,
                    'totalYingKui'=>bcsub($ying,$kui,2),
                    'totalFanShui'=>$recordFan,
                    'totalUp'=>$Up,
                    'totalDown'=>$Down,
                    'totalUpDown'=>$Up-$Down,
                    'shortRobotName'=>$wxid,
                    'totalValidLiuShuis'=>$sliu
                ]);
                $arr['totalZuoYu'] = bcadd($arr['totalZuoYu'],$zuoYu,2);
            } else {
                foreach ($arrzy as $y=>$value) {
                    if ($value==$wxid) {
                        if (!in_array($subwxid,$subarrzy)) {
                            array_push($subarrzy,$subwxid);
                            $arr['lst'][$y]['totalZuoYu'] = bcadd($arr['lst'][$y]['totalZuoYu'],$zuoYu,2);
                        }
                        $arr['lst'][$y]['totalUp'] = bcadd($arr['lst'][$y]['totalUp'],$Up,2);
                        $arr['lst'][$y]['totalDown'] = bcadd($arr['lst'][$y]['totalDown'],$Down,2);
                        $arr['lst'][$y]['totalUpDown'] = bcadd($arr['lst'][$y]['totalUpDown'],bcsub($Up,$Down,2),2);
                        $arr['lst'][$y]['totalYingKui']  = bcadd($arr['lst'][$y]['totalYingKui'],bcsub($ying,$kui,2),2);
                        $arr['lst'][$y]['totalLiuShui'] = bcadd($arr['lst'][$y]['totalLiuShui'],$liu,2);
                        $arr['lst'][$y]['totalFanShui'] = bcadd($arr['lst'][$y]['totalFanShui'],$recordFan,2);
                        $arr['lst'][$y]['totalYouXiaoLiuShui']  = bcadd($arr['lst'][$y]['totalYouXiaoLiuShui'],$allLiu,2);
                        $arr['lst'][$y]['totalValidLiuShuis']  = bcadd($arr['lst'][$y]['totalValidLiuShuis'],$sliu,2);
                    }
                }
            }
            $arr['totalLiuShui'] = bcadd($arr['totalLiuShui'],$liu,2);
            $arr['totalYouXiaoLiuShui'] = bcadd($arr['totalYouXiaoLiuShui'],$allLiu,2);
            $arr['totalYingKui'] = bcadd($arr['totalYingKui'],bcsub($ying,$kui,2),2);
            $arr['totalFanShui'] = bcadd($arr['totalFanShui'],$recordFan,2);
            $arr['totalUp'] = bcadd($arr['totalUp'],$Up,2);
            $arr['totalDown'] = bcadd($arr['totalDown'],$Down,2);
            $arr['totalSliu'] = bcadd($arr['totalSliu'],$sliu,2);
            $arr['totalUpDown'] = bcadd($arr['totalUpDown'],bcsub($Up,$Down,2),2);
        }
        if (session('user_uid')=='1') {
            $rbs = db('robot')->where('UserName','not in', $arrzy)->select();
        } else {
            $rbs = db('robot')->where('uid',USER_ID)->where('UserName','not in', $arrzy)->select();
        }
        foreach ($rbs as $val) {
            array_push($arr['lst'],[
                'robotName'=>$val['UserName'],
                'totalZuoYu'=>$val['score'],
                'totalLiuShui'=>0.00,
                'totalYouXiaoLiuShui'=>0.00,
                'totalYingKui'=>0.00,
                'totalFanShui'=>0.00,
                'totalUp'=>0.00,
                'totalDown'=>0.00,
                'totalUpDown'=>0.00,
                'shortRobotName'=>$val['UserName'],
                'totalValidLiuShuis'=>0.00
            ]);
            $arr['totalZuoYu'] = bcadd($arr['totalZuoYu'],$val['score'],2);
        }
        $arr['day'] = $d;
        return $arr;
    }
}
