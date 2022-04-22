import { types, flow, cast, Instance } from "mobx-state-tree";
import useStore from "..";
import makeRequest from "../../api";
import { Endpoints, RequestResult } from "../../api/utils";
import { TProduct } from "../../models";
import { ProductModel, Product } from "./productModel";

const ProductStore = types
  .model("ProductStore", {
    products: types.maybe(types.array(ProductModel)),
    selectedProduct: types.maybeNull(types.reference(ProductModel)),
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
      if (self.selectedProduct) {
        const requestResult: RequestResult = yield makeRequest(
          Endpoints.DELETE_PRODUCT + self.selectedProduct.id,
          {
            method: "DELETE",
          }
        );
        if (requestResult.error) useStore().errorStore.setError(requestResult.error);
        else if (self.products) {
          self.products.remove(self.selectedProduct);
          useStore().rangeStore.updateRanges();
          self.selectedProduct = null;
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
        useStore().rangeStore.updateRanges();
      }
    }),

    setSelectedProduct(product: Instance<typeof ProductModel> | null) {
      self.selectedProduct = product;
    },

    afterCreate() {
      // @ts-ignore
      self.load();
    },
  }))
  .views(self => ({
    get currentProducts() {
      return self.products
        ?.filter(product => useStore().filterStore.getFilterConditions(product))
        .sort((a, b) => useStore().sortStore.getSort({ ...a }, { ...b }));
    },
  }));

export default ProductStore;
