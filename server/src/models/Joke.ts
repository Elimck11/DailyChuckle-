import { Schema, model, Document } from 'mongoose';

// Define an interface for the Joke document
interface IJoke extends Document {
  jokeText: string;
  jokeAuthor: string;
  timestamp: Date;
  upvotes: number;
}

// Define the schema for the Joke document
const jokeSchema = new Schema<IJoke>(
  {
    jokeText: {
      type: String,
      required: true,
      trim: true,
    },
    jokeAuthor: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Joke = model<IJoke>('Joke', jokeSchema);

export default Joke;
