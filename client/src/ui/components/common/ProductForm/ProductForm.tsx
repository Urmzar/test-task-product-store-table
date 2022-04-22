import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { Moment } from "moment";
import { FC } from "react";
import { FormValues } from "../../../containers/common/ProductForm/ProductFormContainer";
import Styles from "../../../styles";

const { Option } = Select;

interface Props {
  initialValues: FormValues;
  types: Array<string>;
  colors: Array<string>;
  sizes: Array<string>;
  disabledDate: (current: Moment) => boolean;
  onFinish: (values: FormValues) => void;
}

const ProductForm: FC<Props> = ({
  initialValues,
  types,
  colors,
  sizes,
  onFinish,
  disabledDate,
}) => {
  return (
    <Form
      className={Styles.PRODUCT_FORM_CONTAINER}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={onFinish}>
      <Form.Item
        label="Product name"
        name="name"
        rules={[{ required: true, message: "Please input product name!" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Type" name="type">
        <Select>
          {types.map(type => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Color" name="color">
        <Select>
          {colors.map(color => (
            <Option key={color} value={color}>
              <div style={{ backgroundColor: `${color}` }}>&nbsp;</div>
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Size" name="size">
        <Select>
          {sizes.map(size => (
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

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input product price!" }]}>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        label="Date receipt"
        name="date"
        rules={[{ required: true, message: "Please input product date receipt!" }]}>
        <DatePicker disabledDate={disabledDate} />
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

export default ProductForm;
