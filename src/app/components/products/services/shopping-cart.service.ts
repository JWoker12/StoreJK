import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  products: Product[] = [];

  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
  get cartAction$(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  updateCart(product: Product){
    this.addToCart(product);
    this.quantityProducts();
    this.calcTotal();
  }

  private addToCart(product: Product){
    const isProductInCart = this.products.find( ({id}) => id == product.id)
    if(isProductInCart){
      isProductInCart.quantity += 1;
    }else{
      this.products.push({ ...product, quantity:1});
    }
    this.cartSubject.next(this.products);
  }

  private quantityProducts(){
    const quantity = this.products.reduce( (acc, prod) => acc += prod.quantity, 0);
    this.quantitySubject.next(quantity);
  }

  private calcTotal(){
    let total = this.products.reduce( (acc, prod) => acc += (prod.price * prod.quantity), 0);
    this.totalSubject.next(total);
  }
  
  resetCart(){
    this.cartSubject.next([]);
    this.quantitySubject.next(0);
    this.totalSubject.next(0);
    this.products = [];
  }

}
