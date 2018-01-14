import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from "rxjs";


// @see angular2-200\src\app\shared\people-service\people.service.ts
@Injectable()
export class ZonesService {

	zonesColors: Map<String, String> = new Map<String, String>();
	
	zonesValues: Map<String, number[]> = new Map<String, number[]>();
    //some:any = JSON.parse('[{"id":"EN","fill":"blue","classb":"FR someclass"},{"id":"FR","fill":"hsl(240, 100%, 35%)","classb":"FR someclass"},{"id":"ES","fill":"hsl(240, 100%, 60%)","classb":"FR someclass"},{"id":"IT","fill":"hsl(240, 100%, 90%)","classb":"FR someclass"}]');
  
	zonesRules:any = JSON.parse(`[
		{"id":"GB",
			"context":{"sexe":"male"},
			"factors":{"Pétrole":0.2, "Shampoing":0.3, "Soleil":0.15, "CO2":-0.01}},
		{"id":"GB",
			"context":{"sexe":"female"},
			"factors":{"Pétrole":0.2, "Viande":0.3, "Rouge à lèvres":0.15, "CO2":-0.01}},
		{"id":"FR",
			"context":{"sexe":"male","meteo":"Beau temps"},
			"factors":{"Pétrole":0.2, "Shampoing":0.3, "Soleil":0.15, "CO2":-0.01}},
		{"id":"FR",
			"context":{"sexe":"male","meteo":"Nuageux"},
			"factors":{"Shampoing":0.3, "Temperature":0.15, "Vent":0.2, "CO2":-0.01}},
		{"id":"FR",
			"context":{"sexe":"female","Saison":"été"},
			"factors":{"Pétrole":0.2, "Shampoing":0.3, "Soleil":0.15, "CO2":-0.01}},
		{"id":"FR",
			"context":{"sexe":"female","Saison":"Automne"},
			"factors":{"Pétrole":0.3, "Shampoing":0.2, "Soleil":0.15, "CO2":-0.01}},
		{"id":"FR",
			"context":{"sexe":"female","Saison":"Hiver"},
			"factors":{"Pétrole":0.15, "Shampoing":0.3, "Soleil":0.2, "CO2":-0.01}},
		{"id":"FR",
			"context":{"sexe":"female","Saison":"printemps"},
			"factors":{"Pétrole":0.2, "Shampoing":-0.01, "Soleil":0.15, "CO2":0.3}},
		{"id":"ES",
			"context":{"sexe":"female","Saison":"Eté"},
			"factors":{"Corrida":0.2, "Shampoing":-0.01, "Vent":0.15, "CO2":0.3}},
		{"id":"IT",
			"context":{"sexe":"male","Saison":"Automne"},
			"factors":{"Opera":0.2, "Danse":-0.01, "Température":0.15, "CO2":0.3}}
	]`);

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
		//zones values initialisation.
		console.log("== zones values initialisation");
		this.getAllLeafZones().subscribe((zones: any[]) => {
				var i = zones.length - 1;
				for (; i >= 0; i--) { 
				
					//console.log("LeafZone " + zones[i] + ".");
					var factors = this.getFactors(zones[i]);
					
				    //console.log("factors= ",factors);
					if(factors != undefined){
						var nbFactors = Object.keys(factors).length;
						console.log("factors.lenght= ", nbFactors);
						var values = Array(nbFactors);
						var  j = 0;
						for (; j < nbFactors ; j++) { 
							values[j] = 0.5;
						}
						//console.log("init setZoneValues for " + zones[i] + ": ",values);
						this.setZoneValues(zones[i], values);
					}
				}
			}
		);
    }
	
	getFactorsValues(zoneId:String){
		//var nbFactors = Object.keys().length;
		var factors = this.getFactors(zoneId)
		if(factors != undefined)		return Object.values(factors);
		return undefined;
	}
	
	getFactors(zoneId:String){
		console.log("getFactors(zoneId="+zoneId+")");
		var zoneRules = this.zonesRules.find(x => x.id === zoneId);
		if(zoneRules != undefined) {
			if(zoneRules != undefined) {
				console.log("zoneRules for zoneId="+zoneId+" ",zoneRules);
			}
			return zoneRules.factors;
			//if(zoneRules === undefined) console.log("factors=",zoneRules);
			
		}
		return undefined;
	}
	
	getZoneColor(zoneId:String):String {
		var polyRes:number = 0.0;
		/*
		var zoneRules = this.zonesRules.find(x => x.id === zoneId);
		if(zoneRules != undefined) {
			if(zoneRules[0] === undefined) console.log("zoneRules[zoneId="+zoneId+"][0]",zoneRules);
			zoneRules = zoneRules.factors;
			//if(zoneRules === undefined) console.log("factors=",zoneRules);
			
		}*/
		console.log("getZoneColor="+zoneId+" ");
		var factors = this.getFactorsValues(zoneId);
		if(factors != undefined) {
			console.log("factors=",factors);
			console.log("zonesValues=",this.zonesValues);
			//zoneRules = zoneRules[0].factors;
			var values = this.zonesValues.get(zoneId);
			if(values != undefined) {
				console.log("values:",values);
				var i = values.length - 1;
				for (; i > 0; i--) { 
				    console.log(""+values[i]+" *  Math.pow(" +factors[i] +"," + (i+1) + ")" ,polyRes);
					let polyResI = values[i] * Math.pow(factors[i],i+1);
					console.log("polyResI"+i+":",polyResI);
					console.log("polyRes["+i+"]:" + polyRes + "  + " + polyResI + " =");
					polyRes += polyResI;
					console.log(polyRes);
				}
			}
		}
		console.log("polyRes:",polyRes);
		let htmlColor:String = "hsl(240, 100%, "+Math.round(polyRes * 1000)+"%)";
		console.log("htmlColor:",htmlColor);
		 
		return htmlColor; //this.zonesColors.get(zone);
		
	}
	
	setZoneValues(zone:String, values:number[]){

		this.zonesValues.set(zone, values);		
		console.log("setZoneValues("+zone+")=",values);
		this.zonesColors.set(zone, this.colorFromValues(values));
	}
	
	setZoneValue(zone:String, index, val){
		var values = this.zonesValues.get(zone);
		values[index]=val;
		this.setZoneValues(zone, values);
	}
	
	colorFromValues(values:number[]){
		
		return "#f2f2f2"; //"hsl(240, 100%, 60%)";
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
	isColorable(zone:String): boolean {
		let ret = false;
		this.getAllLeafZones().subscribe((zones: any[]) => {
			var i = zones.length;
			for (; i >= 0; i--) { 
				
				if (zones[i] == zone) {  console.log("comparing " + zones[i] + " to " + zone); ret = true; }
			}
		});
		return ret;
	}
	getAllLeafZones(): Observable<any[]> {
	/*
        return this._http.get(this._backendURL.allChildZones, this._options())
            .map((res: Response) => {
                if (res.status === 200) {
                    return res.json();
                }
                else {
				*/
                    return Observable.of(["CH","DK","EE","GB","IS","IT","NL","PL","SK","FR","ES","IN","IL","JP","SG","AU","CR","CA","US"]);
/*					
                }
            }); */
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
	getParentZone(id: string): String {
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
					 ){ return "World";}
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
					){ return "Europe" ;}
//					 else if ( id == "EE"
//					){ return Observable.of("post-soviet-area") ;}
					 else if ( id == "IL"
					){ return "Middle-East" ;}
					 else if ( 
							id == "IN"
						 || id == "JP"
						 || id == "SG" 
					){ return "Asia" ;}
					 else if ( id == "AU"
					){ return "Oceania" ;}
					 else if ( id == "CR"
					){ return "Central-America" ;}
					 else if ( id == "CA"
						 || id == "US" 
					){ return "North-America" ;}				
					else {
						return id;
					}
	/*return Observable.of(id);
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
