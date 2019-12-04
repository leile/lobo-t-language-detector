import { initLanguageDetector } from '../src';

enum Language {
  en = 'en',
  nb = 'nb',
}

describe('language-detector', () => {
  it('returns language if language is supported', () => {
    const languageDetector = initLanguageDetector<typeof Language>(
      Object.values(Language),
      Language.nb
    );
    const lang = languageDetector.getLanguageFromPath('/en/happy/path');
    expect(lang).toEqual(Language.en);
  });

  it('handles query params in path', () => {
    const languageDetector = initLanguageDetector<typeof Language>(
      Object.values(Language),
      Language.nb
    );
    const lang = languageDetector.getLanguageFromPath(
      '/en/happy/path?query=wow&this=is&a=nice&query=true'
    );
    expect(lang).toEqual(Language.en);
  });

  it('returns default lang if no language found', () => {
    const languageDetector = initLanguageDetector<typeof Language>(
      Object.values(Language),
      Language.nb
    );
    const lang = languageDetector.getLanguageFromPath('/se/other/lang');
    expect(lang).toEqual(Language.nb);
  });

  it('returns default lang on full url as input', () => {
    const languageDetector = initLanguageDetector<typeof Language>(
      Object.values(Language),
      Language.nb
    );
    const lang = languageDetector.getLanguageFromPath(
      'https://www.leile.no/en/other/lang'
    );
    expect(lang).toEqual(Language.nb);
  });
});
