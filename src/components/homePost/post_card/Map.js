import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const Map = ({ post }) => {
    const { auth } = useSelector((state) => state);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [showMap, setShowMap] = useState(false);

    const handleShowMap = useCallback(async () => {
        if (!post) return;

        console.log('Post direccion:', post.direccion);

        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: post.direccion,
                    key: 'AIzaSyDhzWSQGXNZdurHaf7axPMx6N8fl17ZIU0',
                },
            });

            console.log('Respuesta de geocodificación:', response.data);

            if (response.data.status === "REQUEST_DENIED") {
                setError(`Error: ${response.data.error_message}`);
                return;
            }

            if (response.data.results.length > 0) {
                const locationData = response.data.results[0].geometry.location;
                setLocation(locationData);
                setShowMap(true);
            } else {
                console.log('No se encontraron resultados para la dirección:', post.direccion);
                setError('No se encontraron resultados para esa dirección.');
            }
        } catch (error) {
            console.error('Error al geocodificar la dirección:', error);
            setError('Error al geocodificar la dirección.');
        }
    }, [post]);

    useEffect(() => {
        handleShowMap();
    }, [handleShowMap]);

    if (!post) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <button onClick={handleShowMap}>Ver Mapa del Post</button>

            {showMap && location && (
                <div style={{ height: '400px', width: '100%' }}>
                    <LoadScript googleMapsApiKey="AIzaSyDhzWSQGXNZdurHaf7axPMx6N8fl17ZIU0">
                        <GoogleMap
                            mapContainerStyle={{ height: '100%', width: '100%' }}
                            center={location}
                            zoom={15}
                        >
                            <Marker position={location} />
                        </GoogleMap>
                    </LoadScript>
                </div>
            )}
        </div>
    );
};

export default Map;

