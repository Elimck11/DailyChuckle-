import { User, Joke } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
// import { GraphQLError } from 'graphql';

// Define types for the arguments
interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  username: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface JokeArgs {
  jokeId: string;
}

interface AddJokeArgs {
  input: {
    jokeText: string;
    jokeAuthor: string;
  };
}

interface AddCommentArgs {
  jokeId: string;
  commentText: string;
}

interface RemoveCommentArgs {
  jokeId: string;
  commentId: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('jokes');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('jokes');
    },
    jokes: async () => {
      return await Joke.find().sort({ createdAt: -1 });
    },
    joke: async (_parent: any, { jokeId }: JokeArgs) => {
      return await Joke.findOne({ _id: jokeId });
    },
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('jokes');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
  },

  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    registerUser: async (_: any, { username, email, password }: { username: string; email: string; password: string }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists with this email");
      }
  
      // Create user (password is hashed by pre-save hook)
      const user = await User.create({ username, email, password });
  
      // Generate JWT token using signToken with userId
      const token = signToken(user.username, user.email, user._id); // Use user._id.toString()
  
      return { token, user };
    },
    
    login: async (_parent: any, { username, password }: LoginUserArgs) => {
      const user = await User.findOne({ username });
      if (!user) throw new AuthenticationError('Could not authenticate user.');
      
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError('Could not authenticate user.');

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    addJoke: async (_parent: any, { input }: AddJokeArgs, context: any) => {
      if (context.user) {
        const { jokeText } = input;
    
        // Find the user in the database
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new AuthenticationError('User not found.');
        }
    
        try {
          // Create a new joke
          const joke = await Joke.create({
            jokeText,
            jokeAuthor: user.username, // Store the username, not the userId
          });
    
          // Ensure joke creation was successful
          if (!joke) {
            throw new Error('Failed to create joke');
          }
    
          // Log for debugging (remove or replace with a logger for production)
          console.log(`Joke by ${joke.jokeAuthor} created: ${joke.jokeText}`);
    
          // Update the user's jokes array
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { jokes: joke._id } }  // Add the joke's _id to the user's jokes array
          );
    
          return joke;
        } catch (error) {
          // Handle any errors during joke creation or user update
          throw new Error('Error while creating joke or updating user: ' + error);
        }
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    
    

    addComment: async (_parent: any, { jokeId, commentText }: AddCommentArgs, context: any) => {
      if (context.user) {
        return Joke.findOneAndUpdate(
          { _id: jokeId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeJoke: async (_parent: any, { jokeId }: JokeArgs, context: any) => {
      if (context.user) {
        const joke = await Joke.findOneAndDelete({
          _id: jokeId,
          jokeAuthor: context.user.username,
        });

        if (!joke) throw new AuthenticationError('Joke not found or not authorized.');

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { jokes: joke._id } }
        );

        return joke;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeComment: async (_parent: any, { jokeId, commentId }: RemoveCommentArgs, context: any) => {
      if (context.user) {
        return Joke.findOneAndUpdate(
          { _id: jokeId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

export default resolvers;
