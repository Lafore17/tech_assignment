import { object, string, number, ref, array } from "yup";
import { GetValidation } from "../types";

// TODO Remove 0 from here
export const getValidation: GetValidation = () => {
  const schema = object().shape({
    name: string().default("").required("Required"),
    order: number().default(0).integer().positive().required("Required"),
    type: string().default("").required("Required"),
    from: number()
      .default(0)
      .when("type", {
        is: "range",
        then: number().required("Required"),
      }),
    to: number()
      .default(0)
      .when("type", {
        is: "range",
        then: number().moreThan(ref("from")).required("Required"),
      }),
    step: number()
      .default(0)
      .when("type", {
        is: "range",
        then: number().positive().required("Required"),
      }),
    options: array()
      .default([{ option: "", value: 0 }])
      .of(
        object().shape({
          option: string().required("Required"),
          value: number().required("Required"),
        })
      )
      .when("type", {
        is: "dropdown",
        then: array().required("Required"),
      }),
  });

  return { schema, initialValues: schema.cast({}) };
};
