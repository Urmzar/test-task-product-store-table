import { observer } from "mobx-react-lite";
import { useState } from "react";
import { RowMouseEventHandlerParams } from "react-virtualized";
import { Sizes, Types } from "../../../models";
import { FilterKey } from "../../../stores/filterStore/filterModel";
import useStore from "../../../stores/useStore";
import Styles from "../../../styles";
import Datatable from "../../presentations/Content/Datatable";
import "./.less/DatatableContainer.less";

export enum IconColor {
  INACTIVE = "#bfbfbf",
  ACTIVE = "#1890ff",
}

const { productStore, filterStore, sortStore, flagStore } = useStore();

let prevClickedDiv: HTMLDivElement | null;

const rowClick = (info: RowMouseEventHandlerParams) => {
  const clickedDiv: HTMLDivElement = info.event.currentTarget;
  if (!flagStore.isEditMode) {
    if (prevClickedDiv) prevClickedDiv.className = Styles.ROW_CONTAINER;
    if (prevClickedDiv !== clickedDiv) {
      prevClickedDiv = clickedDiv;
      prevClickedDiv.className = Styles.ROW_CONTAINER_ACTIVE;
      productStore.setSelectedProductForDelete(info.rowData);
    } else {
      productStore.setSelectedProductForDelete(null);
      prevClickedDiv.className = Styles.ROW_CONTAINER;
      prevClickedDiv = null;
    }
  }
};

const DatatableContainer = () => {
  const [rowClickedIndex, setRowClickedIndex] = useState<number>();

  const rowDoubleClick = (info: RowMouseEventHandlerParams) => {
    if (!flagStore.isEditMode) {
      flagStore.setEditMode(true);
      setRowClickedIndex(info.index);
      productStore.setSelectedProductForDelete(null);
      productStore.setSelectedUpdateProduct(info.rowData);
    }
  };

  return (
    <Datatable
      rowClick={rowClick}
      rowDoubleClick={rowDoubleClick}
      rowClickedIndex={rowClickedIndex}
      searchIconColor={
        filterStore.getFilterByKey(FilterKey.NAME) ? IconColor.ACTIVE : IconColor.INACTIVE
      }
      typeFilterIconColor={
        filterStore.getFilterByKey(FilterKey.TYPE) ? IconColor.ACTIVE : IconColor.INACTIVE
      }
      colorFilterIconColor={
        filterStore.getFilterByKey(FilterKey.COLOR) ? IconColor.ACTIVE : IconColor.INACTIVE
      }
      sizeFilterIconColor={
        filterStore.getFilterByKey(FilterKey.SIZE) ? IconColor.ACTIVE : IconColor.INACTIVE
      }
      inStockFilterIconColor={
        filterStore.getFilterByKey(FilterKey.IN_STOCK) ? IconColor.ACTIVE : IconColor.INACTIVE
      }
      priceFilterIconColor={
        filterStore.getFilterByKey(FilterKey.PRICE) ? IconColor.ACTIVE : IconColor.INACTIVE
      }
      dateFilterIconColor={
        filterStore.getFilterByKey(FilterKey.DATE_RECEIPT) ? IconColor.ACTIVE : IconColor.INACTIVE
      }
      typeFilterValues={Object.values(Types)}
      sizeFilterValues={Object.values(Sizes)}
      products={productStore.currentProducts}
    />
  );
};

export default observer(DatatableContainer);
