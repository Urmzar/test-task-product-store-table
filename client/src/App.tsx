import "./App.less";
import { observer } from "mobx-react-lite";
import { Col, Row, Typography, Layout } from "antd";
import useStore from "./store/useStore";
import Datatable from "./components/Datatable";
import ErrorDisplay from "./components/ErrorDispaly";
import Toolbar from "./components/Toolbar";

const { Header, Content } = Layout;
const { Title } = Typography;

const { errorStore } = useStore();

const App = () => {
  return (
    <div className="wrapper">
      <Layout className="layout-container">
        <Header className="header">
          <Title className="title" level={5}>
            productStore table
          </Title>
        </Header>
        <Content className="content-container">
          {errorStore.error ? (
            <ErrorDisplay />
          ) : (
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
          )}
        </Content>
      </Layout>
    </div>
  );
};

export default observer(App);
