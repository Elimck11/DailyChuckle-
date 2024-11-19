import db from '../config/connection.js';
import { Joke, User } from '../models/index.js';
import cleanDB from './cleanDB.js';

import userData from './userData.json' assert { type: 'json' };
import jokeData from './jokeData.json' assert { type: 'json' };

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    // Insert users into the database
    const users = await User.insertMany(userData);

    // Map jokeData to replace jokeAuthor with the corresponding user ID
    const jokesWithAuthorIds = jokeData.map((joke) => {
      const author = users.find((user) => user.username === joke.jokeAuthor);
      if (!author) {
        throw new Error(`User not found for jokeAuthor: ${joke.jokeAuthor}`);
      }
      return { ...joke, jokeAuthor: author._id }; // Replace jokeAuthor with ObjectId
    });

    // Insert jokes with author IDs into the database
    await Joke.insertMany(jokesWithAuthorIds);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
