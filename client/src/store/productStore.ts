import { types, flow, cast, Instance } from "mobx-state-tree";
import makeRequest from "../api";
import { Endpoints, RequestResult } from "../api/utils";
import useStore from "./useStore";

const ProductModel = types
  .model("ProductModel", {
    id: types.identifierNumber,
    name: types.string,
    type: types.string,
    color: types.string,
    size: types.string,
    inStock: types.number,
    price: types.number,
    dateReceipt: types.string,
  })
  .actions(self => ({
    update: flow(function* (name: string, price: number) {
      const { errorStore, filterStore } = useStore();
      const requestResult: RequestResult = yield makeRequest(Endpoints.UPDATE_PRODUCT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: self.id, name, price }),
      });
      if (requestResult.error) {
        errorStore.setError(requestResult.error);
      } else {
        self.name = name;
        self.price = price;
        filterStore.updatePriceFilter(price);
      }
    }),
  }));

export const ProductStore = types
  .model("ProductStore", {
    products: types.maybe(types.array(ProductModel)),
    selectedDeleteProduct: types.maybeNull(types.reference(ProductModel)),
    selectedUpdateProduct: types.maybeNull(types.reference(ProductModel)),
  })
  .actions(self => ({
    load: flow(function* () {
      const requestResult: RequestResult = yield makeRequest(Endpoints.PRODUCTS);
      if (requestResult.result) {
        self.products = cast(requestResult.result as Array<Product>);
        if (self.products) {
          useStore().filterStore.setFilters(self.products);
        }
      } else {
        useStore().errorStore.setError(requestResult.error);
      }
    }),

    deleteProduct: flow(function* () {
      if (self.selectedDeleteProduct) {
        const requestResult: RequestResult = yield makeRequest(
          Endpoints.DELETE_PRODUCT + self.selectedDeleteProduct.id,
          {
            method: "DELETE",
          }
        );
        if (requestResult.error) useStore().errorStore.setError(requestResult.error);
        else if (self.products) {
          self.products.remove(self.selectedDeleteProduct);
          useStore().filterStore.setFilters(self.products);
          self.selectedDeleteProduct = null;
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
        useStore().filterStore.setFilters(self.products);
      }
    }),

    setSelectedDeleteProduct(product: Instance<typeof ProductModel> | null) {
      self.selectedDeleteProduct = product;
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
      const { sortState } = useStore().filterStore;
      let filtered = self.products?.filter(product => useStore().filterStore.getFilter({ ...product }));
      if (sortState[1] !== "") {
        if (sortState[1] === "ASC") {
          if (sortState[0] === "price") return filtered?.sort((a, b) => a.price - b.price);
          else return filtered?.sort((a, b) => new Date(a.dateReceipt).valueOf() - new Date(b.dateReceipt).valueOf());
        } else {
          if (sortState[0] === "price") return filtered?.sort((a, b) => -a.price + b.price);
          else return filtered?.sort((a, b) => -new Date(a.dateReceipt).valueOf() + new Date(b.dateReceipt).valueOf());
        }
      }
      return filtered;
    },
  }));

export type Product = Omit<Instance<typeof ProductModel>, "update">;
