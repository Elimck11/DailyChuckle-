const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    jokes: [Joke]!
    favorites: [Joke]
  }

  type Joke {
    _id: ID
    jokeText: String
    jokeAuthor: String
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    commentAuthor: String
  }

  input JokeInput {
    jokeText: String!
    jokeAuthor: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    jokes: [Joke]!
    joke(jokeId: ID!): Joke
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    registerUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addJoke(input: JokeInput!): Joke
    addComment(jokeId: ID!, commentText: String!): Joke
    removeJoke(jokeId: ID!): Joke
    removeComment(jokeId: ID!, commentId: ID!): Joke
  }
`;

export default typeDefs;
