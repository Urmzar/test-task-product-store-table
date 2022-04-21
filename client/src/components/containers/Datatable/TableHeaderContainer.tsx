import { observer } from "mobx-react-lite";
import { FC, ReactNode } from "react";
import { SortKey } from "../../../stores/sortStore";
import useStore from "../../../stores/useStore";
import SortButton from "../../common/SortButton";
import TableHeader from "../../presentations/Datatable/TableHeader";
import { IconColor } from "../Content/DatatableContainer/HeaderRenderers";

const { sortStore } = useStore();

const sortItems = (key: SortKey) => {
  sortStore.toggleSort(key);
};

const getIconColor = (key: SortKey, order: number) => {
  return sortStore.key === key && sortStore.order === order ? IconColor.ACTIVE : IconColor.INACTIVE;
};

interface Props {
  label: ReactNode;
  icon: JSX.Element;
  children: JSX.Element;
  sortKey?: SortKey;
}

const TableHeaderContainer: FC<Props> = ({ label, icon, children, sortKey }) => {
  return (
    <TableHeader
      label={label}
      icon={icon}
      sortButton={
        sortKey ? (
          <SortButton
            onClick={() => {
              sortItems(sortKey);
            }}
            upColor={getIconColor(sortKey, 2)}
            downColor={getIconColor(sortKey, 1)}
          />
        ) : undefined
      }>
      {children}
    </TableHeader>
  );
};

export default observer(TableHeaderContainer);
