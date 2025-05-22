export function groupForecastByDay(list) {
  const days = {};

  list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0]; // "2023-05-25"
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(entry);
  });

  return Object.entries(days).map(([date, entries]) => {
    const temps = entries.map((e) => e.main.temp);
    const avgTemp = temps.reduce((sum, t) => sum + t, 0) / temps.length;

    // Prendo l'icona più frequente della giornata
    const iconCount = {};
    entries.forEach((e) => {
      const icon = e.weather[0].icon;
      iconCount[icon] = (iconCount[icon] || 0) + 1;
    });
    const mostCommonIcon = Object.entries(iconCount).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    return {
      date,
      avgTemp: Math.round(avgTemp),
      icon: mostCommonIcon,
    };
  });
}
