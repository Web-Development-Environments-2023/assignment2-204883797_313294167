class ButtonChanger
{
	constructor(name, changeTo)
	{
		this.name = name
		this.changeTo = changeTo
	}
}

class ButtonShower
{
	constructor(name, direction)
	{
		this.name = name
        this.direction = direction
	}
    
}

class ButtonSetter
{
	constructor(name, direction)
	{
		this.name = name
        this.direction = direction
	}
}


class ButtonDefault
{
    constructor(name, direction)
	{
		this.name = name
        this.direction = direction
	}
}

class ButtonClear
{
    constructor(name, textFeild)
	{
		this.name = name
        this.textFeild = textFeild
	}
}

export {ButtonChanger, ButtonShower, ButtonSetter, ButtonDefault, ButtonClear }

