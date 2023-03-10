const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: [Number],
    },
    price: { type: Number, required: true, min: 0 },
    photos: [String],
    amenities: {
      type: [String],
      required: true,
      enum: ['TV', 'WiFi', 'AC', 'parking'],
      index: true,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviewsAvgRating: {
      type: Number,
      default: 0,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    size: {
      type: Number,
      required: true,
      min: 10,
    },
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
