import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  "flex h-fit shrink-0 items-center justify-center gap-2 font-semibold text-lg leading-[100%] ",
  {
    variants: {
      variant: {
        primary: "bg-blue-900  text-blue-200   ",
        secondary: "",
      },

      disabled: {
        true: "disabled:bg-blue-200 disabled:text-blue-900/[.50]",
        false: "",
      },
      size: {
        big: " p-2",
        medium: "",
        small: "",
      },
      fullWidth: { true: "w-full tracking-wider ", false: "w-fit" },
    },
    defaultVariants: {
      variant: "primary",
      size: "big",
      fullWidth: false,
      disabled: false,
    },
  },
);

type TbuttonProps = VariantProps<typeof buttonStyles> & {
  text: string;
  onClick?: () => void;
  onHover?: () => void;
  className?: string;
  type?: "reset" | "submit" | "button";
};

export const Button = ({
  text,
  onClick,
  className,
  type,
  ...rest
}: TbuttonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseOver={rest.onHover}
      className={twMerge(buttonStyles(rest), className)}
      disabled={rest.disabled ?? undefined}
    >
      {text}
    </button>
  );
};
