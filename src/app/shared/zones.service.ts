import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from "rxjs";

// @see angular2-200\src\app\shared\people-service\people.service.ts
@Injectable()
export class ZonesService {

	zonesIncidences: Map<String, number> = new Map<String, number>();
	zonesColors: Map<String, String> = new Map<String, String>();
	zonesColorsReady: Map<String, Boolean> = new Map<String, Boolean>();
	
	zonesValues: Map<String, number[]> = new Map<String, number[]>();
	//contextValues: Map<String, number[]> = new Map<String, string[]>();
	//retient le numero de contexte sélectionné pour chaque zone;
	selectedContextNums: Map<String, number> = new Map<String, number>();
    //some:any = JSON.parse('[{"id":"EN","fill":"blue","classb":"FR someclass"},{"id":"FR","fill":"hsl(240, 100%, 35%)","classb":"FR someclass"},{"id":"ES","fill":"hsl(240, 100%, 60%)","classb":"FR someclass"},{"id":"IT","fill":"hsl(240, 100%, 90%)","classb":"FR someclass"}]');
	//see http://papaparse.com/
	//zonesRules:any = JSON.parse(`[
/*  
    this.http.get('https://jsonplaceholder.typicode.com/photos')
      .map(response => response.json())
      .subscribe(res => this.myPicMetaData = res);
*/
	zonesRules:any = [
		{
			"id":"ES",
			"factorsConsts":[
				{"id":"Pétrole" , unit:"barrels", "min":0 , "max":100000 ,"lastValue":70000},
				{"id":"Shampoing" , unit:"litters", "min":0 , "max":100000, "lastValue":30000},
				{"id":"Soleil" , unit:"lumens", "min":0 , "max":100000, "lastValue":55000},
				{"id":"CO2" , unit:"ton", "min":0 , "max":100000, "lastValue":5000},
				{"id":"Viande", unit:"kg", "min":0 , "max":100000 ,"lastValue":95000},
				{"id":"Rouge à lèvres", unit:"kg", "min":0 , "max":100000 ,"lastValue":7000}
			],
			"factorsForContext":[{
				"context":{"sexe":"male"},
				"intercept":0.1,
				"factorsCoef":{"Pétrole":0.2, "Shampoing":0.3, "Soleil":0.15, "CO2":-0.01},
				"lastImputedValues":{"Pétrole":0.8, "Shampoing":0.6, "Soleil":0.4, "CO2":0.3}
			},
			{
				"context":{"sexe":"female"},
				"intercept":0.3,
				"factorsCoef":{"Pétrole":0.2, "Viande":0.3, "Rouge à lèvres":0.15, "CO2":-0.01},
				"lastImputedValues":{"Pétrole":0.2, "Viande":0.3, "Rouge à lèvres":0.6, "CO2":0.7}
			}]
		},
		{"id":"GB",
		//e:\brl\proj\2017\epidemium\map\*.csv  unit, name
		//e:\brl\proj\2017\epidemium\benscham\*mean.csv mean
			"factorsConsts":[
				{"id":"X1034..7211", "min":0, "max":100, "lastValue":0, mean:0, category:"Environment", subCategory:"Pigs", name:"% of Total Livestock", unit:"%" },
				{"id":"X2961..5142", "min":0, "max":100, "lastValue":0, mean:0, category:"Food Balance", subCategory:"Aquatic Products, Other", name:"Food", unit:"1000 tonnes" },
				{"id":"X2515..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Rye and products", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2531..5520", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Potatoes and products", name:"Feed", unit:"tonnes" },
				{"id":"X2827..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar, Raw Equivalent", name:"Stock Variation", unit:"tonnes" },
				{"id":"X1755..5111", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"All Animals", name:"Stocks", unit:"Head" },
				{"id":"X2961..645", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Aquatic Products, Other", name:"Food supply quantity (kg/capita/yr)", unit:"kg" },
				{"id":"X6803..724410", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Gas-diesel oils used in fisheries", name:"Emissions (CO2eq) from CH4 (Energy)", unit:"Gigagrams" }, 
				{"id":"SP.RUR.TOTL.ZG", "min":0, "max":100, "lastValue":0, mean:0, category:"Environnement", subCategory:"Environnement", name:"Rural population growth", unit:"annual %" }, 
				{"id":"GC.NLD.TOTL.GD.ZS", "min":0, "max":100, "lastValue":0, mean:0, category:"Public Sector", subCategory:"Public_sector", name:"Net lending", unit:"% of GDP" }, 
				{"id":"X6803..719410", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Gas-diesel oils used in fisheries", name:"Emissions (CO2) (Energy)", unit:"Gigagrams" }, 
				{"id":"X221..5312", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Almonds, with shell", name:"Area harvested", unit:"ha" }, 
				{"id":"X2597..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sesameseed Cake", name:"Export Quantity", unit:"tonnes" }, 
				{"id":"X2549..5141", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Pulses, Other and products", name:"Food supply quantity (tonnes)", unit:"tonnes" }, 
				{"id":"X1375..5922", "min":0, "max":10000, "lastValue":0, mean:0, category:"Inputs", subCategory:"Phosphate fertilizers", name:"Export Value", unit:"1000 US$" }, 
				{"id":"X2556..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Groundnuts (Shelled Eq)", name:"Export Quantity", unit:"tonnes" }, 
				{"id":"X407..5419", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Leeks, other alliaceous vegetables", name:"Yield", unit:"hg/ha" }, 
				{"id":"X2659..5153", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Alcohol, Non-Food", name:"Other uses", unit:"tonnes" }, 
				{"id":"X426..5510", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Carrots and turnips", name:"Production", unit:"tonnes" }, 
				{"id":"X1717..5312", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Cereals,Total", name:"Area harvested", unit:"ha" }, 
				{"id":"X2659..5300", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Alcohol, Non-Food", name:"Domestic supply quantity", unit:"tonnes" },
				{"id":"X960..72290", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Cattle, dairy", name:"Implied emission factor for N2O (Manure on pasture)", unit:"kg N2O-N/kg N" },
				{"id":"X2515..674", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Rye and products", name:"Protein supply quantity (g/capita/day)", unit:"g/capita/day" },
				{"id":"SP.POP.7579.MA.5Y", "min":0, "max":100, "lastValue":0, mean:0, category:"Health", subCategory:"Health", name:"Population ages 75-79, male", unit:"% of male population" },
				{"id":"X2613..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Grapefruit and products", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2922..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Stimulants", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2537..5610", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar beet", name:"Import Quantity", unit:"tonnes" },
				{"id":"X2562..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Palm kernels", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2582..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Maize Germ Oil", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2671..5300", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Tobacco", name:"Domestic supply quantity", unit:"tonnes" },
				{"id":"X1801..5419", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Fruit excl Melons,Total", name:"Yield", unit:"hg/ha" },
				{"id":"X2520..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Cereals, Other", name:"Stock Variation", unit:"tonnes" },
				{"id":"X2815..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Roots & Tuber Dry Equiv", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2542..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar (Raw Equivalent)", name:"Stock Variation", unit:"tonnes" },
				{"id":"X2848..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Milk - Excluding Butter", name:"Stock Variation", unit:"tonnes" }
			],
			//from e:\brl\proj\2017\epidemium\benscham\*.csv
			"factorsForContext":[{
				"context":{"sexe":"female","age":11, region:"br", ethnie:"all"},
				"intercept":3.677697114, 
				"factorsCoef":{"X1034..7211":1.127590663, "X2961..5142":0.522560226, "X2515..664":-0.776697244, "X2531..5520":-3.23E-06},
				"lastImputedValues":{"X1034..7211":0, "X2961..5142":10, "X2515..664":20000, "X2531..5520":30000}
			},{
				"context":{"sexe":"male","age":11, region:"br", ethnie:"all"},
				"intercept":-36.6258836611159, 
				"factorsCoef":{"X2961..645":11.5217514273827, "X6803..724410":8337.1140410464, "SP.RUR.TOTL.ZG":-0.916593021217523, "GC.NLD.TOTL.GD.ZS":-0.0932946133036694, "X6803..719410":-9.79030966009668, "X221..5312":-0.000485087169767695, "X2597..5910":0.00230324857352038, "X2549..5141":3.24897853331008e-05, "X1375..5922":-1.68852939258363e-05, "X2556..5910":8.46048020290979e-05, "X407..5419":3.33979464654383e-05, "X2659..5153":0.171594159080541, "X426..5510":2.84202191828236e-06, "X1717..5312":1.37928501881495e-06, "X2659..5300":-0.171603943714509},
				"lastImputedValues":{"X2961..645":0, "X6803..724410":0, "SP.RUR.TOTL.ZG":0, "GC.NLD.TOTL.GD.ZS":0, "X6803..719410":0, "X221..5312":0, "X2597..5910":0, "X2549..5141":0, "X1375..5922":0, "X2556..5910":0, "X407..5419":0, "X2659..5153":0, "X426..5510":0, "X1717..5312":0, "X2659..5300":0}
			},{
				"context":{"sexe":"male","age":17, region:"br", ethnie:"all"},
				"intercept":131.740660037701,
				"factorsCoef":{"X960..72290":-4886.13968634094,"X2515..674":-89.0709110086175,"SP.POP.7579.MA.5Y":-2.36634069005173,"X2613..664":-0.336683842936539,"X2922..664":0.610158134719119,"X2537..5610":-0.00026469045006892,"X2562..5910":0.0176180471681411,"X2582..5910":0.000828625618244055,"X2671..5300":-0.000206944589760498,"X1801..5419":0.000133725982210252,"X2520..5071":0.000208098775798847,"X2815..5910":3.50080127683297e-06,"X2542..5071":1.81340064471598e-06,"X2848..5071":-9.07657722711329e-06},
				"lastImputedValues":{"X960..72290":0,"X2515..674":0,"SP.POP.7579.MA.5Y":0,"X2613..664":0,"X2922..664":0,"X2537..5610":0,"X2562..5910":0,"X2582..5910":0,"X2671..5300":0,"X1801..5419":0,"X2520..5071":0,"X2815..5910":0,"X2542..5071":0,"X2848..5071":0}
			}]
		},
		{"id":"FR",
		//e:\brl\proj\2017\epidemium\map\*.csv  unit, name
		//e:\brl\proj\2017\epidemium\benscham\*mean.csv mean
			"factorsConsts":[
				{"id":"X1034..7211", "min":0, "max":100, "lastValue":0, mean:0, category:"Environment", subCategory:"Pigs", name:"% of Total Livestock", unit:"%" },
				{"id":"X2961..5142", "min":0, "max":100, "lastValue":0, mean:0, category:"Food Balance", subCategory:"Aquatic Products, Other", name:"Food", unit:"1000 tonnes" },
				{"id":"X2515..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Rye and products", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2531..5520", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Potatoes and products", name:"Feed", unit:"tonnes" },
				{"id":"X2827..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar, Raw Equivalent", name:"Stock Variation", unit:"tonnes" },
				{"id":"X1755..5111", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"All Animals", name:"Stocks", unit:"Head" },
				{"id":"X2961..645", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Aquatic Products, Other", name:"Food supply quantity (kg/capita/yr)", unit:"kg" },
				{"id":"X6803..724410", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Gas-diesel oils used in fisheries", name:"Emissions (CO2eq) from CH4 (Energy)", unit:"Gigagrams" }, 
				{"id":"SP.RUR.TOTL.ZG", "min":0, "max":100, "lastValue":0, mean:0, category:"Environnement", subCategory:"Environnement", name:"Rural population growth", unit:"annual %" }, 
				{"id":"GC.NLD.TOTL.GD.ZS", "min":0, "max":100, "lastValue":0, mean:0, category:"Public Sector", subCategory:"Public_sector", name:"Net lending", unit:"% of GDP" }, 
				{"id":"X6803..719410", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Gas-diesel oils used in fisheries", name:"Emissions (CO2) (Energy)", unit:"Gigagrams" }, 
				{"id":"X221..5312", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Almonds, with shell", name:"Area harvested", unit:"ha" }, 
				{"id":"X2597..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sesameseed Cake", name:"Export Quantity", unit:"tonnes" }, 
				{"id":"X2549..5141", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Pulses, Other and products", name:"Food supply quantity (tonnes)", unit:"tonnes" }, 
				{"id":"X1375..5922", "min":0, "max":10000, "lastValue":0, mean:0, category:"Inputs", subCategory:"Phosphate fertilizers", name:"Export Value", unit:"1000 US$" }, 
				{"id":"X2556..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Groundnuts (Shelled Eq)", name:"Export Quantity", unit:"tonnes" }, 
				{"id":"X407..5419", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Leeks, other alliaceous vegetables", name:"Yield", unit:"hg/ha" }, 
				{"id":"X2659..5153", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Alcohol, Non-Food", name:"Other uses", unit:"tonnes" }, 
				{"id":"X426..5510", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Carrots and turnips", name:"Production", unit:"tonnes" }, 
				{"id":"X1717..5312", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Cereals,Total", name:"Area harvested", unit:"ha" }, 
				{"id":"X2659..5300", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Alcohol, Non-Food", name:"Domestic supply quantity", unit:"tonnes" },
				{"id":"X960..72290", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Cattle, dairy", name:"Implied emission factor for N2O (Manure on pasture)", unit:"kg N2O-N/kg N" },
				{"id":"X2515..674", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Rye and products", name:"Protein supply quantity (g/capita/day)", unit:"g/capita/day" },
				{"id":"SP.POP.7579.MA.5Y", "min":0, "max":100, "lastValue":0, mean:0, category:"Health", subCategory:"Health", name:"Population ages 75-79, male", unit:"% of male population" },
				{"id":"X2613..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Grapefruit and products", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2922..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Stimulants", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2537..5610", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar beet", name:"Import Quantity", unit:"tonnes" },
				{"id":"X2562..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Palm kernels", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2582..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Maize Germ Oil", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2671..5300", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Tobacco", name:"Domestic supply quantity", unit:"tonnes" },
				{"id":"X1801..5419", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Fruit excl Melons,Total", name:"Yield", unit:"hg/ha" },
				{"id":"X2520..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Cereals, Other", name:"Stock Variation", unit:"tonnes" },
				{"id":"X2815..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Roots & Tuber Dry Equiv", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2542..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar (Raw Equivalent)", name:"Stock Variation", unit:"tonnes" },
				{"id":"X2848..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Milk - Excluding Butter", name:"Stock Variation", unit:"tonnes" }
			],
			//from e:\brl\proj\2017\epidemium\benscham\*.csv
			"factorsForContext":[{
				"context":{"sexe":"female","age":11, region:"br", ethnie:"all"},
				"intercept":3.677697114, 
				"factorsCoef":{"X1034..7211":1.127590663, "X2961..5142":0.522560226, "X2515..664":-0.776697244, "X2531..5520":-3.23E-06, "X2827..5071":-1.80E-06, "X1755..5111":-3.43E-09},
				"lastImputedValues":{"X1034..7211":0, "X2961..5142":10, "X2515..664":0.625, "X2531..5520":30000, "X2827..5071":40000, "X1755..5111":100000}
			},{
				"context":{"sexe":"male","age":11, region:"br", ethnie:"all"},
				"intercept":-36.6258836611159, 
				"factorsCoef":{"X2961..645":11.5217514273827, "X6803..724410":8337.1140410464, "SP.RUR.TOTL.ZG":-0.916593021217523, "GC.NLD.TOTL.GD.ZS":-0.0932946133036694, "X6803..719410":-9.79030966009668, "X221..5312":-0.000485087169767695, "X2597..5910":0.00230324857352038, "X2549..5141":3.24897853331008e-05, "X1375..5922":-1.68852939258363e-05, "X2556..5910":8.46048020290979e-05, "X407..5419":3.33979464654383e-05, "X2659..5153":0.171594159080541, "X426..5510":2.84202191828236e-06, "X1717..5312":1.37928501881495e-06, "X2659..5300":-0.171603943714509},
				"lastImputedValues":{"X2961..645":0, "X6803..724410":0, "SP.RUR.TOTL.ZG":0, "GC.NLD.TOTL.GD.ZS":0, "X6803..719410":0, "X221..5312":0, "X2597..5910":0, "X2549..5141":0, "X1375..5922":0, "X2556..5910":0, "X407..5419":0, "X2659..5153":0, "X426..5510":0, "X1717..5312":0, "X2659..5300":0}
			},{
				"context":{"sexe":"male","age":17, region:"br", ethnie:"all"},
				"intercept":131.740660037701,
				"factorsCoef":{"X960..72290":-4886.13968634094,"X2515..674":-89.0709110086175,"SP.POP.7579.MA.5Y":-2.36634069005173,"X2613..664":-0.336683842936539,"X2922..664":0.610158134719119,"X2537..5610":-0.00026469045006892,"X2562..5910":0.0176180471681411,"X2582..5910":0.000828625618244055,"X2671..5300":-0.000206944589760498,"X1801..5419":0.000133725982210252,"X2520..5071":0.000208098775798847,"X2815..5910":3.50080127683297e-06,"X2542..5071":1.81340064471598e-06,"X2848..5071":-9.07657722711329e-06},
				"lastImputedValues":{"X960..72290":0,"X2515..674":0,"SP.POP.7579.MA.5Y":0,"X2613..664":0,"X2922..664":0,"X2537..5610":0,"X2562..5910":0,"X2582..5910":0,"X2671..5300":0,"X1801..5419":0,"X2520..5071":0,"X2815..5910":0,"X2542..5071":0,"X2848..5071":0}
			}]
		},		
		{"id":"JP",
		//e:\brl\proj\2017\epidemium\map\*.csv  unit, name
		//e:\brl\proj\2017\epidemium\benscham\*mean.csv mean
			"factorsConsts":[
				{"id":"X1034..7211", "min":0, "max":100, "lastValue":0, mean:0, category:"Environment", subCategory:"Pigs", name:"% of Total Livestock", unit:"%" },
				{"id":"X2961..5142", "min":0, "max":100, "lastValue":0, mean:0, category:"Food Balance", subCategory:"Aquatic Products, Other", name:"Food", unit:"1000 tonnes" },
				{"id":"X2515..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Rye and products", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2531..5520", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Potatoes and products", name:"Feed", unit:"tonnes" },
				{"id":"X2827..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar, Raw Equivalent", name:"Stock Variation", unit:"tonnes" },
				{"id":"X1755..5111", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"All Animals", name:"Stocks", unit:"Head" },
				{"id":"X2961..645", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Aquatic Products, Other", name:"Food supply quantity (kg/capita/yr)", unit:"kg" },
				{"id":"X6803..724410", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Gas-diesel oils used in fisheries", name:"Emissions (CO2eq) from CH4 (Energy)", unit:"Gigagrams" }, 
				{"id":"SP.RUR.TOTL.ZG", "min":0, "max":100, "lastValue":0, mean:0, category:"Environnement", subCategory:"Environnement", name:"Rural population growth", unit:"annual %" }, 
				{"id":"GC.NLD.TOTL.GD.ZS", "min":0, "max":100, "lastValue":0, mean:0, category:"Public Sector", subCategory:"Public_sector", name:"Net lending", unit:"% of GDP" }, 
				{"id":"X6803..719410", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Gas-diesel oils used in fisheries", name:"Emissions (CO2) (Energy)", unit:"Gigagrams" }, 
				{"id":"X221..5312", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Almonds, with shell", name:"Area harvested", unit:"ha" }, 
				{"id":"X2597..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sesameseed Cake", name:"Export Quantity", unit:"tonnes" }, 
				{"id":"X2549..5141", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Pulses, Other and products", name:"Food supply quantity (tonnes)", unit:"tonnes" }, 
				{"id":"X1375..5922", "min":0, "max":10000, "lastValue":0, mean:0, category:"Inputs", subCategory:"Phosphate fertilizers", name:"Export Value", unit:"1000 US$" }, 
				{"id":"X2556..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Groundnuts (Shelled Eq)", name:"Export Quantity", unit:"tonnes" }, 
				{"id":"X407..5419", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Leeks, other alliaceous vegetables", name:"Yield", unit:"hg/ha" }, 
				{"id":"X2659..5153", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Alcohol, Non-Food", name:"Other uses", unit:"tonnes" }, 
				{"id":"X426..5510", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Carrots and turnips", name:"Production", unit:"tonnes" }, 
				{"id":"X1717..5312", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Cereals,Total", name:"Area harvested", unit:"ha" }, 
				{"id":"X2659..5300", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Alcohol, Non-Food", name:"Domestic supply quantity", unit:"tonnes" },
				{"id":"X960..72290", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Cattle, dairy", name:"Implied emission factor for N2O (Manure on pasture)", unit:"kg N2O-N/kg N" },
				{"id":"X2515..674", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Rye and products", name:"Protein supply quantity (g/capita/day)", unit:"g/capita/day" },
				{"id":"SP.POP.7579.MA.5Y", "min":0, "max":100, "lastValue":0, mean:0, category:"Health", subCategory:"Health", name:"Population ages 75-79, male", unit:"% of male population" },
				{"id":"X2613..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Grapefruit and products", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2922..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Stimulants", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2537..5610", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar beet", name:"Import Quantity", unit:"tonnes" },
				{"id":"X2562..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Palm kernels", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2582..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Maize Germ Oil", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2671..5300", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Tobacco", name:"Domestic supply quantity", unit:"tonnes" },
				{"id":"X1801..5419", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Fruit excl Melons,Total", name:"Yield", unit:"hg/ha" },
				{"id":"X2520..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Cereals, Other", name:"Stock Variation", unit:"tonnes" },
				{"id":"X2815..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Roots & Tuber Dry Equiv", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2542..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar (Raw Equivalent)", name:"Stock Variation", unit:"tonnes" },
				{"id":"X2848..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Milk - Excluding Butter", name:"Stock Variation", unit:"tonnes" }
			],
			//from e:\brl\proj\2017\epidemium\benscham\*.csv
			"factorsForContext":[{
				"context":{"sexe":"female","age":11, region:"br", ethnie:"all"},
				"intercept":3.677697114, 
				"factorsCoef":{"X2515..664":-0.776697244, "X2531..5520":-3.23E-06, "X2827..5071":-1.80E-06, "X1755..5111":-3.43E-09},
				"lastImputedValues":{"X2515..664":20000, "X2531..5520":30000, "X2827..5071":40000, "X1755..5111":100000}
			},{
				"context":{"sexe":"male","age":11, region:"br", ethnie:"all"},
				"intercept":-36.6258836611159, 
				"factorsCoef":{"X2961..645":11.5217514273827, "X6803..724410":8337.1140410464, "SP.RUR.TOTL.ZG":-0.916593021217523, "GC.NLD.TOTL.GD.ZS":-0.0932946133036694, "X6803..719410":-9.79030966009668, "X221..5312":-0.000485087169767695, "X2597..5910":0.00230324857352038, "X2549..5141":3.24897853331008e-05, "X1375..5922":-1.68852939258363e-05, "X2556..5910":8.46048020290979e-05, "X407..5419":3.33979464654383e-05, "X2659..5153":0.171594159080541, "X426..5510":2.84202191828236e-06, "X1717..5312":1.37928501881495e-06, "X2659..5300":-0.171603943714509},
				"lastImputedValues":{"X2961..645":0, "X6803..724410":0, "SP.RUR.TOTL.ZG":0, "GC.NLD.TOTL.GD.ZS":0, "X6803..719410":0, "X221..5312":0, "X2597..5910":0, "X2549..5141":0, "X1375..5922":0, "X2556..5910":0, "X407..5419":0, "X2659..5153":0, "X426..5510":0, "X1717..5312":0, "X2659..5300":0}
			},{
				"context":{"sexe":"male","age":17, region:"br", ethnie:"all"},
				"intercept":131.740660037701,
				"factorsCoef":{"X960..72290":-4886.13968634094,"X2515..674":-89.0709110086175,"SP.POP.7579.MA.5Y":-2.36634069005173,"X2613..664":-0.336683842936539,"X2922..664":0.610158134719119,"X2537..5610":-0.00026469045006892,"X2562..5910":0.0176180471681411,"X2582..5910":0.000828625618244055,"X2671..5300":-0.000206944589760498,"X1801..5419":0.000133725982210252,"X2520..5071":0.000208098775798847,"X2815..5910":3.50080127683297e-06,"X2542..5071":1.81340064471598e-06,"X2848..5071":-9.07657722711329e-06},
				"lastImputedValues":{"X960..72290":0,"X2515..674":0,"SP.POP.7579.MA.5Y":0,"X2613..664":0,"X2922..664":0,"X2537..5610":0,"X2562..5910":0,"X2582..5910":0,"X2671..5300":0,"X1801..5419":0,"X2520..5071":0,"X2815..5910":0,"X2542..5071":0,"X2848..5071":0}
			}]
		},
		{"id":"US",
		//e:\brl\proj\2017\epidemium\map\*.csv  unit, name
		//e:\brl\proj\2017\epidemium\benscham\*mean.csv mean
			"factorsConsts":[
				{"id":"X1034..7211", "min":0, "max":100, "lastValue":0, mean:0, category:"Environment", subCategory:"Pigs", name:"% of Total Livestock", unit:"%" },
				{"id":"X2961..5142", "min":0, "max":100, "lastValue":0, mean:0, category:"Food Balance", subCategory:"Aquatic Products, Other", name:"Food", unit:"1000 tonnes" },
				{"id":"X2515..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Rye and products", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2531..5520", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Potatoes and products", name:"Feed", unit:"tonnes" },
				{"id":"X2827..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar, Raw Equivalent", name:"Stock Variation", unit:"tonnes" },
				{"id":"X1755..5111", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"All Animals", name:"Stocks", unit:"Head" },
				{"id":"X2961..645", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Aquatic Products, Other", name:"Food supply quantity (kg/capita/yr)", unit:"kg" },
				{"id":"X6803..724410", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Gas-diesel oils used in fisheries", name:"Emissions (CO2eq) from CH4 (Energy)", unit:"Gigagrams" }, 
				{"id":"SP.RUR.TOTL.ZG", "min":0, "max":100, "lastValue":0, mean:0, category:"Environnement", subCategory:"Environnement", name:"Rural population growth", unit:"annual %" }, 
				{"id":"GC.NLD.TOTL.GD.ZS", "min":0, "max":100, "lastValue":0, mean:0, category:"Public Sector", subCategory:"Public_sector", name:"Net lending", unit:"% of GDP" }, 
				{"id":"X6803..719410", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Gas-diesel oils used in fisheries", name:"Emissions (CO2) (Energy)", unit:"Gigagrams" }, 
				{"id":"X221..5312", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Almonds, with shell", name:"Area harvested", unit:"ha" }, 
				{"id":"X2597..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sesameseed Cake", name:"Export Quantity", unit:"tonnes" }, 
				{"id":"X2549..5141", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Pulses, Other and products", name:"Food supply quantity (tonnes)", unit:"tonnes" }, 
				{"id":"X1375..5922", "min":0, "max":10000, "lastValue":0, mean:0, category:"Inputs", subCategory:"Phosphate fertilizers", name:"Export Value", unit:"1000 US$" }, 
				{"id":"X2556..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Groundnuts (Shelled Eq)", name:"Export Quantity", unit:"tonnes" }, 
				{"id":"X407..5419", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Leeks, other alliaceous vegetables", name:"Yield", unit:"hg/ha" }, 
				{"id":"X2659..5153", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Alcohol, Non-Food", name:"Other uses", unit:"tonnes" }, 
				{"id":"X426..5510", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Carrots and turnips", name:"Production", unit:"tonnes" }, 
				{"id":"X1717..5312", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Cereals,Total", name:"Area harvested", unit:"ha" }, 
				{"id":"X2659..5300", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Alcohol, Non-Food", name:"Domestic supply quantity", unit:"tonnes" },
				{"id":"X960..72290", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Cattle, dairy", name:"Implied emission factor for N2O (Manure on pasture)", unit:"kg N2O-N/kg N" },
				{"id":"X2515..674", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Rye and products", name:"Protein supply quantity (g/capita/day)", unit:"g/capita/day" },
				{"id":"SP.POP.7579.MA.5Y", "min":0, "max":100, "lastValue":0, mean:0, category:"Health", subCategory:"Health", name:"Population ages 75-79, male", unit:"% of male population" },
				{"id":"X2613..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Grapefruit and products", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2922..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Stimulants", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2537..5610", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar beet", name:"Import Quantity", unit:"tonnes" },
				{"id":"X2562..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Palm kernels", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2582..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Maize Germ Oil", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2671..5300", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Tobacco", name:"Domestic supply quantity", unit:"tonnes" },
				{"id":"X1801..5419", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Fruit excl Melons,Total", name:"Yield", unit:"hg/ha" },
				{"id":"X2520..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Cereals, Other", name:"Stock Variation", unit:"tonnes" },
				{"id":"X2815..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Roots & Tuber Dry Equiv", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2542..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar (Raw Equivalent)", name:"Stock Variation", unit:"tonnes" },
				{"id":"X2848..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Milk - Excluding Butter", name:"Stock Variation", unit:"tonnes" }
			],
			//from e:\brl\proj\2017\epidemium\benscham\*.csv
			"factorsForContext":[{
				"context":{"sexe":"female","age":11, region:"br", ethnie:"all"},
				"intercept":3.677697114, 
				"factorsCoef":{"X1034..7211":1.127590663, "X2961..5142":0.522560226, "X2531..5520":-3.23E-06, "X2827..5071":-1.80E-06, "X1755..5111":-3.43E-09},
				"lastImputedValues":{"X1034..7211":0, "X2961..5142":10, "X2531..5520":30000, "X2827..5071":40000, "X1755..5111":100000}
			},{
				"context":{"sexe":"male","age":11, region:"br", ethnie:"all"},
				"intercept":-36.6258836611159, 
				"factorsCoef":{"X2961..645":11.5217514273827, "X6803..724410":8337.1140410464, "SP.RUR.TOTL.ZG":-0.916593021217523, "GC.NLD.TOTL.GD.ZS":-0.0932946133036694, "X6803..719410":-9.79030966009668, "X221..5312":-0.000485087169767695, "X2597..5910":0.00230324857352038, "X2549..5141":3.24897853331008e-05, "X1375..5922":-1.68852939258363e-05, "X2556..5910":8.46048020290979e-05, "X407..5419":3.33979464654383e-05, "X2659..5153":0.171594159080541, "X426..5510":2.84202191828236e-06, "X1717..5312":1.37928501881495e-06, "X2659..5300":-0.171603943714509},
				"lastImputedValues":{"X2961..645":0, "X6803..724410":0, "SP.RUR.TOTL.ZG":0, "GC.NLD.TOTL.GD.ZS":0, "X6803..719410":0, "X221..5312":0, "X2597..5910":0, "X2549..5141":0, "X1375..5922":0, "X2556..5910":0, "X407..5419":0, "X2659..5153":0, "X426..5510":0, "X1717..5312":0, "X2659..5300":0}
			},{
				"context":{"sexe":"male","age":17, region:"br", ethnie:"all"},
				"intercept":131.740660037701,
				"factorsCoef":{"X960..72290":-4886.13968634094,"X2515..674":-89.0709110086175,"SP.POP.7579.MA.5Y":-2.36634069005173,"X2613..664":-0.336683842936539,"X2922..664":0.610158134719119,"X2537..5610":-0.00026469045006892,"X2562..5910":0.0176180471681411,"X2582..5910":0.000828625618244055,"X2671..5300":-0.000206944589760498,"X1801..5419":0.000133725982210252,"X2520..5071":0.000208098775798847,"X2815..5910":3.50080127683297e-06,"X2542..5071":1.81340064471598e-06,"X2848..5071":-9.07657722711329e-06},
				"lastImputedValues":{"X960..72290":0,"X2515..674":0,"SP.POP.7579.MA.5Y":0,"X2613..664":0,"X2922..664":0,"X2537..5610":0,"X2562..5910":0,"X2582..5910":0,"X2671..5300":0,"X1801..5419":0,"X2520..5071":0,"X2815..5910":0,"X2542..5071":0,"X2848..5071":0}
			}]
		},
		{"id":"JP",
		//e:\brl\proj\2017\epidemium\map\*.csv  unit, name
		//e:\brl\proj\2017\epidemium\benscham\*mean.csv mean
			"factorsConsts":[
				{"id":"X1034..7211", "min":0, "max":100, "lastValue":0, mean:0, category:"Environment", subCategory:"Pigs", name:"% of Total Livestock", unit:"%" },
				{"id":"X2961..5142", "min":0, "max":100, "lastValue":0, mean:0, category:"Food Balance", subCategory:"Aquatic Products, Other", name:"Food", unit:"1000 tonnes" },
				{"id":"X2515..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Rye and products", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2531..5520", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Potatoes and products", name:"Feed", unit:"tonnes" },
				{"id":"X2827..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar, Raw Equivalent", name:"Stock Variation", unit:"tonnes" },
				{"id":"X1755..5111", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"All Animals", name:"Stocks", unit:"Head" },
				{"id":"X2961..645", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Aquatic Products, Other", name:"Food supply quantity (kg/capita/yr)", unit:"kg" },
				{"id":"X6803..724410", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Gas-diesel oils used in fisheries", name:"Emissions (CO2eq) from CH4 (Energy)", unit:"Gigagrams" }, 
				{"id":"SP.RUR.TOTL.ZG", "min":0, "max":100, "lastValue":0, mean:0, category:"Environnement", subCategory:"Environnement", name:"Rural population growth", unit:"annual %" }, 
				{"id":"GC.NLD.TOTL.GD.ZS", "min":0, "max":100, "lastValue":0, mean:0, category:"Public Sector", subCategory:"Public_sector", name:"Net lending", unit:"% of GDP" }, 
				{"id":"X6803..719410", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Gas-diesel oils used in fisheries", name:"Emissions (CO2) (Energy)", unit:"Gigagrams" }, 
				{"id":"X221..5312", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Almonds, with shell", name:"Area harvested", unit:"ha" }, 
				{"id":"X2597..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sesameseed Cake", name:"Export Quantity", unit:"tonnes" }, 
				{"id":"X2549..5141", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Pulses, Other and products", name:"Food supply quantity (tonnes)", unit:"tonnes" }, 
				{"id":"X1375..5922", "min":0, "max":10000, "lastValue":0, mean:0, category:"Inputs", subCategory:"Phosphate fertilizers", name:"Export Value", unit:"1000 US$" }, 
				{"id":"X2556..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Groundnuts (Shelled Eq)", name:"Export Quantity", unit:"tonnes" }, 
				{"id":"X407..5419", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Leeks, other alliaceous vegetables", name:"Yield", unit:"hg/ha" }, 
				{"id":"X2659..5153", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Alcohol, Non-Food", name:"Other uses", unit:"tonnes" }, 
				{"id":"X426..5510", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Carrots and turnips", name:"Production", unit:"tonnes" }, 
				{"id":"X1717..5312", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Cereals,Total", name:"Area harvested", unit:"ha" }, 
				{"id":"X2659..5300", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Alcohol, Non-Food", name:"Domestic supply quantity", unit:"tonnes" },
				{"id":"X960..72290", "min":0, "max":100000, "lastValue":0, mean:0, category:"Emissions", subCategory:"Cattle, dairy", name:"Implied emission factor for N2O (Manure on pasture)", unit:"kg N2O-N/kg N" },
				{"id":"X2515..674", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Rye and products", name:"Protein supply quantity (g/capita/day)", unit:"g/capita/day" },
				{"id":"SP.POP.7579.MA.5Y", "min":0, "max":100, "lastValue":0, mean:0, category:"Health", subCategory:"Health", name:"Population ages 75-79, male", unit:"% of male population" },
				{"id":"X2613..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Grapefruit and products", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2922..664", "min":0, "max":100000, "lastValue":0, mean:0, category:"Food Supply", subCategory:"Stimulants", name:"Food supply (kcal/capita/day)", unit:"kcal/capita/day" },
				{"id":"X2537..5610", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar beet", name:"Import Quantity", unit:"tonnes" },
				{"id":"X2562..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Palm kernels", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2582..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Maize Germ Oil", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2671..5300", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Tobacco", name:"Domestic supply quantity", unit:"tonnes" },
				{"id":"X1801..5419", "min":0, "max":100000, "lastValue":0, mean:0, category:"Production", subCategory:"Fruit excl Melons,Total", name:"Yield", unit:"hg/ha" },
				{"id":"X2520..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Cereals, Other", name:"Stock Variation", unit:"tonnes" },
				{"id":"X2815..5910", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Roots & Tuber Dry Equiv", name:"Export Quantity", unit:"tonnes" },
				{"id":"X2542..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Sugar (Raw Equivalent)", name:"Stock Variation", unit:"tonnes" },
				{"id":"X2848..5071", "min":0, "max":100000, "lastValue":0, mean:0, category:"Commodity", subCategory:"Milk - Excluding Butter", name:"Stock Variation", unit:"tonnes" }
			],
			//from e:\brl\proj\2017\epidemium\benscham\*.csv
			"factorsForContext":[{
				"context":{"sexe":"female","age":11, region:"br", ethnie:"all"},
				"intercept":3.677697114, 
				"factorsCoef":{"X1034..7211":1.127590663, "X2961..5142":0.522560226, "X2515..664":-0.776697244, "X2531..5520":-3.23E-06, "X2827..5071":-1.80E-06, "X1755..5111":-3.43E-09},
				"lastImputedValues":{"X1034..7211":0, "X2961..5142":10, "X2515..664":20000, "X2531..5520":30000, "X2827..5071":40000, "X1755..5111":100000}
			},{
				"context":{"sexe":"male","age":11, region:"br", ethnie:"all"},
				"intercept":-36.6258836611159, 
				"factorsCoef":{"X2961..645":11.5217514273827, "X6803..724410":8337.1140410464, "SP.RUR.TOTL.ZG":-0.916593021217523, "GC.NLD.TOTL.GD.ZS":-0.0932946133036694, "X6803..719410":-9.79030966009668, "X221..5312":-0.000485087169767695, "X2597..5910":0.00230324857352038, "X2549..5141":3.24897853331008e-05, "X1375..5922":-1.68852939258363e-05, "X2556..5910":8.46048020290979e-05, "X407..5419":3.33979464654383e-05, "X2659..5153":0.171594159080541, "X426..5510":2.84202191828236e-06, "X1717..5312":1.37928501881495e-06, "X2659..5300":-0.171603943714509},
				"lastImputedValues":{"X2961..645":0, "X6803..724410":0, "SP.RUR.TOTL.ZG":0, "GC.NLD.TOTL.GD.ZS":0, "X6803..719410":0, "X221..5312":0, "X2597..5910":0, "X2549..5141":0, "X1375..5922":0, "X2556..5910":0, "X407..5419":0, "X2659..5153":0, "X426..5510":0, "X1717..5312":0, "X2659..5300":0}
			},{
				"context":{"sexe":"male","age":17, region:"br", ethnie:"all"},
				"intercept":131.740660037701,
				"factorsCoef":{"X960..72290":-4886.13968634094,"X2515..674":-89.0709110086175,"SP.POP.7579.MA.5Y":-2.36634069005173,"X2613..664":-0.336683842936539,"X2922..664":0.610158134719119,"X2537..5610":-0.00026469045006892,"X2562..5910":0.0176180471681411,"X2582..5910":0.000828625618244055,"X2671..5300":-0.000206944589760498,"X1801..5419":0.000133725982210252,"X2520..5071":0.000208098775798847,"X2815..5910":3.50080127683297e-06,"X2542..5071":1.81340064471598e-06,"X2848..5071":-9.07657722711329e-06},
				"lastImputedValues":{"X960..72290":0,"X2515..674":0,"SP.POP.7579.MA.5Y":0,"X2613..664":0,"X2922..664":0,"X2537..5610":0,"X2562..5910":0,"X2582..5910":0,"X2671..5300":0,"X1801..5419":0,"X2520..5071":0,"X2815..5910":0,"X2542..5071":0,"X2848..5071":0}
			}]
		}
	];
	//]`);

    // private property to store all backend URLs
    private _backendURL: any;
	/* 
	//return Observable.of(["START",
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
		//zones values and selectedContextNums initialisation.
		console.log("zse == zones values initialisation");
		this.getAllLeafZones().subscribe((zones: any[]) => {
				let i = zones.length - 1;
				for (; i >= 0; i--) { 
					this.selectedContextNums.set(zones[i],0);
					let zoneRule = this.zonesRules.find(x => x.id === zones[i]);
					if(zoneRule!=undefined){
						for (let j=0; j < zoneRule.factorsForContext.length; j++) {
							//console.log("LeafZone " + zones[i] + ".");						
							if(zoneRule != undefined){
								let factorForContext = zoneRule.factorsForContext[j];
								let factorsCoef = factorForContext.factorsCoef;
								let lastImputedValues = Object.values(factorForContext.lastImputedValues);
								this.setZoneValues(zones[i], j, lastImputedValues);
								if(zones[i] == "FR") console.log("initialisation: FR:" + j + " = ", lastImputedValues);
							}
						}
					}
				}
			}
		);
    }
	/** */
	getContextIndex(zoneId:String,values:string[]){
		let res = -1;
		let zoneRules = this.zonesRules.find(x => x.id === zoneId);
		if(zoneRules != undefined) {
		    //let contextKeys = Object.keys(zoneRules.factorsForContext[0].context);
			let nbContext = zoneRules.factorsForContext.length;
			let i = 0;
			for(i=0;i<nbContext;i++){
			    //contextKeys.forEach(k => zoneRules.factorsForContext[i].context);
				//console.log("values="+(<Array<any>>values)+" Object.values(zoneRules.factorsForContext["+i+"].context).toString()", Object.values(zoneRules.factorsForContext[i].context).toString() );
				//console.log("JSON.stringify(zoneRules.factorsForContext[i].context) =" + JSON.stringify(zoneRules.factorsForContext[i].context) );
				//console.log("JSON.stringify(Object.values(zoneRules.factorsForContext[i].context)) =" + JSON.stringify(Object.values(zoneRules.factorsForContext[i].context)) );
				if(Object.values(zoneRules.factorsForContext[i].context).toString() == values.toString()) res = i;
				//Object.values(contexts[index].context) JSON.parse(JSON.stringify(json));
			}
		}
		if(res == -1) console.error("Couldn't get ContextIndex for zoneId="+zoneId+", values="+ values + " out of ", zoneRules);
		return res;
	}
	
	setSelectedContext(zone,num){
		this.selectedContextNums.set(zone,num);
	}
	
	
	setCurrentContextGivenValue( zoneId, contextElementIndex, val ){
		let contextIndex = this.selectedContextNums.get(zoneId);
		//TODO 
		//let contextName = getContextName(zoneId,contextElementIndex);
		console.log("setCurrentContextGivenValue zoneId="+zoneId+" contextIndex="+contextIndex+" contextElementIndex="+contextElementIndex+" val="+val);
		let values = this.getContextKindsValues(zoneId,contextIndex);
		values[contextElementIndex] = val; //update
		contextIndex = this.getContextIndex(zoneId,values);
		if(contextIndex === undefined) console.error("zse  === undefined No context for "+zoneId+" matching ",values);
		this.selectedContextNums.set(zoneId,contextIndex);
	}
	/*
	updateSelectedContext( zoneId ){
		//let values = this.getContextKindsValues(zoneId,contextIndex);
		let contextIndex = this.getContextIndex(zoneId,values);
		if(contextIndex === undefined) console.error("zse  === undefined No context for "+zoneId+" matching ",values);
		this.selectedContextNums.set(zoneId,contextIndex);
	}
	*/

	getContext(zoneId:String,contextIndex){
		let res = undefined;
		let factorsForContext = this.getFactorsForContext(zoneId,contextIndex);
		if(factorsForContext != undefined) res = factorsForContext.context;
		return res;	
	}
	
	getSelectedContextNums(zoneId:String){
		return this.selectedContextNums.get(zoneId);
	}
/*	
	getContextNames(zoneId:String){
		//var nbFactors = Object.keys().length;
		let contexts = this.getContexts(zoneId)
		if(contexts != undefined)		return Object.keys(contexts);
		return undefined;
	}
*/	
    getContextKindsValues(zoneId:String,index:number){
		//var nbFactors = Object.keys().length;
		let contexts = this.getContexts(zoneId)
		if(contexts[index].context != undefined) return Object.values(contexts[index].context);
		else console.error("no context definition found for " + zoneId + " at index="+index, contexts);
		return undefined;
	}
	
	getContexts(zoneId:String){
		console.log("zse getContextElements(zoneId="+zoneId+")");
		let zoneRules = this.zonesRules.find(x => x.id === zoneId);
		if(zoneRules != undefined) {
			console.log("zse zoneRules for zoneId=" + zoneId + " ",zoneRules);
			console.log("zse contect for zoneRules =", zoneRules.factorsForContext);//.context);
			return zoneRules.factorsForContext;//.context;
			//return zoneRules.context;			
		}else  console.error("no context definition found for " + zoneId);
		return undefined;
	}
	
	getFactorConsts(zoneId:String,factorId:String){
		let zoneRule = this.zonesRules.find(x => x.id === zoneId);
		if(zoneRule == undefined || zoneRule.factorsConsts == undefined) return undefined;
		return zoneRule.factorsConsts.find(x => x.id === factorId);		
	}
	
	
	/*
	getFactorsNames(zoneId:String){
		//var nbFactors = Object.keys().length;
		let factorsCoef = this.getFactors(zoneId)
		if(factorsCoef != undefined)		return Object.keys(factorsCoef);
		return undefined;
	}
	*/
	
	getFactorsValues(zoneId:String){
		////var nbFactors = Object.keys().length;
		//let ctxtNum = this.selectedContextNums.get(zoneId);
		//let factorsCoef = this.getFactors(zoneId,ctxtNum);
		let factorsCoef = this.getFactors(zoneId);
		if(factorsCoef != undefined)		return Object.values(factorsCoef);
		return undefined;
	}
	
	getFactors(zoneId:String){
		let res = undefined;
		let ctxtNum = this.selectedContextNums.get(zoneId);
		let factorsForContext = this.getFactorsForContext(zoneId,ctxtNum);
		if(factorsForContext != undefined) res = factorsForContext.factorsCoef;
		return res;	
	}
	
	getContextName(zoneId:String,index:number){
	    let ret:string = undefined;
		let zoneRules = this.zonesRules.find(x => x.id === zoneId);
		if(zoneRules != undefined) {
			ret = Object.keys(zoneRules.factorsForContext[0].context)[index];			
		}
		return ret;
	}
	
	//getContextValues(zoneId:String,contextNameOrIndex:string|number):String[]{
	getContextValues(zoneId:String,contextName:string):Set<string>{
		//let values:String[] = undefined;
		let values:Set<string> = new Set<string>();
		let zoneRules = this.zonesRules.find(x => x.id === zoneId);
/*		
		let contextName:string = undefined;
		if(typeof contextNameOrIndex === "string") {
			contextName = contextNameOrIndex;
		}else {
			let labels = Object.keys(zoneRules);
			console.log("labels:",labels);
			contextName = labels[contextNameOrIndex];
			console.log("labels["+contextNameOrIndex+"]:",contextName);
		}
*/		
		if(zoneRules != undefined) {
				//console.log("zse factors for zoneId="+zoneId+" and contextIndex " + contextIndex + " from ",zoneRules);
				//console.log("zse zoneRules[zoneId="+zoneId+"].factorsForContext[" + contextIndex + "]  ",zoneRules.factorsForContext[contextIndex]);
				//let len = Object.keys(zoneRules.factorsForContext[0]).length;
				let len = zoneRules.factorsForContext.length;
				//values = new Array(len);
				let i = 0;
				for(i = 0; i<zoneRules.factorsForContext.length;i++){
					let context = zoneRules.factorsForContext[i].context;
					console.log("zse context:",context);
					console.log("context["+contextName+"]:",context[contextName]);
					//values[i] = context[contextName];
					values.add(context[contextName]);
				}
				console.log("zse zoneRules[zoneId="+zoneId+"].factorsForContext.["+contextName+"].context values:", values);				
			//if(zoneRules === undefined) console.log("factors=",zoneRules);
			
		}
		return values;
	}
	
	getFactorsForContexts(zoneId:String){
		let res = undefined;
		let zoneRules = this.zonesRules.find(x => x.id === zoneId);
		if(zoneRules != undefined) {				res = zoneRules.factorsForContext;
		}
		return res;
	}
	
	//see getContext
	
	getFactorsForContext(zoneId:String,contextIndex){
		console.log("zse getFactors(zoneId="+zoneId+"contextIndex="+contextIndex+")");
		let res = undefined;
		let zoneRules = this.zonesRules.find(x => x.id === zoneId);
		if(zoneRules != undefined) {
				//console.log("zse factors for zoneId="+zoneId+" and contextIndex " + contextIndex + " from ",zoneRules);
				//console.log("zse zoneRules[zoneId="+zoneId+"].factorsForContext[" + contextIndex + "]  ",zoneRules.factorsForContext[contextIndex]);
				res = zoneRules.factorsForContext[contextIndex];
				console.log("zse zoneRules[zoneId="+zoneId+"].factorsForContext[" + contextIndex + "]  ", res);				
			//if(zoneRules === undefined) console.log("factors=",zoneRules);
			
		}
		return res;
	}
	
	getContextForSelectedZone(zoneId:String){
		let contextIndex = this.selectedContextNums.get(zoneId);
		return this.getContext(zoneId,contextIndex);
	}
	
	getFactorsForSelectedContext(zoneId:String){
		let contextIndex = this.selectedContextNums.get(zoneId);
		if(contextIndex == -1)console.log("selectedContextNums.get("+zoneId+")",this.selectedContextNums)
		return this.getFactorsForContext(zoneId,contextIndex);
	}
	
	getZoneColor(zoneId:String):String {
	    let zonInit = zoneId;
		let ctxtNum = this.selectedContextNums.get(zoneId);
		zoneId = zoneId+"_"+ctxtNum;
		if(zoneId == "FR"){
			console.log("zse getZoneColor(FR) zonesColorsReady:" + this.zonesColorsReady.get(zoneId) + " color= " + this.zonesColors.get(zoneId));
		}
		if(this.zonesColorsReady.get(zoneId) == true)
			return this.zonesColors.get(zoneId);
	
		let polyRes:number = 0.0;

		let values:number[] = this.zonesValues.get(zoneId);
		let htmlColor:String = this.colorFromValues(zonInit,ctxtNum,values);
		//let htmlColor:String = "hsl(240, 100%, "+Math.round(polyRes * 1000)+"%)";
		this.zonesColors.set(zoneId,htmlColor);
		let incidence:number =this.multipleLinearRegressionBasedIncidence(zonInit,ctxtNum,values);
		this.zonesIncidences.set(zoneId,incidence);
		this.zonesColorsReady.set(zoneId,true);
		console.log("zse htmlColor:",this.zonesColors.get(zoneId));
		return htmlColor; //this.zonesColors.get(zone);
		
	}
	//Warning linked to ZoneColor
	getZoneIncidence(zoneId:String):number {
		let ctxtNum = this.selectedContextNums.get(zoneId);
		return this.zonesIncidences.get(zoneId+"_"+ctxtNum);
	}
	
	getZoneValues(zone:String):number[] {
		let ctxtNum = this.selectedContextNums.get(zone);
		return this.zonesValues.get(zone+"_"+ctxtNum);
	}
	
	setZoneValues(zone:String, ctxtNum, imputedValues:number[]){
	    let zoninit = zone;
		zone = zone + "_" + ctxtNum;
		console.log("Setting zones imputedValues: zone=" + zone + " ctxtNum=" + ctxtNum + " imputedValues=", imputedValues);
		if(this.isColorable(zoninit)){
			this.zonesValues.set(zone, imputedValues);		
			console.log("zse setZoneValues("+zone+")=",imputedValues);
			//colorFromValues
			this.zonesColors.set(zone, this.colorFromValues(zoninit,ctxtNum,imputedValues));
			this.zonesIncidences.set(zone,this.multipleLinearRegressionBasedIncidence(zoninit,ctxtNum,imputedValues));
			if(zoninit=="FR") {
				console.log("zse New Color for " + zone + ": " + this.zonesColors.get(zone));
				console.log("zse Setting zonesColorsReady " + zone + " to false");
			}
			this.zonesColorsReady.set(zone,false);
			if(zoninit=="FR") console.log("zse zonesColorsReady " + zone + " is ", this.zonesColorsReady.get(zone));
		}
	}
	
	setZoneValue(zone:String, valueIndex, val){
		console.log("Setting zones value: zone=" + zone + " valueIndex=" + valueIndex + " val=", val);
		let ctxtNum = this.selectedContextNums.get(zone);
		let zoninit = zone;
		zone = zone+"_"+ctxtNum;
		//retrieve stored list then update it.
		let values:number[] = this.zonesValues.get(zone);
		console.log("values for: zone=" + zone+" are=", values);
		values[valueIndex]=val;
		console.log("zse setZoneValue: updating "+ val +" at ctxtNum " + ctxtNum,values[valueIndex]);
		this.setZoneValues(zoninit, ctxtNum, values);
	}
	//let ctxtNum = this.selectedContextNums.get(zone);
	colorFromValues(zone:String,ctxtNum:number,imputedValues:number[]):String{
		let incidence =  0;
	    if(imputedValues != undefined)
			incidence = this.multipleLinearRegressionBasedIncidence(zone,ctxtNum,imputedValues);
		//let htmlColor:String = heatMapColorforValue(/100000)
		
		let htmlColor:String = "hsl(240, 100%, " + Math.round(incidence * 10) + "%)";
		if(zone=="FR") console.log("new htmlColor: " + htmlColor);
		return htmlColor;
	}
	
	/*
		https://stackoverflow.com/questions/12875486/what-is-the-algorithm-to-create-colors-for-a-heatmap
		5 colors based heatmap, modified by adding color intensity linearly with value:
		0    : blue   (hsl(240, 100%, 0%))
		0.25 : cyan   (hsl(180, 100%, 25%))
		0.5  : green  (hsl(120, 100%, 50%))
		0.75 : yellow (hsl(60, 100%, 75%))
		1    : red    (hsl(0, 100%, 100%))
	*/
	//value shoud vary from 0 to 1:
	heatMapColorforValue(value){
	  var h = (1.0 - value) * 240
	  return "hsl(" + h + ", 100%, "+Math.round(value * 10)+"%)";
	}
	//https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3049417/	
	multipleLinearRegressionBasedIncidence(zone:String,ctxtNum:number,imputedValues:number[]){
		if(imputedValues == undefined){
			console.log("zse Warning INCIDENCE not calculated because imputedValues == undefined",imputedValues);
			return 0;
		}
		//let ctxtNum = this.selectedContextNums.get(zone);
		let factorsForContext = this.getFactorsForContext(zone,ctxtNum);
		let interceptValue = factorsForContext.intercept;
		let factorsCoefValues = Object.values(factorsForContext.factorsCoef);//take first !?	
		if(factorsCoefValues === undefined) console.error("zse CAN'T CALCULATE INCIDENCE because factorsCoefValues === undefined",factorsCoefValues);
		if(imputedValues.length != factorsCoefValues.length){
			console.log("zse CAN'T CALCULATE INCIDENCE because");
			console.log("zse imputedValues.length "+imputedValues.length+"!="+factorsCoefValues.length+" factorsCoefValues.length");			
			console.log("zse imputedValues=",imputedValues);
			console.log("zse factorsCoefValues=",factorsCoefValues);			
			return 0;
		}
		let incidence:number = interceptValue;
		//if(values != undefined) {
		console.log("zse imputedValues:",imputedValues);
		console.log("zse factorsCoefValues:",factorsCoefValues);
		let len = factorsCoefValues.length;
		for (let i = 0; i < len; i++) { 			
			console.log("zse adding " + factorsCoefValues[i] + " * " + imputedValues[i]);
			incidence += factorsCoefValues[i] * imputedValues[i];
			console.log("zse incidence"+i+":",incidence);
		}		
		console.log("zse incidence: " + incidence);
		return incidence;
		
	}
	
	polynom(zone:String,values:number[]){		
		var factorsCoef = this.getFactorsValues(zone);
		let polyRes:number = 0.0;
		if(values != undefined) {
			console.log("zse values:",values);
			console.log("zse factorsCoef:",factorsCoef);
			let i = values.length - 1;
			for (; i > 0; i--) { 
			    console.log("zse "+values[i]+" * Math.pow(" +factorsCoef[i] +"," + (i+1) + ")" ,polyRes);
				let polyResI = values[i] * Math.pow(factorsCoef[i],i+1);
				console.log("zse polyResI"+i+":",polyResI);
				console.log("zse polyRes["+i+"]:" + polyRes + "  + " + polyResI + " =");
				polyRes += polyResI;
				console.log(polyRes);
			}
		}
		console.log("zse polyRes:",polyRes);
		return polyRes;
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
                    return Observable.of(["START","Europe","CH","DK","GB","IS","IT","NL","PL","SK","FR","ES","EE","Middle-East","IL","Asia","IN","JP","SG","Oceania","AU","Central-America","CR","North-America","CA","US"]);					
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
				//if (zones[i] == zone) {  console.log("zse comparing2 " + zones[i] + " to " + zone); ret = true; }
				if (zones[i] == zone)  ret = true; 
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
                    if (id == "START") 
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
					 ){ return "START";}
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
