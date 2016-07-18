
import { Field } from './registerAccount';
import { User } from '../user';
/**
 * UserForm
 */
export class UserForm {
    public name: Field
    public email: Field
    public password: Field
    public phone: Field
    public status: Field
    public city: Field
    public accountDetails: Field

    constructor(name ?:string, email ?:string, password ?:string, phone ?:string, status ?:string, cityId ?:string, accountDetails ?:string) {
        this.name = new Field('name', true, name);
        this.email = new Field('email', true, email);
        this.password = new Field('password', true, password);
        this.phone = new Field('phone', true, phone);
        this.status = new Field('status', true, status ? status : null);
        this.city = new Field('cityId', true, cityId ? status : null);
        this.accountDetails = new Field('accountDetails', true, accountDetails);
    }

    public getValue(){
        return {
            name: this.name.value,
            email: this.email.value,
            password: this.password.value,
            phone: this.phone.value,
            status: this.status.value,
            cityId: this.city.value,
            accountDetails: this.accountDetails.value
        };
    }
}