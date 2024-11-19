import { useState, useEffect } from 'react';

const usePasswordValidation = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [classForConfirmPassword, setClassForConfirmPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Two passwords update on every change, Button is disabled for register until passwords match
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsButtonDisabled(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsButtonDisabled(true);
  };

  // Checks that password and password confirmation match
  useEffect(() => {
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        setClassForConfirmPassword('negativeMatch');
        setIsButtonDisabled(true);
      } else {
        setClassForConfirmPassword('');
        setIsButtonDisabled(false);
      }
    }
  }, [password, confirmPassword]);

  return {
    password,
    confirmPassword,
    classForConfirmPassword,
    isButtonDisabled,
    handlePasswordChange,
    handleConfirmPasswordChange,
  };
};

export default usePasswordValidation;
