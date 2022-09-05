const db = require("../../data/dbConfig");

async function getMaterials() {
  const materials = await db("materials");
  return materials;
}

const getById = (material_id) => {
  return db("materials").where("material_id", material_id).first();
};

async function createMaterial(material, memberId, image_name) {

  const [id] = await db("materials").insert({
    material_name: material.material_name,
    material_description: material.material_description,
    material_unit: material.material_unit,
    phone_number: material.phone_number,
    email: material.email,
    member_id: memberId,
    image_name: image_name});
  return getById(id);
}

async function updateMaterial(materialId, changes) {
  return await db("materials").where("material_id", materialId).update(changes);
}

async function deleteMaterial(id) {
  return db("materials").where("material_id", id).del();
}

async function findUsersMaterials(id) {
  const materials = await db("materials").where("materials.member_id", id)
  return materials
}


module.exports = {
  getMaterials,
  getById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  findUsersMaterials
};
