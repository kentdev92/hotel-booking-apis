const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const houseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 8,
      trim: true,
    },
    images: {
      type: Array,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    about: {
      type: String,
      minLength: 10,
      maxLength: 500,
      require: true,
    },
    facilities: {
      type: Array,
      require: true,
    },
    comments: {
      type: Array,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Provider',
    },
    status: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
houseSchema.plugin(toJSON);
houseSchema.plugin(paginate);

houseSchema.pre('save', async function (next) {
  //   const house = this;
  //   if (house.isModified('password')) {
  //     user.password = await bcrypt.hash(user.password, 8);
  //   }
  next();
});

/**
 * @typedef User
 */
const House = mongoose.model('House', houseSchema);

module.exports = House;
