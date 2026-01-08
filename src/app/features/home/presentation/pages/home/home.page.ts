import { Component, OnInit } from '@angular/core';
import { TranslateProvider } from '@shared/providers/translate.provider';
import { HomeConfig } from './home.config';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule],
})
export class HomePage implements OnInit {
  public view: any = {};
  public readonly config = HomeConfig;

  constructor(private translateProvider: TranslateProvider) {}

  ngOnInit(): void {
    this.setupI18n();
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.view = this.translateProvider.getObject(this.config.i18n.page);
  }
}
