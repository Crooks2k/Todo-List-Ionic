import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Category } from '@features/tasks/core/domain/entities/category.entity';
import { CategoryFilterConfig } from './category-filter.config';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class CategoryFilterComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() selectedCategoryIds: string[] = [];
  @Output() filterChange = new EventEmitter<string[]>();

  public readonly config = CategoryFilterConfig;
  public labels: any = {};
  public showFilterModal = false;
  public searchTerm = '';

  constructor(private translateProvider: TranslateProvider) {}

  public ngOnInit(): void {
    this.setupI18n();
  }

  public get selectedCount(): number {
    return this.selectedCategoryIds.length;
  }

  public get filterLabel(): string {
    if (this.selectedCount === 0) {
      return this.labels.allCategories || '';
    }
    if (this.selectedCount === 1) {
      return this.getSelectedCategoryName();
    }
    return `${this.selectedCount} ${this.labels.categoriesCount || ''}`;
  }

  public get filteredCategories(): Category[] {
    if (!this.searchTerm.trim()) {
      return this.categories;
    }
    const term = this.searchTerm.toLowerCase();
    return this.categories.filter((category) =>
      category.name.toLowerCase().includes(term)
    );
  }

  public get hasCategories(): boolean {
    return this.categories.length > 0;
  }

  public get hasFilteredResults(): boolean {
    return this.filteredCategories.length > 0;
  }

  public get hasSelectedFilters(): boolean {
    return this.selectedCount > 0;
  }

  public openFilterModal(): void {
    this.showFilterModal = true;
    this.searchTerm = '';
  }

  public closeFilterModal(): void {
    this.showFilterModal = false;
    this.searchTerm = '';
  }

  public toggleCategory(categoryId: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const index = this.selectedCategoryIds.indexOf(categoryId);
    if (index > -1) {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(
        (id) => id !== categoryId
      );
    } else {
      this.selectedCategoryIds = [...this.selectedCategoryIds, categoryId];
    }
  }

  public isCategorySelected(categoryId: string): boolean {
    return this.selectedCategoryIds.includes(categoryId);
  }

  public clearFilters(): void {
    this.selectedCategoryIds = [];
    this.applyFilters();
  }

  public applyFilters(): void {
    this.filterChange.emit(this.selectedCategoryIds);
    this.closeFilterModal();
  }

  public getCategoryIcon(category: Category): string {
    return category.icon || this.config.defaults.icon;
  }

  private async setupI18n(): Promise<void> {
    await this.translateProvider.loadModule(this.config.i18n.moduleKey);
    this.labels = this.translateProvider.getObject(this.config.i18n.component);
  }

  private getSelectedCategoryName(): string {
    const category = this.categories.find(
      (c) => c.id === this.selectedCategoryIds[0]
    );
    return category?.name || this.labels.filter || '';
  }
}
