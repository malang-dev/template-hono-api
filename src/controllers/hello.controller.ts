import { getLogger } from "@/utils/logger";
import { ResponseFormat } from "@/utils/response";
import { StatusCodes } from "@/utils/status";
import { HelloValidation } from "@/validations/hello.validation";
import { getConnInfo } from "@hono/node-server/conninfo";
import { type Context, Handler } from "hono";

const getHello: Handler = async (ctx: Context<Environment>) => {
  const paramParse = ctx.req.param();
  const { parameter } = await HelloValidation.helloWorld.parseAsync(paramParse);

  const log = getLogger();
  log.warn("HelloController.getHello");

  const responseFormat = new ResponseFormat(ctx);
  const sampleData = { hello: parameter, timestamp: new Date(), ip: getConnInfo(ctx) };
  return responseFormat.json(sampleData, StatusCodes.OK);
};

export const HelloController = {
  getHello,
};
