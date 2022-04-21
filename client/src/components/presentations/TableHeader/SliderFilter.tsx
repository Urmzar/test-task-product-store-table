import { Row, Col, Button, Slider, InputNumber } from "antd";
import { FC } from "react";
import { Range } from "../../../stores/rangeStore/RangeModel";
import Styles from "../../../styles";
import "./.less/Filter.less";

interface Props {
  min: number;
  max: number;
  value: Range;
  onChangeLeft: (e: number) => void;
  onChangeRight: (e: number) => void;
  onChangeSlider: (e: Range) => void;
  setSliderFilter: () => void;
  reset: () => void;
}

const SliderFilter: FC<Props> = ({
  min,
  max,
  value,
  onChangeLeft,
  onChangeRight,
  onChangeSlider,
  setSliderFilter,
  reset,
}) => {
  return (
    <div className={Styles.SLIDER_FILTER_CONTAINER}>
      <Row gutter={8}>
        <Col span={12}>
          <InputNumber
            className={Styles.FILTER_INPUT}
            min={min}
            max={max}
            value={value[0]}
            onChange={onChangeLeft}
          />
        </Col>
        <Col span={12}>
          <InputNumber
            className={Styles.FILTER_INPUT}
            min={min}
            max={max}
            value={value[1]}
            onChange={onChangeRight}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Slider range min={min} max={max} value={value} onChange={onChangeSlider} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Button
            className={Styles.FILTER_BUTTON}
            size={"small"}
            type="primary"
            onClick={setSliderFilter}>
            OK
          </Button>
        </Col>
        <Col span={12}>
          <Button className={Styles.FILTER_BUTTON} size={"small"} onClick={reset}>
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SliderFilter;
