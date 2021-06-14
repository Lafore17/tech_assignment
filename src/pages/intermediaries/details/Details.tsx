import React from "react";
import { Form, Formik, FormikProps, FormikValues, Field } from "formik";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { endpoints } from "configs/endpoints";
import { ErrorMessage } from "components";
import { useFetch } from "hooks";
import { Intermediary } from "types";
import { getValidation, getInitialValues } from "./validation";
import { RangeFields, DropdownFields } from "./components";
import { Schema } from "./types";
import styles from "./Details.module.css";

const Details: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ id: string }>();

  const [intermediary, loading] = useFetch<Intermediary>({
    url: endpoints.getIntermediary(+params.id),
    condition: params.id !== "new",
  });

  const prepareData = (values: Schema) => {
    if (values.type === "range") {
      const { options, ...rest } = values;

      return rest;
    }

    const { to, from, step, ...rest } = values;

    return rest;
  };

  const handleCancel = () => {
    history.push("/intermediaries");
  };

  const handleSubmit = (values: Schema) => {
    const preparedData = prepareData(values);

    fetch(
      params.id === "new"
        ? endpoints.createIntermediary
        : endpoints.updateIntermediary(+params.id),
      {
        method: params.id === "new" ? "post" : "put",
        body: JSON.stringify(preparedData),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(() => history.push("/intermediaries"))
      .catch(() => {});
  };

  if (loading) return <CircularProgress />;

  return (
    <div className={styles.wrapper}>
      <h1>Form Details</h1>
      <Formik
        initialValues={getInitialValues(intermediary)}
        validationSchema={getValidation(intermediary?.from, intermediary?.step)}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<Schema & FormikValues>) => (
          <Form className={styles.form}>
            <Field
              name="name"
              placeholder="Name"
              maxLength={255}
              className={styles.formItem}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <ErrorMessage name="name" />
            <Field
              name="order"
              placeholder="Order"
              type="number"
              className={styles.formItem}
              value={props.values.order !== null ? props.values.order : ""}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <ErrorMessage name="order" />
            <Field
              name="type"
              as="select"
              placeholder="Type"
              disabled={params.id !== "new"}
              className={styles.formItem}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            >
              {/* TODO: Remove this empty option. */}
              <option value="">Select type</option>
              <option value="range">Range</option>
              <option value="dropdown">Dropdown</option>
            </Field>
            <ErrorMessage name="type" />
            {props.values.type === "range" && (
              <RangeFields
                formikProps={props}
                inputClassName={styles.formItem}
              />
            )}
            {props.values.type === "dropdown" && (
              <DropdownFields
                formikProps={props}
                inputClassName={styles.formItem}
              />
            )}
            <div className={styles.actions}>
              <Button
                type="submit"
                variant="outlined"
                className={styles.formAction}
              >
                Save
              </Button>
              <Button
                type="button"
                variant="outlined"
                className={styles.formAction}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Details;
