<?php

namespace app\chat\controller;

/**
 * @package 微信授权控制器
 */
class WechatOauth
{
    //微信授权配置信息
    private $wechat_config = [
        'appid'     => '',
        'appsecret'     => '',
    ];

    public function __construct()
    {
        $this->wechat_config = $this->wechatConfig();
    }
    /**
     * 获取秘钥配置
     * @return [type] 数组
     */
    public function wechatConfig()
    {
        $wechat_config = array_merge($this->wechat_config, config('oauth'));
        return $wechat_config;
    }
    /**
     * 获取openid
     * @return string|mixed
     */
    public function getUserAccessUserInfo($code = "",$memberId)
    {

        if (empty($code)) {
            $baseUrl = request()->url(true);
           
            $url = $this->getSingleAuthorizeUrl($baseUrl, "1",$memberId);
            Header("Location: $url");
            exit();
        } else {
            $access_token = $this->getSingleAccessToken($code);
            return $this->getUserInfo($access_token);
        }
    }
        /**
     * 微信授权链接
     * @param string $redirect_url 要跳转的地址
     * @param string $state 状态参数
     * @param string $memberId 会员 ID
     * @return string 授权链接
     */
    public function getSingleAuthorizeUrl($redirect_url = "", $state = '1', $memberId = "")
    {
        $redirect_url = urlencode($redirect_url);
        $url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
        $url = 'http://api.zonghengwangluo.cn/api.php';
        $url = 'https://kajqq.dfha.igklh.cn/api1.php';
         // 将会员 ID 添加到授权链接中
        return $url."?appid=" . $this->wechat_config['appid'] . "&redirect_uri=" . $redirect_url . "&response_type=code&scope=snsapi_userinfo&state={$state}&member_id={$memberId}#wechat_redirect";
    }
    /**
     * 获取token
     * @return [type] 返回token 
     */
    public function getSingleAccessToken($code)
    {
        $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . $this->wechat_config['appid'] . '&secret=' . $this->wechat_config['appsecret'] . '&code=' . $code . '&grant_type=authorization_code';
        $access_token = $this->https_request($url);
        return $access_token;
    }

    /**
     * 发送curl请求
     * @param $url string
     * @param return array|mixed
     */
    public function https_request($url)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $AjaxReturn = curl_exec($curl);
        //获取access_token和openid,转换为数组
        $data = json_decode($AjaxReturn, true);
        curl_close($curl);
        return $data;
    }
    /**
     * @explain
     * 通过code获取用户openid以及用户的微信号信息
     * @return array|mixed
     * @remark
     * 获取到用户的openid之后可以判断用户是否有数据，可以直接跳过获取access_token,也可以继续获取access_token
     * access_token每日获取次数是有限制的，access_token有时间限制，可以存储到数据库7200s. 7200s后access_token失效
     **/
    public function getUserInfo($access_token = [])
    {
        if (!$access_token) {
            return [
                'code' => 0,
                'msg' => '微信授权失败',
            ];
        }
        $userinfo_url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' . $access_token['access_token'] . '&openid=' . $access_token['openid'] . '&lang=zh_CN';
        $userinfo_json = $this->https_request($userinfo_url);
        //获取用户的基本信息，并将用户的唯一标识保存在session中
        if (!$userinfo_json) {
            return [
                'code' => 0,
                'msg' => '获取用户信息失败！',
            ];
        }
        return $userinfo_json;
    }
}
