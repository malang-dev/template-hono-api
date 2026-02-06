import { BadRequestException } from "@/exceptions/bad-request.exception";
import { BaseException } from "@/exceptions/base.exception";
import { InternalServerErrorException } from "@/exceptions/internal-server.exception";
import { NotFoundException } from "@/exceptions/not-found.exception";
import { IExceptionMessage, ResponseFormat } from "@/utils/response";
import { StatusCodes } from "@/utils/status";
import { z } from "@hono/zod-openapi";
import { type Context } from "hono";
import { HTTPException } from "hono/http-exception";

export function errorHandler(err: any, ctx: Context<Environment>) {
  const responseFormat = new ResponseFormat<object>(ctx);

  if (err instanceof z.ZodError) {
    const exception = new BadRequestException();
    const errors = err.issues.map(
      (x) =>
        new IExceptionMessage(
          "VALIDATION_ERROR",
          `Value of ${x.path} ~ ${x.message}`,
          exception.stack,
        ),
    );
    return responseFormat.withErrors(errors).json(null, exception.status);
  }

  const exception =
    err instanceof BaseException
      ? err
      : err instanceof HTTPException
        ? new BaseException(StatusCodes[err.status], err.message, err.status)
        : new InternalServerErrorException(err.message);

  return responseFormat
    .withErrors([new IExceptionMessage(exception.code, exception.message, exception.stack)])
    .json(null, exception.status);
}

export function notFoundHandler(ctx: Context<Environment>) {
  const responseFormat = new ResponseFormat<object>(ctx);
  const exception: BaseException = new NotFoundException();

  return responseFormat
    .withErrors([new IExceptionMessage(exception.code, exception.message, exception.stack)])
    .json(null, exception.status);
}
