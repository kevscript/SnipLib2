import { HTMLProps } from "react";

type ButtonProps = {
  label: string;
  type?: "button" | "submit" | "reset" | undefined;
  variety?: "primary" | "secondary" | "ternary";
  className?: string;
} & HTMLProps<HTMLButtonElement>;

const Button = ({
  label,
  onClick,
  type = "button",
  variety = "primary",
  className,
  ...restProps
}: ButtonProps) => {
  const customStyles =
    variety === "primary"
      ? "bg-marine-500 hover:bg-marine-600 drop-shadow-sm disabled:bg-carbon-400 disabled:text-gray-400"
      : variety === "secondary"
      ? "bg-carbon-500 hover:bg-carbon-400 drop-shadow-sm disabled:text-gray-400"
      : "bg-transparent hover:underline underline-offset-4 text-gray-300 hover:text-white disabled:text-gray-400 disabled:no-underline";

  return (
    <button
      {...restProps}
      onClick={onClick}
      className={`px-3 py-1 rounded-sm min-w-[64px] transition-all ${customStyles} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
