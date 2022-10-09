import * as yup from "yup";
import { LanguageIds, LanguageListItem } from "@/utils/langList";
import { useCallback, useState } from "react";
import List from "@/models/List";
import CrossIcon from "../icons/Cross";
import { useCodeMirror } from "@/hooks/useCodeMirror";
import Snippet from "@/models/Snippet";
import { ObjectID } from "bson";

const yupTag = yup
  .string()
  .min(2, "Min tag length : 2 chars")
  .max(32, "Max tag length : 32 chars")
  .required();

const createSnippetSchema = yup.object({
  title: yup.string().required("Title is required").max(80),
  listId: yup.string().required(),
  description: yup.string(),
  tags: yup.array().of(yupTag).max(5),
  language: yup.string().required(),
  content: yup.string().max(1028).required("Snippet is empty"),
});

export type CreateSnippetSchema = yup.InferType<typeof createSnippetSchema>;

export type CreateSnippetFormState = {
  title: string;
  description: string;
  listId: string;
  tag: string;
  language: LanguageIds;
  content: string;
};

export type CreateSnippetFormErrors = {
  title: string[];
  listId: string[];
  description: string[];
  tags: string[];
  language: string[];
  content: string[];
};

export type CreateSnippetFormProps = {
  initFormValues: CreateSnippetFormState;
  initFormErrors: CreateSnippetFormErrors;
  activeListId: string;
  lists: List[];
  langList: readonly LanguageListItem[];
  createSnippet: (newSnippet: Snippet) => void;
};

const CreateSnippetForm = ({
  initFormValues,
  initFormErrors,
  activeListId,
  lists,
  langList,
  createSnippet,
}: CreateSnippetFormProps) => {
  const [form, setForm] = useState({
    ...initFormValues,
    listId: activeListId || "",
  });

  const [formErrors, setFormErrors] = useState<{
    [key in keyof CreateSnippetSchema]: string[];
  }>(initFormErrors);

  const [tagsList, setTagsList] = useState<string[]>([]);

  const { editor, container, isFocused } = useCodeMirror({
    lang: form.language,
    handleEditorContent: useCallback((value: string) => {
      setForm((x) => ({ ...x, ["content"]: value }));
      setFormErrors((x) => ({ ...x, ["content"]: [] }));
    }, []),
  });

  const handleForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    key: keyof CreateSnippetFormState
  ) => {
    setForm((x) => ({ ...x, [key]: e.target.value }));
    setFormErrors((x) => ({ ...x, [key]: [] }));
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const tagValue = form.tag.trim();
      if (tagValue && !tagsList.includes(tagValue) && tagsList.length < 5) {
        tagsList.push(tagValue);
        setForm((x) => ({ ...x, tag: "" } as CreateSnippetFormState));
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

  const handleCreate = () => {
    if (editor.current) {
      const newSnippet: CreateSnippetSchema = {
        title: form.title,
        description: form.description,
        listId: form.listId,
        language: form.language,
        tags: tagsList,
        content: editor.current.state.doc.toString(),
      };

      createSnippetSchema
        .validate(newSnippet, { abortEarly: false })
        .then((validSnippet) => {
          const now = Date.now();
          const newSnippet: Snippet = {
            _id: new ObjectID(),
            listId: new ObjectID(validSnippet.listId),
            title: validSnippet.title,
            description: validSnippet.description || "",
            language: validSnippet.language,
            tags: validSnippet.tags || [],
            content: validSnippet.content,
            favorite: false,
            public: false,
            createdAt: now,
            updatedAt: now,
          };
          createSnippet(newSnippet);
        })
        .catch((errors) => {
          if (errors.inner.length > 0) {
            const formErr = {} as {
              [key in keyof CreateSnippetSchema]: string[];
            };

            errors.inner.forEach((error: any) => {
              const field: keyof CreateSnippetSchema = error.path;
              formErr[field] = error.errors;
            });

            setFormErrors(formErr);
          }
        });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-1">
        <div className="flex text-xs font-bold gap-x-2">
          <span className="uppercase text-carbon-300">Create</span>
          <span>/</span>
          <span>New Snippet</span>
        </div>
        <div className="flex flex-nowrap gap-x-4">
          <button
            className="px-4 py-1 rounded-sm bg-marine-500 drop-shadow-sm"
            onClick={handleCreate}
          >
            Create
          </button>
          <button className="px-4 py-1 rounded-sm bg-carbon-400 drop-shadow-sm">
            Cancel
          </button>
        </div>
      </div>

      <form className="flex flex-col mt-12 gap-y-4">
        <div className="flex gap-x-4">
          <label htmlFor="title" className="flex flex-col flex-1">
            <span className="ml-2 text-sm font-bold">Title</span>
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={(e) => handleForm(e, "title")}
              className={`h-10 px-2 mt-2 outline-none rounded-sm border  bg-carbon-400 ${
                formErrors &&
                formErrors["title"] &&
                formErrors["title"].length > 0
                  ? "border-red-500 focus:border-red-500"
                  : "border-transparent focus:border-marine-500"
              }`}
              autoFocus
            />
            {formErrors && formErrors["title"] && (
              <div className="flex flex-col mt-2 text-sm text-red-500">
                {formErrors["title"].map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}
          </label>
          <label htmlFor="listId" className="flex flex-col">
            <span className="ml-2 text-sm font-bold">List</span>
            <select
              name="listId"
              defaultValue={form.listId}
              onChange={(e) => handleForm(e, "listId")}
              className={`h-10 px-2 mt-2 outline-none rounded-sm border min-w-[128px] bg-carbon-400 ${
                formErrors &&
                formErrors["listId"] &&
                formErrors["listId"].length > 0
                  ? "border-red-500 focus:border-red-500"
                  : "border-transparent focus:border-marine-500"
              }`}
            >
              {lists &&
                lists.map((list) => (
                  <option key={list._id.toString()} value={list._id.toString()}>
                    {list.label}
                  </option>
                ))}
            </select>
            {formErrors && formErrors["listId"] && (
              <div className="flex flex-col mt-2 text-sm text-red-500">
                {formErrors["listId"].map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}
          </label>
        </div>
        <div className="flex mt-4">
          <label htmlFor="" className="flex flex-col flex-1">
            <span className="ml-2 text-sm font-bold">Description</span>
            <textarea
              value={form.description}
              onChange={(e) => handleForm(e, "description")}
              className={`min-h-[40px] h-24 p-2 mt-2 outline-none rounded-sm border  bg-carbon-400 ${
                formErrors &&
                formErrors["description"] &&
                formErrors["description"].length > 0
                  ? "border-red-500 focus:border-red-500"
                  : "border-transparent focus:border-marine-500"
              }`}
            />
            {formErrors && formErrors["description"] && (
              <div className="flex flex-col mt-2 text-sm text-red-500">
                {formErrors["description"].map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}
          </label>
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
                onChange={(e) => handleForm(e, "tag")}
                onKeyDown={(e) => handleTagAdd(e)}
                className="w-full h-10 px-2 bg-transparent border-none outline-none"
                disabled={tagsList.length >= 5}
              />
            </div>
            {formErrors && formErrors["tags"] && (
              <div className="flex flex-col mt-2 text-sm text-red-500">
                {formErrors["tags"].map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}
          </label>
          <label className="flex flex-col" htmlFor="language">
            <span className="ml-2 text-sm font-bold">Language</span>
            <select
              name="language"
              defaultValue={form.language}
              onChange={(e) => handleForm(e, "language")}
              className={`h-10 px-2 mt-2 outline-none rounded-sm border min-w-[128px] bg-carbon-400 ${
                formErrors &&
                formErrors["language"] &&
                formErrors["language"].length > 0
                  ? "border-red-500 focus:border-red-500"
                  : "border-transparent focus:border-marine-500"
              }`}
            >
              {langList &&
                langList.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.label}
                  </option>
                ))}
            </select>
            {formErrors && formErrors["language"] && (
              <div className="flex flex-col mt-2 text-sm text-red-500">
                {formErrors["language"].map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}
          </label>
        </div>
        {editor && (
          <div className="mt-4">
            <div className="flex flex-col">
              <span className="ml-2 text-sm font-bold">Snippet</span>

              <div
                className={`mt-2 border w-full overflow-auto rounded bg-carbon-600 ${
                  formErrors &&
                  formErrors["content"] &&
                  formErrors["content"].length > 0
                    ? "border-red-500 focus:border-red-500"
                    : `${
                        isFocused ? "border-marine-500" : "border-transparent"
                      }`
                }`}
              >
                <p className="sr-only">
                  The Editor uses Tab key to indent code. If you are focused on
                  the editor and want to keep navigating instead of indenting
                  code : press Escape, then Tab to move to the field after the
                  editor. Or Escape, Shift-Tab to move to the field before the
                  editor.
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
        )}
      </form>
    </div>
  );
};

export default CreateSnippetForm;
