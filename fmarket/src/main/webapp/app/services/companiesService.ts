/**
 * Created by nick_ on 5/6/2016.
 */
import {Injectable} from "@angular/core";
import {FMarketApi} from "./fMarketApi";
import {IStarReview} from "../models/interfaces/iStarReview";
import {IMessageReview} from "../models/interfaces/iMessageReview";
import {NewCompanyRequest} from "../models/newCompanyRequest";
import {CompanySearchObject} from "../models/companySearchObject";
import {Select2Item} from "../components/selectComponent/selectComponent";
import * as _ from "underscore";
import {Observable} from "rxjs/Rx";

@Injectable()
export class CompaniesService {
    private api:FMarketApi;
    private COMPANIE_CONTROLLER = '/companies'
    private ADMIN_COMPANIE_CONTROLLER = '/admin' + this.COMPANIE_CONTROLLER;

    constructor(api:FMarketApi) {
        this.api = api;
    }

    getCompaniesForUsers(searchQuery) {
        return this.api.get(this.COMPANIE_CONTROLLER + `/all?p=${searchQuery}`);
    }

    getCompanieDetailsForUsers(id:number) {
        return this.api.get(this.COMPANIE_CONTROLLER + `/${id}`);
    }

    addStarsReviewForUsers(review:IStarReview) {
        return this.api.post(this.COMPANIE_CONTROLLER + '/review/stars', JSON.stringify(review));
    }

    addMessageReviewForUsers(review:IMessageReview) {
        return this.api.post(this.COMPANIE_CONTROLLER + '/review/message', JSON.stringify(review));
    }

    createCompany(newCompanyRequest:NewCompanyRequest) {
        return this.api.post(this.ADMIN_COMPANIE_CONTROLLER, JSON.stringify(newCompanyRequest));
    }

    uploadCompanyLogo(id, logoImage) {
        return Observable.create(observer => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            // for (let i = 0; i < logoImage.length; i++) {
            //     formData.append("uploads[]", logoImage[i], logoImage[i].name);
            // }
            if (logoImage.length > 0) {

                formData.append("logo", logoImage[0], logoImage[0].name);

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            observer.next(xhr.response.length > 0 ? JSON.parse(xhr.response) : '');
                            observer.complete();
                        } else {
                            observer.error(xhr.response);
                        }
                    }
                };

                // xhr.upload.onprogress = (event) => {
                //     this.progress = Math.round(event.loaded / event.total * 100);
                //
                //     this.progressObserver.next(this.progress);
                // };

                xhr.open('POST', this.ADMIN_COMPANIE_CONTROLLER + `/logo/${id}`, true);
                xhr.send(formData);
            }
        });
    }

    getCompanyWithFilters(searchObject) {
        return this.api.post(this.ADMIN_COMPANIE_CONTROLLER + '/search', JSON.stringify(searchObject));
    }

    getCompanyDetails(companyId:number) {
        return this.api.get<NewCompanyRequest>(this.ADMIN_COMPANIE_CONTROLLER + `/${companyId}`);
    }

    editCompany(updatedCompany:NewCompanyRequest) {
        return this.api.put(this.ADMIN_COMPANIE_CONTROLLER, JSON.stringify(updatedCompany));
    }

    deleteCompany(id:number) {
        return this.api.delete(this.ADMIN_COMPANIE_CONTROLLER + `/${id}`)
    }

    getCompanieDomains() {
        return this.api.get('/company/domains');
    }

    getDemandDomanins() {
        return this.api.get('/demand/domains');
    }

    getCompanyReviews(id) {
        return this.api.get(this.COMPANIE_CONTROLLER + `/reviews/${id}`);
    }

    mapNameToSelect2Item(array):Array<Select2Item> {
        return _.map(array, (item)=> {
            return {
                displayName: item['name'],
                boundItem: item
            }
        })
    }
}