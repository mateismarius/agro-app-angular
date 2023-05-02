import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { Types } from '../shared/models/type';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:7202/';

  constructor(private http: HttpClient) {}

  // Get a list of products using the specified shop parameters
  getProdcts(shopParams: ShopParams) {
    // Initialize the HttpParams object to hold the query string parameters
    let params = new HttpParams();
    // If the shopParams object has a brandId property, add it to the HttpParams
    if (shopParams.brandId > 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    // If the shopParams object has a typeId property, add it to the HttpParams
    if (shopParams.typeId > 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }
    // Add the sort, pageIndex, and pageSize properties to the HttpParams
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);

    // If the shopParams object has a search property, add it to the HttpParams
    if (shopParams.search) params = params.append('search', shopParams.search);
    // Send an HTTP GET request to the API with the HttpParams as a parameter
    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {
      params,
    });
  }
  // Get a single product with the specified ID
  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'product/' + id);
  }

  // Get a list of brands
  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }
  // Get a list of product types
  getTypes() {
    return this.http.get<Types[]>(this.baseUrl + 'products/types');
  }
}
