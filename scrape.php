<?php


$GLOBALS['title_link'] = [
    'title' => [],
    'link' => [],
    'related' => []
];


if (isset($_POST['submit']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['search'])) {
        $keyword = $_POST['search'];

        scrape_google($keyword);
        // echo $keyword;
    }
}


$valid_links = [
    "slideshare.net",
    "pinterest.com",
    "reddit.com",
    "tumblr.com",
    "vk.com",
    "medium.com",
    "linkedin.com",
    "quora.com",
    "groups.google.com",
    "wix.com",
    "answers.com",
    "scribd.com",
    "acebook.com",
    "twitter.com",
    "instagram.com",
    "books.google.com",
    "researchgate.net",
    "scholar.google.com",
];


function scrape_google($keyword)
{
    $get_html_dom = file_get_html("https://www.google.com/search?q=$keyword");
    /**
     * '#main > div > div.Gx5Zad div.egMi0 a'
     * 
     * suggestion class = "Gx5Zad xpd EtOod pkphOe"
     * 
     * a[href^=/url?]
     */
    if (isset($get_html_dom)) {
        foreach ($get_html_dom->find('#main > div > div.Gx5Zad div.egMi0 a') as $a) {
            foreach ($a->find('h3') as $title) {
                array_push($GLOBALS['title_link']['title'], $title->plaintext);
            }
            $url = $a->getAttribute('href');
            $trim_url = trim($url, '/url?q=');
            array_push($GLOBALS['title_link']['link'], $trim_url);
        }
        foreach ($get_html_dom->find('#main > div > div.Gx5Zad > div > div.gGQDvd > a') as $a) {
            // echo $a->plaintext.'<br/>';
            array_push($GLOBALS['title_link']['related'], $a->plaintext);
        }
        // foreach ($get_html_dom->find('#main > div > div.Gx5Zad div.egMi0 a[href^=/url?q=]') as $url) {
        //     echo $url->getAttribute('href');
        //     echo $url->plaintext . '<br/>';
        //     array_push($GLOBALS['title_link']['link'], $link->plaintext);
        // }

        // print_array($GLOBALS['title_link']);
    }
}


function print_title_link(array $title_link_array)
{
    $length = count($title_link_array['title']);
    for ($title_index = 0; $title_index < $length; $title_index++) {
        $title = $title_link_array['title'][$title_index];
        $url = $title_link_array['link'][$title_index];

        $split_get_url_origin = explode("/", $url)[2];

        echo "<div class='py-2'>";
        echo "<div class='py-4 px-6 bg-white rounded-xl shadow-lg'>";

        echo "<h3 class='required:text-xl font-medium text-gray-900 py-1'>$title</h3>";
        echo "<a href='$url' class='underline hover:underline-none'>$split_get_url_origin/...</a>";

        echo '</div>';
        echo '</div>';
    }
}


function print_related_searches(array $related_searches)
{
    echo "<div class='py-4'>
    <div class='bg-white rounded-xl border py-4 px-6'>
    <div class='text-xl font-medium py-2'>Related Searches</div>";

    foreach ($related_searches as $keyword) {
        $url = http_build_query(['q' => $keyword]);

        echo "<div class='py-4 px-4'>";
        echo "<a href='https://www.google.com/search?$url' class='underline hover:underline-none'>$keyword</a>";
        echo "</div>";
        echo "<hr>";
    }

    echo "</div>";
    echo "</div>";
}


function print_array(array $array)
{
    echo '<pre>';
    print_r($array);
    echo '</pre>';
}