import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/crud/brands.service';
import { CategoryService } from '../services/crud/categories.service';
import { ProductService } from '../services/crud/products.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  isMenuCollapsed = true;
  public numbers = Array(10)
    .fill(4)
    .map((x, i) => i); // [0,1,2,3,4]

  public categories: any[] = [];
  public products: any[] = [];
  public brands: any[] = [];
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandsService: BrandService
  ) {}
  ngOnInit(): void {
    this.fetchBrands();
    this.fetchProducts();
    this.fetchCategoriesWithSubcategories();
  }

  async fetchCategoriesWithSubcategories() {
    this.categories = await this.categoryService.getParentCategories();
  }

  fetchBrands() {
    this.brandsService
      .getAllBrands()
      .then((res) => {
        this.brands = res;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  fetchProducts() {
    try {
      this.productService.getAllProducts().then((data) => {
        this.products = data;
      });
    } catch (err) {
      console.error(err);
    }
  }
}
