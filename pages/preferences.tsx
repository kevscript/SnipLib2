import FormInputNumber from "@/components/forms/FormInputNumber";
import FormSelect from "@/components/forms/FormSelect";
import BarsWrapper from "@/components/layouts/BarsWrapper";
import React, { useEffect, useState } from "react";
import { getThemes } from "@/utils/getThemes";
import { Preferences, usePreferences } from "@/hooks/usePreferences";
import { useCodeMirror } from "@/hooks/useCodeMirror";
import { useRouter } from "next/router";
import Button from "@/components/shared/Button";
import Head from "next/head";

export type PreferencesFormErrors = {
  theme: string[];
  font: string[];
  fontSize: string[];
  tabSpacing: string[];
  snippetVisibility: string[];
};

const txt = `const files = [ 'foo.txt ', '.bar', '   ', 'baz.foo' ];
const filePaths = files
  .map(file => file.trim())
  .filter(Boolean)
  .map(fileName => \`~/cool_app/\${fileName}\`);

// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']`;

const PreferencesPage = () => {
  const router = useRouter();
  const { preferences, updateLocalPreferences } = usePreferences();
  const [preferencesForm, setPreferencesForm] = useState<Preferences | null>(
    null
  );
  const [formErrors, setFormErrors] = useState<PreferencesFormErrors | null>(
    null
  );

  const { container } = useCodeMirror({
    preferences: preferencesForm || preferences,
    readOnly: false,
    doc: txt.toString(),
  });

  useEffect(() => {
    if (!preferencesForm && !formErrors && preferences) {
      setPreferencesForm(preferences);
      setFormErrors({
        theme: [],
        font: [],
        fontSize: [],
        tabSpacing: [],
        snippetVisibility: [],
      });
    }
  }, [preferencesForm, formErrors, preferences]);

  const handleFormValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: keyof Preferences
  ) => {
    preferencesForm &&
      setPreferencesForm((x) => ({ ...x!, [key]: e.target.value }));
    formErrors && setFormErrors((x) => ({ ...x!, [key]: [] }));
  };

  const handleUpdatePreferences = () => {
    preferencesForm && updateLocalPreferences(preferencesForm);
    router.back();
  };

  return (
    <>
      <Head>
        <title>User Preferences - Sniplib</title>
        <meta name="description" content="Change your editor & app settings" />
      </Head>
      <div className="flex items-center justify-between flex-1">
        <div className="flex text-xs font-bold gap-x-2">
          <span className="uppercase text-carbon-300">Preferences</span>
        </div>
        <div className="flex flex-nowrap gap-x-4">
          <Button
            label="Save"
            variety="primary"
            onClick={handleUpdatePreferences}
            disabled={
              JSON.stringify(preferencesForm) === JSON.stringify(preferences)
            }
          />

          <Button
            label="Cancel"
            onClick={() => router.back()}
            variety="secondary"
          />
        </div>
      </div>

      {preferencesForm && formErrors && (
        <>
          <section className="w-full mt-12">
            <h3 className="font-bold">User Settings</h3>
            <div className="w-full h-[1px] bg-carbon-400 mt-2" />
            <div className="flex flex-wrap gap-4 mt-8">
              <FormSelect
                label="Default snippet visibility"
                name="snippetVisibility"
                className="w-48"
                value={preferencesForm.snippetVisibility}
                errors={formErrors.snippetVisibility}
                handleValue={(e) => handleFormValue(e, "snippetVisibility")}
              >
                <option key={"private"} value={"private"}>
                  private
                </option>
                <option key={"public"} value={"public"}>
                  public
                </option>
              </FormSelect>
            </div>
          </section>

          <section className="w-full mt-12">
            <h3 className="font-bold">Editor Settings</h3>
            <div className="w-full h-[1px] bg-carbon-400 mt-2" />

            <div className="flex flex-wrap gap-4 mt-8">
              <FormSelect
                label="Theme"
                name="theme"
                className="w-48"
                value={preferencesForm.theme}
                errors={formErrors.theme}
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
                value={preferencesForm.font}
                errors={formErrors.font}
                handleValue={(e) => handleFormValue(e, "font")}
              >
                <option>Inter</option>
              </FormSelect>
              <FormInputNumber
                label="Font size (px)"
                name="fontSize"
                value={preferencesForm.fontSize}
                errors={formErrors.fontSize}
                className="w-32"
                min={10}
                max={32}
                handleValue={(e) => handleFormValue(e, "fontSize")}
              />
              <FormSelect
                label="Tab spacing"
                name="tabSpacing"
                value={preferencesForm.tabSpacing}
                errors={formErrors.tabSpacing}
                handleValue={(e) => handleFormValue(e, "tabSpacing")}
              >
                <option>2</option>
                <option>4</option>
              </FormSelect>
            </div>
          </section>
        </>
      )}

      <div ref={container} className="mt-8"></div>
    </>
  );
};

PreferencesPage.authRequired = true;
PreferencesPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper>{page}</BarsWrapper>;
};

export default PreferencesPage;
