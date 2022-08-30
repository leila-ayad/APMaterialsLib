const { json } = require("body-parser");
const db = require("../data/dbConfig");

module.exports = {
  findBy,
  findById,
  updateLogout,
  updateRefresh,
  add,
};

async function findBy(filter) {
  return await db("members as m")
    .select("m.member_id", "m.username", "m.password", "logged_out_time")
    .where(filter);
}

async function findById(id) {
  return await db("members as m").where("m.member_id", id);
}

function updateLogout(id, time) {
  return db("members as m")
    .update("m.logged_out_time", time)
    .where("m.member_id", id);
}

async function updateRefresh(id, token) {
  const refreshToken = await db("members as m")
    .update("refresh_token", token)
    .where("member_id", id);
    return refreshToken
}

//onConflict and ignore were added to silently drop the query and prevent an error from being thrown so a meaningful error could be returned via the auth/register API
async function add(member) {
  const [id] = await db("members")
    .insert({ ...member })
    .onConflict()
    .ignore();
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
