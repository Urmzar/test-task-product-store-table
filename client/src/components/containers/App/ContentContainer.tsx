import { Content } from "antd/lib/layout/layout";
import { observer } from "mobx-react-lite";
import useStore from "../../../stores/useStore";
import Styles from "../../../styles";
import DatatableContainer from "../Content/DatatableContainer";
import HintContainer from "../Content/HintContainer";
import ToolbarContainer from "../Content/ToolbarContainer";
import "./.less/ContentContainer.less";

const { errorStore } = useStore();

const ContentContainer = () =>
  errorStore.error ? null : (
    <Content className={Styles.CONTENT_CONTAINER}>
      <ToolbarContainer />
      <DatatableContainer />
      <HintContainer />
    </Content>
  );

export default observer(ContentContainer);
