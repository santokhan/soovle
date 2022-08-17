const linktable = document.getElementById("tablefortitlelink");
const linktbody = document.getElementById("titlelink");

function curl_request(keyword) {
  linktable.classList.remove("hidden");
  linktbody.innerHTML = "";

  $.ajax({
    type: "post",
    url: "server.php",
    jsonp: "jsonp",
    data: { search: keyword },
    success: function (response) {
      console.log(response);

      for (let index = 0; index < response.title.length; index++) {
        const element = response.title[index];
        print_curl_response(element, response.link[index], "weak");
      }
      for (let index = 0; index < response.title2.length; index++) {
        const element = response.title2[index];
        print_curl_response(element, response.link2[index]);
      }
    },
  });
}

function print_curl_response(title, link, stats) {
  let origin = link.split("/");
  let tr = `<tr class="rounded-xl">`;
  let seoStats = stats
    ? `<span class="text-sm opacity-80 bg-teal-200 px-1 rounded">${stats}</span>`
    : "";
  let trEnd = "</tr>";
  td_link_title = `<td class="py-2 px-6 font-medium text-gray-900">
                      <h3 class="font-medium text-gray-900 pt-1">
                        <span class="text-xl">${title}</span> ${seoStats}
                      </h3>
                      <div class="pb-2"><a class="hover:opacity-80 hover:underline font-medium text-lg" href="${link}">${origin[2]}/...</a></div>
                  </td>`;
  linktbody.innerHTML += tr + td_link_title + trEnd;
}
