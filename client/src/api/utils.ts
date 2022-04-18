import { Product } from "../store/productStore";

export const enum Endpoints {
  PRODUCTS = "http://localhost:3000/products",
  DELETE_PRODUCT = "http://localhost:3000/delete-product/",
  ADD_PRODUCT = "http://localhost:3000/add-product",
  UPDATE_PRODUCT = "http://localhost:3000/update-product/",
}

export class RequestResult {
  constructor(public error: string | null, public result?: Array<Product> | number) {}
}
