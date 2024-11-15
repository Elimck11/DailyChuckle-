import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';  // Ensure this import path is correct
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';  // Import your AuthService

const SignInForm = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Send the login request to the GraphQL server using Apollo's useMutation hook
      const { data } = await login({
        variables: { ...formState },
      });

      // On success, store the JWT token and redirect the user
      Auth.login(data.login.token);  // This stores the token and redirects
      navigate('/');  // Optionally redirect to homepage after login

    } catch (e) {
      console.error('Error logging in:', e);
    }

    setFormState({
      username: '',
      password: '',
    });
  };

  return (
    <section className="sign-in-box">
      <h2>Sign In</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className="form-input"
          placeholder="Your username"
          name="username"
          type="username"
          value={formState.username}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          required
        />
        <button
          className="btn btn-block btn-primary"
          type="submit"
          style={{ cursor: 'pointer' }}
        >
          Submit
        </button>
      </form>

      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}

      {data && (
        <p>
          Success! You are now logged in and can <a href="/">go back to the homepage</a>.
        </p>
      )}
    </section>
  );
};

export default SignInForm;
