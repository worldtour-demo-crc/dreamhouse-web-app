import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

let SERVER_URL = 'https://dreamhouzz-push-server.herokuapp.com/devices';
//let SERVER_URL = 'http://localhost:5000/devices';

@Injectable()
export class PushService {

    static get parameters() {
        return [[Http]];
    }

    constructor (http) {
        this.http = http;
    }

    register(userId, token) {
        let body = JSON.stringify({userId: userId, token: token});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(SERVER_URL, body, options)
            .catch(this.handleError);
    }

    handleError(error) {
        alert('Error registering device for push notification');
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}