import React, { useState } from 'react';
import UserForm from '../../components/Homepage/UserForm';
import './Homepage.css';

export const Homepage = ({ onAuthenticate, username, data, updateUserData }) => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [formType, setFormType] = useState('login');

  function hideForm() {
    setFormVisibility(false);
  }

  function showForm(type) {
    setFormType(type);
    setFormVisibility(true);
  }

  return (
    <>
      <div className='titleContainer'>
        <p className='welcome'>Welcome to</p>
        <h1>Task Tango</h1>
        <div className='actionButtonContainer'>
          <button className='actionButton animateButton homepageButton' onClick={() => showForm('login')}>
            <p>Sign In</p>
          </button>
          <button className='actionButton animateButton homepageButton' onClick={() => showForm('register')}>
            <p>Register</p>
          </button>
        </div>
        <p className='note'>
          NOTE: Backend functionality to be added <br></br> Simple login using any username and password (no
          registration needed for now) <br></br>
          Data stored locally and tied to your username
        </p>
      </div>
      {formVisibility && (
        <UserForm
          formType={formType}
          hideForm={hideForm}
          showForm={showForm}
          onAuthenticate={onAuthenticate}
          username={username}
          data={data}
          updateUserData={updateUserData}
        />
      )}
    </>
  );
};
