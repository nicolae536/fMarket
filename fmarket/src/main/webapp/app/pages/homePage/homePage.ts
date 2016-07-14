/**
 * Created by nick_ on 4/12/2016.
 */
import {
    Component, OnInit, ElementRef, ViewChild, AfterViewChecked, AfterViewInit, OnDestroy,
    trigger, transition, animate, style, state, group, keyframes
} from "@angular/core";

import {Subscription} from 'rxjs/Subscription';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/common";
import {CategoriesMenuService} from "../../services/categoriesMenuService";
import {DemandService} from "../../services/demandService";
import {JqueryService} from "../../services/jqueryService";
import {SubscribersService} from "../../services/subscribersService";
import {NotificationService} from "../../services/notificationService";
import {LocalizationService} from "../../services/localizationService";
import {CustomValidators} from "../../models/Angular2ExtensionValidators";
import {DemandComponent} from "../../components/demandComponent/demandComponent";
import {DemandFields} from "../../models/forms/demand";
import {LocalStorageService} from "../../services/localStorageService";
import {ApplicationConstants} from "../../models/applicationConstansts";
import {SuccessPageOptions} from "../registrationPage/successPages/successPage";
import {AuthorizationService} from "../../services/authorizationService";
import {SyncronizationService} from "../../services/syncronizationService";

import * as template from './homePage.html';
import {ENTER_LEAVE_ANIMATION} from '../pageAnimations/enterLeavePage';

@Component({
    selector: 'home-page',
    template: template,
    directives: [DemandComponent],
    animations: ENTER_LEAVE_ANIMATION
})
export class HomePage implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {

    //<editor-fold desc="Services">
    private _categoriesMenuService:CategoriesMenuService;
    private _demandService:DemandService;
    private _formBuilder:FormBuilder;
    private _subscribersService:SubscribersService;
    private _notificationService:NotificationService;
    private _router:Router;
    private _localizationService:LocalizationService;
    private _localeStorageService:LocalStorageService;
    private _syncronizationService:SyncronizationService
    //</editor-fold>

    //<editor-fold desc="Variables">
    @ViewChild('createDemandComponent') private createDemamdViewRef:ElementRef;
    @ViewChild('howWeWork') private howWeWorkRef:ElementRef;
    @ViewChild('videoContainer') private videoContainer:ElementRef;
    @ViewChild('videoRightContainer') private videoRightContainer:ElementRef;

    animation = {componentLoad: false};
    private _demandDialog:DemandComponent;

    private subscriber = {email: '', submited: false};

    scrollProperty:string = 'scrollY';
    private _cityes;
    private _subscribeForm;
    menuDictionary;
    private viewInitialized:boolean = false;

    private pageSubscriptions: Array<Subscription> = new Array<Subscription>();
    //</editor-fold>

    constructor(_categoriesMenuService:CategoriesMenuService,
                router:Router,
                _demandService:DemandService,
                subscribersService:SubscribersService,                
                notificationService:NotificationService,
                _localizationService:LocalizationService,
                localeStorageService:LocalStorageService,
                syncronizationService:SyncronizationService) {

        this._categoriesMenuService = _categoriesMenuService;
        this._router = router;
        this._demandService = _demandService;
        this._subscribersService = subscribersService;
        
        this._notificationService = notificationService;
        this._syncronizationService = syncronizationService;
        this._localizationService = _localizationService;
        this._localeStorageService = localeStorageService;


    }

    ngOnInit():any {
        this.getCities();
        this.getMenuDictionary();
        this._notificationService.removeLoading();

        let me = this;        

        this._localeStorageService.storageStateChange.subscribe(
            storageItem => {
                switch (storageItem ['keyChanged']) {
                    case ApplicationConstants.ACTIVE_USER_STATE:
                        if(AuthorizationService.hasRole(storageItem['newValue'].accountType)){
                            this._router.navigate(['/admin/users']);
                            return;
                        }

                        this._demandDialog.fetchUserEmail();
                        break;                    
                }
            }
        );
    }

    ngOnDestroy():any {
        for(let s of this.pageSubscriptions){
            s.unsubscribe();
        }
    }

    ngAfterViewInit():any {
        let me = this;
        this._notificationService.removeLoading();
        let subscription = this._syncronizationService.taskSender.subscribe(task=>{
            if(task === ApplicationConstants.NAVIGATE_CREATE_DEMAND){
                JqueryService.scrollToElemet({nativeElement: '#createDemandComponent'});
            }
        });       
        this._syncronizationService.subscriberInitialized.next("SUBSCRIBER_INITIALIZED"); 

        this.pageSubscriptions.push(subscription);
    }

    ngAfterViewChecked():any {
        this.rematchElementsOnView(null);
    }

    referenceDemandDialog(demandDialog:DemandComponent) {
        this._demandDialog = demandDialog;
    }

    submitSubscriber(formReference) {
        let me = this;

        me.subscriber.submited = !me.subscriber.submited;
        this._subscribersService.subscribeTowebsite(this.subscriber.email)
            .subscribe(
                success=> {
                    me.subscriber.email = '';
                    
                    me._notificationService.emitSuccessNotificationToRootComponent('Te-ai inscris cu success!', 5);
                },
                error=> {
                    me._notificationService.emitErrorNotificationToRootComponent(error.message, 5);
                }
            )
    }

    goToCreateDemand() {
        JqueryService.animateScroll(this.createDemamdViewRef, 'easeInQuad', 500);
    }

    goToHowWeWork() {
        JqueryService.animateScroll(this.howWeWorkRef, 'easeInQuad', 500);
    }

    createDemand(demand:DemandFields) {
        var me = this;

        this._demandService.createUserDemand(demand)
            .subscribe(
                respose=> {
                    me._router.navigate([`/success/${SuccessPageOptions.CreateDemand}`])
                },
                error=> {
                    this._notificationService.emitErrorNotificationToRootComponent('Cererea nu a putut fi creata', 5);
                }
            )
    }

    private getMenuDictionary():void {
        var me = this;
        this._categoriesMenuService.getMenuDictionary()
            .subscribe(
                response => {
                    me.menuDictionary = response;
                },
                error => {
                    me.menuDictionary = [];
                });
    }

    getCities():void {
        var me = this;
        this._localizationService.getCityList()
            .subscribe(
                response=> {
                    me._cityes = me._localizationService.mapNameToSelect2Item(response);
                },
                error=> {
                    console.log(error.message);
                    me._cityes = [];
                }
            )
    }

    rematchElementsOnView($event) {
        JqueryService.makeElementsOfSameHeight(this.videoContainer.nativeElement, [this.videoRightContainer.nativeElement]);
        JqueryService.fitChildItemsInContainer(this.videoRightContainer.nativeElement)
    }
}