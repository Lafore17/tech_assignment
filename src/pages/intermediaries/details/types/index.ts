import { ObjectSchema } from "yup";

export interface Schema {
  name: string;
  type: string;
  order: number;
  from: number;
  to: number;
  step: number;
  options: { option: string; value: number }[];
}

export type GetValidation = () => {
  schema: ObjectSchema<Schema>;
  initialValues: Schema;
};
