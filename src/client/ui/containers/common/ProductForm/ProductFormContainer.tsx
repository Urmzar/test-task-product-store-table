import { observer } from "mobx-react-lite";
import moment from "moment";
import { Moment } from "moment";
import useStore from "../../../../stores";
import { Types, Colors, Sizes } from "../../../../typings";
import ProductForm from "../../../components/common/ProductForm/ProductForm";

const { productStore, rangeStore } = useStore();

export interface FormValues {
  name: string;
  type: Types;
  color: Colors;
  size: Sizes;
  inStock: number;
  price: number;
  date: Moment;
}

const initialValues: FormValues = {
  name: "",
  type: Types.Outerwear,
  color: Colors.ORANGE,
  size: Sizes.L,
  inStock: 10,
  price: 100,
  date: rangeStore.dateRange[0],
};

const onFinish = (values: FormValues) => {
  productStore.addProduct({
    color: values.color,
    dateReceipt: new Date(values.date.valueOf()),
    id: 0,
    inStock: values.inStock,
    price: values.price,
    size: values.size,
    type: values.type,
    name: values.name,
  });
};

const disabledDate = (current: Moment) => current < moment();

const ProductFormContainer = () => (
  <ProductForm
    colors={Object.values(Colors)}
    types={Object.values(Types)}
    sizes={Object.values(Sizes)}
    initialValues={initialValues}
    onFinish={onFinish}
    disabledDate={disabledDate}
  />
);

export default observer(ProductFormContainer);
