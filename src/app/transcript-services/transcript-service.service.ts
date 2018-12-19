import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class TranscriptService {

    url = 'http://137.116.146.224:3000/';

    constructor(private http: Http) {
    }

    getByID(tranID) {
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.get(this.url + 'api/Transcript/' + tranID, {headers: headers})
            .pipe(map((response: Response) => response.json())
                , catchError((error: Response) => Observable.throw(error.json())))
    }

    grading(grade) {
        const body = JSON.stringify(grade);
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.post(this.url + 'api/Grading/', body, {headers: headers})
            .pipe(map((response: Response) => {
                    return {
                        response: response.json(),
                        code: response.status
                    }
                }), catchError((error: Response) => Observable.throw(error.json()))
            )
    }

    updateTranscript(transcript) {
        const transcriptID = transcript.transcriptID;
        transcript.transcriptID = '';
        const body = JSON.stringify(transcript);
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.put(this.url + 'api/Transcript/' + transcriptID, body, {headers: headers})
            .pipe(map((response: Response) => {
                    return {
                        response: response.json(),
                        code: response.status
                    }
                }), catchError((error: Response) => Observable.throw(error.json()))
            )
    }

    deleteTranscript(transcriptID) {
        const headers = new Headers({'Content-Type': 'application/json', 'x-api-key': 'toanhd'});
        return this.http.delete(this.url + 'api/Transcript/' + transcriptID, {headers: headers})
            .pipe(map((response: Response) => {
                    return {
                        response: response.json(),
                        code: response.status
                    }
                }), catchError((error: Response) => Observable.throw(error.json()))
            )
    }

}

