var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ResourceSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },

    location: {
      type: Object,
      default: {},
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  {
    collection: "Resources",
  }
);

module.exports = mongoose.model("Resource", ResourceSchema);
