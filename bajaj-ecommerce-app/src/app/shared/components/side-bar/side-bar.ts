import { Component, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'bajaj-side-bar',
  templateUrl: './side-bar.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./side-bar.css'],
})
export class SideBar implements AfterViewInit {
  minPrice: number = 0;
  maxPrice: number = 0;
  products: any[] = [];
  private _http = inject(HttpClient);
  private _router = inject(Router);

  @ViewChild('sidebar') sidebar!: ElementRef;

  ngAfterViewInit(): void {
    this.sidebar.nativeElement.classList.add('expanded');
  }

  applyPriceFilter() {
    const url = `http://localhost:9090/api/products?minPrice=${this.minPrice}&maxPrice=${this.maxPrice}`;
    this._http.get<any>(url).subscribe({
      next: (res) => {
        this.products = res.data || [];
        console.log('Filtered Products:', this.products);
      },
      error: (err) => console.error('Filter Error:', err),
    });
  }

  toggleSidebar() {
    const el = this.sidebar.nativeElement;
    if (el.classList.contains('collapsed')) {
      el.classList.remove('collapsed');
      el.classList.add('expanded');
    } else {
      el.classList.remove('expanded');
      el.classList.add('collapsed');
    }
  }

  goToCategory(categoryName: string) {
    this._router.navigate(['/products/category', categoryName]);
  }
}
