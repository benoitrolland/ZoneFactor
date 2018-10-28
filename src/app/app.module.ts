import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//http://www.learn-angular.fr/le-module-httpmodule/
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatInputModule , MatAutocompleteModule, MatListModule, MatSidenavModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,MatSlideToggleModule,MatSliderModule,MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ContextSelectorComponent } from './context-form/context-form.component';
import { ZonesService,ZoneSlidersService,InputSettingsService } from "./shared/index";
import { ZoneSlidersComponent,TickSliderComponent,ToggleSliderComponent,UnknownDynamicComponent } from './zone-sliders/zone-sliders.component';
import { ZoneSlidersDirective } from './zone-sliders.directive';
import { ImpressModule } from './impress/impress.module';
import { ImpressService } from "./shared/impress.service";
import { ContextFormComponent } from './context-form/context-form.component';
import { ContextSelectorsDirective } from './context-form/context-selectors.directive';

@NgModule({
  entryComponents:[ 
    TickSliderComponent,
    ToggleSliderComponent,
    UnknownDynamicComponent,
	ContextSelectorComponent
  ],
  declarations: [
    AppComponent,
    MapComponent,
    ZoneSlidersDirective,
    ZoneSlidersComponent,
    TickSliderComponent,
    ToggleSliderComponent,
    UnknownDynamicComponent,
	ContextSelectorComponent,
    ContextFormComponent,
    ContextSelectorsDirective
  ],
  imports: [
    BrowserModule
    ,ImpressModule
    ,FormsModule
    ,ReactiveFormsModule
    ,HttpModule
    ,HttpClientModule
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
  providers: [ZoneSlidersService,ZonesService,InputSettingsService,ImpressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
