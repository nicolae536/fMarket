
export class InputGroup {
	value;
	type: string = "text";

	constructor(type:string) {
		this.type = type;
	}
}

export class InputGroupOptions {
	type;
	value;
	visible;
	disabled;
}