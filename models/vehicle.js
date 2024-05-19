const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  vin: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
  driverNationalID: String,
  driverLicense: String,
  employeeNumber: String,
  serviceStatus: String,
  nextServiceDate: Date,
  parked: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
