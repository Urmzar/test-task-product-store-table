import faker from "@faker-js/faker";
import Router from "koa-router";
import products from "../fakeRepo";
import { TProduct } from "../models";
import { RequestResult, isProductValid, UpdateProductData, Routes } from "./utils";

const router = new Router();

router.get(Routes.GET_PRODUCTS, async ctx => {
  ctx.body = new RequestResult(null, products);
});

router.delete(Routes.DELETE_PRODUCT, async ctx => {
  const id = Number(ctx.params.id);
  const productIndex = products.findIndex(product => product.id === id);
  if (productIndex === -1) ctx.body = new RequestResult("Product not found");
  else {
    products.splice(productIndex, 1);
    ctx.body = new RequestResult(null);
  }
});

router.put(Routes.ADD_PRODUCT, async ctx => {
  if (ctx.request.type === "application/json") {
    const newProduct = ctx.request.body as TProduct;
    if (isProductValid(newProduct)) {
      newProduct.id = faker.unique(faker.datatype.number);
      products.unshift(newProduct);
      ctx.body = new RequestResult(null, newProduct.id);
    } else ctx.body = new RequestResult("Product information is not valid");
  } else ctx.body = new RequestResult("Invalid content type");
});

router.put(Routes.UPDATE_PRODUCT, async ctx => {
  if (ctx.request.type === "application/json") {
    const updateProductData = ctx.request.body as UpdateProductData;
    const product = products.find(product => product.id === updateProductData.id);
    if (!product) ctx.body = new RequestResult("Product not found");
    else if (updateProductData.name !== "" && updateProductData.price >= 0) {
      product.name = updateProductData.name;
      product.price = updateProductData.price;
      ctx.body = new RequestResult(null);
    } else ctx.body = new RequestResult("Product information is not valid");
  } else ctx.body = new RequestResult("Invalid content type");
});

export default router;
