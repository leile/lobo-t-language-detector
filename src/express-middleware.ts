import { LanguageDetector, StandardEnum, KeyType } from './language-detector';
import { RequestHandler } from 'express';

export const createMiddleware = <Languages extends StandardEnum<KeyType>>(
  languageDetector: LanguageDetector<Languages>
) => {
  const i18nextMiddleware: RequestHandler = (req, res, next) => {
    const language = languageDetector.getLanguageFromPath(req.path);
    req.locale = language;
    res.locale = language;

    if (!res.headersSent && language) {
      res.set('Content-Language', `${language}`);
    }

    next();
  };

  return i18nextMiddleware;
};
