<?php
namespace app\admin\controller;

use app\admin\common\Base;
use think\Request;

class Game extends Base
{
    protected function _initialize()
	{
		parent::_initialize();
		$this->isLogin();
		$this->isAdmin();
	}
	
    public function index()
    {
        return $this -> view -> fetch();
    }
    
    public function addEdit(Request $request)
    {
        $data = $request -> param();
        $info = $data['id']?db('rbgame')->where('id',$data['id']) -> find():'';
        $res = ['a','b','c','d'];
        foreach ($res as $value) {
            if ($info) {
                $tepl = db('rbwppl')->where('gameType',$info['gameType'])->where('type',$value)->where('name','te')->find();
                $dxpl = db('rbwppl')->where('gameType',$info['gameType'])->where('type',$value)->where('name','dx')->find();
                $info['peilv'.$value.'te'] = $tepl['peilv'];
                $info['peilv'.$value.'dx'] = $dxpl['peilv'];
            }
        }
        $this -> view -> assign('info', $info);
        return $this -> view -> fetch('form');
    }
    
    public function GetGameList(Request $request)
    {
        $res = db('rbgame') -> select();
        foreach ($res as $k=>$value) {
            $res[$k]['txtStatus'] = $res[$k]['status']==1 ? "<span style='color:green;'>正常</span>" : "<span style='color:red;'>关闭</span>";
            $res[$k]['jsj'] = $res[$k]['qiuNum']==1 ? "<span style='color:blue;'>相拼</span>" : "<span style='color:green;'>相加</span>";
            $res[$k]['te'] = $res[$k]['hasTe']==1 ? "<span style='color:green;'>显示</span>" : "<span style='color:red;'>隐藏</span>";
			$res[$k]['teModel'] = $res[$k]['teModel']==1 ? "<span style='color:green;'>模型二</span>" : "<span style='color:red;'>模型一</span>";
            $res[$k]['key'] = $res[$k]['hasKey']==1 ? "<span style='color:green;'>显示</span>" : "<span style='color:red;'>隐藏</span>";
            $res[$k]['select'] = $res[$k]['hasSelect']==1 ? "<span style='color:green;'>是</span>" : "<span style='color:red;'>否</span>";
        }
        return ["code"=>0,"msg"=>"","count"=>count($res),'data'=>$res];
    }
    
    public function Setwp()
    {
        $data = $this -> request -> param();
        if ($data['id']) {
            if(!isset($data['status'])){
                $data['status'] = 0;
            }
            if(!isset($data['hasTe'])){
                $data['hasTe'] = 0;
            }
            if(!isset($data['hasKey'])){
                $data['hasKey'] = 0;
            }
            if(!isset($data['hasSelect'])){
                $data['hasSelect'] = 0;
            }
			if(!isset($data['teModel'])){
                $data['teModel'] = 0;
            }
            $data['createTime'] = date('Y-m-d H:i:s');
            $data['updateTime'] = date('Y-m-d H:i:s');
            if (isset($data['gameType'])) {
                $data = $this->gamePl($data);
            }
            db('rbgame')->update($data);
            $status = 1;
            $message = '成功';
        } else {
            $rb = db('rbgame')->where(['name'=>$data['name'],'gameType'=>$data['gameType']])->find();
            if ($rb) {
                return ['status'=>0,'message'=>"彩种已存在"];
            }
            $data['createTime'] = date('Y-m-d H:i:s');
            $data['updateTime'] = date('Y-m-d H:i:s');
            $data = $this->gamePl($data);
            db('rbgame')->insert($data);
        }
        $game = db('rbgame')->where('status',1)->order('sort')->select();
        cache('gameList',$game);
        return ['status'=>1,'message'=>"成功"];
    }
    
    public function gameDel()
    {
        if ($this -> request -> isAjax()) {
            $data = $this -> request -> param();
            db('rbgame')->where('id',$data['id'])->delete();
            $game = db('rbgame')->where('status',1)->order('sort')->select();
            cache('gameList',$game);
            return 'ok';
        }
    }
    
    public function gamePl($data)
    {
        $res = ['a','b','c','d'];
        foreach ($res as $value) {
            $tepl = db('rbwppl')->where('gameType',$data['gameType'])->where('type',$value)->where('name','te')->find();
            $dxpl = db('rbwppl')->where('gameType',$data['gameType'])->where('type',$value)->where('name','dx')->find();
            if ($tepl) {
                db('rbwppl')->where(['gameType'=>$data['gameType'],'type'=>$value,'name'=>'te'])->update(['peilv'=>$data['peilv'.$value.'te']]);
            } else {
                db('rbwppl')->insert(['gameType'=>$data['gameType'],'type'=>$value,'peilv'=>$data['peilv'.$value.'te'],'name'=>'te']);
            }
            if ($dxpl) {
                db('rbwppl')->where(['gameType'=>$data['gameType'],'type'=>$value,'name'=>'dx'])->update(['peilv'=>$data['peilv'.$value.'dx']]);
            } else {
                db('rbwppl')->insert(['gameType'=>$data['gameType'],'type'=>$value,'peilv'=>$data['peilv'.$value.'dx'],'name'=>'dx']);
            }
            unset($data['peilv'.$value.'te']);
            unset($data['peilv'.$value.'dx']);
        }
        return $data;
    }
}
