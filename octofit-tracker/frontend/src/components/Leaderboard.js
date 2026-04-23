import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const url = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
      console.log('Fetching from:', url);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        const leaderboardData = data.results || data;
        setLeaderboard(leaderboardData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="alert alert-info">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const headers = leaderboard.length > 0 ? Object.keys(leaderboard[0]) : [];

  return (
    <div>
      <h2 className="mb-4">Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map(key => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              {headers.map(key => <td key={key}>{JSON.stringify(entry[key])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;