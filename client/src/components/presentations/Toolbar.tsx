import { FileAddFilled, DeleteFilled, MinusSquareFilled } from "@ant-design/icons";
import { Button, Space } from "antd";
import AddProduct from "../ProductForm";
import Dropdown from "../common/Dropdown";
import { FC } from "react";

interface ToolbarProps {
  clearSortAndFiltersButtonName: string;
  addProductButtonName: string;
  removeProductButtonName: string;
  removeProductButtonDisabled: boolean;
  clearSortsAndFilters: () => void;
  deleteProduct: () => void;
}

const Toolbar: FC<ToolbarProps> = ({
  clearSortAndFiltersButtonName,
  addProductButtonName,
  removeProductButtonName,
  removeProductButtonDisabled,
  clearSortsAndFilters,
  deleteProduct,
}) => (
  <Space>
    <Button icon={<MinusSquareFilled />} onClick={clearSortsAndFilters}>
      {clearSortAndFiltersButtonName}
    </Button>
    <Dropdown element={<Button icon={<FileAddFilled />}>{addProductButtonName}</Button>}>
      <AddProduct />
    </Dropdown>
    <Button disabled={removeProductButtonDisabled} icon={<DeleteFilled />} onClick={deleteProduct}>
      {removeProductButtonName}
    </Button>
  </Space>
);

export default Toolbar;
