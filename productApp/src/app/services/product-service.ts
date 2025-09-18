import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id?: string;
  id: number;
  name: string;
  description: string;
  price: number;
  units: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }
}
