import { flow } from "mobx-state-tree";
import { Instance, types } from "mobx-state-tree";
import useStore from "..";
import makeRequest from "../../api";
import { RequestResult, Endpoints } from "../../api/utils";

export type Product = Omit<Instance<typeof ProductModel>, "update">;
export type KProduct = {
  [key: string]: string | number | Date | ((name: string, price: number) => Promise<void>);
};

export const ProductModel = types
  .model("ProductModel", {
    id: types.identifierNumber,
    name: types.string,
    type: types.string,
    color: types.string,
    size: types.string,
    inStock: types.number,
    price: types.number,
    dateReceipt: types.Date,
  })
  .actions(self => ({
    update: flow(function* (name: string, price: number) {
      const { errorStore } = useStore();
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
      }
    }),
  }));
