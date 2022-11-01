import { ReactNode } from "react";

type BarHeaderWrapperProps = {
  children?: ReactNode;
  title: string;
  label: string;
};

const BarHeaderWrapper = ({
  children,
  title,
  label,
}: BarHeaderWrapperProps) => {
  return (
    <div className="flex flex-col p-8 border-b-2 border-carbon-600">
      <span className="text-xs font-bold uppercase text-carbon-300">
        {title}
      </span>
      <div className="flex justify-between mt-2 flex-nowrap">
        <span className="font-bold">{label}</span>
        {children}
      </div>
    </div>
  );
};

export default BarHeaderWrapper;
