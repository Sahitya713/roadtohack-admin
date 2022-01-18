import React from "react";
import Spinner from "./spinner";

const WithSpinner = (WrappedComponent) => {
  const SpinnerO = ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
  };
  return SpinnerO;
};

export default WithSpinner;
