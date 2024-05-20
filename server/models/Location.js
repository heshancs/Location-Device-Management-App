const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  devices: [{ type: Schema.Types.ObjectId, ref: 'Device', max: 10 }],
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Location', locationSchema);
