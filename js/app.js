const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const whQuestion = [
  "what",
  "where",
  "which",
  "who",
  "how",
  "when",
  "are",
  "is",
  "do",
];
const prefix = ["best", "most", "new", "unique", "learn", "how_to", "top"];
const suffix = [
  "to",
  "must",
  "with",
  "for",
  "under",
  "and",
  "vs",
  "or",
  "like",
];
let linkStyle = "text-gray-900 hover:underline hover:text-gray-800 py-1";

$(document).ready(function () {
  $("#searchForm").submit(function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get("search");
    const newKeyList = {};

    alphabet.map((e) => {
      const letter = e;
      const keyword = value + " " + e;

      QueryKeyword(keyword, "google", function (res) {
        let retList = res[1];

        newKeyList[letter] = [...new Set(retList)];
      });

      QueryKeyword(keyword, "bing", function (res) {
        let retList = res[1];

        newKeyList[letter] = [...new Set(retList)];
      });

      QueryKeyword(keyword, "yahoo", function (res) {
        let retList = [];
        let { results } = res.gossip;
        results.forEach((e) => {
          retList.push(e["key"]);
        });

        newKeyList[letter] = [...new Set(retList)];
      });
    });
    /**
     * Most Important Part
     */
    setTimeout(() => {
      // console.log(newKeyList);
      for (const key in newKeyList) {
        if (Object.hasOwnProperty.call(newKeyList, key)) {
          const element = newKeyList[key];
          const card_id = key;
          let html = "";

          element.map((e) => {
            html = html + `${e}<br/>`;
            // console.log(e);
          });

          $("#cards").removeClass("hidden");

          $(`#card_${card_id}`).empty().append(html);

          CopyFunc(card_id, element);
        }
      }
    }, 1800);

    newKeywordWithQuestion = {};
    whQuestion.map((wh) => {
      const letter = wh;
      const keyword = wh + " " + value;

      QueryKeyword(keyword, "google", function (res) {
        let retList = res[1];
        newKeywordWithQuestion[letter] = [...new Set(retList)];
      });

      QueryKeyword(keyword, "bing", function (res) {
        let retList = res[1];
        newKeywordWithQuestion[letter] = [...new Set(retList)];
      });

      QueryKeyword(keyword, "yahoo", function (res) {
        let retList = [];
        let { results } = res.gossip;
        results.forEach((e) => {
          retList.push(e["key"]);
        });

        newKeywordWithQuestion[letter] = [...new Set(retList)];
      });
    });
    /**
     * Most Important Part 2
     */
    setTimeout(() => {
      for (const key in newKeywordWithQuestion) {
        if (Object.hasOwnProperty.call(newKeywordWithQuestion, key)) {
          const element = newKeywordWithQuestion[key];
          const card_id = key;
          let htmlQuestion = "";

          element.map((keyword) => {
            htmlQuestion += `${keyword}<br/>`;
          });

          $("#questionCards").removeClass("hidden");
          $(`#card_${card_id}`).empty().append(htmlQuestion);

          CopyFunc(card_id, element);
        }
      }
    }, 1500);

    const newPrefixKeyword = {};
    prefix.map((word) => {
      const letter = word;
      const keyword = word + " " + value;

      QueryKeyword(keyword, "google", function (res) {
        let retList = res[1];
        newPrefixKeyword[letter] = [...new Set(retList)];
      });

      QueryKeyword(keyword, "bing", function (res) {
        let retList = res[1];
        newPrefixKeyword[letter] = [...new Set(retList)];
      });

      QueryKeyword(keyword, "yahoo", function (res) {
        let retList = [];
        let { results } = res.gossip;
        results.forEach((e) => {
          retList.push(e["key"]);
        });

        newPrefixKeyword[letter] = [...new Set(retList)];
      });
    });
    /**
     *  Most Important Part 2
     */
    setTimeout(() => {
      for (const key in newPrefixKeyword) {
        if (Object.hasOwnProperty.call(newPrefixKeyword, key)) {
          const element = newPrefixKeyword[key];
          const card_id = key;
          let prefixHtml = "";
          element.map((e) => {
            prefixHtml += `${e}<br/>`;
          });

          $("#prefix").removeClass("hidden");

          $(`#card_${card_id}`).empty().append(prefixHtml);

          CopyFunc(card_id, element);
        }
      }
    }, 2000);

    const newSuffixKeyword = {};
    suffix.map((word) => {
      const letter = word;
      const keyword = value + " " + word;

      QueryKeyword(keyword, "google", function (res) {
        let retList = res[1];
        newPrefixKeyword[letter] = [...new Set(retList)];
      });

      QueryKeyword(keyword, "bing", function (res) {
        let retList = res[1];
        newPrefixKeyword[letter] = [...new Set(retList)];
      });

      QueryKeyword(keyword, "yahoo", function (res) {
        let retList = [];
        let { results } = res.gossip;
        results.forEach((e) => {
          retList.push(e["key"]);
        });

        newPrefixKeyword[letter] = [...new Set(retList)];
      });
    });
    /**
     *  Most Important Part 2
     */
    setTimeout(() => {
      for (const key in newSuffixKeyword) {
        if (Object.hasOwnProperty.call(newSuffixKeyword, key)) {
          const element = newSuffixKeyword[key];
          const card_id = key;
          let prefixHtml = "";
          element.map((e) => {
            prefixHtml += `${e}<br/>`;
          });

          $("#suffix").removeClass("hidden");

          $(`#card_${card_id}`).empty().append(prefixHtml);

          CopyFunc(card_id, element);
        }
      }
    }, 2500);
  });
});

function QueryKeyword(keyword, site, callback) {
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
        q: querykeyword,
        client: "chrome",
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

function showHideAnswer(target) {
  const element = document.getElementById(target);

  if (element.classList.contains("hidden") == true) {
    document.querySelectorAll(".answer").forEach((e) => {
      e.classList.add("hidden");
    });

    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}
