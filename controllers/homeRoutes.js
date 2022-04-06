const router = require('express').Router();
const { application } = require('express');
const { Listing } = require('../models');
const withAuth = require('../utils/auth');
const serialize = require('../utils/serialize');

// Importing custom middleware
application.use(withAuth);

// GET all listing for homepage
router.get('/', async (req, res) => {
  try {
    const dbListingData = await Listing.findAll({
      include: [
        {
          model: Painting,
          attributes: ['filename', 'description'],
        },
      ],
    });

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

// GET one gallery
// TODO: Replace the logic below with the custom middleware
router.get('/gallery/:id', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  // If the user is logged in, allow them to view the gallery
  try {
    const dbGalleryData = await Gallery.findByPk(req.params.id, {
      include: [
        {
          model: Painting,
          attributes: [
            'id',
            'title',
            'artist',
            'exhibition_date',
            'filename',
            'description',
          ],
        },
      ],
    });
    const gallery = serialize(dbGalleryData);
    res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
);

// GET one painting
// TODO: Replace the logic below with the custom middleware
router.get('/painting/:id', withAuth, async (req, res) => {
  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = serialize(dbPaintingData);

    res.render('painting', { painting, loggedIn: req.session.loggedIn });
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