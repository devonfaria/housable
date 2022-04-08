const router = require('express').Router();
const { Listing } = require('../../models');

// Get all Listings
router.get('/', async (req, res) => {
  try {
    const allListings = await Listing.findAll({});
    res.status(200).json(allListings);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create new Listing
router.post('/addlisting', async (req, res) => {
  console.log('Req body: ', req.body);
  try {
    const newListing = await Listing.create({
      title: req.body.title,
      description: req.body.description,
      plants: req.body.plants,
      pets: req.body.pets,
      contact: req.body.contact,
      file_url: req.body.fileUrl,
      circle_url: req.body.circleUrl,
      user_id: req.body.userId
    }, req.body);
    res.status(200).json(newListing);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete Listing by ID
router.delete('/:id', async (req, res) => {
  try {
    const listingData = await Listing.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!listingData) {
      res.status(404).json({ message: 'No listing found with this ID!' });
      return;
    }
    res.status(200).json(listingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
