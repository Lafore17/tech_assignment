import { object, string, number, ref, array } from "yup";
import { GetValidation, GetInitialValues } from "../types";

// for editing and creation
export const getInitialValues: GetInitialValues = (editedIntermediary) => {
  const checkForExistingAndNull = (field: string) => {
    return editedIntermediary && editedIntermediary[field] !== null
      ? editedIntermediary[field]
      : null;
  };

  return {
    name: editedIntermediary?.name || "",
    type: editedIntermediary?.type || "",
    order: checkForExistingAndNull("order"),
    from: checkForExistingAndNull("from"),
    to: checkForExistingAndNull("to"),
    step: checkForExistingAndNull("step"),
    options: editedIntermediary?.options || [{ option: "", value: null }],
  };
};

// id equals 'new' or any number
export const getValidation: GetValidation = (from, step) => {
  const decimalDigitsError =
    "The field must have 6 digits after decimal or less";

  const schema = object().shape({
    name: string().required("Required"),
    type: string().required("Required"),
    order: number().integer().nullable().required("Required"),
    from: number()
      .nullable()
      .when("type", {
        is: "range",
        then: number()
          .required("Required")
          .lessThan(ref("to"), "must be less then 'to'")
          .test("maxAfterDecimal", decimalDigitsError, (number: string) =>
            /^\d+(\.\d{1,6})?$/.test(number)
          )
          .test(
            "fromValidation",
            "new value isn't valid",
            // not array function because of *this*
            function (value: number) {
              if (from !== undefined) {
                return Number.isInteger(
                  parseFloat(((from - value) / this.parent.step).toFixed(2))
                );
              }

              return true;
            }
          ),
      }),
    to: number()
      .nullable()
      .when("type", {
        is: "range",
        then: number()
          .required("Required")
          .moreThan(ref("from"), "must be greater then 'from'")
          .test("maxAfterDecimal", decimalDigitsError, (number: string) =>
            /^\d+(\.\d{1,6})?$/.test(number)
          ),
      }),
    step: number()
      .nullable()
      .when("type", {
        is: "range",
        then: number()
          .required("Required")
          .positive("Please set a positive number")
          .test(
            "stepValidation",
            "the value can't be decreased",
            (value: number) => {
              if (step !== undefined) return value >= step;

              return true;
            }
          )
          .test("maxAfterDecimal", decimalDigitsError, (number: string) =>
            /^\d+(\.\d{1,6})?$/.test(number)
          ),
      }),
    options: array()
      .of(object().shape({ option: string(), value: number().nullable() }))
      .when("type", {
        is: "dropdown",
        then: array()
          .of(
            object().shape({
              option: string().required("Required"),
              value: number()
                .required("Required")
                .test("maxAfterDecimal", decimalDigitsError, (number: string) =>
                  /^\d+(\.\d{1,6})?$/.test(number)
                ),
            })
          )
          .required("Required"),
      }),
  });

  return schema;
};
