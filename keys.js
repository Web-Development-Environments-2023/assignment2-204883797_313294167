import { showSetter } from './app.js'

var leftChar = "←";
var rightChar = "→";
var downChar = "↓";
var upChar = "↑";

function setKey(direction, keyDown, keyLeft, keyRight, keyUp)
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
                upChar = char;
				keyUp = String(document.getElementById("enterKeyUp").value.toUpperCase().charCodeAt(0));
				button = document.getElementById("keyUpButton");
				button.textContent = "up : " + char;
			}
			break;

		case 'left':
			char = document.getElementById("enterKeyLeft").value.substring(0,1).toUpperCase();
			status = validateChar(char)
			if (status == true)
			{
                leftChar = char;
				keyLeft = String(document.getElementById("enterKeyLeft").value.toUpperCase().charCodeAt(0));
				button = document.getElementById("keyLeftButton");
				button.textContent = "left : " + char;
			}
			break;

		case 'right':
			char = document.getElementById("enterKeyRight").value.substring(0,1).toUpperCase();
			status = validateChar(char)
			if (status == true)
			{
                rightChar = char;
				keyRight = String(document.getElementById("enterKeyRight").value.toUpperCase().charCodeAt(0));
				button = document.getElementById("keyRightButton");
				button.textContent = "right : " + char;
			}
			break;

		case 'down':
			char = document.getElementById("enterKeyDown").value.substring(0,1).toUpperCase();
			status = validateChar(char)
			if (status == true)
			{
                downChar = char;
				keyDown = String(document.getElementById("enterKeyDown").value.toUpperCase().charCodeAt(0));
				button = document.getElementById("keyDownButton");
				button.textContent = "down : " + char;
			}
			break;	
		
	}
	showSetter(direction)
    return {'up' : keyUp, 'down' : keyDown, 'right' : keyRight, 'left' : keyLeft}
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
    if (!isNaN(char)) { return false; }
	return true;
}

export {setKey, upChar, downChar, leftChar, rightChar }