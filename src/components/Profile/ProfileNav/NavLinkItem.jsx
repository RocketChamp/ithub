import React from "react";
import { NavLink } from "react-router-dom";

const NavLinkItem = ({ to, icon, name, style }) => {
  return (
    <NavLink
      style={style ? { ...style } : {}}
      id="navlinks"
      className={(navLinkObj) => "active-panel_" + navLinkObj.isActive}
      to={to}
    >
      {icon}
      <div>{name}</div>
    </NavLink>
  );
};

export default NavLinkItem;
