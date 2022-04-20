import { types, cast } from "mobx-state-tree";
import { Product } from "../productStore/productModel";
import FilterModel, { FilterKey } from "./filterModel";

const FilterStore = types
  .model("FilterStore", {
    filters: types.map(FilterModel),

    priceFilter: types.optional(types.array(types.number), [0, 0]),
    dateFilter: types.optional(types.array(types.Date), [0, 0]),
    priceMax: types.optional(types.number, 0),
    priceMin: types.optional(types.number, 0),
    dateMin: types.optional(types.Date, 0),
    dateMax: types.optional(types.Date, 0),
  })
  .actions(self => ({
    setFilter(key: FilterKey, query: Array<string> | [number, number]) {
      self.filters.set(key, { key, query });
    },
    removeFilter(key: FilterKey) {
      self.filters.delete(key);
    },
    removeFilters() {
      self.filters.clear();
    },

    ////// OLD

    setFilters(products: Array<Product>) {
      const inStockArray = products.map(product => product.inStock);
      const priceArray = products.map(product => product.price);
      const timestampArray = products.map(product => product.dateReceipt.valueOf());
      self.priceMin = Math.min.apply(null, priceArray);
      self.priceMax = Math.max.apply(null, priceArray);
      self.dateMin = new Date(Math.min.apply(null, timestampArray));
      self.dateMax = new Date(Math.max.apply(null, timestampArray));
      self.priceFilter = cast([self.priceMin, self.priceMax]);
      self.dateFilter = cast([self.dateMin, self.dateMax]);
    },

    updatePriceFilter(newPrice: number) {
      if (newPrice < self.priceMin) {
        self.priceMin = newPrice;
        self.priceFilter = cast([newPrice, self.priceFilter[1]]);
      } else if (newPrice > self.priceMax) {
        self.priceMax = newPrice;
        self.priceFilter = cast([self.priceFilter[0], newPrice]);
      }
    },

    setPriceFilter(filter: [number, number]) {
      self.priceFilter = cast(filter);
    },
    setDateFilter(filter: [Date, Date]) {
      self.dateFilter = cast(filter);
    },
  }))
  .views(self => ({
    getFilter(product: Product) {
      return Array.from(self.filters).every(filter => filter[1].getFilter(product));
    },
    getFilterByKey(key: FilterKey) {
      return self.filters.get(key);
    },
  }));

export default FilterStore;
