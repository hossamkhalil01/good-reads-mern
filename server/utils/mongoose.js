const mongoose = require("mongoose");
const mapId = (id) => mongoose.Types.ObjectId(id);

module.exports = { mapId };
