var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var currentPage;
var keyUp = '38';
var keyDown = '40';
var keyRight = '39';
var keyLeft = '37';
var ballsNum = 50;
var fiveColor = 'blue'

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function Start() 
{
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
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
				if (randomNum <= (1.0 * food_remain) / cnt) 
				{
					food_remain--;
					board[i][j] = 1;
				} 
				else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) 
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
	while (food_remain > 0) 
	{
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
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
	interval = setInterval(UpdatePosition, 250);
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
	lblTime.value = time_elapsed;
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
				context.fillStyle = pac_color; //color
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
				context.fillStyle = "black"; //color
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
	if (board[shape.i][shape.j] == 1) { score++; }
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) 
	{
		pac_color = "green";
	}
	if (score == 50) 
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

function setKey(direction)
{
	var text;
	var textValue;
	var button;
	switch(direction)
	{
		case 'up':
			text = document.getElementById("enterKeyUp");
			textValue = text.value;
			keyUp = textValue;
			button = document.getElementById("up");
			button.textContent = "up : " + keyUp;
			break;

		case 'left':
			text = document.getElementById("enterKeyLeft");
			textValue = text.value;
			keyLeft = textValue;
			button = document.getElementById("left");
			button.textContent = "left : " + keyLeft;
			break;

		case 'right':
			text = document.getElementById("enterKeyRight");
			textValue = text.value;
			keyRight = textValue;
			button = document.getElementById("right");
			button.textContent = "right : " + keyRight;
			break;

		case 'down':
			text = document.getElementById("enterKeyDown");
			textValue = text.value;
			keyDown = textValue;
			button = document.getElementById("down");
			button.textContent = "down : " + keyDown;
			break;	
		
	}
	showSetter(direction)
}

function setDefault(direction)
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
	showSetter(direction)
}

function setBallsNum()
{
	var inputBalls = document.getElementById("enterBalls");
	if (isNaN(inputBalls.value))
	{
		alert("please choose a number between 50 and 90");
		inputBalls.value = '';
	}
	else if (inputBalls.value < 50)
	{
		alert("please choose at least 50 balls");
		inputBalls.value = '';
	}
	else if (inputBalls.value > 90)
	{
		alert("please choose at most 90 balls");
		inputBalls.value = '';
	}
	else 
	{
		ballsNum = inputBalls.value; 
		alert("balls num successfully set to: " + ballsNum)
	}
}

function clearBox()
{
	var inputBalls = document.getElementById("enterBalls");
	inputBalls.value = '';
}

function setBallColor(pointsAmount)
{
	switch (pointsAmount)
	{
		case 5:
			fiveColor = document.getElementById("fivePointsBall").value;
			alert('five point ball color is set to: ' + fiveColor)
			break;
		
		case 15:
			fiveColor = document.getElementById("fivePointsBall").value;
			alert('five point ball color is set to: ' + fiveColor)
			break;
	}
}

  







