const router = require('express').Router();
const { Listing } = require('../../models');

// Get all listings
router.get('/', async (req, res) => {
  try {
    const allListings = await Listing.findAll({});
    res.status(200).json(allListings);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create new listing
router.post('/', async (req, res) => {
  try {
    const newListing = await Listing.create(req.body);
    res.status(200).json(newListing);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete listing by ID
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
