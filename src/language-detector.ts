// https://github.com/Microsoft/TypeScript/issues/30611
export type StandardEnum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
};

type ValueOf<T> = T[keyof T];

export type KeyType = string | number;

export interface LanguageDetector<Languages extends StandardEnum<KeyType>> {
  getLanguageFromPath: (path: string) => ValueOf<Languages>;
}

export const initLanguageDetector = <Languages extends StandardEnum<KeyType>>(
  allowedLanguages: Array<ValueOf<Languages>>,
  defaultLanguage: ValueOf<Languages>
): LanguageDetector<Languages> => {
  const getLanguageFromPath = (path: string): ValueOf<Languages> => {
    const languages = path.match(/\/([a-zA-Z-]*)/g);
    if (languages instanceof Array) {
      const language = languages[0].replace('/', '') as ValueOf<Languages>;

      if (allowedLanguages.includes(language)) {
        return language;
      }
    }

    return defaultLanguage;
  };

  return {
    getLanguageFromPath,
  };
};
