/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("users", table => {
            table.increments("id").primary();
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("mobile_number").notNullable();
            table.string("city_address").notNullable();
            table.string("username").unique().notNullable();
            table.string("email").unique().notNullable();
            table.string("password").notNullable();
            table.boolean("is_admin").defaultTo(false);
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .createTable("companies", table => {
            table.increments("id").primary();
            table.string("company_name").notNullable();
            table.string("city_address").notNullable();
            table.string("country").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .createTable("jobs", table => {
            table.increments("id").primary();
            table.string("job_name").notNullable();
            table.text("job_description").notNullable();
            table.float("salary").notNullable();
            table.boolean("is_remote").defaultTo(false);
            table.string("location").notNullable();
            table.integer("company_id").references("id").inTable("companies");
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        });
        
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("jobs")
        .dropTableIfExists("companies")
        .dropTableIfExists("users");
};
