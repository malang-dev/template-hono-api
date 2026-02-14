import { userProfile, userProfileRelation } from "@/databases/schemas/user-profile.schema";
import { user, userRelation } from "@/databases/schemas/user.schema";
import { createClient } from "@libsql/client";
import { drizzle, LibSQLDatabase, LibSQLTransaction } from "drizzle-orm/libsql";
import { BuildQueryResult, DBQueryConfig, ExtractTablesWithRelations } from "drizzle-orm/relations";

export const dbSchema = {
  // Table
  user,
  userProfile,

  // Relation
  userRelation,
  userProfileRelation,
};

const client = createClient({
  url: "file:local.db",
});

export const db = drizzle(client, {
  schema: dbSchema,
});

export type DBSchema = typeof dbSchema;
export type DBTable = ExtractTablesWithRelations<DBSchema>;

export type DBConnection = LibSQLDatabase<DBSchema>;
export type DBTransaction = LibSQLTransaction<DBSchema, DBTable>;

/**
 * To infer table with relation
 * https://github.com/drizzle-team/drizzle-orm/issues/695#issuecomment-1881454650
 */

export type IncludeRelation<TableName extends keyof DBTable> = DBQueryConfig<
  "one" | "many",
  boolean,
  DBTable,
  DBTable[TableName]
>["with"];

export type InferTableWithRelation<
  TableName extends keyof DBTable,
  With extends IncludeRelation<TableName> | undefined = undefined,
> = BuildQueryResult<DBTable, DBTable[TableName], { with: With }>;
