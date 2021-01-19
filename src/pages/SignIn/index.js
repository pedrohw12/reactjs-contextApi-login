import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/auth";

import "./styles.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useAuth();

  function handleSubmit() {
    context.login(email, password);
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <div className="form">
        <input
          placeholder="usuário"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          placeholder="senha"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Acessar
        </button>
      </div>
      <Link to="/signup">Cadastrar</Link>
    </div>
  );
};

export default SignIn;
