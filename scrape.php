<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

/**
 * This file require 2 POST data such as keyword and data
 */


// API request validation
if (isset($_POST['keyword']) && isset($_POST['sugdata'])) {
    $keyword = $_POST['keyword'];
    $data = $_POST['sugdata'];
    // $data = '["key ring holder for wall","key ring holder clip","key ring holder bunnings","key ring holder wall hanging","key ring holder for belt","key ring holder amazon","key ring holder plastic","key ring holder wallet"]|||["key ring holder amazon","keychain holder amazon","key chain holder around neck","key fob holder amazon","key ring holder for apple airtag","airtag key ring holder","apple key ring holder","arm key ring holder"]|||["key ring and card holder","key ring ace hardware","key ring holder amazon"]|||[]';


    curl_request($keyword, $data);
} else {
    echo 'Invalid request method';
}


function curl_request(string $keyword, string $data): void
{
    $post = [
        'keyword' => base64_encode($keyword),
        'sugdata' => base64_encode($data),
    ];

    $ch = curl_init('https://api.keyworddecode.com/getdata.php');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    $response = curl_exec($ch);
    curl_close($ch);

    $final = unserialize(base64_decode($response));
    if (gettype($final) === 'array') {
        echo json_encode($final);
    }
}