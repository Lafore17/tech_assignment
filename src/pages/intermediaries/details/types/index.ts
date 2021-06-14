import { ObjectSchema } from "yup";
import { Intermediary } from "types";

export interface Schema {
  name: string;
  type: string;
  order: number | null;
  from: number | null;
  to: number | null;
  step: number | null;
  options: { option: string; value: number | null }[];
}

export type GetInitialValues = (
  editedIntermediary: Intermediary | undefined
) => Schema;

export type GetValidation = (
  from: number | undefined,
  stepValue: number | undefined
) => ObjectSchema<Schema>;
