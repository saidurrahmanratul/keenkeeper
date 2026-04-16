export function statusStyle(status) {
  if (status === 'overdue') return 'bg-red-500 text-white';
  if (status === 'almost due') return 'bg-orange-400 text-white';
  return 'bg-[#2d5a4e] text-white';
}

export function statusLabel(status) {
  if (status === 'overdue') return 'Overdue';
  if (status === 'almost due') return 'Almost Due';
  return 'On-Track';
}

export function tagStyle(tag) {
  const map = {
    college: 'bg-green-100 text-green-700',
    work: 'bg-blue-100 text-blue-700',
    family: 'bg-purple-100 text-purple-700',
    hobby: 'bg-yellow-100 text-yellow-700',
    travel: 'bg-cyan-100 text-cyan-700',
    mentor: 'bg-pink-100 text-pink-700',
    'close friend': 'bg-rose-100 text-rose-700',
  };
  return map[tag.toLowerCase()] || 'bg-gray-100 text-gray-600';
}
