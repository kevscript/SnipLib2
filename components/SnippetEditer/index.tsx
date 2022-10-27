import { useCodeMirror } from "@/hooks/useCodeMirror";
import useEditSnippet from "@/hooks/useEditSnippet";
import { usePreferences } from "@/hooks/usePreferences";
import List from "@/models/List";
import Snippet from "@/models/Snippet";
import { langList, LanguageIds } from "@/utils/langList";
import { ObjectID } from "bson";
import { useCallback, useState } from "react";
import FormArea from "../forms/FormArea";
import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelect";
import CrossIcon from "../icons/Cross";
import SnippetEditerHeader from "./SnippetEditerHeader";

type EditSnippetFormState = {
  title: string;
  description: string;
  listId: string;
  tag: string;
  language: LanguageIds;
  content: string;
};

type EditSnippetFormErrors = {
  title: string[];
  listId: string[];
  description: string[];
  tag: string[];
  tags: string[];
  language: string[];
  content: string[];
};

type SnippetEditerProps = {
  snippet: Snippet;
  lists: List[];
  triggerReadMode: () => void;
};

const SnippetEditer = ({
  snippet,
  lists,
  triggerReadMode,
}: SnippetEditerProps) => {
  const [form, setForm] = useState<EditSnippetFormState>({
    title: snippet.title,
    description: snippet.description,
    language: snippet.language as LanguageIds,
    listId: snippet.listId.toString(),
    tag: "",
    content: snippet.content,
  });

  const [formErrors, setFormErrors] = useState<{
    [key in keyof EditSnippetFormErrors]: string[];
  }>({
    title: [],
    content: [],
    description: [],
    language: [],
    listId: [],
    tags: [],
    tag: [],
  });

  const [tagsList, setTagsList] = useState<string[]>([...snippet.tags]);

  const { preferences } = usePreferences();

  const { container, isFocused, setDoc } = useCodeMirror({
    doc: snippet.content,
    lang: form.language,
    preferences: preferences,
    handleEditorContent: useCallback((value: string) => {
      setForm((x) => ({ ...x, ["content"]: value }));
      setFormErrors((x) => ({ ...x, ["content"]: [] }));
    }, []),
  });

  const { mutate: editSnippet, isLoading, isSuccess } = useEditSnippet();

  const handleEditSnippet = () => {
    const editedSnippet: Snippet = {
      _id: new ObjectID(snippet._id),
      listId: new ObjectID(form.listId),
      title: form.title,
      description: form.description,
      language: form.language,
      favorite: snippet.favorite,
      public: snippet.public,
      tags: tagsList,
      content: form.content,
      createdAt: snippet.createdAt,
      updatedAt: Date.now(),
    };

    editSnippet(editedSnippet);
    triggerReadMode();
  };

  const handleForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    key: keyof EditSnippetFormState
  ) => {
    setForm((x) => ({ ...x, [key]: e.target.value }));
    setFormErrors((x) => ({ ...x, [key]: [] }));
  };

  const handleTagValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.length > 16 &&
      formErrors["tag"] &&
      formErrors["tag"].length === 0
    ) {
      setFormErrors((errors) => ({
        ...errors,
        tag: ["Tag can't be longer than 16 characters"],
      }));
    }
    if (
      e.target.value.length <= 16 &&
      formErrors["tag"] &&
      formErrors["tag"].length > 0
    ) {
      setFormErrors((errors) => ({ ...errors, tag: [] }));
    }
    setForm((x) => ({ ...x, tag: e.target.value }));
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formErrors["tag"].length === 0) {
      const tagValue = form.tag.trim();
      if (tagValue && !tagsList.includes(tagValue) && tagsList.length < 5) {
        tagsList.push(tagValue);
        setForm((x) => ({ ...x, tag: "" } as EditSnippetFormState));
        setFormErrors((x) => ({ ...x, ["tags"]: [] }));
      }
    }
  };

  const handleTagRemove = (tag: string) => {
    if (tagsList.includes(tag)) {
      const newTagList = tagsList.filter((t) => t !== tag);
      setTagsList(newTagList);
    }
  };

  const resetForm = () => {
    const resettedValues: EditSnippetFormState = {
      title: snippet.title,
      description: snippet.description,
      language: snippet.language as LanguageIds,
      listId: snippet.listId.toString(),
      tag: "",
      content: snippet.content,
    };

    setForm(resettedValues);
    setTagsList([...snippet.tags]);
    setFormErrors({
      title: [],
      content: [],
      description: [],
      language: [],
      listId: [],
      tags: [],
      tag: [],
    });

    setDoc(snippet.content);
  };

  return (
    <div className="">
      <SnippetEditerHeader
        snippet={snippet}
        onSubmit={handleEditSnippet}
        onCancel={triggerReadMode}
        onReset={resetForm}
      />
      <form className="flex flex-col mt-12 gap-y-4">
        <div className="flex gap-x-4">
          <FormInput
            label="Title"
            name="title"
            value={form.title}
            handleValue={(e) => handleForm(e, "title")}
            errors={
              formErrors["title"] && formErrors["title"].length > 0
                ? formErrors["title"]
                : null
            }
            autoFocus
          />
          <FormSelect
            label="List"
            name="listId"
            value={form.listId}
            handleValue={(e) => handleForm(e, "listId")}
            errors={
              formErrors["listId"] && formErrors["listId"].length > 0
                ? formErrors["listId"]
                : null
            }
          >
            {lists &&
              lists.map((list) => (
                <option key={list._id.toString()} value={list._id.toString()}>
                  {list.label}
                </option>
              ))}
          </FormSelect>
        </div>
        <div className="flex mt-4">
          <FormArea
            name="description"
            label="Description"
            value={form.description}
            handleValue={(e) => handleForm(e, "description")}
            errors={
              formErrors["description"] && formErrors["description"].length > 0
                ? formErrors["description"]
                : null
            }
          />
        </div>
        <div className="flex mt-4 gap-x-4">
          <label className="flex flex-col flex-1" htmlFor="tag">
            <span className="ml-2 text-sm font-bold">Tags</span>
            <div
              className={`flex flex-nowrap gap-x-2 mt-2 outline-none overflow-hidden rounded-sm border bg-carbon-400 ${
                formErrors &&
                formErrors["tags"] &&
                formErrors["tags"].length > 0
                  ? "border-red-500 focus-within:border-red-500"
                  : "border-transparent focus-within:border-marine-500"
              }`}
            >
              {tagsList.length > 0 && (
                <ul className="flex items-center">
                  {tagsList.map((tag) => (
                    <li
                      key={tag}
                      className="flex items-center justify-center h-8 px-1.5 ml-1 rounded-sm bg-marine-500 flex-nowrap gap-x-2 cursor-pointer"
                      onClick={() => handleTagRemove(tag)}
                    >
                      <span className="text-sm text-white">{tag}</span>
                      <CrossIcon className="w-4 h-4 stroke-white" />
                    </li>
                  ))}
                </ul>
              )}

              <input
                name="tag"
                type="text"
                value={form.tag}
                onChange={handleTagValueChange}
                onKeyDown={(e) => handleTagAdd(e)}
                className="w-full h-10 px-2 bg-transparent border-none outline-none"
                disabled={tagsList.length >= 5}
              />
            </div>
            {formErrors && formErrors["tag"] && (
              <div className="flex flex-col mt-2 text-sm text-red-500">
                {formErrors["tag"].map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}
            {formErrors && formErrors["tags"] && (
              <div className="flex flex-col mt-2 text-sm text-red-500">
                {formErrors["tags"].map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}
          </label>
          <FormSelect
            label="Language"
            name="language"
            value={form.language}
            handleValue={(e) => handleForm(e, "language")}
            errors={
              formErrors["language"] && formErrors["language"].length > 0
                ? formErrors["language"]
                : null
            }
          >
            {langList &&
              langList.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label}
                </option>
              ))}
          </FormSelect>
        </div>
        <div className="mt-4">
          <div className="flex flex-col">
            <span className="ml-2 text-sm font-bold">Snippet</span>

            <div
              className={`mt-2 border w-full overflow-auto rounded bg-carbon-600 ${
                formErrors &&
                formErrors["content"] &&
                formErrors["content"].length > 0
                  ? "border-red-500 focus:border-red-500"
                  : `${isFocused ? "border-marine-500" : "border-transparent"}`
              }`}
            >
              <p className="sr-only">
                The Editor uses Tab key to indent code. If you are focused on
                the editor and want to keep navigating instead of indenting code
                : press Escape, then Tab to move to the field after the editor.
                Or Escape, Shift-Tab to move to the field before the editor.
              </p>
              <div ref={container}></div>
            </div>
            {formErrors && formErrors["content"] && (
              <div className="flex flex-col mt-2 text-sm text-red-500">
                {formErrors["content"].map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SnippetEditer;
