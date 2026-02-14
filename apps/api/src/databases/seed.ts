/**
 * For now, drizzle does not support custom migrations using TypeScript/javascript.
 * https://orm.drizzle.team/docs/kit-custom-migrations#running-javascript-and-typescript-migrations
 *
 * So it has to be create manually
 */

import { db } from "@/databases/connection";
import { userProfile } from "@/databases/schemas/user-profile.schema";
import { user } from "@/databases/schemas/user.schema";

export async function runSeed() {
  await db.transaction(async (trx) => {
    console.log("Seeding table user");
    const [{ insertedId: defaultUserId }] = await trx
      .insert(user)
      .values({
        username: "admin",
        password: "12345",
      })
      .returning({ insertedId: user.id });

    console.log("Seeding table user_profile");
    await trx.insert(userProfile).values({
      userId: defaultUserId,
      name: "Administrator",
    });
  });
}
