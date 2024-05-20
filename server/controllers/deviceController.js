const Device = require('../models/Device');
const Location = require('../models/Location');

// Create a new device for a location
exports.createDevice = async (req, res) => {
  const { serialNumber, type, image, status, name } = req.body;
  const locationId = req.params.locationId;

  try {
    const location = await Location.findById(locationId);

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    if (location.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (location.devices.length >= 10) {
      return res.status(400).json({ message: 'Maximum number of devices reached' });
    }

    const existingDevice = await Device.findOne({ serialNumber });
    if (existingDevice) {
      return res.status(400).json({ message: 'Serial number already exists' });
    }

    const newDevice = new Device({
      serialNumber,
      name,
      type,
      image,
      status,
      location: locationId
    });

    const device = await newDevice.save();

    location.devices.push(device);
    await location.save();

    res.json(device);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all devices for a location
exports.getDevices = async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const location = await Location.findById(locationId);

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    if (location.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const devices = await Device.find({ location: locationId });

    res.json(devices);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single device by ID
exports.getDevice = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);

    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    const location = await Location.findById(device.location);

    if (location.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(device);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a device by ID
exports.updateDevice = async (req, res) => {
  const { serialNumber, name, type, image, status } = req.body;

  try {
    let device = await Device.findById(req.params.id);

    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    const location = await Location.findById(device.location);

    if (location.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Check if new serial number is already taken
    if (serialNumber && serialNumber !== device.serialNumber) {
      const existingDevice = await Device.findOne({ serialNumber });
      if (existingDevice) {
        return res.status(400).json({ message: 'Serial number already exists' });
      }
    }

    device = await Device.findByIdAndUpdate(
      req.params.id,
      { serialNumber, name, type, image, status },
      { new: true }
    );

    res.json(device);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a device by ID
exports.deleteDevice = async (req, res) => {
  try {
    let device = await Device.findById(req.params.id);

    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    const location = await Location.findById(device.location);

    if (location.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Device.findByIdAndRemove(req.params.id);

    location.devices.pull(device);
    await location.save();

    res.json({ message: 'Device removed' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
