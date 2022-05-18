import { showSetter, clearBoxes } from './app.js'

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

export {setKey}