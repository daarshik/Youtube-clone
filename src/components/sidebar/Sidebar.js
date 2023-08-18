import React from "react";
import "./_sidebar.scss";
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebar, handleToggleSidebar, user }) => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={() => handleToggleSidebar(false)}
    >
      <Link to="/" className="link">
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>
      <Link to="/feed/subscription" className="link">
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </Link>

      <li>
        <MdThumbUp size={23} />
        <span>Liked Video</span>
      </li>

      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>

      <li>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={23} />
        <span>I don't Know</span>
      </li>

      <hr />

      <li onClick={logout}>
        <MdExitToApp size={23} />
        <span>Logout</span>
      </li>

      <hr />
    </nav>
  );
};

export default Sidebar;
