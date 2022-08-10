const router = require("express").Router();
const Material = require("./materials-model");
const { restricted } = require("../auth-middleware");

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
  Material.findUsersMaterials(req.decodedJwt.member_id).then((materials) => {
    res.status(200).json(materials);
  });
});

//make sure :id refers to the material_id
router.get("/img/:id", async (req, res) => {
  const id = req.params.id;
  let images = await Material.getPhotos(id)
  if (images) {
    res.end(images.image)
  } else {
    res.end('No images for this material')
  }
});

router.post("/", restricted, (req, res, next) => {
  console.log("here");
  Material.createMaterial(req.body, req.decodedJwt.member_id)
    .then((newMaterial) => {
      res.status(200).json(newMaterial);
      let resp = "Thank you for submitting a material";
    })
    .catch(next);
});

//include member_id when uploading to database after restricting the route. Do after sorting out state with JWT
router.post("/upload", async (req, res) => {
  const image = req.files.pic;
  const id = req.decodedJwt.member_id
  Material.uploadPhoto(image.name, image.data).then((newImage) => {
    res.status(200).json("successful upload");
  });
});

router.put("/:id", restricted, async (req, res, next) => {
  try {
    await Material.updateMaterial(req.params.id, req.body);
    let updatedMaterial = await Material.getById(req.params.id);
    res.status(200).json(updatedMaterial);
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
