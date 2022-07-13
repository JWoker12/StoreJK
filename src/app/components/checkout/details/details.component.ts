import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../products/services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  total$ = this.shoppingCartSvc.totalAction$;
  cart$ = this.shoppingCartSvc.cartAction$;
  constructor(private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['name', 'quantity', 'price', 'subTotal'];
  dataSource = this.cart$;

}
