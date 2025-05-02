import {
  type FieldError,
  type FieldErrors,
  type FieldValues,
} from "react-hook-form";
import { type ZodType, type ZodTypeDef } from "zod";
import { type TZSAError } from "zsa";

export const handleExecuteSubmit = <
  zodSchema extends ZodType<unknown, ZodTypeDef, unknown> | undefined,
  T,
>(
  error: TZSAError<zodSchema> | null,
  onErrorMessage: (message: string) => void,
  setFormError: (name: string, error: FieldError) => void,
  response: T | null,
  onSuccess: (response: NonNullable<T>) => void,
) => {
  if (error) {
    onErrorMessage(error.message);

    if (error.name === "ZodError") {
      Object.entries(error.fieldErrors ?? {}).forEach(([key, value]) => {
        setFormError(key, {
          type: "custom",
          message:
            Array.isArray(value) && typeof value[0] === "string"
              ? value[0]
              : "Unknown error",
        });
      });
    }
  } else {
    if (response) {
      onSuccess(response);
    }
  }
};

export const getErrorMessage = (
  errors: FieldErrors<FieldValues>,
  fieldName: string,
) => {
  return typeof errors[fieldName]?.message === "string"
    ? (errors[fieldName] as FieldError).message
    : undefined;
};
