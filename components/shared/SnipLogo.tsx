type SnipLogoProps = {
  stage?: 2 | 3;
};

const SnipLogo = ({ stage }: SnipLogoProps) => {
  if (stage === 2) {
    return (
      <div className="flex items-center cursor-pointer flex-nowrap gap-x-2">
        <div className="flex items-center justify-center w-8 h-8 border rounded-sm border-marine-100 bg-marine-500">
          <span className="font-black drop-shadow-sm">SL</span>
        </div>
        <h5 className="text-2xl font-black leading-none">SnipLib</h5>
      </div>
    );
  }

  if (stage === 3) {
    return (
      <div className="flex items-center cursor-pointer flex-nowrap gap-x-2">
        <div className="flex items-center justify-center w-8 h-8 border rounded-sm border-marine-100 bg-marine-500">
          <span className="font-black drop-shadow-sm">SL</span>
        </div>
        <div className="flex flex-col justify-center flex-1 h-8 flex-nowrap">
          <h5 className="text-sm font-black leading-tight">SnipLib</h5>
          <h6 className="text-xs leading-tight text-gray-400">
            Your cloud snippet library
          </h6>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-8 h-8 border rounded-sm cursor-pointer border-marine-100 bg-marine-500">
      <span className="font-black drop-shadow-sm">SL</span>
    </div>
  );
};

export default SnipLogo;
