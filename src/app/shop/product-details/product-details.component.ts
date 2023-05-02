import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // call the loadProduct method when the component is initialized
    this.loadProduct();
  }

  loadProduct() {
    // get the product ID from the current route snapshot
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // if an ID is present, retrieve the corresponding product from the backend service
    if (id) {
      this.shopService.getProduct(+id).subscribe({
        // set the product property to the retrieved product
        next: (product) => (this.product = product),
        error: (error) => console.log(error),
      });
    }
  }
}
