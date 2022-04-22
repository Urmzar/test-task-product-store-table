import { FC } from "react";
import {
  AutoSizer,
  Column,
  RowMouseEventHandlerParams,
  Table,
  TableCellRenderer,
  TableHeaderRenderer,
} from "react-virtualized";
import Styles from "../../../styles";
import { Product } from "../../../../stores/productStore/productModel";

interface Props {
  rowClick: (info: RowMouseEventHandlerParams) => void;
  rowDoubleClick: (info: RowMouseEventHandlerParams) => void;
  nameCellRenderer: TableCellRenderer;
  colorCellRenderer: TableCellRenderer;
  priceCellRenderer: TableCellRenderer;
  dateCellRenderer: TableCellRenderer;
  nameHeaderRenderer: TableHeaderRenderer;
  typeHeaderRenderer: TableHeaderRenderer;
  colorHeaderRenderer: TableHeaderRenderer;
  sizeHeaderRenderer: TableHeaderRenderer;
  inStockHeaderRenderer: TableHeaderRenderer;
  priceHeaderRenderer: TableHeaderRenderer;
  dateHeaderRenderer: TableHeaderRenderer;
  products?: Array<Product>;
}

const Datatable: FC<Props> = ({
  rowClick,
  rowDoubleClick,
  nameCellRenderer,
  colorCellRenderer,
  priceCellRenderer,
  dateCellRenderer,
  nameHeaderRenderer,
  typeHeaderRenderer,
  colorHeaderRenderer,
  sizeHeaderRenderer,
  inStockHeaderRenderer,
  priceHeaderRenderer,
  dateHeaderRenderer,
  products,
}) => (
  <div className={Styles.DATATABLE_CONTAINER}>
    <AutoSizer products={products}>
      {({ width, height }) => (
        <Table
          onRowClick={rowClick}
          onRowDoubleClick={rowDoubleClick}
          width={width}
          height={height}
          headerHeight={55}
          rowHeight={55}
          rowCount={products?.length || 0}
          rowGetter={({ index }) => products?.[index]}>
          <Column label="Id" dataKey="id" width={50} flexGrow={1} />
          <Column
            cellRenderer={nameCellRenderer}
            headerRenderer={nameHeaderRenderer}
            label="Name"
            dataKey="name"
            width={350}
            flexGrow={1}
          />
          <Column
            headerRenderer={typeHeaderRenderer}
            label="Type"
            dataKey="type"
            width={100}
            flexGrow={1}
          />
          <Column
            headerRenderer={colorHeaderRenderer}
            cellRenderer={colorCellRenderer}
            label="Color"
            dataKey="color"
            width={100}
            flexGrow={1}
          />
          <Column
            headerRenderer={sizeHeaderRenderer}
            label="Size"
            dataKey="size"
            width={100}
            flexGrow={1}
          />
          <Column
            headerRenderer={inStockHeaderRenderer}
            label="In stock"
            dataKey="inStock"
            width={100}
            flexGrow={1}
          />
          <Column
            cellRenderer={priceCellRenderer}
            headerRenderer={priceHeaderRenderer}
            label="Price"
            dataKey="price"
            width={100}
            flexGrow={1}
          />
          <Column
            headerRenderer={dateHeaderRenderer}
            cellRenderer={dateCellRenderer}
            label="Date receipt"
            dataKey="dateReceipt"
            width={100}
            flexGrow={1}
          />
        </Table>
      )}
    </AutoSizer>
  </div>
);

export default Datatable;
