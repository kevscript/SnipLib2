type FormErrorProps = {
  errors: string[] | null;
};

const FormError = ({ errors }: FormErrorProps) => {
  return (
    <>
      {errors && errors.length > 0 && (
        <div className="flex flex-col mt-2 text-sm text-red-500">
          {errors.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default FormError;
