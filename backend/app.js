const express = require('express');
const cors = require('cors');  // Add this line to require CORS
const app = express();
const port = process.env.PORT || 3000;
const { sequelize, User } = require('./models'); // Adjust the path as needed
const routes = require('./routes'); // Import the routes.js file

app.use(cors());  // Add this line to enable CORS
app.use(express.json());

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Failed to sync database:', err);
});

// Use the routes defined in routes.js
app.use('/', routes); // This registers all the routes from routes.js under the root path

// Example route to test the server and database connection
app.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
