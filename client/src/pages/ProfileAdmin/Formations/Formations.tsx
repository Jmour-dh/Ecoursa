import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Formations  : React.FC = () => {
  const { key } = useLocation();
  return (
    <Suspense>
    <Outlet key={key} />
  </Suspense>
  )
}

export default Formations