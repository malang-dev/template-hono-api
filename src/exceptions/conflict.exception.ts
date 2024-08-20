import { BaseException } from "@/exceptions/base.exception";
import { StatusCodes } from "@/utils/status-codes";

export class ConflictException extends BaseException {
  constructor(message: string) {
    super("CONFLICT", message, StatusCodes.CONFLICT);
  }
}
