import { PathLookup } from './path-lookup';
import { RequestHandler } from 'express';

export const createMiddleware = (pathLookup: PathLookup) => {
  const i18nextMiddleware: RequestHandler = (req, res, next) => {
    const language = pathLookup.getLanguageFromPath(req.path);
    req.locale = language;
    res.locale = language;

    if (!res.headersSent && language) {
      res.set('Content-Language', `${language}`);
    }

    next();
  };

  return i18nextMiddleware;
};
