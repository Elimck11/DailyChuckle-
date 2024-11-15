import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_JOKE } from '../../utils/mutations'; // Updated mutation name
import { QUERY_JOKES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const JokeForm = () => {
  const [jokeText, setJokeText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addJoke, { error }] = useMutation(ADD_JOKE, {
    refetchQueries: [
      QUERY_JOKES,
      'getJokes', // Refactored query name
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addJoke({
        variables: { input: {
          jokeText,
          jokeAuthor: Auth.getProfile().data.username,
        }},
      });

      setJokeText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'jokeText' && value.length <= 280) {
      setJokeText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's your best joke?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="jokeText"
                placeholder="Here's a new joke..."
                value={jokeText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Joke
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your jokes. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default JokeForm;
