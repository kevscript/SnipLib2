import { collections } from "@/mocks/collections";
import SnipbarHeader from "./SnipbarHeader";
import SnipItem from "./SnipItem";

export type SnipbarProps = {};

const Snipbar = ({}: SnipbarProps) => {
  return (
    <div className="flex flex-col h-screen pt-8 overflow-hidden w-96 bg-carbon-500">
      <SnipbarHeader />
      <div className="w-full h-[2px] bg-carbon-600"></div>
      <ul className="flex flex-col flex-1 overflow-y-auto">
        {collections[0].snippets.map((snippet, i) => (
          <SnipItem key={snippet.id} snippet={snippet} />
        ))}
      </ul>
    </div>
  );
};

export default Snipbar;
