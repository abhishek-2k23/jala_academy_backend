import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = () => {
    const url = process.env.DB_URL || '';
    mongoose.connect(url).then(() => console.log("DB Connected")).catch((e) => console.log(e))
}

export default dbConnect;