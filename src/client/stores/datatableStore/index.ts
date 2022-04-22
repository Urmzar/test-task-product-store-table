import { types } from "mobx-state-tree";

const DatatableStore = types
  .model("DatatableStore", {
    newProductName: types.optional(types.string, ""),
    newProductPrice: types.optional(types.number, 0),
  })
  .actions(self => ({
    setNewProductName(name: string) {
      self.newProductName = name;
    },
    setNewProductPrice(price: number) {
      self.newProductPrice = price;
    },
  }));

export default DatatableStore;
