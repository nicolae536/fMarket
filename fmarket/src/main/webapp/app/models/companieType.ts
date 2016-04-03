export class CompanieType{
	id:string;
	name:string;
	companies_no:number;
	isInEditMode:boolean = false;
	
	constructor(id?:string, name?:string, companies?:number) {
		this.id = id;
		this.name = name;
		this.companies_no = companies;
	}
}