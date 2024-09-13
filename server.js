const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const userRoutes = require('./controllers/api/userRoutes');
const postRoutes = require('./controllers/api/postRoutes');
const commentRoutes = require('./controllers/api/commentRoutes');
const homeRoutes = require('./controllers/homeRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up session
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000, // Idle time 
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Use routes
app.use('/api/users', userRoutes); // Ensure the route prefix is correctly set
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/', homeRoutes);

// Sync Sequelize and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
