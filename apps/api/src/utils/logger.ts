import { getConnInfo } from "@hono/node-server/conninfo";
import { getContext } from "hono/context-storage";
import { default as winston } from "winston";

const myFormat = winston.format.printf(({ timestamp: date, name, level, message }) => {
  const ctx = getContext();
  const ips = getConnInfo(ctx).remote.address;
  const req = ctx.get("requestId");

  return `${date} [${req}] [${name}] [${ips}] [${level}] -- ${message}`;
});

const setupLogger = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        myFormat,
        winston.format.colorize({ all: true }),
      ),
    }),
  ],
});

export function getLogger(name: string = "default") {
  return setupLogger.child({ name });
}
