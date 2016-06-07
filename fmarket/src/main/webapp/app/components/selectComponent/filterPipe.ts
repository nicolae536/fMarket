/**
 * Created by nick_ on 4/9/2016.
 */
import {Pipe, PipeTransform} from '@angular/core';
import {Select2Item} from "./selectComponent";

@Pipe({
    name: 'filterItems',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(value:Select2Item[], args:any[]):any {
        if (!args || args.length < 1) {
            return value;
        } else if (value) {
            args = args.toLowerCase();
            return value.filter(item => {
                for (let key in item) {
                    if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                        (item[key].toLowerCase().indexOf(args) !== -1)) {
                        return true;
                    }
                }
            });
        }
    }

}
