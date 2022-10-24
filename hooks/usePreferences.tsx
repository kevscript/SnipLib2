import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type EditorPreferences = {
  theme: string;
  font: string;
  fontSize: number;
  tabSpacing: number;
};

export type PreferencesContext = {
  preferences: EditorPreferences;
  updateLocalPreferences: (newPreferences: EditorPreferences) => void;
};

export const defaultPreferences: EditorPreferences = {
  theme: "dracula",
  font: "Inter",
  fontSize: 14,
  tabSpacing: 2,
};

const usePreferencesProvider = () => {
  const [preferences, setPreferences] =
    useState<EditorPreferences>(defaultPreferences);

  useEffect(() => {
    const localPreferences = localStorage.getItem("preferences");

    if (!localPreferences) {
      localStorage.setItem("preferences", JSON.stringify(defaultPreferences));
    } else {
      setPreferences(JSON.parse(localPreferences));
    }
  }, []);

  const updateLocalPreferences = (newPreferences: EditorPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem("preferences", JSON.stringify(newPreferences));
  };

  return { preferences, updateLocalPreferences };
};

const preferencesContext = createContext({} as PreferencesContext);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const data = usePreferencesProvider();
  return (
    <preferencesContext.Provider value={data}>
      {children}
    </preferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(preferencesContext);
