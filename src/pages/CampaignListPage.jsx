import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE from "../services/api";

function CampaignListPage() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE}/campaigns`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCampaigns(data));
  }, []);

  return (
    <div>
      <h2>Your Campaigns</h2>

      <Link to="/campaigns/new">New Campaign</Link>

      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign._id}>
            <Link to={`/campaigns/${campaign._id}`}>
              {campaign.title} ({campaign.system})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignListPage;