import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/complaints/history`)
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Complaint History</h1>

      {history.length === 0 ? (
        <p>No complaints found</p>
      ) : (
        history.map((item, index) => (
          <div key={index}>
            <h3>{item.complaint}</h3>
            <p>{item.prediction}</p>
          </div>
        ))
      )}
    </div>
  );
}