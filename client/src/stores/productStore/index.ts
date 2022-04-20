import { types, flow, cast, Instance } from "mobx-state-tree";
import makeRequest from "../../api";
import { Endpoints, RequestResult } from "../../api/utils";
import { TProduct } from "../../models";
import { ProductModel, Product } from "./productModel";
import useStore from "../useStore";

export const ProductStore = types
  .model("ProductStore", {
    products: types.maybe(types.array(ProductModel)),
    selectedProductForDelete: types.maybeNull(types.reference(ProductModel)),
    selectedUpdateProduct: types.maybeNull(types.reference(ProductModel)),
  })
  .actions(self => ({
    load: flow(function* () {
      const requestResult: RequestResult = yield makeRequest(Endpoints.PRODUCTS);
      if (requestResult.result) {
        self.products = cast(
          (requestResult.result as Array<TProduct>).map(product => {
            return { ...product, dateReceipt: new Date(product.dateReceipt) };
          })
        );
        if (self.products) {
          useStore().rangeStore.updateRanges();
        }
      } else {
        useStore().errorStore.setError(requestResult.error);
      }
    }),

    deleteProduct: flow(function* () {
      if (self.selectedProductForDelete) {
        const requestResult: RequestResult = yield makeRequest(
          Endpoints.DELETE_PRODUCT + self.selectedProductForDelete.id,
          {
            method: "DELETE",
          }
        );
        if (requestResult.error) useStore().errorStore.setError(requestResult.error);
        else if (self.products) {
          self.products.remove(self.selectedProductForDelete);
          useStore().rangeStore.updateRanges();
          self.selectedProductForDelete = null;
        }
      }
    }),

    addProduct: flow(function* (product: Product) {
      const requestResult: RequestResult = yield makeRequest(Endpoints.ADD_PRODUCT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (requestResult.error) useStore().errorStore.setError(requestResult.error);
      else if (self.products) {
        product.id = requestResult.result as number;
        self.products.unshift(product);
      }
    }),

    setSelectedProductForDelete(product: Instance<typeof ProductModel> | null) {
      self.selectedProductForDelete = product;
    },

    setSelectedUpdateProduct(product: Instance<typeof ProductModel> | null) {
      self.selectedUpdateProduct = product;
    },

    afterCreate() {
      // @ts-ignore
      self.load();
    },
  }))
  .views(self => ({
    get currentProducts() {
      return self.products
        ?.filter(product => useStore().filterStore.getFilter(product))
        .sort((a, b) => useStore().sortStore.getSort({ ...a }, { ...b }));
    },
  }));
