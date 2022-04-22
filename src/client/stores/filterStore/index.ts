import { types } from "mobx-state-tree";
import { Product } from "../productStore/productModel";
import { Range } from "../rangeStore/RangeModel";
import FilterModel, { FilterKey } from "./filterModel";

const FilterStore = types
  .model("FilterStore", {
    filters: types.map(FilterModel),
  })
  .actions(self => ({
    setFilter(key: FilterKey, query: Array<string> | Range) {
      self.filters.set(key, { key, query });
    },
    removeFilter(key: FilterKey) {
      self.filters.delete(key);
    },
    removeFilters() {
      self.filters.clear();
    },
  }))
  .views(self => ({
    getFilterConditions(product: Product) {
      return Array.from(self.filters).every(filter => filter[1].getFilterCondition(product));
    },
    getFilterByKey(key: FilterKey) {
      return self.filters.get(key);
    },
  }));

export default FilterStore;
