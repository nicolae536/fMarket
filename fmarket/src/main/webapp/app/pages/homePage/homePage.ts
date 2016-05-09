/**
 * Created by nick_ on 4/12/2016.
 */
import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {Response} from "@angular/http";
import {CategoriesMenuService} from "../../services/categoriesMenuService";
import {Select2Item} from "../../components/selectComponent/selectComponent";
import {DemandService} from "../../services/demandService";
import {DemandDialogComponent} from "../../components/demandComponent/demandDialogComponent/demandDialogComponent";
import {Demand} from "../../models/demand";
import {JqueryService} from "../../services/jqueryService";

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

    constructor(_categoriesMenuService:CategoriesMenuService, _demandService:DemandService) {
        this._categoriesMenuService = _categoriesMenuService;
        this._demandService = _demandService;
    }

    ngOnInit():any {
        this.getCityes();
        this.getDomains();
    }

    referenceDemandDialog(demandDialog:DemandDialogComponent) {
        this._demandDialog = demandDialog;
    }

    goToCreateDemand() {
       JqueryService.animateScroll(this.createDemamdViewRef, 'easeInQuad', 500);
    }

    goToHowWeWork() {
        JqueryService.animateScroll(this.howWeWorkRef, 'easeInQuad', 500);
    }

    scrollToElement(element:ElementRef, duration:number) {
        this.scrollProperty = this.scrollProperty  == 'scrollY' ? 'pageYOffset' : 'scrollY' ;
        _.defer(()=> {
            console.log(window[this.scrollProperty]);
            let scrollDown = element.nativeElement.offsetTop > window[this.scrollProperty];

            let positionToScroll = element.nativeElement.offsetTop - window[this.scrollProperty];
            let speedPerDuration = positionToScroll / duration;


            let intervalRef = setInterval(()=> {
                let previousScroll = window[this.scrollProperty];
                window.scroll(0, window[this.scrollProperty] += speedPerDuration);

                console.log((Math.abs(element.nativeElement.offsetTop - window[this.scrollProperty]) <= Math.abs(speedPerDuration) + Math.sqrt(speedPerDuration))
                    || (Math.abs(previousScroll - window[this.scrollProperty]) < 1)
                    || (window.scrollY < 0));
                if (
                    (Math.abs(element.nativeElement.offsetTop - window[this.scrollProperty]) <= Math.abs(speedPerDuration) + Math.sqrt(speedPerDuration))
                    || (Math.abs(previousScroll - window[this.scrollProperty]) < 1)
                    || (window.scrollY < 0)) {
                    console.log("clear")
                    clearInterval(intervalRef);
                }
            }, Math.round(duration / positionToScroll))
        });
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