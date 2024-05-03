import React from 'react';

const Bloqueos = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #ff7043, #ff0043)', // Fond dégradé accrocheur
    color: 'white',
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Carte avec fond semi-transparent
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Ombre du texte
  };

  const alertStyle = {
    backgroundColor: '#ff0000', // Fond rouge pour l'alerte
    color: 'white',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
      <div style={alertStyle}><h5> Utilisateur Bloqué</h5> </div>
        <h1 style={titleStyle}>Administration Tassili</h1>
        <p>Si vous pensez que c'est une erreur, veuillez nous contacter :</p>
        <p>Téléphone de contact : <span style={{ textDecoration: 'underline' }}>Djamel : 658 556 296</span></p>
      </div>
    </div>
  );
};

export default Bloqueos;
