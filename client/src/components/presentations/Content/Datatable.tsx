import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { FC } from "react";
import {
  AutoSizer,
  Column,
  RowMouseEventHandlerParams,
  Table,
  TableCellRenderer,
  TableHeaderRenderer,
} from "react-virtualized";
import { FilterKey } from "../../../stores/filterStore/filterModel";
import { SortKey } from "../../../stores/sortStore";
import ColorCellContainer from "../../containers/Datatable/ColorCellContainer";
import NameCellContainer from "../../containers/Datatable/NameCellContainer";
import TableHeaderContainer from "../../containers/Datatable/TableHeaderContainer";
import PriceCellContainer from "../../containers/Datatable/PriceCellContainer";
import "./.less/Datatable.less";
import { IconColor } from "../../containers/Content/DatatableContainer";
import SearchFilterContainer from "../../containers/TableHeader/SearchFilterContainer";
import CheckBoxFilterContainer from "../../containers/TableHeader/CheckBoxFilterContainer";
import ColorFilterContainer from "../../containers/TableHeader/ColorFilterContainer";
import SliderFilterContainer from "../../containers/TableHeader/SliderFilterContainer";
import { RangeKey } from "../../../stores/rangeStore/RangeModel";
import DateFilterContainer from "../../containers/Datatable/DateFilterContainer";
import Styles from "../../../styles";
import { Product } from "../../../stores/productStore/productModel";

let prevClickedDiv: HTMLDivElement | null;

interface Props {
  rowClick: (info: RowMouseEventHandlerParams) => void;
  rowDoubleClick: (info: RowMouseEventHandlerParams) => void;
  rowClickedIndex?: number;
  searchIconColor: IconColor;
  typeFilterIconColor: IconColor;
  colorFilterIconColor: IconColor;
  sizeFilterIconColor: IconColor;
  inStockFilterIconColor: IconColor;
  priceFilterIconColor: IconColor;
  dateFilterIconColor: IconColor;
  typeFilterValues: Array<string>;
  sizeFilterValues: Array<string>;
  products?: Array<Product>;
}

const Datatable: FC<Props> = ({
  rowClick,
  rowDoubleClick,
  rowClickedIndex,
  searchIconColor,
  typeFilterIconColor,
  colorFilterIconColor,
  sizeFilterIconColor,
  inStockFilterIconColor,
  priceFilterIconColor,
  dateFilterIconColor,
  typeFilterValues,
  sizeFilterValues,
  products,
}) => {
  if (prevClickedDiv) prevClickedDiv.style.backgroundColor = "white";

  // Cell renderers

  const nameCellRenderer: TableCellRenderer = ({ cellData, rowIndex }) => (
    <NameCellContainer cellData={cellData} rowIndex={rowIndex} rowClickedIndex={rowClickedIndex} />
  );

  const colorCellRenderer: TableCellRenderer = ({ cellData }) => (
    <ColorCellContainer cellData={cellData} />
  );

  const priceCellRenderer: TableCellRenderer = ({ cellData, rowIndex }) => (
    <PriceCellContainer cellData={cellData} rowClickedIndex={rowClickedIndex} rowIndex={rowIndex} />
  );

  const dateCellRenderer: TableCellRenderer = ({ cellData }) => {
    return Intl.DateTimeFormat("ru-RU").format(cellData);
  };

  // Header renderers

  console.log(searchIconColor);

  const nameHeaderRenderer: TableHeaderRenderer = ({ label }) => (
    <TableHeaderContainer
      label={label}
      icon={<SearchOutlined style={{ color: searchIconColor }} />}>
      <SearchFilterContainer />
    </TableHeaderContainer>
  );

  const typeHeaderRenderer: TableHeaderRenderer = ({ label }) => (
    <TableHeaderContainer
      label={label}
      icon={<FilterFilled style={{ color: typeFilterIconColor }} />}>
      <CheckBoxFilterContainer filterKey={FilterKey.TYPE} values={typeFilterValues} />
    </TableHeaderContainer>
  );

  const colorHeaderRenderer: TableHeaderRenderer = ({ label }) => (
    <TableHeaderContainer
      label={label}
      icon={<FilterFilled style={{ color: colorFilterIconColor }} />}>
      <ColorFilterContainer />
    </TableHeaderContainer>
  );

  const sizeHeaderRenderer: TableHeaderRenderer = ({ label }) => (
    <TableHeaderContainer
      label={label}
      icon={<FilterFilled style={{ color: sizeFilterIconColor }} />}>
      <CheckBoxFilterContainer filterKey={FilterKey.SIZE} values={sizeFilterValues} />
    </TableHeaderContainer>
  );

  const inStockHeaderRenderer: TableHeaderRenderer = ({ label }) => (
    <TableHeaderContainer
      label={label}
      icon={<FilterFilled style={{ color: inStockFilterIconColor }} />}>
      <SliderFilterContainer filterKey={FilterKey.IN_STOCK} rangeKey={RangeKey.IN_STOCK} />
    </TableHeaderContainer>
  );

  const priceHeaderRenderer: TableHeaderRenderer = ({ label }) => (
    <TableHeaderContainer
      sortKey={SortKey.PRICE}
      label={label}
      icon={<FilterFilled style={{ color: priceFilterIconColor }} />}>
      <SliderFilterContainer filterKey={FilterKey.PRICE} rangeKey={RangeKey.PRICE} />
    </TableHeaderContainer>
  );

  const dateHeaderRenderer: TableHeaderRenderer = ({ label }) => (
    <TableHeaderContainer
      sortKey={SortKey.DATE_RECEIPT}
      label={label}
      icon={<FilterFilled style={{ color: dateFilterIconColor }} />}>
      <DateFilterContainer />
    </TableHeaderContainer>
  );

  // Datatable component

  return (
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
};

export default Datatable;
