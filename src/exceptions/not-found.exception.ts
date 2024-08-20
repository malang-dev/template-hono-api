import { BaseException } from "@/exceptions/base.exception";
import { StatusCodes } from "@/utils/status-codes";

export class NotFoundException extends BaseException {
  constructor(message?: string, name?: string) {
    super(name ?? "NOT_FOUND", message ?? "Not Found", StatusCodes.NOT_FOUND);
  }
}
