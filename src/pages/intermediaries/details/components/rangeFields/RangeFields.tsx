import React from "react";
import clsx from "clsx";
import { FormikValues, FormikProps, Field } from "formik";
import { ErrorMessage } from "components";
import { Schema } from "../../types";
import styles from "./RangeFields.module.css";

const STEP = 0.000001;

interface RangeFieldsProps {
  inputClassName?: string;
  formikProps: FormikProps<Schema & FormikValues>;
}

const RangeFields: React.FC<RangeFieldsProps> = ({
  inputClassName,
  formikProps,
}) => {
  const { values, handleChange, handleBlur } = formikProps;

  return (
    <div className={styles.wrapper}>
      <Field
        name="from"
        placeholder="From"
        type="number"
        step={STEP}
        value={values.from !== null ? values.from : ""}
        className={clsx(inputClassName, styles.field)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <ErrorMessage name="from" />
      <Field
        name="to"
        placeholder="To"
        type="number"
        step={STEP}
        value={values.to !== null ? values.to : ""}
        className={clsx(inputClassName, styles.field)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <ErrorMessage name="to" />
      <Field
        name="step"
        placeholder="Step"
        type="number"
        step={STEP}
        value={values.step !== null ? values.step : ""}
        className={clsx(inputClassName, styles.field)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <ErrorMessage name="step" />
    </div>
  );
};

export default RangeFields;
