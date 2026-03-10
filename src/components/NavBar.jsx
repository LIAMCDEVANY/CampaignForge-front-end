import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { token, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>

      {token ? (
        <>
          <Link to="/campaigns">Campaigns</Link>
          <Link to="/campaigns/new">New Campaign</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}