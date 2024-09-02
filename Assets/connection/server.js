const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//  importing and using the routes:
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');


app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social_media_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
