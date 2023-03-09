const allRoles = {
  user: ['createBooking', 'getBooking', 'writeReview'],
  admin: ['getUsers', 'manageUsers', 'getRooms', 'manageRooms', 'getRoomBookings', 'manageRoomBookings'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
