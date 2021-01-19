import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const SignUp = () => {
  return (
    <div>
      <h1>Cadastro</h1>
      <div className="form">
        <input placeholder="usuário" />
        <input placeholder="senha" />
        <input type="submit" placeholder="enviar" />
      </div>
      <Link to="/">Já possuo uma conta</Link>
    </div>
  );
};

export default SignUp;
