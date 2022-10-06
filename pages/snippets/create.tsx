import CodeMirror from "@/components/CodeMirror";
import CrossIcon from "@/components/icons/Cross";
import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useData } from "@/hooks/useData";
import { langList } from "@/utils/langList";
import { EditorView } from "codemirror";
import React, { useEffect, useState } from "react";

const CreateSnippetPage = () => {
  const { lists, activeListId } = useData();

  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [selectedListId, setSelectedListId] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [selectedLangId, setSelectedLangId] = useState("javascript");

  const [editorView, setEditorView] = useState<null | EditorView>(null);

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (tagValue && !tagsList.includes(tagValue) && tagsList.length < 5) {
        tagsList.push(tagValue.trim());
        setTagValue("");
      }
    }
  };

  const handleContent = () => {
    console.log(editorView?.state.doc.toString());
  };

  const removeTag = (tag: string) => {
    if (tagsList.includes(tag)) {
      const newTagList = tagsList.filter((t) => t !== tag);
      setTagsList(newTagList);
    }
  };

  useEffect(() => {
    activeListId && setSelectedListId(activeListId);
  }, [activeListId]);

  return (
    <div className="flex-1 p-16">
      <div className="flex items-center justify-between flex-1">
        <div className="flex text-xs font-bold gap-x-2">
          <span className="uppercase text-carbon-300">Create</span>
          <span>/</span>
          <span>New Snippet</span>
        </div>
        <div className="flex flex-nowrap gap-x-4">
          <button className="px-4 py-1 rounded-sm bg-marine-500 drop-shadow-sm">
            Create
          </button>
          <button className="px-4 py-1 rounded-sm bg-carbon-400 drop-shadow-sm">
            Cancel
          </button>
        </div>
      </div>

      <form className="flex flex-col mt-12 gap-y-4">
        <div className="flex gap-x-4">
          <label htmlFor="" className="flex flex-col flex-1">
            <span className="ml-2 text-sm font-bold">Title</span>
            <input
              type="text"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              className="h-10 px-2 mt-2 border-none rounded-sm outline-none focus:outline-marine-500 bg-carbon-400"
              autoFocus
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            <span className="ml-2 text-sm font-bold">List</span>
            <select
              defaultValue={selectedListId}
              onChange={(e) => setSelectedListId(e.target.value)}
              className="h-10 px-2 mt-2 border-none rounded-sm outline-none focus:outline-marine-500 bg-carbon-400 min-w-[128px] cursor-pointer"
            >
              {lists &&
                lists.map((list) => (
                  <option key={list._id.toString()} value={list._id.toString()}>
                    {list.label}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="flex mt-4">
          <label htmlFor="" className="flex flex-col flex-1">
            <span className="ml-2 text-sm font-bold">Description</span>
            <textarea
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
              className="min-h-[40px] h-24 p-2 mt-2 border-none rounded-sm outline-none focus:outline-marine-500 bg-carbon-400"
            />
          </label>
        </div>
        <div className="flex mt-4 gap-x-4">
          <label className="flex flex-col flex-1">
            <span className="ml-2 text-sm font-bold">Tags</span>
            <div className="flex mt-2 border-none rounded-sm outline-none flex-nowrap gap-x-2 focus-within:outline-marine-500 bg-carbon-400">
              {tagsList.length > 0 && (
                <ul className="flex items-center">
                  {tagsList.map((tag) => (
                    <li
                      key={tag}
                      className="flex items-center justify-center h-8 px-1.5 ml-1 rounded-sm bg-marine-500 flex-nowrap gap-x-2 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      <span className="text-sm text-white">{tag}</span>
                      <CrossIcon className="w-4 h-4 stroke-white" />
                    </li>
                  ))}
                </ul>
              )}

              <input
                type="text"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
                onKeyDown={(e) => handleTagAdd(e)}
                className="flex-1 h-10 px-2 bg-transparent border-none outline-none"
                disabled={tagsList.length >= 5}
              />
            </div>
          </label>
          <label className="flex flex-col">
            <span className="ml-2 text-sm font-bold">Language</span>
            <select
              defaultValue={selectedLangId}
              onChange={(e) => setSelectedLangId(e.target.value)}
              className="h-10 px-2 mt-2 border-none rounded-sm outline-none focus:outline-marine-500 bg-carbon-400 min-w-[128px] cursor-pointer"
            >
              {langList &&
                langList.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.label}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="mt-4">
          <div className="flex flex-col">
            <span className="ml-2 text-sm font-bold">Snippet</span>
            <CodeMirror setEditorView={setEditorView} lang={selectedLangId} />
          </div>
        </div>
      </form>
    </div>
  );
};

CreateSnippetPage.authRequired = true;
CreateSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper>{page}</BarsWrapper>;
};

export default CreateSnippetPage;
