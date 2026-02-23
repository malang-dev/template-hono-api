import { StatusCodes } from "@/utils/status";
import { z } from "@hono/zod-openapi";
import { Context } from "hono";

const PaginationSchema = z
  .object({
    limit: z.number().openapi({ example: 10 }),
    totalData: z.number().openapi({ example: 100 }),
    totalPage: z.number().openapi({ example: 10 }),
    nextPage: z.number().nullable().openapi({ example: 2 }),
    prevPage: z.number().nullable().openapi({ example: null }),
  })
  .nullable()
  .openapi("PaginationSchema");

const ExceptionSchema = z
  .object({
    code: z.string(),
    message: z.string(),
    stack: z.string().nullable().default(null),
  })
  .openapi("ExceptionSchema");

export function ResponseSchema(schema: {
  name: string;
  statusCode?: StatusCodes;
  model?: z.ZodTypeAny;
  description?: string;
}) {
  const name = schema.name;
  const statusCode = schema.statusCode ?? StatusCodes.OK;
  const model = schema.model ?? z.object({});
  const description = schema.description ?? "";
  const success = z.object({
    statusCode: z.number(),
    data: model,
    metadata: z.object({
      pagination: PaginationSchema,
    }),
  });
  const failure = z.object({
    statusCode: z.number(),
    errors: z.array(ExceptionSchema),
  });

  const response = statusCode >= StatusCodes.BAD_REQUEST ? failure : success;
  return {
    content: {
      "application/json": {
        schema: response.openapi(name),
      },
    },
    description,
  };
}

type IPaginationSchema = z.infer<typeof PaginationSchema>;
type IExceptionSchema = z.infer<typeof ExceptionSchema>;
type HeaderRecord = Record<string, string | string[]>;

export class ResponseFormat<T = any> {
  private context: Context;
  private response: {
    statusCode: number;
    data?: T | null;
    errors?: IExceptionMessage[];
    metadata?: IMetadataFormat;
  } = {
    statusCode: StatusCodes.OK,
  };

  constructor(c: Context) {
    this.context = c;
    this.response.metadata = new IMetadataFormat();
  }

  withErrors(errors: IExceptionMessage[]) {
    this.response.errors = errors;
    return this;
  }

  withPagination(totalData: number, page: number, limit: number) {
    if (!this.response.metadata) return this;

    const totalPage = Math.ceil(totalData / limit);
    page = page < 0 ? 0 : page;

    this.response.metadata.pagination = {
      totalData,
      totalPage,
      limit,
      nextPage: page < totalPage ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };
    return this;
  }

  json(object: T | null, statusCode: number, headers?: HeaderRecord): Response {
    this.response.statusCode = statusCode ?? StatusCodes.OK;
    this.response.data = object;
    return this.context.json(this.response, this.response.statusCode as -1, headers);
  }
}

export class IMetadataFormat {
  pagination?: IPaginationSchema | null;

  constructor(pagination?: IPaginationSchema) {
    this.pagination = pagination ?? null;
  }
}

export class IExceptionMessage implements IExceptionSchema {
  public code: string;
  public message: string;
  public stack: string | null = null;

  constructor(code: string, message: string, stack?: string) {
    this.code = code.toUpperCase();
    this.message = message;
    if (stack) this.stack = stack;
  }
}
