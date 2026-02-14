import { userProfile } from "@/databases/schemas/user-profile.schema";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 } from "uuid";

export const user = sqliteTable("user", {
  id: text("id", { length: 36 })
    .$defaultFn(() => v7())
    .primaryKey(),
  username: text("username", { length: 20 }),
  password: text("password", { length: 32 }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const userRelation = relations(user, ({ many }) => ({
  userProfile: many(userProfile),
}));

export type UserSchema = typeof user.$inferSelect;
export type UserSchemaPartial = Partial<UserSchema>;
