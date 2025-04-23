import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const badgeStyles = cva(
  "w-fit cursor-pointer border border-blue-200 bg-blue-200 font-light tracking-wider text-blue-900",
  {
    variants: {
      color: {
        blue: "hover:text-blue-900 hover:bg-blue-200 hover:border-blue-900/40",
        red: "hover:text-red-900 hover:bg-red-200 hover:border-red-900/40 ",
      },

      size: {
        small: "px-2 py-1 text-xs",
      },
    },
    defaultVariants: {
      color: "blue",
      size: "small",
    },
  },
);

type TBadgeStyles = VariantProps<typeof badgeStyles> & {
  text: string;
  className?: string;
};

export const Badge = ({ text, className, ...rest }: TBadgeStyles) => {
  return <div className={twMerge(badgeStyles(rest), className)}>{text}</div>;
};
