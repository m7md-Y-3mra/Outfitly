import { WeatherData } from "./weather.types";

export class WeatherService {
  private static readonly API_URL = "https://api.open-meteo.com/v1/forecast";

  static async fetchCurrentWeather(): Promise<WeatherData> {
    if (!navigator.geolocation) {
      throw new Error("Geolocation not supported");
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `${this.API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
            );

            if (!response.ok) {
              throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            const current = data.current_weather;

            // Transform API data to WeatherData
            const weatherData: WeatherData = {
              location: data.timezone.split("/")[1] || "Unknown",
              temperature: Math.round(current.temperature * 1.8 + 32), // Convert to °F
              temperatureCelsius: Math.round(current.temperature),
              condition: "Cloudy", // Fallback; could map from weathercode if expanded
              feelsLike: Math.round(current.temperature * 1.8 + 32), // Approx
              humidity: 50, // Fallback
              windSpeed: Math.round(current.windspeed * 0.621371), // Convert km/h to mph
              uvIndex: 5, // Fallback
              icon: "cloudy", // Fallback
            };

            resolve(weatherData);
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        }
      );
    });
  }
}