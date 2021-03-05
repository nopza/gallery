const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const gallerySchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: String,
    image: String,
    detail: String,
    username: String,
    type: String,
    created: { type: Date, default: Date.now },
  },
  { _id: false }
);

gallerySchema.plugin(AutoIncrement, { inc_field: "gallery_id" });
module.exports = mongoose.model("gallerys", gallerySchema);
