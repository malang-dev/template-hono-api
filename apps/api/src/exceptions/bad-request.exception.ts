import { BaseException } from "@/exceptions/base.exception";
import { StatusCodes } from "@/utils/status";

export class BadRequestException extends BaseException {
  constructor(message: string = "Bad Request", name: string = "BAD_REQUEST") {
    super(name, message, StatusCodes.BAD_REQUEST);
  }
}
