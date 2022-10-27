import Link from "next/link";
import InfoIcon from "../icons/Info";
import Button from "../shared/Button";

type InfoMessageProps = {
  children: React.ReactNode;
};

const InfoMessage = ({ children }: InfoMessageProps) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="p-8 w-[480px] max-w-full border rounded border-marine-900/50 bg-gradient-to-r from-marine-600/10 to-carbon-700 drop-shadow">
          <div className="flex items-center w-full overflow-hidden gap-x-8">
            <InfoIcon className="flex-shrink-0 w-8 h-8 fill-transparent stroke-marine-100" />
            <div className="flex flex-col flex-1 gap-y-2">{children}</div>
          </div>
        </div>
        <Link href={{ pathname: "/lists" }}>
          <Button
            label="Back to main page"
            className="px-4 py-4 mt-8 text-white"
            variety="secondary"
          />
        </Link>
      </div>
    </div>
  );
};

export default InfoMessage;
