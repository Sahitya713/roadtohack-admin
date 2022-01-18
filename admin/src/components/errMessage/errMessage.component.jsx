import React from "react";

const ErrMessage = ({ message }) => (
  <div>{message && <div>***{message}***</div>}</div>
);

export default ErrMessage;
