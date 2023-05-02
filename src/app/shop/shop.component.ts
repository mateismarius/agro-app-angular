import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Product } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { Types } from '../shared/models/type';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Types[] = [];
  shopParams = new ShopParams();
  totalCount: number = 0;
  sortOptions = [
    { name: 'Alfabetic', value: 'name' },
    { name: 'Pret crescator', value: 'priceAsc' },
    { name: 'Pret descrescator', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  // Get a list of products using the specified shop parameters
  getProducts() {
    this.shopService.getProdcts(this.shopParams).subscribe({
      next: (response) => {
        // Set the products property to the data from the API response
        this.products = response.data;
        // Update the shopParams object with the pageIndex and pageSize from the API response
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        // Set the totalCount property to the count from the API response
        this.totalCount = response.count;
      },
      error: (error) => console.log(error),
    });
  }
  // Get a list of brand types
  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => (this.brands = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }
  // Get a list of product types
  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => (this.types = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }
// Set the brandId property of the shopParams object and update the products list
  onBrandIdSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  // Set the typeId property of the shopParams object and update the products list
  onTypeIdSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  // Set the sort property of the shopParams object and update the products list

  onSortSelected(event: any) {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }
  // Update the pageNumber property of the shopParams object and update the products list

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }
  // Set the search property of the shopParams object and update the products list
  onSearch() {
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
// Reset the searchTerm and shopParams an update the products list
  onReset() {
    if (this.searchTerm?.nativeElement.value)
      this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
