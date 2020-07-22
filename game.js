const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;
let gameStart = false;

// Detect keyboard press to begin game
$(document).keypress(() => {
    if (gameStart == false) {
        gameStart = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

// User input in the game
$(".btn").click((event) => {
    const userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // checkAnswer(userClickedPattern.length - 1);
});

// Compare userClickedPattern vs gamePattern
$("").click(checkAnswer(userClickedPattern.length - 1));

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("Success");
    }
    else {
        console.log("Wrong");
    }  
}

// Next color
function nextSequence() {
    // Get a color from the array
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];

    // Store it in gamePattern array
    gamePattern.push(randomChosenColor);

    // Flash the color and play a sound
    $("#" + randomChosenColor).fadeOut().fadeIn();
    playSound(randomChosenColor);

    // Update the level
    level++;
    $("#level-title").text("Level " + level);
}

// Play sound
function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Flash user input
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}