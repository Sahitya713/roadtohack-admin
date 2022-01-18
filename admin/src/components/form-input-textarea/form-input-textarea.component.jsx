import React from "react";

import "./form-input-textarea.styles.css";

const FormInputTextArea = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    <textarea
      className="form-input-textarea"
      onChange={handleChange}
      {...otherProps}
    />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-textarea-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInputTextArea;
