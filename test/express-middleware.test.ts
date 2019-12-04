import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import {
  createLobotLanguageDetectorMiddleware,
  initLanguageDetector,
} from '../src';

enum Language {
  en = 'en',
  nb = 'nb',
}

describe('express-middleware', () => {
  it('sets locale on request, response and header', () => {
    const middleware = createLobotLanguageDetectorMiddleware(
      initLanguageDetector<typeof Language>(
        Object.values(Language),
        Language.nb
      )
    );

    const next = jest.fn();
    const request = new Request('https://www.leile.no/en/feel-good-site');
    const response = new Response();

    middleware(request as any, response as any, next);
    expect((request as Express.Request).locale).toBe(Language.en);
    expect((response as Express.Response).locale).toBe(Language.en);
    expect(response.getHeader('Content-Language')).toBe(Language.en);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('passes path to language detector', () => {
    const mockLanguageDetector = {
      getLanguageFromPath: jest.fn(),
    };

    const middleware = createLobotLanguageDetectorMiddleware(
      mockLanguageDetector
    );

    const path = '/en/feel-good-site';

    const next = jest.fn();
    const request = new Request(`https://www.leile.no${path}`);
    const response = new Response();

    middleware(request as any, response as any, next);

    expect(mockLanguageDetector.getLanguageFromPath).toHaveBeenCalledWith(path);
  });
});
