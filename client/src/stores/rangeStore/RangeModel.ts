import { types } from "mobx-state-tree";

export enum RangeKey {
  IN_STOCK = "inStock",
  PRICE = "price",
  DATE_RECEIPT = "dateReceipt",
}

export type Range = [number, number];

const RangeModel = types
  .model("RangeModel", {
    key: types.enumeration<RangeKey>(Object.values(RangeKey)),
    min: types.number,
    max: types.number,
  })
  .views(self => ({
    get range(): Range {
      return [self.min, self.max];
    },
  }));

export default RangeModel;
