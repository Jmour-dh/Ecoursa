import React, { useContext } from 'react';
import { AuthContext } from "../context";
import { NavLink } from 'react-router-dom';

const Logout: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { signout } = authContext;

  return (
    <div>
      <NavLink onClick={() => signout()} to="/">Déconnexion</NavLink>
    </div>
  );
}

export default Logout;
