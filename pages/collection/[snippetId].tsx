import Snipbar from "@/components/Snipbar";
import { useData } from "@/hooks/useData";
import { Snippet } from "@/mocks/snippets";
import { useEffect, useState } from "react";

const CollectionSnippetPage = () => {
  const {
    data,
    collectionIdOfActiveSnippet,
    activeSnippetId,
    activeCollectionId,
  } = useData();

  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    if (data) {
      const currActiveSnippet = data?.collections
        .find((c) => c.id === collectionIdOfActiveSnippet)
        ?.snippets.find((s) => s.id === activeSnippetId);
      currActiveSnippet && setActiveSnippet(currActiveSnippet);
    }
  }, [activeSnippet, activeSnippetId, collectionIdOfActiveSnippet, data]);

  if (!activeSnippet) return <h1>No snippet</h1>;

  return (
    <div className="flex w-full flex-nowrap">
      <Snipbar />
      <div className="flex-1 p-16">
        <div className="flex justify-between w-full">
          <div className="flex text-xs font-bold gap-x-2">
            <span className="uppercase text-carbon-300">snippet</span>
            <span>/</span>
            <span>{activeSnippet.title}</span>
          </div>
          <div className="flex flex-nowrap gap-x-4">
            <button className="px-4 py-1 rounded-sm bg-marine">snap</button>
            <button className="px-4 py-1 rounded-sm bg-marine">edit</button>
            <button className="px-4 py-1 rounded-sm bg-marine">delete</button>
          </div>
        </div>
        <div className="flex flex-col w-full mt-12">
          <h3 className="text-2xl font-bold">{activeSnippet.title}</h3>
          <p className="mt-4">{activeSnippet.description}</p>

          <div className="flex items-center justify-between w-full mt-12">
            <span className="text-sm">{activeSnippet.language}</span>
            <ul className="flex flex-nowrap gap-x-4">
              {activeSnippet.tags.map((tag, i) => (
                <li
                  key={tag + i}
                  className="flex items-center justify-center px-4 py-1 text-sm bg-black rounded-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <pre className="p-8 mt-2 rounded bg-carbon-600 h-96">
            {activeSnippet.content}
          </pre>
          <div className="flex justify-between mt-2 text-sm text-carbon-300">
            <span>
              edited the{" "}
              {new Date(activeSnippet.updatedAt).toLocaleDateString()}
            </span>
            <span>
              created the{" "}
              {new Date(activeSnippet.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CollectionSnippetPage;
