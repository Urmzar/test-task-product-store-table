import { types } from "mobx-state-tree";
import { KProduct } from "../productStore/productModel";

export enum SortKey {
  PRICE = "price",
  DATE_RECEIPT = "dateReceipt",
}

// order: 0 - NAT, 1 - ASC, 2 - DESC

const SortStore = types
  .model("SortStore", {
    key: types.optional(types.enumeration<SortKey>(Object.values(SortKey)), SortKey.PRICE),
    order: types.optional(types.number, 0),
    prevKey: types.optional(types.enumeration<SortKey>(Object.values(SortKey)), SortKey.DATE_RECEIPT),
  })
  .actions(self => ({
    toggleSort(key: SortKey) {
      if (key !== self.prevKey) {
        self.order = 1;
        self.key = key;
        self.prevKey = key;
      } else {
        self.order++;
        if (self.order > 2) self.order = 0;
      }
    },
    removeSort() {
      self.order = 0;
    },
  }))
  .views(self => ({
    getSort(productA: KProduct, productB: KProduct) {
      if (self.order === 0) return 0;
      else if (self.order === 1) return Number(productA[self.key].valueOf()) - Number(productB[self.key].valueOf());
      else return Number(productB[self.key].valueOf()) - Number(productA[self.key].valueOf());
    },
  }));

export default SortStore;
