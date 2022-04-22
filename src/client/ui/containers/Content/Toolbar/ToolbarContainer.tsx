import { observer } from "mobx-react-lite";
import useStore from "../../../../stores";
import Styles from "../../../styles";
import Toolbar from "../../../components/Content/Toolbar/Toolbar";

const { productStore, filterStore, sortStore, flagStore } = useStore();

const clearSortsAndFilters = () => {
  filterStore.removeFilters();
  sortStore.removeSort();
};

const deleteProduct = () => productStore.deleteProduct();

const ToolbarContainer = () => (
  <div className={Styles.TOOLBAR_CONTAINER}>
    <Toolbar
      removeProductButtonDisabled={
        productStore.selectedProduct && !flagStore.isEditMode ? false : true
      }
      clearSortsAndFilters={clearSortsAndFilters}
      deleteProduct={deleteProduct}
    />
  </div>
);

export default observer(ToolbarContainer);
