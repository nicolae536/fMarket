import { AccountUser } from './../accountUser';
import { Select2Item } from './../../components/selectComponent/selectComponent';
/**
 * AccountFormModel
 */
import { Field } from './registerAccount';

export class AccountFormModel {
    public email:Field;
    public name:Field;
    public phone:Field;
    public cityItem:Field;

    constructor(email?, name?, phone?, cityItem?) {
        this.email = new Field('email', true, email);
        this.name = new Field('name', true, name);
        this.phone = new Field('phone', true, phone);
        this.cityItem = new Field('cityItem', true, cityItem);
    }

    public getValues(): AccountUser {
        let select2CityItem = this.cityItem.value as Select2Item;

        let formData = {
            email: this.email.value,
            name: this.name.value,
            phone: this.phone.value,
            cityId: select2CityItem && select2CityItem.boundItem ?  select2CityItem.boundItem['id'] : null 
        }

        return formData as AccountUser;
    }
}


/**
 * AccountPasswordFormModel
 */
export class AccountPasswordFormModel {
    public lastPassword:Field;
    public newPassword:Field;
    public confirmNewPassword:Field;

    constructor(lastPassword?, newPassword?, confirmNewPassword?) {
        this.lastPassword = new Field('lastPassword', true, lastPassword);
        this.newPassword = new Field('newPassword', true, newPassword);
        this.confirmNewPassword = new Field('confirmNewPassword', true, confirmNewPassword);
    }

    
    public getValues() {
        return {
            oldPassword: this.lastPassword.value,
            newPassword: this.newPassword.value,
        };
    }
}