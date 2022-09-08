export type BranchProps = {
  short?: boolean;
  active?: boolean;
};

const Branch = ({ short = false, active = false }: BranchProps) => {
  return (
    <div
      className={`flex place-items-end translate-x-2 -translate-y-[26px]
      `}
    >
      <div className={`w-[2px] bg-carbon-400 ${short ? "h-6" : "h-10"}`}></div>
      <div
        className={`w-[14px] h-[2px] ${active ? "bg-marine" : "bg-carbon-400"}`}
      ></div>
    </div>
  );
};

export default Branch;
