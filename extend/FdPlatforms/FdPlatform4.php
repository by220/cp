<?php

namespace FdPlatforms;

use think\Db;
use think\Cache;

class FdPlatform4
{
    protected $config;
    protected $host = "";
    protected $referer = 'http://fs8899.xyz/';
    public function __construct($cf)
    {
        $this->config = Db::name('rbfly')->where('uid', $cf['uid'])->find();
        $this->config['host'] =  $cf['host'];
    }


    public function login($id = "", $data = array())
    {
       // $code = $this->getImgcode($id);
       // $codearr = $code['Data'];
        $postdata = array(
            'account' => $data['username'],
            'code' => $data['code'],
            'password' => $data['password'],
            'uniqid' => $data['uniqid'],
        );
        $url = $this->config['host'] . '/api/Login/account';
        $response = $this->httpRequest($url, 'POST', null, $postdata);
        $response = json_decode($response, true);
        if (isset($response['code']) && $response['code'] == 1 && isset($response['data']['token'])) {
            // 登录成功
            $token = $response['data']['token'];
            Cache::set('fly_token_' . $id, $token, 0);
            return ['bOK' => 0, 'Message' => "登陆成功", "Data" => $token];
        } else {
            // 登录失败
            $response['code'] = $data['code'];
            return ['bOK' => 1, 'Message' => "登陆失败，可能账号密码错误", "Data" => $response];
        }
    }

    public function getCmd($value)
    {
        $str = $value['text'];
        $frist = mb_substr($str, 0, 1, "UTF-8");
        $last = mb_substr($str, 1, strlen($str), "UTF-8");
        $arr2 = explode('/', $str);
        $balls = '';
        $score = intval($value['score']);
        $phase = $value['qihao'];
        $rate = 0;

        $daxiao = ['单', '双', '大', '小', '13', '24', '31', '42',];
        $zheng = ['1', '2', '3', '4', '1正', '2正', '3正', '4正', '1堂', '2堂', '3堂', '4堂', '1无3', '2无4', '3无1', '4无2'];
        $jiao = ['12角', '23角', '34角', '14角', '13角', '24角', '12', '23', '34', '14', '13', '24', '21角', '32角', '31角', '43角', '42角', '41角', '31', '42', '21', '32', '43', '41'];

        if (strstr($str, '特')) {
        } elseif (strstr($str, '番')) {
            $balls = $frist . '番';
            $rate = 3.85;
        } elseif (strstr($str, '翻')) {
            $balls = $frist . '番';
            $rate = 3.85;
        } elseif (in_array($frist, $daxiao) || in_array($arr2[0], $daxiao)) {
            $rate = 1.95;
            if (strstr($str, '大')) {
                $balls = '大';
            } elseif (strstr($str, '小')) {
                $balls = '小';
            } elseif (strstr($str, '单') || $arr2[0] == 13 || $arr2[0] == 31) {
                $balls = '单';
            } elseif (strstr($str, '双') || $arr2[0] == 24 || $arr2[0] == 42) {
                $balls = '双';
            }
        } elseif (strstr($str, '正') || strstr($str, '堂') || in_array($arr2[0], $zheng)) {
            $rate = 1.95;
            if (in_array($arr2[0], $zheng)) {
                if ($arr2[0] == '1无3') {
                    $frist = '1';
                } elseif ($arr2[0] == '2无4') {
                    $frist = '2';
                } elseif ($arr2[0] == '3无1') {
                    $frist = '3';
                } else {
                    $frist = '4';
                }
            }
            $balls =  $frist . '正';
        } elseif (strstr($str, '角') || in_array($arr2[0], $jiao)) {
            if (in_array($arr2[0], $jiao)) {
                $j = $arr2[0];
            } else {
                $arr3 = explode('角', $str);
                $j = $arr3[0];
            }
            $rate = 1.95;
            $balls = $j . '角';
        } elseif (strstr($str, '严') || strstr($str, '念') || strstr($str, '连')) {
            if (strstr($str, '/')) {
                if (strstr($arr2[0], '严')) {
                    $arr3 = explode('严', $arr2[0]);
                }
                if (strstr($arr2[0], '念')) {
                    $arr3 = explode('念', $arr2[0]);
                }
                if (strstr($arr2[0], '连')) {
                    $arr3 = explode('连', $arr2[0]);
                }
                $one = $arr3[0];
                $two = $arr3[1];
            } else {
                if (strstr($str, '严')) {
                    $arr3 = explode('严', $str);
                }
                if (strstr($str, '念')) {
                    $arr3 = explode('念', $str);
                }
                if (strstr($str, '连')) {
                    $arr3 = explode('连', $str);
                }
                $one = substr($arr3[0], 0, 1);
                $two = substr($arr3[0], 1, 1);
            }
            $rate = 2.9;
            $balls = $one . '念' . $two;
        }

        $data = array(
            'goods_id' => '10014',                      // 商品 ID
            'garr' => array(                            // 商品属性数组
                array(
                    'label' => $balls,                    // 属性标签
                    'amount' => $score                        // 数量
                )
            )
        );
        return $data;
    }

    public function getImgcode($id)
    {
        if ($id == "")
            return ['bOK' => 1, 'Message' => "系统异常"];
        $cookie_path = ROOT_PATH . "flyers/cookie/{$id}.txt"; //cookie文件保存的路径 当前路径下的cookie目录
        $file_path = ROOT_PATH . "flyers/images/{$id}.jpg";
        $url = $this->config['host'] . '/api/Common/captcha';
        $response = $this->httpRequest($url);
        $response = json_decode($response, true);
        if (isset($response['data']['image'])) {
            $base64Image = $response['data']['image'];

            $code = $this->recognizeDigitsFromBase64($base64Image);

            if ($code == false || $code == "") {
                return ['bOK' => 1, 'Message' => "验证码解析失败", "Data" => null];
            }
            $redata['code'] = $code;
            $redata['uniqid'] =  $response['data']['uniqid'];
            return ['bOK' => 0, 'Message' => '验证码获取成功', "Data" => $redata];
        } else {
            return ['bOK' => 1, 'Message' => "验证码获取失败"];
        }
    }

    public function getCaptchaImage($id)
    {
        if ($id == "")
            return ['bOK' => 1, 'Message' => "系统异常"];
        $url = $this->config['host'] . '/api/Common/captcha';
        $response = $this->httpRequest($url);
        $response = json_decode($response, true);
        if (isset($response['data']['image'])) {
            $redata['base64Image']  = $response['data']['image'];
            $redata['uniqid'] =  $response['data']['uniqid'];
            return ['bOK' => 0, 'Message' => '验证码获取成功', "Data" => $redata];
        } else {
            return ['bOK' => 1, 'Message' => "验证码获取失败"];
        }
    }

    public function subMake($info, $data)
    {
        $jsonData = json_encode($data, JSON_UNESCAPED_UNICODE);
        $cookie = Cache::get('fly_token_' . $info['fly_id']);
        $url = $this->config['host'] . 'api/Goods/addorder';
        $response = $this->httpRequest($url, 'POST', null, $data, $cookie);
        echo $response.PHP_EOL;
        $reqarr = json_decode($response, 1);
        $msg = 3;
        if (isset($reqarr['code'])) {
            if ($reqarr['msg'] == '下注成功') {
                $msg = 2;
            } else {
                $msg = 3;
            }
        }
        return $msg;
    }

    public function getInfo($id, $rb, $wp)
    {
        $url = $this->config['host'] . '/api/User/center';
        $token = Cache::get('fly_token_' . $id);
        $response = $this->httpRequest($url, 'POST', null, null, $token);
        $response = json_decode($response, 1);
        if (isset($response['code']) && $response['code'] == 1 && !empty($response['data']['id'])) {
            return ['bOK' => 0, 'Message' => "获取成功", "Data" => $response['data']];
        } else {
            return ['bOK' => 1, 'Message' => "已掉线，请重新登录！", "Data" => $response];
        }
    }

    function recognizeDigitsFromBase64($base64Image)
    {
        // 1. 清理 base64 前缀
        $base64Image = preg_replace('/^data:image\/\w+;base64,/', '', $base64Image);
        $base64Image = str_replace(' ', '+', $base64Image);

        // 2. 创建临时图像文件
        $tmpFile = tempnam(sys_get_temp_dir(), 'captcha_') . '.png';
        file_put_contents($tmpFile, base64_decode($base64Image));

        try {
            // 3. 使用 Imagick 进行图像预处理
            $imagick = new \Imagick($tmpFile);
            $imagick->setImageType(\Imagick::IMGTYPE_GRAYSCALE);
            $imagick->adaptiveResizeImage(200, 64);  // 根据验证码固定尺寸调整
            $imagick->contrastImage(1);              // 增强对比
            $imagick->statisticImage(\Imagick::STATISTIC_MEDIAN, 3, 3); // 平滑去噪
            $imagick->deskewImage(0.4);              // 倾斜校正，避免 7 被误识为 >
            $imagick->thresholdImage(0.6 * \Imagick::getQuantumRange()['quantumRangeLong']);

            // 使用形态学开操作清除小噪点而保留结构
            $kernel = \ImagickKernel::fromBuiltIn(\Imagick::KERNEL_DISK, "1");
            $imagick->morphology(\Imagick::MORPHOLOGY_OPEN, 1, $kernel);

            $imagick->writeImage($tmpFile);  // 写回临时图像用于 OCR

            // 4. 调用 Tesseract OCR
            $outputPath = $tmpFile . '_out';
            $command = "tesseract {$tmpFile} {$outputPath} -l eng --psm 7 --oem 1";
            exec($command, $output, $returnVar);

            // 5. 读取 OCR 结果并提取数字
            if ($returnVar === 0 && file_exists($outputPath . ".txt")) {
                $rawResult = trim(file_get_contents($outputPath . ".txt"));
                $digitsOnly = preg_replace('/\D/', '', $rawResult);  // 去除非数字字符
                return $digitsOnly;
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return false;
        } finally {
            //   @unlink($tmpFile);
            @unlink($outputPath . ".txt");
        }
    }





    /**
     * 发起 HTTP 请求
     */
    protected function httpRequest($url, $method = 'GET', $headers = [], $data = null, $cookie = '')
    {
        $headers[] = 'Referer: ' . $this->referer;
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            $data = json_encode($data, JSON_UNESCAPED_UNICODE);
            $headers[] = 'Content-Type: application/json';
            $headers[] = 'Content-Length: ' . strlen($data);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        } else {
        }
        if (!empty($cookie)) {
            $headers[] = 'Token: ' . $cookie;
        }
        if (!empty($headers)) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }

     //   if (!empty($cookie)) {
       //     curl_setopt($ch, CURLOPT_COOKIE, $cookie);
      //  }

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
