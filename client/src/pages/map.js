import { Container, MapContainer } from '../styles/HomeStyles';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Map = dynamic(() => import('../components/Map/Leaflet'), { ssr: false });

export default function Home({ isGroceries, buttonName, path }) {
  const [position, setPosition] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(
          'COORDINATES: ',
          position.coords.latitude,
          position.coords.longitude
        );
        setPosition({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.log(error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <Container>
      <MapContainer>
        <Map
          position={position}
          isGroceries={isGroceries}
          buttonName={buttonName}
          path={path}
        />
      </MapContainer>
    </Container>
  );
}
