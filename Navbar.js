import { Link } from "react-router-dom";

const Navbar = ({ setToken, setUserData, userData }) => {
  return (
    <>
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/posts">
        Posts
      </Link>
      {userData ? (
        <Link className="link" to="/profile">
          Profile
        </Link>
      ) : (
        <Link className="link" to="/register">
          Register
        </Link>
      )}
      <Link
        className="link"
        to="/"
        onClick={() => {
          setToken("");
          localStorage.removeItem("token");
          setUserData(null);
        }}
      >
        Logout
      </Link>
    </>
  );
};

export default Navbar;
