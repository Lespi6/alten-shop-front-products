import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'app/domain/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'assets/products.json';
  private productsSource = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSource.asObservable();
  private loaded = false;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    if (!this.loaded) {
      this.http.get<{data: Product[]}>(this.productsUrl).pipe(
        map(response => response.data)
      ).subscribe(products => {
        this.productsSource.next(products);
        this.loaded = true;
      });
    }
    return this.products$;
  }
}