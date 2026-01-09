import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Category } from '@features/tasks/core/domain/entities/category.entity';
import { CategoryInteractor } from '@features/tasks/core/interactors/category.interactor';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { BasePage } from '@shared/utils/ui/base-page';
import { CategoryManagerConfig } from './category-manager.config';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.page.html',
  styleUrls: ['./category-manager.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CategoryManagerPage extends BasePage implements OnInit {
  categories$!: Observable<Category[]>;
  public view: any = {};
  public readonly config = CategoryManagerConfig;

  constructor(
    private categoryInteractor: CategoryInteractor,
    private translateProvider: TranslateProvider
  ) {
    super();
  }

  ngOnInit(): void {
    this.setupI18n();
    this.loadCategories();
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.view = this.translateProvider.getObject(this.config.i18n.page);
  }

  private loadCategories(): void {
    this.categories$ = this.categoryInteractor.getCategories();
  }

  onDeleteCategory(categoryId: string): void {
    this.categoryInteractor.deleteCategory(categoryId).subscribe();
  }

  onAddCategory(): void {
    console.log('Add category - TODO: Implement modal');
  }

  goBackToHome(): void {
    this.navigate(this.config.routes.home);
  }
}
