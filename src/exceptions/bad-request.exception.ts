import { BaseException } from "@/exceptions/base.exception";
import { StatusCodes } from "@/utils/status";

export class BadRequestException extends BaseException {
  constructor() {
    super("BAD_REQUEST", "Bad Request", StatusCodes.BAD_REQUEST);
  }
}
