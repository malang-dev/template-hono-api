/**
 * For now, drizzle does not support custom migrations using TypeScript/javascript.
 * https://orm.drizzle.team/docs/kit-custom-migrations#running-javascript-and-typescript-migrations
 *
 * So it has to be create manually
 */

import { db } from "@/databases/connection";
import { user } from "@/databases/schemas/user.schema";

export async function runSeed() {
  await db.transaction(async (trx) => {
    console.log("Seeding table user");
    await trx.insert(user).values({
      name: "Administrator",
      email: "admin@example.com",
      emailVerified: true,
    });
  });
}
