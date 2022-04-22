import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import useStore from "../../stores";
import Styles from "../styles";
import AppHeader from "../components/AppHeader/AppHeader";
import ContentContainer from "./Content/ContentContainer";
import ErrorContainer from "./Error/ErrorContainer";

const { errorStore } = useStore();

const App = () => (
  <div className={Styles.WRAPPER}>
    <Layout className={Styles.APP_CONTAINER}>
      <AppHeader />
      {errorStore.error ? <ErrorContainer /> : <ContentContainer />}
    </Layout>
  </div>
);

export default observer(App);
