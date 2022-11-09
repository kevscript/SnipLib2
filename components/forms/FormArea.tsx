import FormError from "./FormError";

type FormAreaProps = {
  name: string;
  label: string;
  value: string;
  handleValue: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) => void;
  errors: string[] | null;
  className?: string;
};

const FormArea = ({
  name,
  label,
  value,
  handleValue,
  errors,
  className = "",
}: FormAreaProps) => {
  return (
    <label htmlFor={name} className="flex flex-col flex-1">
      <span className="ml-2 text-sm font-bold">{label}</span>
      <textarea
        value={value}
        name={name}
        onChange={(e) => handleValue(e, name)}
        className={`min-h-[40px] h-24 p-2 mt-2 outline-none rounded-sm border  bg-carbon-400 ${
          errors && errors.length > 0
            ? "border-red-500 focus:border-red-500"
            : "border-transparent focus:border-marine-500"
        } ${className}`}
      />
      <FormError errors={errors && errors.length > 0 ? errors : null} />
    </label>
  );
};

export default FormArea;
