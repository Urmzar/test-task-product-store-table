import "./App.less";
import { Layout } from "antd";
import Styles from "./styles";
import HeaderContainer from "./components/containers/App/HeaderContainer";
import ContentContainer from "./components/containers/App/ContentContainer";
import ErrorContainer from "./components/containers/App/ErrorContainer";

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
