/**
 * Created by NicolaeB on 4/27/2016.
 */
import { Select2Item } from '../../components/selectComponent/selectComponent';

export interface IDemand {
    id: string;
    title: string;
    message: string;
    email: string;
    cities: Array<Select2Item>;
    domain: Select2Item;
    termsAgreed: boolean;
    phone: string;
    name: string;
    agreePhoneContact: boolean;
    agreeEmailContact: boolean;
    allCities: boolean;
    domainId: string;
}