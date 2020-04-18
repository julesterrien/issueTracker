import React from 'react';

import './Field.css';

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
    <div className="field-wrapper">
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <div className="field-input-wrapper">
        <input
          className="field-input"
          autoFocus={autoFocus}
          placeholder={placeholder}
          name={name}
          type={type}
          {...input}
        />
        {touched &&
          (error && <span className="field-error">{error}</span>)
        }
      </div>
    </div>
  );
};

export default Field;
