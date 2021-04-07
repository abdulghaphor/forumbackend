const express = require("express");
const upload = require("../middleware/multer");

const router = express.Router();
router.use(express.json()); // since body-parser was depreciated, we use this instead

const {
  cookieList,
  cookieUpdate,
  cookieDelete,
  fetchCookie,
} = require("../controllers");

// intercepts anything with cookieId in it's parameter
router.param("cookieId", async (req, res, next, cookieId) => {
  const cookie = await fetchCookie(cookieId, next);
  if (cookie) {
    req.cookie = cookie;
    next();
  } else {
    const err = new Error("Cookie not found");
    err.status = 404;
    next(err);
  }
});

router.get("/", cookieList);
router.put("/:cookieId", upload.single("image"), cookieUpdate);
router.delete("/:cookieId", cookieDelete);

module.exports = router;
