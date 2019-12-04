# Lobo-T language detector

> A small library that gets language from a url path

## Installation

```sh
$ npm i @leile/lobo-t-language-detector
# or
$ yarn add @leile/lobo-t-language-detector
```

## `lobo-t-language-detector` at a glance

You tell `lobo-t-language-detector` the patch which contain the language. The lib returns the language or a fallback language.
It also has a handy little express middleware to detect the language on the server.

That's all.

If you want to know more about why we decided to make this, [see lobot-t readme](https://github.com/leile/lobo-t).

## Usage

```tsx
// i18n.ts
import { initLobot } from '@leile/lobo-t';

// Specify which languages you support
export enum Language {
  Norwegian = 'nb',
  English = 'en',
}

const lobot = initLobot<typeof Language>(Language.English);

export const LanguageProvider = lobot.LanguageProvider;
export const useTranslation = lobot.useTranslation;
```

```tsx
// languageDetector.ts
import { Language } from './i18n';
import { initLanguageDetector } from '@leile/lobo-t-language-detector';

export const languageDetector = initLanguageDetector<typeof Language>(
  Object.values(Language),
  Language.Norwegian
);
```

```ts
// server.ts
import { createLobotLanguageDetectorMiddleware } from 'lobo-t-language-detector';
import { languageDetector } from './languageDetector';

const server = express();
server.use(createLobotLanguageDetectorMiddleware(languageDetector));
```

```tsx
// index.tsx
import { LanguageProvider } from './i18n';
import { languageDetector } from './pathLookup';
import App from './App';

export default () => (
  <LanguageProvider
    value={languageDetector.getLanguageFromPath(window.location.pathname)}
  >
    <App />
  </LanguageProvider>
);
```
