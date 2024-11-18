import React, { useState } from 'react';
import BackgroundOverlay from '../components/BackgroundOverlay';
import Logo from '../components/Logo';
import './App.css'; // Assuming CSS is in the same folder

const App: React.FC = () => {
  const [logoClicked, setLogoClicked] = useState(false);

  const handleLogoClick = () => {
    setLogoClicked(!logoClicked);
  };

  // List of jokes (example, you can replace/add more jokes)
  const jokes = [
    "Why did the chicken cross the road? To get to the other side!",
    "What do you call fake spaghetti? An impasta!",
    "How does a penguin build its house? Igloos it together!",
    "Why don’t skeletons fight each other? They don’t have the guts!",
    "What do you call cheese that isn’t yours? Nacho cheese!",
    "Why couldn’t the bicycle stand up by itself? It was two-tired!",
    // Repeat jokes to reach 36 or use different ones
  ];

  return (
    <div className="App">
      {/* Background overlay */}
      <BackgroundOverlay />

      {/* Logo and Jokes Container */}
      <main className="content-container">
        <Logo logoClicked={logoClicked} onLogoClick={handleLogoClick} />

        {/* Jokes Grid */}
        <div className="jokes-container">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="joke-box">
              {jokes[i % jokes.length]}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
