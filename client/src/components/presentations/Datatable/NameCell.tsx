import { Space, Input, Button } from "antd";
import { ChangeEventHandler, FC } from "react";

interface Props {
  value: string;
  updateProduct: () => void;
  cancel: () => void;
  setNewProductName: ChangeEventHandler<HTMLInputElement>;
}

const NameCell: FC<Props> = ({ value, setNewProductName, updateProduct, cancel }) => (
  <Space>
    <Input placeholder="Enter product name" value={value} onChange={setNewProductName} />
    <Button onClick={updateProduct} type="primary">
      Edit product
    </Button>
    <Button onClick={cancel}>Cancel</Button>
  </Space>
);

export default NameCell;
