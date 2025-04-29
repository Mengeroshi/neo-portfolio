import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  "flex h-fit shrink-0 items-center justify-center gap-2 font-semibold text-lg leading-[100%] ",
  {
    variants: {
      variant: {
        primary: "bg-blue-900  text-blue-200",
        secondary:
          " bg-blue-200 border border-blue-900/60 tracking-widest text-blue-900/40 hover:bg-blue-900/60 hover:border-blue-900/10 hover:text-blue-200",
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
  href?: string;
};

export const Button = ({
  text,
  onClick,
  className,
  type,
  href,
  ...rest
}: TbuttonProps) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <button
            type={type}
            onClick={onClick}
            onMouseOver={rest.onHover}
            className={twMerge(buttonStyles(rest), className)}
            disabled={rest.disabled ?? undefined}
          >
            {text}
          </button>
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          onMouseOver={rest.onHover}
          className={twMerge(buttonStyles(rest), className)}
          disabled={rest.disabled ?? undefined}
        >
          {text}
        </button>
      )}
    </>
  );
};
