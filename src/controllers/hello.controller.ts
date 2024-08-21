import { ResponseFormat } from "@/utils/response";
import { StatusCodes } from "@/utils/status";
import { Context, Handler } from "hono";

const getHello: Handler = (ctx: Context<Environment>) => {
  const responseFormat = new ResponseFormat(ctx);
  const { parameter } = ctx.req.param();
  const sampleData = { hello: parameter, timestamp: new Date() };
  return responseFormat.json(sampleData, StatusCodes.OK);
};

export const HelloController = {
  getHello,
};
