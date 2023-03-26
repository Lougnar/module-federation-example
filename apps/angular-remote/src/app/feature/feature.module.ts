import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { FeatureComponent } from './feature.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FeatureComponent,
      },
    ]),
  ],
  providers: [],
  declarations: [FeatureComponent],
})
export class FeatureModule {}
