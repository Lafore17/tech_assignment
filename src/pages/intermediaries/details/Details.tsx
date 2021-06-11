import React from "react";
import {
  Form,
  Formik,
  FormikProps,
  FormikValues,
  Field,
  ErrorMessage,
} from "formik";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { getValidation } from "./validation";
import { RangeFields, DropdownFields } from "./components";
import { Schema } from "./types";
import styles from "./Details.module.css";

const Details: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ id: string }>();

  const handleCancel = () => {
    history.push("/intermediaries");
  };

  // FOR EDITING
  // React.useEffect(() => {
  //   fetch(endpoints.getIntermediary(+params.id))
  //     .then((response) => response.json())
  //     .then((data: Intermediary) =>
  //       // check type
  //       setFormData({ order: data.order, name: data.name, type: "" })
  //     )
  //     .catch((error) => console.warn(error));
  // }, []);

  return (
    <div>
      <h1>Form Details</h1>
      <Formik
        initialValues={getValidation().initialValues}
        validationSchema={getValidation().schema}
        onSubmit={() => {}}
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
            <ErrorMessage
              name="name"
              render={(message) => (
                <div style={{ color: "red" }}>{message}</div>
              )}
            />
            <Field
              name="order"
              placeholder="Order"
              type="number"
              className={styles.formItem}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <ErrorMessage
              name="order"
              render={(message) => (
                <div style={{ color: "red" }}>{message}</div>
              )}
            />
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
            <ErrorMessage
              name="type"
              render={(message) => (
                <div style={{ color: "red" }}>{message}</div>
              )}
            />
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
