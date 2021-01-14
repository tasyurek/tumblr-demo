import React from "react";

export const Container = (props) => {
  return <div className="container">{props.children}</div>;
};

export const FitContainer = (props) => {
  return <div className="container--fit">{props.children}</div>;
};

export default Container;
