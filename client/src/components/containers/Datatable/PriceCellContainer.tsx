import { InputNumber } from "antd";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import useStore from "../../../stores/useStore";

interface Props {
  rowIndex: number;
  rowClickedIndex?: number;
  cellData: number;
}

const { datatableStore, flagStore } = useStore();

const setNewProductPrice = (e: number) => datatableStore.setNewProductPrice(e);

const PriceCellContainer: FC<Props> = ({ rowIndex, rowClickedIndex, cellData }) => {
  useEffect(() => {
    if (rowIndex === rowClickedIndex) datatableStore.setNewProductPrice(cellData);
  }, [rowClickedIndex]);

  return flagStore.isEditMode && rowIndex === rowClickedIndex ? (
    <InputNumber min={0} value={datatableStore.newProductPrice} onChange={setNewProductPrice} />
  ) : (
    <>{Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD" }).format(cellData)}</>
  );
};

export default observer(PriceCellContainer);
