import React from "react";
import Button from "@material-ui/core/Button";
import { FormikValues, FieldArray, FormikProps, Field } from "formik";
import { ErrorMessage } from "components";
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
  const {
    handleChange,
    handleBlur,
    values: { options = [] },
  } = formikProps;

  return options.length > 0 ? (
    <FieldArray
      name="options"
      render={(arrayHelpers) => (
        <div className={styles.inputsWrapper}>
          {options.map((option, index) => (
            // I've added the index here just because if I set any property from option
            // I'd get rerenders after each typing.
            <React.Fragment key={index}>
              <Field
                placeholder="Option"
                name={`options[${index}].option`}
                value={option.option !== null ? option.option : ""}
                className={inputClassName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage name={`options[${index}].option`} />
              <Field
                type="number"
                placeholder="Value"
                name={`options[${index}].value`}
                value={option.value !== null ? option.value : ""}
                className={inputClassName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage name={`options[${index}].value`} />
              <Button
                variant="outlined"
                disabled={options.length === 1}
                className={styles.addOptionButton}
                onClick={() => arrayHelpers.remove(index)}
              >
                Remove
              </Button>
            </React.Fragment>
          ))}
          <Button
            variant="outlined"
            className={styles.addOptionButton}
            onClick={() => {
              arrayHelpers.push({ option: "", value: null });
            }}
          >
            Add
          </Button>
        </div>
      )}
    />
  ) : null;
};

export default DropdownFields;
