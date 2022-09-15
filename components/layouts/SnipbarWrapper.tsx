import Snipbar from "../Snipbar";

export type SnipbarWrapperProps = {
  children: React.ReactNode;
};

const SnipbarWrapper = ({ children }: SnipbarWrapperProps) => {
  return (
    <div className="flex w-full flex-nowrap">
      <Snipbar />
      {children}
    </div>
  );
};

export default SnipbarWrapper;
