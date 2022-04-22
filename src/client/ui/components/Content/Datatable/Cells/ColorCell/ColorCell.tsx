import { FC } from "react";
import Styles from "../../../../../styles";

interface Props {
  cellData: string;
}

const ColorCell: FC<Props> = ({ cellData }) => (
  <div
    className={Styles.COLOR_CELL_CONTAINER}
    style={{
      backgroundColor: `${cellData}`,
    }}
  />
);

export default ColorCell;
