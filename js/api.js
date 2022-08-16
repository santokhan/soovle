const table = document.getElementById("titleLinkTable");
const tbody = document.getElementById("titleLinkBody");

let keywordDifficultyArray = [];
function assignResponse(KD) {
  keywordDifficultyArray.push(KD);
  printTable(KD);

  setTimeout(() => {
    guageCharts(keywordDifficultyArray[0].competition);
  }, 1000);
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
                      url: "http://localhost/ghexpert/scrape_google/client/server.php",
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
  td_search_volume = `<td class="py-2 px-6">${e.search_volume}</td>`;
  tbody.innerHTML += td_link_title + td_search_volume;
}
