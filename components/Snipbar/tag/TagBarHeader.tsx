export type TagBarHeaderProps = {
  label: string;
};

const TagBarHeader = ({ label }: TagBarHeaderProps) => {
  return (
    <div className="flex flex-col px-8 pb-8">
      <span className="text-xs font-bold uppercase text-carbon-300">Tag</span>
      <div className="flex justify-between mt-4 flex-nowrap">
        <span className="font-bold">{"#" + label}</span>
      </div>
    </div>
  );
};

export default TagBarHeader;
