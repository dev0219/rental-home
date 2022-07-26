const Home = require("../models/homeModal.js");
const Purchase = require("../models/cartModal.js");
const History = require("../models/historyModal.js");
const asyncHandler = require("express-async-handler");
const fs = require('fs');

const addToCart = asyncHandler(async (req, res) => {
  let {
    id,
  } = req.body;
  let home = await Home.findById(id);
  await Purchase.create({
    homeId: id,
    city: home.city,
    country: home.country,
    price: home.price,
    type: home.type,
    rooms: home.rooms,
    washrooms: home.washrooms,
    size: home.size,
    customerId: req.user._id,
  });
  const history = new History({
    homeId: id,
    city: home.city,
    price: home.price,
    customerId: req.user._id
  })
  try {
    await history.save();
    await Home.findOneAndUpdate(
      { _id: id },
      [{ $set: { rented: true, rentBy: req.user._id } }],
      { new: true }
    );
    res.json({ message: "Purchase added" });
  } catch (e) {
    throw new Error(
      e.message
    );
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  const purchase = await Purchase.findOne({homeId: req.params.id});
  if (purchase) {
    await purchase.remove();
    await Home.findOneAndUpdate(
      { _id: req.params.id },
      [{ $set: { rented: false } }],
    );
    res.json({ message: "Purchase removed" });
  } else {
    res.status(404);
    throw new Error("Purchase not found");
  }
});

module.exports = {
  addToCart,
  removeFromCart
};
