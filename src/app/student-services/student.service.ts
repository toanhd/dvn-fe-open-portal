import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {catchError, map, filter, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Rx'

import 'rxjs/add/observable/throw';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    url = 'http://137.116.146.224:3000/';

    constructor(
        private http: Http
    ) {
    }

    create(student) {
        const body = JSON.stringify(student);
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.post(this.url + 'api/Student', body, {headers: headers})
            .pipe(map((response: Response) => {
                    return {
                        response: response.json(),
                        code: response.status
                    }
                }), catchError((error: Response) => Observable.throw(error.json()))
            )
    }

    delete(stdID) {
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.delete(this.url + 'api/Student/' + stdID, {headers: headers})
            .pipe(catchError((error: Response) => Observable.throw(error.json())))
    }

    getAll() {
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.get(this.url + 'api/Student', {headers: headers})
            .pipe(map((response: Response) => response.json())
                , catchError((error: Response) => Observable.throw(error.json())))
    }


    getbyID(id) {
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.get(this.url + 'api/Student/' + id, {headers: headers})
            .pipe(map((response: Response) => response.json())
                , catchError(
                    (error: Response) => Observable.throwError(error.json())
                )
            )
    }

    update(student) {
        const stdID = student.stdID;
        student.stdID = '';
        const body = JSON.stringify(student);
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.put(this.url + 'api/Student/' + stdID, body, {headers: headers})
            .pipe(map((response: Response) => {
                    return {
                        response: response.json(),
                        code: response.status
                    }
                }), catchError((error: Response) => Observable.throw(error.json()))
            )
    }
}
