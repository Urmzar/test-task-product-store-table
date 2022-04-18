import { Button, DatePicker, Divider, Form, Input, InputNumber, Select } from "antd";
import { observer } from "mobx-react-lite";
import moment, { Moment } from "moment";
import useStore from "../store/useStore";
import { Colors, Sizes, Types } from "../models";
import "./ProductForm.less";

const { Option } = Select;

const { productStore, filterStore } = useStore();

interface FormValues {
  type: Types;
  color: Colors;
  size: Sizes;
  inStock: number;
  price: number;
  date: Moment;
  name: string;
}

const initialValues: FormValues = {
  name: "",
  type: Types.Outerwear,
  color: Colors.ORANGE,
  size: Sizes.L,
  inStock: 10,
  price: 10,
  date: moment(),
};

const ProductForm = () => {
  const onFinish = (values: FormValues) => {
    productStore.addProduct({
      color: values.color,
      dateReceipt: values.date.toISOString(),
      id: 0,
      inStock: values.inStock,
      price: values.price,
      size: values.size,
      type: values.type,
      name: values.name,
    });
  };

  return (
    <Form
      className="product-form-container"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={onFinish}>
      <Form.Item label="Product name" name="name" rules={[{ required: true, message: "Please input product name!" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Type" name="type">
        <Select>
          {Object.values(Types).map(type => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Color" name="color">
        <Select>
          {Object.values(Colors).map(color => (
            <Option key={color} value={color}>
              <div style={{ backgroundColor: `${color}` }}>&nbsp;</div>
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Size" name="size">
        <Select>
          {Object.values(Sizes).map(size => (
            <Option key={size} value={size}>
              {size}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="In stock"
        name="inStock"
        rules={[{ required: true, message: "Please input product in stock!" }]}>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input product price!" }]}>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        label="Date receipt"
        name="date"
        rules={[{ required: true, message: "Please input product date receipt!" }]}>
        <DatePicker disabledDate={(current: Moment) => current < moment(filterStore.dateMin)} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button type="link" htmlType="reset">
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(ProductForm);
