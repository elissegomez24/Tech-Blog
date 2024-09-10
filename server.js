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
app.use(
  session({
    secret: 'Super secret secret',
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// Sync database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Use routers
app.use('/', homeRoutes);  // Main routes (login, homepage, dashboard)
app.use('/api/users', userRoutes);  // API routes for user login and registration
app.use('/api/posts', postRoutes);  // API routes for posts
app.use('/api/comments', commentRoutes);  // API routes for comments

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
