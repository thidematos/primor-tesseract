import mongoose from 'mongoose';

const connection = async () => {
  const string = process.env.DB_CONNECTION.replace(
    '<password>',
    process.env.DB_PASSWORD
  );

  await mongoose.connect(string);

  console.log('Mongo connected! 🦊');
};

export default connection;
