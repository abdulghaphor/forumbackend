const express = require("express");
const upload = require("../middleware/multer");

const router = express.Router();
router.use(express.json()); // since body-parser was depreciated, we use this instead

const {
  bakeryCreate,
  bakeryList,
  bakeryUpdate,
  bakeryDelete,
  fetchBakery,
  cookieCreate,
} = require("../controllers");
const passport = require("passport");

// intercepts anything with bakeryId in it's parameter
router.param("bakeryId", async (req, res, next, bakeryId) => {
  const bakery = await fetchBakery(bakeryId, next);
  if (bakery) {
    req.bakery = bakery;
    next();
  } else {
    const err = new Error("Bakery not found");
    err.status = 404;
    next(err);
  }
});

router.post(
  "/:bakeryId/cookie",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  cookieCreate
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  bakeryCreate
);
router.get("/", bakeryList);
router.put(
  "/:bakeryId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  bakeryUpdate
);
router.delete(
  "/:bakeryId",
  passport.authenticate("jwt", { session: false }),
  bakeryDelete
);

module.exports = router;
