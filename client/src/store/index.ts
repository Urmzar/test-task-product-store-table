import { types } from "mobx-state-tree";
import { FilterStore } from "./filterStore";
import { ErrorStore } from "./errorStore";
import { ProductStore } from "./productStore";
import { SortKey, SortStore } from "./sortStore";

export const RootStore = types.model("RootStore", {
  productStore: types.optional(ProductStore, {}),
  errorStore: types.optional(ErrorStore, {}),
  filterStore: types.optional(FilterStore, {}),
  sortStore: types.optional(SortStore, {}),
});
