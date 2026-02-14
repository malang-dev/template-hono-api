import { user } from "@/databases/schemas/user.schema";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 } from "uuid";

export const userProfile = sqliteTable("user_profile", {
  id: text("id", { length: 36 })
    .$defaultFn(() => v7())
    .primaryKey(),
  userId: text("user_id", { length: 36 }).references(() => user.id, { onDelete: "cascade" }),
  name: text("name", { length: 255 }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const userProfileRelation = relations(userProfile, ({ one }) => ({
  user: one(user, {
    fields: [userProfile.userId],
    references: [user.id],
  }),
}));

export type UserProfileSchema = typeof userProfile.$inferSelect;
export type UserProfileSchemaPartial = Partial<UserProfileSchema>;
