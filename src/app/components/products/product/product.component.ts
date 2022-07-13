import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../interface/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  @Input() product!: Product;
  @Output() addCartClick = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.addCartClick.emit(this.product)
  }

}
