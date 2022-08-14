const copyAllKeys = {};

$(document).ready(function () {
  $("#searchForm").submit(function (e) {
    e.preventDefault();
  });
});

function QueryKeyword(keyword, site, callback, country, language) {
  let querykeyword = keyword;
  let website = site;

  if (querykeyword === "") {
    // Hide if input is empty
    $("#cards").addClass("hidden");
  }

  if (website == "google") {
    $.ajax({
      url: "https://suggestqueries.google.com/complete/search",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        client: "chrome",
        q: querykeyword,
        gl: country,
        hl: language,
      },
      success: callback,
    });
  }

  if (website == "youtube") {
    $.ajax({
      url: "https://suggestqueries.google.com/complete/search",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        q: querykeyword,
        client: "chrome",
        ds: "yt",
      },
      success: callback,
    });
  }

  if (website == "bing") {
    $.ajax({
      url: "https://api.bing.com/osjson.aspx?JsonType=callback&JsonCallback=?",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        Query: querykeyword,
        Market: "en-us",
      },
      success: callback,
    });
  }

  if (website == "yahoo") {
    $.ajax({
      url: "https://search.yahoo.com/sugg/gossip/gossip-us-ura/",
      dataType: "jsonp",
      data: {
        command: querykeyword,
        nresults: "20",
        output: "jsonp",
      },
      success: callback,
    });
  }

  if (website == "amazon") {
    $.ajax({
      url: "https://completion.amazon.com/search/complete",
      dataType: "jsonp",
      data: {
        q: querykeyword,
        method: "completion",
        "search-alias": "aps",
        mkt: "1",
      },
      success: callback,
    });
  }

  if (website == "ebay") {
    $.ajax({
      url: "https://autosug.ebay.com/autosug",
      dataType: "jsonp",
      data: { client: "chrome", kwd: querykeyword, _dg: "1", sId: "0" },
      success: callback,
    });
  }

  if (website == "googlenews") {
    $.ajax({
      url: `https://suggestqueries.google.com/complete/search?`,
      dataType: "jsonp",
      data: { client: "chrome", ds: "n", gl: "BD", q: querykeyword },
      success: callback,
    });
  }

  if (website == "googleimages") {
    $.ajax({
      url: `http://suggestqueries.google.com/complete/search?`,
      dataType: "jsonp",
      data: { client: "chrome", ds: "i", gl: "BD", q: querykeyword },
      success: callback,
    });
  }

  if (website == "yandex") {
    $.ajax({
      url: `https://suggest.yandex.ru/suggest-ya.cgi?ct=text/html&part=`,
      dataType: "jsonp",
      data: { ct: "text/html", suggest: 1, part: querykeyword },
      success: callback,
    });
  }
}

function CopyFunc(cId, keywords) {
  const keys = keywords;
  const id = cId;

  const copyKeys = id.toUpperCase() + "\n" + keys.join("\n");
  const copyButton = document.querySelector(".card_" + id);
  copyButton.addEventListener("click", function (e) {
    navigator.clipboard.writeText(copyKeys);
    copyButton.innerHTML = "Copied";
    setTimeout(function () {
      copyButton.innerHTML = `<i class="fas fa-copy"></i><span> Copy</span>`;
    }, 3000);
  });
}
function copyAllKeyword() {
  let copyKeys = "";
  const downloadAll = document.getElementById("copy_all");
  downloadAll.addEventListener("click", function (e) {
    for (const key in copyAllKeys) {
      if (Object.hasOwnProperty.call(copyAllKeys, key)) {
        const element = copyAllKeys[key];
        copyKeys += key.toUpperCase() + "\n" + element.join("\n");
      }
    }

    navigator.clipboard.writeText(copyKeys);

    downloadAll.innerHTML = "Copied";
    setTimeout(function () {
      downloadAll.innerHTML = `<i class="fas fa-copy"></i><span> Copy All Keywords</span>`;
    }, 3000);
  });
}
copyAllKeyword();
