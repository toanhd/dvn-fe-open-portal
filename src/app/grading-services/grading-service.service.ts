import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class GradingService {

    url = 'http://13.76.224.67:3000/';

    constructor(
        private http: Http
    ) {
    }
}
