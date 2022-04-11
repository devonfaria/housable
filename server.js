const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');

const { existsSync, mkdirSync } = require('fs');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// function checkSession(req, res, next) {
//   if (req.session.cookie) {
//     console.log("Exists");
//     console.log(req.session.cookie);
//     next();
//   } else {
//     console.log("No exist :( ");
//     next();
//   }
// }

// app.use(session(sess), checkSession);

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Restricts file size of images or any media uploaded to 10mb
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
  // Creates a temporary directory if it doesn't exist
  const dir = path.join(__dirname, 'tmp/');
  if (!existsSync(dir)) mkdirSync(dir, 0744);
});

