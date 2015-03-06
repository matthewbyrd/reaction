var popIn = new Audio('popin.mp3');
var popOut = new Audio ('popout.mp3');


var ranNum = function (number) {	
	var answer = Math.random();
	var answer = answer * number;
	return answer;
}

function getRandomColor() {
var letters = '0123456789ABCDEF'.split('');
var color = '#';
for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
}
return color;
}

var rad = Math.floor(ranNum(120));   // for the random circle radius
var clickedTime = 0;
var appearTime = 0;
var times = [];
var counter = 0;
var sum = 0;
var avg = 0;
var highscore = 999999999999999999;

var startBox = function() {
	document.getElementById("startBox").style.display = "block";
}

var makeBox = function() {
	rad = Math.floor(ranNum(120));
	while (rad < 30) {
		rad = Math.floor(ranNum(120));
	};
    setTimeout(function () {
   		document.getElementById("myBox").style.display = "block";
   		document.getElementById("myBox").style.marginTop = ranNum(40)+"%";
   		document.getElementById("myBox").style.marginLeft = ranNum(70)+"%";
   		document.getElementById("myBox").style.height = rad+"px";
   		document.getElementById("myBox").style.width = rad+"px";
   		document.getElementById("myBox").style.backgroundColor = getRandomColor();
   		popIn.play();
   		appearTime = performance.now();
   		}, ranNum(3000));
}

document.getElementById("myBox").onclick = function () {
		clickedTime = performance.now();
		popOut.play();
		this.style.display = "none";
		times.push(((clickedTime - appearTime)/1000));
		counter++
		if (counter < 5) {
			makeBox();
		}
		else {
			sum = times.reduce(function(a, b) { return a + b; });
			avg = sum / times.length;
			avg = Math.round(avg*1000)/1000
			document.getElementById("endBox").style.display = "block";
			document.getElementById("playAgain").style.display = "block";
			document.getElementById("endBox").innerHTML = "<br/><br/><br/><br />Average reaction time:<br /><br /><br /><br />" + avg + " seconds";
			// display highscores
			document.getElementById("highScores").style.display = "block";
			if (avg < highscore) {
				highscore = avg;
			};
			document.getElementById("highScores").innerHTML = "<br/><br/>Best Score:<br /><br />" + highscore + " seconds";
			//////
		};
}

document.getElementById("startBox").onclick = function () {
	this.style.display = "none";
	makeBox();
}

document.getElementById("playAgain").onclick = function () {
	document.getElementById("endBox").style.display = "none";
	document.getElementById("playAgain").style.display = "none";
	document.getElementById("highScores").style.display = "none";
	sum = 0;
	avg = 0;
	times = [];
	counter = 0;
	makeBox();
}
