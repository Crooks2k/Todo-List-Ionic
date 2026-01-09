import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export abstract class BasePage {
  protected router = inject(Router);
  protected location = inject(Location);

  protected navigate(url: string): void {
    this.router.navigate([url]);
  }

  protected navigateWithParams(url: string, params: any): void {
    this.router.navigate([url], { queryParams: params });
  }

  protected goBack(): void {
    this.location.back();
  }

  protected replaceUrl(url: string): void {
    this.router.navigate([url], { replaceUrl: true });
  }
}
