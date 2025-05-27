<?php

namespace FdPlatforms;

use think\Db;
use think\Cache;
use Kszny\Ks;

class FdPlatform5
{
    protected $config;
    protected $host = "";
    protected $referer = 'http://wns168.cc/';
    public function __construct($cf)
    {
        $this->config = Db::name('rbfly')->where('uid', $cf['uid'])->find();
        $this->config['host'] =  $cf['host'];
    }


    public function login($id = "", $data = array())
    {
        //$cookie_path = ROOT_PATH . "flyers/cookie/{$id}.txt";
        // $getImgcode = $this->getImgcode($id);
        // if ($getImgcode['bOK'] == 0){
        //     $image_file             = ROOT_PATH . "flyers/images/{$id}.jpg";
        //     $code = $this->recognizeDigitsFromBase64($image_file);
        //     if ($code == false || $code == ""){
        //         return ['bOK'=>1,'Message'=>"验证码解析失败","Data" => $code];
        //     }
        // }else return $getImgcode;
        $flyinfo =
            $postdata = array(
                'd[username]' => $data['username'],
                'd[code]' =>  $data['code'],
                'd[password]' => $data['password']
            );
        $url = $this->config['host'] . 'API/?a=login';
        $postData = http_build_query($postdata);
        // 创建一个cURL句柄
        $ch = curl_init();
        $coookies = Cache::get('fly_code_' . $id);
        preg_match('/X=([^;]*)/', $coookies, $matchX);
        preg_match('/_d_id=([^;]*)/', $coookies, $matchDId);

        // 获取提取的值
        $xValue = isset($matchX[1]) ? $matchX[1] : '';
        $dIdValue = isset($matchDId[1]) ? $matchDId[1] : '';

        // 组合成新的字符串
        $newString = "X=$xValue; _d_id=$dIdValue";

        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $postData,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/x-www-form-urlencoded',
            ],
            CURLOPT_COOKIE => $newString,
            CURLOPT_HEADER => true, // 包括响应头，便于解析 Set-Cookie
            CURLOPT_TIMEOUT => 15, // 设置超时时间
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        ]);

        // 执行 cURL 请求
        $response = curl_exec($ch);

        // 检查是否发生错误
        if ($response === false) {
            curl_close($ch);
            return ['bOK' => 1, 'Message' => "请求失败"];
        }

        // 获取响应头和主体
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $responseHeader = substr($response, 0, $headerSize);
        $responseBody = substr($response, $headerSize);

        // 关闭 cURL
        curl_close($ch);
        // 解析 JSON 响应
        $responseData = json_decode($responseBody, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return ['bOK' => 1, 'Message' => "请求失败"];
        }

        // 检查登录结果
        if (isset($responseData['code']) && $responseData['code'] == 1) {
            Cache::set('fly_token_' . $id, $newString, 0);
            return ['bOK' => 0, 'Message' => "登录成功"];
        } else {
            return ['bOK' => 1, 'Message' => "登录失败", 'Data' => $responseData];
        }
    }

    public function getCmd($value)
    {
        $str = $value['text'];
        $frist = mb_substr($str, 0, 1, "UTF-8");
        $last = mb_substr($str, 1, strlen($str), "UTF-8");
        $arr2 = explode('/', $str);
        $balls = '';
        $score = $value['score'];
        $phase = $value['qihao'];
        $rate = 0;

        $daxiao = ['单', '双', '大', '小', '13', '24', '31', '42',];
        $zheng = ['1', '2', '3', '4', '1正', '2正', '3正', '4正', '1堂', '2堂', '3堂', '4堂', '1无3', '2无4', '3无1', '4无2'];
        $jiao = ['12角', '23角', '34角', '14角', '13角', '24角', '12', '23', '34', '14', '13', '24', '21角', '32角', '31角', '43角', '42角', '41角', '31', '42', '21', '32', '43', '41'];

        if (strstr($str, '特')) {
        } elseif (strstr($str, '番')) {
            $balls = 'fan_' . $frist;
            $rate = 3.85;
        } elseif (strstr($str, '翻')) {
            $balls = 'fan_' . $frist;
            $rate = 3.85;
        } elseif (in_array($frist, $daxiao) || in_array($arr2[0], $daxiao)) {
            $rate = 1.95;
            if (strstr($str, '大')) {
                $balls = 'sm_da';
            } elseif (strstr($str, '小')) {
                $balls = 'sm_xiao';
            } elseif (strstr($str, '单') || $arr2[0] == 13 || $arr2[0] == 31) {
                $balls = 'sm_dan';
            } elseif (strstr($str, '双') || $arr2[0] == 24 || $arr2[0] == 42) {
                $balls = 'sm_shuang';
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
            $balls = 'zheng_' . $frist;
        } elseif (strstr($str, '角') || in_array($arr2[0], $jiao)) {
            if (in_array($arr2[0], $jiao)) {
                $j = $arr2[0];
            } else {
                $arr3 = explode('角', $str);
                $j = $arr3[0];
            }
            $rate = 1.95;
            $balls = 'jiao_' . $j;
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
            $balls = 'nian_' . $one . $two;
        }

        $data = array(
            'd[gamename]' => '168xyft',
            'd[gametype]' => 0,
            'platform' => 1,
            'd[phase]' => $phase,
            'd[total]' => $score,
            'd[data][0][id]' => $balls,
            'd[data][0][odds]' => $rate,
            'd[data][0][amount]' => $score,
        );
        return $data;
    }

    public function getImgcode($id)
    {
        if ($id == "")
            return ['bOK' => 1, 'Message' => "系统异常"];
        $cookie_path = ROOT_PATH . "flyers/cookie/{$id}.txt"; //cookie文件保存的路径 当前路径下的cookie目录
        $file_path = ROOT_PATH . "flyers/images/{$id}.jpg";
        $r = mt_rand() / mt_getrandmax();
        $url = $this->config['host'] . '/verify.php?r=' . $r;
        // 创建一个cURL句柄
        $ch = curl_init();

        // 设置验证码图片请求的URL
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_path);

        // 执行cURL会话
        $response = curl_exec($ch);

        // 检查是否发生错误
        if ($response === false) {
            return ['bOK' => 1, 'Message' => "验证码获取失败"];
        }

        // 获取响应头大小
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);

        // 提取图片数据
        $imageData = substr($response, $headerSize);

        // 保存图片到本地
        file_put_contents($file_path, $imageData);

        // 关闭cURL句柄
        curl_close($ch);

        return ['bOK' => 0, 'Message' => '验证码获取成功'];
    }


    public function getCaptchaImage($id)
    {
        if ($id == "")
            return ['bOK' => 1, 'Message' => "系统异常"];
        $cookie_path = ROOT_PATH . "flyers/cookie/{$id}.txt"; //cookie文件保存的路径 当前路径下的cookie目录
        $file_path = ROOT_PATH . "flyers/images/{$id}.jpg";
        $r = mt_rand() / mt_getrandmax();
        $url = $this->config['host'] . '/verify.php?r=' . $r;
        // 创建一个cURL句柄
        $ch = curl_init();

        // 设置验证码图片请求的URL
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_path);

        // 执行cURL会话
        $response = curl_exec($ch);

        // 检查是否发生错误
        if ($response === false) {
            return ['bOK' => 1, 'Message' => "验证码获取失败"];
        }

        // 获取响应头大小
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);

        // 提取图片数据
        $imageData = substr($response, $headerSize);

        // 保存图片到本地
        file_put_contents($file_path, $imageData);

        preg_match_all("/set\-cookie:([^\r\n]*)/i", $response, $matches);
        if (count($matches[1]) > 0) {
            $cookie = implode("; ", $matches[1]);
            Cache::set('fly_code_' . $id, $cookie, 0);
        }

        // 关闭cURL句柄
        curl_close($ch);
        $redata['base64Image']  = 'data:image/png;base64,' . base64_encode($imageData);
        $redata['uniqid'] =  '';
        return ['bOK' => 0, 'Message' => '验证码获取成功', "Data" => $redata];
    }

    public function subMake($info, $data)
    {
        $cookie = Cache::get('fly_token_' . $info['fly_id']);
        $url = $this->config['host'] . 'v4/API/?a=Bet';
        $curl = curl_init();
        $postData = http_build_query($data);

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $postData,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/x-www-form-urlencoded',
            ),
            CURLOPT_COOKIE => $cookie,
            CURLOPT_TIMEOUT => 10, // 总超时时间，单位为秒
            CURLOPT_CONNECTTIMEOUT => 5, // 连接超时时间，单位为秒
        ));

        $response = curl_exec($curl);
        $response = json_decode($response,1);
        if (curl_errno($curl)) {
            return 3;
        }
        curl_close($curl);
        $msg = 3;
        if (isset($response['code'])) {
            if($response['code'] == 1) {
                if ($response['msg'] == null) {
                    $msg = 2;
                } else {
                    $msg = 3;
                }
            }
        }
        return $msg;
    }

    public function getInfo($id, $rb, $wp)
    {
        $url = $this->config['host'] . 'v4/API/?a=balance';
        $token = Cache::get('fly_token_' . $id);
        $ch = curl_init();
        curl_setopt_array($ch, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/x-www-form-urlencoded',
            ),
            CURLOPT_COOKIE => $token,
            CURLOPT_HEADER => 0,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_CONNECTTIMEOUT => 10
        ));
        // 执行cURL会话
        $response = curl_exec($ch);
        $req = json_decode($response, 1);
        $reqdata = $req['data'];
        if ($reqdata == null) {
            return ['bOK' => 1, 'Message' => "已掉线，请重新登录！", "Data" => $reqdata];
        } else {
            return ['bOK' => 0, 'Message' => "获取成功", "Data" => $reqdata];
        }
    }

    function recognizeDigitsFromBase64($Imagefile)
    {
        // 2. 创建临时图像文件
        $tmpFile = $Imagefile;
        try {
            $imagick = new \Imagick($tmpFile);
            $imagick->setImageType(\Imagick::IMGTYPE_GRAYSCALE);
            $imagick->adaptiveResizeImage(80, 38);
            $imagick->contrastImage(1);
            $imagick->sharpenImage(2, 1);
            $imagick->blurImage(1, 0.5);
            $imagick->thresholdImage(0.6 * \Imagick::getQuantumRange()['quantumRangeLong']);

            $kernel = \ImagickKernel::fromBuiltIn(\Imagick::KERNEL_DISK, "1");
            $imagick->morphology(\Imagick::MORPHOLOGY_OPEN, 1, $kernel);

            $imagick->writeImage($tmpFile); // 保存处理图像

            $outputPath = $tmpFile . '_out';
            $command = "tesseract {$tmpFile} {$outputPath} -l eng --psm 8 --oem 1";
            exec($command, $output, $returnVar);

            if ($returnVar === 0 && file_exists($outputPath . ".txt")) {
                $rawResult = trim(file_get_contents($outputPath . ".txt"));
                $digitsOnly = preg_replace('/\D/', '', $rawResult);
                return $digitsOnly;
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return false;
        } finally {
            // @unlink($tmpFile);
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

            // 如果 $data 是数组，转换成 URL 编码字符串
            if (is_array($data)) {
                $data = http_build_query($data);
            }

            $headers[] = 'Content-Type: application/x-www-form-urlencoded';
            $headers[] = 'Content-Length: ' . strlen($data);

            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        }
        if (!empty($headers)) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }

        if (!empty($cookie)) {
            curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie);
            curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie);
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

    public function httpPost($id, $url, $data)
    {
        $postData = http_build_query($data);
        // 创建一个cURL句柄
        $ch = curl_init();
        $coookies = Cache::get('fly_token_' . $id);
        preg_match('/X=([^;]*)/', $coookies, $matchX);
        preg_match('/_d_id=([^;]*)/', $coookies, $matchDId);

        // 获取提取的值
        $xValue = isset($matchX[1]) ? $matchX[1] : '';
        $dIdValue = isset($matchDId[1]) ? $matchDId[1] : '';

        // 组合成新的字符串
        $newString = "X=$xValue; _d_id=$dIdValue";
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $postData,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/x-www-form-urlencoded',
            ],
            CURLOPT_COOKIE => $newString,
            CURLOPT_HEADER => true, // 包括响应头，便于解析 Set-Cookie
            CURLOPT_TIMEOUT => 15, // 设置超时时间
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        ]);

        // 执行 cURL 请求
        $response = curl_exec($ch);

        // 检查是否发生错误
        if ($response === false) {
            curl_close($ch);
            return ['bOK' => 1, 'Message' => "请求失败："];
        }

        // 获取响应头和主体
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $responseHeader = substr($response, 0, $headerSize);
        $responseBody = substr($response, $headerSize);

        // 关闭 cURL
        curl_close($ch);
        // 解析 JSON 响应
        $responseData = json_decode($responseBody, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return ['bOK' => 1, 'Message' => "失败", "Data" => $responseData];
        }
        return ['bOK' => 0, 'Message' => "成功", "Data" => $responseData];
    }
}
