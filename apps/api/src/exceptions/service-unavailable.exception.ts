import { BaseException } from "@/exceptions/base.exception";
import { StatusCodes } from "@/utils/status";

export class ServiceUnavailableException extends BaseException {
  constructor(message: string, name: string = "SERVICE_UNAVAILABLE") {
    super(name, message, StatusCodes.SERVICE_UNAVAILABLE);
  }
}
