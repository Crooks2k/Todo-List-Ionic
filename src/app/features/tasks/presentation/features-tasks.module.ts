import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeaturesTasksRoutingModule } from './features-tasks-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FeaturesTasksRoutingModule,
  ],
  declarations: [],
})
export class FeaturesTasksModule {}
