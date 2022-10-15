import { ChangeEvent, ReactNode } from "react";
import FormError from "./FormError";

type FormSelectProps = {
  label: string;
  name: string;
  type?: "string" | "number";
  value: string | number;
  errors: string[] | null;
  handleValue: (e: ChangeEvent<HTMLSelectElement>, name: string) => void;
  autoFocus?: boolean;
  children: ReactNode;
  className?: string;
};

const FormSelect = ({
  label,
  name,
  handleValue,
  value,
  errors,
  children,
  className = "",
}: FormSelectProps) => {
  return (
    <label htmlFor={name} className="flex flex-col">
      <span className="ml-2 text-sm font-bold">{label}</span>
      <select
        name={name}
        value={value}
        onChange={(e) => handleValue(e, name)}
        className={`h-10 px-2 mt-2 outline-none rounded-sm border min-w-[128px] bg-carbon-400 ${
          errors && errors.length > 0
            ? "border-red-500 focus:border-red-500"
            : "border-transparent focus:border-marine-500"
        } ${className}`}
      >
        {children}
      </select>
      <FormError errors={errors && errors.length > 0 ? errors : null} />
    </label>
  );
};

export default FormSelect;
