import { default as app } from "@/main";
import { serve } from "@hono/node-server";

const cwd = process.cwd();

const server = serve(
  {
    fetch: app.fetch,
    port: parseInt(process.env.PORT) || 3000,
  },
  (info) => {
    console.log(`Running on ${info.address}:${info.port} in directory ${cwd}`);
    console.log(`The current process ID is: ` + process.pid);
  },
);

function gracefulShutdown(signal: string) {
  console.log(`Received signal: ${signal}`);
  console.log("Closing server gracefully...");

  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0); // Exit process when server closes
  });

  // Fallback for pending connections
  setTimeout(() => {
    console.error("Forcing shutdown due to pending connections.");
    process.exit(1);
  }, 10000);
}

// Handle termination signals
["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
  process.on(signal, () => gracefulShutdown(signal));
});
