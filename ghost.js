import { restart, isBorder,cant_die } from './app.js'

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

var rand=0;

function moveGhost(board, ghost, shape)
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

		var ghostMoveMin = Math.ceil(1);
		var ghostMoveMax = Math.floor(4);
		var ghostMove = Math.floor(Math.random() * (ghostMoveMax - ghostMoveMin + 1)) + ghostMoveMin;
		var best_Horizontal=bestHorizontal(ghost.currIndexCol, shape);
		var best_Vertical=bestVertical(ghost.currIndexRow, shape);
		if(rand==0){		
			moveBestHor(ghost, best_Horizontal, board);
			rand++;
		}
		else if(rand==1){
			moveBestVer(ghost, best_Vertical, board);
			rand++;
		}
		else if(rand==2 &&((best_Horizontal == "mid")||(best_Vertical=="mid"))){
			moveRand(ghost, ghostMove, board)
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
				if(cant_die==false){
					restart();
					break;
				}
				
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
				if(cant_die==false){
					restart();
					break;
				}
				
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
				if(cant_die==false){
					restart();
					break;
				}
				
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
				if(cant_die==false){
					restart();
					break;
				}
				
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


function bestHorizontal(ghostCol, shape)
{
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

function bestVertical(ghostRow, shape)
{
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

function moveBestVer(ghost, move, board){


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
function moveBestHor(ghost, move, board){
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
function moveRand(ghost, move, board){
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

export {Ghost, moveGhost}