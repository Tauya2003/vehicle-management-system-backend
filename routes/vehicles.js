const express = require("express");
const router = express.Router();

const Vehicle = require("../models/vehicle");

// Getting all
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getVehicle, (req, res) => {
  res.json(res.vehicle);
});

// Creating one
router.post("/", async (req, res) => {
  const vehicle = new Vehicle({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    licensePlate: req.body.licensePlate,
    vin: req.body.vin,
    availability: req.body.availability,
    driverNationalID: req.body.driverNationalID,
    driverLicense: req.body.driverLicense,
    employeeNumber: req.body.employeeNumber,
    serviceStatus: req.body.serviceStatus,
    nextServiceDate: req.body.nextServiceDate,
    parked: req.body.parked,
  });

  // first check whether the vehicle exist or not
  const vehicleExist = await Vehicle.findOne({
    vin: req.body.vin,
    licensePlate: req.body.licensePlate,
  });

  if (vehicleExist) {
    return res.status(400).json({ message: "Vehicle already exist" });
  }

  try {
    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getVehicle, async (req, res) => {
  if (req.body.make != null) {
    res.vehicle.make = req.body.make;
  }
  if (req.body.model != null) {
    res.vehicle.model = req.body.model;
  }
  if (req.body.year != null) {
    res.vehicle.year = req.body.year;
  }
  if (req.body.licensePlate != null) {
    res.vehicle.licensePlate = req.body.licensePlate;
  }
  if (req.body.vin != null) {
    res.vehicle.vin = req.body.vin;
  }
  if (req.body.availability != null) {
    res.vehicle.availability = req.body.availability;
  }
  if (req.body.driverNabtionalID != null) {
    res.vehicle.driverNamtionalID = req.body.driverNationalID;
  }
  if (req.body.driverLicense != null) {
    res.vehicle.driverLicense = req.body.driverLicense;
  }
  if (req.body.employeeNumber != null) {
    res.vehicle.employeeNumber = req.body.employeeNumber;
  }
  if (req.body.serviceStatus != null) {
    res.vehicle.serviceStatus = req.body.serviceStatus;
  }
  if (req.body.nextServiceDate != null) {
    res.vehicle.nextServiceDate = req.body.nextServiceDate;
  }
  if (req.body.parked != null) {
    res.vehicle.parked = req.body.parked;
  }

  try {
    const updatedVehicle = await res.vehicle.save();
    res.json(updatedVehicle);
    console.log(updatedVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getVehicle, async (req, res) => {
  try {
    await res.vehicle.deleteOne();
    res.json({ message: "Deleted Vehicle" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// MIDDLWARE for getting vehicle by id
async function getVehicle(req, res, next) {
  let vehicle;
  try {
    vehicle = await Vehicle.findById(req.params.id);
    if (vehicle == null) {
      return res.status(404).json({ message: "Cannot find vehicle" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.vehicle = vehicle;
  next();
}

module.exports = router;
