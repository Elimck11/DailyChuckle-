import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      user {
        _id
        username
      }
      token
    }
  }
`;

export const ADD_JOKE = gql`
  mutation addJoke($input: JokeInput!) {
    addJoke(input: $input) {
      _id
      jokeText
      jokeAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($jokeId: ID!, $commentText: String!) {
    addComment(jokeId: $jokeId, commentText: $commentText) {
      _id
      jokeText
      jokeAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
        user {
          _id
          username
        }
      }
    }
  }
`;