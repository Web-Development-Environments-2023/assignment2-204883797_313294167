var pacColor = "yellow";

function drawPacman(pacmanDirection, context, center)
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

export { drawPacman }