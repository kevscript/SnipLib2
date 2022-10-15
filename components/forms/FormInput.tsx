import { ChangeEvent } from "react";
import FormError from "./FormError";

type FormInputProps = {
  label: string;
  name: string;
  type?: "string" | "number";
  value: string | number;
  errors: string[] | null;
  handleValue: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
  autoFocus?: boolean;
  className?: string;
};

const FormInput = ({
  label,
  name,
  type = "string",
  value,
  errors,
  handleValue,
  autoFocus = false,
  className = "",
}: FormInputProps) => {
  return (
    <label htmlFor={name} className="flex flex-col flex-1">
      <span className="ml-2 text-sm font-bold">{label}</span>
      <input
        name={name}
        type={type}
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

export default FormInput;
