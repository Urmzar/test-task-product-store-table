import { Row, Col } from "antd";
import { Content } from "antd/lib/layout/layout";
import Styles from "../../styles";
import Datatable from "../Datatable";
import Toolbar from "../presentations/Toolbar";
import "./.less/ContentContainer.less";
import ToolbarContainer from "./ToolbarContainer";

const ContentContainer = () => (
  <Content className={Styles.CONTENT_CONTAINER}>
    <ToolbarContainer />
    <Row>
      <Col>
        <Datatable />
      </Col>
    </Row>
    <Row className="hint">
      <span>*</span>&nbsp;Double click on table row to edit product
    </Row>
  </Content>
);

export default ContentContainer;
