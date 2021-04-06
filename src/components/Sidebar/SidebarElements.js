import React, { useState } from "react";


const SidebarElements = ({ children, sidebarStatus }) => {

  return (
    <div className={`side-bar ${sidebarStatus ? 'active-sidebar' : ''}`} >
      {children}
    </div>

  );
};

export default SidebarElements;