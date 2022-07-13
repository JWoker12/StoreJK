import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, pipe, switchMap, tap } from 'rxjs';
import { Details } from '../products/interface/order.interface';
import { Product } from '../products/interface/product.interface';
import { Store } from '../products/interface/stores.interface';
import { DataService } from '../products/services/data.service';
import { OrdersService } from '../products/services/orders.service';
import { ProductsService } from '../products/services/products.service';
import { ShoppingCartService } from '../products/services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  }
  cart: Product[] = [];
  isDelivery = false;
  stores: Store[] = [];

  constructor(private dataSvc: DataService, private ordersSvg: OrdersService, 
    private shoppingCartSvg: ShoppingCartService, private router: Router,
    private productsSvc: ProductsService) {
      this.checkCartIsEmpty();
    }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
  }

  onPickupOrDelivery(value: boolean){
    this.isDelivery = value
  }

  private getStores(){
    this.dataSvc.getStores().pipe(
      tap((stores: Store[]) => this.stores = stores))
    .subscribe()
  }

  onSubmit({value: formData}: NgForm){
    const data = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    }
    this.ordersSvg.saveOrder(data).pipe(
      switchMap( ({ id: orderId}) => {
        const details = this.prepareDetails();
        return this.ordersSvg.saveDetailsOrder({details, orderId});
      }),
      tap( () => this.router.navigate(['/'])),
      tap( ()=> this.shoppingCartSvg.resetCart())
    ).subscribe()
  }

  private getCurrentDay(){
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[]{
    const details: Details[] = [];
    this.cart.forEach( (product: Product) => {
      const { id:productId, name: productName, quantity, stock} = product;
      const updateStock = (stock - quantity);
        this.productsSvc.updateStock(productId, updateStock)
        .pipe(
          tap( () => details.push({ productId, productName, quantity }))
        )
    });
    return details;
  }

  private getDataCart(){
    this.shoppingCartSvg.cartAction$
    .pipe(
      tap((products: Product[]) => this.cart = products)
    )
  }

  private checkCartIsEmpty(){
    this.shoppingCartSvg.cartAction$
    .pipe(
      tap( ( products: Product[]) => {
        if(Array.isArray(products) && !products.length) {
          this.router.navigate(['/products'])
        }
      })
    ).subscribe()
  }

}
