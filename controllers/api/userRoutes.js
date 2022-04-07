const router = require('express').Router();
const { User } = require('../../models');

// Create new User
router.post('/', async (req, res) => {
  // try {
  //   const dbUserData = await User.create({
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });

 
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all Users
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.findAll({});
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete User by ID
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No User found with this ID!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Validate User and log in
router.post('/login', async (req, res) => {
  try {
    // Uses email to find cooresponding user
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // Validates password
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // Sets loggedIn to true
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(
        '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      ),
      res.json({ user: userData, message: 'You are now logged in!' });

    });


  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout User
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
