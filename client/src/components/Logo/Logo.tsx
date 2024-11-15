import { useState } from 'react';

const Logo = () => {
  const [logoClicked, setLogoClicked] = useState(false);

  const handleLogoClick = () => {
    setLogoClicked(!logoClicked);
  };

  return (
    <h1
      className={`logo-text ${logoClicked ? 'logo-clicked' : ''}`}
      onClick={handleLogoClick}
    >
      DAILY CHUCKLE
    </h1>
  );
};

export default Logo;
