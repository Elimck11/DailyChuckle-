import { Link } from 'react-router-dom';
import { Joke } from '../../interfaces/Joke'

interface JokeListProps {
  jokes: Joke[];
  title: string;
}

const JokeList: React.FC<JokeListProps> = ({ jokes, title }) => {
  if (!jokes.length) {
    return <h3>No Jokes Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {jokes &&
        jokes.map((joke) => (
          <div key={joke.id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {joke.jokeAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                had this joke on {new Date(Number(joke.createdAt)).toLocaleString()}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{joke.jokeText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/jokes/${joke.id}`} // Updated to use "jokes" path and "id"
            >
              Join the discussion on this joke.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default JokeList;
