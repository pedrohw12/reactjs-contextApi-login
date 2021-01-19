import React from "react";

import { useAuth } from "../../contexts/auth";

const Dashboard = () => {
  const context = useAuth();

  async function handleLogout() {
    context.logout();
  }

  return (
    <>
      <h1>área privada</h1>
      <button onClick={handleLogout}>Sair</button>
    </>
  );
};

export default Dashboard;
