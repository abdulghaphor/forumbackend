const { Cookie } = require("../db/models");

// fetches item from DB
exports.fetchCookie = async (cookieId, next) => {
  try {
    const cookie = await Cookie.findByPk(cookieId);
    return cookie;
  } catch (err) {
    next(err);
  }
};

// lists item
exports.cookieList = async (req, res) => {
  try {
    const cookies = await Cookie.findAll({
      attributes: { exclude: ["bakeryId", "createdAt", "updatedAt"] },
      include: {
        model: Bakery,
        as: "bakery",
        attributes: ["name"],
      },
    });
    res.json(cookies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// updates item
exports.cookieUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.cookie.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// deletes item
exports.cookieDelete = async (req, res, next) => {
  try {
    await req.cookie.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
