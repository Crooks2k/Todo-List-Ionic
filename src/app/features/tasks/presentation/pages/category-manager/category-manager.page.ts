import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@features/tasks/core/domain/entities/category.entity';
import { CategoryInteractor } from '@features/tasks/core/interactors/category.interactor';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { BasePage } from '@shared/utils/ui/base-page';
import { CategoryManagerConfig } from './category-manager.config';
import { CategoryFormComponent } from '../../components/category-form';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.page.html',
  styleUrls: ['./category-manager.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, CategoryFormComponent],
})
export class CategoryManagerPage extends BasePage implements OnInit {
  categories$!: Observable<Category[]>;
  public view: any = {};
  public readonly config = CategoryManagerConfig;

  showModal = false;
  selectedCategory?: Category;

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

  onAddCategory(): void {
    this.selectedCategory = undefined;
    this.showModal = true;
  }

  onEditCategory(category: Category): void {
    this.selectedCategory = category;
    this.showModal = true;
  }

  onSaveCategory(categoryDto: CreateCategoryDto | UpdateCategoryDto): void {
    if ('id' in categoryDto) {
      this.categoryInteractor
        .updateCategory(categoryDto as UpdateCategoryDto)
        .subscribe(() => {
          this.closeModal();
          this.loadCategories();
        });
    } else {
      this.categoryInteractor
        .createCategory(categoryDto as CreateCategoryDto)
        .subscribe(() => {
          this.closeModal();
          this.loadCategories();
        });
    }
  }

  onDeleteCategory(categoryId: string): void {
    this.categoryInteractor.deleteCategory(categoryId).subscribe(() => {
      this.loadCategories();
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedCategory = undefined;
  }

  goBackToHome(): void {
    this.navigate(this.config.routes.home);
  }
}
