import { types, cast } from "mobx-state-tree";
import { Types, Sizes } from "../../models";
import { FilterKey, FilterModel } from "./filterModel";
import { Product } from "../productStore";

export const FilterStore = types
  .model("FilterStore", {
    filters: types.map(FilterModel),

    searchQuery: types.optional(types.string, ""),
    typeFilter: types.optional(types.array(types.string), Object.values(Types)),
    colorFilter: types.optional(types.string, ""),
    sizeFilter: types.optional(types.array(types.string), Object.values(Sizes)),
    inStockFilter: types.optional(types.array(types.number), [0, 0]),
    priceFilter: types.optional(types.array(types.number), [0, 0]),
    dateFilter: types.optional(types.array(types.Date), [0, 0]),
    inStockMax: types.optional(types.number, 0),
    inStockMin: types.optional(types.number, 0),
    priceMax: types.optional(types.number, 0),
    priceMin: types.optional(types.number, 0),
    dateMin: types.optional(types.Date, 0),
    dateMax: types.optional(types.Date, 0),
    sortState: types.optional(types.array(types.string), ["price", ""]),
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

    clearSortsAndFilters() {
      self.searchQuery = "";
      self.typeFilter = cast(Object.values(Types));
      self.colorFilter = "";
      self.sizeFilter = cast(Object.values(Sizes));
      self.inStockFilter = cast([self.inStockMin, self.inStockMax]);
      self.priceFilter = cast([self.priceMin, self.priceMax]);
      self.dateFilter = cast([self.dateMin, self.dateMax]);
      self.sortState = cast(["price", ""]);
    },

    setFilters(products: Array<Product>) {
      const inStockArray = products.map(product => product.inStock);
      const priceArray = products.map(product => product.price);
      const timestampArray = products.map(product => product.dateReceipt.valueOf());
      self.inStockMin = Math.min.apply(null, inStockArray);
      self.inStockMax = Math.max.apply(null, inStockArray);
      self.priceMin = Math.min.apply(null, priceArray);
      self.priceMax = Math.max.apply(null, priceArray);
      self.dateMin = new Date(Math.min.apply(null, timestampArray));
      self.dateMax = new Date(Math.max.apply(null, timestampArray));
      self.inStockFilter = cast([self.inStockMin, self.inStockMax]);
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

    setSearchQuery(query: string) {
      self.searchQuery = query.toLowerCase();
    },
    setTypeFilter(filter: Array<string>) {
      self.typeFilter = cast(filter);
    },
    setColorFilter(filter: string) {
      self.colorFilter = filter;
    },
    setSizeFilter(filter: Array<string>) {
      self.sizeFilter = cast(filter);
    },
    setInStockFilter(filter: [number, number]) {
      self.inStockFilter = cast(filter);
    },
    setPriceFilter(filter: [number, number]) {
      self.priceFilter = cast(filter);
    },
    setDateFilter(filter: [Date, Date]) {
      self.dateFilter = cast(filter);
    },

    setSortState(state: [string, string]) {
      self.sortState = cast(state);
    },
  }))
  .views(self => ({
    getFilter(product: Product) {
      return Array.from(self.filters).every(filter => filter[1].getFilter(product));
    },
  }));
