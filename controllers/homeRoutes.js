const router = require('express').Router();
const { application } = require('express');
const { Listing } = require('../models');
const withAuth = require('../utils/auth');
const serialize = require('../utils/serialize');


// GET all listing for homepage
router.get('/', async (req, res) => {
  try {
    const dbListingData = await Listing.findAll({});

    const listings = dbListingData.map((listing) =>
      serialize(listing));

    res.render('homepage', {
      listings,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get all listings for the listings page
router.get('/listings', async (req, res) => {
  try {
    const dbListingData = await Listing.findAll({});
    const listings = dbListingData.map(
      (listing) => serialize(listing));

    res.render('listings', {
      listings,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one listing
// TODO: Replace the logic below with the custom middleware
router.get('/listings/:id', withAuth, async (req, res) => {
  try {
    const dbListingData = await Listing.findByPk(req.params.id);

    const listing = serialize(dbListingData);
    console.log(listing)
    res.render('listings', { listing, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;