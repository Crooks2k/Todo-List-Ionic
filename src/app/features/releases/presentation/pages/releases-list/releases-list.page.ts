import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BasePage } from '@shared/utils/ui/base-page';
import { ReleasesListConfig } from './releases-list.config';
import { ReleaseNote } from '@app/config/core/domain/entities';
import { REMOTE_CONFIG_PARAMS } from '@app/config/firebase/constants';
import { RemoteConfigInteractor } from '@app/config/core/interactors/remote-config.interactor';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';

@Component({
  selector: 'app-releases-list',
  templateUrl: './releases-list.page.html',
  styleUrls: ['./releases-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ReleasesListPage extends BasePage implements OnInit {
  public readonly config = ReleasesListConfig;
  public view: any = {};
  public releaseNotes: ReleaseNote[] = [];
  public loading = true;

  constructor(
    private remoteConfigInteractor: RemoteConfigInteractor,
    private translateProvider: TranslateProvider
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.setupI18n();
    this.loadReleaseNotes();
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.view = this.translateProvider.getObject(this.config.i18n.page);
  }

  private loadReleaseNotes(): void {
    this.loading = true;

    const parameter = REMOTE_CONFIG_PARAMS.RELEASE_NOTES;

    this.remoteConfigInteractor
      .getParameter<ReleaseNote[]>(parameter)
      .subscribe({
        next: (result) => {
          this.releaseNotes = result.value || [];
          this.loading = false;
        },
        error: () => {
          this.releaseNotes = [];
          this.loading = false;
        },
      });
  }

  goBackToHome(): void {
    this.navigate(this.config.routes.home);
  }
}
