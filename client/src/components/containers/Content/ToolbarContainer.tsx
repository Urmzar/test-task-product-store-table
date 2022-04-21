import { observer } from "mobx-react-lite";
import useStore from "../../../stores/useStore";
import Styles from "../../../styles";
import Toolbar from "../../presentations/Content/Toolbar";
import "./.less/ToolbarContainer.less";

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
