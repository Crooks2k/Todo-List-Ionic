import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/tasks/core/domain/entities/category.entity';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { BasePage } from '@shared/utils/ui/base-page';
import { CategoryManagerConfig } from './category-manager.config';
import { CategoryFormComponent } from '@features/tasks/presentation/components/category-form';
import { CategoryManagementService } from '@features/tasks/presentation/services';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.page.html',
  styleUrls: ['./category-manager.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, CategoryFormComponent],
  providers: [CategoryManagementService],
})
export class CategoryManagerPage extends BasePage implements OnInit {
  public categories$!: Observable<Category[]>;
  public view: any = {};
  public readonly config = CategoryManagerConfig;
  public showModal = false;
  public selectedCategory?: Category;

  constructor(
    private categoryManagementService: CategoryManagementService,
    private translateProvider: TranslateProvider
  ) {
    super();
  }

  public ngOnInit(): void {
    this.setupI18n();
    this.loadCategories();
  }

  public get modalTitle(): string {
    return this.selectedCategory
      ? this.view.modalTitleEdit
      : this.view.modalTitleCreate;
  }

  public onAddCategory(): void {
    this.selectedCategory = undefined;
    this.showModal = true;
  }

  public onEditCategory(category: Category): void {
    this.selectedCategory = category;
    this.showModal = true;
  }

  public onSaveCategory(
    categoryDto: CreateCategoryDto | UpdateCategoryDto
  ): void {
    if (this.categoryManagementService.isUpdateDto(categoryDto)) {
      this.categoryManagementService
        .updateCategory(categoryDto)
        .subscribe(() => {
          this.closeModal();
        });
    } else {
      this.categoryManagementService
        .createCategory(categoryDto)
        .subscribe(() => {
          this.closeModal();
        });
    }
  }

  public onDeleteCategory(categoryId: string): void {
    this.categoryManagementService.deleteCategory(categoryId).subscribe();
  }

  public closeModal(): void {
    this.showModal = false;
    this.selectedCategory = undefined;
  }

  public goBackToHome(): void {
    this.navigate(this.config.routes.home);
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.view = this.translateProvider.getObject(this.config.i18n.page);
  }

  private loadCategories(): void {
    this.categories$ = this.categoryManagementService.getCategories();
  }
}
