export type SnipbarHeaderProps = {};

const SnipbarHeader = ({}: SnipbarHeaderProps) => {
  return (
    <div className="flex flex-col px-8 pb-8">
      <span className="text-xs font-bold uppercase text-carbon-300">
        Collection
      </span>
      <div className="flex justify-between mt-4 flex-nowrap">
        <span className="font-bold">Testing</span>
        <ul className="flex items-center flex-nowrap gap-x-4">
          <li className="w-4 h-4 rounded-full cursor-pointer bg-marine-500"></li>
          <li className="w-4 h-4 rounded-full cursor-pointer bg-marine-500"></li>
          <li className="w-4 h-4 rounded-full cursor-pointer bg-marine-500"></li>
        </ul>
      </div>
    </div>
  );
};

export default SnipbarHeader;
