import { Comment } from './Comment';

export interface Joke {
    id: string; // Use `id` (mapped from `_id` in backend)
    jokeText: string;
    jokeAuthor: string;
    createdAt: string;
    comments: Comment[]; // A list of comments associated with the joke
    upvotes: number;
}
  