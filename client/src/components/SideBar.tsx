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
  FaUser,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

const SideBar: React.FC = () => {
  const [showUtilisateurs, setShowUtilisateurs] = useState<Boolean>(false);
  const [showCommunautes, setShowCommunautes] = useState<Boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<Boolean>(false);

  const toggleUtilisateurs = () => {
    setShowUtilisateurs(!showUtilisateurs);
  };

  const toggleCommunautes = () => {
    setShowCommunautes(!showCommunautes);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-outer-space-200 h-full flex flex-col transition-all duration-300 ${isCollapsed ? "w-12" : "w-64"}`}>
      <div className="h-[48px] border-b-2 border-outer-space-100 flex items-center justify-center">
        <img src={isCollapsed ? logo_two : logo} alt="logo" />
      </div>
      <div className="h-[56px] border-b-2 border-outer-space-100 flex items-center">
        <NavLink to={"#"} className="flex items-center ml-2">
          <FaHome className="mr-2 text-md" /> {!isCollapsed && "Accueil"}
        </NavLink>
      </div>
      <div className="min-h-[56px] border-b-2 border-outer-space-100 flex flex-col justify-center">
        <div className="min-h-[56px] flex items-center justify-between ml-2">
          <div className="flex items-center">
            <FaUsers className="mr-2 text-md" />
            {!isCollapsed && <span className="align-middle">UTILISATEURS</span>}
          </div>
          {!isCollapsed && (
            <div className="flex items-center space-x-2 mr-2">
              <IoMdAdd />
              <FaCaretDown
                onClick={toggleUtilisateurs}
                className={`transition-transform duration-300 ${
                  showUtilisateurs ? "rotate-45" : "-rotate-90"
                }`}
              />
            </div>
          )}
        </div>
        {showUtilisateurs && !isCollapsed && (
          <div className="flex flex-col ml-2">
            <NavLink to={"#"} className="flex items-center ml-2 p-1">
              <FaUser className="mr-2 text-md" />
              User1 user1
            </NavLink>
            <NavLink to={"#"} className="flex items-center ml-2 p-1">
              <FaUser className="mr-2 text-md" />
              User2 user2
            </NavLink>
            <NavLink to={"#"} className="flex items-center ml-2 p-1">
              <FaUser className="mr-2 text-md" />
              User3 user3
            </NavLink>
          </div>
        )}
      </div>
      {!isCollapsed && (
        <div className="min-h-[56px] border-b-2 border-outer-space-100 flex flex-col justify-center">
          <div className="min-h-[56px] flex items-center justify-between ml-2">
            <div className="flex items-center">
              <FaCaretDown
                onClick={toggleCommunautes}
                className={`mr-2 text-md transition-transform duration-300 ${
                  showCommunautes ? "rotate+45" : "-rotate-90"
                }`}
              />
              <span className="align-middle">COMMUNAUTÉ</span>
            </div>
            <div className="flex items-center border-l-2 border-outer-space-100 p-2 mx-2">
              <FaGear className="transition-transform duration-300 ease-in-out hover:rotate-90" />
            </div>
          </div>
          {showCommunautes && (
            <div className="flex flex-col ml-2">
              <NavLink to={"#"} className="flex items-center ml-2 p-1">
                <FaHashtag className="mr-2 text-md" />
                Général
              </NavLink>
              <NavLink to={"#"} className="flex items-center ml-2 p-1">
                <FaHashtag className="mr-2 text-md" />
                JavaScript
              </NavLink>
              <NavLink to={"#"} className="flex items-center ml-2 p-1">
                <FaHashtag className="mr-2 text-md" />
                ReactJS
              </NavLink>
              <NavLink to={"#"} className="flex items-center ml-2 p-1">
                <FaHashtag className="mr-2 text-md" />
                Angular
              </NavLink>
              <NavLink to={"#"} className="flex items-center ml-2 p-1">
                <FaHashtag className="mr-2 text-md" />
                Bugs et corrections
              </NavLink>
            </div>
          )}
        </div>
      )}
      <div className="mt-auto h-[56px] flex items-center justify-end  border-t-2">
        <FaAngleLeft onClick={toggleSidebar} className={`transition-transform duration-300 mr-2 ${isCollapsed ? "rotate-180" : ""}`} />
      </div>
    </div>
  );
};

export default SideBar;
