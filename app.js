import { Ghost, moveGhost } from "./ghost.js";
import { moveMan, man_location } from "./man.js";
import { ButtonChanger, ButtonSetter, ButtonShower, ButtonDefault, ButtonClear } from "./buttons.js"
import { drawPacman } from "./pacman.js"
import { setKey, upChar, downChar, leftChar, rightChar } from "./keys.js";
import { colorRandom, setBallsNum, setBallColor } from './balls.js'
import { isBorder, drawBorder } from "./border.js";

var contextUser;
var contextSettings;
var ghosts;
var context;
var shape = new Object();
var board;
var score;
var gameTime = 60;
var startTime;
var timeElapsed;
var interval;
var intervalTime = 120;
var keyUp = '38';
var keyDown = '40';
var keyRight = '39';
var keyLeft = '37';
var keysDown;
var ballsNum = 80;
var fiveColor = 'plum'
var fifteenColor = 'red'
var twentyFiveColor = 'green'
var ballsToEat;
var monster_time;
var eatCherry=false;
var man_alive=true;
var monstersNum = 4;
var pacmanDirection='right';
var cornerTopLeft = new Image();
cornerTopLeft.src = 'images/pacmanAssets/pipeCorner1.png'
var cornerBottomRight = new Image();
cornerBottomRight.src = 'images/pacmanAssets/pipeCorner3.png'
var cornerTopRight = new Image();
cornerTopRight.src = 'images/pacmanAssets/pipeCorner2.png'
var cornerBottomLeft = new Image();
cornerBottomLeft.src = 'images/pacmanAssets/pipeCorner4.png'
var bottomAndTopBorders = new Image();
bottomAndTopBorders.src = 'images/pacmanAssets/pipeHorizontal.png'
var leftAndRightBorders = new Image();
leftAndRightBorders.src = 'images/pacmanAssets/pipeVertical.png'
var connectorDown = new Image();
connectorDown.src = 'images/pacmanAssets/pipeConnectorBottom.png'
var leftCap = new Image();
leftCap.src = 'images/pacmanAssets/capLeft.png'
var rightCap = new Image();
rightCap.src = 'images/pacmanAssets/capRight.png'
var bottomCap = new Image();
bottomCap.src = 'images/pacmanAssets/capBottom.png'
var topCap = new Image();
topCap.src = 'images/pacmanAssets/capTop.png'
var cross = new Image();
cross.src = 'images/pacmanAssets/pipeCross.png'
var block = new Image();
block.src = 'images/pacmanAssets/block.png'
var cherry = new Image();
cherry.src = 'images/cherry.png'
var man = new Image();
man.src = 'images/bugs-bunny.png'
var monster1 = new Image();
monster1.src = 'images/pacman-monster1.png'
var monster2 = new Image();
monster2.src = 'images/pacman-monster2.png'
var monster3 = new Image();
monster3.src = 'images/pacman-monster3.png'
var monster4 = new Image();
monster4.src = 'images/pacman-monster4.png'
var move_man = 0;
var pacmanLives = 5;
var slow = new Image();
slow.src = 'images/slow.jpg'
var slow_time=0;
var cant_die=false;
var slow_time_left=0;
var move_speed=5;
var flag_slow=false;
var slow_cell_i;
var welcome_sound = new Audio('sounds/pacman_beginning.mp3');
var death_sound = new Audio('sounds/pacman_death.mp3');
var fruit_sound = new Audio('sounds/pacman_eatfruit.mp3');
var chomp_sound = new Audio('sounds/pacman_chomp.mp3');
var gameMusic = document.getElementById('gameMusic');
var clock = new Image();
clock.src = 'images/clock.jpg'
var slow_cell_j;
var clock_eat=0;
var startMove = false;
var userNameLog;
var starttimer = false;


var playPauseMusic = document.getElementById('playPauseMusic');
playPauseMusic.addEventListener("click", function()
{
	if (playPauseMusic.textContent == "ON")
	{
		gameMusic.pause();
		gameMusic.currentTime = 0;
		playPauseMusic.textContent = "OFF";
	}
	else
	{
		gameMusic.play();
		playPauseMusic.textContent = "ON";
	}
})

var loginButton = document.getElementById('login-button');
loginButton.addEventListener("click", function()
{
	userNameLog = document.getElementById('userNameLog').value;
})

var setRandomSettings = document.getElementById('setRandomSettings');
setRandomSettings.addEventListener("click", function()
{
	randomSelectSettings();
})

var setMonstersButton = document.getElementById('setMonsters');
setMonstersButton.addEventListener("click", function()
{
	setMonsters();
})

var setTimeButton = document.getElementById('setTimeButton');
setTimeButton.addEventListener("click", function()
{
	setTime();
})

var buttonsetBallsNum = document.getElementById('setBallsNum');
buttonsetBallsNum.addEventListener("click", function()
{
	ballsNum = setBallsNum(ballsNum);
})

var buttonsetBall5Color = document.getElementById('setBall5Color');
buttonsetBall5Color.addEventListener("click", function()
{
	fiveColor = setBallColor(5, fiveColor, fifteenColor, twentyFiveColor);
})

var buttonsetBall15Color = document.getElementById('setBall15Color');
buttonsetBall15Color.addEventListener("click", function()
{
	fifteenColor = setBallColor(15, fiveColor, fifteenColor, twentyFiveColor);
})

var buttonsetBall25Color = document.getElementById('setBall25Color');
buttonsetBall25Color.addEventListener("click", function()
{
	twentyFiveColor = setBallColor(25, fiveColor, fifteenColor, twentyFiveColor);
})

var buttonClearers = [
	new ButtonClear('enterBallsCancel', 'enterBalls'),
	new ButtonClear('clearTimeButton', 'enterTime'),
	new ButtonClear('clearSetMonsters', 'enterMonsters'),
]

buttonClearers.forEach(button => {
	var b = document.getElementById(button.name);
	b.addEventListener("click", function()
	{
		clearBoxes([button.textFeild]);
	});
});

var buttonChangers = [
	new ButtonChanger('WelcomeRegisterButton', 'registerPage'), 
	new ButtonChanger('WelcomeLoginButton', 'loginPage'), 
	new ButtonChanger('welcomeButton', 'welcomePage'), 
	new ButtonChanger('registerButton', 'registerPage'), 
	new ButtonChanger('loginButton', 'loginPage'), 
	new ButtonChanger('startGame', 'gamePage'), 
]

buttonChangers.forEach(button => {
	var b = document.getElementById(button.name);
	b.addEventListener("click", function()
	{
		switchContent(button.changeTo);
	});
});

var buttonDefaults = [
	new ButtonDefault('setDefaultUp', 'up'),
	new ButtonDefault('setDefaultLeft', 'left'),
	new ButtonDefault('setDefaultRight', 'right'),
	new ButtonDefault('setDefaultDown', 'down'),
]

buttonDefaults.forEach(button => {
	var b = document.getElementById(button.name);
	b.addEventListener("click", function()
	{
		setDefault(button.direction, false);
	});
});

var buttonShowers = [
	new ButtonShower('keyUpButton', 'up'),
	new ButtonShower('cancelUp', 'up'),
	new ButtonShower('keyLeftButton', 'left'),
	new ButtonShower('cancelLeft', 'left'),
	new ButtonShower('keyRightButton', 'right'),
	new ButtonShower('cancelRight', 'right'),
	new ButtonShower('keyDownButton', 'down'),
	new ButtonShower('cancelDown', 'down'),
]

buttonShowers.forEach(button => {
	var b = document.getElementById(button.name);
	b.addEventListener("click", function()
	{
		showSetter(button.direction)
	});
});

var buttonSetters = [
	new ButtonSetter('setKeyUp', 'up'),
	new ButtonSetter('setKeyLeft', 'left'),
	new ButtonSetter('setKeyRight', 'right'),
	new ButtonSetter('setKeyDown', 'down'),
]

buttonSetters.forEach(button => {
	var b = document.getElementById(button.name);
	b.addEventListener("click", function()
	{
		var keysDict = setKey(button.direction, keyDown, keyLeft, keyRight, keyUp);
		keyUp = keysDict['up'];
		keyDown = keysDict['down'];
		keyRight = keysDict['right'];
		keyLeft = keysDict['left'];
	});
});

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

function switchContent(id) 
{
	const target = document.getElementById(id);
	if (!target) return;
	
	// Hide all other div elements.
	const divs = document.querySelectorAll('.toggle');
	for (const div of divs) 
	{
	  div.style.display = 'none';
	}
	window.clearInterval(interval);
	if (id == "gamePage") { Start(); }
	if (id == "welcomePage") { welcome_sound.play(); }
	if (id != "welcomePage") 
	{	
		welcome_sound.pause();
		welcome_sound.currentTime = 0; 
	}
	if (id != "gamePage") 
	{	
		gameMusic.pause();
		gameMusic.currentTime = 0; 
	}

	// Show selected one
	target.style.display = 'block';
};

// function sound(src) 
// {
// 	this.sound = document.createElement("audio");
// 	this.sound.src = src;
// 	this.sound.setAttribute("preload", "auto");
// 	this.sound.setAttribute("controls", "none");
// 	this.sound.style.display = "none";
// 	document.body.appendChild(this.sound);
// 	this.play = function(){ this.sound.play(); }
// 	this.stop = function() { this.sound.pause(); }
// }





function Start() 
{
	ghosts = [
		new Ghost('clyde', 1, 1, 4, 20, 'images/pacman-monster1.png'),
		new Ghost('pinky', 18, 1, 2, 21, 'images/pacman-monster2.png'),
		new Ghost('inky', 18, 18, 2, 22, 'images/pacman-monster3.png'),
		new Ghost('blinky', 1, 18, 1, 23, 'images/pacman-monster4.png')

	]
	gameMusic.play();
	playPauseMusic.textContent = "ON";
	context = canvas.getContext("2d");
	board = new Array();
	startMove = false;
	starttimer = false;
	score = 0;
	clock_eat = 0;
	ballsToEat = ballsNum;
	slow_time = 0;
	slow_time_left=0;
	eatCherry=false;
	var food_remain_25 = ballsNum * 0.1;
	food_remain_25 = Math.round(food_remain_25);
	var food_remain_15 = ballsNum * 0.3;
	food_remain_15 = Math.round(food_remain_15);
	var food_remain_5 = ballsNum * 0.6;
	food_remain_5 = Math.round(food_remain_5);
	var cherry_remain=1;
	var man_remain=1;
	pacmanLives = 5;
	man_alive=true;
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
	for (var col = 0; col < 20; col++) 
	{
		board[col] = new Array();
		for (var row = 0; row < 20; row++) 
		{
			if ((col == 5 && row == 14)) { board[col][row] = 4; } //top 3 way
			else if ((col == 2 && row == 7) || (col == 4 && row == 14) || (col == 9 && row == 3) || (col == 14 && row == 4) || ((col == 15 && row == 8)) 
				|| (col == 12 && row == 9)) {board[col][row] = 13; } //wall [
			else if ((col == 3 && row == 6) || (col == 12 && row == 15) || ((col == 16 && row == 7)) || (col == 17 && row == 3)
				|| (col == 7 && row == 4)) {board[col][row] = 16; } //top cap
			else if ((col == 4 && row == 7) || (col == 6 && row == 14) || (col == 13 && row == 9) || (col == 10 && row == 3) || (col == 17 && row == 8)) {board[col][row] = 14; } //wall ]
			else if ((col == 3 && row == 8) || (col == 7 && row == 8) || (col == 12 && row == 16) || (col == 16 && row == 9) || (col == 5 && row == 15)) {board[col][row] = 15; } //bottom cap
			else if ((col == 3 && row == 7) || (col == 16 && row == 8)) {board[col][row] = 17} //cross
			else if ((col == 8 && row == 12) || (col == 16 && row == 14)) {board[col][row] = 100} //block
			//wall corners:
			else if ((col == 0 && row == 0)) {board[col][row] = 7; } // top left
			else if ((col == 19 && row == 19) || ((col == 17 && row == 4))) {board[col][row] = 8; } //botoom right
			else if ((col == 0 && row == 19)) {board[col][row] = 9; } // bottom left
			else if (col == 19 && row == 0) {board[col][row] = 10; } //top right
			//wall borders:
			else if ((row == 0 && col >= 1) || (row == 19 && col >= 1) || (col == 15 && row == 4) || (col == 16 && row == 4)) {board[col][row] = 11; }
			else if ((col == 0 && row >= 1) || (col == 19 && row >= 1) || (col == 7 && row == 5) || (col == 7 && row == 6) || (col == 7 && row == 7)) {board[col][row] = 12; }
			//monsters:
			else if (col == 1 && row == 1) {board[col][row] = 20;}
			else if ((col == 18 && row == 1) && ((monstersNum == 2) || (monstersNum == 3) || (monstersNum == 4))) {board[col][row] = 21;}
			else if ((col == 18 && row == 18) && (monstersNum == 3 || (monstersNum == 4))) {board[col][row] = 22;}
			else if ((col == 1 && row == 18) && (monstersNum == 4)) {board[col][row] = 23;}
			
			else 
			{
				var randomNum = Math.random();

				if (randomNum > 0.3 && randomNum < 0.34 && food_remain_5 > 0) 
				{
					food_remain_5--;
					board[col][row] = 1;
				} 
				else if (randomNum > 0.25 && randomNum <= 0.27 && food_remain_15 > 0)
				{
					food_remain_15--;
					board[col][row] = 5;
				}
				else if (randomNum <= 0.22 && randomNum>=0.21 && food_remain_25 > 0.24)
				{
					food_remain_25--;
					board[col][row] = 6;
				}
				else if (randomNum <= 0.111 && randomNum >= 0.122 && cherry_remain==1)
				{
					cherry_remain--;
					board[col][row] = 18 //cherry
				}
				else if (randomNum <= 0.444 && randomNum >= 0.455 && man_remain==1)
				{
					man_remain--;
					man_location.i = col;
					man_location.j = row;
					board[col][row] = 19 //man
				}
				else if (randomNum > 0.9 && pacman_remain == 1) 
				{
					shape.i = col;
					shape.j = row;
					pacman_remain--;
					board[col][row] = 2;
				} else { board[col][row] = 0; }
			}
		}
	}
	if(cherry_remain == 1)
	{
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 18;
		cherry_remain--;
	}

	if(man_remain == 1)
	{
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 19;
		man_location.i = emptyCell[0];
		man_location.j = emptyCell[1];
		man_remain--;
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

	
	drawSettings();
	drawUserDetails();
	interval = setInterval(UpdatePosition, intervalTime);

}

function restart()
{
	death_sound.play();
	ghosts = [
		new Ghost('clyde', 1, 1, 4, 20, 'images/pacman-monster1.png'),
		new Ghost('pinky', 18, 1, 2, 21, 'images/pacman-monster2.png'),
		new Ghost('inky', 18, 18, 2, 22, 'images/pacman-monster3.png'),
		new Ghost('blinky', 1, 18, 1, 23, 'images/pacman-monster4.png')

	]

	score=score-10;
	pacmanLives--;

	for (var col = 0; col < 20; col++) 
	{
		for (var row = 0; row < 20; row++) 
		{
			if(board[col][row]==2) //clear pacman
			{
				board[shape.i][shape.j] = 0
			}
			else if((board[col][row]==20)||(board[col][row]==21)||(board[col][row]==22)||(board[col][row]==23)){//clear monsters
				board[col][row]=0
			}

			else if((board[col][row]==60)||(board[col][row]==70)||(board[col][row]==80)||(board[col][row]==90)){//5 point
				board[col][row]=1
			}
			else if((board[col][row]==61)||(board[col][row]==71)||(board[col][row]==81)||(board[col][row]==91)){//15 point
				board[col][row]=5
			}

			else if((board[col][row]==62)||(board[col][row]==72)||(board[col][row]==82)||(board[col][row]==92)){//25 point
				board[col][row]=6
			}

			else if((board[col][row]==63)||(board[col][row]==73)||(board[col][row]==83)||(board[col][row]==93)){//cherry
				board[col][row]=18
			}

			else if((board[col][row]==64)||(board[col][row]==74)||(board[col][row]==84)||(board[col][row]==94)){//character
				board[col][row]=19
			}
			
		}
	}

	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 2;
	shape.i=emptyCell[0];
	shape.j = emptyCell[1];
			
}

function findRandomEmptyCell(board) 
{
	var i = Math.floor(Math.random() * 19 + 1);
	var j = Math.floor(Math.random() * 19 + 1);
	while (board[i][j] != 0) 
	{
		i = Math.floor(Math.random() * 19 + 1);
		j = Math.floor(Math.random() * 19 + 1);
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

// function drawBorder(context, image, locX, locY, size)
// {
// 	var pattern = context.createPattern(image, 'repeat');
// 	context.fillStyle = pattern;
// 	context.beginPath();
// 	context.rect(locX, locY, size, size);
// 	context.stroke();
// 	context.fill();
// }

function drawBall(color, context, center)
{
	context.beginPath();
	context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
	context.fillStyle = color; //color
	context.fill();
}

function drawSettings()
{
	contextSettings = canvasSettings.getContext("2d");
	contextSettings.clearRect(0, 0, canvasSettings.width, canvasSettings.height);
	contextSettings.font = "30px Dancing Script";
	contextSettings.fillStyle = "blue";
	contextSettings.fillText("Settings", 150, 50);
	contextSettings.fillStyle = "white";
	contextSettings.textAlign = "center";
	contextSettings.font = "20px Dancing Script";
	contextSettings.fillText(`Total Time: ${gameTime}`, 200, 100);
	contextSettings.fillText(`Number Of Ghosts: ${monstersNum}`, 200, 150);
	contextSettings.fillText(`Key Up: ${upChar}`, 200, 200);
	contextSettings.fillText(`Key Left: ${leftChar}`, 200, 250);
	contextSettings.fillText(`Key Right: ${rightChar}`, 200, 300);
	contextSettings.fillText(`Key Down: ${downChar}`, 200, 350);
	contextSettings.fillText(`Total Balls: ${ballsNum}`, 200, 400);
	contextSettings.fillText(`5 Points Ball Color: ${fiveColor}`, 200, 450);
	contextSettings.fillText(`15 Points Ball Color: ${fifteenColor}`, 200, 500);
	contextSettings.fillText(`25 Points Ball Color: ${twentyFiveColor}`, 200, 550);
}

function drawUserDetails()
{
	contextUser = canvasUserDetails.getContext("2d");
	contextUser.clearRect(0, 0, canvasUserDetails.width, canvasUserDetails.height);
	contextUser.font = "15px Dancing Script";
	contextUser.fillStyle = "white";
	contextUser.textAlign = "center";
	contextUser.fillText(`User Name: ${userNameLog}`, 150, 25);
}

function Draw() 
{
	if (eatCherry == true)
	{
		monster1.src = 'images/ghost_sick.jpg'
		monster2.src = 'images/ghost_sick.jpg'
		monster3.src = 'images/ghost_sick.jpg'
		monster4.src = 'images/ghost_sick.jpg'
		cant_die = true;
		monster_time--;
		if (monster_time==0) 
		{ 
			eatCherry = false; 
			cant_die = false;
		}
	}
	else
	{
		monster1.src = 'images/pacman-monster1.png'
		monster2.src = 'images/pacman-monster2.png'
		monster3.src = 'images/pacman-monster3.png'
		monster4.src = 'images/pacman-monster4.png'
		cant_die = false;
	}

	canvas.width = canvas.width; //clean board
	lblPacmanLives.value = pacmanLives;
	lblScore.value = score;
	lblTime.value = (gameTime - timeElapsed).toFixed(3); 
	if (lblTime.value * 1000 < intervalTime) { lblTime.value = 0; }
	if (lblTime.value < 40 && slow_time == 0)
	{
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 50;
		slow_cell_i = emptyCell[0]
		slow_cell_j = emptyCell[1]
		slow_time = 1;
	}
	if (lblTime.value < 30 && slow_time == 1)
	{
		board[slow_cell_i][slow_cell_j] = 0;
		slow_time = 2;
	}
	if (lblTime.value < 10 && clock_eat == 0)
	{
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 52;
		clock_eat = 1;
	}
	for (var col = 0; col < 20; col++) 
	{
		for (var row = 0; row < 20; row++) 
		{
			var center = new Object();
			center.x = col * 40 + 20;
			center.y = row * 40 + 20;
			var loc = board[col][row];

			if (loc == 2) { drawPacman(pacmanDirection, context, center); } //pacman
			else if (loc == 1) { drawBall(fiveColor, context, center); } //5 points ball
			else if (loc == 5) { drawBall(fifteenColor, context, center); } //15 points ball
			else if (loc == 6) { drawBall(twentyFiveColor, context, center); } //25 points ball
			else if (loc == 4) { context.drawImage(connectorDown, center.x - 20, center.y - 20); } //wall top 3 way
			else if (loc == 7) { drawBorder(context, cornerTopLeft, center.x - 20, center.y - 20, 40); } //wall corner top left
			else if (loc == 8) { drawBorder(context, cornerBottomRight, center.x - 20, center.y - 20, 40); } //wall corner bottom right
			else if (loc == 9) { drawBorder(context, cornerTopRight, 760, 0, 40); } //wall corner top right
			else if (loc == 10) { drawBorder(context, cornerBottomLeft, 0, 760, 40); } //wall top and bottom border
			else if (loc == 11) { drawBorder(context, bottomAndTopBorders, center.x - 20, center.y - 20, 40); } //wall top and bottom border
			else if (loc == 12) { drawBorder(context, leftAndRightBorders, center.x - 20, center.y - 20, 40); } //wall right and left border
			else if (loc == 13) { context.drawImage(leftCap, center.x - 20, center.y - 20); } //wall [
			else if (loc == 14) { context.drawImage(rightCap, center.x - 20, center.y - 20); } //wall ]
			else if (loc == 15) { context.drawImage(bottomCap, center.x - 20, center.y - 20); } //bottom cap
			else if (loc == 16) { context.drawImage(topCap, center.x - 20, center.y - 20); } //top cap 
			else if (loc == 17) { context.drawImage(cross, center.x - 20, center.y - 20); } //cross
			else if (loc == 18) { context.drawImage(cherry, center.x-20, center.y-20); } //cherry
			else if ((loc == 19) || (loc == 41) || (loc == 45) || (loc == 46) || (loc == 48) || (loc == 51) || (loc == 53)) //man
			{
					context.drawImage(man, center.x-20, center.y-20);
			}

			else if (board[col][row] == 50)
			{
				context.drawImage(slow, center.x-20, center.y-20);
			}
			else if (board[col][row] == 52)
			{
				context.drawImage(clock, center.x-20, center.y-20);
			}
			else if (board[col][row] == 100)
			{
				context.drawImage(block, center.x-20, center.y-20);
			}

			if (monstersNum==1)
			{
				if (board[col][row] == 20 || board[col][row] == 30 || ((board[col][row] >= 60) && (board[col][row] <= 66))) //orange ghost
				{
						context.drawImage(monster1, center.x-20, center.y-20);
				}
			}

			else if (monstersNum==2)
			{
				if (board[col][row] == 20 || board[col][row] == 30 || ((board[col][row] >= 60) && (board[col][row] <= 66))) //orange ghost
				{
						context.drawImage(monster1, center.x-20, center.y-20);
				}
				else if (board[col][row] == 21 || board[col][row] == 31 || ((board[col][row] >= 70) && (board[col][row] <= 76))) //pink ghost
				{
					context.drawImage(monster2, center.x-20, center.y-20);
				}
			}

			else if (monstersNum==3)
			{
				if (board[col][row] == 20 || board[col][row] == 30 || ((board[col][row] >= 60) && (board[col][row] <= 66))) //orange ghost
				{
						context.drawImage(monster1, center.x-20, center.y-20);
				}
				else if (board[col][row] == 21 || board[col][row] == 31 || ((board[col][row] >= 70) && (board[col][row] <= 76))) //pink ghost
				{
					context.drawImage(monster2, center.x-20, center.y-20);
				}

				else if (board[col][row] == 22 || board[col][row] == 32 || ((board[col][row] >= 80) && (board[col][row] <= 86))) //blue ghost
				{
					context.drawImage(monster3, center.x-20, center.y-20);
				}
			}

			else if (monstersNum==4)
			{
				if (board[col][row] == 20 || board[col][row] == 30 || ((board[col][row] >= 60) && (board[col][row] <= 66))) //orange ghost
				{
						context.drawImage(monster1, center.x-20, center.y-20);
				}
				else if (board[col][row] == 21 || board[col][row] == 31 || ((board[col][row] >= 70) && (board[col][row] <= 76))) //pink ghost
				{
					context.drawImage(monster2, center.x-20, center.y-20);
				}

				else if (board[col][row] == 22 || board[col][row] == 32 || ((board[col][row] >= 80) && (board[col][row] <= 86))) //blue ghost
				{
					context.drawImage(monster3, center.x-20, center.y-20);
				}

				else if (board[col][row] == 23 || board[col][row] == 33 || ((board[col][row] >= 90) && (board[col][row] <= 96))) //red ghost
				{
					context.drawImage(monster4, center.x-20, center.y-20);
				}
			}

		}
	}
}

function UpdatePosition() 
{
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if ((1 <= x || x <= 4) && (starttimer == false))
	{
		starttimer = true;
		startTime = new Date();
	}
	if (x == 1) //move up
	{
		pacmanDirection='up'
		chomp_sound.play();
		if (shape.j > 0 && !isBorder(board[shape.i][shape.j - 1])) { shape.j--; startMove = true;}
	}
	if (x == 2) //move down
	{
		pacmanDirection='down'
		chomp_sound.play();
		if (shape.j < 19 && !isBorder(board[shape.i][shape.j + 1])) { shape.j++; startMove = true;}
	}
	if (x == 3) //move left
	{
		pacmanDirection='left'
		chomp_sound.play();
		if (shape.i > 0 && !isBorder(board[shape.i - 1][shape.j])) { shape.i--; startMove = true;}
	}
	if (x == 4) //move right
	{
		pacmanDirection='right'
		chomp_sound.play();
		if (shape.i < 19 && !isBorder(board[shape.i + 1][shape.j])) { shape.i++; startMove = true;}
	}
	if (board[shape.i][shape.j] == 1) //eat 5 points ball
	{ 
		ballsToEat--;
		score = score + 5; 
	}
	else if (board[shape.i][shape.j] == 5) //eat 15 points ball
	{ 

		score = score + 15; 
		ballsToEat--;
	}
	else if (board[shape.i][shape.j] == 6) //eat 25 points ball
	{ 
		score = score + 25; 
		ballsToEat--;
	}
	else if (board[shape.i][shape.j] == 19) //eat character
	{ 
		fruit_sound.play();
		man_alive = false;
		score = score + 50; 
	}
	else if (board[shape.i][shape.j] == 41) //eat character and 15 point ball
	{ 
		fruit_sound.play();
		man_alive = false;
		score = score + 15; 
		score = score + 100; 
		ballsToEat--;
	}
	else if (board[shape.i][shape.j] == 45) //eat character and 25 point ball
	{
		fruit_sound.play();
		man_alive = false;
		score = score + 25; 
		score = score + 100; 
		ballsToEat--;
	}
	else if (board[shape.i][shape.j] == 46) //eat character and 5 point ball
	{ 
		fruit_sound.play();
		man_alive = false;
		score = score + 5; 
		score = score + 100; 
		ballsToEat--;
	}

	else if (board[shape.i][shape.j] == 18) //eat cherry
	{ 
		fruit_sound.play();
		eatCherry = true;
		score = score + 50;
		monster_time = 60;
	}

	else if (board[shape.i][shape.j] == 50) //eat slow
	{ 
		fruit_sound.play();
		move_speed=10;
		slow_time_left=100;
		flag_slow=true;
		for(var i=0; i<monstersNum;i++)
		{
			ghosts[i].speed=ghosts[i].speed*2
		}
	}
	else if (board[shape.i][shape.j] == 51) //eat slow and bucs
	{ 
		fruit_sound.play();
		score=score+50; 
		move_speed=10;
		slow_time_left=100;
		flag_slow=true;
		for(var i=0; i<monstersNum;i++)
		{
			ghosts[i].speed=ghosts[i].speed*2
		}
	}
	else if (board[shape.i][shape.j] == 52) //eat clock
	{ 
		gameTime = gameTime + 10;
		fruit_sound.play();
	}

	else if (board[shape.i][shape.j] == 53) //eat clock and bucs
	{ 
		score = score + 50; 
		gameTime = gameTime + 10;
		fruit_sound.play();
	}

	//ghosts collision with ball
	else if(((board[shape.i][shape.j] >= 60) && (board[shape.i][shape.j] <= 62)) || ((board[shape.i][shape.j] >= 70) && (board[shape.i][shape.j] <= 72))
	|| ((board[shape.i][shape.j] >= 80) && (board[shape.i][shape.j] <= 82)) || ((board[shape.i][shape.j] >= 90) && (board[shape.i][shape.j] <= 92))
	){
		ballsToEat--;
		if(cant_die==false)
		{
			if (pacmanLives == 1) 
			{ 
				pacmanLives--;
				endGame();
				return; 
			}
			board[shape.i][shape.j] = 0;
			restart();
		}
	}

	//ghosts collision
	else if ((board[shape.i][shape.j] == 20)  || ((board[shape.i][shape.j] >= 63) && (board[shape.i][shape.j] <= 66))
    || (board[shape.i][shape.j] == 21) || ((board[shape.i][shape.j] >= 73) && (board[shape.i][shape.j] <= 76))
	|| (board[shape.i][shape.j] == 22) || ((board[shape.i][shape.j] >= 83) && (board[shape.i][shape.j] <= 86))
	|| (board[shape.i][shape.j] == 23) || ((board[shape.i][shape.j] >= 93) && (board[shape.i][shape.j] <= 96))) //dead
	{
		if(cant_die==false)
		{
			if(pacmanLives==1) 
			{ 
				pacmanLives--;
				endGame();
				return; 
			}
			board[shape.i][shape.j] = 0;
			restart();
		}
	}

	if(flag_slow == true)
	{
		slow_time_left--;
		if(slow_time_left==0)
		{
			flag_slow=false;
			move_speed=5;
			move_man=0;
			for(var i=0; i<monstersNum;i++)
			{ ghosts[i].speed=ghosts[i].speed/2 }
		}
	}

	board[shape.i][shape.j] = 2;

	//man move randomly
	move_man = moveMan(man_alive, move_man, move_speed, board);

	if (startMove == true)
	{
		//move ghosts
		for(var i=0; i<monstersNum;i++)
		{
			moveGhost(board, ghosts[i], shape);
		}
	}
	if (starttimer == true)
	{
		var currentTime = new Date();
		timeElapsed = (currentTime - startTime) / 1000;
	}
	if (starttimer == false)
	{
		timeElapsed = 0;
	}
	if (timeElapsed > gameTime)
	{
		window.clearInterval(interval);
		changeMusic("OFF");
		endGame();
	}
	if (ballsToEat == 0) 
	{
		window.clearInterval(interval);
		changeMusic("OFF");
		endGame();
	} 
	else { Draw(); }
}

function changeMusic(text)
{
	if (text == "ON")
	{
		gameMusic.play();
		playPauseMusic.textContent = "ON";
	}
	else if (text == "OFF")
	{
		gameMusic.pause();
		gameMusic.currentTime = 0;
		playPauseMusic.textContent = "OFF";
	}
}

function setDefault(direction, isRandom)
{
	
	switch(direction)
	{
		case 'up':
			keyUp = '38';
			var button = document.getElementById("keyUpButton");
			button.innerText  = "up : ↑";
			break;

		case 'left':
			keyLeft = '37';
			var button = document.getElementById("keyLeftButton");
			button.innerText  = "left : ←";
			break;

		case 'right':
			keyRight = '39';
			var button = document.getElementById("keyRightButton");
			button.innerText  = "right : →";
			break;

		case 'down':
			keyDown = '40';
			var button = document.getElementById("keyDownButton");
			button.innerText  = "down : ↓";
			break;
	}
	if (isRandom == false) { showSetter(direction); }
}


function clearBoxes(ids)
{
	var i;
	for (i=0; i<ids.length; i++)
	{
		var boxToClear = document.getElementById(ids[i]);
		boxToClear.value = '';
	}
}

function endGame() 
{ 
	if (pacmanLives == 0)
	{
		alert("Loser!");
	}
	else if (timeElapsed > gameTime)
	{
		if (score < 100)
		{
			alert(`You are better than ${score} points!`)
		}
		else 
		{
			alert("Winner!!!")
		}
	}
	else if (ballsToEat == 0)
	{
		alert("Winner!!!")
	}
	if (confirm("Play Again?")) //yes
	{
		switchContent("settingsPage");
	} 
	else //no
	{
		switchContent("welcomePage")
	}
}

function setTime()
{
	var time = document.getElementById("enterTime").value;
	if (/^\d+$/.test(time))
	{
		time = parseInt(document.getElementById("enterTime").value);
		time = time * 60;
	}
	if (isNaN(time) || !(Number.isInteger(time)))
	{
		alert('please insert an integer number of seconds');
		clearBoxes(['enterTime'])
	}
	else if (time > 60) 
	{ 
		gameTime = time; 
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
	}
	
}

function randomSelectSettings()
{
	setDefault('up', true);
	setDefault('left', true);
	setDefault('right', true);
	setDefault('down', true);
	var minBallsNum = Math.ceil(50);
    var maxBallsNum = Math.floor(90);
	ballsNum = Math.floor(Math.random() * (maxBallsNum - minBallsNum + 1)) + minBallsNum;
	var inputBalls = document.getElementById("enterBalls");
	inputBalls.value = ballsNum;
	var minTime = Math.ceil(60);
    var maxTime = Math.floor(120);
	gameTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
	var time = document.getElementById("enterTime");
	time.value = gameTime;
	var minMonsters = Math.ceil(1);
    var maxMonsters = Math.floor(4);
	monstersNum = Math.floor(Math.random() * (maxMonsters - minMonsters + 1)) + minMonsters;
	var inputMonsters = document.getElementById("enterMonsters");
	inputMonsters.value = monstersNum;
	var colorRandomMin = Math.ceil(1);
	var colorRandomMax = Math.floor(27);
	var colorNum = Math.floor(Math.random() * (colorRandomMax - colorRandomMin + 1)) + colorRandomMin;
	var colorsDict = colorRandom(colorNum, fiveColor, fifteenColor, twentyFiveColor);
	fiveColor = colorsDict['5'];
	fifteenColor = colorsDict['15'];
	twentyFiveColor = colorsDict['25'];
}


export {showSetter, isBorder, restart, clearBoxes, cant_die}
