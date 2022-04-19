import { types } from "mobx-state-tree";

export enum FilterKey {
  NAME = "name",
  TYPE = "type",
  COLOR = "color",
  SIZE = "size",
  IN_STOCK = "inStock",
  PRICE = "price",
  DATE_RECEIPT = "dateReceipt",
}

export const FilterModel = types
  .model("FilterModel", {
    key: types.enumeration<FilterKey>("FilterKey", Object.values(FilterKey)),
    query: types.array(types.union(types.number, types.string)),
  })
  .views(self => ({
    getFilter(product: { [key: string]: string | number | ((name: string, price: number) => Promise<void>) }) {
      if (self.key === FilterKey.DATE_RECEIPT)
        return (
          new Date(product[self.key].toString()) >= new Date(self.query[0]) &&
          new Date(product[self.key].toString()) <= new Date(self.query[1])
        );
      else if (self.key === FilterKey.IN_STOCK || self.key === FilterKey.PRICE)
        return product[self.key] >= self.query[0] && product[self.key] <= self.query[1];
      return self.query.some(
        qItem => product[self.key].toString().toLowerCase().indexOf(qItem.toString().toLowerCase()) > -1
      );
    },
  }));
