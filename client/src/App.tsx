import "./App.less";
import { Layout } from "antd";
import Styles from "./styles";
import HeaderContainer from "./components/containers/HeaderContainer";
import ErrorContainer from "./components/containers/ErrorContainer";
import ContentContainer from "./components/containers/ContentContainer";

const App = () => {
  return (
    <Layout className={Styles.WRAPPER}>
      <Layout className={Styles.APP_CONTAINER}>
        <HeaderContainer />
        <ErrorContainer />
        <ContentContainer />
      </Layout>
    </Layout>
  );
};

export default App;
