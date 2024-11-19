import db from '../config/connection.js';
import { Joke, User } from '../models/index.js';
import cleanDB from './cleanDB.js';

import userData from './userData.json' with { type: 'json' };
import jokeData from './jokeData.json' with { type: 'json' };
import bcrypt from 'bcrypt';

const saltRounds = 10;

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    // Hash the passwords in userData before inserting them
    const hashedUsers = await Promise.all(
      userData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return { ...user, password: hashedPassword };
      })
    );

    // Insert the users with hashed passwords
    const users = await User.insertMany(hashedUsers);

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
