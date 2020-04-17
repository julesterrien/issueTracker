import React from 'react';

const Field = ({
  label,
  name,
  type = 'text',
  placeholder,
  input,
  autoFocus = false,
  meta: {
    touched,
    error,
  }
}) => {
  return (
    <div>
      <label htmlFor={name}>
        {label}
      </label>
      <div>
        <input {...input} autoFocus={autoFocus} placeholder={placeholder} name={name} type={type} />
        {touched && (error && <span>{error}</span>)}
      </div>
    </div>
  );
};

export default Field;
