import { createContext, useContext, useState } from 'react';

const TimelineContext = createContext();

const initialEntries = [
  { id: 1, type: 'Meetup', friend: 'Tom Baker', date: '2026-03-29' },
  { id: 2, type: 'Text', friend: 'Sarah Chen', date: '2026-03-28' },
  { id: 3, type: 'Meetup', friend: 'Olivia Martinez', date: '2026-03-26' },
  { id: 4, type: 'Video', friend: 'Aisha Patel', date: '2026-03-23' },
  { id: 5, type: 'Meetup', friend: 'Sarah Chen', date: '2026-03-21' },
  { id: 6, type: 'Call', friend: 'Marcus Johnson', date: '2026-03-19' },
  { id: 7, type: 'Meetup', friend: 'Aisha Patel', date: '2026-03-17' },
  { id: 8, type: 'Text', friend: 'Olivia Martinez', date: '2026-03-13' },
  { id: 9, type: 'Call', friend: 'Lisa Nakamura', date: '2026-03-11' },
  { id: 10, type: 'Call', friend: 'Sarah Chen', date: '2026-03-11' },
  { id: 11, type: 'Video', friend: 'Marcus Johnson', date: '2026-03-06' },
  { id: 12, type: 'Video', friend: "Ryan O'Brien", date: '2026-02-24' },
];

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState(initialEntries);

  function addEntry(type, friendName) {
    const today = new Date().toISOString().split('T')[0];
    setEntries(prev => [
      { id: Date.now(), type, friend: friendName, date: today },
      ...prev,
    ]);
  }

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  return useContext(TimelineContext);
}
