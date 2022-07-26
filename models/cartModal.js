const mongoose = require("mongoose");

const purchaseSchema = mongoose.Schema(
  {
    homeId: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    rooms: { type: Number, required: true },
    washrooms: { type: Number, required: true },
    size: { type: Number, required: true },
    customerId: {type: String, required: true},
    isAdded: {type: String, default: false},
  },
);

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
