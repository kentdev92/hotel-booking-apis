const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    paymentMethod: {
      type: String,
      enum: ['creditCard', 'bankTransfer', 'paypal'],
      required: true,
    },
    totalAmount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bookingSchema.plugin(toJSON);
bookingSchema.plugin(paginate);

/**
 * @typedef Booking
 */

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
