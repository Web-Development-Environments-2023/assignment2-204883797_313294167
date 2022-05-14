var context;
var shape = new Object();
var board;
var score;
var pacColor;
var gameTime = 60;
var startTime;
var timeElapsed;
var interval;
var intervalTime = 120;
var currentPage;
var keyUp = '38';
var keyDown = '40';
var keyRight = '39';
var keyLeft = '37';
var ballsNum = 50;
var fiveColor = 'blue'
var fifteenColor = 'red'
var twentyFiveColor = 'green'
var ballsToEat;
var monstersNum = 1;

class Boundry
{
	constructor({position}) // curly brackets allow interchanging the order of params 
	{
		this.position = position;
		this.width = 40;
		this.height = 40;
	}

	drawBoundry()
	{
		context.fillStyle = 'blue'
		context.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
}


function Start() 
{
	context = canvas.getContext("2d");
	board = new Array();
	score = 0;
	ballsToEat = ballsNum;
	pacColor = "yellow";
	var cnt = 100;
	var food_remain_25 = ballsNum * 0.1;
	food_remain_25 = Math.round(food_remain_25);
	var food_remain_15 = ballsNum * 0.3;
	food_remain_15 = Math.round(food_remain_15);
	var food_remain_5 = ballsNum * 0.6;
	food_remain_5 = Math.round(food_remain_5);
	if (food_remain_5 + food_remain_15 + food_remain_25 > ballsNum)
	{
		food_remain_5--;
	}
	else if (food_remain_5 + food_remain_15 + food_remain_25 < ballsNum)
	{
		food_remain_5++;
	}

	var pacman_remain = 1;
	startTime = new Date();
	for (var i = 0; i < 10; i++) 
	{
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) 
		{
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) { board[i][j] = 4; } 
			else 
			{
				var randomNum = Math.random();

				if (randomNum > 0.4 && randomNum<0.6 && food_remain_5>0) 
				{
					food_remain_5--;
					board[i][j] = 1;
				} 
				else if(randomNum>0.25 && randomNum<=0.4 && food_remain_15>0){
					food_remain_15--;
					board[i][j] = 5;

				}

				else if(randomNum<=0.05 && food_remain_25>0){
					food_remain_25--;
					board[i][j] = 6;

				}

				else if (randomNum>0.9 && pacman_remain==1) 
				{
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else { board[i][j] = 0; }
				cnt--;
			}
		}


	}
	while (food_remain_5 > 0) 
	{
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain_5--;
	}

	while (food_remain_15 > 0) 
	{
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		food_remain_15--;
	}

	while (food_remain_25 > 0) 
	{
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 6;
		food_remain_25--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, intervalTime);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() 
{
	if (keysDown[keyUp]) { return 1; } //up
	if (keysDown[keyDown]) { return 2; } //down
	if (keysDown[keyLeft]) { return 3; } //left
	if (keysDown[keyRight]) { return 4; } //right
}

function Draw() 
{
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = (gameTime - timeElapsed).toFixed(3);
	if (lblTime.value * 1000 < intervalTime) { lblTime.value = 0; }
	for (var i = 0; i < 10; i++) 
	{
		for (var j = 0; j < 10; j++) 
		{
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) 
			{
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pacColor; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} 
			else if (board[i][j] == 1) 
			{
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = fiveColor; //color
				context.fill();
			} 
			else if (board[i][j] == 5) 
			{
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = fifteenColor; //color
				context.fill();
			} 
			else if (board[i][j] == 6) 
			{
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = twentyFiveColor; //color
				context.fill();
			} 
			else if (board[i][j] == 4) 
			{
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() 
{
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) //move up
	{
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) { shape.j--; }
	}
	if (x == 2) //move down
	{
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) { shape.j++; }
	}
	if (x == 3) //move left
	{
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) { shape.i--; }
	}
	if (x == 4) //move right
	{
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) { shape.i++; }
	}
	if (board[shape.i][shape.j] == 1) { 
		ballsToEat--;
		score=score+5; 
	}
	else if (board[shape.i][shape.j] == 5) { 
		score=score+15; 
		ballsToEat--;
	}
	else if (board[shape.i][shape.j] == 6) { 
		score=score+25; 
		ballsToEat--;
	}

	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	timeElapsed = (currentTime - startTime) / 1000;
	if (score >= 20 && timeElapsed <= 10) 
	{
		pacColor = "green";
	}
	if (timeElapsed > gameTime)
	{
		window.clearInterval(interval);
		alert('time up!');
	}
	if (ballsToEat == 0) 
	{
		window.clearInterval(interval);
		window.alert("Game completed");
	} 
	else { Draw(); }
}

function switchContent(id) 
{
	const target = document.getElementById(id);
	if (!target) return;
	
	// Hide all other div elements.
	const divs = document.querySelectorAll('.toggle');
	for (const div of divs) {
	  div.style.display = 'none';
	}

	if(id=="gamePage"){
		Start();
	}



	// Show selected one
	target.style.display = 'block';

}



function showSetter(direction)
{
	var section;
	switch (direction) 
	{
		case 'up':
			section = document.getElementById("enterKeySectionUp");
			break;

		case 'left':
			section = document.getElementById("enterKeySectionLeft");
			break;

		case 'right':
			section = document.getElementById("enterKeySectionRight");
			break;

		case 'down':
			section = document.getElementById("enterKeySectionDown");
			break;
	}
	if (section.className == 'hide')
	{
		section.style.display = 'block';
		section.className = 'show';
	}
	else
	{
		section.style.display = 'none';
		section.className = 'hide';
	}
}

function validateChar(char)
{
	if (char == '')
	{ 
		alert("no key selected"); 
		return false;
	}
	if (char.length > 1)
	{
		alert("please select only one character"); 
		return false;
	} 
	return true;
}

function setKey(direction)
{
	var char;
	var button;
	var status;
	switch(direction)
	{
		case 'up':
			char = document.getElementById("enterKeyUp").value.substring(0,1).toUpperCase();
			status = validateChar(char)
			if (status == true)
			{
				keyUp = String(document.getElementById("enterKeyUp").value.toUpperCase().charCodeAt(0));
				button = document.getElementById("up");
				button.textContent = "up : " + char;
			}
			break;

		case 'left':
			char = document.getElementById("enterKeyLeft").value.substring(0,1).toUpperCase();
			status = validateChar(char)
			if (status == true)
			{
				keyLeft = String(document.getElementById("enterKeyLeft").value.toUpperCase().charCodeAt(0));
				button = document.getElementById("left");
				button.textContent = "left : " + char;
			}
			break;

		case 'right':
			char = document.getElementById("enterKeyRight").value.substring(0,1).toUpperCase();
			status = validateChar(char)
			if (status == true)
			{
				keyRight = String(document.getElementById("enterKeyRight").value.toUpperCase().charCodeAt(0));
				button = document.getElementById("right");
				button.textContent = "right : " + char;
			}
			break;

		case 'down':
			char = document.getElementById("enterKeyDown").value.substring(0,1).toUpperCase();
			status = validateChar(char)
			if (status == true)
			{
				keyDown = String(document.getElementById("enterKeyDown").value.toUpperCase().charCodeAt(0));
				button = document.getElementById("down");
				button.textContent = "down : " + char;
			}
			break;	
		
	}
	showSetter(direction)
}

function setDefault(direction, isRandom)
{
	var button;
	switch(direction)
	{
		case 'up':
			keyUp = '38';
			button = document.getElementById("up");
			button.textContent = "UP : " + "↑";
			break;

		case 'left':
			keyLeft = '37';
			button = document.getElementById("left");
			button.textContent = "left : " + "←";
			break;

		case 'right':
			keyLeft = '39';
			button = document.getElementById("right");
			button.textContent = "right : " + "→";
			break;

		case 'down':
			keyLeft = '40';
			button = document.getElementById("down");
			button.textContent = "down : " + "↓";
			break;
	}
	if (isRandom == false) { showSetter(direction); }
}

function setBallsNum()
{
	var inputBalls = document.getElementById("enterBalls").value;
	if (/^\d+$/.test(inputBalls))
	{
		inputBalls = parseInt(document.getElementById("enterTime").value);
	}
	if (isNaN(inputBalls) || !(Number.isInteger(inputBalls)))
	{
		alert("please choose an integer number between 50 and 90");
		clearBoxes(['enterBalls'])
	}
	else if (inputBalls < 50)
	{
		alert("please choose at least 50 balls");
		clearBoxes(['enterBalls'])
	}
	else if (inputBalls > 90)
	{
		alert("please choose at most 90 balls");
		clearBoxes(['enterBalls'])
	}
	else 
	{
		ballsNum = inputBalls; 
		alert("balls num successfully set to: " + ballsNum)
	}
}

function clearBoxes(ids)
{
	for (i=0; i<ids.length; i++)
	{
		var boxToClear = document.getElementById(ids[i]);
		boxToClear.value = '';
	}
}

function setBallColor(pointsAmount)
{
	switch (pointsAmount)
	{
		case 5:
			fiveColor = document.getElementById("fivePointsBall").value;
			if (fiveColor == 'select color') {fiveColor = 'blue'; }
			alert('5 point ball color is set to: ' + fiveColor)
			break;
		
		case 15:
			fifteenColor = document.getElementById("fifteenPointsBall").value;
			if (fifteenColor == 'select color') {fifteenColor = 'red'; }
			alert('15 point ball color is set to: ' + fifteenColor)
			break;

		case 25:
			twentyFiveColor = document.getElementById("twentyFivePointsBall").value;
			if (twentyFiveColor == 'select color') {twentyFiveColor = 'green'; }
			alert('25 point ball color is set to: ' + twentyFiveColor)
			break;
	}
}

function setTime()
{
	var time = document.getElementById("enterTime").value;
	if (/^\d+$/.test(time))
	{
		time = parseInt(document.getElementById("enterTime").value);
	}
	if (isNaN(time) || !(Number.isInteger(time)))
	{
		alert('please insert an integer number of seconds');
		clearBoxes(['enterTime'])
	}
	else if (time > 60) 
	{ 
		gameTime = time; 
		alert('time set to: ' + gameTime)
	}
	else 
	{
		alert('please insert at least 60 seconds');
		clearBoxes(['enterTime'])
	}
}

function setMonsters()
{
	var monsters = document.getElementById("enterMonsters").value;
	if (/^\d+$/.test(monsters))
	{
		monsters = parseInt(document.getElementById("enterMonsters").value);
	}
	if (isNaN(monsters) || !(Number.isInteger(monsters)))
	{
		alert('please insert an integer number of monsters');
		clearBoxes(['enterMonsters'])
	}
	else if (monsters > 4)
	{
		alert('please insert a number of monsters that is less than 4');
		clearBoxes(['enterMonsters'])
	}
	else if (monsters < 1)
	{
		alert('please insert a number of monsters that is greater than 1');
		clearBoxes(['enterMonsters'])
	}
	else 
	{ 
		monstersNum = monsters; 
		alert('number of monsters set to ' +  monstersNum);
	}
	
}

function randomSelectSettings()
{
	setDefault('up');
	setDefault('left');
	setDefault('right');
	setDefault('down');
	minBallsNum = Math.ceil(50);
    maxBallsNum = Math.floor(90);
	ballsNum = Math.floor(Math.random() * (maxBallsNum - minBallsNum + 1)) + minBallsNum;
	var inputBalls = document.getElementById("enterBalls");
	inputBalls.value = ballsNum;
	minTime = Math.ceil(60);
    maxTime = Math.floor(120);
	gameTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
	var time = document.getElementById("enterTime");
	time.value = gameTime;
	minMonsters = Math.ceil(1);
    maxMonsters = Math.floor(4);
	monstersNum = Math.floor(Math.random() * (maxMonsters - minMonsters + 1)) + minMonsters;
	var inputMonsters = document.getElementById("enterMonsters");
	inputMonsters.value = monstersNum;
	colorRandomMin = Math.ceil(1);
	colorRandomMax = Math.floor(27);
	colorNum = Math.floor(Math.random() * (colorRandomMax - colorRandomMin + 1)) + colorRandomMin;
	colorRandom(colorNum);
}

function colorRandom(num){
	var fivePointsBall = document.getElementById("fivePointsBall");
	var fifteenPointsBall = document.getElementById("fifteenPointsBall");
	var twentyFivePointsBall = document.getElementById("twentyFivePointsBall");

	switch (num){
		case 1:
			fiveColor = 'blue'
			fifteenColor = 'red'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'blue';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'green';
			break;
			
		case 2:
			fiveColor = 'blue'
			fifteenColor = 'red'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'blue';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 3:
			fiveColor = 'blue'
			fifteenColor = 'red'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'blue';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 4:
			fiveColor = 'blue'
			fifteenColor = 'orange'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'blue';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'green';
			break;

		case 5:
			fiveColor = 'blue'
			fifteenColor = 'orange'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'blue';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 6:
			fiveColor = 'blue'
			fifteenColor = 'orange'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'blue';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 7:
			fiveColor = 'blue'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'blue';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'green';
			break;

		case 8:
			fiveColor = 'blue'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'blue';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;
		
		case 9:
			fiveColor = 'blue'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'blue';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'SpringGreen';
			break;
		
		case 10:
			fiveColor = 'Cyan'
			fifteenColor = 'red'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'Cyan';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'green';
			break;
		
		case 11:
			fiveColor = 'Cyan'
			fifteenColor = 'red'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'Cyan';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;
		
		case 12:
			fiveColor = 'Cyan'
			fifteenColor = 'red'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'Cyan';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 13:
			fiveColor = 'Cyan'
			fifteenColor = 'orange'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'Cyan';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'green';
			break;

		case 14:
			fiveColor = 'Cyan'
			fifteenColor = 'orange'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'Cyan';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 15:
			fiveColor = 'Cyan'
			fifteenColor = 'orange'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'Cyan';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 16:
			fiveColor = 'Cyan'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'Cyan';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'green';
			break;

		case 17:
			fiveColor = 'Cyan'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'Cyan';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 18:
			fiveColor = 'Cyan'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'Cyan';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 19:
			fiveColor = 'steelblue'
			fifteenColor = 'red'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'steelblue';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'green';
			break;

		case 20:
			fiveColor = 'steelblue'
			fifteenColor = 'red'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'steelblue';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 21:
			fiveColor = 'steelblue'
			fifteenColor = 'red'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'steelblue';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 22:
			fiveColor = 'steelblue'
			fifteenColor = 'orange'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'steelblue';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'green';
			break;

		case 23:
			fiveColor = 'steelblue'
			fifteenColor = 'orange'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'steelblue';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 24:
			fiveColor = 'steelblue'
			fifteenColor = 'orange'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'steelblue';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 25:
			fiveColor = 'steelblue'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'steelblue';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'green';
			break;

		case 26:
			fiveColor = 'steelblue'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'steelblue';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 27:
			fiveColor = 'steelblue'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'steelblue';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'SpringGreen';
			break;
	}

}



  







