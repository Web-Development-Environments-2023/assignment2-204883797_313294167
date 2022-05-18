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

export {ButtonChanger, ButtonShower, ButtonSetter, ButtonDefault }

