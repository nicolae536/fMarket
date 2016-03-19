export class Subscriber{
	public id:string;
	public description: string;
	public email: string;
	public subscribeDate: Date;
	public unsubscribeDate: Date;
	public unsubscribeToken: number;

	constructor(id: string, description: string, email: string, subscribeDate:Date, unsubscribeDate: Date, unsubscribeToken: number ) {
		this.id = id? id : "";
		this.description = description? description : "";
		this.email = email? email : "";
		this.subscribeDate = subscribeDate? subscribeDate.toLocaleDateString("en-US") : new Date(1,1,1,0,0,0,0).toLocaleDateString("en-US");
		this.unsubscribeDate = unsubscribeDate? unsubscribeDate.toLocaleDateString("en-US") : new Date(1,1,1,0,0,0,0).toLocaleDateString("en-US");
		this.unsubscribeToken = unsubscribeToken? unsubscribeToken : -1;
	}
}