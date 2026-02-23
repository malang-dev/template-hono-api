import { HTTPException } from "hono/http-exception";

export class BaseException extends HTTPException {
  public code: string;

  constructor(code: string, message: string, status: number) {
    super(status as -1, { message: message });
    this.code = code.toUpperCase();
  }
}
