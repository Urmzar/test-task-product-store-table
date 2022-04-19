import { Button, Result } from "antd";
import { FC } from "react";

interface ErrorDisplayProps {
  error: string;
  reloadButtonName: string;
  continueButtonName: string;
  continueButtonOnClick: () => void;
}

const ErrorDisplay: FC<ErrorDisplayProps> = ({
  error,
  reloadButtonName,
  continueButtonName,
  continueButtonOnClick,
}) => (
  <Result
    status="error"
    title="An error has occured"
    subTitle={error}
    extra={[
      <Button href="http://localhost:8080/" type="primary" key="error-reload-button">
        {reloadButtonName}
      </Button>,
      <Button type="primary" key="error-continue-button" onClick={continueButtonOnClick}>
        {continueButtonName}
      </Button>,
    ]}></Result>
);

export default ErrorDisplay;
