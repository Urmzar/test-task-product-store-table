import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Button, DatePicker } from "antd";
import { Moment } from "moment";
import { FC } from "react";
import Styles from "../../../styles";
import RangeValue from "rc-picker/lib/interface";
import "./.less/Filter.less";

const { RangePicker } = DatePicker;

interface Props {
  value: [Moment, Moment];
  disabledDate: (current: Moment) => boolean;
  onChange: (e: RangeValue.RangeValue<Moment>) => void;
  setDateFilter: () => void;
  reset: () => void;
}

const DateFilter: FC<Props> = ({ value, disabledDate, onChange, setDateFilter, reset }) => (
  <div className={Styles.DATE_FILTER_CONTAINER}>
    <Row>
      <Col span={24}>
        <RangePicker value={value} disabledDate={disabledDate} onChange={onChange} />
      </Col>
    </Row>
    <Row className={Styles.FILTER_BUTTON_CONTAINER} gutter={8}>
      <Col span={12}>
        <Button
          onClick={setDateFilter}
          className={Styles.FILTER_BUTTON}
          size={"small"}
          type="primary"
          icon={<SearchOutlined />}>
          Search
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

export default DateFilter;
