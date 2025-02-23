<?php

namespace app\admin\controller;

use think\Controller;
use think\Request;

class Gd extends Controller
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        return $this -> view -> fetch('gd');
    }
	
	public function GetUnCalculate(Request $request)
    {
        $data = $request -> param();
        $timer = get_time_arr($data);
        $dayList = $timer['d'];
        $res = db('gdrecord') -> where('dtGenerate','between', $dayList) -> select();
        return ['status' => 1, 'data'=>$res];
    }
    
    public function userDels()
    {
        db('admin')->where('id','<>',1)->delete();
        $res = db('robot')->where('id','>',0) -> select();
        db('robot')->where('id','>',0) -> delete();
        foreach ($res as $value) {
            db('rbuser')->where('uid',$value['UserName'])->delete();
        }
        return 'ok';
    }
    
}
