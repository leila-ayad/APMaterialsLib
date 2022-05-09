exports.up = async function (knex) {
  await knex.schema
    .createTable("members", (tbl) => {
      tbl.increments("member_id").notNullable();
      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 256).notNullable();
      tbl.string("email", 256).notNullable();
      tbl.string("name", 126).notNullable();
      tbl.string("pronouns").notNullable();
      tbl.integer("logged_out_time");
    })

    .createTable("materials", (tbl) => {
      tbl.increments("material_id").notNullable();
      tbl.string("material_name").notNullable();
      tbl.string("material_description");
      tbl.string("material_unit").notNullable();
      tbl.binary("material_image");
      tbl.string("contact_method").notNullable();
      tbl
        .integer("member_id")
        .unsigned()
        .references("members.member_id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("materials")
    .dropTableIfExists("members");
};
