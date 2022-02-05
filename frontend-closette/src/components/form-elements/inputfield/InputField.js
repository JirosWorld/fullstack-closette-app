import React from 'react';
import './InputField.css';

function InputField({ errors, register, placeholderText, labelText, labelId, inputType, inputName, validationRules }) {

  return (
    <>
      <label htmlFor={labelId}>
        {labelText}
      </label>
      <input type={inputType}
             min="1"
             max="10"
             id={labelId}
             className={errors[inputName] && "error"}
             name={inputName}
             {...register(inputName, validationRules)}
             placeholder={placeholderText}
      />
        {errors[inputName] && <p className="error-message">{errors[inputName].message}</p>}
    </>
  );
}

export default InputField;