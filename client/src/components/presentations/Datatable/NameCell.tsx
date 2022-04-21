import { Space, Input, Button } from "antd";
import { ChangeEventHandler, FC } from "react";

interface NameCellProps {
  placeholder: string;
  value: string;
  editButtonName: string;
  cancelButtonName: string;
  updateProduct: () => void;
  cancel: () => void;
  setNewProductName: ChangeEventHandler<HTMLInputElement>;
}

const NameCell: FC<NameCellProps> = ({
  placeholder,
  value,
  editButtonName,
  cancelButtonName,
  setNewProductName,
  updateProduct,
  cancel,
}) => (
  <Space>
    <Input placeholder={placeholder} value={value} onChange={setNewProductName} />
    <Button onClick={updateProduct} type="primary">
      {editButtonName}
    </Button>
    <Button onClick={cancel}>{cancelButtonName}</Button>
  </Space>
);

export default NameCell;
