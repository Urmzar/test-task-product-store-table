import { Row, Col } from "antd";
import { Content } from "antd/lib/layout/layout";
import Styles from "../../styles";
import Datatable from "../Datatable";
import Toolbar from "../Toolbar";

const ContentContainer = () => (
  <Content className={Styles.CONTENT_CONTAINER}>
    <div>
      <Row className="toolbar-container" justify="end">
        <Toolbar />
      </Row>
      <Row>
        <Col>
          <Datatable />
        </Col>
      </Row>
      <Row className="hint">
        <span>*</span>&nbsp;Double click on table row to edit product
      </Row>
    </div>
  </Content>
);

export default ContentContainer;
