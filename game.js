const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

// User input in the game
$(".btn").click((event) => {
    const userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
})

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