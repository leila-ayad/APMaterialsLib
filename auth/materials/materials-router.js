const router = require("express").Router();
const Material = require("./materials-model");
const { restricted } = require("../auth-middleware");
const { upload } = require("./materials-middleware");
const fs = require("fs");

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

//make sure :id refers to the material_id
router.get("/img/:id", async (req, res) => {
  const id = req.params.id;
  let images = await Material.getPhotos(id);
  if (images) {
    res.end(images.image);
  } else {
    res.end("No images for this material");
  }
});

router.post("/", restricted, upload.single("image"), (req, res, next) => {
  Material.createMaterial(req.body, req.member_id).then((newMaterial) => {

    let dir = `./Uploads/${req.member_id}/`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    let oldPath = `./Uploads/${req.file.filename}`;
    var newPath = `./Uploads/${req.member_id}/${req.file.filename}`;

    fs.rename(oldPath, newPath, function (err) {
      if (err) {
        console.log(err);
      }

      Material.insertPhoto(req.file.filename, newMaterial.material_id);

      res.status(200).json(newMaterial);
    });
  });
});


router.put("/:id", restricted, async (req, res, next) => {
  try {
    await Material.updateMaterial(req.params.id, req.body);
    let updatedMaterial = await Material.getById(req.params.id);
    res.status(200).json({ message: "Successfully Updated" });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", restricted, async (req, res, next) => {
  try {
    await Material.deleteMaterial(req.params.id);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
