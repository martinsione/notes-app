const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};

export const getRelativeTime = (
  timestamp: Date,
  locale = navigator.language
) => {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const elapsed = (timestamp.valueOf() - new Date().valueOf()) / 1000;

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (const unit in DATE_UNITS)
    if (Math.abs(elapsed) > DATE_UNITS[unit] || unit === "second")
      return rtf.format(Math.round(elapsed / DATE_UNITS[unit]), unit);
};
