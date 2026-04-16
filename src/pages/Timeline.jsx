import { useState } from 'react';
import { Phone, MessageSquare, Video, Gift, ChevronDown } from 'lucide-react';
import { useTimeline } from '../context/TimelineContext';

const TYPE_ICONS = {
  Call: { icon: <Phone size={18} className="text-gray-600" />, bg: 'bg-gray-100' },
  Text: { icon: <MessageSquare size={18} className="text-gray-500" />, bg: 'bg-gray-100' },
  Video: { icon: <Video size={18} className="text-gray-600" />, bg: 'bg-gray-100' },
  Meetup: { icon: <Gift size={18} className="text-yellow-600" />, bg: 'bg-yellow-100' },
};

const FILTERS = ['All', 'Call', 'Text', 'Video', 'Meetup'];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

export default function Timeline() {
  const { entries } = useTimeline();
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(false);

  const filtered = filter === 'All' ? entries : entries.filter(e => e.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Timeline</h1>

        {/* Filter Dropdown */}
        <div className="relative w-56 mb-6">
          <button
            onClick={() => setOpen(o => !o)}
            className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-sm text-gray-600 hover:bg-gray-50"
          >
            {filter === 'All' ? 'Filter timeline' : filter}
            <ChevronDown size={16} />
          </button>
          {open && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md z-10">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${filter === f ? 'text-[#2d5a4e] font-medium' : 'text-gray-700'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Entries */}
        <div className="flex flex-col gap-2">
          {filtered.length === 0 && (
            <p className="text-gray-400 text-sm py-10 text-center">No entries found.</p>
          )}
          {filtered.map(entry => {
            const iconData = TYPE_ICONS[entry.type] || TYPE_ICONS.Text;
            return (
              <div key={entry.id} className="bg-white border border-gray-200 rounded-lg px-5 py-4 flex items-center gap-4">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${iconData.bg}`}>
                  {iconData.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">{entry.type}</span>{' '}
                    <span className="text-gray-500">with {entry.friend}</span>
                  </p>
                  <p className="text-xs text-[#2d5a4e] mt-0.5">{formatDate(entry.date)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
