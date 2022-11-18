import { useCodeMirror } from "@/hooks/useCodeMirror";
import { usePreferences } from "@/hooks/usePreferences";
import { snippetFormSchema, SnippetFormSchema } from "@/lib/validation";
import List from "@/models/List";
import Snippet from "@/models/Snippet";
import { langList, LanguageIds } from "@/utils/langList";
import { ObjectID } from "bson";
import { useCallback, useState } from "react";
import CrossIcon from "../icons/Cross";
import SnippetFormCreateHeader from "./SnippetFormCreateHeader";
import SnippetFormEditHeader from "./SnippetFormEditHeader";
import FormArea from "./FormArea";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

export type SnippetFormState = {
  title: string;
  description: string;
  listId: string;
  tag: string;
  tags: string[];
  language: LanguageIds;
  content: string;
};

export type SnippetErrors = {
  _id: string[];
  title: string[];
  description: string[];
  listId: string[];
  tag: string[];
  tags: string[];
  language: string[];
  content: string[];
  createdAt: string[];
  updatedAt: string[];
  favorite: string[];
  public: string[];
};

export type SnippetFormProps = {
  snippet?: Snippet;
  activeListId: string;
  onSubmit: (s: Snippet) => unknown;
  onCancel: () => unknown;
  lists: List[];
};

const initSnippetForm: SnippetFormState = {
  title: "",
  description: "",
  listId: "",
  tag: "",
  tags: [],
  language: "javascript",
  content: "",
};

const initSnippetErrors: SnippetErrors = {
  _id: [],
  title: [],
  description: [],
  listId: [],
  tag: [],
  tags: [],
  language: [],
  content: [],
  createdAt: [],
  updatedAt: [],
  favorite: [],
  public: [],
};

const SnippetForm = ({
  snippet,
  activeListId,
  onSubmit,
  onCancel,
  lists,
}: SnippetFormProps) => {
  const [form, setForm] = useState<SnippetFormState>(() =>
    snippet
      ? {
          listId: snippet.listId.toString(),
          content: snippet.content,
          description: snippet.description,
          language: snippet.language as LanguageIds,
          tag: "",
          tags: snippet.tags,
          title: snippet.title,
        }
      : { ...initSnippetForm, listId: activeListId }
  );

  const [errors, setErrors] = useState<SnippetErrors>(initSnippetErrors);

  const { preferences } = usePreferences();

  const { editor, container, isFocused, setDoc } = useCodeMirror({
    doc: snippet ? snippet.content : undefined,
    lang: form.language,
    preferences: preferences,
    handleEditorContent: useCallback((value: string) => {
      setForm((x) => ({ ...x, ["content"]: value }));
      setErrors((x) => ({ ...x, ["content"]: [] }));
    }, []),
  });

  const handleForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    key: keyof SnippetFormState
  ) => {
    setForm((x) => ({ ...x, [key]: e.target.value }));
    setErrors((x) => ({ ...x, [key]: [] }));
  };

  const handleTagValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 16 && errors["tag"]?.length === 0) {
      setErrors((errors) => ({
        ...errors,
        tag: ["Tag can't be longer than 16 characters"],
      }));
    }
    if (e.target.value.length <= 16 && errors["tag"]?.length > 0) {
      setErrors((errors) => ({ ...errors, tag: [] }));
    }
    setForm((x) => ({ ...x, tag: e.target.value }));
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && errors["tag"].length === 0) {
      const tagValue = form.tag.trim();
      if (tagValue && !form.tags.includes(tagValue) && form.tags.length < 5) {
        setForm((x) => ({ ...x, tags: [...x.tags, tagValue], tag: "" }));
        setErrors((x) => ({ ...x, tags: [] }));
      }
    }
  };

  const handleTagRemove = (tag: string) => {
    if (form.tags.includes(tag)) {
      setForm((x) => ({ ...x, tags: x.tags.filter((t) => t !== tag) }));
    }
  };

  const handleReset = () => {
    if (snippet) {
      const resettedValues: SnippetFormState = {
        title: snippet.title,
        description: snippet.description,
        language: snippet.language as LanguageIds,
        listId: snippet.listId.toString(),
        tag: "",
        tags: snippet.tags,
        content: snippet.content,
      };

      setForm(resettedValues);
      setErrors(initSnippetErrors);

      setDoc(snippet.content);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = () => {
    if (editor.current && preferences) {
      const currentSnippet: SnippetFormSchema = {
        listId: form.listId,
        title: form.title,
        description: form.description,
        language: form.language,
        tags: form.tags,
        content: editor.current.state.doc.toString(),
      };

      snippetFormSchema
        .validate(currentSnippet, { abortEarly: false })
        .then((validSnippet) => {
          const now = Date.now();
          const formattedSnippet: Snippet = {
            ...validSnippet,
            _id: snippet ? new ObjectID(snippet._id) : new ObjectID(),
            listId: new ObjectID(validSnippet.listId),
            description: snippet?.description ? snippet.description : "",
            favorite: snippet ? snippet.favorite : false,
            createdAt: snippet ? snippet.createdAt : now,
            updatedAt: now,
            public: snippet
              ? snippet.public
              : preferences.snippetVisibility === "public"
              ? true
              : false,
          };
          onSubmit(formattedSnippet);
        })
        .catch((errors) => {
          if (errors.inner.length > 0) {
            const formErr = {} as {
              [key in keyof SnippetErrors]: string[];
            };

            errors.inner.forEach((error: any) => {
              const field: keyof SnippetFormSchema = error.path;
              formErr[field] = error.errors;
            });

            setErrors(formErr);
          }
        });
    }
  };

  return (
    <div className="min-w-[480px]">
      {snippet ? (
        <SnippetFormEditHeader
          snippet={snippet}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
      ) : (
        <SnippetFormCreateHeader
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}
      <form className="flex flex-col pb-16 mt-12 gap-y-4">
        <div className="flex gap-x-4">
          <FormInput
            label="Title"
            name="title"
            value={form.title}
            handleValue={(e) => handleForm(e, "title")}
            errors={
              errors["title"] && errors["title"].length > 0
                ? errors["title"]
                : null
            }
            autoFocus
          />
          <FormSelect
            label="List"
            name="listId"
            value={form.listId}
            handleValue={(e) => handleForm(e, "listId")}
            errors={errors["listId"]?.length > 0 ? errors["listId"] : null}
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
              errors["description"]?.length > 0 ? errors["description"] : null
            }
          />
        </div>
        <div className="flex mt-4 gap-x-4">
          <label className="flex flex-col flex-1" htmlFor="tag">
            <span className="ml-2 text-sm font-bold">Tags</span>
            <div
              className={`flex flex-nowrap gap-x-2 mt-2 outline-none overflow-hidden rounded-sm border bg-carbon-400 ${
                errors["tags"]?.length > 0
                  ? "border-red-500 focus-within:border-red-500"
                  : "border-transparent focus-within:border-marine-500"
              }`}
            >
              {form.tags.length > 0 && (
                <ul className="flex items-center">
                  {form.tags.map((tag) => (
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
                disabled={form.tags.length >= 5}
              />
            </div>
            {errors["tag"]?.length > 0 && (
              <div className="flex flex-col mt-2 text-sm text-red-500">
                {errors["tag"].map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}
            {errors["tags"]?.length > 0 && (
              <div className="flex flex-col mt-2 text-sm text-red-500">
                {errors["tags"].map((err, i) => (
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
            errors={errors["language"]?.length > 0 ? errors["language"] : null}
          >
            {langList &&
              langList.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label}
                </option>
              ))}
          </FormSelect>
        </div>
        {editor && (
          <div className="mt-4">
            <div className="flex flex-col">
              <span className="ml-2 text-sm font-bold">Snippet</span>

              <div
                className={`h-full mt-2 border w-full overflow-auto rounded bg-carbon-600 ${
                  errors["content"]?.length > 0
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
                <div ref={container} className="w-full h-full"></div>
              </div>
              {errors && errors["content"] && (
                <div className="flex flex-col mt-2 text-sm text-red-500">
                  {errors["content"].map((err, i) => (
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

export default SnippetForm;
