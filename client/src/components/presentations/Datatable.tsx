import { CaretDownOutlined, CaretUpOutlined, FilterFilled, SearchOutlined } from "@ant-design/icons";
import { Row, Col, Space, Input, Button, InputNumber, InputRef } from "antd";
import { observer } from "mobx-react-lite";
import { FC, useRef } from "react";
import {
  AutoSizer,
  Column,
  RowMouseEventHandlerParams,
  Table,
  TableCellRenderer,
  TableHeaderRenderer,
} from "react-virtualized";
import useStore from "../../stores/useStore";
import { ColorFilter } from "../filter/ColorFilter";
import "./Datatable.less";
import Dropdown from "../common/Dropdown";
import DateFilter from "../filter/DateFilter";
import SliderFilter from "../filter/SliderFilter";
import SearchFilter from "../filter/SearchFilter";
import CheckBoxFilter from "../filter/CheckBoxFilter";
import { SortKey } from "../../stores/sortStore";
import { FilterKey } from "../../stores/filterStore/filterModel";
import NameCellContainer from "../containers/Datatable/NameCellContainer";

const { productStore, filterStore, sortStore, flagStore, datatableStore } = useStore();

enum IconColor {
  INACTIVE = "#bfbfbf",
  ACTIVE = "#1890ff",
}

let prevClickedDiv: HTMLDivElement | null;

interface DatatableProps {
  rowClick: (info: RowMouseEventHandlerParams) => void;
  rowDoubleClick: (info: RowMouseEventHandlerParams) => void;
  rowClickedIndex?: number;
}

const Datatable: FC<DatatableProps> = ({ rowClick, rowDoubleClick, rowClickedIndex }) => {
  if (prevClickedDiv) prevClickedDiv.style.backgroundColor = "white";

  const sortItems = (key: SortKey) => {
    useStore().sortStore.toggleSort(key);
  };

  ////////////////////
  // Cell renderers //
  ////////////////////

  const nameCellRenderer: TableCellRenderer = ({ cellData, rowIndex }) => (
    <NameCellContainer cellData={cellData} rowIndex={rowIndex} rowClickedIndex={rowClickedIndex} />
  );

  const colorCellRenderer: TableCellRenderer = ({ cellData }) => {
    return (
      <div
        className="color-cell-container"
        style={{
          backgroundColor: `${cellData}`,
        }}></div>
    );
  };

  const priceCellRenderer: TableCellRenderer = ({ cellData, rowIndex }) => {
    if (rowClickedIndex && flagStore.isEditMode && rowIndex === rowClickedIndex)
      return <InputNumber min={0} defaultValue={cellData} onChange={e => datatableStore.setNewProductPrice(e)} />;
    return Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" }).format(cellData);
  };

  const dateCellRenderer: TableCellRenderer = ({ cellData }) => {
    return Intl.DateTimeFormat("ru-RU").format(new Date(cellData));
  };

  //////////////////////
  // Header renderers //
  //////////////////////

  const nameHeaderRenderer: TableHeaderRenderer = ({ label }) => {
    return (
      <Row justify="space-between" align="middle">
        <Col>{label}</Col>
        <Col>
          <Dropdown
            element={
              <SearchOutlined
                style={{ color: filterStore.getFilterByKey(FilterKey.NAME) ? IconColor.ACTIVE : IconColor.INACTIVE }}
              />
            }>
            <SearchFilter />
          </Dropdown>
        </Col>
      </Row>
    );
  };

  const typeHeaderRenderer: TableHeaderRenderer = ({ label }) => {
    return (
      <Row justify="space-between" align="middle">
        <Col>{label}</Col>
        <Col>
          <Dropdown
            element={
              <FilterFilled
                style={{
                  color: filterStore.getFilterByKey(FilterKey.TYPE) ? IconColor.ACTIVE : IconColor.INACTIVE,
                }}
              />
            }>
            <CheckBoxFilter type="Type" />
          </Dropdown>
        </Col>
      </Row>
    );
  };

  const sizeHeaderRenderer: TableHeaderRenderer = ({ label }) => {
    return (
      <Row justify="space-between" align="middle">
        <Col>{label}</Col>
        <Col>
          <Dropdown
            element={
              <FilterFilled
                style={{
                  color: filterStore.getFilterByKey(FilterKey.SIZE) ? IconColor.ACTIVE : IconColor.INACTIVE,
                }}
              />
            }>
            <CheckBoxFilter type="Size" />
          </Dropdown>
        </Col>
      </Row>
    );
  };

  const colorHeaderRenderer: TableHeaderRenderer = ({ label }) => {
    return (
      <Row justify="space-between" align="middle">
        <Col>{label}</Col>
        <Col>
          <Dropdown
            element={
              <FilterFilled
                style={{
                  color: filterStore.getFilterByKey(FilterKey.COLOR) ? IconColor.ACTIVE : IconColor.INACTIVE,
                }}
              />
            }>
            <ColorFilter />
          </Dropdown>
        </Col>
      </Row>
    );
  };

  const inStockHeaderRenderer: TableHeaderRenderer = ({ label }) => {
    return (
      <Row justify="space-between" align="middle">
        <Col>{label}</Col>
        <Col>
          <Dropdown
            element={
              <FilterFilled
                style={{
                  color: filterStore.getFilterByKey(FilterKey.IN_STOCK) ? IconColor.ACTIVE : IconColor.INACTIVE,
                }}
              />
            }>
            <SliderFilter type="InStock" />
          </Dropdown>
        </Col>
      </Row>
    );
  };

  const priceHeaderRenderer: TableHeaderRenderer = ({ label }) => {
    return (
      <Row justify="space-between" align="middle">
        <Col>{label}</Col>
        <Col>
          <Space>
            <Col>
              <Dropdown
                element={
                  <FilterFilled
                    style={{
                      color: filterStore.getFilterByKey(FilterKey.PRICE) ? IconColor.ACTIVE : IconColor.INACTIVE,
                    }}
                  />
                }>
                <SliderFilter type="Price" />
              </Dropdown>
            </Col>
            <Col className="sort-icon-container" onClick={() => sortItems(SortKey.PRICE)}>
              <Row>
                <CaretUpOutlined
                  style={{
                    fontSize: "11px",
                    color:
                      sortStore.key === SortKey.PRICE && sortStore.order === 2 ? IconColor.ACTIVE : IconColor.INACTIVE,
                  }}
                />
              </Row>
              <Row>
                <CaretDownOutlined
                  style={{
                    fontSize: "11px",
                    color:
                      sortStore.key === SortKey.PRICE && sortStore.order === 1 ? IconColor.ACTIVE : IconColor.INACTIVE,
                  }}
                />
              </Row>
            </Col>
          </Space>
        </Col>
      </Row>
    );
  };

  const dateHeaderRenderer: TableHeaderRenderer = ({ label }) => {
    return (
      <Row justify="space-between" align="middle">
        <Col>{label}</Col>
        <Col>
          <Space>
            <Col>
              <Dropdown
                element={
                  <FilterFilled
                    style={{
                      color: filterStore.getFilterByKey(FilterKey.DATE_RECEIPT) ? IconColor.ACTIVE : IconColor.INACTIVE,
                    }}
                  />
                }>
                <DateFilter />
              </Dropdown>
            </Col>
            <Col className="sort-icon-container" onClick={() => sortItems(SortKey.DATE_RECEIPT)}>
              <Row>
                <CaretUpOutlined
                  style={{
                    fontSize: "11px",
                    color:
                      sortStore.key === SortKey.DATE_RECEIPT && sortStore.order === 1
                        ? IconColor.ACTIVE
                        : IconColor.INACTIVE,
                  }}
                />
              </Row>
              <Row>
                <CaretDownOutlined
                  style={{
                    fontSize: "11px",
                    color:
                      sortStore.key === SortKey.DATE_RECEIPT && sortStore.order === 2
                        ? IconColor.ACTIVE
                        : IconColor.INACTIVE,
                  }}
                />
              </Row>
            </Col>
          </Space>
        </Col>
      </Row>
    );
  };

  /////////////////////////
  // Datatable component //
  /////////////////////////

  return (
    <div className="table-container">
      <AutoSizer products={productStore.currentProducts}>
        {({ width, height }) => (
          <Table
            onRowClick={rowClick}
            onRowDoubleClick={rowDoubleClick}
            width={width}
            height={height}
            headerHeight={55}
            rowHeight={55}
            rowCount={productStore.currentProducts?.length || 0}
            rowGetter={({ index }) => productStore.currentProducts?.[index]}>
            <Column label="Id" dataKey="id" width={50} flexGrow={1} />
            <Column
              cellRenderer={nameCellRenderer}
              headerRenderer={nameHeaderRenderer}
              label="Name"
              dataKey="name"
              width={350}
              flexGrow={1}
            />
            <Column headerRenderer={typeHeaderRenderer} label="Type" dataKey="type" width={100} flexGrow={1} />
            <Column
              headerRenderer={colorHeaderRenderer}
              cellRenderer={colorCellRenderer}
              label="Color"
              dataKey="color"
              width={100}
              flexGrow={1}
            />
            <Column headerRenderer={sizeHeaderRenderer} label="Size" dataKey="size" width={100} flexGrow={1} />
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

export default observer(Datatable);
