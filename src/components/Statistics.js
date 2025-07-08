import React from "react";


const Statistics = () => {
  const [urls, setUrls] = React.useState([]);

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    setUrls(data.reverse()); // show latest first
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>URL Shortener Statistics</h2>
      {urls.length === 0 ? (
        <p>No shortened URLs found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>Shortened URL</th>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>Original URL</th>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>Created At</th>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>Expiry</th>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>Total Clicks</th>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>Click Details</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((u, idx) => (
              <tr key={idx}>
                <td style={{ padding: 8, border: '1px solid #ccc' }}><a href={`${window.location.origin}/s/${u.shortUrl.split('/s/')[1]}`}>{`${window.location.origin}/s/${u.shortUrl.split('/s/')[1]}`}</a></td>
                <td style={{ padding: 8, border: '1px solid #ccc' }}><a href={u.originalUrl} target="_blank" rel="noopener noreferrer">{u.originalUrl}</a></td>
                <td style={{ padding: 8, border: '1px solid #ccc' }}>{new Date(u.createdAt).toLocaleString()}</td>
                <td style={{ padding: 8, border: '1px solid #ccc' }}>{new Date(u.expiry).toLocaleString()}</td>
                <td style={{ padding: 8, border: '1px solid #ccc' }}>{u.clicks ? u.clicks.length : 0}</td>
                <td style={{ padding: 8, border: '1px solid #ccc' }}>
                  {u.clicks && u.clicks.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {u.clicks.map((c, i) => (
                        <li key={i}>
                          <div><b>Time:</b> {new Date(c.timestamp).toLocaleString()}</div>
                          <div><b>Source:</b> {c.source || 'N/A'}</div>
                          <div><b>Location:</b> {c.location || 'N/A'}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No clicks</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statistics;
