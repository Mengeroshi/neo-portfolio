"use client";
import RSelect from "react-dropdown-select";
import { Label } from "../Forms/Label";

type TOption = string | object;

export const Select = ({
  label,
  placeholder,
  isMulti,
  options,
}: {
  label: string;
  placeholder?: string;
  isMulti?: boolean;
  options: TOption[];
}) => {
  return (
    <Label name={label}>
      <RSelect
        multi={isMulti}
        className="min-h-[unset] !border-blue-900 bg-blue-200 !px-2 !py-1 text-base text-blue-900 !outline-none [&_.react-dropdown-select-dropdown]:border-blue-900 [&_.react-dropdown-select-dropdown]:bg-blue-200 [&_.react-dropdown-select-item-selected]:border-blue-900 [&_.react-dropdown-select-item-selected]:!bg-blue-900 [&_.react-dropdown-select-item-selected]:!text-blue-200 [&_.react-dropdown-select-item]:!border-blue-900 [&_.react-dropdown-select-option-remove]:hover:!text-blue-200 [&_.react-dropdown-select-option]:bg-blue-900 [&_.react-dropdown-select-option]:text-blue-200 [&_.react-dropdown-select-option]:!opacity-100"
        placeholder={placeholder}
        options={options}
        labelField="name"
        valueField="id"
        values={[]}
        onChange={(value) => console.log({ value })}
      />
    </Label>
  );
};
