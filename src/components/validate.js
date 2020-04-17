export const validateAccessToken = (values) => {
  const errors = {};
  if (!values) {
    return errors;
  }

  if (!values.accessToken) {
    errors.accessToken = 'Required';
  }

  if (values.accessToken) {
    const numerical = /^[a-zA-Z0-9]*$/.test(values.accessToken);
    
    if (!numerical) {
      errors.accessToken =  'Access token should only contain numbers';
    }
  }

  return errors;
};
