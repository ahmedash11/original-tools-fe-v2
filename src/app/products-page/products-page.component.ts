import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/crud/brands.service';
import { CategoryService } from '../services/crud/categories.service';
import { ProductService } from '../services/crud/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  public numbers = Array(10)
    .fill(4)
    .map((x, i) => i);
  public products: any[] = [];
  public brands: any[] = [];
  public categories: any[] = [];

  public filteredBrands: number[] = [];
  public filteredCategories: number[] = [];
  public filteredBrandsMap: { [key: number]: any } = {};
  public filteredCategoriesMap: { [key: number]: any } = {};
  constructor(
    private productService: ProductService,
    private brandsService: BrandService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchBrands();
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService
      .getCategories()
      .then((res) => {
        this.categories = res;
      })
      .catch((err) => {
        console.error(err);
      });
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
    let opts: { where?: any } = {
      where: {},
    };
    if (this.filteredBrands.length > 0 || this.categories.length > 0) {
      if (this.filteredBrands.length > 0) {
        opts['where'] = {
          brandId: {
            inq: this.filteredBrands,
          },
        };
      }

      if (this.filteredCategories.length > 0) {
        opts['where'] = {
          ...opts['where'],
          categoryId: {
            inq: this.filteredCategories,
          },
        };
      }
    } else {
      delete opts.where;
    }
    try {
      this.productService.getAllProducts(opts).then((data) => {
        this.products = data;
      });
    } catch (err) {
      console.error(err);
    }
  }

  filterByBrand(brandId: number) {
    let existingIndex = this.filteredBrands.findIndex(
      (brandItem) => brandItem == brandId
    );

    if (existingIndex !== -1) {
      this.filteredBrands.splice(existingIndex, 1);
    } else {
      this.filteredBrands.push(brandId);
    }
    this.filteredBrandsMap = {};
    for (const item of this.filteredBrands) {
      this.filteredBrandsMap[item] = true;
    }
    this.fetchProducts();
  }

  filterByCategory(categoryId: number) {
    let existingIndex = this.filteredCategories.findIndex(
      (categoryItem) => categoryItem == categoryId
    );

    if (existingIndex !== -1) {
      this.filteredCategories.splice(existingIndex, 1);
    } else {
      this.filteredCategories.push(categoryId);
    }
    this.filteredCategoriesMap = {};
    for (const item of this.filteredCategories) {
      this.filteredCategoriesMap[item] = true;
    }
    this.fetchProducts();
  }
}
