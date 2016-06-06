/**
 * Created by nick_ on 4/12/2016.
 */
import {Component, OnInit, ElementRef, ViewChild, AfterViewChecked, AfterViewInit, OnDestroy} from "@angular/core";
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
import {Demand} from "../../models/demand";
import {LocalStorageService} from "../../services/localStorageService";
import {ApplicationConstants} from "../../models/applicationConstansts";

const folderPath = '/app/pages/homePage';

@Component({
    selector: 'home-page',
    templateUrl: folderPath + '/homePage.html',
    directives: [DemandComponent]
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
    //</editor-fold>

    //<editor-fold desc="Variables">
    @ViewChild('createDemandComponent') private createDemamdViewRef:ElementRef;
    @ViewChild('howWeWork') private howWeWorkRef:ElementRef;
    @ViewChild('videoContainer') private videoContainer:ElementRef;
    @ViewChild('videoRightContainer') private videoRightContainer:ElementRef;
    private _demandDialog:DemandComponent;
    scrollProperty:string = 'scrollY';
    private _cityes;
    private _subscribeForm;
    menuDictionary;
    private viewInitialized:boolean = false;
    //</editor-fold>

    constructor(_categoriesMenuService:CategoriesMenuService,
                router:Router,
                _demandService:DemandService,
                subscribersService:SubscribersService,
                formBuilder:FormBuilder,
                notificationService:NotificationService,
                _localizationService:LocalizationService,
                localeStorageService:LocalStorageService) {
        this._categoriesMenuService = _categoriesMenuService;
        this._router = router;
        this._demandService = _demandService;
        this._subscribersService = subscribersService;
        this._formBuilder = formBuilder;
        this._notificationService = notificationService;
        this._localizationService = _localizationService;
        this._localeStorageService = localeStorageService;


    }

    ngOnInit():any {
        this.getCities();
        this.getMenuDictionary();
        this._subscribeForm = this._formBuilder.group([]);
        this._subscribeForm.addControl('email', this._formBuilder.control('', Validators.compose([Validators.required, CustomValidators.validateEmail])));
        this._notificationService.removeLoading();

        let me = this;
        this.navigateToCreateDemandResolver();

        this._localeStorageService.storageStateChange.subscribe(
            storageItem => {
                switch (storageItem ['keyChanged']) {
                    case ApplicationConstants.NAVIGATE_CREATE_DEMAND:
                        me.navigateToCreateDemandResolver();
                        break;
                }
            }
        );
    }

    ngOnDestroy():any {

    }

    navigateToCreateDemandResolver() {
        let me = this;
        let navigationProperty = this._localeStorageService.getItem(ApplicationConstants.NAVIGATE_CREATE_DEMAND);
        if (navigationProperty && navigationProperty['navigate']) {
            let interval = setInterval(()=> {
                if (me.viewInitialized) {
                    JqueryService.animateScroll({nativeElement: '#createDemandComponent'}, 'easeInQuad', 500);
                    window.clearInterval(interval);
                }
            }, 10)
            localStorage.removeItem(ApplicationConstants.NAVIGATE_CREATE_DEMAND);
        }
    }

    ngAfterViewInit():any {
        let me=this;
        this._notificationService.removeLoading();
        setTimeout(()=> {
            me.viewInitialized = true;
        }, 50);
    }

    ngAfterViewChecked():any {
        let me=this;
        setTimeout(()=> {
            me.viewInitialized = true;
        }, 50);
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
            .subscribe(
                success=> {
                    me._subscribeForm.removeControl('email');
                    this._subscribeForm.addControl('email', this._formBuilder.control('', Validators.compose([Validators.required, CustomValidators.validateEmail])));
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

    createDemand(demand:Demand) {
        var me = this;

        if (!this._demandDialog.IsValid()) {
            return;
        }

        this._demandService.createUserDemand(demand)
            .subscribe(
                respose=> {
                    me._demandDialog.restData();
                    me._router.navigate(['/success/create-demand'])
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