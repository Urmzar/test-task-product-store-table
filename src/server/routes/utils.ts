import { TProduct, Colors, Sizes, Types } from "../typings";

export enum Routes {
  GET_PRODUCTS = "/products",
  DELETE_PRODUCT = "/delete-product/:id",
  ADD_PRODUCT = "/add-product",
  UPDATE_PRODUCT = "/update-product",
}

export interface UpdateProductData {
  id: number;
  name: string;
  price: number;
}

export class RequestResult {
  constructor(public error: string | null, public result?: Array<TProduct> | number) {}
}

export const isProductValid = (product: TProduct) => {
  const isColorValid = Object.values(Colors).includes(product.color);
  const isSizeValid = Object.values(Sizes).includes(product.size);
  const isTypeValid = Object.values(Types).includes(product.type);
  const isNameValid = product.name !== "";
  const isPriceValid = product.price >= 0;
  const isInStockValid = product.inStock >= 0;
  const isDateValid = Date.parse(product.dateReceipt);
  return (
    isColorValid &&
    isSizeValid &&
    isTypeValid &&
    isNameValid &&
    isPriceValid &&
    isInStockValid &&
    isDateValid
  );
};
