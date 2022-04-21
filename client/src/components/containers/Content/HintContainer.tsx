import Styles from "../../../styles";
import "./.less/HintContainer.less";

const HintContainer = () => (
  <div className={Styles.HINT_CONTAINER}>
    <span>*</span>&nbsp;Double click on table row to edit product
  </div>
);

export default HintContainer;
