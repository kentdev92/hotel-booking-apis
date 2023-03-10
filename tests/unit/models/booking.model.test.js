const faker = require('faker');
const mongoose = require('mongoose');
const { Booking } = require('../../../src/models');

describe('Booking model', () => {
  describe('schema', () => {
    test('roomId, guestId, checkInDate, checkOutDate, paymentMethod, and totalAmount are required fields', () => {
      const booking = new Booking({
        status: 'pending',
      });
      const { errors } = booking.validateSync();
      expect(errors.roomId).toBeDefined();
      expect(errors.guestId).toBeDefined();
      expect(errors.checkInDate).toBeDefined();
      expect(errors.checkOutDate).toBeDefined();
      expect(errors.paymentMethod).toBeDefined();
      expect(errors.totalAmount).toBeDefined();
    });

    test('status should default to "pending" if not provided', () => {
      const booking = new Booking({
        roomId: mongoose.Types.ObjectId(),
        guestId: mongoose.Types.ObjectId(),
        checkInDate: faker.date.future(),
        checkOutDate: faker.date.future(),
        paymentMethod: 'creditCard',
        totalAmount: faker.finance.amount(),
      });
      expect(booking.status).toBe('pending');
    });

    test('status should be one of "pending", "confirmed", or "cancelled"', () => {
      const booking = new Booking({
        roomId: mongoose.Types.ObjectId(),
        guestId: mongoose.Types.ObjectId(),
        checkInDate: faker.date.future(),
        checkOutDate: faker.date.future(),
        paymentMethod: 'creditCard',
        totalAmount: faker.finance.amount(),
        status: 'invalidStatus',
      });
      const { errors } = booking.validateSync();
      expect(errors.status).toBeDefined();
    });

    test('paymentMethod should be one of "creditCard", "bankTransfer", or "paypal"', () => {
      const booking = new Booking({
        roomId: mongoose.Types.ObjectId(),
        guestId: mongoose.Types.ObjectId(),
        checkInDate: faker.date.future(),
        checkOutDate: faker.date.future(),
        paymentMethod: 'invalidMethod',
        totalAmount: faker.finance.amount(),
      });
      const { errors } = booking.validateSync();
      expect(errors.paymentMethod).toBeDefined();
    });
  });
});
