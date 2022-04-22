import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { RowMouseEventHandlerParams, TableCellRenderer } from "react-virtualized";
import useStore from "../../../../stores";
import Styles from "../../../styles";
import Datatable from "../../../components/Content/Datatable/Datatable";
import {
  nameHeaderRenderer,
  colorHeaderRenderer,
  dateHeaderRenderer,
  inStockHeaderRenderer,
  priceHeaderRenderer,
  sizeHeaderRenderer,
  typeHeaderRenderer,
} from "./HeaderRenderers";
import NameCellContainer from "./Cells/NameCell/NameCellContainer";
import PriceCellContainer from "./Cells/PriceCell/PriceCellContainer";
import ColorCell from "../../../components/Content/Datatable/Cells/ColorCell/ColorCell";
import DateCell from "../../../components/Content/Datatable/Cells/DateCell/DateCell";

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

const colorCellRenderer: TableCellRenderer = ({ cellData }) => <ColorCell cellData={cellData} />;

const dateCellRenderer: TableCellRenderer = ({ cellData }) => <DateCell cellData={cellData} />;

const DatatableContainer = () => {
  const [rowClickedIndex, setRowClickedIndex] = useState<number>();

  if (prevClickedDiv) prevClickedDiv.className = Styles.ROW_CONTAINER;

  const rowDoubleClick = useCallback((info: RowMouseEventHandlerParams) => {
    if (!flagStore.isEditMode) {
      flagStore.setEditMode(true);
      setRowClickedIndex(info.index);
      productStore.setSelectedProduct(info.rowData);
    }
  }, []);

  const nameCellRenderer: TableCellRenderer = useCallback(
    ({ cellData, rowIndex }) => (
      <NameCellContainer
        cellData={cellData}
        rowIndex={rowIndex}
        rowClickedIndex={rowClickedIndex}
      />
    ),
    [rowClickedIndex]
  );

  const priceCellRenderer: TableCellRenderer = useCallback(
    ({ cellData, rowIndex }) => (
      <PriceCellContainer
        cellData={cellData}
        rowIndex={rowIndex}
        rowClickedIndex={rowClickedIndex}
      />
    ),
    [rowClickedIndex]
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
