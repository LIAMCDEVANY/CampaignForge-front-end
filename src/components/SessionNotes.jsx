import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function SessionNotes({ campaignId }) {
  const { token } = useAuth();

  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

  async function loadNotes() {
    try {
      const res = await fetch(
        `http://localhost:3001/campaigns/${campaignId}/notes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Failed to load notes", err);
    }
  }

  useEffect(() => {
    if (token) {
      loadNotes();
    }
  }, [campaignId, token]);

  async function handleCreateNote(e) {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      await fetch(`http://localhost:3001/campaigns/${campaignId}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      setContent("");
      loadNotes();
    } catch (err) {
      console.error("Failed to create note", err);
    }
  }

  async function handleDeleteNote(noteId) {
    try {
      await fetch(`http://localhost:3001/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadNotes();
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  }

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>Session Notes</h3>

      <form onSubmit={handleCreateNote}>
        <textarea
          placeholder="Write session notes..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          style={{ width: "100%" }}
        />

        <br />

        <button type="submit">Add Note</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {notes.length === 0 && <p>No notes yet.</p>}

        {notes.map((note) => (
          <div
            key={note._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>{note.content}</p>

            <button
              onClick={() => handleDeleteNote(note._id)}
              style={{ color: "red" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}