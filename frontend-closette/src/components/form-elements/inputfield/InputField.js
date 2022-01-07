import React from 'react';
import './InputField.css';

function InputField({ errors, register, labelText, labelId, inputType = "text", inputName, validationRules }) {

  return (
    <>
      <label htmlFor={labelId}>
        {labelText}
      </label>
      <input type={inputType} id={labelId}
             className={errors[inputName] && "error"}  {...register(inputName, validationRules)} />
      {errors[inputName] && <p className="error-message">{errors[inputName].message}</p>}
    </>
  );
}

export default InputField;