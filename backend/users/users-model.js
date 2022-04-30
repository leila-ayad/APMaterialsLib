const db = require("../backend/data/dbConfig");

module.exports = {
  findBy,
  findById,
  update,
  add,
  
};

async function findBy(filter) {
  return db("members as m")
    .select("m.member_id", "m.username", "m.password", "logged_out_time")
    .where(filter);
}

function findById(id) {
  return db("members as m").where("m.member_id", id).first();
}


function update(id, user) {
  return db("users").update(user).where({ id });
}

async function add(member) {
  const [id] = await db("members").insert(member);
  return findById(id);
}
