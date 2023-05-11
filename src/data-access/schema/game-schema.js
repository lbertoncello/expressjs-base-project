import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    title: String,
    rating: Number,
    summary: String,
  },
  { timestamps: true }
);

export default schema;
