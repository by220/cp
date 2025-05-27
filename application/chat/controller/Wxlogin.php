<?php

namespace app\chat\controller;

use app\admin\common\Base;
use think\Controller;
use think\Request;
use think\Session;

class Wxlogin extends Controller
{

    public function index() {
        $wechatOauth = new WechatOauth();
        
        $memberId = input('get.member_id');
     
        $code = input('get.code');
        // 调用获取用户信息方法并传入授权码参数
        $wxuserInfo = $wechatOauth->getUserAccessUserInfo($code,$memberId);
        // 处理获取到的用户信息
        if (isset($wxuserInfo['code']) && $wxuserInfo['code']== 0) {
            // 微信授权失败，可能是用户拒绝授权或其他原因
            // 在这里进行错误处理
            echo '登录失败';exit;
        } else {
            // 获取用户信息成功，可以在这里进行相关操作
         //   dump($userInfo);
            $wxid = $wxuserInfo['openid'].'-'.$memberId;
            $userinfo = db('rbuser')->where(['wxid'=>$wxid,'uid'=>$memberId])->find();
            if($userinfo){
                $url = '/chat/index/index?cd='.$userinfo['code'].'&cn='.$memberId;
                Header("Location: $url");
            }else{
                $user = db('robot')->where('UserName', $memberId)->find();
                if(!$user){
                      echo '登录失败';exit;
                }
                $parsedUrl = parse_url($wxuserInfo['headimgurl']);
                $arr = [
                    'UserName' => rand_str(6),
                    'password' => '123456',
                    'dtExpired' => time(),
                    'isrobot' => 0,
                    'NickName' => $wxuserInfo['nickname'],
                    'imgName' => $wxuserInfo['headimgurl'],
                    'code' => strtolower(rand_str(32)),
                    'wxid' => $wxid,
                    'isauto' => 0,
                    'uid' => $user['UserName'],
                    'PeiLv' => isset($user['PeiLv']) ? $user['PeiLv'] : 0,
                    'FanShui' => isset($user['FanShui']) ? $user['FanShui'] : 0,
                    'logincode' => mt_rand(1000, 9999),
                    'tuoMin' => 30,
                    'tuoMax' => 300
                ];
                $res = db('rbuser')->insert($arr); 
                $url = '/chat/index/index?cd='.$arr['code'].'&cn='.$memberId;
                Header("Location: $url");
            }
           
        
        }
        
    }

}