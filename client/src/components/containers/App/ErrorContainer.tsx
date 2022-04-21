import { observer } from "mobx-react-lite";
import useStore from "../../../stores/useStore";
import Error from "../../presentations/App/Error";

const { errorStore } = useStore();

const RELOAD_BUTTON_NAME = "Reload";
const CONTINUE_BUTTON_NAME = "Continue";

const continueButtonOnClick = () => errorStore.setError(null);

const ErrorContainer = () =>
  errorStore.error ? (
    <Error
      error={errorStore.error}
      reloadButtonName={RELOAD_BUTTON_NAME}
      continueButtonName={CONTINUE_BUTTON_NAME}
      continueButtonOnClick={continueButtonOnClick}
    />
  ) : null;

export default observer(ErrorContainer);
