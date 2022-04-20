import { types } from "mobx-state-tree";
import useStore from "../useStore";
import RangeModel, { Range, RangeKey } from "./RangeModel";

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
      console.log(Array.from(self.ranges));
    },
  }))
  .views(self => ({
    getRange(key: RangeKey): Range {
      const range = self.ranges.get(key)?.range;
      return range ? range : [0, 0];
    },
  }));

export default RangeStore;
