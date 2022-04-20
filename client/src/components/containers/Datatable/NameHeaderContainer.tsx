import { FC, ReactNode } from "react";
import { FilterKey } from "../../../stores/filterStore/filterModel";
import useStore from "../../../stores/useStore";
import NameHeader from "../../presentations/NameHeader";

interface Props {
  label: ReactNode;
}

export enum IconColor {
  INACTIVE = "#bfbfbf",
  ACTIVE = "#1890ff",
}

const { filterStore } = useStore();

const NameHeaderContainer: FC<Props> = ({ label }) => (
  <NameHeader
    label={label}
    color={filterStore.getFilterByKey(FilterKey.NAME) ? IconColor.ACTIVE : IconColor.INACTIVE}
  />
);

export default NameHeaderContainer;
