const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { orderStatus } = require('../config/orderStatus');

const orderSchema = mongoose.Schema(
  {
    orderShortId: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    houseId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'House',
    },
    schedule: {
      type: Array,
      require: true,
    },
    status: {
      type: String,
      enum: orderStatus,
      require: true,
      default: orderStatus[0],
      index: true,
    },
    amount: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

orderSchema.pre('save', async function (next) {
  //   const house = this;
  //   if (house.isModified('password')) {
  //     user.password = await bcrypt.hash(user.password, 8);
  //   }
  next();
});

/**
 * @typedef User
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
