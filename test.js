const express = require('express');
const mongoose = require('mongoose');

// Create an Express application
const app = express();
const port = 3000; // You can choose any port you like

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/mydb';

// Mongoose ko connect karna
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connection is establish !');
  })
  .catch((err) => {
    console.error('MongoDB connection NOT establish:', err);
  });

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, min: 0 }
});

// Create a User model
const User = mongoose.model('User', UserSchema);

// Endpoint to get all users (Read)
app.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});

// Endpoint to create a new user (Create) - Already created
const saveUsers = async () => {
  const users = [
    {
      name: 'Ali',
      email: 'ali@example.com',
      password: 'ABCkrfndsaihknuh',
      address: 'DHA phase 2',
      age: 25,
    },
    // Add other users as needed
    {
      name: 'Sara',
      email: 'sara@example.com',
      password: '123456password',
      address: 'Model Town Lahore',
      age: 30,
    },
    {
      name: 'John',
      email: 'john@example.com',
      password: 'password123',
      address: 'New York',
      age: 28,
    },
    {
      name: 'Kate',
      email: 'kate@example.com',
      password: 'mypassword',
      address: 'California',
      age: 22,
    },
    {
      name: 'David',
      email: 'david@example.com',
      password: 'securepassword',
      address: 'Texas',
      age: 35,
    },
    {
      name: 'Emma',
      email: 'emma@example.com',
      password: 'mypassword123',
      address: 'Florida',
      age: 29,
    },
    {
      name: 'Michael',
      email: 'michael@example.com',
      password: 'password321',
      address: 'Ohio',
      age: 40,
    },
    {
      name: 'Olivia',
      email: 'olivia@example.com',
      password: 'password456',
      address: 'Illinois',
      age: 27,
    },
    {
      name: 'James',
      email: 'james@example.com',
      password: 'jamespassword',
      address: 'Nevada',
      age: 32,
    },
    {
      name: 'Sophia',
      email: 'sophia@example.com',
      password: 'sophiapassword',
      address: 'Washington',
      age: 26,
    },
  ];

  for (let user of users) {
    const newUser = new User(user);
    await newUser.save();
  }
};



// Endpoint to update a user by ID (Update)
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password, address, age } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password, address, age }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err });
  }
});

// Endpoint to delete a user by ID (Delete)
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

