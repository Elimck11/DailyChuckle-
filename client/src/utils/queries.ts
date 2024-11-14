import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      jokes {
        _id
        jokeText
        jokeAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_JOKES = gql`
  query getJokes {
    jokes {
      _id
      jokeText
      jokeAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_JOKE = gql`
  query getSingleJoke($jokeId: ID!) {
    joke(jokeId: $jokeId) {
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      jokes {
        _id
        jokeText
        jokeAuthor
        createdAt
      }
    }
  }
`;