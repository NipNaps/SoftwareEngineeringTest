import React, { useState, useEffect } from "react";
import { Player } from "../entities/Player";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const list = await Player.list();
    setPlayers(list);
  };

  const handleAdd = async () => {
    if (name.trim()) {
      await Player.create({ id: Date.now(), name });
      setName("");
      loadPlayers();
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Players</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
      <button onClick={handleAdd}>Add Player</button>
      <ul>
        {players.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
