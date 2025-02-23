<?php

namespace Flyers;


use GuzzleHttp\Exception\RequestException;
use Kszny\Ks;
use GuzzleHttp\Client;
use GuzzleHttp\Cookie\CookieJar;
use QL\QueryList;
use think\Db;
use think\Exception;
use think\exception\PDOException;
use think\Log;
use think\response\Json;
use think\Cache;

class K28{
    protected $host = "https://5715697936-lh.for9bond.com/";
    protected $verify_code_url = "imgcode.php?act=init";
    // protected $login_url = "Login/?t=login";
    protected $login_url = "uxj/login.php";

    protected $userinfo_url = "uxj/userinfo.php";
    protected $make_url = "uxj/makelib.php";
    protected $gids = 131;
    protected $verify_code_url2 = "code";
    protected $login_url2 = "login";
    protected $userinfo_url2 = "member/accounts";
    protected $make_url2 = "member/bet";
    protected $verify_code_url3 = "Free/VCode";
    protected $login_url3 = "user/login";
    protected $userinfo_url3 = "user/getmoneyinfo";
    protected $make_url3 = "comgame/setneworder";
    
    // WEOROCBS
    // let tokenstr=this.userInfo.Uuid+this.userInfo.Sid+this.timestamp+this.qwer   md55

    public function __construct($config = array()){
        if(isset($config) && isset($config['host']) && $config['host'] != ""){
            $this->host = $config['host'];
        }
    }

    /**
     * 获取图片验证码
     * @param $id
     * @return array|\think\response\Json
     */
    public function getImgcode($id = "",$wp){
        if ($id == "")
            return ['bOK'=>1,'Message'=>"系统异常"];
        $cookie_path = ROOT_PATH . "flyers/cookie/{$id}.txt"; //cookie文件保存的路径 当前路径下的cookie目录
        $file_path = ROOT_PATH . "flyers/images/{$id}.jpg";
        try{
            if($wp['code']=='k28'){
                $url = $this->host."?t=".time();
                $Sch = curl_init();

                curl_setopt($Sch, CURLOPT_URL, $url);
                curl_setopt($Sch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER, 0);
                curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST, 0);
                curl_setopt($Sch, CURLOPT_HEADER, 1);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
                curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
                $headers = array(
                    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
                );
                curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
                $response = curl_exec($Sch);
                curl_close($Sch);
            }
           

            // 获取验证码
            $Sch = curl_init();
    		curl_setopt($Sch, CURLOPT_POST, 0);
            if ($wp['code']=='k28' || $wp['code']=='gy') {
                $url = $this->host.$this->verify_code_url;
        		curl_setopt($Sch, CURLOPT_URL, $url);
            } elseif ($wp['code']=='hh' || $wp['code']=='yyz') {
        		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->verify_code_url3);
            } else {
        		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->verify_code_url2."?_=".time());
            }
    		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
    		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
    		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
    		curl_setopt($Sch, CURLOPT_HEADER,1);
            curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
            // 使用已保存的cookie
    		curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path);
            curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
            $headers = array(
                'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
                // 'Referer: '.$this->host,
                // 'Origin: '.$this->host,
            );
            curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
    		$file_content = curl_exec($Sch);
    		curl_close($Sch);
    		list($header, $body) = explode("\r\n\r\n", $file_content, 2);
    		$downloaded_file = fopen($file_path, 'w');
    		fwrite($downloaded_file, $body);
    		fclose($downloaded_file);
    		if(file_exists($file_path)){
                return ['bOK'=>0,'Message'=>'验证码获取成功'];
            }else{
                return ['bOK'=>1,'Message'=>"验证码获取失败"];
            }
        }catch(\Exception $e){
            return ['bOK'=>1,'Message'=>$e->getMessage()];
        }
    }

    public function login($id = "",$data=array(),$rb,$wp){
        $result = [];
        if ($id == "")
            return ['bOK'=>1,'Message'=>"系统异常","Data" => $result];
        if ($data['username'] == null || $data['password'] == null || $data['username'] == "" || $data['password'] == "")
            return ['bOK'=>1,'Message'=>"账号密码不能为空","Data" => $result];
        if ($wp['code']=='yyz'||$wp['code']=='hh') {
            
        } else {
            //获取验证码
            $cookie_path = ROOT_PATH . "flyers/cookie/{$id}.txt";
            $getImgcode = $this->getImgcode($id,$wp);
            if ($getImgcode['bOK'] == 0){
                $ks = new Ks();
                $image_file             = ROOT_PATH . "flyers/images/{$id}.jpg";
                $base64_image_content   = 'data:image/jpg;base64,'.base64_encode(file_get_contents($image_file));
                $code = $ks->Post_base64($image_file);
                if ($code == false || $code == ""){
                    return ['bOK'=>1,'Message'=>"验证码解析失败","Data" => $result];
                }
            }else return $getImgcode;
        }
        if ($wp['code']=='k28' || $wp['code']=='gy') {
            try {
                $Sch = curl_init();
        		curl_setopt($Sch, CURLOPT_POST, 1) ;
                $url = $this->host.$this->login_url;
        		curl_setopt($Sch, CURLOPT_URL, $url);
        		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
        		curl_setopt($Sch, CURLOPT_HEADER,1);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
                $postData = ['xtype'=>'login','pass'=>'','username'=>$data['username'],'password'=>$data['password'],'code'=>$code];
        		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query($postData));
        		curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
        		curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path); 
        		$file_content = curl_exec($Sch);
        		curl_close($Sch);
        		list($header, $body) = explode("\r\n\r\n", $file_content, 2);
                if (strpos($body, '验证码') !== false) {
                    return ['bOK'=>1,'Message'=>"验证码不正确，请重新登录","Data" => $body];
                }
                if (strpos($body, 'xy.php') !== false){
                    return ['bOK'=>0,'Message'=>"登陆成功","Data" => json_decode($body,true)];
                }else{
                    return ['bOK'=>1,'Message'=>"登陆失败，可能账号密码错误","Data" => $body];
                }
            }catch (Exception $exception){
                return ['bOK'=>1,'Message'=>"登录超时","Data" => $result];
            }
        } elseif ($wp['code']=='hh' || $wp['code']=='yyz') {
            try {
                $Sch = curl_init();
        		curl_setopt($Sch, CURLOPT_POST, 1) ;
        		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->login_url3);
        		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
        		curl_setopt($Sch, CURLOPT_HEADER,1);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
        		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query(['username'=>$data['username'],'password'=>$data['password']]));
        		$headers = array(
                    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
                );
                curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
        		$file_content = curl_exec($Sch);
        		curl_close($Sch);
        		list($header, $body) = explode("\r\n\r\n", $file_content, 2);
                if (strpos($body, '验证码') !== false) {
                    return ['bOK'=>1,'Message'=>"验证码不正确，请重新登录","Data" => $body];
                }
                if (strpos($body, '"Sid') !== false){
                    $returnData = json_decode($body,true);
                    $msg = json_decode($returnData['Msg'],true);
                    cache('uuid'.$id,$msg['Uuid']);
                    cache('sid'.$id,$msg['Sid']);
                    return ['bOK'=>0,'Message'=>"登陆成功","Data" => json_decode($body,true)];
                }else{
                    return ['bOK'=>1,'Message'=>"登陆失败，可能账号密码错误","Data" => $body];
                }
            }catch (Exception $exception){
                return ['bOK'=>1,'Message'=>"登录超时","Data" => $result];
            }
        } else {
            try {
                $Sch = curl_init();
        		curl_setopt($Sch, CURLOPT_POST, 1) ;
                $url = $this->host.$this->login_url2;
        		curl_setopt($Sch, CURLOPT_URL, $url);
        		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
        		curl_setopt($Sch, CURLOPT_HEADER,1);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
                $postData = ['account'=>$data['username'],'password'=>$data['password'],'code'=>(int)$code,'type'=>1];
        		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query($postData));
        		curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
        		curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path);
                $headers = array(
                    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
                    // 'Referer: '.$this->host.'uxj/?com=2906'
                );
                curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers); 
        		$file_content = curl_exec($Sch);
        		curl_close($Sch);
            }catch (Exception $exception){
                return ['bOK'=>1,'Message'=>"登录超时","Data" => $result];
            }
            if (strpos($file_content, 'member/') !== false){
                return ['bOK'=>0,'Message'=>"登陆成功","Data" => json_decode($file_content,true)];
            }else{
                return ['bOK'=>1,'Message'=>"登陆失败，可能账号密码错误","Data" => $result];
            }
            if (strpos($file_content, 'e=3') !== false) {
                return ['bOK'=>1,'Message'=>"验证码不正确，请重新登录","Data" => $result];
            }
            if (strpos($file_content, 'e=4') !== false) {
                return ['bOK'=>1,'Message'=>"账号或者密码不正确，请重新登录","Data" => $result];
            }

        }
    }
    
    public function subLogin($id = "",$data = [],$rb){
        $result = [];
        if ($id == "")
            return ['bOK'=>1,'Message'=>"系统异常","Data" => $result];
        if ($rb['feidanid']=='12'||$rb['feidanid']=='13') {
            try {
                $Sch = curl_init();
        		curl_setopt($Sch, CURLOPT_POST, 1) ;
        		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->login_url3);
        		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
        		curl_setopt($Sch, CURLOPT_HEADER,1);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
        		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query(['username'=>$data['username'],'password'=>$data['password']]));
        		$headers = array(
                    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
                );
                curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
        		$file_content = curl_exec($Sch);
        		curl_close($Sch);
        		list($header, $body) = explode("\r\n\r\n", $file_content, 2);
                if (strpos($body, '验证码') !== false) {
                    return ['bOK'=>1,'Message'=>"验证码不正确，请重新登录","Data" => $body];
                }
                if (strpos($body, '"Sid') !== false){
                    $returnData = json_decode($body,true);
                    $msg = json_decode($returnData['Msg'],true);
                    cache('subuuid'.$id,$msg['Uuid']);
                    cache('subsid'.$id,$msg['Sid']);
                    return ['bOK'=>0,'Message'=>"登陆成功","Data" => json_decode($body,true)];
                }else{
                    return ['bOK'=>1,'Message'=>"登陆失败，可能账号密码错误","Data" => $body];
                }
            }catch (Exception $exception){
                return ['bOK'=>1,'Message'=>"登录超时","Data" => $result];
            }
        } else {
            //获取验证码
            $cookie_path = ROOT_PATH . "flyers/cookie/{$id}.txt";
            $getImgcode = $this->getImgcode($id,['code'=>'n28']);
            if ($getImgcode['bOK'] == 0){
                $ks = new Ks();
                $image_file             = ROOT_PATH . "flyers/images/{$id}.jpg";
                $base64_image_content   = 'data:image/jpg;base64,'.base64_encode(file_get_contents($image_file));
                $code = $ks->Post_base64($base64_image_content);
                if ($code == false || $code == ""){
                    return ['bOK'=>1,'Message'=>"验证码解析失败","Data" => $result];
                }
            }else return $getImgcode;
            try {
                $Sch = curl_init();
        		curl_setopt($Sch, CURLOPT_POST, 1) ;
        		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->login_url2);
        		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
        		curl_setopt($Sch, CURLOPT_HEADER,1);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
        		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query(['account'=>$data['username'],'password'=>$data['password'],'code'=>$code,'type'=>1]));
        		curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
        		curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path); 
        		$file_content = curl_exec($Sch);
        		curl_close($Sch);
            }catch (Exception $exception){
                return ['bOK'=>1,'Message'=>"登录超时","Data" => $result];
            }
            if (strpos($file_content, 'e=3') !== false) {
                return ['bOK'=>1,'Message'=>"验证码不正确，请重新登录","Data" => $result];
            }
            if (strpos($file_content, 'e=4') !== false) {
                return ['bOK'=>1,'Message'=>"账号或者密码不正确，请重新登录","Data" => $result];
            }
            if (strpos($file_content, 'member/') !== false){
                return ['bOK'=>0,'Message'=>"登陆成功","Data" => json_decode($file_content,true)];
            }else{
                return ['bOK'=>1,'Message'=>"登陆失败，可能账号密码错误","Data" => $result];
            }
        }
    }

    public function getInfo($id,$rb,$wp){
        //开始请求测试
        $cookie_path = ROOT_PATH . "flyers/cookie/{$id}.txt";
        if ($wp['code']=='k28' || $wp['code']=='gy') {
            try {
                $Sch = curl_init();
        		curl_setopt($Sch, CURLOPT_POST, 1) ;
        		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->userinfo_url);
        		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
        		curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
        		curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path); 
        		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query(['xtype'=>'getusermoney']));
        		$file_content = curl_exec($Sch);
        		curl_close($Sch);
            } catch (Exception $e) {
                // 其他类型的异常
                echo '发生异常：' . $e->getMessage();
            }
            $file_content = json_decode($file_content,true);
            if ($file_content && count($file_content)>0){
                return ['bOK'=>0,'Message'=>"获取成功","Data" => $file_content];
            }else{
                return ['bOK'=>1,'Message'=>"已掉线，请重新登录！","Data" => $file_content];
            }
        } elseif ($wp['code']=='hh' || $wp['code']=='yyz') {
            try {
                $Sch = curl_init();
        		curl_setopt($Sch, CURLOPT_POST, 1) ;
        		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->userinfo_url3);
        		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
        		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query(['uuid'=>cache('uuid'.$id),'sid'=>cache('sid'.$id)]));
        		$headers = array(
                    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
                );
                curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
        		$file_content = curl_exec($Sch);
        		curl_close($Sch);
            } catch (Exception $e) {
                // 其他类型的异常
                echo '发生异常：' . $e->getMessage();
            }
            $file_content = json_decode($file_content,true);
            if ($file_content['Status']==true){
                return ['bOK'=>0,'Message'=>"获取成功","Data" => json_decode($file_content['Msg'],true)];
            }else{
                return ['bOK'=>1,'Message'=>"已掉线，请重新登录！","Data" => $file_content];
            }
        } else{
            try {
                $Sch = curl_init();
        		curl_setopt($Sch, CURLOPT_POST, 1) ;
        		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->userinfo_url2);
        		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
        		curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
        		curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path); 
        		$file_content = curl_exec($Sch);
        		curl_close($Sch);
            } catch (Exception $e) {
                // 其他类型的异常
                echo '发生异常：' . $e->getMessage();
            }
            $file_content = json_decode($file_content,true);
            if ($file_content && count($file_content)>0){
                return ['bOK'=>0,'Message'=>"获取成功","Data" => $file_content];
            }else{
                return ['bOK'=>1,'Message'=>"已掉线，请重新登录！","Data" => ''];
            }
        }
    }

    public function getSubInfo($id,$item){
        //开始请求测试
        if ($item['feidanid']=='12'||$item['feidanid']=='13') {
            try {
                $Sch = curl_init();
        		curl_setopt($Sch, CURLOPT_POST, 1) ;
        		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->userinfo_url3);
        		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
        		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query(['uuid'=>cache('subuuid'.$id),'sid'=>cache('subsid'.$id)]));
        		$headers = array(
                    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
                );
                curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
        		$file_content = curl_exec($Sch);
        		curl_close($Sch);
            } catch (Exception $e) {
                // 其他类型的异常
                echo '发生异常：' . $e->getMessage();
            }
            $file_content = json_decode($file_content,true);
            if ($file_content['Status']==true){
                return ['bOK'=>0,'Message'=>"获取成功","Data" => json_decode($file_content['Msg'],true)];
            }else{
                return ['bOK'=>1,'Message'=>"已掉线，请重新登录！","Data" => $file_content];
            }
        } else {
            $cookie_path = ROOT_PATH . "flyers/cookie/{$id}.txt";
            try {
                $Sch = curl_init();
        		curl_setopt($Sch, CURLOPT_POST, 1) ;
        		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->userinfo_url2);
        		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
        		curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
        		curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path); 
        		$file_content = curl_exec($Sch);
        		curl_close($Sch);
            } catch (Exception $e) {
                // 其他类型的异常
                echo '发生异常：' . $e->getMessage();
            }
            $file_content = json_decode($file_content,true);
            if ($file_content && count($file_content)>0){
                return ['bOK'=>0,'Message'=>"获取成功","Data" => $file_content];
            }else{
                return ['bOK'=>1,'Message'=>"已掉线，请重新登录！","Data" => ''];
            }
        }
    }


    /**
     * 获取cookie
     * @param $cookie_path
     * @return CookieJar
     */
    private function getCookies($cookie_path){
        return new CookieJar(false,json_decode(file_get_contents($cookie_path),true));
    }

    /**
     * 保存cookie
     * @param $res
     * @param $client
     * @param $cookieJar
     * @param $cookie_path
     * @return void
     */
    private function saveCookies(&$res,&$client,&$cookieJar,$cookie_path){
        $res->getHeader('Set-Cookie');
        $cookie = $client->getConfig('cookies');
        $cookieArr = $cookie->toArray();
        file_put_contents($cookie_path, json_encode($cookieArr));
        $cookieJar = new CookieJar(false,json_decode(file_get_contents($cookie_path),true));
    }

    /**
     * php截取指定两个字符之间字符串，默认字符集为utf-8 Power by 大耳朵图图
     * @param string $begin  开始字符串
     * @param string $end    结束字符串
     * @param string $str    需要截取的字符串
     * @return string
     */

    private function cut($begin,$end,$str){
        $b = mb_strpos($str,$begin) + mb_strlen($begin);
        $e = mb_strpos($str,$end) - $b;
        return mb_substr($str,$b,$e);
    }

    public function cmdTest($cmd){
        $cmds = $this->getCmd($cmd);
        $cmds = $this->cmdConvert($cmds);
        return $cmds;
    }

    /**
     * 做单
     * @param $order_makes
     * @param $robot
     * @return int
     * @throws Exception
     * @throws PDOException
     */
    public function make($order_makes,$robot,$type,$money,$rb,$wp,$order,$xiaList){
        if ($wp['code']=='k28' || $wp['code']=='gy') {
            $body = "";
            $fly = db('rbfly')->where('uid',$robot['UserName'])->where('flyers_online',1)->find();
            $cmds = $this->getPuCmd($order['text'],$rb,$fly,$order['qiuNum']);
            $abcd = getWpType($fly,'flyers_type');
            if ($robot['type']==8&&$robot['jstype']==1) {
                $gids = '801';
            } elseif ($robot['type']==8&&$robot['jstype']==6) {
                $gids = '131';
            } elseif ($robot['type']==5&&$robot['jstype']==4) {
                $gids = '109';
            } else {
                $gids = '';
            }
            if (count($cmds['特']) > 0){
                $pstr = [];
                foreach ($cmds['特'] as $item){
                    $arr = array(
                        "pid" => $item['pid'],
                        "je" => $item['orderMoney'],
                        "name" => $item['name'],
                        "peilv1" => $item['peilv1'],
                        "classx" => $item['sname'],
                        "con" => "",
                        "bz" => rand(1,100)
                    );
                    $pstr[] = $arr;
                    unset($arr);
                }
                $id = $fly['id'];
                $cookie_path = ROOT_PATH . "flyers/cookie/{$id}.txt";
                $filed = [
                    'xtype' => "make",
                    'pstr' => json_encode($pstr),
                    "abcd" => $abcd,
                    "ab" => "A",
                    "bid" => $cmds['特'][0]['bid']
                ];
                $Sch = curl_init();
        		curl_setopt($Sch, CURLOPT_POST, 1) ;
        		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->make_url);
        		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
        		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query($filed));
        		curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
        		curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path); 
        		$headers = array(
                    'Referer: '.$this->host.'uxj/make.php?xtype=show&gids='.$gids
                );
                curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
        		$file_content = curl_exec($Sch);
        		curl_close($Sch);
                $body = json_decode($file_content,true);
            }elseif (count($cmds['番摊']) > 0){
                $pstr = [];
                foreach ($cmds['番摊'] as $item){
                    $arr = array(
                        "pid" => $item['pid'],
                        "je" => $item['orderMoney'],
                        "name" => $item['name'],
                        "peilv1" => $item['peilv1'],
                        "classx" => $item['sname']."-".$item['cname'],
                        "con" => "",
                        "bz" => rand(1,100)
                    );
                    $pstr[] = $arr;
                    unset($arr);
                }
                $id = $fly['id'];
                $cookie_path = ROOT_PATH . "flyers/cookie/{$id}.txt";
                $filed = [
                    'xtype' => "make",
                    'pstr' => json_encode($pstr),
                    "abcd" => $abcd,
                    "ab" => "A",
                    "bid" => $cmds['番摊'][0]['bid']
                ];
                $Sch = curl_init();
        		curl_setopt($Sch, CURLOPT_POST, 1) ;
        		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->make_url);
        		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
        		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query($filed));
        		curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
        		curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path);  
        		$headers = array(
                    'Referer: '.$this->host.'uxj/make.php?xtype=show&gids='.$gids
                );
                curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
        		$file_content = curl_exec($Sch);
        		curl_close($Sch);
                $body = json_decode($file_content,true);
            }
            if ($body != '' && isset($body[0]['cg']) && $body[0]['cg'] == 1){
                return 2;
            }else{
            //     if ($body[0]['err'] == '系统忙!' || $body[0]['err'] == '系统忙,请重试!'){
            //         if ($order['flyers_num'] == 5){
            //             return 0;
            //         }else{
            //             Db::name('record')->where('id',$order['id'])->update(array(
            //                 'flyers_lock' => 0,
            //                 'flyers_num' => $order['flyers_num'] + 1
            //             ));
            //             return 2;
            //         }
            //     }else{
                    return 3;
                // }
            }
        } elseif ($wp['code']=='hh' || $wp['code']=='yyz') {
            $fly = db('rbfly')->where('uid',$robot['UserName'])->where('flyers_online',1)->find();
            $abcd = getWpType($fly,'flyers_type');
            $uuid = cache('uuid'.$fly['id']);
            $sid = cache('sid'.$fly['id']);
            $timestamp = time();
            $token = md5($uuid.$sid.$timestamp.'WEOROCBS');
            $wfArr = ['1大','1小','1单','1双','1尾大','1尾小','2大','2小','2单','2双','2尾大','2尾小','3大','3小','3单','3双','3尾大','3尾小','4大','4小','4单','4双','4尾大','4尾小','5大','5小','5单','5双','5尾大','5尾小','大','小','单','双','尾大','尾小','龙','虎'];
            $wfArrId = ['5370','5371','5372','5373','5374','5375','5378','5379','5380','5381','5382','5383','5386','5387','5388','5389','5390','5391','5394','5395','5396','5397','5398','5399','5402','5403','5404','5405','5406','5407','5364','5365','5366','5367','5368','5369','5418','5419'];
            $pstr = [];
            foreach ($xiaList as $value) {
                $wf = str_replace($value['m'], "", $value['cmd']);
                $wfIndex = array_search($wf, $wfArr);
                $wfId = $wfArrId[$wfIndex];
                array_push($pstr,['id'=>(int)$wfId,'money'=>(int)$value['m']]);
            }
            $Sch = curl_init();
    		curl_setopt($Sch, CURLOPT_POST, 1) ;
    		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->make_url3);
    		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
    		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
    		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
            curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
    		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query(['uuid'=>$uuid,'roomeng'=>'twbingo','pan'=>$abcd,'sid'=>$sid,'token'=>$token,'timestamp'=>$timestamp,'arrbet'=>json_encode($pstr)]));
    		$headers = array(
                'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
            );
            curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
    		$file_content = curl_exec($Sch);
    		curl_close($Sch);
            $body = json_decode($file_content,true);
    		if ($body['Status']==1){
    		    foreach ($xiaList as $value) {
                    db("record")->where('id',$value['xiaId'])->update(array(
                        "flyers_status" => 2
                    ));
                }
                return 2;
            }else{
    		    foreach ($xiaList as $value) {
                    if ($robot['flyers_withdraw']==1) {
                        $order = db('record')->where('id',$value['xiaId'])->find();
                        $robot = db('rbuser')->where('wxid',$order['name'])->where('uid',$order['rid'])->find();
                        $admin = db('admin')->where('UserName',$order['uid'])->find();
                        db('rbuser')->where('wxid',$order['name'])->where('uid',$order['rid'])->setInc('score',$order['score']);
                        addMsg($robot,$admin,'@'.$robot['NickName'].' "'.$order['text'].'" 注单取消',$order['qihao']);
                        db('record')->where('id',$value['xiaId'])->delete();
                    } else {
                        db("record")->where('id',$value['xiaId'])->update(array(
                            "flyers_status" => 3
                        ));
                    }
    		    }
                return 3;
            }
        } else {
            $json_path = ROOT_PATH . "flyers/json/K28.json";
            $d = json_decode(file_get_contents($json_path),true)['特'];
            $fly = db('rbfly')->where('uid',$robot['UserName'])->where('flyers_online',1)->order('money desc')->select();
            $succes = false;
            foreach ($fly as $y => $item) {
                $pstr = [];
                $val = getWpType($item,'flyers_type',true);
                $tepl = db('rbwppl')->where('gameType',$order['gameType'])->where('type',$val)->where('name','te')->find();
                $dxpl = db('rbwppl')->where('gameType',$order['gameType'])->where('type',$val)->where('name','dx')->find();
                $te = $tepl['peilv'];
                $daxiao = $dxpl['peilv'];
                if ($type == '特') {
                    // foreach ($order_makes as $ma => $money) {
                    //     $ping = floor($order_makes[$ma]['orderMoney']);
                    //     if ($ping >= 1) {
                    //         $arr = array(
                    //             "gid"=>"132",
                    //             "name"=>$order_makes[$ma]['name'],
                    //             "pid"=>$order_makes[$ma]['pid'],
                    //             "con"=>'',
                    //             "bz"=>'',
                    //             "je"=>$ping,
                    //             "peilv1"=>$order_makes[$ma]['peilv1'],
                    //             "bid"=>$order_makes[$ma]['bid'],
                    //             "wf"=>$order_makes[$ma]['sname'].": ".$order_makes[$ma]['name']
                    //         );
                    //         $pstr[] = $arr;
                    //     }
                    // }
                    foreach ($order_makes as $ma => $money) {
                        $ping = floor($money);
                        if ($ping >= 1) {
                            $arr = array(
                                "game"=>"B".$order['qiuNum'],
                                "contents"=>($d[$ma]['name']<10?'0'.$d[$ma]['name']:$d[$ma]['name']),
                                "amount"=>$ping,
                                "odds"=>$te, // 19.93
                                "title"=>"第".numToChinese($order['qiuNum'])."球"
                            );
                            $pstr[] = $arr;
                        }
                    }
                } else {
                    $ping = floor($money);
                    if ($ping >= 1) {
                        $arr = array(
                            "game"=>(($type=='单'||$type=='双')?"DS".$order['qiuNum']:'DX'.$order['qiuNum']),
                            "contents"=>($type=='单'?"D":($type=='双'?"S":($type=='大'?"D":'X'))),
                            "amount"=>$ping,
                            "odds"=>$daxiao,  //1.993
                            "title"=>"第".numToChinese($order['qiuNum'])."球"
                        );
                        $pstr[] = $arr;
                    }
                }
                if (count($pstr)>0){
                    //获取期号
                    $open = cache('nowQi'.$order['gameType']);
                    $qihao = $open['QiHao'];
                    $id = $item['id'];
                    $cookie_path = ROOT_PATH . "flyers/cookie/{$id}.txt";
                    $Sch = curl_init();
            		curl_setopt($Sch, CURLOPT_POST, 1) ;
            		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->make_url2);
            		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
            		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
            		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
                    curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
                    $postData = json_encode(['lottery'=>'AULUCKY8','drawNumber'=>$qihao,'bets'=>($pstr),'fastBets'=>false,'ignore'=>false]);
            		curl_setopt($Sch, CURLOPT_POSTFIELDS, $postData);
            		curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
            		curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path); 
            		$headers = array(
                        'Content-Type: application/json'
                    );
                    curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
            		$file_content = curl_exec($Sch);
            		curl_close($Sch);
                    $body = json_decode($file_content,true);
                    if ($body != '' && $body['status'] == 0){
                        $succes = true;
                    }else if(isset($body['odds'])){
                        $Sch = curl_init();
                        curl_setopt($Sch, CURLOPT_POST, 1) ;
                        curl_setopt($Sch, CURLOPT_URL, $this->host.$this->make_url2);
                        curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
                        curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
                        curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
                        curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
                        foreach($body['odds'] as $key => $value){
                            $pstr[$key]['odds'] = $value;
                        }
                        $postData = json_encode(['lottery'=>'AULUCKY8','drawNumber'=>$qihao,'bets'=>($pstr),'fastBets'=>false,'ignore'=>false]);
                        curl_setopt($Sch, CURLOPT_POSTFIELDS, $postData);
                        curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
                        curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path); 
                        $headers = array(
                            'Content-Type: application/json'
                        );
                        curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
                        $file_content = curl_exec($Sch);
                        curl_close($Sch);
                        $body = json_decode($file_content,true);
                        if($body != '' && $body['status'] == 0){
                            $succes = true;
                        }
                    }
                }
            }
            return ($succes?2:3);
        }
    }
    
    public function subMake($order_makes,$robot,$type,$money,$rb,$order){
        if ($rb['feidanid']=='12'||$rb['feidanid']=='13') {
            $abcd = getWpType($rb,'feidantype');
            $uuid = cache('uuid'.$rb['UserName']);
            $sid = cache('sid'.$rb['UserName']);
            $timestamp = time();
            $token = md5($uuid.$sid.$timestamp.'WEOROCBS');
            $wfArr = ['1大','1小','1单','1双','1尾大','1尾小','2大','2小','2单','2双','2尾大','2尾小','3大','3小','3单','3双','3尾大','3尾小','4大','4小','4单','4双','4尾大','4尾小','5大','5小','5单','5双','5尾大','5尾小','大','小','单','双','尾大','尾小','龙','虎'];
            $wfArrId = ['5370','5371','5372','5373','5374','5375','5378','5379','5380','5381','5382','5383','5386','5387','5388','5389','5390','5391','5394','5395','5396','5397','5398','5399','5402','5403','5404','5405','5406','5407','5364','5365','5366','5367','5368','5369','5418','5419'];
            $wf = str_replace($order['score'], "", $order['text']);
            $wfIndex = array_search($wf, $wfArr);
            $wfId = $wfArrId[$wfIndex];
            $pstr = [['id'=>(int)$wfId,'money'=>$order['score']]];
            $Sch = curl_init();
    		curl_setopt($Sch, CURLOPT_POST, 1) ;
    		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->make_url3);
    		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
    		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
    		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
            curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
    		curl_setopt($Sch, CURLOPT_POSTFIELDS, http_build_query(['uuid'=>$uuid,'roomeng'=>'twbingo','pan'=>$abcd,'sid'=>$sid,'token'=>$token,'timestamp'=>$timestamp,'arrbet'=>json_encode($pstr)]));
    		$headers = array(
                'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
            );
            curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
    		$file_content = curl_exec($Sch);
    		curl_close($Sch);
            $body = json_decode($file_content,true);
    		if ($body['Status']==true){
                return 2;
            }else{
                return 3;
            }
        } else {
        $json_path = ROOT_PATH . "flyers/json/K28.json";
        $d = json_decode(file_get_contents($json_path),true)['特'];
        $succes = false;
        $pstr = [];
        $val = getWpType($rb,'feidantype',true);
        $tepl = db('rbwppl')->where('gameType',$order['gameType'])->where('type',$val)->where('name','te')->find();
        $dxpl = db('rbwppl')->where('gameType',$order['gameType'])->where('type',$val)->where('name','dx')->find();
        $te = $tepl['peilv'];
        $daxiao = $dxpl['peilv'];
        if ($type == '特') {
            // foreach ($order_makes as $ma => $money) {
            //     $ping = floor($order_makes[$ma]['orderMoney']);
            //     if ($ping >= 1) {
            //         $arr = array(
            //             "gid"=>"132",
            //             "name"=>$order_makes[$ma]['name'],
            //             "pid"=>$order_makes[$ma]['pid'],
            //             "con"=>'',
            //             "bz"=>'',
            //             "je"=>$ping,
            //             "peilv1"=>$order_makes[$ma]['peilv1'],
            //             "bid"=>$order_makes[$ma]['bid'],
            //             "wf"=>$order_makes[$ma]['sname'].": ".$order_makes[$ma]['name']
            //         );
            //         $pstr[] = $arr;
            //     }
            // }
            foreach ($order_makes as $ma => $money) {
                $ping = floor($money);
                if ($ping >= 1) {
                    $arr = array(
                        "game"=>"B".$order['qiuNum'],
                        "contents"=>($d[$ma]['name']<10?'0'.$d[$ma]['name']:$d[$ma]['name']),
                        "amount"=>$ping,
                        "odds"=>$te, // 19.93
                        "title"=>"第".numToChinese($order['qiuNum'])."球"
                    );
                    $pstr[] = $arr;
                }
            }
        } else {
            $ping = floor($money);
            if ($ping >= 1) {
                $arr = array(
                    "game"=>(($type=='单'||$type=='双')?"DS".$order['qiuNum']:'DX'.$order['qiuNum']),
                    "contents"=>($type=='单'?"D":($type=='双'?"S":($type=='大'?"D":'X'))),
                    "amount"=>$ping,
                    "odds"=>$daxiao,  //1.993
                    "title"=>"第".numToChinese($order['qiuNum'])."球"
                );
                $pstr[] = $arr;
            }
        }
        if (count($pstr)>0){
                //获取期号
                $open = cache('nowQi'.$order['gameType']);
                $qihao = $open['QiHao'];
                $id = $rb['UserName'];
                $cookie_path = ROOT_PATH . "flyers/cookie/{$id}.txt";
                $Sch = curl_init();
        		curl_setopt($Sch, CURLOPT_POST, 1) ;
        		curl_setopt($Sch, CURLOPT_URL, $this->host.$this->make_url2);
        		curl_setopt($Sch, CURLOPT_RETURNTRANSFER,1);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYPEER,0);
        		curl_setopt($Sch, CURLOPT_SSL_VERIFYHOST,0);
                curl_setopt($Sch, CURLOPT_TIMEOUT, 10);
        		curl_setopt($Sch, CURLOPT_POSTFIELDS, json_encode(['lottery'=>'AULUCKY8','drawNumber'=>$qihao,'bets'=>($pstr),'fastBets'=>false,'ignore'=>false]));
        		curl_setopt($Sch, CURLOPT_COOKIEJAR, $cookie_path);
        		curl_setopt($Sch, CURLOPT_COOKIEFILE, $cookie_path); 
        		$headers = array(
                    'Content-Type: application/json'
                );
                curl_setopt($Sch, CURLOPT_HTTPHEADER, $headers);
        		$file_content = curl_exec($Sch);
        		curl_close($Sch);
                $body = json_decode($file_content,true);
                if ($body != '' && $body['status'] == 0){
                    $succes = true;
                }
            }
        return ($succes?2:3);
        }
    }


    /**
     * cmd 转换
     * @param $cmds
     * @return array|mixed
     */
    public function cmdConvert($cmds){
        if (count($cmds) != count($cmds,1)){
            foreach ($cmds as &$cmd){
                $cmd = $this->doConvert($cmd);
            }
        }else{
            $cmds = $this->doConvert($cmds);
        }
        return $cmds;
    }

    /**
     * 执行转换
     * @param $cmd
     * @return array
     */
    private function doConvert($cmd){
        $cmds1 = array();
        if ($cmd['cmd'] == "12角"){
            $cmd['cmd'] = "1/2/5/6/9/10/13/14/17/18特";
            $cmd['money'] = bcdiv($cmd['money'],10,2);
        }
        if ($cmd['cmd'] == "23角"){
            $cmd['cmd'] = "2/3/6/7/10/11/14/15/18/19特";
            $cmd['money'] = bcdiv($cmd['money'],10,2);
        }
        if ($cmd['cmd'] == "34角"){
            $cmd['cmd'] = "3/4/7/8/11/12/15/16/19/20特";
            $cmd['money'] = bcdiv($cmd['money'],10,2);
        }
        if ($cmd['cmd'] == "14角"){
            $cmd['cmd'] = "1/4/5/8/9/12/13/16/17/20特";
            $cmd['money'] = bcdiv($cmd['money'],10,2);
        }


        if ($cmd['cmd'] == "单"){
            $cmd['cmd'] = "1/3/5/7/9/11/13/15/17/19特";
            $cmd['money'] = bcdiv($cmd['money'],10,2);
        }
        if ($cmd['cmd'] == "双"){
            $cmd['cmd'] = "2/4/6/8/10/12/14/16/18/20特";
            $cmd['money'] = bcdiv($cmd['money'],10,2);
        }


        if ($cmd['cmd'] == "1正"){
            $cmd['cmd'] = "1/5/9/13/17特";
            $money = $cmd['money'];
            $cmd['money'] = bcdiv($money,10,2);
            $cmds1[] = array(
                'cmd' => "2/4/6/8/10/12/14/16/18/20特",
                'money' => bcdiv($money,20,2)
            );
        }
        if ($cmd['cmd'] == "2正"){
            $cmd['cmd'] = "2/6/10/14/18特";
            $money = $cmd['money'];
            $cmd['money'] = bcdiv($money,10,2);
            $cmds1[] = array(
                'cmd' => "1/3/5/7/9/11/13/15/17/19特",
                'money' => bcdiv($money,20,2)
            );
        }
        if ($cmd['cmd'] == "3正"){
            $cmd['cmd'] = "3/7/11/15/19特";
            $money = $cmd['money'];
            $cmd['money'] = bcdiv($money,10,2);
            $cmds1[] = array(
                'cmd' => "2/4/6/8/10/12/14/16/18/20特",
                'money' => bcdiv($money,20,2)
            );
        }
        if ($cmd['cmd'] == "4正"){
            $cmd['cmd'] = "4/8/12/16/20特";
            $money = $cmd['money'];
            $cmd['money'] = bcdiv($money,10,2);
            $cmds1[] = array(
                'cmd' => "1/3/5/7/9/11/13/15/17/19特",
                'money' => bcdiv($money,20,2)
            );
        }


        if ($cmd['cmd'] == "3念4"){
            $cmd['cmd'] = "3/7/11/15/19特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.15,2);
            $cmds1[] = array(
                'cmd' => "4/8/12/16/20特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "2念4"){
            $cmd['cmd'] = "2/6/10/14/18特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.15,2);
            $cmds1[] = array(
                'cmd' => "4/8/12/16/20特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "1念4"){
            $cmd['cmd'] = "1/5/9/13/17特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.15,2);
            $cmds1[] = array(
                'cmd' => "4/8/12/16/20特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "4念3"){
            $cmd['cmd'] = "4/8/12/16/20特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.15,2);
            $cmds1[] = array(
                'cmd' => "3/7/11/15/19特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "2念3"){
            $cmd['cmd'] = "2/6/10/14/18特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.15,2);
            $cmds1[] = array(
                'cmd' => "3/7/11/15/19特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "1念3"){
            $cmd['cmd'] = "1/5/9/13/17特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.15,2);
            $cmds1[] = array(
                'cmd' => "3/7/11/15/19特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "4念2"){
            $cmd['cmd'] = "4/8/12/16/20特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.15,2);
            $cmds1[] = array(
                'cmd' => "2/6/10/14/18特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "3念2"){
            $cmd['cmd'] = "3/7/11/15/19特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.15,2);
            $cmds1[] = array(
                'cmd' => "2/6/10/14/18特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "1念2"){
            $cmd['cmd'] = "1/5/9/13/17特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.15,2);
            $cmds1[] = array(
                'cmd' => "2/6/10/14/18特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "4念1"){
            $cmd['cmd'] = "4/8/12/16/20特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.15,2);
            $cmds1[] = array(
                'cmd' => "1/5/9/13/17特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "3念1"){
            $cmd['cmd'] = "3/7/11/15/19特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.15,2);
            $cmds1[] = array(
                'cmd' => "1/5/9/13/17特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "2念1"){
            $cmd['cmd'] = "2/6/10/14/18特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.15,2);
            $cmds1[] = array(
                'cmd' => "1/5/9/13/17特",
                'money' => bcmul($money,0.05,2)
            );
        }




        if ($cmd['cmd'] == "1番"){
            $cmd['cmd'] = "1/5/9/13/17特";
            $cmd['money'] = bcmul($cmd['money'],0.2,2);
        }
        if ($cmd['cmd'] == "2番"){
            $cmd['cmd'] = "2/6/10/14/18特";
            $cmd['money'] = bcmul($cmd['money'],0.2,2);
        }
        if ($cmd['cmd'] == "3番"){
            $cmd['cmd'] = "3/7/11/15/19特";
            $cmd['money'] = bcmul($cmd['money'],0.2,2);
        }
        if ($cmd['cmd'] == "4番"){
            $cmd['cmd'] = "4/8/12/16/20特";
            $cmd['money'] = bcmul($cmd['money'],0.2,2);
        }


        if ($cmd['cmd'] == "124中"){
            $cmd['cmd'] = "1/2/4/5/6/8/9/10/12/13/14/16/17/18/20特";
            $cmd['money'] = bcdiv($cmd['money'],15,2);
        }
        if ($cmd['cmd'] == "123中"){
            $cmd['cmd'] = "1/2/3/5/6/7/9/10/11/13/14/15/17/18/19特";
            $cmd['money'] = bcdiv($cmd['money'],15,2);
        }
        if ($cmd['cmd'] == "234中"){
            $cmd['cmd'] = "2/3/4/6/7/8/10/11/12/14/15/16/18/19/20特";
            $cmd['money'] = bcdiv($cmd['money'],15,2);
        }
        if ($cmd['cmd'] == "134中"){
            $cmd['cmd'] = "1/3/4/5/7/8/9/11/12/13/15/16/17/19/20特";
            $cmd['money'] = bcdiv($cmd['money'],15,2);
        }




        if ($cmd['cmd'] == "12三通"){
            $cmd['cmd'] = "1/2/5/6/9/10/13/14/17/18特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.075,2);
            $cmds1[] = array(
                'cmd' => "4/8/12/16/20特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "12四通"){
            $cmd['cmd'] = "1/2/5/6/9/10/13/14/17/18特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.075,2);
            $cmds1[] = array(
                'cmd' => "3/7/11/15/19特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "13二通"){
            $cmd['cmd'] = "1/3/5/7/9/11/13/15/17/19特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.075,2);
            $cmds1[] = array(
                'cmd' => "4/8/12/16/20特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "13四通"){
            $cmd['cmd'] = "1/3/5/7/9/11/13/15/17/19特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.075,2);
            $cmds1[] = array(
                'cmd' => "2/6/10/14/18特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "23一通"){
            $cmd['cmd'] = "2/3/6/7/10/11/14/15/18/19特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.075,2);
            $cmds1[] = array(
                'cmd' => "4/8/12/16/20特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "23四通"){
            $cmd['cmd'] = "2/3/6/7/10/11/14/15/18/19特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.075,2);
            $cmds1[] = array(
                'cmd' => "1/5/9/13/17特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "24一通"){
            $cmd['cmd'] = "2/4/6/8/10/12/14/16/18/20特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.075,2);
            $cmds1[] = array(
                'cmd' => "3/7/11/15/19特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "24三通"){
            $cmd['cmd'] = "2/4/6/8/10/12/14/16/18/20特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.075,2);
            $cmds1[] = array(
                'cmd' => "1/5/9/13/17特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "14三通"){
            $cmd['cmd'] = "1/4/5/8/9/12/13/16/17/20特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.075,2);
            $cmds1[] = array(
                'cmd' => "2/6/10/14/18特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "14二通"){
            $cmd['cmd'] = "1/4/5/8/9/12/13/16/17/20特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.075,2);
            $cmds1[] = array(
                'cmd' => "3/7/11/15/19特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "34二通"){
            $cmd['cmd'] = "3/4/7/8/11/12/15/16/19/20特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.075,2);
            $cmds1[] = array(
                'cmd' => "1/5/9/13/17特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "34一通"){
            $cmd['cmd'] = "3/4/7/8/11/12/15/16/19/20特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.075,2);
            $cmds1[] = array(
                'cmd' => "2/6/10/14/18特",
                'money' => bcmul($money,0.05,2)
            );
        }


        if ($cmd['cmd'] == "1加34"){
            $cmd['cmd'] = "1/5/9/13/17特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.1,2);
            $cmds1[] = array(
                'cmd' => "3/4/7/8/11/12/15/16/19/20特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "1加23"){
            $cmd['cmd'] = "1/5/9/13/17特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.1,2);
            $cmds1[] = array(
                'cmd' => "2/3/6/7/10/11/14/15/18/19特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "2加34"){
            $cmd['cmd'] = "2/6/10/14/18特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.1,2);
            $cmds1[] = array(
                'cmd' => "3/4/7/8/11/12/15/16/19/20特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "2加14"){
            $cmd['cmd'] = "2/6/10/14/18特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.1,2);
            $cmds1[] = array(
                'cmd' => "1/4/5/8/9/12/13/16/17/20特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "3加14"){
            $cmd['cmd'] = "3/7/11/15/19特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.1,2);
            $cmds1[] = array(
                'cmd' => "1/4/5/8/9/12/13/16/17/20特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "3加12"){
            $cmd['cmd'] = "3/7/11/15/19特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.1,2);
            $cmds1[] = array(
                'cmd' => "1/2/5/6/9/10/13/14/17/18特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "4加23"){
            $cmd['cmd'] = "4/8/12/16/20特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.1,2);
            $cmds1[] = array(
                'cmd' => "2/3/6/7/10/11/14/15/18/19特",
                'money' => bcmul($money,0.05,2)
            );
        }
        if ($cmd['cmd'] == "4加12"){
            $cmd['cmd'] = "4/8/12/16/20特";
            $money = $cmd['money'];
            $cmd['money'] = bcmul($money,0.1,2);
            $cmds1[] = array(
                'cmd' => "1/2/5/6/9/10/13/14/17/18特",
                'money' => bcmul($money,0.05,2)
            );
        }


        if ($cmd['cmd'] == "大"){
            $cmd['cmd'] = "11/12/13/14/15/16/17/18/19/20特";
            $cmd['money'] = bcdiv($cmd['money'],10,2);
        }
        if ($cmd['cmd'] == "小"){
            $cmd['cmd'] = "1/2/3/4/5/6/7/8/9/10特";
            $cmd['money'] = bcdiv($cmd['money'],10,2);
        }

        return array_merge($cmds1,[$cmd]);
    }


    public function getCmd($cmd){
        $money = 0;
        $huan = explode("\n",$cmd);
        $kong = explode(",",$cmd);
        $daxiao = ['单','双','13','24','42','31','大','小'];
        $chetui = ['123','132','231','213','321','312','124','142','421','412','214','241','234','243','324','342','432','423','134','143','341','314','413','431'];
        $jiao = ['12角','23角','34角','14角','13角','24角','12','23','34','14','13','24','21角','32角','43角','41角','21','32','43','41'];
        $wanfaArr = ['1番','2番','3番','4番','1正','2正','3正','4正','1堂','2堂','3堂','4堂','1无3','2无4','3无1','4无2','1车','2车','3车','4车','1推','2推','3推','4推','12无3','21无3','12无4','21无4','13无2','31无2','13无4','31无4','14无2','41无2','14无3','41无3','23无1','32无1','23无4','32无4','24无1','42无1','24无3','42无3','34无1','43无1','34无2','43无2','1通23','1通24','1通34','1通32','1通42','1通43','2通13','2通14','2通34','2通31','2通41','2通43','3通12','3通14','3通24','3通12','3通41','3通42','4通12','4通13','4通23','4通21','4通31','4通32','1无2','1无4','2无1','2无3','3无2','3无4','4无1','4无3','1加34','1加43','1加23','1加32','2加34','2加43','2加41','2加14','3加14','3加41','3加12','3加21','4加12','4加21','4加23','4加32','1严2','2严1','2严3','3严2','3严4','4严3','4严1','1严4','1严3','2严4','3严1','4严2','1念2','2念1','2念3','3念2','3念4','4念3','4念1','1念4','1念3','2念4','3念1','4念2','42严','24严','31严','13严','12严','14严','21严','23严','32严','43严','41严','34严','42念','24念','31念','13念','12念','14念','21念','23念','32念','43念','41念','34念'];
        $yanlian = ['42严','24严','31严','13严','12严','14严','21严','23严','32严','43严','41严','34严','42念','24念','31念','13念','12念','14念','21念','23念','32念','43念','41念','34念'];
        $cmdArr = array();
        if (count($huan)>0||count($kong)>0) {
            $duoArr = count($huan)>1?$huan:$kong;
            foreach ($duoArr as $value) {
                $str = $value;
                $frist = mb_substr( $str, 0, 1 ,"UTF-8");
                $last = mb_substr( $str, 1,strlen($str) ,"UTF-8");
                $arr = explode('/',$str);
                if ((in_array($frist,$daxiao)&&is_numeric($last))||(in_array($arr[0],$daxiao)&&count($arr)==2&&is_numeric($arr[1]))) {
                    if ($frist=='大'||$frist=='小') {
                        $cmd = $frist;
                        $money = $last;
                    } else {
                        if ($frist=='单'||$arr[0]=='13'||$arr[0]=='31') {
                            $cmd = "单";
                            if ($frist=='单') {
                                $money = $last;
                            } else {
                                $money = $arr[1];
                            }
                        } else {
                            $cmd = "双";
                            if ($frist=='双') {
                                $money = $last;
                            } else {
                                $money = $arr[1];
                            }
                        }
                    }
                }
                elseif (strstr($str,'特')&&$frist!='特') {
                    $arr3=explode('特',$str);
                    $money = $arr3[1];
                    $cmd = $arr3[0].'特';
                }
                elseif (strstr($str,'番')||strstr($str,'车')||strstr($str,'推')||strstr($str,'正')||strstr($str,'堂')) {
                    $tar = mb_substr( $str, 1, 1,"UTF-8");
                    $arr3=explode($tar,$str);
                    if (in_array($arr3[0].$tar,$wanfaArr)&&is_numeric($arr3[1])) {
                        $money = $arr3[1];
                        if ($tar=='车'||$tar=='推') {

                            if ($arr3[0]=='1') $cmd = "124中";
                            elseif ($arr3[0]=='2') $cmd = "123中";
                            elseif ($arr3[0]=='3') $cmd = "234中";
                            else $cmd = "134中";

                        }elseif ($tar=='堂'||$tar=='正'){
                            $cmd = $arr3[0]."正";
                        }else {
                            $cmd = $arr3[0].$tar;
                        }
                    }
                } elseif (in_array($arr[0],$chetui)&&is_numeric($arr[1])&&count($arr)==2) {

                    $money = $arr[1];
                    if ($arr[0]=='124'||$arr[0]=='241'||$arr[0]=='142'||$arr[0]=='412'||$arr[0]=='421'||$arr[0]=='214') $cmd = "124中";
                    elseif ($arr[0]=='123'||$arr[0]=='231'||$arr[0]=='321'||$arr[0]=='132'||$arr[0]=='213'||$arr[0]=='312') $cmd = "123中";
                    elseif ($arr[0]=='234'||$arr[0]=='243'||$arr[0]=='324'||$arr[0]=='342'||$arr[0]=='423'||$arr[0]=='432') $cmd = "234中";
                    else $cmd = "134中";

                } elseif (strstr($str,'角')||in_array($arr[0],$jiao)) {

                    $arr3=explode('角',$str);
                    if ((strstr($str,'角')&&in_array($arr3[0],$jiao))||(in_array($arr[0],$jiao)&&is_numeric($arr[1])&&count($arr)==2)) {
                        if (strstr($str,'/')) {
                            $kuai = $arr[0];
                            $money = $arr[1];
                        } else {
                            $kuai = $arr3[0];
                            $money = $arr3[1];
                        }
                        $jiaoArr1 = array('12角','12','21','21角');
                        $jiaoArr2 = array('23角','23','32','32角');
                        $jiaoArr3 = array('34角','34','43角','43');
                        $jiaoArr4 = array('14角','14','41角','41');
                        $jiaoArr5 = array('13角','13');
                        $jiaoArr6 = ['24角','24'];

                        if (in_array($kuai,$jiaoArr1)) $cmd = "12角";
                        elseif (in_array($kuai,$jiaoArr2)) $cmd = "23角";
                        elseif (in_array($kuai,$jiaoArr3)) $cmd = "34角";
                        elseif (in_array($kuai,$jiaoArr4)) $cmd = "14角";
                        elseif (in_array($kuai,$jiaoArr5)) $cmd = "单";
                        elseif (in_array($kuai,$jiaoArr6)) $cmd = "双";

                        unset($jiaoArr1,$jiaoArr2,$jiaoArr3,$jiaoArr4,$jiaoArr5,$jiaoArr6);
                    }

                } elseif (in_array($arr[0],$wanfaArr)&&is_numeric($arr[1])&&count($arr)==2) {
                    if (strstr($str,'加')) {

                        if ($arr[0]=='1加34'||$arr[0]=='1加43') $cmd = '1加34';
                        elseif ($arr[0]=='1加23'||$arr[0]=='1加32') $cmd = '1加23';
                        elseif ($arr[0]=='2加34'||$arr[0]=='2加43') $cmd = '2加34';
                        elseif ($arr[0]=='2加14'||$arr[0]=='2加41') $cmd = '2加14';
                        elseif ($arr[0]=='3加14'||$arr[0]=='3加41') $cmd = '3加14';
                        elseif ($arr[0]=='3加12'||$arr[0]=='3加21') $cmd = '3加12';
                        elseif ($arr[0]=='4加12'||$arr[0]=='4加21') $cmd = '4加12';
                        else $cmd = '4加23';

                    } elseif (strstr($str,'通')||strstr($str,'无')) {
                        if (strstr($str,'通')) {

                            if ($arr[0]=='1通23'||$arr[0]=='1通32') $cmd = '23一通';
                            elseif ($arr[0]=='2通13'||$arr[0]=='2通31') $cmd = '13二通';
                            elseif ($arr[0]=='3通12'||$arr[0]=='3通21') $cmd = '12三通';
                            elseif ($arr[0]=='4通12'||$arr[0]=='4通21') $cmd = '12四通';
                            elseif ($arr[0]=='1通24'||$arr[0]=='1通42') $cmd = '24一通';
                            elseif ($arr[0]=='2通14'||$arr[0]=='2通41') $cmd = '14二通';
                            elseif ($arr[0]=='3通14'||$arr[0]=='3通41') $cmd = '14三通';
                            elseif ($arr[0]=='4通13'||$arr[0]=='4通31') $cmd = '13四通';
                            elseif ($arr[0]=='1通34'||$arr[0]=='1通43') $cmd = '34一通';
                            elseif ($arr[0]=='2通34'||$arr[0]=='2通43') $cmd = '34二通';
                            elseif ($arr[0]=='3通24'||$arr[0]=='3通42') $cmd = '24三通';
                            elseif ($arr[0]=='4通23'||$arr[0]=='4通32') $cmd = '23四通';

                        } else {
                            $arr3=explode('无',$arr[0]);
                            if (strlen($arr3[0])==2) {

                                if ($arr[0]=='32无1'||$arr[0]=='23无1') $cmd = '23一通';
                                elseif ($arr[0]=='31无2'||$arr[0]=='13无2') $cmd = '13二通';
                                elseif ($arr[0]=='21无3'||$arr[0]=='12无3') $cmd = '12三通';
                                elseif ($arr[0]=='21无4'||$arr[0]=='12无4') $cmd = '12四通';
                                elseif ($arr[0]=='42无1'||$arr[0]=='24无1') $cmd = '24一通';
                                elseif ($arr[0]=='41无2'||$arr[0]=='14无2') $cmd = '14二通';
                                elseif ($arr[0]=='41无3'||$arr[0]=='14无3') $cmd = '14三通';
                                elseif ($arr[0]=='31无4'||$arr[0]=='13无4') $cmd = '13四通';
                                elseif ($arr[0]=='43无1'||$arr[0]=='34无1') $cmd = '34一通';
                                elseif ($arr[0]=='43无2'||$arr[0]=='34无2') $cmd = '34二通';
                                elseif ($arr[0]=='42无3'||$arr[0]=='24无3') $cmd = '24三通';
                                elseif ($arr[0]=='32无4'||$arr[0]=='23无4') $cmd = '23四通';

                            } else {
                                if ($arr[0]=='1无3'||$arr[0]=='2无4'||$arr[0]=='3无1'||$arr[0]=='4无2') {

                                    if ($arr[0]=='1无3') $cmd = '1正';
                                    elseif ($arr[0]=='2无4') $cmd = '2正';
                                    elseif ($arr[0]=='3无1') $cmd = '3正';
                                    else $cmd = '4正';

                                } else {

                                    if ($arr[0]=='1无2') $cmd = '1加34';
                                    elseif ($arr[0]=='1无4') $cmd = '1加23';
                                    elseif ($arr[0]=='2无1') $cmd = '2加34';
                                    elseif ($arr[0]=='2无3') $cmd = '2加14';
                                    elseif ($arr[0]=='3无2') $cmd = '3加14';
                                    elseif ($arr[0]=='3无4') $cmd = '3加12';
                                    elseif ($arr[0]=='4无3') $cmd = '4加12';
                                    else $cmd = '4加23';

                                }
                            }
                        }
                    } else {
                        if (!in_array($arr[0],$yanlian)) {

                            if ($arr[0]=='3严4' || $arr[0]=='3念4') $cmd = '3念4';
                            elseif ($arr[0]=='3严1' || $arr[0]=='3念1') $cmd = '3念1';
                            elseif ($arr[0]=='3严2' || $arr[0]=='3念2') $cmd = '3念2';
                            elseif ($arr[0]=='2严3' || $arr[0]=='2念3') $cmd = '2念3';
                            elseif ($arr[0]=='2严4' || $arr[0]=='2念4') $cmd = '2念4';
                            elseif ($arr[0]=='2严1' || $arr[0]=='2念1') $cmd = '2念1';
                            elseif ($arr[0]=='4严3' || $arr[0]=='4念3') $cmd = '4念3';
                            elseif ($arr[0]=='4严2' || $arr[0]=='4念2') $cmd = '4念2';
                            elseif ($arr[0]=='4严1' || $arr[0]=='4念1') $cmd = '4念1';
                            elseif ($arr[0]=='1严4' || $arr[0]=='1念4') $cmd = '1念4';
                            elseif ($arr[0]=='1严3' || $arr[0]=='1念3') $cmd = '1念3';
                            elseif ($arr[0]=='1严2' || $arr[0]=='1念2') $cmd = '1念2';

                        }
                    }
                    $money = $arr[1];
                } elseif (strstr($str,'严')||strstr($str,'念')) {
                    if (strstr($str,'严')) $arr3=explode('严',$str);
                    else $arr3=explode('念',$str);
                    if (in_array($arr3[0].'严',$yanlian)||in_array($arr3[0].'念',$yanlian)) {
                        if ($arr3[0].'严'=='34严' || $arr[0].'念'=='34念') $cmd = '3念4';
                        elseif ($arr3[0].'严'=='31严' || $arr3[0].'念'=='31念') $cmd = '3念1';
                        elseif ($arr3[0].'严'=='32严' || $arr3[0].'念'=='32念') $cmd = '3念2';
                        elseif ($arr3[0].'严'=='23严' || $arr3[0].'念'=='23念') $cmd = '2念3';
                        elseif ($arr3[0].'严'=='24严' || $arr3[0].'念'=='24念') $cmd = '2念4';
                        elseif ($arr3[0].'严'=='21严' || $arr3[0].'念'=='21念') $cmd = '2念1';
                        elseif ($arr3[0].'严'=='43严' || $arr3[0].'念'=='43念') $cmd = '4念3';
                        elseif ($arr3[0].'严'=='42严' || $arr3[0].'念'=='42念') $cmd = '4念2';
                        elseif ($arr3[0].'严'=='41严' || $arr3[0].'念'=='41念') $cmd = '4念1';
                        elseif ($arr3[0].'严'=='14严' || $arr3[0].'念'=='14念') $cmd = '1念4';
                        elseif ($arr3[0].'严'=='13严' || $arr3[0].'念'=='13念') $cmd = '1念3';
                        elseif ($arr3[0].'严'=='12严' || $arr3[0].'念'=='12念') $cmd = '1念2';
                        $money = $arr3[1];
                    }
                }
                if($cmd != '' && $cmd != null && $money != '' && $money != null && $money != 0){
                    array_push($cmdArr,array(
                        'cmd' => $cmd,
                        'money' => $money
                    ));
                }

            }
        }
        return $cmdArr;

//        $orderData = [
//            "特" => [],
//            "番摊" => []
//        ];
//        $json_path = ROOT_PATH . "flyers/json/K28.json";
//        $d = json_decode(file_get_contents($json_path),true);
//        foreach ($cmdArr as $v){
//            if (strstr($v['cmd'],'特')){
//                $t = explode('/',explode('特',$v['cmd'])[0]);
//                foreach ($t as $i){
//                    foreach ($d["特"] as $item){
//                        if ($item['name'] == intval($i)){
//                            $item['orderMoney'] = $v['money'];
//                            array_push($orderData['特'],$item);
//                        }
//                    }
//                }
//            }else{
//                foreach ($d["番摊"] as $item){
//                    if ($item['name'] == $v['cmd']){
//                        $item['orderMoney'] = $v['money'];
//                        array_push($orderData['番摊'],$item);
//                    }
//                }
//            }
//        }
//
//        return $orderData;
    }
    
    public function getPuCmd($cmd,$rb,$fly,$qiuNum = null){
        $money = 0;
        $huan = explode("\n",$cmd);
        $kong = explode(",",$cmd);
        $daxiao = ['单','双','13','24','42','31','大','小'];
        $chetui = ['123','132','231','213','321','312','124','142','421','412','214','241','234','243','324','342','432','423','134','143','341','314','413','431'];
        $jiao = ['12角','23角','34角','14角','13角','24角','12','23','34','14','13','24','21角','32角','43角','41角','21','32','43','41'];
        $wanfaArr = ['1番','2番','3番','4番','1正','2正','3正','4正','1堂','2堂','3堂','4堂','1无3','2无4','3无1','4无2','1车','2车','3车','4车','1推','2推','3推','4推','12无3','21无3','12无4','21无4','13无2','31无2','13无4','31无4','14无2','41无2','14无3','41无3','23无1','32无1','23无4','32无4','24无1','42无1','24无3','42无3','34无1','43无1','34无2','43无2','1通23','1通24','1通34','1通32','1通42','1通43','2通13','2通14','2通34','2通31','2通41','2通43','3通12','3通14','3通24','3通12','3通41','3通42','4通12','4通13','4通23','4通21','4通31','4通32','1无2','1无4','2无1','2无3','3无2','3无4','4无1','4无3','1加34','1加43','1加23','1加32','2加34','2加43','2加41','2加14','3加14','3加41','3加12','3加21','4加12','4加21','4加23','4加32','1严2','2严1','2严3','3严2','3严4','4严3','4严1','1严4','1严3','2严4','3严1','4严2','1念2','2念1','2念3','3念2','3念4','4念3','4念1','1念4','1念3','2念4','3念1','4念2','42严','24严','31严','13严','12严','14严','21严','23严','32严','43严','41严','34严','42念','24念','31念','13念','12念','14念','21念','23念','32念','43念','41念','34念'];
        $yanlian = ['42严','24严','31严','13严','12严','14严','21严','23严','32严','43严','41严','34严','42念','24念','31念','13念','12念','14念','21念','23念','32念','43念','41念','34念'];
        $cmdArr = array();
        if (count($huan)>0||count($kong)>0) {
            $duoArr = count($huan)>1?$huan:$kong;
            foreach ($duoArr as $value) {
                $str = $value;
                $frist = mb_substr( $str, 0, 1 ,"UTF-8");
                $last = mb_substr( $str, 1,strlen($str) ,"UTF-8");
                $arr = explode('/',$str);
                if ((in_array($frist,$daxiao)&&is_numeric($last))||(in_array($arr[0],$daxiao)&&count($arr)==2&&is_numeric($arr[1]))) {
                    if ($frist=='大'||$frist=='小') {
                        $cmd = $frist;
                        $money = $last;
                    } else {
                        if ($frist=='单'||$arr[0]=='13'||$arr[0]=='31') {
                            $cmd = "单";
                            if ($frist=='单') {
                                $money = $last;
                            } else {
                                $money = $arr[1];
                            }
                        } else {
                            $cmd = "双";
                            if ($frist=='双') {
                                $money = $last;
                            } else {
                                $money = $arr[1];
                            }
                        }
                    }
                }
				elseif (strstr($str,'特')&&$frist!='特') {
					$arr3=explode('特',$str);
                    $money = $arr3[1];
                    $cmd = $arr3[0].'特';
				}
                elseif (strstr($str,'番')||strstr($str,'车')||strstr($str,'推')||strstr($str,'正')||strstr($str,'堂')) {
                    $tar = mb_substr( $str, 1, 1,"UTF-8");
                    $arr3=explode($tar,$str);
                    if (in_array($arr3[0].$tar,$wanfaArr)&&is_numeric($arr3[1])) {
                        $money = $arr3[1];
                        if ($tar=='车'||$tar=='推') {

                            if ($arr3[0]=='1') $cmd = "124中";
                            elseif ($arr3[0]=='2') $cmd = "123中";
                            elseif ($arr3[0]=='3') $cmd = "234中";
                            else $cmd = "134中";

                        }elseif ($tar=='堂'||$tar=='正'){
                            $cmd = $arr3[0]."正";
                        }else {
                            $cmd = $arr3[0].$tar;
                        }
                    }
                } elseif (in_array($arr[0],$chetui)&&is_numeric($arr[1])&&count($arr)==2) {

                    $money = $arr[1];
                    if ($arr[0]=='124'||$arr[0]=='241'||$arr[0]=='142'||$arr[0]=='412'||$arr[0]=='421'||$arr[0]=='214') $cmd = "124中";
                    elseif ($arr[0]=='123'||$arr[0]=='231'||$arr[0]=='321'||$arr[0]=='132'||$arr[0]=='213'||$arr[0]=='312') $cmd = "123中";
                    elseif ($arr[0]=='234'||$arr[0]=='243'||$arr[0]=='324'||$arr[0]=='342'||$arr[0]=='423'||$arr[0]=='432') $cmd = "234中";
                    else $cmd = "134中";

                } elseif (strstr($str,'角')||in_array($arr[0],$jiao)) {

                    $arr3=explode('角',$str);
                    if ((strstr($str,'角')&&in_array($arr3[0],$jiao))||(in_array($arr[0],$jiao)&&is_numeric($arr[1])&&count($arr)==2)) {
                        if (strstr($str,'/')) {
                            $kuai = $arr[0];
                            $money = $arr[1];
                        } else {
                            $kuai = $arr3[0];
                            $money = $arr3[1];
                        }
                        $jiaoArr1 = array('12角','12','21','21角');
                        $jiaoArr2 = array('23角','23','32','32角');
                        $jiaoArr3 = array('34角','34','43角','43');
                        $jiaoArr4 = array('14角','14','41角','41');
                        $jiaoArr5 = array('13角','13');
                        $jiaoArr6 = ['24角','24'];

                        if (in_array($kuai,$jiaoArr1)) $cmd = "12角";
                        elseif (in_array($kuai,$jiaoArr2)) $cmd = "23角";
                        elseif (in_array($kuai,$jiaoArr3)) $cmd = "34角";
                        elseif (in_array($kuai,$jiaoArr4)) $cmd = "14角";
                        elseif (in_array($kuai,$jiaoArr5)) $cmd = "单";
                        elseif (in_array($kuai,$jiaoArr6)) $cmd = "双";

                        unset($jiaoArr1,$jiaoArr2,$jiaoArr3,$jiaoArr4,$jiaoArr5,$jiaoArr6);
                    }

                } elseif (in_array($arr[0],$wanfaArr)&&is_numeric($arr[1])&&count($arr)==2) {
                    if (strstr($str,'加')) {

                        if ($arr[0]=='1加34'||$arr[0]=='1加43') $cmd = '1加34';
                        elseif ($arr[0]=='1加23'||$arr[0]=='1加32') $cmd = '1加23';
                        elseif ($arr[0]=='2加34'||$arr[0]=='2加43') $cmd = '2加34';
                        elseif ($arr[0]=='2加14'||$arr[0]=='2加41') $cmd = '2加14';
                        elseif ($arr[0]=='3加14'||$arr[0]=='3加41') $cmd = '3加14';
                        elseif ($arr[0]=='3加12'||$arr[0]=='3加21') $cmd = '3加12';
                        elseif ($arr[0]=='4加12'||$arr[0]=='4加21') $cmd = '4加12';
                        else $cmd = '4加23';

                    } elseif (strstr($str,'通')||strstr($str,'无')) {
                        if (strstr($str,'通')) {

                            if ($arr[0]=='1通23'||$arr[0]=='1通32') $cmd = '23一通';
                            elseif ($arr[0]=='2通13'||$arr[0]=='2通31') $cmd = '13二通';
                            elseif ($arr[0]=='3通12'||$arr[0]=='3通21') $cmd = '12三通';
                            elseif ($arr[0]=='4通12'||$arr[0]=='4通21') $cmd = '12四通';
                            elseif ($arr[0]=='1通24'||$arr[0]=='1通42') $cmd = '24一通';
                            elseif ($arr[0]=='2通14'||$arr[0]=='2通41') $cmd = '14二通';
                            elseif ($arr[0]=='3通14'||$arr[0]=='3通41') $cmd = '14三通';
                            elseif ($arr[0]=='4通13'||$arr[0]=='4通31') $cmd = '13四通';
                            elseif ($arr[0]=='1通34'||$arr[0]=='1通43') $cmd = '34一通';
                            elseif ($arr[0]=='2通34'||$arr[0]=='2通43') $cmd = '34二通';
                            elseif ($arr[0]=='3通24'||$arr[0]=='3通42') $cmd = '24三通';
                            elseif ($arr[0]=='4通23'||$arr[0]=='4通32') $cmd = '23四通';

                        } else {
                            $arr3=explode('无',$arr[0]);
                            if (strlen($arr3[0])==2) {

                                if ($arr[0]=='32无1'||$arr[0]=='23无1') $cmd = '23一通';
                                elseif ($arr[0]=='31无2'||$arr[0]=='13无2') $cmd = '13二通';
                                elseif ($arr[0]=='21无3'||$arr[0]=='12无3') $cmd = '12三通';
                                elseif ($arr[0]=='21无4'||$arr[0]=='12无4') $cmd = '12四通';
                                elseif ($arr[0]=='42无1'||$arr[0]=='24无1') $cmd = '24一通';
                                elseif ($arr[0]=='41无2'||$arr[0]=='14无2') $cmd = '14二通';
                                elseif ($arr[0]=='41无3'||$arr[0]=='14无3') $cmd = '14三通';
                                elseif ($arr[0]=='31无4'||$arr[0]=='13无4') $cmd = '13四通';
                                elseif ($arr[0]=='43无1'||$arr[0]=='34无1') $cmd = '34一通';
                                elseif ($arr[0]=='43无2'||$arr[0]=='34无2') $cmd = '34二通';
                                elseif ($arr[0]=='42无3'||$arr[0]=='24无3') $cmd = '24三通';
                                elseif ($arr[0]=='32无4'||$arr[0]=='23无4') $cmd = '23四通';

                            } else {
                                if ($arr[0]=='1无3'||$arr[0]=='2无4'||$arr[0]=='3无1'||$arr[0]=='4无2') {

                                    if ($arr[0]=='1无3') $cmd = '1正';
                                    elseif ($arr[0]=='2无4') $cmd = '2正';
                                    elseif ($arr[0]=='3无1') $cmd = '3正';
                                    else $cmd = '4正';

                                } else {

                                    if ($arr[0]=='1无2') $cmd = '1加34';
                                    elseif ($arr[0]=='1无4') $cmd = '1加23';
                                    elseif ($arr[0]=='2无1') $cmd = '2加34';
                                    elseif ($arr[0]=='2无3') $cmd = '2加14';
                                    elseif ($arr[0]=='3无2') $cmd = '3加14';
                                    elseif ($arr[0]=='3无4') $cmd = '3加12';
                                    elseif ($arr[0]=='4无3') $cmd = '4加12';
                                    else $cmd = '4加23';

                                }
                            }
                        }
                    } else {
                        if (!in_array($arr[0],$yanlian)) {

                            if ($arr[0]=='3严4' || $arr[0]=='3念4') $cmd = '3念4';
                            elseif ($arr[0]=='3严1' || $arr[0]=='3念1') $cmd = '3念1';
                            elseif ($arr[0]=='3严2' || $arr[0]=='3念2') $cmd = '3念2';
                            elseif ($arr[0]=='2严3' || $arr[0]=='2念3') $cmd = '2念3';
                            elseif ($arr[0]=='2严4' || $arr[0]=='2念4') $cmd = '2念4';
                            elseif ($arr[0]=='2严1' || $arr[0]=='2念1') $cmd = '2念1';
                            elseif ($arr[0]=='4严3' || $arr[0]=='4念3') $cmd = '4念3';
                            elseif ($arr[0]=='4严2' || $arr[0]=='4念2') $cmd = '4念2';
                            elseif ($arr[0]=='4严1' || $arr[0]=='4念1') $cmd = '4念1';
                            elseif ($arr[0]=='1严4' || $arr[0]=='1念4') $cmd = '1念4';
                            elseif ($arr[0]=='1严3' || $arr[0]=='1念3') $cmd = '1念3';
                            elseif ($arr[0]=='1严2' || $arr[0]=='1念2') $cmd = '1念2';

                        }
                    }
                    $money = $arr[1];
                } elseif (strstr($str,'严')||strstr($str,'念')) {
                    if (strstr($str,'严')) $arr3=explode('严',$str);
                    else $arr3=explode('念',$str);
                    if (in_array($arr3[0].'严',$yanlian)||in_array($arr3[0].'念',$yanlian)) {
                        if ($arr3[0].'严'=='34严' || $arr[0].'念'=='34念') $cmd = '3念4';
                        elseif ($arr3[0].'严'=='31严' || $arr3[0].'念'=='31念') $cmd = '3念1';
                        elseif ($arr3[0].'严'=='32严' || $arr3[0].'念'=='32念') $cmd = '3念2';
                        elseif ($arr3[0].'严'=='23严' || $arr3[0].'念'=='23念') $cmd = '2念3';
                        elseif ($arr3[0].'严'=='24严' || $arr3[0].'念'=='24念') $cmd = '2念4';
                        elseif ($arr3[0].'严'=='21严' || $arr3[0].'念'=='21念') $cmd = '2念1';
                        elseif ($arr3[0].'严'=='43严' || $arr3[0].'念'=='43念') $cmd = '4念3';
                        elseif ($arr3[0].'严'=='42严' || $arr3[0].'念'=='42念') $cmd = '4念2';
                        elseif ($arr3[0].'严'=='41严' || $arr3[0].'念'=='41念') $cmd = '4念1';
                        elseif ($arr3[0].'严'=='14严' || $arr3[0].'念'=='14念') $cmd = '1念4';
                        elseif ($arr3[0].'严'=='13严' || $arr3[0].'念'=='13念') $cmd = '1念3';
                        elseif ($arr3[0].'严'=='12严' || $arr3[0].'念'=='12念') $cmd = '1念2';
                        $money = $arr3[1];
                    }
                }
                if($cmd != '' && $cmd != null && $money != '' && $money != null && $money != 0){
                    array_push($cmdArr,array(
                        'cmd' => $cmd,
                        'money' => $money
                    ));
                }

            }
        }
        $orderData = [
            "特" => [],
            "番摊" => []
        ];
        $json_path = ROOT_PATH . "flyers/json/K28.json";
        $d = json_decode(file_get_contents($json_path),true);
        // $d = cache('make'.$rb['type'].$rb['jstype'].$fly['flyers_type']);
        foreach ($cmdArr as $v){
            if ($rb['type']==8&&$rb['jstype']==1) {
                if (strstr($v['cmd'],'特')){
                    if (strstr(explode('特',$v['cmd'])[0],'-')){
                        $t = explode('-',explode('特',$v['cmd'])[0]);
                    } else {
                        $t = explode('/',explode('特',$v['cmd'])[0]);
                    }
                    foreach ($t as $i){
                        foreach ($d['make'.$rb['type'].$rb['jstype'].$fly['flyers_type']] as $item){
                            if ($item['name'] == intval($i) && $item['cname']=='单码'){
                                $item['orderMoney'] = $v['money'];
                                array_push($orderData['特'],$item);
                            }
                        }
                    }
                }else{
                    foreach ($d['make'.$rb['type'].$rb['jstype'].$fly['flyers_type']] as $item){
                        if ($item['name'] == $v['cmd']){
                            $item['orderMoney'] = $v['money'];
                            array_push($orderData['番摊'],$item);
                            break;
                        }
                    }
                }
            } elseif ($rb['type']==8&&$rb['jstype']==6) {
                if (strstr($v['cmd'],'特')){
                    if (strstr(explode('特',$v['cmd'])[0],'-')){
                        $t = explode('-',explode('特',$v['cmd'])[0]);
                    } else {
                        $t = explode('/',explode('特',$v['cmd'])[0]);
                    }
                    foreach ($t as $i){
                        foreach ($d['make'.$rb['type'].$rb['jstype'].$fly['flyers_type']] as $item){
                            if ($item['name'] == intval($i) && $item['cname']=='单码'){
                                $item['orderMoney'] = $v['money'];
                                array_push($orderData['特'],$item);
                            }
                        }
                    }
                }else{
                    foreach ($d['make'.$rb['type'].$rb['jstype'].$fly['flyers_type']] as $item){
                        if ($item['name'] == $v['cmd'] && $item['sname'] == "第".$qiuNum."球"){
                            $item['orderMoney'] = $v['money'];
                            array_push($orderData['番摊'],$item);
                            break;
                        }
                    }
                    if (count($orderData['番摊'])==0){
                        foreach ($d['make'.$rb['type'].$rb['jstype'].$fly['flyers_type']] as $item){
                            if ($item['name'] == $v['cmd']){
                                $item['orderMoney'] = $v['money'];
                                array_push($orderData['番摊'],$item);
                                break;
                            }
                        }
                    }
                }
            } elseif ($rb['type']==5&&$rb['jstype']==4) {
                if (strstr($v['cmd'],'特')){
                    if (strstr(explode('特',$v['cmd'])[0],'-')){
                        $t = explode('-',explode('特',$v['cmd'])[0]);
                    } else {
                        $t = explode('/',explode('特',$v['cmd'])[0]);
                    }
                    foreach ($t as $i){
                        foreach ($d['make'.$rb['type'].$rb['jstype'].$fly['flyers_type']] as $item){
                            if ($item['name'] == intval($i) && $item['cname']=='单码'){
                                $item['orderMoney'] = $v['money'];
                                array_push($orderData['特'],$item);
                            }
                        }
                    }
                }else{
                    foreach ($d['make'.$rb['type'].$rb['jstype'].$fly['flyers_type']] as $item){
                        if ($item['name'] == $v['cmd']){
                            $item['orderMoney'] = $v['money'];
                            array_push($orderData['番摊'],$item);
                            break;
                        }
                    }
                }
            } else {
                if (strstr($v['cmd'],'特')){
                    if (strstr(explode('特',$v['cmd'])[0],'-')){
                        $t = explode('-',explode('特',$v['cmd'])[0]);
                    } else {
                        $t = explode('/',explode('特',$v['cmd'])[0]);
                    }
                    foreach ($t as $i){
                        foreach ($d["特"] as $item){
                            if ($item['name'] == intval($i)){
                                $item['orderMoney'] = $v['money'];
                                array_push($orderData['特'],$item);
                            }
                        }
                    }
                }else{
                    foreach ($d["番摊"] as $item){
                        if ($item['name'] == $v['cmd']){
                            $item['orderMoney'] = $v['money'];
                            array_push($orderData['番摊'],$item);
                        }
                    }
                }
            }
        }

        return $orderData;
    }

}
