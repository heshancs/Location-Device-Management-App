const mongoose = require('mongoose');
const { Schema } = mongoose;

const deviceSchema = new Schema({
  serialNumber: { type: String, required: true, unique: true },
  name: {type: String, required: true},
  type: { type: String, enum: ['pos', 'kiosk', 'signage'], required: true },
  image: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', deviceSchema);
