import React from 'react';
import './InputField.css';

function InputTextarea({ errors, register, placeholderText, rowNr, columnNr, labelText, labelId, inputName, validationRules }) {

  return (
    <>
      <label htmlFor={labelId}>
        {labelText}
      </label>
      <textarea
             id={labelId}
             className={errors[inputName] && "error"}
             {...register(inputName, validationRules)}
             placeholder={placeholderText}
             rows={rowNr}
             cols={columnNr}
      />
        {errors[inputName] && <p className="error-message">{errors[inputName].message}</p>}
    </>
  );
}

export default InputTextarea;