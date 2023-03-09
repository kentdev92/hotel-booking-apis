const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const roomRoute = require('./room.route');
const bookingRoute = require('./booking.route');
const reviewRoute = require('./review.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/rooms',
    route: roomRoute,
    roles: ['admin'],
  },
  {
    path: '/bookings',
    route: bookingRoute,
    roles: ['user', 'admin'],
  },
  {
    path: '/reviews',
    route: reviewRoute,
    roles: ['user'],
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
