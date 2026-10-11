exports.up = async function (knex) {
  await knex.schema.createTable("event_store", (table) => {
    table.bigIncrements("id").primary();
    table.string("aggregate_id").notNullable();
    table.string("aggregate_type").notNullable();
    table.string("event_type").notNullable();
    table.jsonb("event_data").notNullable();
    table.integer("version").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.index(["aggregate_id"]);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("event_store");
};