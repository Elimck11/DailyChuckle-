const SignInForm = () => {
    const handleButtonClick = () => {
      alert('Sign-in button clicked!');
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleButtonClick();
    };
  
    return (
      <section className="sign-in-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Enter</button>
        </form>
      </section>
    );
  };
  
  export default SignInForm;
  