const express = require('express'); // Import express
const connectDB = require('./config/db');
const path = require('path');

const app = express(); // Initialize express

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); // We can accept body-data - "res.send(req.data)"

// // Add an end point (url and data)
// app.get('/', (req, res) =>
//   res.json({ msg: 'Welcome to the Contact Keeper API...' })
// );

// Define Routes
app.use('/api/users', require('./routes/users')); //app.use(url, file) - when we are on 'url' look for 'file'
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Server static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder (to get build folder - run 'npm run build' inside client folder)
  app.use(express.static('client/build'));

  // '*' means anything, that is not '/api/users', '/api/auth/' or '/api/contacts'. This can be home/about/register/load page
  // NodeJS path module - to deal with file paths
  // path.resolve(look at the current directory, look in 'client, look in 'build, load 'index.html')
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// First look for environmental variable called port (for production) OR look for port 5000 (for development)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // App object has a listen method, that takes in a PORT, to listen on, and a callback function
