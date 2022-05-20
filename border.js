class Border
{
    constructor(name, srcImage)
    {
        this.name = name;
        this.image = srcImage;
    }
}

function isBorder(border)
{
	if ((border == 4) || (border == 7) || ((border >= 8) && (border <= 17)) || (border == 100)) { return true; }
	else { return false;}
}

function drawBorder(context, image, locX, locY, size)
{
	var pattern = context.createPattern(image, 'repeat');
	context.fillStyle = pattern;
	context.beginPath();
	context.rect(locX, locY, size, size);
	context.stroke();
	context.fill();
}

export {isBorder, drawBorder}