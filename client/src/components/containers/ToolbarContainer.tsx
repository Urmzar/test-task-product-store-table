import { observer } from "mobx-react-lite";
import useStore from "../../store/useStore";
import Styles from "../../styles";
import Toolbar from "../presentations/Toolbar";
import "./.less/ToolbarContainer.less";

const CLEAR_SORTS_AND_FILTERS_BUTTON_NAME = "Clear sorts and filters";
const ADD_PRODUCT_BUTTON_NAME = "Add product";
const REMOVE_PRODUCT_BUTTON_NAME = "Remove product";

const { productStore, filterStore } = useStore();

const clearSortsAndFilters = () => {};

const deleteProduct = () => {};

const ToolbarContainer = () => (
  <div className={Styles.TOOLBAR_CONTAINER}>
    <Toolbar
      clearSortAndFiltersButtonName={CLEAR_SORTS_AND_FILTERS_BUTTON_NAME}
      addProductButtonName={ADD_PRODUCT_BUTTON_NAME}
      removeProductButtonName={REMOVE_PRODUCT_BUTTON_NAME}
      removeProductButtonDisabled={productStore.selectedDeleteProduct ? true : false}
      clearSortsAndFilters={clearSortsAndFilters}
      deleteProduct={deleteProduct}
    />
  </div>
);

export default observer(ToolbarContainer);
