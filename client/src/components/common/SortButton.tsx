import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Row } from "antd";
import { FC } from "react";
import Styles from "../../styles";
import { IconColor } from "../containers/Content/DatatableContainer/HeaderRenderers";
import "./.less/SortButton.less";

interface Props {
  upColor: IconColor;
  downColor: IconColor;
  onClick: () => void;
}

const SortButton: FC<Props> = ({ onClick, upColor, downColor }) => (
  <div className={Styles.SORT_ICON_CONTAINER} onClick={() => onClick()}>
    <Row>
      <CaretUpOutlined
        style={{
          color: upColor,
        }}
      />
    </Row>
    <Row>
      <CaretDownOutlined
        style={{
          color: downColor,
        }}
      />
    </Row>
  </div>
);

export default SortButton;
