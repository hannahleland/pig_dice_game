"use strict";
var $ = function(id) { return document.getElementById(id); };
var round;

var getRandomNumber = function(max) {
	var random;
	if (!isNaN(max)) {
		random = Math.random(); // generates a seed value >=0.0 and < 1.0
		random = Math.floor(random * max); // gives an integer between 0 and (max - 1) 
		random = random +1; // gives an integer between 1 and max
	}
	return random; // sends random number back to where it's called from (in this case, 'die'). if max Nan, returns undefined
};

var changePlayer = function() {
    $("die_img").src = "images/empty.png";
	if ($("current").innerHTML == $("player1").innerHTML) { // could use .firstChild.nodeValue instead
		$("current").innerHTML = $("player2").innerHTML;
		$("btns2").style.visibility = 'visible';
		$("btns1").style.visibility = 'hidden';
	} else {
        round += 1;
        $("round_title").innerHTML = "Round " + round;
		$("current").innerHTML = $("player1").innerHTML;
		$("btns1").style.visibility = 'visible';
		$("btns2").style.visibility = 'hidden';
	};
	
	$("die").value = "0";
	$("total").value = "0";
	$("roll").focus();
};

var newGame = function() {
	$("score1").value = "0";
	$("score2").value = "0";
	
	if ($("player1input").value == "" || $("player2input").value == "") { // validating
		$("turn").removeAttribute("class"); // hides or keeps hidden the HTML section 'turn'
		$("round_title").style.fontWeight = "800";
	} else {
        round = 0;
        $("player1input").style.display = "none";
        $("player2input").style.display = "none";
        $("player1").innerHTML = $("player1input").value;
        $("player2").innerHTML = $("player2input").value;
		$("turn").setAttribute("class", "open"); // dynamically adding a CSS class 
		$("new_game").style.visibility = "hidden";
		$("rules").style.display = 'none';
        $("rule_btn_box").style.display = 'grid';
		$("rules_btn").style.visibility = 'visible';
        $("turn").style.display = "grid";
        $("turn1").style.display = "grid";
        $("turn2").style.display = "grid";
        $("current").innerHTML = $("player2").innerHTML;
		changePlayer();
	};
};

var rollDice = function() {
	var total = parseInt($("total").value); // reading box and turning it into an integer 
    var die = getRandomNumber(6); // six sided die 	
    if (die == 1) {
        $("die_img").src = "images/die1.png";
    	total = 0;
        if($("current").innerHTML == $("player1").innerHTML) {
            $("btns1").style.visibility = 'hidden';
        } else {
            $("btns2").style.visibility = 'hidden';
        }
    	var one = setTimeout(changePlayer, 1500);
    } else {
        $("die_img").src = "images/die"+die+".png";
    	total = total + die;
    	$("die").value = die;
    	$("total").value = total;
    };
};

var holdTurn = function() {
	var score;
	var total = parseInt($("total").value); // reads total in box on screen instead of saving it in a variable in the JS
	
	if ($("current").innerHTML == $("player1").innerHTML) {
		score = $("score1");
	} else {
		score = $("score2");
	}
	
	score.value = parseInt(score.value) + total; //parseInt important to keep it from concatenating and displaying incorrect score
	if(score.value >= 100) {
		alert($("current").innerHTML + " Wins!");
		$("new_game").style.visibility = "visible";
	} else {
		changePlayer();
	};
};

var toggleRules = function() {
	if($("rules_btn").value == "Show Rules") {
		$("rules").style.display = 'block';
		$("rules_btn").value = "Hide Rules";
	} else {
		$("rules").style.display = 'none';
		$("rules_btn").value = "Show Rules";
	}
};

window.onload = function() {
	$("new_game").onclick = newGame;
	$("roll1").onclick = rollDice;
	$("roll2").onclick = rollDice;
	$("hold1").onclick = holdTurn;
	$("hold2").onclick = holdTurn;
	$("rules_btn").onclick = toggleRules;
	$("turn").removeAttribute("class"); // hides or keeps hidden the HTML section 'turn'
	$("rules_btn").style.visibility = 'hidden';
	// alert("Please enter two player names."); // TODO: UNCOMMENT THIS
};