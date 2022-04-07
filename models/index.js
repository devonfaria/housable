const User = require('./User');
const Listing = require('./Listing');
const { append } = require('express/lib/response');
const { application } = require('express');

User.hasMany(Listing, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Listing.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Listing};
