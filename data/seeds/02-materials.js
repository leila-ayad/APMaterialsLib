exports.seed = function (knex, Promise) {
  return knex("materials").insert([
    {
      material_name: "clay",
      material_description: "Left overs",
      material_unit: "2 lbs",
      phone_number: "(941) 313 5511",
      member_id : 1
    },
    {
      material_name: "clay2",
      material_description: "Left overs",
      material_unit: "2 lbs",
      phone_number: "(941) 313 5511",
      member_id : 1
    },
    {
      material_name: "clay3",
      material_description: "Left overs",
      material_unit: "2 lbs",
      phone_number: "(941) 313 5511",
      member_id : 1
    },
    {
      material_name: "clay5",
      material_description: "Left overs",
      material_unit: "2 lbs",
      phone_number: "(941) 313 5511",
      member_id : 1
    },
    {
      material_name: "paint",
      material_description: "mostly blues and reds",
      material_unit: "12 oz",
      phone_number: "(333)333 1111",
      member_id : 1

    },
    {
      material_name: "drill",
      material_description: "Ryobi Tool",
      material_unit: "NA",
      email: "leila.al@myemail.com",
      member_id : 1

    },
    {
      material_name: "yarn",
      material_description: "Natural dyed sheep yarn",
      material_unit: "12 yards",
      email: "anotherfake@fake.com",
      phone_number: "1234567890",
      member_id : 1

    },
    {
      material_name: "clay",
      material_description: "Left overs",
      material_unit: "2 lbs",
      phone_number: "555 555 9090",
      email: "jerry@fake.com",
      member_id : 1

    },
  ]);
};
