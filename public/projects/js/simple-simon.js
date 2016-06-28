$(document).ready(function() {
	var $buttons = $('.square');
	// var buttonsArray = [];
	var	solution = [];
	var index = 0;
	var buttonBoolean = false;
	var increaseSpeed = 1;
	var currentScore = 0;
	var speedUpMode = false;
	var extremeMode = false;
	var gameOver = [1, 3, 4, 2, 1, 3, 4];
	//var isAnimationOn = true;

	function randomNumber(amount) {
		var random = Math.floor(Math.random() * (amount) + 1);
		return random;
	};

	function increaseSequence(){
		solution.push(randomNumber($buttons.length));
		console.log(solution);
		console.log(increaseSpeed);
	};


	//a timeout would be better here, will refactor later.

	function simonSays(solution){
		setTimeout(function() {
			var i = 0;
			var intervalId = setInterval(function(){
				animate($buttons.eq(solution[i]-1));
				i++;
				if(solution.length == i) {
					clearInterval(intervalId);
					buttonBoolean = true;
				}
			}, 850 / increaseSpeed);
		}, 850);
	};

	function animate($button){

		$button.delay(100).animate({
			opacity: "1"
		}, 150 / (increaseSpeed * .5)).animate({
			opacity: ".6"
		}, 150 / (increaseSpeed * .5));
	};

	function extreme(){
		if(extremeMode == true) {
			$buttons.addClass('extreme');
		}
	};

	function speedUp() {
		if(speedUpMode == true && solution.length % 5 == 0 && solution.length <= 20) {
			increaseSpeed++
		}
	};

	function compareClick() {
		if(buttonBoolean) {
			animate($(this));
			// console.log(index);
			if($(this).data('value') == solution[index]) {
				index++;
				if(index == solution.length) {
					index = 0;
					increaseSequence();
					buttonBoolean = false;
					speedUp();
					simonSays(solution);
					currentScore++;
					$('#score').html('Score: ' + currentScore);
					console.log(currentScore);
					console.log(solution[index]);
				}
			} else {
				youLose();
				//console.log($buttons)
				
			}
		}
	};

	function youLose() {
		setTimeout(function () {
			animate($buttons.eq(solution[index] - 1));
			animate($buttons.eq(solution[index] - 1));
			animate($buttons.eq(solution[index] - 1));
			solution = [];
			increaseSpeed = 5;
					// simonSays(gameOver);
					index = 0;
					$('button').removeAttr('disabled');
					$('#game-mode').removeAttr('disabled');
					increaseSpeed = 1;
					currentScore = 0;
				}, 850)
	};

	function startGame() {
		increaseSequence();
		simonSays(solution);
		$('button').attr('disabled', 'true');
		$('#game-mode').attr('disabled', 'true');
		console.log(document.getElementById('game-mode').value);
		gameMode();
	};

	function gameMode(){
		var speed = $('#game-mode').val();
		increaseSpeed = speed;
		if(speed == 1) {
			speedUpMode = true;
			speedUp();
		} else {
			speedUpMode = false;
		}
	};

	$('#game-mode')
	.change(function(){
		var speed = $('#game-mode').val();
		if(speed == 3.75) {
			extremeMode = true;
			extreme();
		}
		if(speed == 1 || speed == 1.05 || speed == 2.5 || speed == .85) {
			$buttons.removeClass('extreme');
		}
	});

	$('button').click(startGame);
	$buttons.click(compareClick);
});