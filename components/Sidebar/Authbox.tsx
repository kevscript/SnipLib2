import MoreIcon from "../icons/More";

const Authbox = () => {
  return (
    <div className="flex items-center justify-between w-full pt-8 mt-auto flex-nowrap">
      <div className="flex flex-nowrap">
        <div className="w-12 h-12 rounded-xl bg-marine"></div>
        <div className="flex flex-col justify-center ml-4">
          <span className="font-bold">kevscript</span>
          <span className="text-xs">kevscript@gmail.com</span>
        </div>
      </div>
      <div className="flex items-center justify-center w-6 h-full cursor-pointer group">
        <MoreIcon className="w-4 stroke-carbon-300 group-hover:stroke-white" />
      </div>
    </div>
  );
};

export default Authbox;
