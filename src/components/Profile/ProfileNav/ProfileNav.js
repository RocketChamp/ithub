import React from "react";
import {
  BsFillInfoCircleFill,
  BsFilePostFill,
  BsFillKanbanFill,
} from "react-icons/bs";
import NavLinkItem from "./NavLinkItem";

const NavLinks = () => {
  return (
    <>
      <NavLinkItem
        style={{ width: "31%" }}
        icon={<BsFillInfoCircleFill size="25px" />}
        to={`info`}
        name={`General`}
      />
      <NavLinkItem
        style={{ width: "31%" }}
        icon={<BsFilePostFill size="25px" />}
        to={`posts`}
        name={`Posts`}
      />
      <NavLinkItem
        style={{ width: "31%" }}
        icon={<BsFillKanbanFill size="25px" />}
        to={`projects`}
        name={`Project`}
      />
    </>
  );
};

export default NavLinks;
