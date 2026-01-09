import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Category } from '@features/tasks/core/domain/entities/category.entity';
import { GetCategoriesUseCase } from '@features/tasks/core/use-cases/categories/get-categories.use-case';
import { DeleteCategoryUseCase } from '@features/tasks/core/use-cases/categories/delete-category.use-case';
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
    private getCategoriesUseCase: GetCategoriesUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
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
    this.categories$ = this.getCategoriesUseCase.execute();
  }

  onDeleteCategory(categoryId: string): void {
    this.deleteCategoryUseCase.execute(categoryId).subscribe();
  }

  onAddCategory(): void {
    console.log('Add category - TODO: Implement modal');
  }

  goBackToHome(): void {
    this.navigate(this.config.routes.home);
  }
}
