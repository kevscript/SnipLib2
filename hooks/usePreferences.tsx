import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Preferences = {
  theme: string;
  font: string;
  fontSize: number;
  tabSpacing: number;
  snippetVisibility: "public" | "private";
};

export type PreferencesContext = {
  preferences: Preferences;
  updateLocalPreferences: (newPreferences: Preferences) => void;
};

export const defaultPreferences: Preferences = {
  theme: "dracula",
  font: "Inter",
  fontSize: 14,
  tabSpacing: 2,
  snippetVisibility: "private",
};

const usePreferencesProvider = () => {
  const [preferences, setPreferences] =
    useState<Preferences>(defaultPreferences);

  useEffect(() => {
    const localPreferences = localStorage.getItem("preferences");

    if (!localPreferences) {
      localStorage.setItem("preferences", JSON.stringify(defaultPreferences));
    } else {
      setPreferences(JSON.parse(localPreferences));
    }
  }, []);

  const updateLocalPreferences = (newPreferences: Preferences) => {
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
