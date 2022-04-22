import { observer } from "mobx-react-lite";
import useStore from "../../../stores";
import Error from "../../components/Error/Error";

const { errorStore } = useStore();

const continueButtonOnClick = () => errorStore.setError(null);

const ErrorContainer = () => (
  <Error error={errorStore.error} continueButtonOnClick={continueButtonOnClick} />
);

export default observer(ErrorContainer);
