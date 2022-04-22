import { FileAddFilled, DeleteFilled, MinusSquareFilled } from "@ant-design/icons";
import { Button, Space } from "antd";
import { FC } from "react";
import ProductFormContainer from "../../../containers/common/ProductForm/ProductFormContainer";
import Dropdown from "../../common/Dropdown/Dropdown";

interface Props {
  removeProductButtonDisabled: boolean;
  clearSortsAndFilters: () => void;
  deleteProduct: () => void;
}

const Toolbar: FC<Props> = ({
  removeProductButtonDisabled,
  clearSortsAndFilters,
  deleteProduct,
}) => (
  <Space>
    <Button icon={<MinusSquareFilled />} onClick={clearSortsAndFilters}>
      Clear sorts and filters
    </Button>
    <Dropdown element={<Button icon={<FileAddFilled />}>Add product</Button>}>
      <ProductFormContainer />
    </Dropdown>
    <Button disabled={removeProductButtonDisabled} icon={<DeleteFilled />} onClick={deleteProduct}>
      Remove product
    </Button>
  </Space>
);

export default Toolbar;
