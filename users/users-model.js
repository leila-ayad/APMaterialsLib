const { json } = require("body-parser");
const db = require("../data/dbConfig");

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


function update(id, time) {
  return db("members as m").update("logged_out_time", time).where("m.member_id", id);
}


//onConflict and ignore were added to silently drop the query and prevent an error from being thrown so a meaningful error could be returned via the auth/register API
async function add(member) {
    const [id] = await db("members").insert({...member}).onConflict().ignore()
    return findById(id);
}

//this is the version of the add model that existed before I fixed the duplicate username problem...just in case something goes wrong
// async function add(member) {
//   if (member) {
//     const [id] = await db("members").insert({...member}).onConflict().ignore
//     return findById(id);
//   } else {
//     return json.parse("Username Taken")
//   }
// }
