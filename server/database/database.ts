import mongoose from "mongoose";
require('dotenv').config();
export default function databaseConnect() {
    const dbUrl = process.env.DBURL;
    if (!dbUrl) {
        console.error('Database environment variable is not defined');
        process.exit(1);
    }
    mongoose.connect(dbUrl)
        .then(() => console.log('Successfully connected to MongoDB:'))
        .catch(e => console.log(e))
}
