import { useState, useContext } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const closeMenu = () => setOpen(false);

  const fetch = useNotificationStore((state)=>state.fetch);
  const number = useNotificationStore((state)=>state.number);
  fetch();

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo.png" alt="" />
          <span>LamaEstate</span>
        </Link>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/" onClick={closeMenu}>About</Link>
        <Link to="/" onClick={closeMenu}>Contact</Link>
        <Link to="/" onClick={closeMenu}>Agents</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.webp"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile" onClick={closeMenu}>
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>Sign in</Link>
            <Link to="/register" className="register" onClick={closeMenu}>
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/" onClick={closeMenu}>About</Link>
          <Link to="/" onClick={closeMenu}>Contact</Link>
          <Link to="/" onClick={closeMenu}>Agents</Link>
          {currentUser ? (
            <Link to="/add" onClick={closeMenu}>Add</Link>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>Sign in</Link>
              <Link to="/register" onClick={closeMenu}>Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
