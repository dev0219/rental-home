const Home = require("../models/homeModal.js");
const History = require("../models/historyModal.js");
const User = require("../models/userModal.js");
const asyncHandler = require("express-async-handler");
const fs = require('fs');

const getAllHomes = asyncHandler(async (req, res) => {
  const homes = await Home.find({});
  const groupData = await History.aggregate([
    { "$group": { _id: "$city", count: { $sum: 1 } } }
  ])
  let offer = groupData[0];
  for (let i = 0; i < groupData.length; i++) {
    if (groupData[i].count > offer.count)
      offer = groupData[i];
  }
  if (offer !== undefined) {
  offer = await Home.findOne({ city: offer._id });
  } else offer = homes[0];
  const data = {
    homes: homes,
    offer: offer,
  }
  res.json(data);
});

const getGraphData = asyncHandler(async (req, res) => {
  const users = await User.find();
  const history = await History.find();
  const fetchedData =
    users.map((user) => {
      const dataArray = history.filter((hist) => {
        if (hist.customerId === user._id.toString()) {
          return true;
        }
      })
      return dataArray.length;
    })
  const fetchedData1 = await History.aggregate([{
    "$group": {
      _id: "$city",
      totalPrice: {
        "$sum": {
          "$round": [
            "$price"
          ]
        }
      }
    }
  }])
  const data = {
    graph1: fetchedData,
    graph2: fetchedData1,
  }
  res.json(data);

})

const addNewHome = asyncHandler(async (req, res) => {
  let {
    address,
    city,
    state,
    country,
    price,
    type,
    image,
    rooms,
    washrooms,
    size,
    position,
    details,
    isEdit,
    homeId,
  } = req.body;
  if (!isEdit) {
    var sameHome = await Home.find({
      address,
      city,
      state,
      position,
    });
    if (sameHome.length > 0) {
      console.log("Same address property already added. Send error");
      throw new Error(
        "Same address property already added please check address and try again"
      );
    } else {
      const home = new Home({
        address,
        city,
        state,
        country,
        position,
        price,
        type,
        image,
        date: new Date(),
        rooms,
        washrooms,
        size,
        details,
        posted_by: req.user._id,
      });
      try {
        const createdHome = await home.save();
      res.status(201).json(createdHome);
      } catch (e) {
        throw new Error(
          "Something went wrong please check all inputs and try again"
        );
      }
    }
  } else {
    let home = await Home.findOneAndUpdate(
      { _id: homeId },
      [{ $set: { address: address, city: city, state: state, country: country, position: position, image: image, price: price, type: type, rooms: rooms, washrooms, washrooms, size: size, details: details, posted_by: req.user._id } }],
      { new: true }
    );
    res.status(201).json(home);
  }
});

const deleteHome = asyncHandler(async (req, res) => {
  const home = await Home.findById(req.params.id);
  if (home) {
    await home.remove();
    res.json({ message: "Home removed" });
  } else {
    res.status(404);
    throw new Error("Home not found");
  }
});

module.exports = { getAllHomes, getGraphData, addNewHome, deleteHome };
