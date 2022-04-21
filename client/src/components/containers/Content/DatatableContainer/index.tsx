import { observer } from "mobx-react-lite";
import { useState } from "react";
import { RowMouseEventHandlerParams, TableCellRenderer } from "react-virtualized";
import useStore from "../../../../stores/useStore";
import Styles from "../../../../styles";
import Datatable from "../../../presentations/Content/Datatable";
import ColorCellContainer from "../../Datatable/ColorCellContainer";
import NameCellContainer from "../../Datatable/NameCellContainer";
import PriceCellContainer from "../../Datatable/PriceCellContainer";
import "../.less/DatatableContainer.less";
import {
  nameHeaderRenderer,
  colorHeaderRenderer,
  dateHeaderRenderer,
  inStockHeaderRenderer,
  priceHeaderRenderer,
  sizeHeaderRenderer,
  typeHeaderRenderer,
} from "./HeaderRenderers";

const { productStore, flagStore } = useStore();

let prevClickedDiv: HTMLDivElement | null;

const rowClick = (info: RowMouseEventHandlerParams) => {
  const clickedDiv: HTMLDivElement = info.event.currentTarget;
  if (!flagStore.isEditMode) {
    if (prevClickedDiv) prevClickedDiv.className = Styles.ROW_CONTAINER;
    if (prevClickedDiv !== clickedDiv) {
      prevClickedDiv = clickedDiv;
      prevClickedDiv.className = Styles.ROW_CONTAINER_ACTIVE;
      productStore.setSelectedProduct(info.rowData);
    } else {
      productStore.setSelectedProduct(null);
      prevClickedDiv.className = Styles.ROW_CONTAINER;
      prevClickedDiv = null;
    }
  }
};

const colorCellRenderer: TableCellRenderer = ({ cellData }) => (
  <ColorCellContainer cellData={cellData} />
);

const dateCellRenderer: TableCellRenderer = ({ cellData }) => {
  return Intl.DateTimeFormat("ru-RU").format(cellData);
};

const DatatableContainer = () => {
  const [rowClickedIndex, setRowClickedIndex] = useState<number>();

  const rowDoubleClick = (info: RowMouseEventHandlerParams) => {
    if (!flagStore.isEditMode) {
      flagStore.setEditMode(true);
      setRowClickedIndex(info.index);
      productStore.setSelectedProduct(info.rowData);
    }
  };

  const nameCellRenderer: TableCellRenderer = ({ cellData, rowIndex }) => (
    <NameCellContainer cellData={cellData} rowIndex={rowIndex} rowClickedIndex={rowClickedIndex} />
  );

  const priceCellRenderer: TableCellRenderer = ({ cellData, rowIndex }) => (
    <PriceCellContainer cellData={cellData} rowIndex={rowIndex} rowClickedIndex={rowClickedIndex} />
  );

  return (
    <Datatable
      rowClick={rowClick}
      rowDoubleClick={rowDoubleClick}
      nameCellRenderer={nameCellRenderer}
      colorCellRenderer={colorCellRenderer}
      priceCellRenderer={priceCellRenderer}
      dateCellRenderer={dateCellRenderer}
      nameHeaderRenderer={nameHeaderRenderer}
      colorHeaderRenderer={colorHeaderRenderer}
      dateHeaderRenderer={dateHeaderRenderer}
      inStockHeaderRenderer={inStockHeaderRenderer}
      priceHeaderRenderer={priceHeaderRenderer}
      sizeHeaderRenderer={sizeHeaderRenderer}
      typeHeaderRenderer={typeHeaderRenderer}
      products={productStore.currentProducts}
    />
  );
};

export default observer(DatatableContainer);
