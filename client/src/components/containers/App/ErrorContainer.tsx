import { observer } from "mobx-react-lite";
import useStore from "../../../stores/useStore";
import Error from "../../presentations/App/Error";

const { errorStore } = useStore();

const continueButtonOnClick = () => errorStore.setError(null);

const ErrorContainer = () =>
  errorStore.error ? (
    <Error error={errorStore.error} continueButtonOnClick={continueButtonOnClick} />
  ) : null;

export default observer(ErrorContainer);
