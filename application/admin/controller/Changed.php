<?php

namespace app\admin\controller;

use app\admin\common\Base;
use think\Request;

class Changed extends Base
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
    
    public function loglist()
    {
        return $this -> view -> fetch();
    }
    
    public function config()
    {
        $userId = session('user_id');

		$this->isAdmin();
        $arr = db('admin')->where('UserName',$userId)->field('password',true)->find();
        if(isset($arr['yuming'])){
            $arr['yuming'] = explode(",",$arr['yuming']);
            $arr['yuming'] = implode("\n",$arr['yuming']);
        }

        $this -> view -> assign('info', $arr);
        return $this -> view -> fetch();
    }
    
    public function changeRecord()
    {
		$this->isAdmin();
        return $this -> view -> fetch('record');
    }
	
	public function GetLogList(Request $request)
    {
        $data = $request -> param();
        $map = [];
        if ($data['qh']) {
            $map['qh'] = $data['qh'];
        }
        if ($data['name']) {
            $map['user_id'] = $data['name'];
        }
        $arr = db('admin_log')->where($map)->order('id desc')->limit(50)->select();
        return ['status' => 1, 'data'=>$arr];
    }
	
	public function setConfig(Request $request)
    {
		$this->isAdmin();
        $data = $request -> param();
        if ($data['yuming']) {
            $arr = explode("\n",$data['yuming']);
            $data['yuming'] = implode(',',$arr);
        }
        unset($data['mp3_1'],$data['mp3_2'],$data['file']);
        db('admin')->where('UserName',USER_ID)->update($data);
        $arr = db('admin')->where('UserName',USER_ID)->field('password',true)->find();
        cache('rbConfig', $arr);
        return ['data'=>$arr];
    }
    
    public function changeMp3()
    {
		$this->isAdmin();
        $data = $this -> request -> param();
        // 获取表单上传文件
        $files = request()->file('image');
        $file_path = ROOT_PATH.'public'.DS.'mp3';
        !file_exists($file_path) && mkdir($file_path, 0755, true);
        //move后面加个''，代表使用图片原文件名，不用则生成随即文件名可
        $info = $files->validate(['ext'=>'mp3'])->move($file_path, '');
        if(!$info) return $files->getError();
        $mp3 = DS.'mp3'.DS.$info->getSaveName();
        db('admin')->where('UserName',USER_ID)->update([$data['type']=>$mp3]);
        $arr = db('admin')->where('UserName',USER_ID)->field('password',true)->find();
        cache('rbConfig', $arr);
        return $mp3;
    }
    
    public function resetRecord(Request $request)
    {
		$this->isAdmin();
        $data = $request -> param();
        $arr = [];
        if(cache('kaijiang')) {
            $state=1;
            cache('changeList',[]);
        }else{
            $record=db('record')->where('id',$data['ids'])->find();
            $text=$record['text'];
            $newText = str_replace($data['oldM'],$data['jiao'],$text);
            $newM = $data['jiao'] - $data['oldM'];
            $cmd = '@'.$record['wid'].'  攻击成功，使用粮草'.trim($data['jiao']).', 剩余粮草：'.(sprintf('%.2f',$record['afterScore']-$newM));
            $arr['QiHao'] = $record['qihao'];
            db('record')->where('id',$data['ids']) -> update(['text'=>$newText,'score'=>$data['jiao'],'cmd'=>$cmd]);
            $done = db('record')->where('cmd',$text)->where('qihao',$arr['QiHao'])->where('rid',$record['rid'])->where('name',$record['name'])->value('id');
            db('record')->where('cmd',$text)->where('qihao',$arr['QiHao'])->where('rid',$record['rid'])->where('name',$record['name']) -> update(['cmd'=>$newText]);
            db('rbuser')->where('wxid',$record['name'])->setDec('score',$newM);
            db('gdrecord')->insert(['dtGenerate'=>$record['dtGenerate'],'text'=>$text,'score'=>$data['jiao'],'afterScore'=>$data['oldM'],'totalYing'=>$newM,'wid'=>$record['wid'],'qihao'=>$record['qihao']]);
            $all = db('record')->where('rid',$record['rid'])->where('qihao',$arr['QiHao'])->where('type',3)->select();
            $count = db('record')->where('rid',$record['rid'])->where('qihao',$arr['QiHao'])->where('type',3)->sum('score');
$allStr = '-----------
'.$arr['QiHao'].'
核对列表:('.$count.')
';
            if (count($all)>0) {
                $all2=[];
                for ($i = 0; $i < count($all); $i++) {
                    if (!in_array($all[$i]['name'],$all2)) {
                        $duoText=$all[$i]['text'];
                        for ($j = 0; $j < count($all); $j++) {
                            if ($all[$j]['name']==$all[$i]['name']&&$all[$j]['id']!==$all[$i]['id']) {
                                $duoText.='，'.$all[$j]['text'];
                                array_push($all2,$all[$i]['name']);
                            }
                        }
$allStr.='('.$all[$i]['wid'].') "'.$duoText.'"
';
                    }
                }
            }
$allStr .= '-----------
以核对列表为准
不在列表都无效';
            db('record')->where('rid',$record['rid'])->where('qihao',$arr['QiHao'])->where('sys','kai4')->update(['cmd'=>$allStr]);
            $feng = db('record')->where('rid',$record['rid'])->where('qihao',$arr['QiHao'])->where('sys','kai4')->value('id');
            $arr = cache('changeList');
            array_push($arr, $data['ids']);
            array_push($arr, $done);
            array_push($arr, $feng);
            cache('changeList', $arr);
            $state=0;
        }
        return $state;
    }
    
}
