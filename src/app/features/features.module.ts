import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyReactiveFormComponent } from './my-reactive-form/my-reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MyReactiveFormComponent
  ],
  exports: [MyReactiveFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FeaturesModule { }
