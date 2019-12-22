import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map,tap} from 'rxjs/operators';
import { API_BASE_URL } from '../app.token';

export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  categories: string[];
}

export interface ProductSearchParams {
  [key: string]: any; // To make compatible with HttpParams type.
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}
  
  getAll(): Observable<Product[]> {    
      console.log(' get all products');                                
     return this.http.get<Product[]>(`${this.baseUrl}/api/products`);
  }

  getById(productId: number): Observable<Product> {    
    console.log(` get  product by id =  ${productId}`);                   
 //    return this.http.get<Product[]>('/api/products').pipe(map(products => <Product>products.find(p => p.id === productId)))
     return this.http.get<Product>(`${this.baseUrl}/api/products/${productId}`);
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`, { params });
  }
 getByCategory(category: string): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.baseUrl}/api/categories/${category}`);
}

getAllCategories(): Observable<string[]> {
  return this.http.get<string[]>(`${this.baseUrl}/api/categories`);
}

}
