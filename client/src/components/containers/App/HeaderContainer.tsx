import { Header } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import Styles from "../../../styles";
import "./.less/HeaderContainer.less";

const HeaderContainer = () => (
  <Header className={Styles.HEADER_CONTAINER}>
    <Title className={Styles.HEADER_TITLE} level={5}>
      productStore table
    </Title>
  </Header>
);

export default HeaderContainer;
