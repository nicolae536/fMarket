import {Subject} from "rxjs/Subject";
/**
 * Created by nick_ on 5/5/2016.
 */

export class LocalStorageService {
    public storageStateChange:Subject<any> = new Subject();

    notifyObservers(key){
        this.storageStateChange.next({keyChanged:key, newValue:this.getItem(key)});
    }

    setItem(key:string, value:Object){
        localStorage.setItem(key, JSON.stringify(value));
        this.notifyObservers(key);
    }

    getItem(key){
        let item = localStorage.getItem(key);
        if(!item){
            return null;
        }
        return JSON.parse(item);
    }

    removeItem(key){
        localStorage.removeItem(key);
        this.notifyObservers(key);
    }
}