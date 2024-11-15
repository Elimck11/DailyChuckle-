import { useState } from 'react';

import JokeBox from '../components/JokeBox';
import SignInForm from '../components/SignInForm';
import Logo from '../components/Logo';
import BackgroundOverlay from '../components/BackgroundOverlay';

const Home = () => {
  const [logoClicked, setLogoClicked] = useState(false);

  const handleLogoClick = () => {
    setLogoClicked(!logoClicked);
  };

  return (
    <div className="App">
      <BackgroundOverlay />

      <div className="background"></div>
      <main className="content-container">
        <Logo logoClicked={logoClicked} onLogoClick={handleLogoClick} />
        
        <div className="boxes-container">
          <SignInForm />
          <JokeBox />
        </div>
      </main>
    </div>
  );
};

export default Home;
