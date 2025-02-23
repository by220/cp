<?php

namespace Kszny;
use thiagoalessio\TesseractOCR\TesseractOCR;
use think\Log;

class Ks{
	protected $taken = "JXjugYwsNCc8YZZXWouI7wRcCb";
	protected $api = "https://www.345api.cn";

	public function __construct($taken = ""){
		if(isset($taken) && $taken != ""){
			$this->taken = $taken;
		} 
	}

    public function Post_base64_old($image_file){
        try {
            // 检查文件是否存在
            if (!file_exists($image_file)) {
                throw new \Exception("Image file not found: " . $image_file);
            }

            // 获取系统类型并设置对应的 Tesseract 路径
            $isWindows = strtoupper(substr(PHP_OS, 0, 3)) === 'WIN';
            $tesseractPath = $isWindows ? 'C:\Program Files\Tesseract-OCR\tesseract.exe' : '/usr/bin/tesseract';

            // 如果是 Windows 且默认路径不存在，尝试其他常见路径
            if ($isWindows && !file_exists($tesseractPath)) {
                $windowsPaths = [
                    'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe',
                    'D:\Tesseract-OCR\tesseract.exe'
                ];
                
                foreach ($windowsPaths as $path) {
                    if (file_exists($path)) {
                        $tesseractPath = $path;
                        break;
                    }
                }
            }

            // 检查 Tesseract 是否可用
            // if (!file_exists($tesseractPath)) {
            //     throw new \Exception("Tesseract not found at: " . $tesseractPath);
            // }

            // 设置临时目录
            $tempDir = ROOT_PATH . 'runtime/temp';
            if (!is_dir($tempDir)) {
                mkdir($tempDir, 0777, true);
            }

            // 设置环境变量
            // putenv('TESSDATA_PREFIX=' . ($isWindows ? dirname($tesseractPath) . '\tessdata' : '/usr/share/tesseract-ocr/4.00/tessdata'));

            // 创建 OCR 实例并配置
            $ocr = new TesseractOCR($image_file);
            $ocr->executable($tesseractPath)
                ->lang('eng')
                ->config('tessedit_char_whitelist', '0123456789')
                ->config('psm', '6')
                ->tempDir($tempDir);

            // 执行识别
            $resultText = trim($ocr->run());

            // 验证结果是否为纯数字
            // if (empty($resultText) || !preg_match('/^[0-9]+$/', $resultText)) {
            //     throw new \Exception("Invalid OCR result: " . $resultText);
            // }

            return $resultText;
        } catch (\Exception $e) {
            // 记录错误日志
            // Log::write('Tesseract Error: ' . $e->getMessage(), 'error');
            // Log::write('Image file: ' . $image_file, 'error');
            // Log::write('Tesseract path: ' . $tesseractPath, 'error');
            return false;
        }
    }

    public function Post_base64($image_file){
        try {
            // $imagePath = 'captcha.jpg'; // 图片路径
            $outputPath = 'output';     // 输出文件 (无后缀)
            $command = "tesseract {$image_file} {$outputPath} -l eng --psm 6 --oem 1 -c tessedit_char_whitelist=0123456789 -c user_defined_dpi=300";
            // 执行命令
            exec($command, $output, $returnVar);
            if ($returnVar === 0) {
                $result = file_get_contents("{$outputPath}.txt");
                return $result;
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return false;
        }
    }
	// public function Post_base64($base64_str){
	//     $API_URL = 'https://www.345api.cn/api/code/ocr';
    //     $API_KEY = 's7pvSEq6tJccEgJ0olzDUiiMWI';
	//     $get_post_data = array(
    //         //接口参数，一行一个，可按照用户控制台->开发工具 的参数填写，或者直接复制开发工具下面的测试代码。
    //         'key' => $API_KEY,
    //         'data' => $base64_str
    //     );
    //     $type = 'GET';
    //     $ifsign = true;
    //     $sk = '';
	// 	$get_post_data = http_build_query($get_post_data);
    //     if ($ifsign) {
    //         $sign = md5($get_post_data . $sk);
    //         $res = self::send_curl($API_URL, $type, $get_post_data, $sign);
    //     } else {
    //         $res = self::send_curl($API_URL, $type, $get_post_data, null);
    //     }
    //     $res = json_decode($res,true);
    //     if ($res['code']==200) {
    //         return $res['data']['code_data'];
    //     } else {
    //         return '';
    //     }
	// }
	
    //封装好的CURL请求函数,支持POST|GET
    public static function send_curl($API_URL, $type, $get_post_data, $sign)
    {
        $ch = curl_init();
        if ($type == 'POST') {
            curl_setopt($ch, CURLOPT_URL, $API_URL);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $get_post_data);
        } elseif ($type == 'GET') {
            curl_setopt($ch, CURLOPT_URL, $API_URL . '?' . $get_post_data);
        }
        if ($sign) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['sign:' . $sign]);
        }
        curl_setopt($ch, CURLOPT_REFERER, $API_URL);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $resdata = curl_exec($ch);
        curl_close($ch);
        return $resdata;
    }
}
