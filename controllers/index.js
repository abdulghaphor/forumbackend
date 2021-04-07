const {
  cookieList,
  cookieUpdate,
  cookieDelete,
  fetchCookie,
} = require("./cookieController");
const {
  cookieCreate, // because it has :bakeryId in it's route
  bakeryCreate,
  bakeryList,
  bakeryUpdate,
  bakeryDelete,
  fetchBakery,
} = require("./bakeryController");

module.exports = {
  cookieCreate,
  cookieList,
  cookieUpdate,
  cookieDelete,
  fetchCookie,
  bakeryCreate,
  bakeryList,
  bakeryUpdate,
  bakeryDelete,
  fetchBakery,
};
