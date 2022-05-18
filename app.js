var context;
var shape = new Object();
var man_location = new Object();
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
var fiveColor = 'plum'
var fifteenColor = 'red'
var twentyFiveColor = 'green'
var ballsToEat;
var monster_time;
var eatCherry=false;
var man_alive=true;
var monster_can_be_eat = 0;
var monstersNum = 4;
var rand=0
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
move_man = 0;
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
var clock = new Image();
clock.src = 'images/clock.jpg'
var slow_cell_j;
var clock_eat=0;

class Ghost
{
	constructor(name, startIndexCol, startIndexRow, speed, id, srcImage)
	{
		this.name = name
		this.startIndexCol = startIndexCol
		this.startIndexRow = startIndexRow
		this.currIndexCol = startIndexCol
		this.currIndexRow = startIndexRow
		this.image = new Image()
		this.image.src = srcImage
		this.speed = speed
		this.id = id
		this.move = 0
	}
}



function sound(src) 
{
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){ this.sound.play(); }
	this.stop = function() { this.sound.pause(); }
}

function Start() 
{
	ghosts = [
		new Ghost('blinky', 1, 18, 1, 23, 'images/pacman-monster4.png'),
		new Ghost('pinky', 18, 1, 2, 21, 'images/pacman-monster2.png'),
		new Ghost('inky', 18, 18, 2, 22, 'images/pacman-monster3.png'),
		new Ghost('clyde', 1, 1, 4, 20, 'images/pacman-monster1.png')
	]
	gameTime=60
	context = canvas.getContext("2d");
	board = new Array();
	score = 0;
	clock_eat = 0;
	ballsToEat = ballsNum;
	pacColor = "yellow";
	var cnt = 400;
	slow_time = 0;
	slow_time_left=0;
	eatCherry=false;
	rand=0
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
			if ((col == 6 && row == 2) || (col == 12 && row == 12)) { board[col][row] = 4; } //top 3 way
			else if ((col == 5 && row == 2) || (col == 11 && row == 12) || (col == 2 && row == 10) || (col == 11 && row == 6)) {board[col][row] = 13; } //wall [
			else if (col == 3 && row == 9) {board[col][row] = 16; } //top cap
			else if ((col == 7 && row == 2) || (col == 13 && row == 12) || (col == 4 && row == 10) || (col == 13 && row == 6)) {board[col][row] = 14; } //wall ]
			else if ((col == 6 && row == 3) || (col == 12 && row == 13) || col == 3 && row == 11) {board[col][row] = 15; } //bottom cap
			else if ((col == 3 && row == 10)) {board[col][row] = 17} //cross
			//wall corners:
			else if ((col == 0 && row == 0)) {board[col][row] = 7; } // top left
			else if ((col == 19 && row == 19)) {board[col][row] = 8; } //botoom right
			else if (col == 0 && row == 19) {board[col][row] = 9; }
			else if (col == 19 && row == 0) {board[col][row] = 10; }
			//wall borders:
			else if ((row == 0 && col >= 1) || (row == 19 && col >= 1) || (col == 12 && row == 6)) {board[col][row] = 11; }
			else if ((col == 0 && row >= 1) || (col == 19 && row >= 1) || (col == 12 && row == 6)) {board[col][row] = 12; }
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
				cnt--;
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
	interval = setInterval(UpdatePosition, intervalTime);
}



function restart(){
	death_sound.play();
	ghosts = [
		new Ghost('blinky', 1, 18, 1, 23, 'images/pacman-monster4.png'),
		new Ghost('pinky', 18, 1, 2, 21, 'images/pacman-monster2.png'),
		new Ghost('inky', 18, 18, 2, 22, 'images/pacman-monster3.png'),
		new Ghost('clyde', 1, 1, 4, 20, 'images/pacman-monster1.png')
	]

	score=score-10;
	pacmanLives--;

	for (var col = 0; col < 20; col++) 
	{
		for (var row = 0; row < 20; row++) 
		{
			if(board[col][row]==2){//clear pacman
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

function Draw() 
{
	if (eatCherry == true)
	{
		monster1.src = 'images/ghost_sick.jpg'
		monster2.src = 'images/ghost_sick.jpg'
		monster3.src = 'images/ghost_sick.jpg'
		monster4.src = 'images/ghost_sick.jpg'
		cant_die=true;
		monster_time--;
		if (monster_time==0) { eatCherry = false; }
	}
	else
	{
		monster1.src = 'images/pacman-monster1.png'
		monster2.src = 'images/pacman-monster2.png'
		monster3.src = 'images/pacman-monster3.png'
		monster4.src = 'images/pacman-monster4.png'
		cant_die=false;
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
			if (board[col][row] == 2) //pacman
			{
				if(pacmanDirection=='up')
				{
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.65 * Math.PI, 3.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pacColor; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 7.5, center.y - 2.5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}

				else if(pacmanDirection=='down')
				{
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.65 * Math.PI, 2.35 * Math.PI ); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pacColor; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 7.5, center.y + 2.5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}

				else if(pacmanDirection=='right')
				{
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pacColor; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 2.5, center.y - 7.5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}

				else if(pacmanDirection=='left')
				{
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.15 * Math.PI, 2.85 * Math.PI ); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pacColor; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 2.5, center.y - 7.5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}

			} 
			else if (board[col][row] == 1) //5 points ball
			{
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = fiveColor; //color
				context.fill();
			} 
			else if (board[col][row] == 5) //15 points ball
			{
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = fifteenColor; //color
				context.fill();
			} 
			else if (board[col][row] == 6) //25 points ball
			{
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = twentyFiveColor; //color
				context.fill();
			} 
			else if (board[col][row] == 4) //wall top 3 way
			{
				context.drawImage(connectorDown, center.x - 20, center.y - 20);
			}
			else if (board[col][row] == 7) //wall corner top left
			{
				var pattern = context.createPattern(cornerTopLeft, 'repeat');
				context.fillStyle = pattern;
				context.beginPath();
				context.rect(center.x - 20, center.y - 20, 40, 40);
				context.stroke();
				// context.fillStyle = "grey"; //color
				context.fill();
			}
			else if (board[col][row] == 8) //wall corner bottom right
			{
				var pattern = context.createPattern(cornerBottomRight, 'repeat');
				context.fillStyle = pattern;
				context.beginPath();
				context.rect(center.x - 20, center.y - 20, 40, 40);
				context.stroke();
				// context.fillStyle = "grey"; //color
				context.fill();
			}
			else if (board[col][row] == 9) //wall corner top right
			{
				var pattern = context.createPattern(cornerTopRight, 'repeat');
				context.fillStyle = pattern;
				context.beginPath();
				context.rect(760, 0, 40, 40);
				context.stroke();
				// context.fillStyle = "grey"; //color
				context.fill();
			}
			else if (board[col][row] == 10) //wall corner bottom left
			{
				var pattern = context.createPattern(cornerBottomLeft, 'repeat');
				context.fillStyle = pattern;
				context.beginPath();
				context.rect(0, 760, 40, 40);
				context.stroke();
				// context.fillStyle = "grey"; //color
				context.fill();
			}
			else if (board[col][row] == 11) //wall top and bottom border
			{
				var pattern = context.createPattern(bottomAndTopBorders, 'repeat');
				context.fillStyle = pattern;
				context.beginPath();
				context.rect(center.x - 20, center.y - 20, 40, 40);
				context.stroke();
				// context.fillStyle = "grey"; //color
				context.fill();
			}
			else if (board[col][row] == 12) //wall right and left border
			{
				var pattern = context.createPattern(leftAndRightBorders, 'repeat');
				context.fillStyle = pattern;
				context.beginPath();
				context.rect(center.x - 20, center.y - 20, 40, 40);
				context.stroke();
				// context.fillStyle = "grey"; //color
				context.fill();
			}
			else if (board[col][row] == 13) //wall [
			{
				context.drawImage(leftCap, center.x - 20, center.y - 20);
			}
			else if (board[col][row] == 14) //wall ]
			{
				context.drawImage(rightCap, center.x - 20, center.y - 20);
			}
			else if (board[col][row] == 15) //bottom cap
			{
				context.drawImage(bottomCap, center.x - 20, center.y - 20);
			}
			else if (board[col][row] == 16) //top cap 
			{
				context.drawImage(topCap, center.x - 20, center.y - 20);
			}
			else if (board[col][row] == 17) //cross
			{
				context.drawImage(cross, center.x - 20, center.y - 20);
			}
			else if (board[col][row] == 18) //cherry
			{
				context.drawImage(cherry, center.x-20, center.y-20);
			}
			else if (board[col][row] == 19 || board[col][row] == 41 || board[col][row] == 45 || 
				board[col][row] == 46 || board[col][row] == 48 || board[col][row] == 51 || board[col][row] == 53) //man
			{
				context.drawImage(man, center.x-20, center.y-20);
			}
			else if (board[col][row] == 20 || board[col][row] == 30 || ((board[col][row] >= 60) && (board[col][row] <= 66))) //orange ghost
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
			else if (board[col][row] == 50)
			{
				context.drawImage(slow, center.x-20, center.y-20);
			}
			else if (board[col][row] == 52)
			{
				context.drawImage(clock, center.x-20, center.y-20);
			}
		}
	}
}

function isBorder(border)
{
	if ((border == 4) || (border == 7) || ((border >= 8) && (border <= 17))) { return true; }
	else { return false;}
}

function UpdatePosition() 
{
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) //move up
	{
		pacmanDirection='up'
		chomp_sound.play();
		if (shape.j > 0 && !isBorder(board[shape.i][shape.j - 1])) { shape.j--; }
	}
	if (x == 2) //move down
	{
		pacmanDirection='down'
		chomp_sound.play();
		if (shape.j < 19 && !isBorder(board[shape.i][shape.j + 1])) { shape.j++; }
	}
	if (x == 3) //move left
	{
		pacmanDirection='left'
		chomp_sound.play();
		if (shape.i > 0 && !isBorder(board[shape.i - 1][shape.j])) { shape.i--; }
	}
	if (x == 4) //move right
	{
		pacmanDirection='right'
		chomp_sound.play();
		if (shape.i < 19 && !isBorder(board[shape.i + 1][shape.j])) { shape.i++; }
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
		for(var i in ghosts){
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
		for(var i in ghosts){
			ghosts[i].speed=ghosts[i].speed*2
		}
	}
	else if (board[shape.i][shape.j] == 52) //eat clock
	{ 
		gameTime=gameTime+10;
		fruit_sound.play();
	}

	else if (board[shape.i][shape.j] == 53) //eat clock and bucs
	{ 
		score=score+50; 
		gameTime=gameTime+10;
		fruit_sound.play();
	}

	else if((board[shape.i][shape.j] == 60) || (board[shape.i][shape.j] == 61)  || (board[shape.i][shape.j] == 62) || (board[shape.i][shape.j] == 70) || (board[shape.i][shape.j] == 71)  || (board[shape.i][shape.j] == 72)
	|| (board[shape.i][shape.j] == 80) || (board[shape.i][shape.j] == 81)  || (board[shape.i][shape.j] == 82) || (board[shape.i][shape.j] == 90) || (board[shape.i][shape.j] == 91)  || (board[shape.i][shape.j] == 92)
	){
		ballsToEat--;
		if(cant_die==false){
			if(pacmanLives==1){
				lose();
			}
			board[shape.i][shape.j] = 0;
			restart();
		}
	}

	else if ((board[shape.i][shape.j] == 20)  || (board[shape.i][shape.j] == 63) || (board[shape.i][shape.j] == 64) || (board[shape.i][shape.j] == 65) || (board[shape.i][shape.j] == 66)
    || (board[shape.i][shape.j] == 21) || (board[shape.i][shape.j] == 73) || (board[shape.i][shape.j] == 74) || (board[shape.i][shape.j] == 75) || (board[shape.i][shape.j] == 76)
	|| (board[shape.i][shape.j] == 22) || (board[shape.i][shape.j] == 83) || (board[shape.i][shape.j] == 84) || (board[shape.i][shape.j] == 85) || (board[shape.i][shape.j] == 86)
	|| (board[shape.i][shape.j] == 23) || (board[shape.i][shape.j] == 93) || (board[shape.i][shape.j] == 94) || (board[shape.i][shape.j] == 95) || (board[shape.i][shape.j] == 96)) //dead
	{
		if(cant_die==false){
			if(pacmanLives==1){
				lose();
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
			for(var i in ghosts){
				ghosts[i].speed=ghosts[i].speed/2
			}
		}
	}


	board[shape.i][shape.j] = 2;

	//man move randomly
	moveMan();

	//move ghosts
	for(var i in ghosts){
		moveGhost(ghosts[i]);
	}

	var currentTime = new Date();
	timeElapsed = (currentTime - startTime) / 1000;

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

function moveMan()
{
	if(man_alive == true)
	{
		if(move_man == move_speed)
		{
			var loc = board[man_location.i][man_location.j];
			switch(loc)
			{
				case 41: //back to 5
					board[man_location.i][man_location.j]=1;
					break;

				case 45: //back to 15
					board[man_location.i][man_location.j]=5;
					break;

				case 46: //back to 25
					board[man_location.i][man_location.j]=6;
					break;	

				case 48: //back to cherry
					board[man_location.i][man_location.j]=18;
					break;

				case 30: //back to monster1
					board[man_location.i][man_location.j]=20;
					break;

				case 31: //back to monster2
					board[man_location.i][man_location.j]=21;
					break;

				case 32: //back to monster3
					board[man_location.i][man_location.j]=22;
					break;

				case 33: //back to monster4
					board[man_location.i][man_location.j]=23;
					break;

				case 51: //back to slow
					board[man_shape.i][man_shape.j] = 50

				case 53: //back to clock
					board[man_shape.i][man_shape.j] = 52

				default:
					board[man_location.i][man_location.j] = 0;
					break;

			}

			manMovemin = Math.ceil(1);
			manMovemaxin = Math.floor(4);
			manMove = Math.floor(Math.random() * (manMovemaxin - manMovemin + 1)) + manMovemin;
			
			switch(manMove)
			{
				case 1: //up
					if (man_location.j > 0 && !isBorder(board[man_location.i][man_location.j - 1])) { man_location.j--; }
					break;

				case 2: //down
					if (man_location.j < 19 && !isBorder(board[man_location.i][man_location.j + 1])) { man_location.j++; }
					break;

				case 3: //left
					if (man_location.i > 0 && !isBorder(board[man_location.i - 1][man_location.j])) { man_location.i--; }
					break;

				case 4: //right
					if (man_location.i < 19 && !isBorder(board[man_location.i + 1][man_location.j])) { man_location.i++; }
					break;

			}

			//check what was on that space 1,5,6,18,20,21,22,23
			var newLoc = board[man_location.i][man_location.j];
			switch(newLoc)
			{
				case 1: //5 point
					board[man_location.i][man_location.j] = 41;
					break;
				
				case 5: //15 point
					board[man_location.i][man_location.j] = 45;
					break;

				case 6: //25 point
					board[man_location.i][man_location.j] = 46;
					break;

				case 18: //cherry
					board[man_location.i][man_location.j] = 48;
					break;

				case 20: //monster1
					board[man_location.i][man_location.j] = 30;
					break;
				
				case 21: //monster2
					board[man_location.i][man_location.j] = 31;
					break;

				case 22: //monster3
					board[man_location.i][man_location.j] = 32;
					break;

				case 23: //monster4
					board[man_location.i][man_location.j] = 33;
					break;

				case 50: //slow
					board[man_shape.i][man_shape.j] = 51;
					break;

				case 52: //clock
					board[man_shape.i][man_shape.j] = 53;
					break;

				default:
					board[man_location.i][man_location.j] = 19;
					break;
			}
			move_man=0;
		}
		else { move_man++; }
	}
}

function isGhost(ghost)
{
	if ((ghost == 20) || (ghost == 21) || (ghost == 22) || (ghost == 23)) { return true; }
	else { return false;}
}


	

function moveGhost(ghost)
{
	if (ghost.move == ghost.speed)
	{
		if (ghost.id == 20)
		{
			var loc = board[ghost.currIndexCol][ghost.currIndexRow];
			switch(loc)
			{
				case 60: //back to 5
					board[ghost.currIndexCol][ghost.currIndexRow] = 1;
					break;

				case 61: //back to 15
					board[ghost.currIndexCol][ghost.currIndexRow] = 5;
					break;

				case 62: //back to 25
					board[ghost.currIndexCol][ghost.currIndexRow] = 6;
					break;	

				case 63: //back to cherry
					board[ghost.currIndexCol][ghost.currIndexRow] = 18;
					break;

				case 64: //back to character
					board[ghost.currIndexCol][ghost.currIndexRow] = 19;
					break;

				case 65: //back to slow
					board[ghost.currIndexCol][ghost.currIndexRow] = 50;
					break;

				case 66: //back to time
					board[ghost.currIndexCol][ghost.currIndexRow] = 52;
					break;

				default:
					board[ghost.currIndexCol][ghost.currIndexRow] = 0;
					break;
			}
		}

		if (ghost.id == 21)
		{
			var loc = board[ghost.currIndexCol][ghost.currIndexRow];
			switch(loc)
			{
				case 70: //back to 5
					board[ghost.currIndexCol][ghost.currIndexRow] = 1;
					break;

				case 71: //back to 15
					board[ghost.currIndexCol][ghost.currIndexRow] = 5;
					break;

				case 72: //back to 25
					board[ghost.currIndexCol][ghost.currIndexRow] = 6;
					break;	

				case 73: //back to cherry
					board[ghost.currIndexCol][ghost.currIndexRow] = 18;
					break;

				case 74: //back to character
					board[ghost.currIndexCol][ghost.currIndexRow] = 19;
					break;

				case 75: //back to slow
					board[ghost.currIndexCol][ghost.currIndexRow] = 50;
					break;

				case 76: //back to time
					board[ghost.currIndexCol][ghost.currIndexRow] = 52;
					break;

				default:
					board[ghost.currIndexCol][ghost.currIndexRow] = 0;
					break;
			}
		}

		if (ghost.id == 22)
		{
			var loc = board[ghost.currIndexCol][ghost.currIndexRow];
			switch(loc)
			{
				case 80: //back to 5
					board[ghost.currIndexCol][ghost.currIndexRow] = 1;
					break;

				case 81: //back to 15
					board[ghost.currIndexCol][ghost.currIndexRow] = 5;
					break;

				case 82: //back to 25
					board[ghost.currIndexCol][ghost.currIndexRow] = 6;
					break;	

				case 83: //back to cherry
					board[ghost.currIndexCol][ghost.currIndexRow] = 18;
					break;

				case 84: //back to character
					board[ghost.currIndexCol][ghost.currIndexRow] = 19;
					break;

				case 85: //back to slow
					board[ghost.currIndexCol][ghost.currIndexRow] = 50;
					break;

				case 86: //back to time
					board[ghost.currIndexCol][ghost.currIndexRow] = 52;
					break;

				default:
					board[ghost.currIndexCol][ghost.currIndexRow] = 0;
					break;
			}
		}

		if (ghost.id == 23)
		{
			var loc = board[ghost.currIndexCol][ghost.currIndexRow];
			switch(loc)
			{
				case 90: //back to 5
					board[ghost.currIndexCol][ghost.currIndexRow] = 1;
					break;

				case 91: //back to 15
					board[ghost.currIndexCol][ghost.currIndexRow] = 5;
					break;

				case 92: //back to 25
					board[ghost.currIndexCol][ghost.currIndexRow] = 6;
					break;	

				case 93: //back to cherry
					board[ghost.currIndexCol][ghost.currIndexRow] = 18;
					break;

				case 94: //back to character
					board[ghost.currIndexCol][ghost.currIndexRow] = 19;
					break;

				case 95: //back to slow
					board[ghost.currIndexCol][ghost.currIndexRow] = 50;
					break;

				case 96: //back to time
					board[ghost.currIndexCol][ghost.currIndexRow] = 52;
					break;

				default:
					board[ghost.currIndexCol][ghost.currIndexRow] = 0;
					break;
			}
		}


		ghostMoveMin = Math.ceil(1);
		ghostMoveMax = Math.floor(4);
		ghostMove = Math.floor(Math.random() * (ghostMoveMax - ghostMoveMin + 1)) + ghostMoveMin;
		best_Horizontal=bestHorizontal(ghost.currIndexCol);
		best_Vertical=bestVertical(ghost.currIndexRow);
		if(rand==0){		
			moveBestHor(ghost,best_Horizontal);
			rand++;
		}
		else if(rand==1){
			moveBestVer(ghost,best_Vertical);
			rand++;
		}
		else if(rand==2 &&((best_Horizontal == "mid")||(best_Vertical=="mid"))){
			moveRand(ghost,ghostMove)
		}
		else if(rand<4){
			rand++;

		}
		else{
			rand=0;
		}		

	



		
		if (ghost.id == 20)
		{
			//check what was on that space 1,5,6,18,20,21,22,23
			var newLoc = board[ghost.currIndexCol][ghost.currIndexRow];
			switch(newLoc)
			{
				case 1: //5 point
					board[ghost.currIndexCol][ghost.currIndexRow] = 60; 
					break;

				case 2: //dead
					restart();
					break;
				
				case 5: //15 point
					board[ghost.currIndexCol][ghost.currIndexRow] = 61;
					break;

				case 6: //25 point
					board[ghost.currIndexCol][ghost.currIndexRow] = 62;
					break;

				case 18: //cherry
					board[ghost.currIndexCol][ghost.currIndexRow] = 63;
					break;

				case 19: //character
					board[ghost.currIndexCol][ghost.currIndexRow] = 64;
					break;

				case 50: //slow
					board[ghost.currIndexCol][ghost.currIndexRow] = 65;
					break;

				case 52: //time
					board[ghost.currIndexCol][ghost.currIndexRow] = 66;
					break;

				default:
					board[ghost.currIndexCol][ghost.currIndexRow] = ghost.id;
					break;
			}
		}

		if (ghost.id == 21)
		{
			//check what was on that space 1,5,6,18,20,21,22,23
			var newLoc = board[ghost.currIndexCol][ghost.currIndexRow];
			switch(newLoc)
			{
				case 1: //5 point
					board[ghost.currIndexCol][ghost.currIndexRow] = 70; 
					break;

				case 2: //dead
					restart();
					break;
				
				case 5: //15 point
					board[ghost.currIndexCol][ghost.currIndexRow] = 71;
					break;

				case 6: //25 point
					board[ghost.currIndexCol][ghost.currIndexRow] = 72;
					break;

				case 18: //cherry
					board[ghost.currIndexCol][ghost.currIndexRow] = 73;
					break;

				case 19: //character
					board[ghost.currIndexCol][ghost.currIndexRow] = 74;
					break;

				case 50: //slow
					board[ghost.currIndexCol][ghost.currIndexRow] = 75;
					break;

				case 52: //time
					board[ghost.currIndexCol][ghost.currIndexRow] = 76;
					break;

				default:
					board[ghost.currIndexCol][ghost.currIndexRow] = ghost.id;
					break;
			}
		}

		if (ghost.id == 22)
		{
			//check what was on that space 1,5,6,18,20,21,22,23
			var newLoc = board[ghost.currIndexCol][ghost.currIndexRow];
			switch(newLoc)
			{
				case 1: //5 point
					board[ghost.currIndexCol][ghost.currIndexRow] = 80; 
					break;

				case 2: //dead
					restart();
					break;
				
				case 5: //15 point
					board[ghost.currIndexCol][ghost.currIndexRow] = 81;
					break;

				case 6: //25 point
					board[ghost.currIndexCol][ghost.currIndexRow] = 82;
					break;

				case 18: //cherry
					board[ghost.currIndexCol][ghost.currIndexRow] = 83;
					break;

				case 19: //character
					board[ghost.currIndexCol][ghost.currIndexRow] = 84;
					break;
				
				case 50: //slow
					board[ghost.currIndexCol][ghost.currIndexRow] = 85;
					break;

				case 52: //time
					board[ghost.currIndexCol][ghost.currIndexRow] = 86;
					break;

				default:
					board[ghost.currIndexCol][ghost.currIndexRow] = ghost.id;
					break;
			}
		}

		if (ghost.id == 23)
		{
			//check what was on that space 1,5,6,18,20,21,22,23
			var newLoc = board[ghost.currIndexCol][ghost.currIndexRow];
			switch(newLoc)
			{
				case 1: //5 point
					board[ghost.currIndexCol][ghost.currIndexRow] = 90; 
					break;

				case 2: //dead
					restart();
					break;
				
				case 5: //15 point
					board[ghost.currIndexCol][ghost.currIndexRow] = 91;
					break;

				case 6: //25 point
					board[ghost.currIndexCol][ghost.currIndexRow] = 92;
					break;

				case 18: //cherry
					board[ghost.currIndexCol][ghost.currIndexRow] = 93;
					break;

				case 19: //character
					board[ghost.currIndexCol][ghost.currIndexRow] = 94;
					break;

				case 50: //slow
					board[ghost.currIndexCol][ghost.currIndexRow] = 95;
					break;

				case 52: //time
					board[ghost.currIndexCol][ghost.currIndexRow] = 96;
					break;

				default:
					board[ghost.currIndexCol][ghost.currIndexRow] = ghost.id;
					break;
			}
		}
		
		ghost.move = 0
	}
	else { ghost.move++; }
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
	window.clearInterval(interval);
	if (id == "gamePage") { Start(); }
	if (id == "welcomePage") { welcome_sound.play(); }

	// Show selected one
	target.style.display = 'block';

}

function sound(src) 
{
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function() { this.sound.play(); }
	this.stop = function() { this.sound.pause(); }
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
			if (fiveColor == 'select color') {fiveColor = 'plum'; }
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

function colorRandom(num)
{
	var fivePointsBall = document.getElementById("fivePointsBall");
	var fifteenPointsBall = document.getElementById("fifteenPointsBall");
	var twentyFivePointsBall = document.getElementById("twentyFivePointsBall");

	switch (num){
		case 1:
			fiveColor = 'plum'
			fifteenColor = 'red'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'plum';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'green';
			break;
			
		case 2:
			fiveColor = 'plum'
			fifteenColor = 'red'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'plum';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 3:
			fiveColor = 'plum'
			fifteenColor = 'red'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'plum';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 4:
			fiveColor = 'plum'
			fifteenColor = 'orange'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'plum';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'green';
			break;

		case 5:
			fiveColor = 'plum'
			fifteenColor = 'orange'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'plum';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 6:
			fiveColor = 'plum'
			fifteenColor = 'orange'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'plum';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 7:
			fiveColor = 'plum'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'plum';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'green';
			break;

		case 8:
			fiveColor = 'plum'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'plum';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;
		
		case 9:
			fiveColor = 'plum'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'plum';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'SpringGreen';
			break;
		
		case 10:
			fiveColor = 'purple'
			fifteenColor = 'red'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'purple';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'green';
			break;
		
		case 11:
			fiveColor = 'purple'
			fifteenColor = 'red'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'purple';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;
		
		case 12:
			fiveColor = 'purple'
			fifteenColor = 'red'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'purple';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 13:
			fiveColor = 'purple'
			fifteenColor = 'orange'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'purple';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'green';
			break;

		case 14:
			fiveColor = 'purple'
			fifteenColor = 'orange'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'purple';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 15:
			fiveColor = 'purple'
			fifteenColor = 'orange'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'purple';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 16:
			fiveColor = 'purple'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'purple';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'green';
			break;

		case 17:
			fiveColor = 'purple'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'purple';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 18:
			fiveColor = 'purple'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'purple';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 19:
			fiveColor = 'pink'
			fifteenColor = 'red'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'pink';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'green';
			break;

		case 20:
			fiveColor = 'pink'
			fifteenColor = 'red'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'pink';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 21:
			fiveColor = 'pink'
			fifteenColor = 'red'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'pink';
			fifteenPointsBall.value = 'red';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 22:
			fiveColor = 'pink'
			fifteenColor = 'orange'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'pink';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'green';
			break;

		case 23:
			fiveColor = 'pink'
			fifteenColor = 'orange'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'pink';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 24:
			fiveColor = 'pink'
			fifteenColor = 'orange'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'pink';
			fifteenPointsBall.value = 'orange';
			twentyFivePointsBall.value = 'SpringGreen';
			break;

		case 25:
			fiveColor = 'pink'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'green'
			fivePointsBall.value = 'pink';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'green';
			break;

		case 26:
			fiveColor = 'pink'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'DarkSeaGreen'
			fivePointsBall.value = 'pink';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'DarkSeaGreen';
			break;

		case 27:
			fiveColor = 'pink'
			fifteenColor = 'Tomato'
			twentyFiveColor = 'SpringGreen'
			fivePointsBall.value = 'pink';
			fifteenPointsBall.value = 'Tomato';
			twentyFivePointsBall.value = 'SpringGreen';
			break;
	}

}





function bestHorizontal(ghostCol){
	if(ghostCol>shape.i){
		return "left";
	}
	else if(ghostCol<shape.i){
		return "right";
	}
	else{
		return "mid";
	}

}



function bestVertical(ghostRow){
	if(ghostRow>shape.j){
		return "up";
	}
	else if(ghostRow<shape.j){
		return "down";
	}
	else{
		return "mid";
	}
	
}


function moveBestVer(ghost,move){


	if(move=="up"){
		if (ghost.currIndexRow > 0 && !isBorder(board[ghost.currIndexCol][ghost.currIndexRow-1])){
			ghost.currIndexRow--;
		}

	}
	if(move=="down"){
		if (ghost.currIndexRow < 19 && !isBorder(board[ghost.currIndexCol][ghost.currIndexRow+1])){
			ghost.currIndexRow++;
		}
	}
}
function moveBestHor(ghost,move){
	if(move=="right"){
		if (ghost.currIndexCol > 0 && !isBorder(board[ghost.currIndexCol+1][ghost.currIndexRow])){
			ghost.currIndexCol++;
		}

	}
	if(move=="left"){
		if (ghost.currIndexCol < 19 && !isBorder(board[ghost.currIndexCol-1][ghost.currIndexRow])){
			ghost.currIndexCol--;
		}
	}
}
function moveRand(ghost,move){
	switch (move){
		case 1: //up
			if (ghost.currIndexRow > 0 && !isBorder(board[ghost.currIndexCol][ghost.currIndexRow-1])) { ghost.currIndexRow--; }
				break;

		case 2: //down
			if (ghost.currIndexRow < 19 && !isBorder(board[ghost.currIndexCol][ghost.currIndexRow+1])) { ghost.currIndexRow++; }
				break;

		case 3: //left
			if (ghost.currIndexCol > 0 && !isBorder(board[ghost.currIndexCol-1][ghost.currIndexRow])) { ghost.currIndexCol--; }
				break;

		case 4: //right
			if (ghost.currIndexCol < 19 && !isBorder(board[ghost.currIndexCol+1][ghost.currIndexRow])) { ghost.currIndexCol++; }
				break;
	}
}

function lose(){
	alert("You lost");
}


