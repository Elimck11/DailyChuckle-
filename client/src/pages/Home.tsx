import { useState } from 'react';

import JokeBox from '../components/JokeBox';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import Logo from '../components/Logo';
import BackgroundOverlay from '../components/BackgroundOverlay';

const Home = () => {
  const [logoClicked, setLogoClicked] = useState(false);
  const [activeTab, setActiveTab] = useState<'signIn' | 'signUp'>('signIn');

  const handleLogoClick = () => {
    setLogoClicked(!logoClicked);
  };

  const handleTabSwitch = (tab: 'signIn' | 'signUp') => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <BackgroundOverlay />

      <div className="background"></div>
      <main className="content-container">
        <Logo logoClicked={logoClicked} onLogoClick={handleLogoClick} />

        <div className="boxes-container">
          {/* Tab Navigation */}
          {/* <div className="tab-switch">
            <button
              className={`tab ${activeTab === 'signIn' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('signIn')}
            >
              Sign In
            </button>
            <button
              className={`tab ${activeTab === 'signUp' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('signUp')}
            >
              Sign Up
            </button>
          </div> */}

          {/* Tab Content */}
          <div className="form-container">
          <div className="tab-switch">
            <button
              className={`tab ${activeTab === 'signIn' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('signIn')}
            >
              Sign In
            </button>
            <button
              className={`tab ${activeTab === 'signUp' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('signUp')}
            >
              Sign Up
            </button>
          </div>
            {activeTab === 'signIn' && <SignInForm />}
            {activeTab === 'signUp' && <SignUpForm />}
          </div>

          {/* Joke Box */}
          <JokeBox />
        </div>
      </main>
    </div>
  );
};

export default Home;
