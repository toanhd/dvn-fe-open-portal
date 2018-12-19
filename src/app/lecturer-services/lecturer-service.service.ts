import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LecturerService {

    url = 'http://137.116.146.224:3000/';

    constructor(
        private http: Http
    ) {
    }

    create(lecturer) {
        const body = JSON.stringify(lecturer);
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.post(this.url + 'api/Lecturer', body, {headers: headers})
            .pipe(map((response: Response) => {
                    return {
                        response: response.json(),
                        code: response.status
                    }
                }), catchError((error: Response) => Observable.throw(error.json()))
            )
    }

    delete(lecID) {
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.delete(this.url + 'api/Lecturer/' + lecID, {headers: headers})
            .pipe(catchError((error: Response) => Observable.throw(error.json())))
    }

    getAll() {
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.get(this.url + 'api/Lecturer', {headers: headers})
            .pipe(map((response: Response) => response.json())
                , catchError((error: Response) => Observable.throw(error.json())))
    }


    getbyID(id) {
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.get(this.url + 'api/Lecturer/' + id, {headers: headers})
            .pipe(map((response: Response) => response.json())
                , catchError(
                    (error: Response) => Observable.throwError(error.json())
                )
            )
    }

    update(lecturer) {
        const stdID = lecturer.lecID;
        lecturer.lecID = '';
        const body = JSON.stringify(lecturer);
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.put(this.url + 'api/Lecturer/' + stdID, body, {headers: headers})
            .pipe(map((response: Response) => {
                    return {
                        response: response.json(),
                        code: response.status
                    }
                }), catchError((error: Response) => Observable.throw(error.json()))
            )
    }
}
