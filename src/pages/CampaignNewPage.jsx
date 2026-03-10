import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../services/api";

function CampaignNewPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [system, setSystem] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch(`${API_BASE}/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        system,
        description,
      }),
    });

    navigate("/campaigns");
  };

  return (
    <div>
      <h2>Create Campaign</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="System"
          value={system}
          onChange={(e) => setSystem(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CampaignNewPage;