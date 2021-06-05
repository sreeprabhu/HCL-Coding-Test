
import { useState } from 'react';
import './App.css';
import { Grid, TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { validatePassword } from './passwordHelper';

const Password = () => {
  const defaultPasswords = { firstPassword: { value: '', lower: true, upper: true, special: true, numbers: true, length: true }, secondPassword: { value: '', lower: true, upper: true, special: true, numbers: true, length: true } };
  const [passwords, setPassword] = useState(defaultPasswords);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);

  /**
   * Passwod change handler method
   * @param {change event} e 
   * @param {password key} key 
   */
  const handlePasswordChange = (e, key) => {
    setPassword({ ...passwords, [key]: { ...passwords[key], value: e.target.value } });
  }

  /**
   * Verify password button handler method
   */
  const handleSubmit = () => {
    let verifiedPasswords = { ...passwords };
    let isVerified = true;
    if (verifiedPasswords.firstPassword.value === verifiedPasswords.secondPassword.value) {
      Object.keys(passwords).forEach(key => {
        verifiedPasswords[key] = validatePassword({ ...passwords[key] });

        /** Verifies if all the conditioons are met */
        if (Object.values(verifiedPasswords[key]).some(item => !item)) {
          isVerified = false;
        }
      });
      setPassword(verifiedPasswords);
      setPasswordMatch(true);

      if (isVerified) {
        setPasswordVerified(true);
      } else {
        setPasswordVerified(false);
      }
    } else {
      setPasswordMatch(false);
      setPasswordVerified(false);
    }
    setSubmitClicked(true);
  }

  /**
   * method to render error messages
   * @param {password item} item 
   * @param {passwor type} type 
   * @returns Error Messages
   */
  const renderErrorMessages = (item, type) => {
    switch (type) {
      case 'lower':
        if (!item[type]) {
          return 'password must contain atleast one lowercase letter';
        }
        return '';
      case 'upper':
        if (!item[type]) {
          return 'password must contain atleast one uppercase letter';
        }
        return '';
      case 'special':
        if (!item[type]) {
          return 'password must contain atleast one special character';
        }
        return '';
      case 'numbers':
        if (!item[type]) {
          return 'password must contain atleast one number';
        }
        return '';
      case 'length':
        if (!item[type]) {
          return 'password must contain atleast 6 letters';
        }
        return '';
      default: return '';
    }
  }

  /**
   * Method to render error containers
   * @param {password item} item 
   * @returns Error Container
   */
  const renderErrors = item => {
    return (
      <Grid container xs={6} flex-direction="row" justify="center" alignItems="center" className="error-container">
        {
          passwordMatch && Object.keys(item).map(key => {
            if (key !== 'value') {
              return <Grid item xs={12} className="password-error">{renderErrorMessages(item, key)}</Grid>;
            }
          })
        }
      </Grid>
    )
  }

  const renderAlerts = () => {
    if (passwordVerified) {
      return <Alert severity="success" className="success-alert">Successfully Submitted!</Alert>;
    } else if (submitClicked && (!passwordMatch || !passwordVerified)) {
      return <Alert severity="error" className="success-alert">Submission Failed!</Alert>;
    }
    return null;
  }

  return (
    <Grid container flex-direction="row" justify="center" alignItems="center" className="main-container" xs={6}>
      <Grid container flex-direction="row" justify="center" alignItems="center" className="header-container" xs={12}>
        <Grid item xs={3}>Password Manager</Grid>
      </Grid>
      {
        Object.keys(passwords).map(key => {
          return (<Grid key={key} container xs={12} className="password-container">
            <Grid item xs={3} className="password-label">
              {key === 'firstPassword' ? 'Type Password' : 'Re-Type Password'}
            </Grid>
            <Grid item xs={3} className="password-input">
              <TextField type="password" placeholder="password" value={passwords[key].value} onChange={e => handlePasswordChange(e, key)} />
            </Grid>
            {renderErrors(passwords[key])}
          </Grid>)
        })
      }
      <Grid container flex-direction="row" justify="center" alignItems="center" xs={12}>
        <Grid item xs={3} className="password-error match-error">{!passwordMatch ? 'Passwords should match!' : ''}</Grid>
      </Grid>
      <Grid container flex-direction="row" justify="center" alignItems="center" className="button-container" xs={12}>
        <Grid item xs={2} className="password-label">
          <Button className="verify-button" variant="contained" color="primary" onClick={() => handleSubmit()}>Submit</Button>
        </Grid>
      </Grid>
      <Grid container flex-direction="row" justify="center" alignItems="center" xs={12}>
        <Grid item xs={4}>{renderAlerts()}</Grid>
      </Grid>
    </Grid>
  );
}

export default Password;
