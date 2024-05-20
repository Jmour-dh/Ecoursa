import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import logo_two from "../assets/images/logo_two.png";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCaretDown,
  FaHashtag,
  FaAngleLeft,
  FaBook
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

interface SideBarProps {
  isVisible: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isVisible }) => {
  const [showCommunautes, setShowCommunautes] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleCommunautes = () => {
    setShowCommunautes(!showCommunautes);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-outer-space-200 h-full flex flex-col transition-all duration-300 ${isCollapsed ? "w-12" : "w-64"} ${!isVisible && "hidden"}`}>
      <div className="h-[48px] border-b-2 border-outer-space-100 flex items-center justify-center">
        <img src={isCollapsed ? logo_two : logo} alt="logo" />
      </div>
      <div className="h-[56px] border-b-2 border-outer-space-100 flex items-center hover:bg-slate-500 ">
        <NavLink
          to="/profileAdmin/home"
          className={({ isActive }) => isActive ? "flex items-center ml-2 text-blue-500 " : "flex items-center ml-2"}
        >
          <FaHome className="mr-2 text-md" /> {!isCollapsed && "Accueil"}
        </NavLink>
      </div>
      <div className="min-h-[56px] border-b-2 border-outer-space-100 flex flex-col justify-center hover:bg-slate-500">
        <div className="min-h-[56px] flex items-center justify-between ml-2">
          <NavLink
            to="users/list"
            className={({ isActive }) => isActive ? "flex items-center text-blue-500" : "flex items-center"}
          >
            <FaUsers className="mr-2 text-md" />
            {!isCollapsed && <span className="align-middle">UTILISATEURS</span>}
          </NavLink>
        </div>
      </div>
      <div className="min-h-[56px] border-b-2 border-outer-space-100 flex flex-col justify-center hover:bg-slate-500">
        <div className="min-h-[56px] flex items-center justify-between ml-2">
          <NavLink
            to="formations/list"
            className={({ isActive }) => isActive ? "flex items-center text-blue-500" : "flex items-center"}
          >
            <FaBook className="mr-2 text-md" />
            {!isCollapsed && <span className="align-middle">FORMATIONS</span>}
          </NavLink>
        </div>
      </div>
      {!isCollapsed && (
        <div className="min-h-[56px] border-b-2 border-outer-space-100 flex flex-col justify-center ">
          <div className="min-h-[56px] flex items-center justify-between ml-2 hover:bg-slate-500">
            <div className="flex items-center ">
              <FaCaretDown
                onClick={toggleCommunautes}
                className={`mr-2 text-md transition-transform duration-300 ${showCommunautes ? "rotate+45" : "-rotate-90"}`}
              />
              <span className="align-middle">COMMUNAUTÉ</span>
            </div>
            <div className="flex items-center border-l-2 border-outer-space-100 p-2 mx-2">
              <FaGear className="transition-transform duration-300 ease-in-out hover:rotate-90" />
            </div>
          </div>
          {showCommunautes && (
            <div className="flex flex-col ml-2">
              <NavLink to={"#"} className="flex items-center ml-2 p-1 hover:bg-slate-400">
                <FaHashtag className="mr-2 text-md" />
                Général
              </NavLink>
              <NavLink to={"#"} className="flex items-center ml-2 p-1 hover:bg-slate-400">
                <FaHashtag className="mr-2 text-md" />
                JavaScript
              </NavLink>
              <NavLink to={"#"} className="flex items-center ml-2 p-1 hover:bg-slate-400">
                <FaHashtag className="mr-2 text-md" />
                ReactJS
              </NavLink>
              <NavLink to={"#"} className="flex items-center ml-2 p-1 hover:bg-slate-400">
                <FaHashtag className="mr-2 text-md" />
                Angular
              </NavLink>
              <NavLink to={"#"} className="flex items-center ml-2 p-1 hover:bg-slate-400">
                <FaHashtag className="mr-2 text-md" />
                Bugs et corrections
              </NavLink>
            </div>
          )}
        </div>
      )}
      <div className="mt-auto h-[56px] flex items-center justify-end border-t-2">
        <FaAngleLeft onClick={toggleSidebar} className={`transition-transform duration-300 mr-2 ${isCollapsed ? "rotate-180" : ""}`} />
      </div>
    </div>
  );
};

export default SideBar;
