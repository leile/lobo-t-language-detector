declare namespace Express {
  export interface Request {
    locale?: string | number;
  }

  export interface Response {
    locale?: string | number;
  }
}
