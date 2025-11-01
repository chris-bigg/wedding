import { useEffect, useState } from 'react';

type ForecastItem = {
  dt: number;
  main: { temp: number; temp_min: number; temp_max: number };
  weather: { icon: string; description: string }[];
};

type ApiResponse = {
  list: ForecastItem[];
  city: { name: string };
};

type DailyForecast = {
  date: Date;
  minTemp: number;
  maxTemp: number;
  icon: string;
  description: string;
};

export default function WeatherWidget() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=Gloucester,GB&units=metric&appid=9bfd98eb96fcba5c3c9a9121c3f1869a`;
        const res = await fetch(url, { signal: controller.signal });
        const json = await res.json();
        if (!res.ok) {
          // Check if API returned an error message
          const message = json?.message || `HTTP ${res.status}`;
          console.error('Weather API error:', message);
          throw new Error(message);
        }
        setData(json as ApiResponse);
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          const errorMsg = e?.message?.includes('401') || e?.message?.includes('Invalid API key')
            ? 'API key invalid - please check your OpenWeather API key'
            : 'Weather unavailable';
          setError(errorMsg);
          console.error('Weather fetch error:', e);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
    return () => controller.abort();
  }, []);

  // Group forecasts by day and create daily summaries
  const dailyForecasts: DailyForecast[] = [];
  if (data?.list) {
    const groupedByDay = new Map<string, ForecastItem[]>();
    
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();
      
      if (!groupedByDay.has(dateKey)) {
        groupedByDay.set(dateKey, []);
      }
      groupedByDay.get(dateKey)!.push(item);
    });
    
    // Create daily forecast for next 4 days (starting from today)
    const now = new Date();
    const todayKey = now.toDateString();
    const sortedDays = Array.from(groupedByDay.entries()).sort((a, b) => {
      return new Date(a[0]).getTime() - new Date(b[0]).getTime();
    });
    
    // Always include today, then next 3 days
    let daysAdded = 0;
    for (const [dateKey, items] of sortedDays) {
      if (daysAdded >= 4) break;
      
      const date = new Date(dateKey);
      const isToday = dateKey === todayKey;
      
      // Find min/max temps from all forecasts for this day
      const temps = items.map(item => item.main.temp);
      const minTemp = Math.round(Math.min(...temps));
      const maxTemp = Math.round(Math.max(...temps));
      
      // Use midday forecast for icon (around 12:00-15:00), or middle item
      const middayItem = items.find(item => {
        const itemDate = new Date(item.dt * 1000);
        return itemDate.getHours() >= 12 && itemDate.getHours() <= 15;
      }) || items[Math.floor(items.length / 2)] || items[0];
      
      dailyForecasts.push({
        date,
        minTemp,
        maxTemp,
        icon: middayItem.weather[0]?.icon || '01d',
        description: middayItem.weather[0]?.description || ''
      });
      
      daysAdded++;
    }
  }

  return (
    <div className="w-full md:w-auto z-40">
      <div className="bg-stone-800/50 dark:bg-stone-900/80 backdrop-blur-sm text-stone-200 border border-stone-600/40 rounded-xl p-3 shadow-lg max-w-full md:max-w-[320px] mx-auto md:mx-0">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs uppercase tracking-wide text-emerald-300">Gloucester</div>
          <div className="text-[10px] text-stone-300/80">OpenWeather</div>
        </div>
        {loading ? (
          <div className="text-sm text-stone-300">Loading…</div>
        ) : error ? (
          <div className="text-sm text-stone-300">{error}</div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
            {dailyForecasts.map((day, idx) => {
              const now = new Date();
              const isToday = day.date.toDateString() === now.toDateString();
              
              let label = '';
              if (isToday) {
                label = 'Today';
              } else if (idx === 1 && day.date.getTime() - now.getTime() < 2 * 24 * 60 * 60 * 1000) {
                label = 'Tomorrow';
              } else {
                label = day.date.toLocaleDateString([], { weekday: 'short' });
              }
              
              return (
                <div key={day.date.toISOString()} className="flex flex-col items-center">
                  <div className="text-[10px] text-stone-300/90 mb-1">{label}</div>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.description}
                    className="w-8 h-8"
                    loading="lazy"
                  />
                  <div className="text-xs font-medium">
                    <span>{day.maxTemp}°</span>
                    {day.minTemp !== day.maxTemp && (
                      <span className="text-stone-400">/{day.minTemp}°</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


