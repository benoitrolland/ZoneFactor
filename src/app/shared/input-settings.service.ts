import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";

@Injectable()
export class InputSettingsService {

//  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
//  private options = new RequestOptions({ headers: this.headers });
// private property to store all backend URLs
    private _backendURL: any;
	
  constructor(private _http:Http) {
        this._backendURL = {};
        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }

        // build all backend urls
        Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);

  }

  /**
     * Function to return request options
     *
     * @returns {RequestOptions}
     */
    private _options(headerList: Object = {}): RequestOptions {
        const headers = new Headers(Object.assign({'Content-Type': 'application/json', 'charset': 'UTF-8' }, headerList));
        return new RequestOptions({headers: headers});
    }
	
  register(user): Observable<any> {
    return this._http.post('/api/user', JSON.stringify(user), this._options());
  }
  getUsers(): Observable<any> {
    return this._http.get('/api/users').map(res => res.json());
  }

      /**
     * Function to return list of people
     *
     * @returns {Observable<R>}
     */
    fetch(): Observable<any[]> {
        return this._http.get(this._backendURL.allPeople, this._options())
            .map((res: Response) => {
                if (res.status === 200) {
                    return res.json();
                }
                else {
                    return [];
                }
            });
    }
	
}
