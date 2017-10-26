import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//http://www.learn-angular.fr/le-module-httpmodule/
import { HttpModule, JsonpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule , MatAutocompleteModule, MatListModule, MatSidenavModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,MatSlideToggleModule,MatSliderModule,MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule
    ,FormsModule
	,ReactiveFormsModule
    ,HttpModule
    ,JsonpModule
    ,FlexLayoutModule
    ,BrowserAnimationsModule
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
