
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Google Tag Manager -->
    <script>
    (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-NBFQ9VS');
    </script>
    <!-- End Google Tag Manager -->

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <link rel="stylesheet" href="./css/tailwind.css" />
    <link rel="apple-touch-icon" type="text/png" href="img/touch/48.png" />
    <link rel="shortcut icon" href="./favicon.png" type="image/x-icon">
    <title>SOOVLE</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
            "@type": "Question",
            "name": "What is Soovle?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Soovle is a powerful keyword research tool that can help you tool used for finding topics from different search engines including Google, Bing, Yahoo, YouTube, Amazon & eBay."
            }
        }, {
            "@type": "Question",
            "name": "How to Use Soovle?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Type a keyword/search term/topic and press enter. Check out suggestions from different search engines and copy the ones relevant to your next blog post or video. Use those keywords as outline for your article/video."
            }
        }, {
            "@type": "Question",
            "name": "Is Soovle free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes Soovle is 100% free and does not have any limitations."
            }
        }]
    }
    </script>
    <script>
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
    </script>
</head>

<body class="sm:h-screen sm:overflow-hidden ">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NBFQ9VS" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <main>
        <div class="flex py-10">
            <!-- Desktop ads -->
            <div class="hidden sm:block w-2/12 px-2">
                <div class="rounded-xl sm:rounded-2xl flex justify-center">
                    <div>
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2489885381183873" crossorigin="anonymous"></script>
                        <!-- Soovle Ad Desktop -->
                        <ins class="adsbygoogle" style="display:inline-block;width:160px;height:600px" data-ad-client="ca-pub-2489885381183873" data-ad-slot="2799759162"></ins>
                        <script>
                        (adsbygoogle = window.adsbygoogle || []).push({});
                        </script>
                    </div>
                </div>
            </div>

            <div class="w-full sm:w-8/12 px-2 overflow-y-auto search-container rounded-xl border">
                <section class="pt-7">
                    <!-- Mobile ads -->
                    <div class="py-4 flex justify-center sm:hidden">
                        <div class="w-full">
                            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2489885381183873" crossorigin="anonymous"></script>
                            <!-- Soovle Mobile -->
                            <ins class="adsbygoogle" style="display:inline-block;width:320px;height:100px" data-ad-client="ca-pub-2489885381183873" data-ad-slot="4773270096"></ins>
                            <script>
                            (adsbygoogle = window.adsbygoogle || []).push({});
                            </script>
                        </div>
                    </div>
                </section>

                <div class="rounded-xl sm:rounded-2xl py-6 lg:px-12 lg:pb-12">
                    <div class="pb-6 text-2xl font-medium flex justify-center text-gray-900"><span>Search</span></div>
                    <!------------- Form  ------------->
                    <form class="py-0 px-4 sm:p-4 md:px-10 md:py-4" id="searchForm" method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
                        <div class="sm:px-2 md:px-10 flex item-center relative">
                            <input class="w-full py-3 px-6 rounded-full appearance-none border-2 border-white leading-tight focus:outline-none  focus:border-gray-900 shadow-lg" id="search" required
                                name="search" placeholder="Search your keyword">
                            <button type="submit" name="submit" title="form_submit" class="absolute right-4 sm:right-14 top-3"><i class="fas fa-search text-xl"></i></button>
                        </div>
                    </form>

                    <div class="p-10">
                        <div class="text-xl font-medium py-2">Results</div>
                        <?php
                        if ($GLOBALS['title_link']['title'] && $GLOBALS['title_link']['link']) {
                            print_title_link($GLOBALS['title_link']);
                        }
                        if (count($GLOBALS['title_link']['related']) > 0) {
                            print_related_searches($GLOBALS['title_link']['related']);
                        }
                        ?>

                        <!-- Add hidden className below -->
                        <div class="hidden">
                            <div class="py-2">
                                <div class="py-4 px-6 bg-white rounded-xl shadow-lg">
                                    <h3 class="text-xl font-medium text-gray-900 py-1">Title</h3>
                                    <a href="" class="underline hover:underline-none">Link</a>
                                </div>
                            </div>
                            <div class="py-2">
                                <div class="py-4 px-6 bg-white rounded-xl shadow-lg">
                                    <h3 class="text-xl font-medium text-gray-900 py-1">Title</h3>
                                    <a href="" class="underline hover:underline-none">Link</a>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl border py-4 px-6 hidden">
                            <div class="text-xl font-medium py-2">Related Searches</div>
                            <?php if (isset($keyword)) {
                                scrape_google($keyword);
                            } ?>
                            <div class="py-4 px-4">
                                <a href="" class="underline hover:underline-none">Link</a>
                            </div>
                            <hr>
                            <div class="py-4 px-4">
                                <a href="" class="underline hover:underline-none">Link</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Desktop ads -->
            <div class="hidden sm:block w-2/12 px-2">
                <div class="rounded-xl sm:rounded-2xl flex justify-center">
                    <div>
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2489885381183873" crossorigin="anonymous"></script>
                        <!-- Soovle Ad Desktop -->
                        <ins class="adsbygoogle" style="display:inline-block;width:160px;height:600px" data-ad-client="ca-pub-2489885381183873" data-ad-slot="2799759162"></ins>
                        <script>
                        (adsbygoogle = window.adsbygoogle || []).push({});
                        </script>
                    </div>
                </div>
            </div>
        </div>
    </main>


    <script defer src="https://use.fontawesome.com/releases/v5.15.4/js/all.js" integrity="sha384-rOA1PnstxnOBLzCLMcre8ybwbTmemjzdNlILg8O7z1lUkLXozs4DHonlDtnE7fpc" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <!-- <script async src="./js/app.js"></script> -->
</body>

</html>
