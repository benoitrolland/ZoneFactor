import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//http://www.learn-angular.fr/le-module-httpmodule/
import { HttpModule, JsonpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
//import { app.impress} from "./impress/module";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatInputModule , MatAutocompleteModule, MatListModule, MatSidenavModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,MatSlideToggleModule,MatSliderModule,MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ZonesService } from "./shared/index";
import { ZoneSlidersComponent,TickSliderComponent,ToggleSliderComponent,UnknownDynamicComponent } from './zone-sliders/zone-sliders.component';
import { ZoneSlidersDirective } from './zone-sliders.directive';
import { ZoneSlidersService }   from './shared/zone-sliders.service';
import { BooleanComponent } from './zone-sliders/boolean/boolean.component';
//import { ImpressComponent, ImpressService } from './impress.component';
import { ImpressModule } from './impress/impress.module';
import { ImpressService } from "./shared/impress.service";


@NgModule({
  entryComponents:[ 
    TickSliderComponent,
    ToggleSliderComponent,
    UnknownDynamicComponent
  ],
  declarations: [
    AppComponent,
    MapComponent,
    ZoneSlidersDirective,
    ZoneSlidersComponent,
    TickSliderComponent,
    ToggleSliderComponent,
    UnknownDynamicComponent,
    BooleanComponent
  ],
  imports: [
    BrowserModule
    ,ImpressModule
    ,FormsModule
    ,ReactiveFormsModule
    ,HttpModule
    ,JsonpModule
    ,FlexLayoutModule
    ,BrowserAnimationsModule
	,MatGridListModule
	,MatInputModule 
	,MatAutocompleteModule
	,MatListModule
    ,MatSidenavModule
    ,MatButtonModule
    ,MatMenuModule
    ,MatCardModule
    ,MatToolbarModule
    ,MatIconModule
    ,MatSlideToggleModule
    ,MatSliderModule
    ,MatSelectModule
  ],
  providers: [ZoneSlidersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
