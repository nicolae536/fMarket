/**
 * Created by nick_ on 4/9/2016.
 */
import {Pipe, PipeTransform} from 'angular2/core';
import {Select2Item} from "./selectComponent";

@Pipe({
    name: 'filterItems',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(value:Select2Item[], args:any[]):any {
        if (!args[0] || args[0].length < 1) {
            return value;
        } else if (value) {
            args[0] = args[0].toLowerCase();
            return value.filter(item => {
                for (let key in item) {
                    if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                        (item[key].toLowerCase().indexOf(args[0]) !== -1)) {
                        return true;
                    }
                }
            });
        }
    }

}
