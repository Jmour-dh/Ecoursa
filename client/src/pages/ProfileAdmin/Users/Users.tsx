import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Users: React.FC = () => {
  const { key } = useLocation();
  return (
    <Suspense>
      <Outlet key={key} />
    </Suspense>
  );
};

export default Users;
