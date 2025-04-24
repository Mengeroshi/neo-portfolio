import { twMerge } from "tailwind-merge";

export const LabelWithUnderLine = ({
  label,
  children,
  classNames,
}: {
  label: string;
  children: React.ReactNode;
  classNames?: {
    label?: string;
    children?: string;
  };
}) => {
  return (
    <div className="flex h-fit w-full flex-col">
      <div
        className={twMerge(
          "mb-1 border-y border-blue-900/40 bg-blue-200 px-4 text-sm leading-none tracking-widest text-blue-900/40",
          classNames?.label,
        )}
      >
        {label}
      </div>
      <div className={twMerge("px-4", classNames?.children)}>{children}</div>
    </div>
  );
};
