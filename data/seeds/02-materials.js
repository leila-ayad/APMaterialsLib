exports.seed = function (knex, Promise) {
  return knex("materials").insert([
    {
      material_name: "clay",
      material_description: "Left overs",
      material_unit: "2 lbs",
      contact_method: "instagram: leila.al",
    },
    {
      material_name: "paint",
      material_description: "mostly blues and reds",
      material_unit: "12 oz",
      contact_method: "phone number: (941)313-4411",
    },
    {
      material_name: "drill",
      material_description: "Ryobi Tool",
      material_unit: "NA",
      contact_method: "email: leila.al@myemail.com",
    },
    {
      material_name: "yarn",
      material_description: "Natural dyed sheep yarn",
      material_unit: "12 yards",
      contact_method: "instagram: leila.al",
    },
    {
      material_name: "clay",
      material_description: "Left overs",
      material_unit: "2 lbs",
      contact_method: "instagram: leila.al",
    },
  ]);
};
