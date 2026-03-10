import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE from "../services/api";

function CampaignDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE}/campaigns/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCampaign(data));
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    await fetch(`${API_BASE}/campaigns/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    navigate("/campaigns");
  };

  if (!campaign) return <p>Loading...</p>;

  return (
    <div>
      <h2>{campaign.title}</h2>
      <p>System: {campaign.system}</p>
      <p>{campaign.description}</p>

      <button onClick={() => navigate(`/campaigns/${id}/edit`)}>
        Edit Campaign
      </button>

      <button onClick={handleDelete}>Delete Campaign</button>
    </div>
  );
}

export default CampaignDetailPage;