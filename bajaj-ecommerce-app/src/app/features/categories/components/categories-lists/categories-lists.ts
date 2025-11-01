import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesApi } from '../../services/categories-api';
import { Subscription } from 'rxjs';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'bajaj-categories-lists',
  imports: [CommonModule],
  templateUrl: './categories-lists.html',
  styleUrl: './categories-lists.css',
})
export class CategoriesLists implements OnInit, OnDestroy {
  protected categories: Category[] = [];
  private _router = inject(Router);
  private _categoriesApi = inject(CategoriesApi);
  private _categoriesServiceSubscription: Subscription;

  ngOnInit(): void {
    this._categoriesServiceSubscription = this._categoriesApi.getAllCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.categories = data.categories;
      },
      error: (error) => console.log(error),
    });
  }

  goToCategory(categoryName: string) {
    this._router.navigate(['/products/category', categoryName]);
  }

  ngOnDestroy(): void {
    if (this._categoriesServiceSubscription) {
      this._categoriesServiceSubscription.unsubscribe();
    }
  }
}
