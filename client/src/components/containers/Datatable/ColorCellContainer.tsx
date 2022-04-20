import { FC } from "react";
import Styles from "../../../styles";
import "./.less/ColorCellContainer.less";

interface Props {
  cellData: string;
}

const ColorCellContainer: FC<Props> = ({ cellData }) => (
  <div
    className={Styles.COLOR_CELL_CONTAINER}
    style={{
      backgroundColor: `${cellData}`,
    }}
  />
);

export default ColorCellContainer;
