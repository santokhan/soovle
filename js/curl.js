tbody = document.getElementById("titleLinkBody");

function curl_request(keyword) {
  table.classList.remove("hidden");
  tbody.innerHTML = "";

  $.ajax({
    type: "post",
    url: "https://localhost/ghexpert/scrape_google/server.php",
    jsonp: "jsonp",
    data: { search: keyword },
    success: function (response) {
      console.log(response);

      for (let index = 0; index < response.title.length; index++) {
        const element = response.title[index];
        print_curl_response(element, response.link[index], "easy");
      }
      for (let index = 0; index < response.title2.length; index++) {
        const element = response.title2[index];
        print_curl_response(element, response.link2[index], "weak");
      }
    },
  });
}

let demo_php_response = {
  title: [
    "Facebook",
    "Facebook Community Standards - Transparency Center",
    "Facebook (@facebook) &#8226; Instagram photos and videos",
  ],
  title2: [
    "Facebook - Aplikasi di Google Play",
    "Facebook - Wikipedia bahasa Indonesia, ensiklopedia bebas",
    "Kumpulan berita facebook - Okezone.com -",
    "Facebook on the App Store",
  ],
  link: [
    "https://id-id.facebook.com/&amp;sa=U&amp;ved=2ahUKEwiOlvj6os35AhWtLUQIHRXIAwoQFnoECAkQAg&amp;usg=AOvVaw3bx6-t3bcRd5WQGsZKLs1E",
    "https://transparency.fb.com/policies/community-standards/&amp;sa=U&amp;ved=2ahUKEwiOlvj6os35AhWtLUQIHRXIAwoQFnoECAQQAg&amp;usg=AOvVaw2u-FZ__lHUb5dClJCSSu3",
    "https://www.instagram.com/facebook/&amp;sa=U&amp;ved=2ahUKEwiOlvj6os35AhWtLUQIHRXIAwoQFnoECAIQAg&amp;usg=AOvVaw14gnZ4SH92JE0icV11wvSU",
  ],
  link2: [
    "https://play.google.com/store/apps/details%3Fid%3Dcom.facebook.katana%26hl%3Din%26gl%3DUS&amp;sa=U&amp;ved=2ahUKEwiOlvj6os35AhWtLUQIHRXIAwoQFnoECAgQAg&amp;usg=AOvVaw2nNOnDuHGVegigQvu6arNB",
    "https://id.wikipedia.org/wiki/Facebook&amp;sa=U&amp;ved=2ahUKEwiOlvj6os35AhWtLUQIHRXIAwoQFnoECAEQAg&amp;usg=AOvVaw0BCRcVwh08HBUGjjgbLa_i",
    "https://www.okezone.com/tag/facebook&amp;sa=U&amp;ved=2ahUKEwiOlvj6os35AhWtLUQIHRXIAwoQFnoECAcQAg&amp;usg=AOvVaw2fp4R4aPYvWS0eEJoCF3Z1",
    "https://apps.apple.com/us/app/facebook/id284882215&amp;sa=U&amp;ved=2ahUKEwiOlvj6os35AhWtLUQIHRXIAwoQFnoECAMQAg&amp;usg=AOvVaw0mcAIdWFS44MwHYgirU2rO",
  ],
  related: [],
};

// for (let index = 0; index < demo_php_response.title.length; index++) {
//   const element = demo_php_response.title[index];
//   print_curl_response(element, demo_php_response.link[index], "easy");
// }

function print_curl_response(title, link, stats) {
  let origin = link.split("/");
  let tr = `<tr class="bg-white rounded-xl">`;
  let trEnd = "</tr>";
  td_link_title = `<td class="py-2 px-6 font-medium text-sm text-gray-900">
                      <h3 class="required:text-xl font-medium text-gray-900 pt-1">${title}</h3>
                      <div class="pb-2"><a class="hover:opacity-80 hover:underline" href="${link}">${origin[2]}/...</a></div>
                  </td>`;
  td_search_volume = `<td class="-2 px-6"><span class="text-orange-300 rounded capitalize py-2 px-4 font-medium text-center text-${stats}">${stats}</span></td>`;
  tbody.innerHTML += tr + td_link_title + td_search_volume + trEnd;
}
