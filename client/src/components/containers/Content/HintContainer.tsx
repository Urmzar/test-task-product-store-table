import Styles from "../../../styles";
import "./.less/HintContainer.less";

const HINT_MESSAGE = "Double click on table row to edit product";

const HintContainer = () => (
  <div className={Styles.HINT_CONTAINER}>
    <span>*</span>&nbsp;{HINT_MESSAGE}
  </div>
);

export default HintContainer;
