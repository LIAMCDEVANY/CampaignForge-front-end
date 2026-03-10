import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function CampaignEditPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [system, setSystem] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchCampaign() {
      const res = await fetch(`http://localhost:3001/campaigns/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setTitle(data.title);
      setSystem(data.system);
      setDescription(data.description);
    }

    fetchCampaign();
  }, [id, token]);

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`http://localhost:3001/campaigns/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, system, description }),
    });

    navigate(`/campaigns/${id}`);
  }

  return (
    <div>
      <h2>Edit Campaign</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          value={system}
          onChange={(e) => setSystem(e.target.value)}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Save Changes</button>
      </form>
    </div>
  );
}