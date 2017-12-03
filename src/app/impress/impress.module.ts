import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpressComponent } from './impress.component'; //imports: exports: entryComponents: ImpressComponent,
import { AccessoComponent } from './steps/accesso/accesso.component';
import { CodedingComponent } from './steps/codeding/codeding.component';
import { HobbiesComponent } from './steps/hobbies/hobbies.component';
import { ListComponent } from './steps/list/list.component';
import { ParamountComponent, GreetingsComponent } from './steps/paramount/paramount.component';
import { PetsComponent } from './steps/pets/pets.component';
import { PrComponent } from './steps/pr/pr.component';
import { ReyComponent } from './steps/rey/rey.component';
import { WebComponent } from './steps/web/web.component';

//exports: make Components accesible for other modules using this module
@NgModule({
  imports: [
    CommonModule
  ],
  exports:[ImpressComponent,AccessoComponent],
  entryComponents:[],
  declarations: [ImpressComponent,AccessoComponent, CodedingComponent, HobbiesComponent, ListComponent, ParamountComponent, GreetingsComponent, PetsComponent, PrComponent, ReyComponent, WebComponent]
})
export class ImpressModule { }
