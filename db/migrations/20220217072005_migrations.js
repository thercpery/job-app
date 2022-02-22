/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("companies", table => {
            table.increments("id").primary();
            table.string("company_name").notNullable();
            table.string("city_address").notNullable();
            table.string("country").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .createTable("users", table => {
            table.increments("id").primary();
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("middle_name");
            table.string("suffix_name");
            table.string("gender").notNullable().checkIn(["male", "female", "other"]);
            table.string("civil_status").notNullable().checkIn(["single", "married", "legally seperated", "annulled", "divorced"]);
            table.string("mobile_number").notNullable();
            table.string("city_address").notNullable();
            table.string("username").unique().notNullable();
            table.string("email").unique().notNullable();
            table.string("password").notNullable();
            table.boolean("is_admin").defaultTo(false);
            table.boolean("is_hired").defaultTo(false);
            table.integer("company_id").references("id").inTable("companies");
            table.boolean("is_private").defaultTo(false);
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .createTable("jobs", table => {
            table.increments("id").primary();
            table.string("job_title").notNullable();
            table.text("job_description").notNullable();
            table.float("salary").notNullable();
            table.boolean("is_remote").defaultTo(false);
            table.string("location").notNullable();
            table.integer("company_id").references("id").inTable("companies");
            table.boolean("is_offered").defaultTo(true);
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .createTable("job_applications", table => {
            table.increments("id").primary();
            table.integer("applicant_id").references("id").inTable("users");
            table.integer("posting_id").references("id").inTable("jobs");
            table.boolean("is_active").defaultTo(true);
            table.text("cover_letter");
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        // .createTable("job_experiences", table => {
        //     table.increments("id").primary();
        //     table.integer("user_id").references("id").inTable("users");
        //     table.integer("company_id").references("id").inTable("companies");
        //     table.string("position").notNullable();
        //     table.date("start_date").notNullable().defaultTo(knex.fn.now());
        //     table.date("end_date");
        //     table.boolean("is_active").defaultTo(true);
        //     table.timestamp("created_at").defaultTo(knex.fn.now());
        //     table.timestamp("updated_at").defaultTo(knex.fn.now());
        // });
        
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    // .dropTableIfExists("job_experiences")
        .dropTableIfExists("job_applications")
        .dropTableIfExists("jobs")
        .dropTableIfExists("users")
        .dropTableIfExists("companies");
};
