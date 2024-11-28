const express = require('express');
const { sequelize, User } = require('./models');


const app = express();
const port = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    res.send('Hello World!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).send('Unable to connect to the database');
  }
});

// Route to create user
app.post('/user/create', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Unable to insert user' });
  }
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Unable to retrieve users' });
  }
});

// Route to update a user
app.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username;
    user.password = password;
    user.email = email;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Unable to update user' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
