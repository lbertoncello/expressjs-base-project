import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: String,
  rating: Number,
  summary: String,
});

export default schema;
