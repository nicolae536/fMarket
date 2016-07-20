import {Component, Input, Output, EventEmitter} from '@angular/core';
import * as template from './ratingComponent.html'; 

@Component({
    selector:'rating-component',
    template : template 
})
export class RatingComponent {
    @Input('max-rating') ratingArray:Array<number>;
    @Input('company-review') companyReview:number;
    @Output('set-rating') $setRating:EventEmitter<number> = new EventEmitter<number>();  

    private hoveredRating:number = -1;
    private selectedRating:number = -1;
    private ACTIVE_CLASS = "glyphicon glyphicon-star";
    private DISABLED_CLASS = "glyphicon glyphicon-star-empty";
    
    constructor() {
        this.ratingArray = new Array<number>();        
    }

    computeRatingClass(id:number) {
        
        if(this.selectedRating !== -1){
            let valueToCompare = this.hoveredRating > this.selectedRating ? this.hoveredRating : this.selectedRating; 
            return valueToCompare >= id ? this.ACTIVE_CLASS : this.DISABLED_CLASS; 
        }

        if(this.hoveredRating >= id){
            return this.ACTIVE_CLASS;
        }

        return this.DISABLED_CLASS;
    }
    
    setNewStarsReview(item:number){
        this.selectedRating = item;
        this.$setRating.emit(item);
    }
}