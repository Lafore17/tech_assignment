import React from "react";
import Button from "@material-ui/core/Button";
import {
  FormikValues,
  FieldArray,
  FormikProps,
  Field,
  ErrorMessage,
} from "formik";
import { Schema } from "../../types";
import styles from "./DropdownFields.module.css";

interface DropdownFieldsProps {
  inputClassName?: string;
  formikProps: FormikProps<Schema & FormikValues>;
}

const DropdownFields: React.FC<DropdownFieldsProps> = ({
  inputClassName,
  formikProps,
}) => {
  const { handleBlur, handleChange } = formikProps;

  return formikProps.values.options.length > 0 ? (
    <FieldArray
      name="options"
      render={(arrayHelpers) => (
        <div className={styles.inputsWrapper}>
          {formikProps.values.options.map((option, index) => (
            // I've added the index here just because if I set any property from option
            // I'd get rerenders after each typing.
            <React.Fragment key={index}>
              <Field
                placeholder="Option"
                name={`options[${index}].option`}
                className={inputClassName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage name={`options[${index}].option`} />
              <Field
                type="number"
                placeholder="Value"
                name={`options[${index}].value`}
                className={inputClassName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage name={`options[${index}].value`} />
            </React.Fragment>
          ))}
          <Button
            variant="outlined"
            className={styles.addOptionButton}
            onClick={() => arrayHelpers.push({ option: "", value: 0 })}
          >
            Add
          </Button>
        </div>
      )}
    />
  ) : null;
};

export default DropdownFields;
