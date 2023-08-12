import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/crud/categories.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public categories: any[] = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchCategoriesWithSubcategories();
  }

  async fetchCategoriesWithSubcategories() {
    this.categories =
      await this.categoryService.getCategoriesWithSubcategoires();
  }
}
