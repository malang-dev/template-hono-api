import { AnyColumn, getTableColumns, type SelectedFields, SQL, sql } from "drizzle-orm";
import { type SelectResultFields } from "drizzle-orm/query-builders/select.types";
import { SQLiteColumn, SQLiteSelect, SQLiteTable } from "drizzle-orm/sqlite-core";

/**
 * Take first data or return null
 */
export function takeFirstOrNull<T>(data: T[]) {
  return data[0] ?? null;
}

/**
 * Take first data or throw error
 */
export function takeFirstOrThrow<T>(data: T[], errorMessage?: string) {
  const first = takeFirstOrNull(data);
  if (!first) {
    throw new Error(errorMessage ?? "Item not found");
  }
  return first;
}

/**
 * Coalesce a value to a default value if the value is null
 * Ex default array: themes: coalesce(pubThemeListQuery.themes, sql`'[]'`)
 * Ex default number: votesCount: coalesce(PubPollAnswersQuery.count, sql`0`)
 */
export function coalesce<T>(value: SQL.Aliased<T> | SQL<T>, defaultValue: SQL) {
  return sql<T>`coalesce(${value}, ${defaultValue})`;
}

export function coalesceToArray<T extends SQL.Aliased>(aliased: T) {
  return coalesce(aliased, sql`'[]'`);
}

/**
 * Handle pagination offset and limit
 */
export function withPagination<T extends SQLiteSelect>(builder: T, page?: number, limit?: number) {
  if (page) {
    builder = builder.offset((page - 1) * limit);
  }
  if (limit) {
    builder = builder.limit(limit);
  }
  return builder;
}

/**
 * Build conflict update query
 */
export function buildConflictUpdateColumns<
  T extends SQLiteTable,
  Q extends keyof T["_"]["columns"],
>(table: T, columns: Q[]) {
  const cls = getTableColumns(table);
  return columns.reduce(
    (acc, column) => {
      const colName = cls[column].name;
      acc[column] = sql.raw(`excluded.${colName}`);
      return acc;
    },
    {} as Record<Q, SQL>,
  );
}

/**
 * Select all columns except certain fields
 */
export function getTableColumnsExcept<T extends SQLiteTable, Q extends keyof T["_"]["columns"]>(
  table: T,
  columns: Q[],
) {
  const cls = getTableColumns(table);
  return Object.keys(cls).reduce(
    (acc, column) => {
      const colName = column as Q;
      if (!columns.includes(colName)) {
        acc[column] = cls[column];
      }
      return acc;
    },
    {} as Record<string, SQLiteColumn>,
  );
}

/**
 * Json aggregate / Object builder
 * https://gist.github.com/rphlmr/0d1722a794ed5a16da0fdf6652902b15#file-jsonagg_jsonaggbuildobject-ts
 */

export function jsonBuildObject<T extends SelectedFields<any, any>>(fields: T) {
  const query: SQL[] = [];

  Object.entries(fields).forEach(([key, value]) => {
    query.push(sql.raw(`'${key}'`));
    query.push(sql`${value}`);
  });

  return sql<SelectResultFields<T>>`json_object(${sql.join(query, sql.raw(`,`))})`;
}

export function jsonAgg<T extends SelectedFields<any, any>, Column extends AnyColumn>(
  fields: T,
  options?: { filter?: SQL; orderBy?: { colName: Column; direction: "ASC" | "DESC" } },
) {
  const whereQuery: SQL[] = [];
  const orderByClause = options?.orderBy
    ? sql`ORDER BY ${options.orderBy.colName} ${sql.raw(options.orderBy.direction)}`
    : undefined;

  // Create NOT NULL conditions
  const notNullConditions = Object.values(fields).map((value) => sql`${sql`${value}`} IS NOT NULL`);
  whereQuery.push(sql`(${sql.join(notNullConditions, sql` AND `)})`);

  // Custom filter
  if (options?.filter) {
    whereQuery.push(options?.filter);
  }

  return sql<SelectResultFields<T>[]>`
    coalesce(
      json_group_array(${jsonBuildObject(fields)} ${orderByClause}) 
      FILTER (WHERE ${sql.join(whereQuery, sql` AND `)}), '${sql`[]`}'
    )
  `.mapWith(JSON.parse);
}
