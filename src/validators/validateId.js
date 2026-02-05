const mongoose = require('mongoose');

function validateId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw {
      status: 400,
      message: "Invalid ID format",
    };
  }
};

module.exports = validateId;