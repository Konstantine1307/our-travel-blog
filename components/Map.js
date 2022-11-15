import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useEffect, useState } from 'react';

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN;

export default function Map({ longitude, latitude }) {
  const mapContainer = useRef(null);
  const [zoom, setZoom] = useState(13);


  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: zoom,
      minZoom:11,
      maxZoom:16
    });

    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(nav);
    map.on('move', () => {
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, [longitude, latitude]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='w-full'>
      <div className='bg-gray-500 text-white z-10 font-mono text-xs px-2 py-3 rounded-lg mx-10'>
        Longitude: {longitude.toFixed(4)} | Latitude: {latitude.toFixed(4)} |
        Zoom: {zoom}
      </div>
      <div
        ref={mapContainer}
        className='w-full h-64 map-container'
      />
    </div>
  );
}
