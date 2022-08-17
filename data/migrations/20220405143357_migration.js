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
      tbl.string("refresh_token", 500)
    })

    .createTable("materials", (tbl) => {
      tbl.increments("material_id").notNullable();
      tbl.string("material_name").notNullable();
      tbl.string("material_description");
      tbl.string("material_unit").notNullable();
      tbl.string("phone_number");
      tbl.string("email");
      tbl
        .integer("member_id")
        .unsigned()
        .references("members.member_id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })

    //this set up DOESNT link the image to a certain material. need to include the foreign key for material_id
    .createTable("images", (tbl) => {
      tbl.increments("image_id").notNullable().unique();
      tbl.string("image_name").notNullable();
      tbl.blob("image").notNullable();
      tbl.integer("material_id").unsigned().references("materials.material_id").onDelete("RESTRICT").onUpdate("CASCADE");
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("materials")
    .dropTableIfExists("members")
    .dropTableIfExists("images");
};
