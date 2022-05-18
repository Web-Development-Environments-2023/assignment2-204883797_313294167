import { isBorder } from './app.js'

var man_location = new Object();

function moveMan(man_alive, move_man, move_speed, board)
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

			var manMovemin = Math.ceil(1);
			var manMovemaxin = Math.floor(4);
			var manMove = Math.floor(Math.random() * (manMovemaxin - manMovemin + 1)) + manMovemin;
			
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
		return move_man;
	}

}

export {moveMan, man_location}