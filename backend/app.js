const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { sequelize, User } = require('./models'); // Adjust the path as needed

app.use(express.json());

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Failed to sync database:', err);
});

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
