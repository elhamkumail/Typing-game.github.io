const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

//Choose random sentence from the list
var wordsList = [
    "The moon smiled brightly in the starry night sky.",
    "Lost in thought, she wandered through the forest.",
    "I found a gold coin on the playground after school today.",
    "The chocolate chip cookies smelled so good that I ate one without asking.",
    "My bandaid wasn't sticky any more so it fell off on the way to school.",
    "He had a sore throat so I gave him my bottle of water and told him to keep it.",
    "The church was white and brown and looked very old.",
    "The aroma of freshly baked bread filled the air.",
    "Your mom is so nice she gave me a ride home today.",
    "I fell in the mud when I was walking home from school today.",
    "This dinner is so delicious I can't stop eating.",
    "The school principal was so mean that all the children were scared of him.",
    "The cat chased its tail in playful circles.",
    "The box was small and wrapped in paper with tiny silver and red glitter dots.",
    "My dad is so funny that he told us jokes all night long and we never fell asleep.",
    "How did you know that I was going to have a peanut butter sandwich for lunch?",
    "In the distance, a lighthouse guided ships to safety."
];
var randomWordNumber = Math.floor((Math.random() * 16) + 0);
document.querySelector("#origin-text p").innerHTML = wordsList[randomWordNumber];
var originText = document.querySelector("#origin-text p").innerHTML;


var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var errors = 0;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEnterd = testArea.value;
    let originTextMatch = originText.substring(0, textEnterd.length);

    if (textEnterd == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
        theTimer.style.color = "#429890";
    } else {
        if (textEnterd == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        }
        else {
            testWrapper.style.borderColor = "#E95D0F";
            errors++;
            document.querySelector(".errors").innerHTML = "Errors: " + errors;
        }
    }
}

// Start the timer:
function start() {
    let textEnterdLen = testArea.value.length;
    if (textEnterdLen === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }

}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;
    errors = 0;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    theTimer.style.color = "black";

    randomWordNumber = Math.floor((Math.random() * 16) + 0);
    document.querySelector("#origin-text p").innerHTML = wordsList[randomWordNumber];
    originText = document.querySelector("#origin-text p").innerHTML;

    document.querySelector(".errors").innerHTML = "Errors: 0";
}                                                   

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);