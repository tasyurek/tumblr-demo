import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Blog from "./components/Blog/Blog";
import { Container } from "./libs/Container";

const App = () => {
  return (
    <div className="app">
      <Container>
        <Blog />
      </Container>
    </div>
  );
};

export default App;
