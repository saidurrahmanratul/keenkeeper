import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useTimeline } from '../context/TimelineContext';

const COLORS = { Text: '#7c3aed', Call: '#2d5a4e', Video: '#22c55e' };

export default function Stats() {
  const { entries } = useTimeline();

  const counts = entries.reduce((acc, e) => {
    if (['Call', 'Text', 'Video'].includes(e.type)) {
      acc[e.type] = (acc[e.type] || 0) + 1;
    }
    return acc;
  }, {});

  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Friendship Analytics</h1>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-700 mb-4">By Interaction Type</h2>
          <ResponsiveContainer width="100%" height={280} className="sm:!h-[320px]">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={130}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map(entry => (
                  <Cell key={entry.name} fill={COLORS[entry.name] || '#ccc'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                iconType="circle"
                iconSize={10}
                formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
