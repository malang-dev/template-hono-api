import { BaseException } from "@/exceptions/base.exception";
import { StatusCodes } from "@/utils/status-codes";

export class UnprocessableEntityException extends BaseException {
  constructor(message: string) {
    super("UNPROCESSABLE_ENTITY", message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
}
