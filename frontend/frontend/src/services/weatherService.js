export async function getWeather(lat, lon) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Weather fetch failed");
  }

  return res.json();
}
