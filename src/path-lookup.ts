// https://github.com/Microsoft/TypeScript/issues/30611
type StandardEnum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
};

type ValueOf<T> = T[keyof T];

type KeyType = string | number;

export interface PathLookup {
  getLanguageFromPath: (path: string) => KeyType;
}

export const createPathLookup = <Languages extends StandardEnum<KeyType>>(
  allowedLanguages: Array<ValueOf<Languages>>,
  defaultLanguage: ValueOf<Languages>
): PathLookup => {
  const getLanguageFromPath = (path: string): KeyType => {
    const languages = path.match(/\/([a-zA-Z-]*)/g);
    if (languages instanceof Array) {
      const language = languages[0].replace('/', '');

      if (allowedLanguages.includes(language as ValueOf<Languages>)) {
        return language;
      }
    }

    return defaultLanguage;
  };

  return {
    getLanguageFromPath,
  };
};
