import { ChangeEvent } from "react";
import FormError from "./FormError";

type FormInputNumberProps = {
  label: string;
  name: string;
  value: number;
  errors: string[] | null;
  handleValue: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
  autoFocus?: boolean;
  className?: string;
  min?: number;
  max?: number;
};

const FormInputNumber = ({
  label,
  name,
  min,
  max,
  value,
  errors,
  handleValue,
  autoFocus = false,
  className = "",
}: FormInputNumberProps) => {
  return (
    <label htmlFor={name} className="flex flex-col">
      <span className="ml-2 text-sm font-bold">{label}</span>
      <input
        type="number"
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={(e) => handleValue(e, name)}
        className={`h-10 px-2 mt-2 outline-none rounded-sm border  bg-carbon-400 ${
          errors && errors.length > 0
            ? "border-red-500 focus:border-red-500"
            : "border-transparent focus:border-marine-500"
        } ${className}`}
        autoFocus={autoFocus}
      />
      <FormError errors={errors && errors.length > 0 ? errors : null} />
    </label>
  );
};

export default FormInputNumber;
