import { useParams } from 'react-router-dom';
import { Bell, Archive, Trash2, Phone, MessageSquare, Video } from 'lucide-react';
import toast from 'react-hot-toast';
import friendsData from '../data/friends.json';
import { statusStyle, statusLabel, tagStyle } from '../utils/status';
import { useTimeline } from '../context/TimelineContext';

function StatCard({ value, label }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
      <div className="text-3xl font-bold text-[#2d5a4e]">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

export default function FriendDetail() {
  const { id } = useParams();
  const friend = friendsData.find(f => f.id === Number(id));
  const { addEntry } = useTimeline();

  if (!friend) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Friend not found.</p>
      </div>
    );
  }

  const formattedDate = new Date(friend.next_due_date).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  function handleCheckIn(type) {
    addEntry(type, friend.name);
    toast.success(`${type} with ${friend.name} logged!`);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Column */}
          <div className="flex flex-col gap-3 w-full lg:w-72 shrink-0">
            {/* Info Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
              <h2 className="text-lg font-semibold text-gray-800">{friend.name}</h2>
              <span className={`text-xs px-3 py-1 rounded-full font-medium mt-1 ${statusStyle(friend.status)}`}>
                {statusLabel(friend.status)}
              </span>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {friend.tags.map(tag => (
                  <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wide ${tagStyle(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 italic mt-3">"{friend.bio}"</p>
              <p className="text-xs text-gray-400 mt-1">Preferred: email</p>
            </div>

            {/* Action Buttons */}
            <button className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Bell size={15} /> Snooze 2 Weeks
            </button>
            <button className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Archive size={15} /> Archive
            </button>
            <button className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-center gap-2 text-sm text-red-500 hover:bg-gray-50 transition-colors">
              <Trash2 size={15} /> Delete
            </button>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard value={friend.days_since_contact} label="Days Since Contact" />
              <StatCard value={friend.goal} label="Goal (Days)" />
              <StatCard value={formattedDate} label="Next Due" />
            </div>

            {/* Relationship Goal */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">Relationship Goal</h3>
                <button className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 transition-colors">Edit</button>
              </div>
              <p className="text-sm text-gray-600">
                Connect every <strong>{friend.goal} days</strong>
              </p>
            </div>

            {/* Quick Check-In */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleCheckIn('Call')}
                  className="border border-gray-200 rounded-lg py-4 flex flex-col items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Phone size={22} />
                  Call
                </button>
                <button
                  onClick={() => handleCheckIn('Text')}
                  className="border border-gray-200 rounded-lg py-4 flex flex-col items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare size={22} />
                  Text
                </button>
                <button
                  onClick={() => handleCheckIn('Video')}
                  className="border border-gray-200 rounded-lg py-4 flex flex-col items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Video size={22} />
                  Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
