import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Category } from '@features/tasks/core/domain/entities/category.entity';
import { CategorySelectorConfig } from './category-selector.config';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class CategorySelectorComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() selectedCategoryId?: string;
  @Output() categorySelected = new EventEmitter<string>();

  public readonly config = CategorySelectorConfig;
  public labels: any = {};
  showModal = false;
  searchTerm = '';

  constructor(private translateProvider: TranslateProvider) {}

  async ngOnInit(): Promise<void> {
    await this.setupI18n();
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.labels = this.translateProvider.getObject(this.config.i18n.component);
  }

  get selectedCategory(): Category | undefined {
    return this.categories.find((c) => c.id === this.selectedCategoryId);
  }

  get filteredCategories(): Category[] {
    if (!this.searchTerm.trim()) {
      return this.categories;
    }
    const term = this.searchTerm.toLowerCase();
    return this.categories.filter((category) =>
      category.name.toLowerCase().includes(term)
    );
  }

  openModal(): void {
    this.showModal = true;
    this.searchTerm = '';
  }

  closeModal(): void {
    this.showModal = false;
    this.searchTerm = '';
  }

  selectCategory(categoryId: string): void {
    this.categorySelected.emit(categoryId);
    this.closeModal();
  }
}
