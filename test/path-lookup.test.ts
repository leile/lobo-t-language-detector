import { createPathLookup } from '../src';

enum Language {
  en = 'en',
  nb = 'nb',
}

describe('path-lookup', () => {
  it('returns language if language is supported', () => {
    const pathLookup = createPathLookup<typeof Language>(
      Object.values(Language),
      Language.nb
    );
    const lang = pathLookup.getLanguageFromPath('/en/happy/path');
    expect(lang).toEqual(Language.en);
  });

  it('handles query params in path', () => {
    const pathLookup = createPathLookup<typeof Language>(
      Object.values(Language),
      Language.nb
    );
    const lang = pathLookup.getLanguageFromPath(
      '/en/happy/path?query=wow&this=is&a=nice&query=true'
    );
    expect(lang).toEqual(Language.en);
  });

  it('returns default lang if no language found', () => {
    const pathLookup = createPathLookup<typeof Language>(
      Object.values(Language),
      Language.nb
    );
    const lang = pathLookup.getLanguageFromPath('/se/other/lang');
    expect(lang).toEqual(Language.nb);
  });

  it('returns default lang on full url as input', () => {
    const pathLookup = createPathLookup<typeof Language>(
      Object.values(Language),
      Language.nb
    );
    const lang = pathLookup.getLanguageFromPath(
      'https://www.leile.no/en/other/lang'
    );
    expect(lang).toEqual(Language.nb);
  });
});
