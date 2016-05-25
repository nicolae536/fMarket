/**
 * Created by nick_ on 4/12/2016.
 */
import {Component, OnInit, ElementRef, ViewChild, AfterViewChecked, AfterViewInit} from "@angular/core";
import {Response} from "@angular/http";
import {FormBuilder, Validators} from "@angular/common";
import {CategoriesMenuService} from "../../services/categoriesMenuService";
import {DemandService} from "../../services/demandService";
import {Demand} from "../../models/demand";
import {JqueryService} from "../../services/jqueryService";
import {CustomValidators} from "../../models/Angular2ExtensionValidators";
import {SubscribersService} from "../../services/subscribersService";
import {NotificationService} from "../../services/notificationService";
import {DemandComponent} from "../../components/demandComponent/demandComponent";

const folderPath = '/app/pages/homePage';

@Component({
    selector: 'home-page',
    templateUrl: folderPath + '/homePage.html',
    directives: [DemandComponent]
})
export class HomePage implements OnInit, AfterViewChecked, AfterViewInit {
    //components
    @ViewChild('createDemandComponent') private createDemamdViewRef:ElementRef;
    @ViewChild('howWeWork') private howWeWorkRef:ElementRef;
    @ViewChild('videoContainer') private videoContainer:ElementRef;
    @ViewChild('videoRightContainer') private videoRightContainer:ElementRef;
    private _demandDialog:DemandComponent;
    scrollProperty:string = 'scrollY';

    //services
    private _categoriesMenuService:CategoriesMenuService;

    private _demandService:DemandService;
    //data
    private _cityes;
    private _formBuilder:FormBuilder;
    private _subscribeForm;
    private _subscribersService:SubscribersService;
    private _notificationService:NotificationService;
    menuDictionary;

    constructor(_categoriesMenuService:CategoriesMenuService, _demandService:DemandService, subscribersService:SubscribersService, formBuilder:FormBuilder, notificationService:NotificationService) {
        this._categoriesMenuService = _categoriesMenuService;
        this._demandService = _demandService;
        this._subscribersService = subscribersService;
        this._formBuilder = formBuilder;
        this._notificationService = notificationService;
    }
    ngOnInit():any {
        this.getCities();
        this.getMenuDictionary();
        this._subscribeForm = this._formBuilder.group([]);
        this._subscribeForm.addControl('email', this._formBuilder.control('', Validators.compose([Validators.required, CustomValidators.validateEmail])));
        // this._notificationService.updateBackground(ApplicationConstants.homePage);
        this._notificationService.removeLoading();
    }

    ngAfterViewInit():any {
        this._notificationService.removeLoading();
    }

    ngAfterViewChecked():any {
        this.rematchElementsOnView(null);
    }

    referenceDemandDialog(demandDialog:DemandComponent) {
        this._demandDialog = demandDialog;
    }

    submitSubscriber() {
        if (!this._subscribeForm.valid) {
            return;
        }

        let me = this;
        this._subscribersService.subscribeTowebsite(this._subscribeForm.value)
            .map(response=> {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                success=> {
                    me._subscribeForm.removeControl('email');
                    this._subscribeForm.addControl('email', this._formBuilder.control('', Validators.compose([Validators.required, CustomValidators.validateEmail])));
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
                        message: error.message,
                        timeout: 5
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

        if (!this._demandDialog.IsValid()) {
            return;
        }

        this._demandService.createUserDemand(demand).map((response)=> {
            if (response.text().length > 0) {
                return response.json();
            }
        }).subscribe(
            respose=> {
                me._demandDialog.restData();
            },
            error=> {
                this._notificationService.emitNotificationToRootComponent({
                    type:'danger',
                    dismisable:true,
                    message:'Cererea nu a putut fi creata',
                    timeout:undefined
                })
            }
        )
    }

    private getMenuDictionary():void {
        var me = this;
        this._categoriesMenuService.getMenuDictionary()
            .map((response:Response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            }).subscribe(
            response => {
                me.menuDictionary = response;
            },
            error => {
                me.menuDictionary = [];
            });
    }

    getCities():void {
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

    rematchElementsOnView($event){
        JqueryService.makeElementsOfSameHeight(this.videoContainer.nativeElement,[this.videoRightContainer.nativeElement]);
        JqueryService.fitChildItemsInContainer(this.videoRightContainer.nativeElement)
    }
}