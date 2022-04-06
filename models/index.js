const User = require('./User');
const Listing = require('./Listing');

User.hasMany(Listing, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Listing.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Listing };
