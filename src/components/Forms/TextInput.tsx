import React from "react";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  return (
    <label className="block w-full">
      <div className="w-fit bg-blue-900 px-2 font-semibold">{label}</div>
      <input
        className="w-full border border-blue-900 bg-blue-200 px-2 py-1 text-blue-900 outline-none"
        {...props}
      />
    </label>
  );
};
