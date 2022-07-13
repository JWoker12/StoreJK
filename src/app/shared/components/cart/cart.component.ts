import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/components/products/services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent{

  constructor(private shoppingCartSvc: ShoppingCartService, public router: Router) { }
  quantity$ = this.shoppingCartSvc.quantityAction$; 
  total$ = this.shoppingCartSvc.totalAction$; 
  cart$ = this.shoppingCartSvc.cartAction$; 

}
