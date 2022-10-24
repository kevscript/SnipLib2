import * as themes from "@uiw/codemirror-themes-all";

export const getThemes = () => {
  const listOfThemes = [];

  for (const name in themes) {
    const theme = {
      name,
      theme: themes[name as keyof typeof themes],
    };

    listOfThemes.push(theme);
  }

  return listOfThemes;
};
