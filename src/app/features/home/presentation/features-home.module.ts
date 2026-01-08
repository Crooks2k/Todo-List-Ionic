import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { FeaturesHomeRoutingModule } from './features-home-routing.module';
import { HomePage } from './pages/home/home.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FeaturesHomeRoutingModule],
  declarations: [HomePage],
})
export class FeaturesHomeModule {}
