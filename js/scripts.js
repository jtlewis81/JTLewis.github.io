// STANDARD JAVASCRIPT from Milestone 5

// Calls the init() function when a new page is loaded
window.onload = init();

// Displays a console message
function init() {
  console.log("Page loaded!");
}

// Moves the logo when it's clicked on - works on index.html and about-me.html pages
function moveLogo() {
  let logoDivLeft = document.getElementById("logo-div-left");
  let logoDivRight = document.getElementById("logo-div-right");
  let logoImg = document.getElementById("logo");

  if (logo.parentElement != logoDivLeft) {
    logoDivRight.removeChild(logoImg);
    logoDivLeft.appendChild(logoImg);
  } else {
    logoDivLeft.removeChild(logoImg);
    logoDivRight.appendChild(logoImg);
  }
}

// Stop logo animations on powerlifting-videos.html and photo-gallery.html pages
function stopAnim(anim) {
  document.getElementById("logo-" + anim).setAttribute("id", "logo-original");
}

// JQUERY BASED GAME

$(document).ready(function () {
  $("#game-start-btn").click(function () {

    // reveal the game when the big white button is clicked
    $("#game").show();
    $("#game-start-btn").hide();

    // build the grid of tiles
    var tileBuilder = 0;
    for (let x = 0; x < 5; ++x) {
      $("#game-grid").append(
        "<div id='game-grid-row-" +
          x +
          "' class='game-grid-row' style='display:block;'></div>"
      );
      for (let y = 0; y < 5; ++y) {
        $("#game-grid-row-" + x + "").append(
          "<div id='" +
            tileBuilder +
            "' class='game-tile' style='display:inline-block;'></div>"
        );
        ++tileBuilder;
      }
    }

    // assign start and path tiles
    var startTile = $("#0");
    startTile.css({ "background-color" : "rgb(255, 255, 255)", "border-color" : "rgb(255, 255, 255)" });
    var lastTile = startTile;
    const path = ["1", "2", "3", "8", "13", "12", "11", "16", "21", "22", "23"];

    // helper function for checking if the clicked tile is on the path
    function isPath(id) {
      var result;
      let pl = path.length;
      for (let i = 0; i < pl; ++i) {
        if (id == path[i]) {
          return true;
        } else {
          result = false;
        }
      }
      return result;
    }

    // click event handler (game moves)
    $(".game-tile").click(function () {
      if (
        // valid move
        $(lastTile).css("background-color") == "rgb(255, 255, 255)" &&
        ($(this).attr("id") - $(lastTile).attr("id") == 1 ||
          $(this).attr("id") - $(lastTile).attr("id") == 5 ||
          $(lastTile).attr("id") - $(this).attr("id") == 1 ||
          $(lastTile).attr("id") - $(this).attr("id") == 5) &&
        isPath($(this).attr("id"))
      ) {
        // set tile to white
        $(this).css({ "background-color" : "rgb(255, 255, 255)", "border-color" : "rgb(255, 255, 255)" });
        // update lastTile
        lastTile = $(this);
      } else if (
        // win condition
        $("#23").css("background-color") == "rgb(255, 255, 255)" &&
        $(this).attr("id") == "24"
      ) {
        // hide grid - show winner badge
        $("#game-grid").hide();
        $("#winner").show();
      } else {
        // invalid move - reset grid
        for (let i = 1; i < 24; ++i) {
          $("#" + i + "").css({ "background-color" : "rgb(50, 50, 50)", "border-color" : "rgb(80, 80, 80)" });
          lastTile = startTile;
        }
      }
    });
  });
});
