import { types } from "mobx-state-tree";
import moment from "moment";
import useStore from "../useStore";
import RangeModel, { DateRange, Range, RangeKey } from "./RangeModel";

const RangeStore = types
  .model("RangeStore", {
    ranges: types.map(RangeModel),
  })
  .actions(self => ({
    updateRanges() {
      const products = useStore().productStore.products;
      if (products) {
        for (const key of Object.values(RangeKey)) {
          const arrayOfValuesByKey = products.map(product => product[key].valueOf());
          self.ranges.set(key, {
            key,
            min: Math.min.apply(null, arrayOfValuesByKey),
            max: Math.max.apply(null, arrayOfValuesByKey),
          });
        }
      }
    },
  }))
  .views(self => ({
    getRange(key: RangeKey): Range {
      const range = self.ranges.get(key)?.range;
      return range ? range : [0, 0];
    },
    getDateRange(): DateRange {
      const range = self.ranges.get(RangeKey.DATE_RECEIPT)?.dateRange;
      return range ? range : [moment(), moment()];
    },
  }));

export default RangeStore;
