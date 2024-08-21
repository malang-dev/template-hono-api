import { BaseException } from "@/exceptions/base.exception";
import { StatusCodes } from "@/utils/status";

export class UnprocessableEntityException extends BaseException {
  constructor(message: string) {
    super("UNPROCESSABLE_ENTITY", message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
}
