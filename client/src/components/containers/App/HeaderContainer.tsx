import { Header } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import Styles from "../../../styles";
import "./.less/HeaderContainer.less";

const TABLE_NAME = "productStore table";

const HeaderContainer = () => (
  <Header className={Styles.HEADER_CONTAINER}>
    <Title className={Styles.HEADER_TITLE} level={5}>
      {TABLE_NAME}
    </Title>
  </Header>
);

export default HeaderContainer;
