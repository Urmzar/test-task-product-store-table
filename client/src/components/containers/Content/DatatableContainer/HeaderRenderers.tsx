import { SearchOutlined, FilterFilled } from "@ant-design/icons";
import { TableHeaderRenderer } from "react-virtualized";
import { Types, Sizes } from "../../../../models";
import { FilterKey } from "../../../../stores/filterStore/filterModel";
import { RangeKey } from "../../../../stores/rangeStore/RangeModel";
import { SortKey } from "../../../../stores/sortStore";
import useStore from "../../../../stores/useStore";
import TableHeaderContainer from "../../Datatable/TableHeaderContainer";
import CheckBoxFilterContainer from "../../TableHeader/CheckBoxFilterContainer";
import ColorFilterContainer from "../../TableHeader/ColorFilterContainer";
import DateFilterContainer from "../../TableHeader/DateFilterContainer";
import SearchFilterContainer from "../../TableHeader/SearchFilterContainer";
import SliderFilterContainer from "../../TableHeader/SliderFilterContainer";

const { filterStore } = useStore();

export enum IconColor {
  INACTIVE = "#bfbfbf",
  ACTIVE = "#1890ff",
}

const getIconColor = (key: FilterKey) => {
  return filterStore.getFilterByKey(key) ? IconColor.ACTIVE : IconColor.INACTIVE;
};

export const nameHeaderRenderer: TableHeaderRenderer = ({ label }) => (
  <TableHeaderContainer
    label={label}
    icon={<SearchOutlined style={{ color: getIconColor(FilterKey.NAME) }} />}>
    <SearchFilterContainer />
  </TableHeaderContainer>
);

export const typeHeaderRenderer: TableHeaderRenderer = ({ label }) => (
  <TableHeaderContainer
    label={label}
    icon={<FilterFilled style={{ color: getIconColor(FilterKey.TYPE) }} />}>
    <CheckBoxFilterContainer filterKey={FilterKey.TYPE} values={Object.values(Types)} />
  </TableHeaderContainer>
);

export const colorHeaderRenderer: TableHeaderRenderer = ({ label }) => (
  <TableHeaderContainer
    label={label}
    icon={<FilterFilled style={{ color: getIconColor(FilterKey.COLOR) }} />}>
    <ColorFilterContainer />
  </TableHeaderContainer>
);

export const sizeHeaderRenderer: TableHeaderRenderer = ({ label }) => (
  <TableHeaderContainer
    label={label}
    icon={<FilterFilled style={{ color: getIconColor(FilterKey.SIZE) }} />}>
    <CheckBoxFilterContainer filterKey={FilterKey.SIZE} values={Object.values(Sizes)} />
  </TableHeaderContainer>
);

export const inStockHeaderRenderer: TableHeaderRenderer = ({ label }) => (
  <TableHeaderContainer
    label={label}
    icon={<FilterFilled style={{ color: getIconColor(FilterKey.IN_STOCK) }} />}>
    <SliderFilterContainer filterKey={FilterKey.IN_STOCK} rangeKey={RangeKey.IN_STOCK} />
  </TableHeaderContainer>
);

export const priceHeaderRenderer: TableHeaderRenderer = ({ label }) => (
  <TableHeaderContainer
    sortKey={SortKey.PRICE}
    label={label}
    icon={<FilterFilled style={{ color: getIconColor(FilterKey.PRICE) }} />}>
    <SliderFilterContainer filterKey={FilterKey.PRICE} rangeKey={RangeKey.PRICE} />
  </TableHeaderContainer>
);

export const dateHeaderRenderer: TableHeaderRenderer = ({ label }) => (
  <TableHeaderContainer
    sortKey={SortKey.DATE_RECEIPT}
    label={label}
    icon={<FilterFilled style={{ color: getIconColor(FilterKey.DATE_RECEIPT) }} />}>
    <DateFilterContainer />
  </TableHeaderContainer>
);
