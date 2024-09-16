const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Set up session
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', routes);
app.use('/api', require('./controllers/api/commentRoutes'));
app.use('/api', require('./controllers/api/dashboardRoutes'));
app.use('/api', require('./controllers/api/index'));
app.use('/api', require('./controllers/api/postRoutes'));
app.use('/api', require('./controllers/api/userRoutes'));

// Sync Sequelize and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
