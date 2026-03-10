import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="container">
      <h1>CampaignForge</h1>

      <p>Manage your tabletop RPG campaigns.</p>

      <Link to="/signin">Sign In</Link>
      <br />
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}