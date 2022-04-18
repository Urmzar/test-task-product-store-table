import { CaretDownOutlined, CaretUpOutlined, FilterFilled, SearchOutlined } from "@ant-design/icons";
import { Row, Col, Space, Input, Button, InputNumber, InputRef } from "antd";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import {
  AutoSizer,
  Column,
  RowMouseEventHandlerParams,
  Table,
  TableCellRenderer,
  TableHeaderRenderer,
} from "react-virtualized";
import useStore from "../store/useStore";
import { ColorFilter } from "./filter/ColorFilter";
import "./Datatable.less";
import Dropdown from "./common/Dropdown";
import DateFilter from "./filter/DateFilter";
import SliderFilter from "./filter/SliderFilter";
import SearchFilter from "./filter/SearchFilter";
import CheckBoxFilter from "./filter/CheckBoxFilter";
import { Sizes, Types } from "../models";

enum IconColor {
  INACTIVE = "#bfbfbf",
  ACTIVE = "#1890ff",
}

let prevClickedDiv: HTMLDivElement | null;

const { productStore, filterStore } = useStore();

const Datatable = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [rowClickedIndex, setClickedRowIndex] = useState<number | null>();
  const nameProductInput = useRef<InputRef>(null);
  const priceProductInput = useRef<HTMLInputElement>(null);
  if (prevClickedDiv) prevClickedDiv.style.backgroundColor = "white";

  ////////////////////
  // Event handlers //
  ////////////////////

  let rowClick = (info: RowMouseEventHandlerParams) => {
    if (!isEditMode) {
      if (prevClickedDiv) prevClickedDiv.style.backgroundColor = "white";
      if (prevClickedDiv !== (info.event.currentTarget as HTMLDivElement)) {
        prevClickedDiv = info.event.currentTarget as HTMLDivElement;
        prevClickedDiv.style.backgroundColor = "#eaeaea";
        productStore.setSelectedDeleteProduct(info.rowData);
      } else {
        productStore.setSelectedDeleteProduct(null);
        prevClickedDiv.style.backgroundColor = "white";
        prevClickedDiv = null;
      }
    }
  };

  const rowDoubleClick = (info: RowMouseEventHandlerParams) => {
    if (!isEditMode) {
      setIsEditMode(true);
      setClickedRowIndex(info.index);
      productStore.setSelectedDeleteProduct(null);
      if (prevClickedDiv) prevClickedDiv.style.backgroundColor = "white";
      productStore.setSelectedUpdateProduct(info.rowData);
    }
  };

  const updateProduct = () => {
    const newProductName = nameProductInput.current?.input?.value;
    const newProductPrice = priceProductInput.current?.value;
    if (newProductName && newProductPrice && newProductName !== "" && newProductPrice !== "") {
      productStore.selectedUpdateProduct?.update(newProductName, Number(newProductPrice));
      setIsEditMode(false);
    }
  };

  const sortItems = (key: string) => {
    if (filterStore.sortState[0] !== key) {
      filterStore.setSortState([key, "ASC"]);
    } else {
      if (filterStore.sortState[1] === "") {
        filterStore.setSortState([key, "ASC"]);
      } else if (filterStore.sortState[1] === "ASC") {
        filterStore.setSortState([key, "DESC"]);
      } else filterStore.setSortState([key, ""]);
    }
  };

  ////////////////////
  // Cell renderers //
  ////////////////////

  const nameCellRenderer: TableCellRenderer = ({ cellData, rowIndex }) => {
    if (rowClickedIndex !== undefined && isEditMode && rowIndex === rowClickedIndex) {
      return (
        <Space>
          <Input ref={nameProductInput} defaultValue={cellData} placeholder="Enter product name" />
          <Button onClick={updateProduct} type="primary">
            Edit product
          </Button>
          <Button
            onClick={() => {
              setIsEditMode(false);
            }}>
            Cancel
          </Button>
        </Space>
      );
    }
    return cellData;
  };

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
    if (rowClickedIndex && isEditMode && rowIndex === rowClickedIndex)
      return <InputNumber ref={priceProductInput} min={0} defaultValue={cellData} />;
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
                style={{ color: filterStore.searchQuery === "" ? IconColor.INACTIVE : IconColor.ACTIVE }}
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
                  color:
                    filterStore.typeFilter.length === Object.keys(Types).length ? IconColor.INACTIVE : IconColor.ACTIVE,
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
                  color:
                    filterStore.sizeFilter.length === Object.keys(Sizes).length ? IconColor.INACTIVE : IconColor.ACTIVE,
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
                  color: filterStore.colorFilter === "" ? IconColor.INACTIVE : IconColor.ACTIVE,
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
                  color:
                    filterStore.inStockFilter[0] === filterStore.inStockMin &&
                    filterStore.inStockFilter[1] === filterStore.inStockMax
                      ? IconColor.INACTIVE
                      : IconColor.ACTIVE,
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
                      color:
                        filterStore.priceFilter[0] === filterStore.priceMin &&
                        filterStore.priceFilter[1] === filterStore.priceMax
                          ? IconColor.INACTIVE
                          : IconColor.ACTIVE,
                    }}
                  />
                }>
                <SliderFilter type="Price" />
              </Dropdown>
            </Col>
            <Col className="sort-icon-container" onClick={() => sortItems("price")}>
              <Row>
                <CaretUpOutlined
                  style={{
                    fontSize: "11px",
                    color:
                      filterStore.sortState[0] === "price" && filterStore.sortState[1] === "DESC"
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
                      filterStore.sortState[0] === "price" && filterStore.sortState[1] === "ASC"
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
                      color:
                        filterStore.dateFilter[0] === filterStore.dateMin &&
                        filterStore.dateFilter[1] === filterStore.dateMax
                          ? IconColor.INACTIVE
                          : IconColor.ACTIVE,
                    }}
                  />
                }>
                <DateFilter />
              </Dropdown>
            </Col>
            <Col className="sort-icon-container" onClick={() => sortItems("date")}>
              <Row>
                <CaretUpOutlined
                  style={{
                    fontSize: "11px",
                    color:
                      filterStore.sortState[0] === "date" && filterStore.sortState[1] === "DESC"
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
                      filterStore.sortState[0] === "date" && filterStore.sortState[1] === "ASC"
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
