import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    NavigationBarComponent
  ],
  exports: [
    NavigationBarComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class SharedModule { }
