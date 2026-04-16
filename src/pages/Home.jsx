import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import friendsData from '../data/friends.json';
import { statusStyle, statusLabel, tagStyle } from '../utils/status';
import { useTimeline } from '../context/TimelineContext';

function StatCard({ value, label }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center flex-1">
      <div className="text-3xl font-semibold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function FriendCard({ friend, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="w-16 h-16 rounded-full object-cover mb-3"
      />
      <div className="font-semibold text-gray-800">{friend.name}</div>
      <div className="text-xs text-gray-400 mt-0.5 mb-2">{friend.days_since_contact}d ago</div>
      <div className="flex flex-wrap justify-center gap-1 mb-2">
        {friend.tags.map(tag => (
          <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wide ${tagStyle(tag)}`}>
            {tag}
          </span>
        ))}
      </div>
      <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle(friend.status)}`}>
        {statusLabel(friend.status)}
      </span>
    </div>
  );
}

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { entries } = useTimeline();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const onTrack = friends.filter(f => f.status === 'on-track').length;
  const needAttention = friends.filter(f => f.status !== 'on-track').length;
  const interactionsThisMonth = entries.length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1">
        {/* Banner */}
        <div className="text-center py-10 sm:py-14 px-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3">Friends to keep close in your life</h1>
          <p className="text-gray-500 text-sm mb-6">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the<br className="hidden sm:block" /> relationships that matter most.
          </p>
          <button className="inline-flex items-center gap-2 bg-[#2d5a4e] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-[#234840] transition-colors">
            <Plus size={16} />
            Add a Friend
          </button>
        </div>

        {/* Summary Cards */}
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard value={friends.length} label="Total Friends" />
            <StatCard value={onTrack} label="On Track" />
            <StatCard value={needAttention} label="Need Attention" />
            <StatCard value={interactionsThisMonth} label="Interactions This Month" />
          </div>
        </div>

        {/* Friends Grid */}
        <div className="max-w-6xl mx-auto px-4 pb-16">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">Your Friends</h2>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-[#2d5a4e] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {friends.map(friend => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  onClick={() => navigate(`/friend/${friend.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
