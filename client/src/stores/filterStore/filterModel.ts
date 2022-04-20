import { types } from "mobx-state-tree";
import { KProduct } from "../productStore/productModel";

import { Range } from "../../stores/rangeStore/RangeModel";

export enum FilterKey {
  NAME = "name",
  TYPE = "type",
  COLOR = "color",
  SIZE = "size",
  IN_STOCK = "inStock",
  PRICE = "price",
  DATE_RECEIPT = "dateReceipt",
}

const FilterModel = types
  .model("FilterModel", {
    key: types.enumeration<FilterKey>("FilterKey", Object.values(FilterKey)),
    query: types.array(types.union(types.number, types.string)),
  })
  .views(self => ({
    getFilter(product: KProduct) {
      if (typeof self.query[0] === "number")
        return product[self.key].valueOf() >= self.query[0] && product[self.key].valueOf() <= self.query[1];
      return self.query.some(q => product[self.key].toString().toLowerCase().indexOf(q.toString().toLowerCase()) > -1);
    },
    get range(): Range {
      if (typeof self.query[0] === "number") return [Number(self.query[0]), Number(self.query[0])];
      return [0, 0];
    },
  }));

export default FilterModel;
