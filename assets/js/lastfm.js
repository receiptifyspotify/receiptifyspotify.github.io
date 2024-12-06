// const config = require("config");

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
const lastfmKey = 'a3c468c39e0e8bbbe7348b2489738bcd';
var displayName = "RECEIPTIFY";
var dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
var today = new Date();

function hiddenClone(element) {
  // Create clone of element
  var clone = element.cloneNode(true);

  // Position element relatively within the
  // body but still out of the viewport
  var style = clone.style;
  style.position = "relative";
  style.top = window.innerHeight + "px";
  style.left = 0;
  // Append clone to body and return the clone
  document.body.appendChild(clone);
  return clone;
}




function retrieveTracks(user, timeRangeSlug, domNumber, domPeriod) {
  const userUrl = "https://ws.audioscrobbler.com/2.0/";

  $.ajax({
    url: userUrl,
    data: {
      method: "user.gettoptracks",
      user: user,
      period: timeRangeSlug,
      limit: 10,
      api_key: lastfmKey,
      format: "json",
    },
    success: function (response) {
      // Show the receipt if it's hidden
      if ($("#receipt").hasClass("hidden")) {
        $("#receipt").removeClass("hidden");
      }

      const responseItems = response.toptracks.track;
      let totalPlays = 0;
      let totalTime = 0;
      const date = today.toLocaleDateString("en-US", dateOptions).toUpperCase();

      // Process each track item
      responseItems.forEach(function (track) {
        track.name = track.name.toUpperCase();
        track.artist.name = track.artist.name.toUpperCase();
        
        const playsInt = parseInt(track.playcount, 10);
        const durationInt = parseInt(track.duration, 10);
        
        totalPlays += playsInt;
        totalTime += playsInt * durationInt;

        const minutes = Math.floor(durationInt / 60);
        const seconds = (durationInt % 60).toFixed(0);
        track.duration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      });

      // Calculate total time in days, hours, minutes, and seconds
      let days = Math.floor(totalTime / 86400);
      let hours = Math.floor((totalTime - days * 86400) / 3600);
      let minutes = Math.floor((totalTime - days * 86400 - hours * 3600) / 60);
      let seconds = totalTime - days * 86400 - hours * 3600 - minutes * 60;

      totalTime = 
        (days > 0 ? days + ":" : "") +
        (days > 0 && hours < 10 ? "0" : "") +
        hours +
        ":" +
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds;

      // Manually build the HTML using jQuery
      const receiptHtml = `
        <div class='receiptContainer my-5'>
          <h2 class='logo'>RECEIPTIFY</h2>
          <p class='period'>${domPeriod}</p>
          <p class='date'>ORDER #000${domNumber} FOR ${user.toUpperCase()}</p>
          <p class='date'>${date}</p>
          <table class='tracks'>
            <thead>
              <tr>
                <td class='begin'>QTY</td>
                <td>ITEM</td>
                <td class='length'>AMT</td>
              </tr>
            </thead>
            <tbody>
              ${responseItems.map(function(track) {
                return `
                  <tr>
                    <td class='begin'>${track.playcount}</td>
                    <td class='name'>${track.name} - ${track.artist.name}</td>
                    <td class='length'>${track.duration}</td>
                  </tr>
                `;
              }).join('')}
              <tr class='total-counts'>
                <td class='begin' colspan='2'>ITEM COUNT:</td>
                <td class='length'>${totalPlays}</td>
              </tr>
              <tr class='total-counts-end'>
                <td class='begin' colspan='2'>TOTAL:</td>
                <td class='length'>${totalTime}</td>
              </tr>
            </tbody>
          </table>
          <p class='date'>CARD #: **** **** **** 2023</p>
          <p class='date'>AUTH CODE: 123421</p>
          <p class='date'>CARDHOLDER: ${user.toUpperCase()}</p>
          <div class='thanks'>
            <p>THANK YOU FOR VISITING!</p>
            <img src='/assets/img/barcode.png' />
            <p class='website mt-2 '>receiptifyspotify.github.io</p>
          </div>
        </div>
        <button class='btn time-btn' id='download'>Save Image</button>
      `;

      // Append the HTML to the receipt div
      $("#receipt").html(receiptHtml);

      // Set up the "Download" button to capture the receipt as an image
      $("#download").on("click", function () {
        var offScreen = $(".receiptContainer")[0];
        window.scrollTo(0, 0);
        var clone = hiddenClone(offScreen);  // Make a clone for capturing
        html2canvas(clone, { scrollY: -window.scrollY }).then(function (canvas) {
          var dataURL = canvas.toDataURL("image/png", 1.0);
          // $("body").removeChild(clone);  // Clean up after clone

          var link = $("<a></a>");
          link.attr("href", dataURL)
              .attr("download", timeRangeSlug + ".png")
              .appendTo("body")[0]
              .click();
          link.remove();
        });
      });
    },
    error: function (xhr, status, error) {
      console.error("Error fetching top tracks:", error);
    }
  });
}


const user = document.getElementById("user-search");
user.addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = new FormData(user).get("username");
  console.log(username);
  //const userUrl = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${lastfmKey}`;
  const userUrl = "https://ws.audioscrobbler.com/2.0/";
  $.ajax({
    url: userUrl,
    data: {
      method: "user.getinfo",
      user: username,
      api_key: lastfmKey,
    },
    success: function (response) {
      if (!$("#error-message").hasClass("hidden")) {
        $("#error-message").addClass("hidden");
      }
      if (!$("#receipt").hasClass("hidden")) {
        $("#receipt").addClass("hidden");
      }

      $("#options").removeClass("hidden");

      document.getElementById("week").addEventListener(
        "click",
        function () {
          retrieveTracks(username, "7day", 1, "LAST WEEK");
        },
        false
      );
      document.getElementById("month").addEventListener(
        "click",
        function () {
          retrieveTracks(username, "1month", 2, "LAST MONTH");
        },
        false
      );
      document.getElementById("three_months").addEventListener(
        "click",
        function () {
          retrieveTracks(username, "3month", 3, "LAST 3 MONTHS");
        },
        false
      );
      document.getElementById("six_months").addEventListener(
        "click",
        function () {
          retrieveTracks(username, "6month", 4, "LAST 6 MONTHS");
        },
        false
      );
      document.getElementById("year").addEventListener(
        "click",
        function () {
          retrieveTracks(username, "12month", 5, "LAST YEAR");
        },
        false
      );
    },
    error: function () {
      if (!$("#options").hasClass("hidden")) {
        $("#options").addClass("hidden");
      }
      $("#error-message").removeClass("hidden");
    },
  });
});
