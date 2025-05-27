<?php
namespace FdPlatforms;

use think\Db;

class BasePlatform
{
    protected $uid;

    public function __construct($uid)
    {
        $this->uid = $uid;
    }

    /**
     * 获取 robot 表中的配置
     */
    protected function getRobot()
    {
        return Db::name('robot')->where('UserName', $this->uid)->find();
    }

    /**
     * 获取 API 域名
     */
    protected function getApiDomain($default = '')
    {
        $robot = $this->getRobot();
        return $robot['api_domain'] ?? $default;
    }

    /**
     * 获取 Cookie Token
     */
    protected function getToken()
    {
        return $this->getRobot()['cookies'] ?? '';
    }

    /**
     * 发起 HTTP 请求
     */
    protected function httpRequest($url, $method = 'GET', $headers = [], $data = null, $useJson = false, $cookie = '')
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            if ($useJson) {
                $data = json_encode($data, JSON_UNESCAPED_UNICODE);
                $headers[] = 'Content-Type: application/json';
                $headers[] = 'Content-Length: ' . strlen($data);
            } else {
                $data = is_array($data) ? http_build_query($data) : $data;
                $headers[] = 'Content-Type: application/x-www-form-urlencoded';
            }
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        }

        if (!empty($headers)) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }

        if (!empty($cookie)) {
            curl_setopt($ch, CURLOPT_COOKIE, $cookie);
        }

        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            $error = curl_error($ch);
            curl_close($ch);
            return json_encode(['status' => 0, 'msg' => 'Curl Error: ' . $error]);
        }

        curl_close($ch);
        return $response;
    }
}
