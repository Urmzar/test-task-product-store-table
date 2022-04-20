import { observer } from "mobx-react-lite";
import { useState } from "react";
import { RowMouseEventHandlerParams } from "react-virtualized";
import useStore from "../../../stores/useStore";
import Styles from "../../../styles";
import Datatable from "../../presentations/Datatable";
import "./.less/DatatableContainer.less";

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

  return <Datatable rowClick={rowClick} rowDoubleClick={rowDoubleClick} rowClickedIndex={rowClickedIndex} />;
};

export default observer(DatatableContainer);
