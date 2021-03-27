# Autenticação com Context Api

Vamos entender como a Context Api funciona, e iremos usá-la para autenticar usuários (fazer login) e cadastrar novos usuários.

## O que é a Context Api?
É uma Api do react, que visa possibilitar a criação de contextos, e disponibilizar as informações deste contexto, para quaisquer componentes que quisermos, dentro da apicação.

Em outras palavras, podemos criar estados globais. Armazenar valores neste contexto, e acessá-los de qualquer componente.

## Passo 1 - Criando um contexto

Vamos começar criando um contexto para a autenticação. (na pasta contexts, o arquivo auth.js)

Para criar o contexto:

```javascript
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
coloca markdown.to_html

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext({});

```

## Passo 2 - Criando um provider para este contexto

Agora que já criamos o contexto, é necessário disponibilizarmos as informações que terão dentro dele, para todos os componentes que quisermos.

Para tanto, criamos o provider:

```javascript
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
coloca markdown.to_html

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const storagedUser = localStorage.getItem("@App:user");
    const storagedToken = localStorage.getItem("@App:token");

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  function logout() {
    setUser(null);

    localStorage.removeItem("@App:user");
    localStorage.removeItem("@App:token");
  }

  async function login(email, password) {
    const response = await api.post("/sessions", {
      email: email,
      password: password,
    });

    setUser(response.data.user);
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    localStorage.setItem("@App:user", JSON.stringify(response.data.user));
    localStorage.setItem("@App:token", response.data.token);
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

```

## Passo 3 - Criar um hook para usar este contexto de forma mais simples

Agora que já criamos o contexto e o provider deste contexto, iremos criar um hook para poder acessar as informações deste contexto, de forma mais rápida e com menos código.

Com este hook, podemos tanto acessar as informações contidas no contexto, quanto disparar as funções que estão neste contexto.


```javascript
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
coloca markdown.to_html

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

```

E ao final, não esquecer de exportar por padrão, o contexto:

```javascript
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
coloca markdown.to_html

export default AuthContext;

```

### Arquivo completo:

```javascript
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
coloca markdown.to_html

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const storagedUser = localStorage.getItem("@App:user");
    const storagedToken = localStorage.getItem("@App:token");

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  function logout() {
    setUser(null);

    localStorage.removeItem("@App:user");
    localStorage.removeItem("@App:token");
  }

  async function login(email, password) {
    const response = await api.post("/sessions", {
      email: email,
      password: password,
    });

    setUser(response.data.user);
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    localStorage.setItem("@App:user", JSON.stringify(response.data.user));
    localStorage.setItem("@App:token", response.data.token);
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;

```

## Passo 4 - Disponibilizar o contexto para componentes

Agora que criamos o contexto e o provider, vamos colocar dentro deste provider, os componentes que desejamos que tenha acesso a este contexto:

```javascript
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
coloca markdown.to_html

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

``` 

## Passo 5 - Usar informações/funções de dentro do contexto

Agora iremos fazer o login, usando a função de login que está dentro deste contexto:

```javascript
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
coloca markdown.to_html

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

``` 

## Resumo

Para termos funções e valores acessíveis em toda a aplicação, basta criarmos um contexto, um provider para este contexto, contendo tudo o que desejamos tornar acessível globalmente, e englobar com o provider, os componentes que desejarmos acessar tais informações. 


