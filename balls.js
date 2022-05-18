import {clearBoxes} from './app.js'

function setBallsNum(ballsNum)
{
	var inputBalls = document.getElementById("enterBalls").value;
	if (/^\d+$/.test(inputBalls))
	{
		inputBalls = parseInt(document.getElementById("enterBalls").value);
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
    return ballsNum;
}

function setBallColor(pointsAmount, fiveColor, fifteenColor, twentyFiveColor)
{
	switch (pointsAmount)
	{
		case 5:
			fiveColor = document.getElementById("fivePointsBall").value;
			if (fiveColor == 'select color') {fiveColor = 'plum'; }
			alert('5 point ball color is set to: ' + fiveColor)
            return fiveColor;
		
		case 15:
			fifteenColor = document.getElementById("fifteenPointsBall").value;
			if (fifteenColor == 'select color') {fifteenColor = 'red'; }
			alert('15 point ball color is set to: ' + fifteenColor)
			return fifteenColor;

		case 25:
			twentyFiveColor = document.getElementById("twentyFivePointsBall").value;
			if (twentyFiveColor == 'select color') {twentyFiveColor = 'green'; }
			alert('25 point ball color is set to: ' + twentyFiveColor)
			return twentyFiveColor;
	}
    
}

function colorRandom(num, fiveColor, fifteenColor, twentyFiveColor)
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
    return {'5' : fiveColor, '15' : fifteenColor, '25' : twentyFiveColor}

}

export {colorRandom, setBallsNum, setBallColor}