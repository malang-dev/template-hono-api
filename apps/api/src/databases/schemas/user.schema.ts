import { account } from "@/databases/schemas/account.schema";
import { session } from "@/databases/schemas/session.schema";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 } from "uuid";

export const user = sqliteTable("user", {
  id: text("id", { length: 36 })
    .$defaultFn(() => v7())
    .primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const userRelation = relations(user, ({ many }) => ({
  session: many(session),
  account: many(account),
}));

export type UserSchema = typeof user.$inferSelect;
export type UserSchemaPartial = Partial<UserSchema>;
