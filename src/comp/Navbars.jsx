import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Navbars.css'; // Import the CSS file for custom styles

export const Navbars = () => {
  const logoUrl = 'https://i.pinimg.com/736x/98/e4/b0/98e4b0e9c6a209eedfcb222c573120b6.jpg'; // Replace with your logo URL
  const [showLoading, setShowLoading] = useState(false);

  const handleLogoClick = () => {
    setShowLoading(true);
    setTimeout(() => {
      window.location.href = 'https://github.com/Hemanth-Gurugubelli'; // Replace with your GitHub URL
    }, 3000);
  };

  return (
    <div>
      {showLoading ? (
        <div className="loading-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src={logoUrl} alt="Logo" className="loading-image" onClick={handleLogoClick} />
        </div>
      ) : (
        <Navbar bg="primary" variant="dark">
          <Container className="d-flex flex-column align-items-center">
            <div style={{ marginBottom: '10px' }}>
              <img src={logoUrl} alt="Logo" height="60" width="60" onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
            </div>
            <h3 className="mb-0" style={{ color: 'white', fontWeight: 'bold', fontSize: '24px', textAlign: 'center' }}>
              KeyMaster
            </h3>
          </Container>
        </Navbar>
      )}
    </div>
  );
};
