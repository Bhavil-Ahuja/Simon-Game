var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];

var hasStarted = false;
var level = 0;

$(document).keypress(function () {
  if (!hasStarted) {
    $("h1").text("Level " + level);
    nextSequence();
    hasStarted = true;
  }
});

$(".box").click(function () {
  var userColor = $(this).attr("id");
  userPattern.push(userColor);

  playSound(userColor);
  animate(userColor);

  check(userPattern.length - 1);
});

function playSound(button) {
  var audio = new Audio("Sounds/" + button + ".mp3");
  audio.play();
}

function animate(color) {
  $("#" + color).addClass("blink");
  setTimeout(function () {
    $("#" + color).removeClass("blink");
  }, 100);
}

function check(levelNow) {
  if (gamePattern[levelNow] === userPattern[levelNow]) {
    if (gamePattern.length === userPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("h1").text("GAME OVER!");
    startOver();
  }
}

function nextSequence() {
  userPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function startOver() {
  level = 0;
  gamePattern = [];
  hasStarted = false;
}
