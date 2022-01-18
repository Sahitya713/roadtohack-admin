import React from "react";

import "./custom-button.styles.css";

const CustomButton = ({ children, ver2, inverted, ...otherProps }) => (
  <button className="custom-button" {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
