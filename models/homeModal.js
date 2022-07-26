const mongoose = require("mongoose");

const homeSchema = mongoose.Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    position: {
      lat: Number,
      lng: Number,
    },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    image: [String],
    date: Date,
    rooms: { type: Number, required: true },
    washrooms: { type: Number, required: true },
    size: { type: Number, required: true },
    details: String,
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    rented: { type: Boolean, default: false},
    rentBy: {type: String, default: ""},
  },
  {
    timestamps: true,
  }
);

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
