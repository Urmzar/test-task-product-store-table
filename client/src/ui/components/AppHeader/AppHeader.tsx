import { Header } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import Styles from "../../styles";

const AppHeader = () => (
  <Header className={Styles.APP_HEADER_CONTAINER}>
    <Title className={Styles.APP_HEADER_TITLE} level={5}>
      productStore table
    </Title>
  </Header>
);

export default AppHeader;
