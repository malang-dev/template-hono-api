import { getLogger } from "@/utils/logger";
import { ResponseFormat } from "@/utils/response";
import { StatusCodes } from "@/utils/status";
import { getConnInfo } from "@hono/node-server/conninfo";
import { type Context, Handler } from "hono";

const getHello: Handler = (ctx: Context<Environment>) => {
  const log = getLogger();
  log.warn("HelloController.getHello");

  const responseFormat = new ResponseFormat(ctx);
  const { parameter } = ctx.req.param();
  const sampleData = { hello: parameter, timestamp: new Date(), ip: getConnInfo(ctx) };
  return responseFormat.json(sampleData, StatusCodes.OK);
};

export const HelloController = {
  getHello,
};
