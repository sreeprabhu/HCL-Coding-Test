
/**
 * Method to validate the passwords
 * @param {password item} item 
 * @returns validated password item
 */
export const validatePassword = item => {
  let validatedItem = {...item};
  // Validate lowercase letters
  const lowerCaseLetters = /[a-z]/g;
  if (!item.value.match(lowerCaseLetters)) {
    validatedItem = {...validatedItem, lower: false};
  } else {
    validatedItem = {...validatedItem, lower: true};
  }

  // Validate capital letters
  const upperCaseLetters = /[A-Z]/g;
  if (!item.value.match(upperCaseLetters)) {
    validatedItem = {...validatedItem, upper: false};
  } else {
    validatedItem = {...validatedItem, upper: true};
  }

  // Validate numbers
  const numbers = /[0-9]/g;
  if (!item.value.match(numbers)) {
    validatedItem = {...validatedItem, numbers: false};
  } else {
    validatedItem = {...validatedItem, numbers: true};
  }

  // Validate special characters
  const specialCharaters = /[.!@#$%^&*()_+-={}:;"<,>]/g;
  if (!item.value.match(specialCharaters)) {
    validatedItem = {...validatedItem, special: false};
  } else {
    validatedItem = {...validatedItem, special: true};
  }
  // Validate length
  if (item.value.length < 8) {
    validatedItem = {...validatedItem, length: false};
  } else {
    validatedItem = {...validatedItem, length: true};
  }
  return validatedItem;
}