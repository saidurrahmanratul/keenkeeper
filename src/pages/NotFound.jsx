import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-bold text-[#2d5a4e] mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-2">Page not found</p>
      <p className="text-gray-400 text-sm mb-8">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-[#2d5a4e] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-[#234840] transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
