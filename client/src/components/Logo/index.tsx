interface LogoProps {
  logoClicked: boolean;
  onLogoClick: () => void;
}

const Logo = ({ logoClicked, onLogoClick }: LogoProps) => {
  return (
    <h1 
      className={`logo-text ${logoClicked ? 'logo-clicked' : ''}`} 
      onClick={onLogoClick}
    >
      DAILY CHUCKLE
    </h1>
  );
};

export default Logo;
