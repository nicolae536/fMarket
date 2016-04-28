/**
 * Created by nick_ on 4/12/2016.
 */
import {Component, OnInit} from 'angular2/core';

import {CategoriesMenuService} from "../../services/categoriesMenuService";
import {Response} from "angular2/http";
import {Select2Item} from "../../components/selectComponent/selectComponent";
import {DemandService} from "../../services/demandService";
import {DemandDialogComponent} from "../../components/demandComponent/demandDialogComponent/demandDialogComponent";
import {Demand} from "../../models/demand";

const folderPath = '/app/pages/homePage';

@Component({
    selector:'home-page',
    templateUrl:folderPath + '/homePage.html',
    directives:[DemandDialogComponent],
    providers:[DemandService, CategoriesMenuService]
})
export class HomePage implements OnInit{
    //components
    private _demandDialog:DemandDialogComponent;
    
    //services
    private _categoriesMenuService:CategoriesMenuService;

    private _demandService:DemandService;
    //data
    private _domains:Array<Select2Item>;
    private _cityes;

    constructor(_categoriesMenuService:CategoriesMenuService, _demandService:DemandService){
        this._categoriesMenuService = _categoriesMenuService;
        this._demandService = _demandService;
    }

    ngOnInit():any {
        this.getCityes();
        this.getDomains();
    }

    referenceDemandDialog(demandDialog:DemandDialogComponent){
        this._demandDialog = demandDialog;
    }

    showDemandDialog(){
        this._demandDialog.show('', new Demand());
    }
    
    createDemand(demand:Demand){
        var me= this;
        
        if(!this._demandDialog.isValidResponse()){
            return;
        }
        
        this._demandService.createDemand(demand).map((response)=>{
            if (response.text().length > 0) {
                return response.json();
            }
        }).subscribe(
            respose=>{
                me._demandDialog.closeDemandDialog();
            },
            error=>{
                console.log(error.message);
            }
        )
    }

    getCityes():void{
        var me=this;
        this._demandService.getCityList()
            .subscribe(
                response=>{
                    me._cityes = response.map((city)=> {
                        return {
                            displayName: city['name'],
                            boundItem: city
                        };
                    });
                },
                error=>{
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