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
  Material.findUsersMaterials(req.decodedJwt.member_id)
    .then(materials => {
      res.status(200).json(materials)
    })
});

router.post("/", restricted, (req, res, next) => {
  console.log(JSON.stringify(req.decodedJwt));
  Material.createMaterial(req.body, req.decodedJwt.member_id)
    .then((newMaterial) => {
      let resp = "Thank you for submitting a material";
      res.status(200).json(newMaterial);
    })
    .catch(next);
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
