import { types } from "mobx-state-tree";
import moment, { Moment } from "moment";

export enum RangeKey {
  IN_STOCK = "inStock",
  PRICE = "price",
  DATE_RECEIPT = "dateReceipt",
}

export type Range = [number, number];
export type DateRange = [Moment, Moment];

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
    get dateRange(): DateRange {
      return [moment(self.min), moment(self.max)];
    },
  }));

export default RangeModel;
