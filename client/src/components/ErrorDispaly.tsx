import { Button, Result } from "antd";
import useStore from "../store/useStore";

const { errorStore } = useStore();

const ErrorDisplay = () => (
  <Result
    status="error"
    title="An error has occured"
    subTitle={errorStore.error}
    extra={[
      <Button href="http://localhost:8080/" type="primary" key="error-reload-button">
        Reload
      </Button>,
      <Button type="primary" key="error-continue-button" onClick={() => errorStore.setError(null)}>
        Continue
      </Button>,
    ]}></Result>
);

export default ErrorDisplay;
