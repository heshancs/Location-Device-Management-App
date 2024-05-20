const Location = require('../models/Location');
const Device = require('../models/Device');

// Create a new location
exports.createLocation = async (req, res) => {
  const { title, address, devices } = req.body;

  if (devices && devices.length > 10) {
    return res.status(400).json({ message: 'Cannot associate more than 10 devices to a location' });
  }

  try {
    const newLocation = new Location({
      title,
      address,
      devices,
      user: req.user.id
    });

    const location = await newLocation.save();
    res.json(location);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all locations for a user
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find({ user: req.user.id }).populate('devices');
    res.json(locations);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single location by ID
exports.getLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate('devices');

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    if (location.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(location);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a location by ID
exports.updateLocation = async (req, res) => {
  const { title, address, status, devices } = req.body;

  if (devices && devices.length > 10) {
    return res.status(400).json({ message: 'Cannot associate more than 10 devices to a location' });
  }

  try {
    let location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    if (location.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    location.title = title || location.title;
    location.address = address || location.address;
    location.status = status || location.status;
    location.devices = devices || location.devices;

    await location.save();

    res.json(location);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a location by ID
exports.deleteLocation = async (req, res) => {
  try {
    let location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    if (location.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Device.deleteMany({ location: req.params.id });
    await Location.findByIdAndDelete(req.params.id);

    res.json({ message: 'Location removed' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

