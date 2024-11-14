import { Schema, model, Document } from 'mongoose';

// Define an interface for the Comment document
interface IComment extends Document {
  commentText: string;
  author: Schema.Types.ObjectId;
  joke: Schema.Types.ObjectId;
  timestamp: Date;
}

// Define the schema for the Comment document
const commentSchema = new Schema<IComment>(
  {
    commentText: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    joke: {
      type: Schema.Types.ObjectId,
      ref: 'Joke',
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;
