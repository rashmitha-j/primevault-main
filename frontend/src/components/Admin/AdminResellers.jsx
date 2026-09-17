import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminResellers = () => {
  const [resellers, setResellers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all resellers when the component is mounted
    const fetchResellers = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/reseller/admin/resellers');
        setResellers(res.data);
      } catch (err) {
        setMessage('Failed to fetch resellers.');
      }
    };

    fetchResellers();
  }, []);

  // Inline styles
  const containerStyle = {
    width: '80%',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
  };

  const messageStyle = {
    textAlign: 'center',
    color: 'red',
    fontSize: '1.2rem',
  };

  const tableContainerStyle = {
    overflowX: 'auto',
    marginTop: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const thTdStyle = {
    padding: '12px 15px',
    textAlign: 'left',
    fontSize: '1rem',
    color: '#333',
  };

  const thStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
    textTransform: 'uppercase',
  };

  const trEvenStyle = {
    backgroundColor: '#f9f9f9',
  };

  const trHoverStyle = {
    backgroundColor: '#f1f1f1',
  };

  const trLastStyle = {
    borderBottom: 'none',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Reseller List</h2>
      {message && <p style={messageStyle}>{message}</p>}
      <div style={tableContainerStyle}>
        <table className="min-w-full text-left text-gray-500" style={tableStyle}>
          <thead   className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th style={{ ...thTdStyle, ...thStyle }}>Name</th>
              <th style={thTdStyle}>Email</th>
              <th style={thTdStyle}>Phone</th>
              <th style={thTdStyle}>Shop Name</th>
              <th style={thTdStyle}>Address</th>
            </tr>
          </thead>
          <tbody>
            {resellers.length > 0 ? (
              resellers.map((reseller, index) => (
                <tr
                  key={index}
                  style={index % 2 === 0 ? trEvenStyle : null}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <td style={thTdStyle}>{reseller.name}</td>
                  <td style={thTdStyle}>{reseller.email}</td>
                  <td style={thTdStyle}>{reseller.phone}</td>
                  <td style={thTdStyle}>{reseller.shopName}</td>
                  <td style={thTdStyle}>{reseller.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={thTdStyle}>No resellers registered yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminResellers;
