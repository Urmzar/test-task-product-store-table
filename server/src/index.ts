import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import router from "./routes";

const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log(`Server started at http://localhost:3000.`));
