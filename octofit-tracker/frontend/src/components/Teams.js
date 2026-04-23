import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const url = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
      console.log('Fetching from:', url);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        const teamsData = data.results || data;
        setTeams(teamsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const headers = teams.length > 0 ? Object.keys(teams[0]) : [];

  return (
    <div>
      <h2 className="mb-4">Teams</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map(key => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              {headers.map(key => <td key={key}>{JSON.stringify(team[key])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;