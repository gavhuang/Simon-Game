const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
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
    checkAnswer(userClickedPattern.length - 1);
});

// Compare userClickedPattern vs gamePattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        
        // If arrays match, then go to next sequence
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    }
    else {
        // Play the wrong.mp3, flash screen red, display GAME OVER
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game over, Press Any Key to Restart");

        startOver();
    }
}

// Next color
function nextSequence() {
    // Get a color
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];

    // Store it in gamePattern array
    gamePattern.push(randomChosenColor);

    // Animation: flash the color and play a sound
    $("#" + randomChosenColor).fadeOut().fadeIn();
    playSound(randomChosenColor);

    // Update the level
    level++;
    $("#level-title").text("Level " + level);
}

// Restart game
function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameStart = false;
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