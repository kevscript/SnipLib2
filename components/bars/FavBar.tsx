import Snippet from "@/models/Snippet";
import { langList } from "@/utils/langList";
import { motion } from "framer-motion";
import BarHeaderWrapper from "./BarHeaderWrapper";
import SnipItem from "./SnipItem";

type FavBarProps = {
  favSnippets: Snippet[] | undefined;
  activeSnippetId: string;
};

const FavBar = ({ favSnippets, activeSnippetId }: FavBarProps) => {
  return (
    <motion.div
      className="flex flex-col flex-shrink-0 h-screen overflow-hidden w-96 bg-carbon-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <BarHeaderWrapper title="snippets" label="Favorites" />

      {favSnippets && favSnippets.length > 0 && (
        <ul
          className="flex flex-col flex-1 overflow-y-auto"
          data-cy="active-list"
        >
          {favSnippets.map((snippet) => (
            <SnipItem
              key={snippet._id.toString()}
              snippet={snippet}
              isActive={activeSnippetId === snippet._id.toString()}
              path={`/favorites/${snippet._id.toString()}`}
              color={langList.find((l) => l.id === snippet.language)?.color}
            />
          ))}
        </ul>
      )}
      {favSnippets && favSnippets.length === 0 && (
        <div className="w-full p-8 text-sm bg-carbon-400">
          <span>No favorite snippets yet.</span>
        </div>
      )}
    </motion.div>
  );
};

export default FavBar;
