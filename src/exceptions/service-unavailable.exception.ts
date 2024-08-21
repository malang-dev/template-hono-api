import { BaseException } from "@/exceptions/base.exception";
import { StatusCodes } from "@/utils/status";

export class ServiceUnavailableException extends BaseException {
  constructor(message: string, name?: string) {
    super(name ?? "SERVICE_UNAVAILABLE", message, StatusCodes.SERVICE_UNAVAILABLE);
  }
}
