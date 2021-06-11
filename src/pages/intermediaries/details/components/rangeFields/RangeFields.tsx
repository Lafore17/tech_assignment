import React from "react";
import clsx from "clsx";
import { FormikValues, FormikProps, Field } from "formik";
import { Schema } from "../../types";
import styles from "./RangeFields.module.css";

interface RangeFieldsProps {
  inputClassName?: string;
  formikProps: FormikProps<Schema & FormikValues>;
}

const RangeFields: React.FC<RangeFieldsProps> = ({
  inputClassName,
  formikProps,
}) => {
  const { handleChange, handleBlur } = formikProps;

  return (
    <div className={styles.wrapper}>
      <Field
        name="from"
        placeholder="From"
        type="number"
        step={0.000001}
        className={clsx(inputClassName, styles.field)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Field
        name="to"
        placeholder="To"
        type="number"
        step={0.000001}
        className={clsx(inputClassName, styles.field)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Field
        name="step"
        placeholder="Step"
        type="number"
        step={0.000001}
        className={clsx(inputClassName, styles.field)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default RangeFields;
