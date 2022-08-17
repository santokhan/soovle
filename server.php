<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
/**
 * This file required json data from client
 */
require_once(__DIR__ . '/./simple_html_dom.php');
$GLOBALS['title_link'] = [
    'title' => [],
    'title2' => [],
    'link' => [],
    'link2' => [],
    'related' => []
];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = $_POST['search'];
    if (str_contains($input, ' ')) {
        $keyword = str_replace(" ", "+", $input);
    }
    $keyword = json_encode($input);
    // echo $keyword;
    scrape_google($keyword);
} else {
    echo 'Request method is not valid';
}


function scrape_google($keyword): void
{
    $get_html_dom = file_get_html("https://www.google.com/search?q=allintitle:$keyword");
    if (gettype($get_html_dom) === 'object') {
        /**
         * search result = #appbar
         * 
         * id main = #main #rcnt #center_col #res
         *     
         * id search keyword = #main #rcnt #center_col #res #bres a[data-xbu]
         * 
         * document.querySelectorAll("#rso > div > div > div > div > div a")
         * 
         * '#rso a[href^=https][data-ved][ping]'
         */

        foreach ($get_html_dom->find('#main a[href]') as $a) {
            $url = $a->getAttribute('href');
            if (domain_cheker($url)) {
                foreach ($a->find('h3') as $title) {
                    if (isset($title)) {
                        $GLOBALS['title_link']['title'][] = $title->plaintext;

                        $trim_url = trim($url, '/url?q=');
                        $GLOBALS['title_link']['link'][] = $trim_url;
                    }
                }
            } else {
                global $redirect;
                $redirect = true;

                if (str_contains($url, 'https://')) {
                    foreach ($a->find('h3') as $title) {
                        if (isset($title)) {
                            $GLOBALS['title_link']['title2'][] = $title->plaintext;

                            $trim_url = trim($url, '/url?q=');
                            $GLOBALS['title_link']['link2'][] = $trim_url;
                        }
                    }
                }
            }
        }

        /**
         * Response back to client
         */
        echo json_encode($GLOBALS['title_link']);
    }
}


// validate
function domain_cheker(string $url): bool
{
    $status = false;
    if (str_contains($url, 'https://')) {
        $valid_domain = ["slideshare.net", "pinterest.com", "reddit.com", "tumblr.com", "vk.com", "medium.com", "linkedin.com", "quora.com", "groups.google.com", "wix.com", "answers.com", "scribd.com", "acebook.com", "twitter.com", "instagram.com", "books.google.com", "researchgate.net", "scholar.google.com",];
        foreach ($valid_domain as  $domain) {
            $status = str_contains($url, $domain) ? true : false;
            if ($status) {
                return $status;
            }
        };


        $host_filter = [".blogspot", ".wordpress", ".weebly", "/forum", "/index", "/topic", "/forums", "community", "thread", "threads", "communities", "/comments"];
        foreach ($host_filter as  $host) {
            $status = str_contains($url, $host) ? true : false;
            if ($status) {
                return $status;
            }
        };
    }
    return $status;
}
// var_dump(domain_cheker('https://www.pinterest.om/forum'));


function print_array($var): void
{
    echo '<pre>';
    if (gettype($var) === 'array') {
        print_r($var);
    } else {
        echo $var;
    }
    echo '</pre>';
}