const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbConnection = async () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log('DB Connected Successfully ...'))
    .catch(err => console.log(err));
};


module.exports = dbConnection;