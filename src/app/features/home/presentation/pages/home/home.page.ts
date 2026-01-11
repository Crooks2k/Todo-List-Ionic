import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { BasePage } from '@shared/utils/ui/base-page';
import { HomeConfig } from './home.config';
import { IonicModule } from '@ionic/angular';
import { ActionCardComponent } from '@shared/utils/ui/components/action-card';
import { RemoteConfigInteractor } from '@app/config/core/interactors/remote-config.interactor';
import { REMOTE_CONFIG_PARAMS } from '@app/config/firebase/constants';
import { MaintenanceMode } from '@app/config/core/domain/entities';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [CommonModule, IonicModule, ActionCardComponent],
})
export class HomePage extends BasePage implements OnInit {
  public view: any = {};
  public readonly config = HomeConfig;
  public maintenanceMode: MaintenanceMode | null = null;
  public loading = true;

  constructor(
    private translateProvider: TranslateProvider,
    private remoteConfigInteractor: RemoteConfigInteractor
  ) {
    super();
  }

  ngOnInit(): void {
    this.setupI18n();
    this.checkMaintenanceMode();
  }

  public get isInMaintenance(): boolean {
    return this.maintenanceMode?.enabled || false;
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.view = this.translateProvider.getObject(this.config.i18n.page);
  }

  private checkMaintenanceMode(): void {
    const parameter = REMOTE_CONFIG_PARAMS.MAINTENANCE_MODE;

    this.remoteConfigInteractor
      .getParameter<MaintenanceMode>(parameter)
      .subscribe({
        next: (result) => {
          this.maintenanceMode = result.value;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
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
