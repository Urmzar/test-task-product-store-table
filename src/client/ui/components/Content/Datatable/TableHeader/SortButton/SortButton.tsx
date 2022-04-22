import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Row } from "antd";
import { FC } from "react";
import { IconColor } from "../../../../../containers/Content/Datatable/HeaderRenderers";
import Styles from "../../../../../styles";

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
