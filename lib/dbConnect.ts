import mongoose from 'mongoose';

const url = process.env.MONGODB_URL as string;

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(url);
    return connection;
  } catch (error) {
    console.log('db connection fail: ', error);
  }
};

export default dbConnect;
