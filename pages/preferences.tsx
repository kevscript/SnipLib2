import FormInputNumber from "@/components/forms/FormInputNumber";
import FormSelect from "@/components/forms/FormSelect";
import BarsWrapper from "@/components/layouts/BarsWrapper";
import React, { useEffect, useState } from "react";
import { getThemes } from "@/utils/getThemes";
import { usePreferences } from "@/hooks/usePreferences";
import { useCodeMirror } from "@/hooks/useCodeMirror";
import { useRouter } from "next/router";

export type EditorFormState = {
  theme: string;
  font: string;
  fontSize: number;
  tabSpacing: number;
};

export type EditorFormErrors = {
  theme: string[];
  font: string[];
  fontSize: string[];
  tabSpacing: string[];
};

const PreferencesPage = () => {
  const router = useRouter();
  const { preferences, updateLocalPreferences } = usePreferences();
  const [editorForm, setEditorForm] = useState<EditorFormState | null>(null);
  const [editorFormErrors, setEditorFormErrors] =
    useState<EditorFormErrors | null>(null);

  const { container } = useCodeMirror({
    preferences: editorForm || preferences,
    readOnly: false,
    doc: getThemes.toString(),
  });

  useEffect(() => {
    if (!editorForm && !editorFormErrors && preferences) {
      setEditorForm(preferences);
      setEditorFormErrors({
        theme: [],
        font: [],
        fontSize: [],
        tabSpacing: [],
      });
    }
  }, [editorForm, editorFormErrors, preferences]);

  const handleFormValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: keyof EditorFormState
  ) => {
    editorForm && setEditorForm((x) => ({ ...x!, [key]: e.target.value }));
    editorFormErrors && setEditorFormErrors((x) => ({ ...x!, [key]: [] }));
  };

  const handleUpdatePreferences = () => {
    editorForm && updateLocalPreferences(editorForm);
    router.back();
  };

  return (
    <div className="w-full p-16">
      <div className="flex items-center justify-between flex-1">
        <div className="flex text-xs font-bold gap-x-2">
          <span className="uppercase text-carbon-300">Preferences</span>
        </div>
        <div className="flex flex-nowrap gap-x-4">
          <button
            className="px-3 py-1 rounded-sm bg-marine-500 drop-shadow-sm min-w-[96px] disabled:bg-carbon-300"
            onClick={handleUpdatePreferences}
            disabled={
              JSON.stringify(editorForm) === JSON.stringify(preferences)
            }
          >
            Save
          </button>

          <button className="px-3 py-1 rounded-sm bg-carbon-400 drop-shadow-sm min-w-[96px]">
            Cancel
          </button>
        </div>
      </div>

      <section className="w-full mt-12">
        <h3 className="font-bold">Editor Settings</h3>
        <div className="w-full h-[1px] bg-carbon-300 mt-2" />
        {editorForm && editorFormErrors && (
          <div className="flex flex-wrap gap-4 mt-8">
            <FormSelect
              label="Theme"
              name="theme"
              className="w-48"
              value={editorForm.theme}
              errors={editorFormErrors.theme}
              handleValue={(e) => handleFormValue(e, "theme")}
            >
              {getThemes().map((theme) => (
                <option key={theme.name} value={theme.name}>
                  {theme.name}
                </option>
              ))}
            </FormSelect>
            <FormSelect
              label="Font"
              name="font"
              className="w-48"
              value={editorForm.font}
              errors={editorFormErrors.font}
              handleValue={(e) => handleFormValue(e, "font")}
            >
              <option>Inter</option>
            </FormSelect>
            <FormInputNumber
              label="Font size (px)"
              name="fontSize"
              value={editorForm.fontSize}
              errors={editorFormErrors.fontSize}
              className="w-32"
              min={10}
              max={32}
              handleValue={(e) => handleFormValue(e, "fontSize")}
            />
            <FormSelect
              label="Tab spacing"
              name="tabSpacing"
              value={editorForm.tabSpacing}
              errors={editorFormErrors.tabSpacing}
              handleValue={(e) => handleFormValue(e, "tabSpacing")}
            >
              <option>2</option>
              <option>4</option>
            </FormSelect>
          </div>
        )}
      </section>

      <div ref={container} className="mt-8"></div>
    </div>
  );
};

PreferencesPage.authRequired = true;
PreferencesPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="list">{page}</BarsWrapper>;
};

export default PreferencesPage;
