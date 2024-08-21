import { BaseException } from "@/exceptions/base.exception";
import { StatusCodes } from "@/utils/status";

export class InternalServerErrorException extends BaseException {
  constructor(message?: string) {
    super(
      "INTERNAL_SERVER_ERROR",
      message ?? "Internal Server Error",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}
