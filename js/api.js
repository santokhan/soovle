const table = document.getElementById("titleLinkTable");
const tbody = document.getElementById("titleLinkBody");
const kdStatus = document.getElementById("kd-status");
let serverURL = "http://localhost/ghexpert/scrape_google/client/index.php";
serverURL = "https://googlescrape1.herokuapp.com/";

let keywordDifficultyArray = [];
function assignResponse(KD) {
  keywordDifficultyArray.push(KD);
  printTable(KD);

  difficulty(keywordDifficultyArray[0].competition);
  guageCharts(keywordDifficultyArray[0].competition);
}
function difficulty(value) {
  if (value <= 20) {
    kdStatus.innerHTML = "Very Easy";
    kdStatus.classList.add("easy");
  } else if (value >= 20 && value <= 40) {
    kdStatus.innerHTML = "Easy";
    kdStatus.classList.add("easy");
  } else if (value >= 40 && value <= 60) {
    kdStatus.innerHTML = "Moderate";
    kdStatus.classList.add("medium");
  } else if (value >= 60 && value <= 80) {
    kdStatus.innerHTML = "Hard";
    kdStatus.classList.add("hard");
  } else if (value >= 80 && value <= 100) {
    kdStatus.innerHTML = "Very Hard";
    kdStatus.classList.add("hard");
  }
}

$(document).ready(function () {
  $("#analyze").submit(function (e) {
    e.preventDefault();

    keywordDifficultyArray = [];
    suggest(document.getElementById("search").value);

    table.classList.remove("hidden");
    tbody.innerHTML = "";

    console.log(keywordDifficultyArray);
  });
});

function suggest(k) {
  $.ajax({
    url: "https://suggestqueries.google.com/complete/search",
    jsonp: "jsonp",
    dataType: "jsonp",
    data: {
      q: k,
      client: "chrome",
    },
    success: function (data) {
      let retList = data[1];

      retList.map((element) => {
        keyword_decode(element);
      });
    },
  });
}

/**
 * e means number of row. It will 10 or 1
 * k mean keyword
 * @param {*} k
 * @param {*} row
 */
function keyword_decode(k, row) {
  let e = row ? row : 1;

  if (k && e) {
    $.ajax({
      url: "https://suggestqueries.google.com/complete/search",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        q: k,
        client: "chrome",
      },
      success: function (data) {
        $.ajax({
          url: "https://suggestqueries.google.com/complete/search",
          jsonp: "jsonp",
          dataType: "jsonp",
          data: {
            q: k + " a",
            client: "chrome",
          },
          success: function (data1) {
            $.ajax({
              url: "https://suggestqueries.google.com/complete/search",
              jsonp: "jsonp",
              dataType: "jsonp",
              data: {
                q: k + " aa",
                client: "chrome",
              },
              success: function (data2) {
                $.ajax({
                  url: "https://suggestqueries.google.com/complete/search",
                  jsonp: "jsonp",
                  dataType: "jsonp",
                  data: {
                    q: k + " aaa",
                    client: "chrome",
                  },
                  success: function (data3) {
                    let uri =
                      JSON.stringify(data[1]) +
                      "|||" +
                      JSON.stringify(data1[1]) +
                      "|||" +
                      JSON.stringify(data2[1]) +
                      "|||" +
                      JSON.stringify(data3[1]);

                    $.ajax({
                      type: "POST",
                      url: serverURL,
                      data: {
                        keyword: k,
                        row: e,
                        sugdata: uri,
                      },
                      success: assignResponse,
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
  }
}

function printTable(e) {
  td_link_title = `<td scope="row" class="py-2 px-6 font-medium text-sm text-gray-900">${e.keyword}</td>`;
  td_search_volume = `<td class="py-2 px-6">${e.competition}</td>`;
  tbody.innerHTML += td_link_title + td_search_volume;
}
