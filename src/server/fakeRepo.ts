import { faker } from "@faker-js/faker";
import { Colors, Sizes, TProduct, Types } from "./typings";

const PRODUCT_NUMBER = 1000;

const products: Array<TProduct> = new Array(PRODUCT_NUMBER).fill(true).map(() => ({
  id: faker.unique(faker.datatype.number),
  name: faker.commerce.productName(),
  type: faker.random.arrayElement(Object.values(Types)),
  color: faker.random.arrayElement(Object.values(Colors)),
  size: faker.random.arrayElement(Object.values(Sizes)),
  inStock: faker.datatype.number(150),
  price: Number(faker.commerce.price()),
  dateReceipt: faker.date.soon(60).toISOString(),
}));

export default products;
