/**
 * Created by nick_ on 4/12/2016.
 */
import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {Response} from "@angular/http";
import {FormBuilder, Validators} from "@angular/common";
import {CategoriesMenuService} from "../../services/categoriesMenuService";
import {Select2Item} from "../../components/selectComponent/selectComponent";
import {DemandService} from "../../services/demandService";
import {DemandDialogComponent} from "../../components/demandComponent/demandDialogComponent/demandDialogComponent";
import {Demand} from "../../models/demand";
import {JqueryService} from "../../services/jqueryService";
import {CustomValidators} from "../../models/Angular2ExtensionValidators";
import {SubscribersService} from "../../services/subscribersService";
import {NotificationService} from "../../services/notificationService";

const folderPath = '/app/pages/homePage';

@Component({
    selector: 'home-page',
    templateUrl: folderPath + '/homePage.html',
    directives: [DemandDialogComponent]
})
export class HomePage implements OnInit {
    //components
    @ViewChild('createDemandComponent') private createDemamdViewRef:ElementRef;
    @ViewChild('howWeWork') private howWeWorkRef:ElementRef;

    private _demandDialog:DemandDialogComponent;

    scrollProperty:string = 'scrollY';
    //services
    private _categoriesMenuService:CategoriesMenuService;
    private _demandService:DemandService;
    //data
    private _domains:Array<Select2Item>;
    private _cityes;
    private _formBuilder:FormBuilder;
    private _subscribeForm;
    private _subscribersService:SubscribersService;
    private _notificationService:NotificationService;

    constructor(_categoriesMenuService:CategoriesMenuService, _demandService:DemandService, subscribersService:SubscribersService, formBuilder:FormBuilder, notificationService:NotificationService) {
        this._categoriesMenuService = _categoriesMenuService;
        this._demandService = _demandService;
        this._subscribersService = subscribersService;
        this._formBuilder = formBuilder;
        this._notificationService = notificationService;
    }

    ngOnInit():any {
        this.getCityes();
        this.getDomains();
        this._subscribeForm = this._formBuilder.group([]);
        this._subscribeForm.addControl('email', this._formBuilder.control('', Validators.compose([Validators.required, CustomValidators.validateEmail])))
    }

    referenceDemandDialog(demandDialog:DemandDialogComponent) {
        this._demandDialog = demandDialog;
    }

    submitSubscriber() {
        if (!this._subscribeForm.valid) {
            return;
        }

        let me = this;
        this._subscribersService.subscribe(this._subscribeForm.value)
            .map(response=> {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                success=> {
                    me._notificationService.emitNotificationToRootComponent({
                        type: 'success',
                        dismisable: true,
                        message: 'Te-ai inscris cu success!',
                        timeout: 5
                    });
                },
                error=> {
                    me._notificationService.emitNotificationToRootComponent({
                        type: 'danger',
                        dismisable: true,
                        message: 'Erroare',
                        timeout: null
                    });
                }
            )
    }

    goToCreateDemand() {
        JqueryService.animateScroll(this.createDemamdViewRef, 'easeInQuad', 500);
    }

    goToHowWeWork() {
        JqueryService.animateScroll(this.howWeWorkRef, 'easeInQuad', 500);
    }

    createDemand(demand:Demand) {
        var me = this;

        if (!this._demandDialog.isValidResponse()) {
            return;
        }

        this._demandService.createDemand(demand).map((response)=> {
            if (response.text().length > 0) {
                return response.json();
            }
        }).subscribe(
            respose=> {
                me._demandDialog.closeDemandDialog();
            },
            error=> {
                console.log(error.message);
            }
        )
    }

    getCityes():void {
        var me = this;
        this._demandService.getCityList()
            .subscribe(
                response=> {
                    me._cityes = response.map((city)=> {
                        return {
                            displayName: city['name'],
                            boundItem: city
                        };
                    });
                },
                error=> {
                    console.log(error.message);
                    me._cityes = [];
                }
            )
    }

    getDomains():void {
        var me = this;
        this._categoriesMenuService.getDomains()
            .map((response:Response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            }).subscribe(
            response => {
                me._domains = response.map((domain)=> {
                    return {
                        displayName: domain['name'],
                        boundItem: domain
                    };
                })
            },
            error => {
                console.log(error.message);
                me._domains = [];
            }
        )
    }
}