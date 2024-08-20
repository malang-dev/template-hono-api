import { BadRequestException } from "@/exceptions/bad-request.exception";
import { BaseException } from "@/exceptions/base.exception";
import { InternalServerErrorException } from "@/exceptions/internal-server.exception";
import { NotFoundException } from "@/exceptions/not-found.exception";
import { IExceptionMessage, ResponseFormat } from "@/utils/response";
import { StatusCodes } from "@/utils/status-codes.js";
import { isEmpty } from "@/utils/string";
import { Context, ErrorHandler, NotFoundHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

export const errorHandler: ErrorHandler = async (err: any, ctx: Context<Environment>) => {
  let exception: BaseException;
  const responseFormat = new ResponseFormat<object>(ctx);
  const errors: IExceptionMessage[] = [];

  let bodyParse: object;
  if (ctx.req.raw.bodyUsed) {
    bodyParse = await ctx.req.json();
    bodyParse = !isEmpty(bodyParse) ? bodyParse : undefined;
  }

  let paramParse: object = ctx.req.param();
  paramParse = !isEmpty(paramParse) ? paramParse : undefined;

  let queryParse: object = ctx.req.query();
  queryParse = !isEmpty(queryParse) ? queryParse : undefined;

  if (err instanceof ZodError) {
    exception = new BadRequestException();
    err.errors.forEach((x) =>
      errors.push(
        new IExceptionMessage(
          "VALIDATION_ERROR",
          `Value of ${x.path} ~ ${x.message}`,
          exception.stack,
        ),
      ),
    );
  } else {
    if (err instanceof BaseException) {
      exception = err;
    } else if (err instanceof HTTPException) {
      const code: string = StatusCodes[err.status];
      exception = new BaseException(code, err.message, err.status);
    } else {
      exception = new InternalServerErrorException(err.message);
    }
    errors.push(new IExceptionMessage(exception.codes, exception.message, exception.stack));
  }
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: ctx.req.method,
      path: ctx.req.path,
      body: bodyParse,
      params: paramParse,
      query: queryParse,
    })
    .withErrors(errors)
    .json(null, exception.status);
};

export const notFoundHandler: NotFoundHandler = async (ctx: Context<Environment>) => {
  const responseFormat = new ResponseFormat<object>(ctx);
  const exception: BaseException = new NotFoundException();
  const errors: IExceptionMessage[] = [];

  let bodyParse: object;
  if (ctx.req.raw.bodyUsed) {
    bodyParse = await ctx.req.json();
    bodyParse = !isEmpty(bodyParse) ? bodyParse : undefined;
  }

  let paramParse: object = ctx.req.param();
  paramParse = !isEmpty(paramParse) ? paramParse : undefined;

  let queryParse: object = ctx.req.query();
  queryParse = !isEmpty(queryParse) ? queryParse : undefined;

  errors.push(new IExceptionMessage(exception.codes, exception.message, exception.stack));
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: ctx.req.method,
      path: ctx.req.path,
      body: bodyParse,
      params: paramParse,
      query: queryParse,
    })
    .withErrors(errors)
    .json(null, exception.status);
};
