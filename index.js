
let game_over = 1;
let first_load = 1;
let level = 1
let loading_level = 0;
var sequence = []
let sequenceNum = 0;
var initialTime = 30;
//Adding all the options to a list
var colors = ["green" , "red" , "yellow" , "blue" , "wrong"]


//////////////////////////////////////////////////////////////////

for (let i=0 ; i< 4 ; i++){
    SoundToButton(colors[i]) // giving sound to the buttons
}

//intialize sound of buttons function
function SoundToButton(colorPressed) {
    $("."+colorPressed).on( "click", function() {
        var audio = new Audio('./sounds/' + colorPressed + '.mp3');
        if (!game_over || loading_level){
        audio.play();
        animatePlayerPress(colorPressed)}
      } );
}

//animate the press of the button function
function animatePlayerPress(colorPressed){
    $("."+colorPressed).addClass("pressed");
    setTimeout(function () {      
    $("."+colorPressed).removeClass("pressed");         
    }, 100);
}

//////////////////////////////////////////////////////////////////

function GameInit(){
    game_over = false
    sequence = []
}
/////////////////////////////////////////////////////////////////////////
function gameOver() {
    $("h1").text("you lost, Press to start again")
    if(!game_over== true){
    var audio = new Audio('./sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over")
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
}
    game_over= true


    level = 1;
}
//////////////////////////////////////////////////////////////////

function GamePlay(){
    
    sequenceNum = 0;
    first_load = 0;
    if (game_over == false){
        $("h1").text("welcome to level " + level) // change headline

        let next_move = Math.floor(Math.random() * 4)  // create a move
        sequence.push(colors[next_move]) // add to the sequance of moves

        //game plays turn
        for (let i = 0; i < sequence.length; i++) { // play the buttons
            setTimeout(function() {
                if (!game_over){
                var audio = new Audio('./sounds/' + sequence[i] + '.mp3');
                audio.play();
                $("."+ sequence[i]).fadeTo( "fast", 0.1 ).delay( 20 ).fadeTo( "slow", 1.0 );
            }}, i * 800);  // 1000ms delay between each click
        }
    }
    level = sequence.length +1;
}


///////////////////////////////////////////////////////////////////////


// Closure to capture the clicked button's ID
var clickedButtonId = (function() {
    var buttonId = null; // private variable

    // Return a function that updates and returns the buttonId
    return function(newId) {
        if (newId) {
            buttonId = newId;
        }
        return buttonId;
    };
})();

$(".btn").click(function(e) {
    if (!loading_level) {
    // Update the private variable with the clicked button's ID
    clickedButtonId(e.target.id);
    return(checkIfCorrect(clickedButtonId()))
    }
});

/////////////////////////////////////////////////////////////////////

function checkIfCorrect(buttonId){
    //console.log(buttonChosen)
    console.log(buttonId)

    if (buttonId == sequence[sequenceNum]){
        if ( sequenceNum + 1 == sequence.length)
            setTimeout(function () {
                resetTimer()
                startTimer()      
                GamePlay();       
                }, 900)
    } else {
        if (!first_load){
        gameOver()
        resetTimer()}
    }

    sequenceNum = sequenceNum +1;
}

/////////////////////////////////////////////////////////////////////


// runs the game // when pressesd a key the game starts
$(document).keypress(function(){
        if (!game_over && first_load) {
            first_load = 0;
            startTimer();
            GamePlay();
        }else if (game_over || first_load) {
            GameInit();
            startTimer();
            GamePlay();
        }
        
});



let time = initialTime; // Current time
var timerInterval;

function updateTimer() {
    $('#timer').text("time: " + time); // Update the text of the timer element

    if (time <= 0) {
        clearInterval(timerInterval); // Stop the timer
        $('#timer').text("Time's up!");
        gameOver()
    } else {
        time--; // Decrement time by 1 second
    }
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000); // Run updateTimer every 1000 milliseconds (1 second)
}

function resetTimer() {
    clearInterval(timerInterval); // Stop the current timer
    time = initialTime; // Reset the time
    $('#timer').text("time: " + time); // Update the display
}

