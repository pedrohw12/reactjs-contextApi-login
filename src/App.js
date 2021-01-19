import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./contexts/auth";
import Routes from "./routes";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes />
    </Router>
  </AuthProvider>
);

export default App;
