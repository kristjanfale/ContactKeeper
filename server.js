const express = require('express'); // Import express

const app = express(); // Initialize express

// Add an end point (url and data)
app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the Contact Keeper API...' })
);

// Define Routes
app.use('/api/users', require('./routes/users')); //app.use(url, file) - when we are on 'url' look for imported 'file'
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// First look for environmental variable called port (for production) OR look for port 5000 (for development)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // App object has a listen method, that takes in a PORT, to listen on, and a callback function
