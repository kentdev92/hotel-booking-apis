const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: [Number],
    },
    price: { type: Number, required: true },
    photos: [String],
    amenities: [String],
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
roomSchema.plugin(toJSON);
roomSchema.plugin(paginate);

/**
 * @typedef Room
 */
roomSchema.index({ location: '2dsphere' });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
