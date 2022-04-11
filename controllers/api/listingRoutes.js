const router = require('express').Router();
const { Listing } = require('../../models');
const { unlinkSync } = require('fs');
const { upload, uploadToCloudinary } = require('../../controllers/upload');
const db = require('../../models');

// Get all Listings
router.get('/', async (req, res) => {
  try {
    const allListings = await Listing.findAll({});
    res.status(200).json(allListings);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/upload', upload, async (req, res) => {
  const { file } = req;
  // Captures the file data from the upload process and sends it to Cloudinary
  const result = await uploadToCloudinary(file.path, { folder: 'listings' });
  // When the upload is complete, delete it from the /tmp directory
  if (file) unlinkSync(file.path);
  console.log(result);
  // Ensure it exists before return the result otherise send a 404
  if (result) return res.json({ photoUrl: result.public_id });
  return res.statusCode(404);
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
