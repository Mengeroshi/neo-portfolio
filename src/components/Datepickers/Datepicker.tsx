"use client";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Label } from "../Forms/Label";

const range = (start: number, end: number, step: number) => {
  const output = [];
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export const Datepicker = ({
  label,
  required,
  errorMessage,
}: {
  label: string;
  required?: boolean;
  errorMessage?: string;
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const years = range(2018, new Date().getFullYear() + 1, 1);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <Label name={label} required={required} errorMessage={errorMessage}>
      <ReactDatePicker
        dateFormat="dd-MM-YYYY"
        wrapperClassName="w-full"
        calendarClassName="!bg-blue-200 !border-blue-900 !rounded-none [&_*]:!text-blue-900 [&_*]:!bg-blue-200   [&_*]:!font-sans"
        className="w-full border border-blue-900 bg-blue-200 px-2 py-1 text-blue-900 outline-none"
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div className="flex justify-center gap-2 px-2">
            <select
              className="flex-1 border border-blue-900 px-2 py-1 text-sm"
              value={new Date(date).getFullYear()}
              onChange={({ target: { value } }) => changeYear(Number(value))}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              className="flex-1 border border-blue-900 px-2 py-1 text-sm"
              value={months[new Date(date).getMonth()]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        selected={startDate}
        onChange={(date) => {
          if (date) {
            setStartDate(date);
          }
        }}
      />
    </Label>
  );
};
