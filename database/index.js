const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/recipes';


mongoose.connect(mongoUri);
const db = mongoose.connection;

module.exports = db;



