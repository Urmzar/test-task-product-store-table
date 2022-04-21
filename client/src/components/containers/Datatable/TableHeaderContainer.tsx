import { observer } from "mobx-react-lite";
import { FC, ReactNode } from "react";
import { SortKey } from "../../../stores/sortStore";
import useStore from "../../../stores/useStore";
import SortButton from "../../common/SortButton";
import TableHeader from "../../presentations/Datatable/TableHeader";
import { IconColor } from "../Content/DatatableContainer";

const { sortStore } = useStore();

const sortItems = (key: SortKey) => {
  sortStore.toggleSort(key);
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
            upColor={
              sortStore.key === sortKey && sortStore.order === 2
                ? IconColor.ACTIVE
                : IconColor.INACTIVE
            }
            downColor={
              sortStore.key === sortKey && sortStore.order === 1
                ? IconColor.ACTIVE
                : IconColor.INACTIVE
            }
          />
        ) : undefined
      }>
      {children}
    </TableHeader>
  );
};

export default observer(TableHeaderContainer);
