import { useEffect, useState } from 'react';

/** Live local time for Montreal (America/Toronto, EST/EDT). */
export default function LiveClock({ className = '' }: { className?: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Toronto',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {time || '--:--:--'}
    </span>
  );
}
