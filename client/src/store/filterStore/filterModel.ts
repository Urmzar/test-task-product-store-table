import { types } from "mobx-state-tree";
import { KProduct } from "../productStore";

export enum FilterKey {
  NAME = "name",
  TYPE = "type",
  COLOR = "color",
  SIZE = "size",
  IN_STOCK = "inStock",
  PRICE = "price",
  DATE_RECEIPT = "dateReceipt",
}

export const FilterModel = types
  .model("FilterModel", {
    key: types.enumeration<FilterKey>("FilterKey", Object.values(FilterKey)),
    query: types.array(types.union(types.number, types.string)),
  })
  .views(self => ({
    getFilter(product: KProduct) {
      if (self.key === FilterKey.IN_STOCK || self.key === FilterKey.PRICE || self.key === FilterKey.DATE_RECEIPT)
        return product[self.key].valueOf() >= self.query[0] && product[self.key].valueOf() <= self.query[1];
      return self.query.some(
        queryItem => product[self.key].toString().toLowerCase().indexOf(queryItem.toString().toLowerCase()) > -1
      );
    },
  }));
