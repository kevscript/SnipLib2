import { motion } from "framer-motion";
import Link from "next/link";
import DangerIcon from "../icons/Danger";
import Button from "../shared/Button";

type ErrorMessageProps = {
  children: React.ReactNode;
};

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 w-[480px] max-w-full border rounded border-red-900/50 bg-gradient-to-r from-red-600/10 to-carbon-700 drop-shadow"
        >
          <div className="flex items-center w-full overflow-hidden gap-x-8">
            <DangerIcon className="w-8 h-8 fill-transparent stroke-red-600" />
            <div className="flex flex-col flex-1 gap-y-2">{children}</div>
          </div>
        </motion.div>
        <Link href={{ pathname: "/lists" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Button
              label="Back to main page"
              className="!px-8 !py-4 mt-8 text-white"
              variety="secondary"
            />
          </motion.div>
        </Link>
      </div>
    </div>
  );
};
export default ErrorMessage;
