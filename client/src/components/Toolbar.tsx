import { FileAddFilled, DeleteFilled, MinusSquareFilled } from "@ant-design/icons";
import { Button, Space } from "antd";
import { observer } from "mobx-react-lite";
import useStore from "../store/useStore";
import AddProduct from "./ProductForm";
import Dropdown from "./common/Dropdown";

const { productStore, filterStore } = useStore();

const Toolbar = () => (
  <Space className="space">
    <Button icon={<MinusSquareFilled />} onClick={() => filterStore.clearSortsAndFilters()}>
      Clear sortings and filters
    </Button>
    <Dropdown element={<Button icon={<FileAddFilled />}>Add product</Button>}>
      <AddProduct />
    </Dropdown>
    <Button
      disabled={productStore.selectedDeleteProduct ? false : true}
      icon={<DeleteFilled />}
      onClick={() => {
        productStore.deleteProduct();
      }}>
      Remove product
    </Button>
  </Space>
);

export default observer(Toolbar);
