import { Component, OnInit } from '@angular/core';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { BasePage } from '@shared/utils/ui/base-page';
import { HomeConfig } from './home.config';
import { IonicModule } from '@ionic/angular';
import { ActionCardComponent } from '@shared/utils/ui/components/action-card';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, ActionCardComponent],
})
export class HomePage extends BasePage implements OnInit {
  public view: any = {};
  public readonly config = HomeConfig;

  constructor(private translateProvider: TranslateProvider) {
    super();
  }

  ngOnInit(): void {
    this.setupI18n();
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.view = this.translateProvider.getObject(this.config.i18n.page);
  }

  goToTasks(): void {
    this.navigate(this.config.routes.tasks);
  }

  goToCategories(): void {
    this.navigate(this.config.routes.categories);
  }

  goToReleases(): void {
    this.navigate(this.config.routes.releases);
  }
}
