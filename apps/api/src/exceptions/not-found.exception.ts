import { BaseException } from "@/exceptions/base.exception";
import { StatusCodes } from "@/utils/status";

export class NotFoundException extends BaseException {
  constructor(message: string = "Not Found", name: string = "NOT_FOUND") {
    super(name, message, StatusCodes.NOT_FOUND);
  }
}
