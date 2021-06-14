import React from "react";
import { ErrorMessage as FormikErrorMessage } from "formik";

interface ErrorMessageProps {
  name: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ name }) => {
  return (
    <FormikErrorMessage
      name={name}
      render={(message) => <div style={{ color: "red" }}>{message}</div>}
    />
  );
};

export default ErrorMessage;
