const { Bakery, Cookie } = require("../db/models");

// fetches item from DB
exports.fetchBakery = async (bakeryId, next) => {
  try {
    const bakery = await Bakery.findByPk(bakeryId);
    return bakery;
  } catch (err) {
    next(err);
  }
};

// creates item that belongs to another
exports.cookieCreate = async (req, res, next) => {
  console.log("USER #", req.user.id, req.bakery.userId);
  try {
    if (req.user.id === req.bakery.userId) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.bakeryId = req.bakery.id;
      const newCookie = await Cookie.create(req.body);
      res.status(201).json(newCookie);
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

// creates item
exports.bakeryCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.userId = req.user.id;
    const newBakery = await Bakery.create(req.body);
    res.status(201).json(newBakery);
  } catch (err) {
    next(err);
  }
};

// lists item
exports.bakeryList = async (req, res) => {
  try {
    const bakeries = await Bakery.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Cookie,
        as: "cookies",
        attributes: ["id"],
      },
    });
    res.status(200).json(bakeries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// updates item
exports.bakeryUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.bakery.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// deletes item
exports.bakeryDelete = async (req, res, next) => {
  try {
    await req.bakery.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
