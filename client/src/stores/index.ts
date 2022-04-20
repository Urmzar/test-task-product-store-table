import { types } from "mobx-state-tree";
import FilterStore from "./filterStore";
import ErrorStore from "./errorStore";
import ProductStore from "./productStore";
import SortStore from "./sortStore";
import RangeStore from "./rangeStore";
import FlagStore from "./flagStore";
import DatatableStore from "./datatableStore";

export const RootStore = types.model("RootStore", {
  productStore: types.optional(ProductStore, {}),
  errorStore: types.optional(ErrorStore, {}),
  filterStore: types.optional(FilterStore, {}),
  sortStore: types.optional(SortStore, {}),
  rangeStore: types.optional(RangeStore, {}),
  flagStore: types.optional(FlagStore, {}),
  datatableStore: types.optional(DatatableStore, {}),
});
