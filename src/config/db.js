const mongoose = require('mongoose');
const dotenv = require('dotenv');
const figlet = require('figlet');
const colors = require('colors');
dotenv.config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        figlet('DB Connected!', (err, data) => {
            if (err) {
                console.error('Figlet error:', err);
                return;
            }
            console.log(data.green);
            console.log(`[${new Date().toISOString()}] Database connection was successful!`.blue.bold);
        });
    } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ DB Connection Failed:`.red.bold, error);
    }
};

module.exports = dbConnection;