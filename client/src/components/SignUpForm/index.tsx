import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/mutations'; // Import the GraphQL mutation for user creation
import Auth from '../../utils/auth'; // Import your AuthService
import type { UserRegister } from '../../interfaces/UserRegister';

const SignUpForm = () => {
  const [userFormData, setUserFormData] = useState<UserRegister>({
    username: '',
    email: '',
    password: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [createUserMutation] = useMutation(CREATE_USER);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await createUserMutation({
        variables: {
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      if (data?.registerUser?.token) {
        Auth.login(data.registerUser.token); // Store the token using Auth utility
      }

      setUserFormData({ username: '', email: '', password: '' }); // Clear form
    } catch (err) {
      console.error(err);
      setShowAlert(true); // Show an alert on error
    }
  };

  return (
    <section className="sign-in-box">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Username input */}
        <input
          className="form-input"
          placeholder="Your username"
          name="username"
          type="text"
          value={userFormData.username}
          onChange={handleInputChange}
          required
        />
        {/* Email input */}
        <input
          className="form-input"
          placeholder="Your email address"
          name="email"
          type="email"
          value={userFormData.email}
          onChange={handleInputChange}
          required
        />
        {/* Password input */}
        <input
          className="form-input"
          placeholder="******"
          name="password"
          type="password"
          value={userFormData.password}
          onChange={handleInputChange}
          required
        />
        {/* Submit button */}
        <button className="btn btn-block btn-primary" type="submit">
          Sign Up
        </button>
      </form>

      {/* Error message */}
      {showAlert && (
        <div className="error-message">
          Something went wrong with your signup. Please try again.
        </div>
      )}
    </section>
  );
};

export default SignUpForm;
