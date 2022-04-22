import { Content } from "antd/lib/layout/layout";
import Hint from "../../components/Content/Hint/Hint";
import Styles from "../../styles";
import DatatableContainer from "./Datatable/DatatableContainer";
import ToolbarContainer from "./Toolbar/ToolbarContainer";

const ContentContainer = () => (
  <Content className={Styles.CONTENT_CONTAINER}>
    <div>
      <ToolbarContainer />
      <DatatableContainer />
      <Hint />
    </div>
  </Content>
);

export default ContentContainer;
