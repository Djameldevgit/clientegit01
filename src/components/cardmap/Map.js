import React, { useState } from 'react';

const Map  = () => {
  const [address, setAddress] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };

  const handleShowMap = () => {
    // Aquí podrías utilizar la API de Google Maps para generar la URL del mapa
    // basándote en la dirección ingresada.
    const baseUrl = 'https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=';
    const encodedAddress = encodeURIComponent(address);
    const fullUrl = `${baseUrl}${encodedAddress}`;
    
    setMapUrl(fullUrl);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ingrese una dirección"
        value={address}
        onChange={handleInputChange}
      />
      <button onClick={handleShowMap}>Mostrar Mapa</button>
      {mapUrl && (
        <iframe
          title="Google Maps"
          width="600"
          height="450"
          frameborder="0"
          style={{ border: 0 }}
          src={mapUrl}
          allowfullscreen
        ></iframe>
      )}
    </div>
  );
};

export default Map ;
