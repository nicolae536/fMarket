
import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';


/**
 * SyncronizationService
 */
@Injectable()
export class SyncronizationService {
    public taskSender:Subject<any> = new Subject();
    public subscriberInitialized:Subject<any> = new Subject();    
}