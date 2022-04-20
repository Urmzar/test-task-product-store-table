import { Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import Styles from "../../styles";
import "./.less/ContentContainer.less";
import DatatableContainer from "./DatatableContainer";
import ToolbarContainer from "./ToolbarContainer";

const ContentContainer = () => (
  <Content className={Styles.CONTENT_CONTAINER}>
    <ToolbarContainer />
    <DatatableContainer />
    <Row className="hint">
      <span>*</span>&nbsp;Double click on table row to edit product
    </Row>
  </Content>
);

export default ContentContainer;
