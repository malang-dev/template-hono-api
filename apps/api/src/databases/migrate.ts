import { db } from "@/databases/connection";
import { runSeed } from "@/databases/seed";
import { migrate } from "drizzle-orm/libsql/migrator";

await migrate(db, { migrationsFolder: "drizzle" })
  .then(async () => {
    await runSeed();
    console.log("Migration complete");
  })
  .catch((error) => {
    console.log("Migration failed", error);
  });
