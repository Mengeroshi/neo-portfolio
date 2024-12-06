import React from "react";
import { Label } from "./Label";

type TextInputProps = React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  label: string;
  isTextArea?: boolean;
};

export const TextInput: React.FC<TextInputProps> = ({
  label,
  isTextArea = false,
  ...props
}) => {
  return (
    <Label name={label}>
      {isTextArea ? (
        <textarea
          aria-multiline
          className="w-full border border-blue-900 bg-blue-200 px-2 py-1 text-blue-900 outline-none"
          {...props}
        />
      ) : (
        <input
          className="w-full border border-blue-900 bg-blue-200 px-2 py-1 text-blue-900 outline-none"
          {...props}
        />
      )}
    </Label>
  );
};
