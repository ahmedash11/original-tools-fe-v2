import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly baseUrl = '/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Promise<any> {
    return this.http.get<any>(this.baseUrl).toPromise();
  }
  getParentCategories(): Promise<any> {
    let opts: any = {
      where: {
        parentId: null,
      },
    };

    let params: any = {};
    if (opts) {
      params.filter = JSON.stringify(opts);
    }
    return this.http.get<any>(this.baseUrl, { params }).toPromise();
  }
  getCategoriesWithSubcategoires(): Promise<any> {
    let opts: any = {
      limit: 3,
      where: {
        parentId: null,
      },
      include: [
        {
          relation: 'subcategories',
        },
      ],
    };

    let params: any = {};
    if (opts) {
      params.filter = JSON.stringify(opts);
    }
    return this.http.get<any>(this.baseUrl, { params }).toPromise();
  }

  getCategory(id: number): Promise<any> {
    return this.http.get(`${this.baseUrl}/${id}`).toPromise();
  }

  createCategory(category: any): Promise<any> {
    return this.http.post(this.baseUrl, category).toPromise();
  }

  updateCategory(id: number, category: any): Promise<any> {
    return this.http.put(`${this.baseUrl}/${id}`, category).toPromise();
  }

  deleteCategory(id: number): Promise<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).toPromise();
  }
}
