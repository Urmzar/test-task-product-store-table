import { observer } from "mobx-react-lite";
import { ChangeEvent, FC, useEffect } from "react";
import useStore from "../../../../../../stores";
import NameCell from "../../../../../components/Content/Datatable/Cells/NameCell/NameCell";

const { flagStore, datatableStore, productStore } = useStore();

const updateProduct = () => {
  if (datatableStore.newProductName !== "") {
    productStore.selectedProduct?.update(
      datatableStore.newProductName,
      datatableStore.newProductPrice
    );
    flagStore.setEditMode(false);
  }
};

const setNewProductName = (e: ChangeEvent<HTMLInputElement>) =>
  datatableStore.setNewProductName(e.target.value);

const cancel = () => flagStore.setEditMode(false);

interface Props {
  cellData: string;
  rowIndex: number;
  rowClickedIndex?: number;
}

const NameCellContainer: FC<Props> = ({ cellData, rowIndex, rowClickedIndex }) => {
  useEffect(() => {
    if (rowIndex === rowClickedIndex) datatableStore.setNewProductName(cellData);
  }, [rowClickedIndex]);

  return flagStore.isEditMode && rowIndex === rowClickedIndex ? (
    <NameCell
      value={datatableStore.newProductName}
      setNewProductName={setNewProductName}
      updateProduct={updateProduct}
      cancel={cancel}
    />
  ) : (
    <>{cellData}</>
  );
};

export default observer(NameCellContainer);
