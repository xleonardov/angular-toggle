import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularSwitcheryComponent } from './angular-toggle.component';



@NgModule({
  declarations: [
    AngularSwitcheryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AngularSwitcheryComponent
  ]
})
export class AngularSwitcheryModule { }
