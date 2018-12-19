import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {catchError, map, filter, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Rx'

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    url = 'http://localhost:3000/';

    constructor(
        private http: Http
    ) {
    }

    getAllRequest() {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get(this.url + 'request', {headers: headers})
            .pipe(map((response: Response) => {
                    return {
                        response: response.json(),
                        code: response.status
                    }
                }), catchError((error: Response) => Observable.throw(error.json()))
            )
    }

    rejectRequest(request) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify(request);
        return this.http.patch(this.url + 'request', body, {headers: headers})
            .pipe(map((response: Response) => {
                    return {
                        response: response.json(),
                        code: response.status
                    }
                }), catchError((error: Response) => Observable.throw(error.json()))
            )
    }

    sendMail(mail) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify(mail);
        return this.http.post(this.url + 'request/send-mail', body, {headers: headers})
            .pipe(map((response: Response) => {
                    return {
                        response: response.json(),
                        code: response.status
                    }
                }), catchError((error: Response) => Observable.throw(error.json()))
            )
    }

}
