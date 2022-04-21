import { Button, Result } from "antd";
import { FC } from "react";

interface Props {
  error: string;
  continueButtonOnClick: () => void;
}

const Error: FC<Props> = ({ error, continueButtonOnClick }) => (
  <Result
    status="error"
    title="An error has occured"
    subTitle={error}
    extra={[
      <Button href="http://localhost:8080/" type="primary" key="error-reload-button">
        Reload
      </Button>,
      <Button type="primary" key="error-continue-button" onClick={continueButtonOnClick}>
        Continue
      </Button>,
    ]}></Result>
);

export default Error;
