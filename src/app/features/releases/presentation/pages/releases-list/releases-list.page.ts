import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BasePage } from '@shared/utils/ui/base-page';
import { ReleasesListConfig } from './releases-list.config';

@Component({
  selector: 'app-releases-list',
  templateUrl: './releases-list.page.html',
  styleUrls: ['./releases-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ReleasesListPage extends BasePage {
  public readonly config = ReleasesListConfig;

  constructor() {
    super();
  }

  goBackToHome(): void {
    this.navigate(this.config.routes.home);
  }
}
