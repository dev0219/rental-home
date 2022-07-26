const mongoose = require("mongoose");

const historySchema = mongoose.Schema(
  {
    homeId: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true },
    customerId: {type: String, required: true}
  },
);

module.exports = History = mongoose.model('history', historySchema);
