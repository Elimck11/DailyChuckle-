import React, { useEffect, useState } from 'react';

const JokeBox: React.FC = () => {
  const [joke, setJoke] = useState<string>('Loading joke...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await fetch(
          'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single'
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setJoke(data.joke);
      } catch (err: any) {
        setError('Failed to fetch joke. Please try again later.');
        console.error(err.message);
      }
    };

    fetchJoke();
  }, []);

  return (
    <section className="joke-box">
      <h2>Joke of the Day</h2>
      <p className="joke-content">
        {error ? error : joke}
      </p>
    </section>
  );
};

export default JokeBox;
