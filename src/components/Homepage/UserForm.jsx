import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CancelButton from './CancelButton';
import './UserForm.css';
import usePasswordValidation from './usePasswordValidation';
import { userData } from '../../assets/userData'; // Example object

const UserForm = ({ onAuthenticate, formType, hideForm, showForm, username, data, updateUserData }) => {
  const {
    password,
    confirmPassword,
    classForConfirmPassword,
    isButtonDisabled,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = usePasswordValidation();

  const [loginError, setLoginError] = useState(false);
  const [formTitle, setFormTitle] = useState(
    <p>Enter information to {formType === 'login' ? 'Sign in' : 'Register'}:</p>,
  );
  const navigate = useNavigate();

  // Loads local storage object or creates the default one
  const handleData = () => {
    let localData = window.localStorage.getItem(`TaskTango_${username}`);
    localData = JSON.parse(localData);
    localData
      ? (data = localData)
      : (data = {
          ...userData,
          username: username,
        });
    // localData ? console.log('Loaded local data:', localData) : console.log('Failed to load local data.');
  };

  // Handle form submission logic here
  const handleSubmit = (event) => {
    event.preventDefault();
    username = event.target.elements.username.value;
    handleData();

    // handle API call
    // API RETURNS: Object & Authentification
    // Replace with actual authentication logic
    const authorized = true;
    // Replace with actual data received from backend

    // Authorized vs Unauthorized
    if (authorized) {
      navigate(onAuthenticate(data));
    } else {
      setLoginError(true);
    }
  };

  useEffect(() => {
    if (loginError) {
      formType === 'login'
        ? setFormTitle(<p style={{ color: 'var(--element-color-alt3)' }}>Wrong Credentials. Try Again.</p>)
        : setFormTitle(<p style={{ color: 'var(--element-color-alt3)' }}>Username or E-mail already in use!</p>);
      setTimeout(() => {
        setLoginError(false);
      }, 5000);
    } else {
      setFormTitle(<p>Enter information to {formType === 'login' ? 'Sign in' : 'Register'}:</p>);
    }
  }, [loginError]);

  return (
    <>
      <div className='formModal fade-in'> </div>
      <div className='userForm fade-in'>
        <form onSubmit={handleSubmit}>
          <div className='formElements'>
            <button className='cancelButtonContainer' onClick={hideForm}>
              <CancelButton></CancelButton>
            </button>
            {formTitle}
            <label htmlFor='username'>Username:</label>
            <input type='text' id='username' name='username' required />
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              required
              value={password}
              onChange={handlePasswordChange}
            />
            {formType === 'register' && (
              <>
                <label htmlFor='confirmPassword'>Confirm Password:</label>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={classForConfirmPassword}
                />
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' required />
              </>
            )}
          </div>
          <div className='actionButtonContainer'>
            <button className='actionButton animateButton' type='submit' disabled={isButtonDisabled}>
              <p>{formType === 'login' ? 'Sign In' : 'Register'}</p>
            </button>
            <button
              className='actionButton alternative'
              type='button'
              onClick={() => showForm(formType === 'login' ? 'register' : 'login')}
            >
              <p>{formType === 'login' ? 'Register' : 'Sign In'}</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;
