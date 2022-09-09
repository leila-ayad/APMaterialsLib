const router = require("express").Router();
const Material = require("./materials-model");
const { restricted } = require("../auth-middleware");
const { upload } = require("./materials-middleware");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, getFileStream } = require("../../s3");

router.get("/", restricted, async (req, res, next) => {
  let materials = await Material.getMaterials();
  res.status(200).json(materials);
});

router.get("/:id", restricted, async (req, res, next) => {
  let material = await Material.getById(req.params.id, req.body);
  if (material) {
    res.status(200).json(material);
  } else {
    res.status(404).json({ message: "That material no longer exists" });
  }
});

router.get("/:id/your-materials", restricted, async (req, res, next) => {
  let materials = await Material.findUsersMaterials(req.member_id);
  res.status(200).json(materials);
});

router.post("/", restricted, upload.single("image"), async (req, res, next) => {
  if (req.body && req.member_id && req.file) {
    Material.createMaterial(req.body, req.member_id, req.file.filename).then(
      (newMaterial) => {
        //res.status(200).json(newMaterial);
      }
    );
    const file = req.file;
    console.log("in post?");
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    res.status(200).json({ message: "Material successfully added" });
  } else {
    res.status(500).json({message: "Something is missing...."})
  }
 
});

router.get("/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  res.setHeader("Content-Type", "application/json");
  readStream.pipe(res);
});

router.put("/:id", restricted, async (req, res, next) => {
  try {
    await Material.updateMaterial(req.params.id, req.body);
    let updatedMaterial = await Material.getById(req.params.id);
    res.status(200).json({ message: "Successfully Updated" });
  } catch (err) {
    console.log(err)
    next(err);
  }
});

router.delete("/:id", restricted, async (req, res, next) => {
  try {
    await Material.deleteMaterial(req.params.id);
    const id = req.params.id
    res.status(200).json({ message: "Successfully Deleted", id: id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
