import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { getWeather } from "../services/weatherService";

function LocationMarker({ setPosition, setWeather }) {
  useMapEvents({
    async click(e) {
      const pos = e.latlng;
      setPosition(pos);

      try {
        const data = await getWeather(pos.lat, pos.lng);
        setWeather(data);
      } catch (err) {
        console.error(err);
      }
    },
  });
  return null;
}

function MapView() {
  const [position, setPosition] = useState(null);
  const [weather, setWeather] = useState(null);

  return (
    <div>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <LocationMarker
          setPosition={setPosition}
          setWeather={setWeather}
        />

        {position && <Marker position={position} />}
      </MapContainer>

      {position && (
        <p>
          📍 Latitude: {position.lat} | Longitude: {position.lng}
        </p>
      )}

      {weather && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#1f2937",
            color: "#fff",
            borderRadius: "8px",
          }}
        >
          <h3>🌦️ Weather</h3>
          <p>🌡️ Temp: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} m/s</p>
          <p>☁️ Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default MapView;
