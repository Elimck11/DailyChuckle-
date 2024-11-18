import Auth from '../../utils/auth'

const Header = () => {
  return (
    <header className="main-header">
      <nav>
        <a href="/">Home</a>
        <a href="Jokes">Jokes</a>
        <a href="post">Post</a>
        <a href="profile">Profile</a>
        {Auth.loggedIn() ? (
          <a href='/' onClick={Auth.logout}>Logout</a>
        ) : null
        }
      </nav>
    </header>
  );
};

export default Header;
