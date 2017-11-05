import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from "rxjs";


// @see angular2-200\src\app\shared\people-service\people.service.ts
@Injectable()
export class ZonesService {

    // private property to store all backend URLs
    private _backendURL: any;

      /**
     * Service constructor
     */
    constructor(private _http: Http) {
        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}:${environment.backend.host}`;
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
        const headers = new Headers(Object.assign({'Content-Type': 'application/json'}, headerList));
        return new RequestOptions({headers: headers});
    }

	
    /**
     * Function to return list of Zones
     *
     * @returns {Observable<R>}
     */
    getAllZones(): Observable<any[]> {
        return this._http.get(this._backendURL.allZones, this._options())
            .map((res: Response) => {
                if (res.status === 200) {
                    return res.json();
                }
                else {
                    return [];
                }
            });
    }
	
	/**
     * Function to return list of Zones
     *
     * @returns {Observable<R>}
     */
    getChildZones(id: string): Observable<any[]> {
	//, level:int  level forced as One.
        return this._http.get(this._backendURL.childZones.replace(':id', id), this._options())
            .map((res: Response) => {
                if (res.status === 200) {
                    return res.json();
                }
                else {
                    return [];
                }
            });
    }
	
	getZoneName(id: string): Observable<any[]> {
	//, level:int  level forced as One.
        return this._http.get(this._backendURL.childZones.nameOf(':id', id), this._options())
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
