import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//http://www.learn-angular.fr/le-module-httpmodule/
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule }      from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,MatSlideToggleModule,MatSliderModule,MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
    ,FormsModule
    ,HttpModule
    ,JsonpModule
    ,FlexLayoutModule
    ,BrowserAnimationsModule
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
