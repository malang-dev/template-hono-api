import { BaseException } from "@/exceptions/base.exception";
import { StatusCodes } from "@/utils/status";

export class InternalServerErrorException extends BaseException {
  constructor(message: string = "Internal Server Error", name: string = "INTERNAL_SERVER_ERROR") {
    super(name, message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
