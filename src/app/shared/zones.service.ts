import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from "rxjs";


// @see angular2-200\src\app\shared\people-service\people.service.ts
@Injectable()
export class ZonesService {

    // private property to store all backend URLs
    private _backendURL: any;
	/*
	//return Observable.of(["World",
	"Europe","CH","DK","GB","IS","IT","NL","PL","SK","FR","ES","EE",
	"Middle-East","IL",
	"Asia","IN","JP","SG",
	"Oceania","AU",
	"Central-America","CR",
	"North-America","CA","US"]);					
	geoZones = [
    {
      continent: 'Grass',
      country: [
        { value: 'bulbasaur-0', viewValue: 'Bulbasaur' },
        { value: 'oddish-1', viewValue: 'Oddish' },
        { value: 'bellsprout-2', viewValue: 'Bellsprout' }
      ]
    },
    {
	*/
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
	/*
        return this._http.get(this._backendURL.allZones, this._options())
            .map((res: Response) => {
                if (res.status === 200) {
                    return res.json();
                }
                else {
	*/
				//,"africa","south-america"
                    return Observable.of(["World","Europe","CH","DK","GB","IS","IT","NL","PL","SK","FR","ES","EE","Middle-East","IL","Asia","IN","JP","SG","Oceania","AU","Central-America","CR","North-America","CA","US"]);					
    /*
				}
            });
	*/
    }
	getAllLeafZones(): Observable<any[]> {
        return this._http.get(this._backendURL.allChildZones, this._options())
            .map((res: Response) => {
                if (res.status === 200) {
                    return res.json();
                }
                else {
                    return ["CH","DK","EE","GB","IS","IT","NL","PL","SK","FR","ES","IN","IL","JP","SG","AU","CR","CA","US"];					
                }
            });
    }
	/**
     * Function to return list of Zones
     *
     * @returns {Observable<R>}
     */
    getChildZones(id: string): any[] {
	//, level:int  level forced as One.
	/*
        return this._http.get(this._backendURL.childZones.replace(':id', id), this._options())
            .map((res: Response) => {
                if (res.status === 200) {
                    return res.json();
                }				
                else {
	*/
                    if (id == "World") 
					{ 
						return ["Europe","Middle-East","Asia","Oceania","Central-America","North-America"];
					}
					else if(id == "Europe")
					{
						return["CH","DK","GB","IS","IT","NL","PL","SK","FR","ES","EE"];
					}
					else if(id == "Middle-East")
					{
						return["IL"];
					}
					else if(id == "Asia")
					{
						return["IN","JP","SG"];
					}
					else if(id == "Oceania")
					{
						return["AU"];
					}
					else if(id == "Central-America")
					{
						return["CR"];
					}
					else if(id == "North-America")
					{
						return["CA","US"];
					}				
					else {
						return [id];
					}
	/*				 
                }
            });*/
    }
	getParentZone(id: string): Observable<any> {
	/*
		return this._http.get(this._backendURL.childZones.nameOf(':id', id), this._options())
            .map((res: Response) => {
                if (res.status === 200) {
                    return res.json();
                }
                else {
	*/
				    if (id == "Europe" 
					 || id == "Post-Soviet-Area"
					 || id == "Middle-East"
					 || id == "Asia"
					 || id == "Oceania"
					 || id == "Central-America"
					 || id == "North-America"
					 ){ return Observable.of("World");}
					 else if (
						   id == "CH"
						|| id == "DK"
						|| id == "GB"
						|| id == "IS"
						|| id == "IT"
						|| id == "NL"
						|| id == "PL"
						|| id == "SK"
						|| id == "FR"
						|| id == "ES" 
						|| id == "EE"
					){ return Observable.of("Europe") ;}
//					 else if ( id == "EE"
//					){ return Observable.of("post-soviet-area") ;}
					 else if ( id == "IL"
					){ return Observable.of("Middle-East") ;}
					 else if ( 
							id == "IN"
						 || id == "JP"
						 || id == "SG" 
					){ return Observable.of("Asia") ;}
					 else if ( id == "AU"
					){ return Observable.of("Oceania") ;}
					 else if ( id == "CR"
					){ return Observable.of("Central-America") ;}
					 else if ( id == "CA"
						 || id == "US" 
					){ return Observable.of("North-America") ;}				
					else {
						return Observable.of(id);
					}
	/*
                }
            });
	*/
    }
	
	getZoneName(id: String): String {
	//, level:int  level forced as One.
	/*
        return this._http.get(this._backendURL.childZones.nameOf(':id', id), this._options())
            .map((res: Response) => {
                if (res.status === 200) {
                    return res.json();
                }
                else {
	*/
				    if (id == "AU"){ return "Australia";}
					else if (id == "CA"){ return "Canada";}
					else if (id == "CH"){ return "Switzerland";}
					else if (id == "CR"){ return "Costa Rica";}
					else if (id == "DK"){ return "Denmark";}
					else if (id == "EE"){ return "Estonia";}
					else if (id == "GB"){ return "United Kingdom";}
					else if (id == "IN"){ return "India";}
					else if (id == "IS"){ return "Iceland";}
					else if (id == "IL"){ return "Israel";}
					else if (id == "IT"){ return "Italy";}
					else if (id == "JP"){ return "Japan";}
					else if (id == "NL"){ return "Netherlands";}
					else if (id == "PL"){ return "Poland";}
					else if (id == "SK"){ return "Slovakia";}
					else if (id == "US"){ return "United States";}
					else if (id == "FR"){ return "France";}
					else if (id == "ES"){ return "Spain";}
					else if (id == "SG"){ return "Singapore";}	
					else {
						return id;
					}
	/*
                }
            });
	*/
    }

}
